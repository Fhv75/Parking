const getDatabaseConnection = require("../db/conn")

class VehicleController {
    db
    constructor() {
        this.db = getDatabaseConnection()
        this.getUserVehicles = this.getUserVehicles.bind(this)
        this.getActiveUserVehicles = this.getActiveUserVehicles.bind(this)
        this.getVehicles = this.getVehicles.bind(this)
        this.getVehicle = this.getVehicle.bind(this)
        this.createVehicle = this.createVehicle.bind(this)
        this.updateVehicle = this.updateVehicle.bind(this)
        this.deleteVehicle = this.deleteVehicle.bind(this)
    }

    async getVehicle(req, res) {

        try {
            const vehicleId = req.params.id
            const vehicles = await this.db.vehiculo.findUnique({
                where: {
                    id: Number(vehicleId)
                }
            })

            res.status(200).json(vehicles);
        } catch (error) {
            console.log(error.message)

            res.status(500).json({
                message: 'Error al obtener vehiculo',
                error: error.message
            })
        }
    }

    async getUserVehicles(req, res) {
        try {
            const userId = req.params.userId
            const vehicles = await this.db.vehiculo.findMany({
                where: {
                    user_id: Number(userId)
                }
            })

            res.status(200).json(vehicles);
        } catch (error) {
            console.log(error.message)

            res.status(500).json({
                message: 'Error al obtener vehiculos',
                error: error.message
            })
        }
    }

    async getActiveUserVehicles(req, res) {
        try {
            const userId = req.params.userId
            const vehicles = await this.db.vehiculo.findMany({
                where: {
                    user_id: Number(userId),
                    esta_activo: 'si'
                }
            })

            res.status(200).json(vehicles);
        } catch (error) {
            console.log(error.message)

            res.status(500).json({
                message: 'Error al obtener vehiculos',
                error: error.message
            })
        }
    }

    async getVehicles(req, res) {
        try {
            const vehicles = await this.db.vehiculo.findMany()

            res.status(200).json(vehicles);
        } catch (error) {
            console.log(error.message)

            res.status(500).json({
                message: 'Error al obtener vehiculos',
                error: error.message
            })
        }
    }

    async createVehicle(req, res) {
        try {
            const {
                userId,
                patente,
                marca,
                modelo,
                color
            } = req.body

            const newVehicle = await this.db.vehiculo.create({
                data: {
                    user_id: Number(userId),
                    patente: patente,
                    marca: marca,
                    modelo: modelo,
                    color: color
                }
            })

            res.status(201).json(newVehicle)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                message: 'Error al crear vehiculo',
                error: error.message
            })
        }
    }

    async updateVehicle(req, res) {
        try {
            Object.keys(req.body).forEach(key => {
                if (req.body[key] === "" || req.body[key] === NaN || req.body[key] === undefined) {
                    delete req.body[key]
                }
            })
            const vehicleId = req.params.id
            let {
                userId,
                patente,
                marca,
                modelo,
                color
            } = req.body

            userId ? userId = Number(userId) : userId = undefined

            const updatedVehicle = await this.db.vehiculo.update({
                where: {
                    id: Number(vehicleId)
                },

                data: {
                    user_id: userId,
                    patente: patente,
                    marca: marca,
                    modelo: modelo,
                    color: color
                }
            })

            res.status(200).json(updatedVehicle)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                message: 'Error al actualizar vehiculo',
                error: error.message
            })
        }
    }

    async deleteVehicle(req, res) {
        try {
            const vehicle = await this.db.vehiculo.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            })
            const vehicleId = req.params.id

            if (vehicle.esta_activo === 'si') {
                const deletedVehicle = await this.db.vehiculo.update({
                    where: {
                        id: Number(vehicleId)
                    },
                    data: {
                        esta_activo: 'no'
                    }
                })
            } else {
                const deletedVehicle = await this.db.vehiculo.update({
                    where: {
                        id: Number(vehicleId)
                    },
                    data: {
                        esta_activo: 'si'
                    }
                })
            }

            res.status(204).json({})
        } catch (error) {
            console.log(error.message)

            res.status(500).json({
                message: 'Error al eliminar vehiculo',
                error: error.message
            })
        }
    }
}

module.exports = VehicleController