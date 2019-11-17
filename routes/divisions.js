const express = require('express')
const router = express.Router()
const Division = require('../models/division')

// Get all divisions
router.get('/', async(req, res) => {
  try {
    const divisions = await Division.find()
    res.json(divisions)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Create one division
router.post('/addDivision', async (req, res) => {
  const division = new Division({
    name: req.body.name,
    region: req.body.region
  })

  try {
    const newDiv = await division.save()
    res.status(201).json(newDiv)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete one division
router.delete('/:id', getDivision, async (req, res) => {
  try {
    const name = res.division.name
    await res.division.remove()
    res.json({ message: 'Deleted '+ name })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

async function getDivision(req, res, next) {
  try {
    division = await Division.findById(req.params.id)
    if (division == null) {
      return res.status(404).json({ message: 'Cant find the specified division'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.division = division
  next()
}

module.exports = router