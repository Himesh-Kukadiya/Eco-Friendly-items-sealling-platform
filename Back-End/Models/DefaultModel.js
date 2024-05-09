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
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sellers',
        required: true
    },
    title: String,
    banner: String,
    price: Number,
    quantity: Number,
}, 'Carts');

const dumyOrder = mongoose.model('dumyOrders', {
    U_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    ProductList: [Object],
    TotalAmount: Number,
    FullName: String,
    Address: String,
    Mobile: String,
    City: String,
    State: String,
    Zip: String,
    Country: String,
    date: Date
}, 'dumyOrders');

const Order = mongoose.model('Orders', {
    U_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    ProductList: [Object],
    TotalAmount: Number,
    FullName: String,
    Address: String,
    Mobile: String,
    City: String,
    State: String,
    Zip: String,
    Country: String,
    date: Date
}, 'Orders');


module.exports = { BannerImages, Categories, Carts, Order, dumyOrder };