const { check, validationResult } = require('express-validator');
const User = require('../models/User');




exports.contectValidator = [
    check('phonNumber')
    .notEmpty()
    .withMessage('Number field is required.'),
    check('email')
    .notEmpty()
    .withMessage('Email field is required.')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email.'),
    check('addres')
    .notEmpty()
    .withMessage('addres is required.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            next()
        }
    }
]