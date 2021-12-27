const mongoose = require('mongoose')


const contectSchema = new mongoose.Schema({
    phonNumber: { type: Number },
    email: { type: String },
    addres: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Contactr', contectSchema)