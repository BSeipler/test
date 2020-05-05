const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const movieUser = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  }
})

movieUser.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  const match = await bcrypt.compare(candidatePassword, userPassword)
  return match
}

module.exports = mongoose.model('movieUser', movieUser)
