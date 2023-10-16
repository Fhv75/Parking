const SlotController = require('../../src/controllers/SlotController');

const express = require('express');
    
const app = express();
const req = {};
const res = {
  status: function (statusCode) {
    this.statusCode = statusCode;
    return this;
  },
  json: function (data) {
    console.log(data); 
  },
};


const slotController = new SlotController();
slotController.getSlotsDisponibles(req, res);
