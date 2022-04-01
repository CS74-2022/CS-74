const { Schema, model } = require('mongoose');

const newUser = new Schema({
    firebaseID: {
        type:String
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    serviceType: {
        type: String
    },
    nameCenter: {
        type: String
    },
}, {timestamps: true});

module.exports = model('user', newUser)