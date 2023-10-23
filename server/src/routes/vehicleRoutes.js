const express = require('express')
const VehicleController = require('../controllers/VehicleController')

const router = express.Router()
const vehicleController = new VehicleController()

router.get('/vehicle/:id', vehicleController.getVehicle)
router.get('/vehicles/:userId', vehicleController.getUserVehicles)
router.get('/vehicles', vehicleController.getVehicles)
router.post('/vehicle', vehicleController.createVehicle)
router.put('/vehicle/:id', vehicleController.updateVehicle)
router.delete('/vehicle/:id', vehicleController.deleteVehicle)

module.exports = router