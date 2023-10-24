const getDatabaseConnection = require("../db/conn")

class ParkingLotController {
    db
    constructor() {
        this.db = getDatabaseConnection()
        this.getParkingLotData = this.getParkingLotData.bind(this)
        this.getAvailableSlots = this.getAvailableSlots.bind(this)
    }

    async getParkingLotData(req, res) {
        try {
            const parkingLotData = await this.db.estacionamiento.findUnique({
                where: {
                    id: 1
                }
            })

            res.status(200).json(parkingLotData)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                message: 'Error al obtener los datos del estacionamiento',
                error: error.message
            })
        }
    }

    async getAvailableSlots(req, res) {
        try {
            const availableSlots = await this.db.estacionamiento.findUnique({
                where: {
                    id: 1
                },
                select: {
                    slots_disponibles: true
                }
            })

            res.status(200).json(availableSlots)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                message: 'Error al obtener los slots disponibles',
                error: error.message
            })
        }
    }

    async updateAvailableSlots(req, res) {
        try {
            const operation = req.updateType
            let updatedParkingSlot;

            if(operation === 'increase') {
                updatedParkingSlot = this.db.estacionamiento.update({
                    where: {
                        id: 1
                    },
                    data: {
                        slots_disponibles: this.slots_disponibles + 1
                    }
                })
            } else if(operation === 'decrease') {
                updatedParkingSlot = this.db.estacionamiento.update({
                    where: {
                        id: 1
                    },
                    data: {
                        slots_disponibles: this.slots_disponibles - 1
                    }
                })
            }

            res.status(200).json(updatedParkingSlot)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                message: 'Error al obtener los slots disponibles',
                error: error.message
            });
        }
    }
}

module.exports = ParkingLotController