const productModal = require('../Models/ProductModel')
const defaultModal = require('../Models/DefaultModel')
const orderModal = defaultModal.Order;
const userModal = require('../Models/UserModel')
const sellerModal = require('../Models/SellerModel')
const adminModal = require('../Models/adminModel')

const adminLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const adminData = await adminModal.findOne({ AEmail: email });
        if (!adminData) { // check boxkeeper or not...
            return res.status(404).json({ isLoggedIn: false, message: 'Admin not found' });
        }
        if (password != adminData.APassword) { // check cradentioal
            return res.status(401).json({ isLoggedIn: false, message: 'Invalid credentials' });
        }
        const admin = {
            _id: adminData._id,
            AName : adminData.AName,
            AMobile : adminData.AMobile,
            AEmail : adminData.AEmail,
            AImageURL : adminData.AImageURL
        }
        // send data with login success...
        res.status(200).json({ isLoggedIn: true, message: 'Login successful', data: admin });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}
const getCounter = async (req, res) => {
    try{
        const counter = {
            totalUser: await userModal.countDocuments(),
            totalSeller: await sellerModal.countDocuments(),
            totalProduct: await productModal.countDocuments(),
            totalOrder: await orderModal.countDocuments()
        }
        res.status(200).json({counter});
    }
    catch(e) {
        console.error(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const getUserDerail = async (req, res) => {{
    try{
        const users = await userModal.find();
        res.status(200).json(users);
    }
    catch(e) {
        console.error(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}}

const getSellers = async (req, res) => {
    try{
        const seller = await sellerModal.find();
        res.status(200).json(seller);
    }
    catch(e) {
        console.error(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const getProductDetails = async (req, res) => {
    try{
        const seller = await sellerModal.find();
        const product = await productModal.find();
        const productList = [];
        product.map(async (prod) => {
            let sellerName = "";
            for (const sell of seller) {
                if(prod.sellerId == sell._id) {
                    sellerName = sell.sellername;
                }
            }
            productList.push({
                banner: prod.banner,
                title: prod.title,
                seller: sellerName, // Access sellername from populated sellerId
                category: prod.category,
                brand: prod.brand,
                price: prod.price,
                quantity: prod.quantity,
                description: prod.description,
            })
        })

        res.status(200).json(productList);
    }
    catch(e) {
        console.error(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const getOrders = async (req, res) => {
    try {
        const order = await orderModal.find();
        const orders = [];

        for (const ord of order) {
            for (const prod of ord.ProductList) {
                const sellerData = await sellerModal.findById({_id: prod.S_id})
                const productDetail = await productModal.findById(prod.P_id);
                orders.push({
                    Image: productDetail.banner,
                    Product: productDetail.title,
                    User: ord.FullName,
                    Seller: sellerData.sellername, // Access sellername from populated sellerId
                    Category: productDetail.category,
                    Status: prod.status,
                    Price: prod.price,
                    Quantity: prod.quantity,
                    TotalAmount: prod.quantity * prod.price,
                    Date: ord.date ? ord.date.toISOString().split('T')[0] : 'Date not specified',
                });
            }
        }

        res.status(200).json(orders);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Internal Server Error' }); // Corrected status code to 500 for internal server error
    }
};

const getMonthlySelling = async (req, res) => {
    try {
        const orders = await orderModal.find();
        const Orders = [];

        // Flatten orders into a single array
        orders.forEach((o) => {
            o.ProductList.forEach((p) => {
                Orders.push({
                    date: o.date,
                    price: p.price,
                    quantity: p.quantity
                });
            });
        });

        // Reduce orders to calculate total selling price and total product selling quantity for each month
        const monthlyTotals = Orders.reduce((totals, { date, price, quantity }) => {
            const month = new Date(date).toLocaleString('default', { month: 'short' });
            if (!totals[month]) {
                totals[month] = {
                    TotalSelling: 0,
                    TotalProductSelling: 0
                };
            }
            totals[month].TotalSelling += price * quantity;
            totals[month].TotalProductSelling += quantity;
            return totals;
        }, {});

        // Sort months alphabetically
        const sortedMonthlyTotals = Object.fromEntries(
            Object.entries(monthlyTotals).sort((a, b) => new Date('01 ' + a[0] + ' 2000').getMonth() - new Date('01 ' + b[0] + ' 2000').getMonth())
        );

        res.status(200).json(sortedMonthlyTotals);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    adminLogin,
    getCounter,
    getUserDerail,
    getSellers,
    getProductDetails,
    getOrders,
    getMonthlySelling,
}