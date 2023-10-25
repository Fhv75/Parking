const express = require('express')
const ParkingLotController = require('../controllers/ParkingLotController')
const authenticate = require('../middleware/auth')
const updateSlots = require('../middleware/updateSlots')

const router = express.Router()
const parkingLotController = new ParkingLotController()

router.get('/parkinglot', parkingLotController.getParkingLotData)
router.get('/available-slots', parkingLotController.getAvailableSlots)
router.patch('/available-slots', authenticate, updateSlots, parkingLotController.updateAvailableSlots)
router.delete('/available-slots', authenticate, updateSlots, parkingLotController.updateAvailableSlots)

module.exports = router