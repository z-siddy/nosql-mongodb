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
  players: [{
    type: mongoose.Schema.Types.Object,
    ref: 'Player'
  }],
  info: {
    country: {
      type: String,
      required: true
    },
    divisionID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }
})

module.exports = mongoose.model('Team', teamSchema)