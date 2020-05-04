const mongoose = require('mongoose')

const movieUser = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
})

module.exports = mongoose.model('movieUser', movieUser)
