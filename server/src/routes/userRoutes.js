const express = require('express')
const UserController = require('../controllers/UserController')
const loginValidator = require('../middleware/validators/loginValidator')
const registerValidator = require('../middleware/validators/registerValidator')

const router = express.Router()
const userController = new UserController()

router.post('/user', registerValidator,userController.createUser)
router.post('/user/login', loginValidator, userController.login)
router.get('/user/:id', userController.getUsuario)
router.get('/user', userController.getUsuarios)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.penalizarUser)

module.exports = router