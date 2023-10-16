const { body } = require('express-validator');

const loginValidator = [
    body('correo_electronico')
        .isEmail()
        .withMessage('Please provide a valid email address.'),
    body('contraseña')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
];

module.exports = loginValidator;
