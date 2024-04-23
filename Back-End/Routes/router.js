const express = require('express');
const router = express.Router();

const userController = require('../Controller/UserController');

router 
    .route('/')
    .get(userController.hello);

module.exports = router;