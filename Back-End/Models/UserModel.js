const mongoose = require('mongoose');

const UserModal = mongoose.model('Users', {
    UName: String,
    UEmail: String,
    UPassword: String,
    UImage: String
}, 'Users');

module.exports = UserModal;