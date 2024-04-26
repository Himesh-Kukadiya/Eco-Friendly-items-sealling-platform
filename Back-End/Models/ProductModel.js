const mongoose = require('mongoose');

const ProductsModal = mongoose.model('Products', {
    sellerId: String,
    title: String,
    price: Number,
    category: String,
    description: String,
    images: [String],
    banner: String,
    brand: String,
    rate: Number,
    quantity: Number
}, 'Products');

module.exports = ProductsModal;