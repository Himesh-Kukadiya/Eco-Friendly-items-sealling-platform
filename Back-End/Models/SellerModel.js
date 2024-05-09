

const mongoose = require('mongoose');

const sellerModal = mongoose.model('Sellers', {
    UId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Userss',
        required: true
    },
    sellername : String,
    selleremail : String,
    mobile : String,
    adharno: String,
    about: String,
    password: String,
}, 'Sellers');

module.exports = sellerModal