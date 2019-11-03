const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  info: {
    country: {
      type: String,
      required: true
    },
    fanCount: {
      type: Number,
      required: true
    },
    conference: {
      type: String,
      required: true
    }
  }
})

module.exports = mongoose.model('Team', teamSchema)