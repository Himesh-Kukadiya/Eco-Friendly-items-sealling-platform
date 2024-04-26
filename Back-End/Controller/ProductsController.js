const productsModel = require('../Models/ProductModel')

const getAllProducts = async (req, res) => {
    try {
        
        const products = await productsModel.find();
        if (products) {
            return res.status(200).json(products);
        }

        res.status(404).json({
            message: "No products found"
        });
    }
    catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getAllProducts
}