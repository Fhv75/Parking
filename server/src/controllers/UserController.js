const getDatabaseConnection = require("../db/conn")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    db
    constructor() {
        this.db = getDatabaseConnection()
        this.createUser = this.createUser.bind(this)
    }

    async createUser(req, res) {
        try {
            const { correo_electronico, nombre, rut, contraseña, telefono } = req.body
            if (!correo_electronico || !nombre || !rut || !contraseña || !telefono) {
                return res.status(400).json({ message: 'Datos incompletos' })
            }

            const hashedPw = await bcrypt.hash(contraseña, 10)

            const user = await this.db.usuario.create({
                data: {
                    correo_electronico: correo_electronico,
                    nombre: nombre,
                    rut: rut,
                    contrase_a: hashedPw,
                    telefono: telefono,
                    rol: 'alumno'
                },
                select: { id: true, rut: true }
            })

            res.status(201).json(user)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: 'Error al crear el usuario', error: error.message })
        }
    }
}

module.exports = UserController