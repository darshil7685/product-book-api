const { check, validationResult } = require('express-validator');
const User = require('../models/User');


exports.loginValidator = [
    check('email')
    .notEmpty()
    .withMessage('Email field is required.')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email.'),  
    check('password')
    .notEmpty()
    .withMessage('Password is required.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            next()
        }
    }
]