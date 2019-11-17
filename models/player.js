const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  number: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Player', playerSchema)