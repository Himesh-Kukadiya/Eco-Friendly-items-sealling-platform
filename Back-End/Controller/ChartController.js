const defaultModal = require('../Models/DefaultModel');
const ProductsModal = require('../Models/ProductModel');
const orderModal = defaultModal.Order;
const axios = require('axios');

const monthlyBarGraph = async (req, res) => {
    try {
        const { sellerId } = (req.body)

        const dates = [];
        const orders = await orderModal.find();
        const sellersOrder = [];
        orders.map((o) => {
            o.ProductList.map((p) => {
                if (p.S_id === sellerId) {
                    sellersOrder.push({
                        date: o.date,
                        price: p.price,
                        quantity: p.quantity
                    });
                }
            })
        });

        // reduce orders in month and total tevanue
        const monthlyTotalsArray = Object.entries(sellersOrder.reduce((totals, { date, price, quantity }) => {
            const month = new Date(date).toLocaleString('default', { month: 'long' });
            totals[month] = (totals[month] || 0) + price * quantity;
            return totals;
        }, {})).sort((a, b) => new Date('01 ' + a[0] + ' 2000').getMonth() - new Date('01 ' + b[0] + ' 2000').getMonth()).map(([month, total]) => ({ month, total }));
        res.status(200).json({ data: monthlyTotalsArray })
    }
    catch (e) {
        console.log(e.message);
        res.status(400).json({ message: 'Internal Server Error' });
    }
}

const categoriesBarGraph = async (req, res) => {
    try {
        const { sellerId } = req.body;

        const products = await ProductsModal.find({ sellerId });
        const uniqueCategories = [...new Set(products.map((p) => p.category))];
        let data = {};

        uniqueCategories.forEach(category => {
            data[category] = 0;
        });

        const orders = await orderModal.find({});
        for (const order of orders) {
            for (const product of order.ProductList) {
                if (sellerId === product.S_id) {
                    const productDetail = await ProductsModal.findById(product.P_id);
                    if (productDetail) {
                        data[productDetail.category] += product.price * product.quantity;
                    }
                }
            }
        }
        // Extract revenue for each category
        const revenue = uniqueCategories.map(category => data[category]);
        res.status(200).json({ category: uniqueCategories, revenue: revenue });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const CategoryComparison = async (req, res) => {
    try {
        const { sellerId } = req.body;
        const products = await ProductsModal.find({ sellerId });
        const uniqueCategories = [...new Set(products.map((p) => p.category))];

        const data = []
        const colors = ["red", "green", "blue", "orange", "lightblue", "purple", "black", "gray", "yellow", "lightcyan", "aqua",]
        
        const orders = await orderModal.find({});
        
        let ordersByCategory = {};
        await Promise.all(orders.map(async (o) => {
            await Promise.all(o.ProductList.map(async (p) => {
                const product = await ProductsModal.findById(p.P_id);
                if (product && product.sellerId === p.S_id) {
                    if (!ordersByCategory[product.category]) {
                        ordersByCategory[product.category] = [];
                    }
                    ordersByCategory[product.category].push({
                        price: p.price,
                        quantity: p.quantity,
                        date: o.date
                    });
                }
            }));
        }));

        const monthWiseTotals = {};

        for (const category in ordersByCategory) {
            monthWiseTotals[category] = Array(12).fill(0);

            for (const order of ordersByCategory[category]) {
                const month = new Date(order.date).getMonth(); // Get the month index (0-11)
                monthWiseTotals[category][month] += order.price * order.quantity; // Accumulate total for the month
            }
        }

        uniqueCategories.map((cat, index) => {
            const monthlyData = monthWiseTotals[cat]
            data.push({
                label: cat,
                data: monthlyData,
                backgroundColor: colors[index],
                borderColor: colors[index],
                fill: colors[index],
                borderWidth: 3,
                tension: 0.3
            })
        })
        res.status(200).json(data)
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = {
    monthlyBarGraph,
    categoriesBarGraph,
    CategoryComparison
}