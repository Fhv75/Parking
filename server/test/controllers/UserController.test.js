const UserController = require('../../src/controllers/UserController')
const bcrypt = require('bcrypt')
const { mockUsuario } = require('db/conn')

jest.mock('db/conn')
jest.mock('bcrypt')

describe('UserController', () => {
  let userController

  beforeEach(() => {
    userController = new UserController()
  })

  describe('createUser', () => {
    it('should create a user and return a 201 status', async () => {
      const req = {
        body: {
          correo_electronico: 'test@example.com',
          nombre: 'Test User',
          rut: '12345678-9',
          contraseña: 'password',
          telefono: '1234567890'
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      mockUsuario.create.mockResolvedValue({ id: 1, rut: '12345678-9' })
      bcrypt.hash.mockResolvedValue('hashedpassword')

      await userController.createUser(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({ id: 1, rut: '12345678-9' })
    })

    it('should return a 400 status for incomplete data', async () => {
      const req = { body: {} }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await userController.createUser(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Datos incompletos' })
    })

    // ...other tests for error handling, etc.
  })
})
