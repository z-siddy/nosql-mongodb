require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const teamsRouter = require('./routes/teams')
const divisionRouter = require('./routes/divisions')
app.use('/teams', teamsRouter)
app.use('/divisions', divisionRouter)

app.listen(3000, () => 
  console.log('server started'))



