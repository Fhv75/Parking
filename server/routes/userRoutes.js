const express = require('express')
const UserController = require('../controllers/UserController')

const router = express.Router()
const userController = new UserController()

router.post('/user', userController.createUser)

module.exports = router