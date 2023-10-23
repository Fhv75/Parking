const express = require('express')
const ParkingLotController = require('../controllers/ParkingLotController')
const updateSlots = require('../middleware/updateSlots')

const router = express.Router()
const parkingLotController = new ParkingLotController()

router.get('/parkinglot', parkingLotController.getParkingLotData)
router.get('/available-slots', parkingLotController.getAvailableSlots)
router.patch('/available-slots', updateSlots, parkingLotController.updateAvailableSlots)
router.delete('/available-slots', updateSlots, parkingLotController.updateAvailableSlots)

module.exports = router