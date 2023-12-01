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
        this.getUsuarios = this.getUsuarios.bind(this)
        this.getUsuario = this.getUsuario.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.penalizarUser = this.penalizarUser.bind(this)
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
            if (error.code === "P2002") {
                res.status(500).json({ message: 'Error al crear el usuario', target: error.meta.target.map((field) => field.replace("_", " ").replace(/^./, field[0].toUpperCase())) })
            } else {
                res.status(500).json({ message: 'Error al crear el usuario', error: error.message })
            }
            console.log(error)
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

            if (!user) {
                return res.status(401).json({
                    message: 'Falló la autenticación'
                })
            }
            console.log(contraseña)
            console.log(user?.contrase_a)
            const validPw = await bcrypt.compare(contraseña, user?.contrase_a)
            console.log(validPw)

            if (validPw) {
                const token = jwt.sign({
                    correo_electronico: user?.correo_electronico,
                    userId: user?.id,
                    rol: user?.rol
                },
                    process.env.JWT_KEY,
                    { expiresIn: '6h' }
                )
                return res.status(201).json({ token, userId: user?.id, userRol: user?.rol })
            } else {
                return res.status(401).json({
                    message: 'Falló la autenticación'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message })
        }
    }

    async getUsuarios(req, res) {
        try {
            const usuarios = await this.db.usuario.findMany()

            res.status(200).json(usuarios);
        } catch (error) {
            console.log(error.message)

            res.status(500).json({
                message: 'Error al obtener usuarios',
                error: error.message
            })
        }
    }

    async getUsuario(req, res) {
        try {
            const usuarioId = req.params.id
            const usuario = await this.db.usuario.findUnique({
                where: {
                    id: Number(usuarioId)
                }
            })

            res.status(200).json(usuario);
        } catch (error) {
            console.log(error.message)

            res.status(500).json({
                message: 'Error al obtener usuario',
                error: error.message
            })
        }
    }

    async updateUser(req, res) {
        try {
            Object.keys(req.body).forEach(key => {
                if (req.body[key] === "" || req.body[key] === NaN || req.body[key] === undefined) {
                    delete req.body[key]
                }
            })
            const usuarioId = req.params.id
            const { correo_electronico, nombre, rut, telefono, contraseña } = req.body
        
            let hashedPw
            if (contraseña) {
                hashedPw = await bcrypt.hash(contraseña, 10)
            }

            const usuario = await this.db.usuario.update({
                where: {
                    id: Number(usuarioId)
                },
                data: {
                    correo_electronico: correo_electronico,
                    nombre: nombre,
                    rut: rut,
                    telefono: telefono,
                    contrasen_a: hashedPw

                }
            })

            res.status(200).json(usuario);
        } catch (error) {
            console.log(error.message)

            res.status(500).json({
                message: 'Error al actualizar usuario',
                error: error.message
            })
        }
    }

    async penalizarUser(req, res) {
        try {
            const usuarioId = req.params.id
            const usuario = await this.db.usuario.findUnique({
                where: {
                    id: Number(usuarioId)
                }
            })
            if (usuario.penalizado === "si") {
                const update = await this.db.usuario.update({
                    where: {
                        id: Number(usuarioId)
                    },
                    data: {
                        penalizado: "no"
                    }
                })
            } else {
                const update = await this.db.usuario.update({
                    where: {
                        id: Number(usuarioId)
                    },
                    data: {
                        penalizado: "si"
                    }
                })
            }

            res.status(200).json(usuario);
        } catch (error) {
            console.log(error.message)

            res.status(500).json({
                message: 'Error al actualizar usuario',
                error: error.message
            })
        }
    }

}

module.exports = UserController