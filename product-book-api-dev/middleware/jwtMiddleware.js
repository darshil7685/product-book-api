const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authentication = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if (!token) {
            const error = new Error()
            error.status = 401;
            error.message = "Please authenticate.";
            return next(error)
        }
        const decoded = await jwt.verify(token.replace('Bearer ', ''), "secret")
        const user = await User.findOne({ _id: decoded._id })
        if (!user) {
            const error = new Error()
            error.status = 401;
            error.message = "Please authenticate.";
            return next(error)
        }
        req.user = user;
        next()
    } catch (err) {
        console.log(err)
        const error = new Error()
        error.status = 401;
        error.message = "Please authenticate.";
        next(error)
    }
}