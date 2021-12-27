const { check, validationResult } = require('express-validator');
const User = require('../models/User');




exports.updateValidator = [
    check('name')
    .notEmpty()
    .withMessage('Name field is required.'),
    check('email')
    .notEmpty()
    .withMessage('Email field is required.')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(async(email, { req, res }) => {
        const user = await User.findOne({ email, _id: { $ne: req.user._id } });
        if (user) return Promise.reject('Email already exist')

    }),
    check('gender')
    .notEmpty()
    .withMessage('Gender is required.')
    .bail()
    .isIn(['male', 'female', 'others'])
    .withMessage('Please enter a valid Gender.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            next()
        }
    }
]