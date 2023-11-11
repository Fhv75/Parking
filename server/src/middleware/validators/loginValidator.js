const { body } = require('express-validator');

const loginValidator = [
    body('correo_electronico')
        .isEmail()
        .withMessage('Please provide a valid email address.'),
];

module.exports = loginValidator;
