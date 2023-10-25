const express = require('express')
const RegistryController = require('../controllers/RegistryController')
const authenticate = require('../middleware/auth')

const registryController = new RegistryController()
const router = express.Router()

router.get('/registries', authenticate, registryController.getRegistries)
router.post('/registry', authenticate, registryController.createRegistry)
router.put('/registry/:id', authenticate, registryController.updateRegistry)

module.exports = router