require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
// middleware
app.use(cors())
app.use(express.json())
// routes
const usersRouter = require('./routes/userRoute')
const moviesRouter = require('./routes/movieRoute')

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)

const port = process.env.PORT

// connect to MongoDB
const mongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB Connected')
  } catch (error) {
    console.log(error)
  }
}

app.listen(port, () => {
  mongoDB()
  console.log(`Listening on port ${port}`)
})
