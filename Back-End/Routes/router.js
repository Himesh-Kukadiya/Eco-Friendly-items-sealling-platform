const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const userController = require('../Controller/UserController');
const productController = require('../Controller/ProductsController');
const defaultController = require('../Controller/DefaultController');
const cartController = require('../Controller/CartController');
const orderController = require('../Controller/OrderController');
const sellerController = require('../Controller/SellerController');
const chartController = require('../Controller/ChartController');
const adminController = require('../Controller/AdminController');


router 
    .route('/sendOtp')
    .post(userController.sendOtp);
router 
    .route('/signup')
    .post(userController.signup);
router 
    .route('/login')
    .post(userController.login);
router 
    .route('/sendRequestToSeller')
    .post(userController.sendRequestToSeller);
router 
    .route('/sellerStatus')
    .post(userController.sellerStatus);

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
router 
    .route('/getOrderHistory') 
    .post(orderController.getOrderHistory);
router 
    .route('/cancelOrder') 
    .post(orderController.cancelOrder);
router 
    .route('/updateStatus') 
    .post(orderController.updateStatus);

// seller controller
router 
    .route('/sellerLogin') 
    .post(sellerController.sellerLogin);
router 
    .route('/getTotals') 
    .post(sellerController.getTotals);
router 
    .route('/getSellerProducts') 
    .post(sellerController.getSellerProducts);
router 
    .route('/specificProduct') 
    .post(sellerController.specificProduct);
router 
    .route('/updateProductWithoutImage') 
    .post(sellerController.updateProductWithoutImage);
router 
    .route('/getOrders') 
    .post(sellerController.getOrders);

// file upload
{
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/Images/Products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.route("/addProduct")
    .post(upload.single('image'), sellerController.addProduct)
router.route("/updateProductWithImage")
    .post(upload.single('image'), sellerController.updateProductWithImage)
}

// charts controller
router 
    .route('/monthlyBarGraph') 
    .post(chartController.monthlyBarGraph);
router 
    .route('/categoriesBarGraph') 
    .post(chartController.categoriesBarGraph);
router 
    .route('/CategoryComparison') 
    .post(chartController.CategoryComparison);


// Admin Controller
router 
    .route('/adminLogin')
    .post(adminController.adminLogin)
router 
    .route('/getCounter')
    .get(adminController.getCounter)
router 
    .route('/getUserDerail')
    .get(adminController.getUserDerail)
router 
    .route('/getSellers')
    .get(adminController.getSellers)
router 
    .route('/getProductDetails')
    .get(adminController.getProductDetails)
router 
    .route('/getOrders')
    .get(adminController.getOrders)
router 
    .route('/getMonthlySelling')
    .get(adminController.getMonthlySelling)

module.exports = router;