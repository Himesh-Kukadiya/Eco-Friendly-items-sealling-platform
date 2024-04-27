const express = require('express');
const router = express.Router();

const userController = require('../Controller/UserController');
const productController = require('../Controller/ProductsController');
const defaultController = require('../Controller/DefaultController');
const cartController = require('../Controller/CartController');
const orderController = require('../Controller/OrderController');

router 
    .route('/sendOtp')
    .post(userController.sendOtp);
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

// order Controller
router
    .route('/makeOrder')
    .post(orderController.makeOrder);

router
    .route('/getKey')
    .get((req,res) => {res.status(200).json({key: "rzp_test_cX0VB9927mioP6"})})

router 
    .route('/paymentVarify') 
    .post(orderController.paymentVarify);

module.exports = router;