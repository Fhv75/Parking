const { body } = require('express-validator');

const registerValidator = [
    body('correo_electronico')
        .isEmail()
        .withMessage('Please provide a valid email address.'),
    body('contraseña')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.'),
    body('nombre')
        .isAlpha()
        .withMessage('Name can only contain letters.')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long.'),
    body('telefono')
        .isMobilePhone()
        .withMessage('Please provide a valid phone number.'),
    body('rut')
        .isLength({ min: 8, max: 10 })
        .withMessage('rut must be between 8 and 10 characters long.')
];

module.exports = registerValidator;
