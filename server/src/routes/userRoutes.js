const express = require('express')
const UserController = require('../controllers/UserController')
const loginValidator = require('../middleware/validators/loginValidator')
const registerValidator = require('../middleware/validators/registerValidator')


const router = express.Router()
const userController = new UserController()

router.post('/user', registerValidator,userController.createUser)
router.post('/user/login', loginValidator, userController.login)

module.exports = router