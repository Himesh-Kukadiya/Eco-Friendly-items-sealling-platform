const express = require('express');
const router = express.Router();

const userController = require('../Controller/UserController');
const productController = require('../Controller/ProductsController');
const defaultController = require('../Controller/DefaultController');
const cartController = require('../Controller/CartController');
router 
    .route('/signup')
    .post(userController.signup);
router 
    .route('/login')
    .post(userController.login);

// product Controller
router 
    .route('/getProducts')
    .get(productController.getAllProducts);

// default controller
router 
    .route('/getImages')
    .get(defaultController.getImages);
router 
    .route('/getCategories')
    .get(defaultController.getCategories);
router 
    .route('/getCategoryNames')
    .get(defaultController.getCategoryNames);
router 
    .route('/getbannerImage')
    .get(defaultController.getbannerImage);

// Cart Controllers
router
    .route('/addToCart')
    .post(cartController.addToCart);
router
    .route('/findCartList')
    .post(cartController.findCartList);
router
    .route('/removeFromCart')
    .post(cartController.removeFromCart);
router
    .route('/updateQuantity')
    .post(cartController.updateQuantity);

module.exports = router;