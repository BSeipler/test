const User = require('./../models/userModel')
const bcrypt = require('bcrypt')

const createUser = async (req, res, next) => {
  try {
    // check if user is already in the database by email
    const exists = await User.exists({ email: req.body.email })
    if (exists) {
      res.send('User already exists')
    }
    // create user in the database if they don't already exist
    await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    })
    res.send('User Created')
  } catch (error) {
    console.log(error)
  }
}

const getUsers = async (req, res, next) => {
  try {
    // get all users from the database
    const users = await User.find()
    res.send(users)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createUser: createUser,
  getUsers: getUsers
}
