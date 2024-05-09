
const sellerModal = require('../Models/SellerModel');
const productModal = require('../Models/ProductModel');
const defaultModal = require('../Models/DefaultModel');

const sellerLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const seller = await sellerModal.findOne({selleremail: email});
        
        if(seller) {
            if(password === seller.password) {
                return res.status(200).json({message: 'login successful', seller: seller});
            }
            else {
                return res.status(400).json({message: 'Invalid Credentials'});
            }
        }

        res.status(400).json({message: 'Invalid Seller'});
        
    }
    catch(e) {
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const getTotals = async (req, res) => {
    try {
        const {_id} = req.body;
        const producst = await productModal.find({sellerId: _id});

        // find categories
        const category = [];
        let totalStock = 0;

        producst.map(product => {
            category.push(product.category);
            totalStock += product.quantity;
        });
        const uniqueCategory = category.filter((c, index) => category.indexOf(c) === index);
        
        const orderModel = defaultModal.Order;
        // find total orders
        let totalOrders = 0;
        const userIds = [];
        let totalGenaratedRevanue = 0;

        const orders = await orderModel.find();
        await Promise.all(orders.map(async (order) => {
            userIds.push(order.U_id.toString());
            for (const pl of order.ProductList) {
                if(pl.S_id === _id) {
                    totalOrders += 1;
                    totalGenaratedRevanue += pl.quantity * pl.price;
                }
            }
        }));

        // find total users
        const uniqueUsers = userIds.filter((u, index) => userIds.indexOf(u) === index);
        console.log(uniqueCategory);
        
        const totals ={
            totalProducts: producst.length,
            totalOrders: totalOrders,
            totalCategories: uniqueCategory.length,
            totalUsers: uniqueUsers.length,
            totalStock: totalStock,
            totalGenaratedRevanue: totalGenaratedRevanue,
        }
        res.status(200).json(totals);
    }
    catch(e) {
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const addProduct = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const data = (req.body);
        const product = JSON.parse(data.product);
        product.banner =  "http://localhost:7575/Images/Products/" + req.file.filename;
        product.images[0] = "http://localhost:7575/Images/Products/" + req.file.filename;
        
        const newProduct = await productModal.create(product);
        if (newProduct) {
            return res.status(200).json({ message: "Product added Successfull" });
        }
        
        res.status(404).json({ message: "Something went wrong" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getSellerProducts = async (req, res) => {
    try {
        const {sellerId} = (req.body);
        const sellerProducts = await productModal.find({sellerId})
        if(sellerProducts) {
            return res.status(200).json({sellerProducts});
        }
        res.status(404).json({ message: "Product not found" });
    }
    catch(e) {
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}   

const specificProduct = async (req, res) => {
    try {
        const {_id} = (req.body);
        const productDetail = await productModal.findById({_id});

        if(productDetail) {
            return res.status(200).json({productDetail});
        }
        res.status(404).json({message: "Product not found"});
    }
    catch(e) {
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const updateProductWithoutImage = async (req, res) => {
    try {
        const { product } = req.body;
        const updatedProduct = await productModal.findByIdAndUpdate(product._id, product, { new: true });
        if(updatedProduct) {
            return res.status(200).json({ message: 'Product updated successfully', updatedProduct });
        }
        res.status(404).json({message: 'Product not found'});
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: 'Internal Server Error' });
    }
}


const updateProductWithImage = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const data = (req.body);
        const product = JSON.parse(data.product);
        product.banner =  "http://localhost:7575/Images/Products/" + req.file.filename;
        product.images[0] = "http://localhost:7575/Images/Products/" + req.file.filename;

        const updatedProduct = await productModal.findByIdAndUpdate(product._id, product, { new: true });
        if(updatedProduct) {
            return res.status(200).json({ message: 'Product updated successfully', updatedProduct });
        }
        res.status(404).json({message: 'Product not found'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const getOrders = async (req, res) => {
    try {
        const orderModel = defaultModal.Order;
        const {sellerId} = (req.body)

        const orders = await orderModel.find().sort({ createdAt: 1 });
        const sellerOrders = [];
        await Promise.all(orders.map(async (order) => {
            // console.log(order._id)
            for (const pl of order.ProductList) {
                if(pl.S_id == sellerId) {
                    const product = await productModal.findById({_id: pl.P_id})
                    const neworder = {
                        id: order._id.toString(),
                        banner: product.banner,
                        PName: product.title,
                        PId: product._id,
                        quantity: pl.quantity,
                        price: product.price,
                        totalAmount: pl.quantity * product.price,
                        address: order.Address,
                        zipCode: order.Zip,
                        customerName: order.FullName,
                        customerMobile: order.Mobile,
                        status: pl.status,
                        date: order.date ? order.date.toISOString().split('T')[0] : 'Date not specified',
                    }
                    sellerOrders.push(neworder);
                }
            }
        }));
        // console.log('orders: ',sellerOrders)
        if(sellerOrders.length > 0) {
            return res.status(200).json({sellerOrders});
        }
        res.status(404).json({message: 'Order not found'});

    }
    catch(e) {
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

module.exports = {
    sellerLogin, 
    getTotals,
    addProduct,
    getSellerProducts, 
    specificProduct,
    updateProductWithImage,
    updateProductWithoutImage,
    getOrders,
}

