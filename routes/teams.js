const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const Player = require('../models/player')

//get all players
async function getAllPlayers(req, res) {
  try {
    const teams = await Team.find({}, 'players');
    const players = [];

    teams.map(tm => players.push(tm.players));

    return res.status(201).json({ players: players });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

async function getTeam(req, res, next) {
  try {
    team = await Team.findById(req.params.id)
    if (team == null) {
      return res.status(404).json({ message: 'Cant find the specified team'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.team = team
  next()
}

router.get('/players', getAllPlayers);

// Get all teams
router.get('/', async(req, res) => {
  try {
    const teams = await Team.find()
    res.json(teams)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/countTeams', async(req, res) => {
  try {
    Team.countDocuments({}, (err, count) =>
      res.json(count)
    );
  } catch(err) {
    res.status(500).json({ message: res.message })
  }
})

// Get one team
router.get('/:id', getTeam, (req, res) => {
  res.json(res.team)
})

// Add a player to a specific team
router.post('/:id/addPlayer', getTeam, async (req, res) => {
  try {
    const newPlayer = new Player({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      number: req.body.number
    })
    const team = res.team
    team.players.push(newPlayer)
    await team.save()
    res.status(201).json(team)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

// Create one team
router.post('/', async (req, res) => {
  const team = new Team({
    name: req.body.name,
    city: req.body.city,
    info: {
      country: req.body.info.country,
      divisionID: req.body.info.divisionID
    }
  })

  try {
    const newTeam = await team.save()
    res.status(201).json(newTeam)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one team
router.patch('/:id', getTeam, async (req, res) => {
  if (req.body.name != null) {
    res.team.name = req.body.name
  }
  if (req.body.city != null) {
    res.team.city = req.body.city
  }
  if (req.body.info.divisionID != null) {
    res.team.info.divisionID = req.body.info.divisionID
  }
  if (req.body.info.country != null) {
    res.team.info.country = req.body.info.country
  }
  if (req.body.players != null) {
    res.team.players = req.body.players
  }
  try {
    const updatedTeam = await res.team.save()
    res.json(updatedTeam)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

// Delete one team
router.delete('/:id', getTeam, async (req, res) => {
  try {
    const name = res.team.name
    await res.team.remove()
    res.json({ message: 'Deleted '+ name })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router