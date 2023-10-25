const getDatabaseConnection = require("../db/conn")

class RegistryController {
    db

    constructor() {
        this.db = getDatabaseConnection()
        this.getRegistries = this.getRegistries.bind(this)
        this.createRegistry = this.createRegistry.bind(this)
        this.updateRegistry = this.updateRegistry.bind(this)
    }

    async getRegistries(req, res) {
        try {
            const registries = await this.db.registros.findMany()
            res.status(200).json(registries)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                message: 'Error al obtener los registros',
                error: error.message
            })
        }
    }

    async createRegistry(req, res) {
        try {
            const { id_usuario, id_vehiculo  } = req.body

            const registry = await this.db.registros.create({
                data: {
                    id_usuario: parseInt(id_usuario),
                    id_vehiculo: parseInt(id_vehiculo),
                    fecha_ingreso: new Date()
                },
            })

            res.status(201).json(registry)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                message: 'Error al crear el registro',
                error: error.message
            })
        }
    }

    async updateRegistry(req, res) {
        try {
            const { id } = req.params
            const { userId, vehicleId, exitDate } = req.body

            const registry = await this.db.registros.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    id_usuario: userId,
                    id_vehiculo: vehicleId,
                    fecha_salida: exitDate
                }
            })

            res.status(200).json(registry)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                message: 'Error al actualizar el registro',
                error: error.message
            })
        }
    }
}

module.exports = RegistryController