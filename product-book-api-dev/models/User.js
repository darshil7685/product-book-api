const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    gender: { type: String, enum: ['male', 'female', 'others'] },
    profile_pic: { type: String },
    password: { type: String, select: false },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', userSchema)