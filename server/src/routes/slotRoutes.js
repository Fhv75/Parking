const express = require('express');
const SlotController = require('../controllers/SlotController');


const router = express.Router();
const slotController = new SlotController();


router.get('/slot', slotController.getSlotsDisponibles);

module.exports = router;
