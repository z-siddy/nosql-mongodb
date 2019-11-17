const mongoose = require('mongoose')

const divisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Division', divisionSchema)