const express = require('express')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {sendMail} = require('../Models/EmailSender');

const app = express();
app.use(express.json());

// RazorPay Spacific Stuff...
const Razorpay = require('razorpay')
const razorpay = new Razorpay({
    key_id: 'rzp_test_cX0VB9927mioP6',
    key_secret: '7Oh9gRs0E4NyRPptXpFE7g03',
});

const defaultModal = require('../Models/DefaultModel');
const productModal = require('../Models/ProductModel');
const userModal = require('../Models/UserModel');

const makeOrder = async (req, res) => {
    try {
        const orderModal = defaultModal.dumyOrder;

        const { cart, customerData } = (req.body)
        const ProductList = cart.reduce((acc, item) => {
            const { sellerId, P_id, quantity, price } = item;
            acc.push({ P_id, S_id: sellerId, quantity, price });
            return acc;
        }, []);

        const newOrder = {
            U_id: cart[0].U_id,
            ProductList,
            TotalAmount: customerData.totalAmount,
            FullName: customerData.fullName,
            Address1: customerData.addressLine1,
            Address2: customerData.addressLine2,
            City: customerData.city,
            State: customerData.state,
            Zip: customerData.zipCode,
            Country: customerData.country
        }
        const add = await orderModal.create(newOrder)
        const orderId = (add._id.toString());

        const options = {
            amount: customerData.totalAmount * 100,
            currency: 'INR',
            receipt: 'order_receipt_' + Math.floor(Date.now() / 1000),
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ order, orderId })

    }
    catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Internal Server Error' });
    }
}

const paymentVarify = async (req, res) => {
    try {
        const dumyOrderModal = defaultModal.dumyOrder;
        const orderModal = defaultModal.Order;
        const { id } = req.query;

        const dumyOrder = await dumyOrderModal.findById(id);
        if (dumyOrder) {
            const validOrder = {
                U_id: dumyOrder.U_id,
                ProductList: dumyOrder.ProductList,
                TotalAmount: dumyOrder.TotalAmount,
                FullName: dumyOrder.FullName,
                Address1: dumyOrder.Address1,
                Address2: dumyOrder.Address2,
                City: dumyOrder.City,
                State: dumyOrder.State,
                Zip: dumyOrder.Zip,
                Country: dumyOrder.Country,
                date: Date.now(),
            }
            const newOrder = await orderModal.create(validOrder);
            if (newOrder) {
                const producst = newOrder.ProductList;
                producst.map( async (product) => {
                    const item = await productModal.findByIdAndUpdate(
                        { _id: product.P_id }, 
                        { $inc: { quantity: -product.quantity } }
                    );
                });

                const userData = await userModal.findById({_id: newOrder.U_id});

                await dumyOrderModal.findByIdAndDelete({_id: id});
                const subject = "EcoS's Order";
                const message = `Hello ${userData.UName} you place order for our best products, your order id is ${newOrder._id}, you get this products at your address in few days`;
                sendMail(subject, message, userData.UEmail);

            }
            res.redirect(`http://localhost:5173/cart-view`);
        } else {
            return res.status(400).json({ success: false, message: "Order not found" });
        }

    } catch (e) {
        // Handle any internal server errors
        console.error(e);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getOrderHistory = async (req, res) => {
    try {
        const { UId } = req.body;
        const orderModal = defaultModal.Order;
        const orders = await orderModal.find({ U_id: UId });

        let allOrders = [];

        await Promise.all(orders.map(async (order) => {
            for (const pl of order.ProductList) {
                const productDetail = await productModal.findById(pl.P_id);
                if (productDetail) {
                    allOrders.push({
                        OId: order._id,
                        PId: pl.P_id,
                        PImage: productDetail.banner,
                        PName: productDetail.title,
                        SId: pl.S_id,
                        Price: productDetail.price,
                        Quantity: pl.quantity,
                        Total: productDetail.price * pl.quantity,
                        Date: order.date ? order.date.toISOString().split('T')[0] : 'Date not spacified'
                    });
                }
            }
        }));

        console.log(allOrders);
        
        if(allOrders.length > 0) {
            return res.status(200).json({allOrders});
        }
        res.status(404).json({message: "No Orders found"});
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}



module.exports = {
    makeOrder,
    paymentVarify,
    getOrderHistory
}