const mongoose = require('mongoose');

const BannerImages = mongoose.model('BannerImages', {
    Image: String
}, 'BannerImages');

const Categories = mongoose.model('Categories', {
    name: String,
    image: String,
    bannerImage: String,
    index: Number
}, 'Categories');

const Carts = mongoose.model('Carts', {
    P_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    U_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    title: String,
    banner: String,
    price: Number,
    quantity: Number
}, 'Carts');


module.exports = { BannerImages, Categories, Carts };