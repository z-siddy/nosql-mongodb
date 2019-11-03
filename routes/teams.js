const express = require('express')
const router = express.Router()
const Team = require('../models/team')

// Get all teams
router.get('/', async(req, res) => {
  try {
    const teams = await Team.find()
    res.json(teams)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/fans', async(req, res) => {
  try {

  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one team
router.get('/:id', getTeam, (req, res) => {
  res.json(res.team)
})

// Create one team
router.post('/', async (req, res) => {
  const team = new Team({
    name: req.body.name,
    city: req.body.city,
    info: {
      country: req.body.info.country,
      fanCount: req.body.info.fanCount,
      conference: req.body.info.conference
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
  if (req.body.info.fanCount != null) {
    res.team.info.fanCount = req.body.info.fanCount
  }
  if (req.body.info.conference != null) {
    res.team.info.conference = req.body.info.conference
  }
  if (req.body.info.country != null) {
    res.team.info.country = req.body.info.country
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

module.exports = router