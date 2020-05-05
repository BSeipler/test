const User = require('./../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body
    // check if user is already in the database by email
    const exists = await User.exists({ email: email })
    if (exists) {
      res.send('User already exists')
    } else {
      // encrypt the password
      const hash = await bcrypt.hash(password, 10)

      // create user in the database if they don't already exist
      const newUser = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash
      })

      // assign jwt upon signing up
      const token = signToken(newUser._id)
      res.status(200).send({
        status: 'success',
        token,
        data: {
          user: newUser
        }
      })
    }
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

const loginUsers = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // check if the user exist by their email
    const userExists = await User.exists({ email: email })
    if (!userExists) {
      // if they don't exist, prompt them to create an account
      res.send('Please create an account')
    } else {
      // grab the user from the db and compare the passwords
      const user = await User.findOne({ email: email }).select('+password')
      if (!user || !(await user.correctPassword(password, user.password))) {
        res.send('Credentials do not match')
      } else {
        const token = signToken(user._id)
        res.status(200).send({
          status: 'success',
          token
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  loginUsers: loginUsers
}
