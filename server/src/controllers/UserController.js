const getDatabaseConnection = require("../db/conn")
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    db
    constructor() {
        this.db = getDatabaseConnection()
        this.createUser = this.createUser.bind(this)
        this.login = this.login.bind(this)
    }

    async createUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { correo_electronico, nombre, rut, contraseña, telefono } = req.body

            const hashedPw = await bcrypt.hash(contraseña, 10)

            const rol = correo_electronico.substring(correo_electronico.indexOf('@') + 1, correo_electronico.indexOf('.', correo_electronico.indexOf('@')) - 1)
            
            const user = await this.db.usuario.create({
                data: {
                    correo_electronico: correo_electronico,
                    nombre: nombre,
                    rut: rut,
                    contrase_a: hashedPw,
                    telefono: telefono,
                    rol: rol
                },
                select: { id: true, rut: true, rol: true }
            })

            res.status(201).json(user)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: 'Error al crear el usuario', error: error.message })
        }
    }

    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { correo_electronico, contraseña } = req.body

            const user = await this.db.usuario.findUnique({
                where: {
                    correo_electronico: correo_electronico
                },
            })

            const validPw = await bcrypt.compare(contraseña, user?.contrase_a)

            if (validPw) {
                const token = jwt.sign({
                    correo_electronico: user?.correo_electronico,
                    userId: user?.id,
                    rol: user?.rol
                },
                    process.env.JWT_KEY,
                    { expiresIn: '6h' }
                )
                return res.status(201).json({ token, userId: user?.id })
            } else {
                return res.status(401).json({
                    message: 'Falló la autenticación'
                })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message })
        }
    }
}

module.exports = UserController