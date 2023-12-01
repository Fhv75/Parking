const express = require('express')
const VehicleController = require('../controllers/VehicleController')
const authenticate = require('../middleware/auth')

const router = express.Router()
const vehicleController = new VehicleController()

router.get('/vehicle/:id', authenticate, vehicleController.getVehicle)
router.get('/vehicles/:userId', authenticate, vehicleController.getUserVehicles)
router.get('/active-vehicles/:userId', authenticate, vehicleController.getActiveUserVehicles)
router.get('/vehicles', authenticate, vehicleController.getVehicles)
router.post('/vehicle', authenticate, vehicleController.createVehicle)
router.put('/vehicle/:id', authenticate, vehicleController.updateVehicle)
router.delete('/vehicle/:id', authenticate, vehicleController.deleteVehicle)

module.exports = router