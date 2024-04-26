const mongoose = require('mongoose');

const UserModal = mongoose.model('Seller', {
    SellerId: Number,
    sellername: String,
    selleremail: String,
    mobile: String,
    adharno: String,
    password: String
}, 'Seller');

module.exports = UserModal;