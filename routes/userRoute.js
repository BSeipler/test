const express = require('express')
const userController = require('./../controllers/userController')

const router = express.Router()

router.get('/', userController.getUsers)

router.post('/', userController.createUser)

router.post('/login', userController.loginUsers)

module.exports = router
