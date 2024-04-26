const defaultModal = require('../Models/DefaultModel');

const addToCart = async (req, res) => {
    try {
        const cartController = defaultModal.Carts;
        const cartItem = req.body;
        const addIntoCart = await cartController.create(cartItem);
        if (addIntoCart) {
            return res.status(200).send({ message: 'Cart added successfully', newItem: addIntoCart })
        }
        res.status(200).send(newItem);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: "Internal Server Error" })
    }
}

const findCartList = async (req, res) => {
    try {
        const cartController = defaultModal.Carts;
        // const cartItem = req.body;
        const { userId } = (req.body)
        if (typeof (userId) === "string") {
            const cartList = await cartController.find({ U_id: userId });
            if (cartList) {
                return res.status(200).send(cartList);
            }
            res.status(200).send(cartList);
            console.log(cartList);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: "Internal Server Error" })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const cartController = defaultModal.Carts;
        const { id } = req.body; 

        // Use deleteOne to delete a single document matching the id
        const result = await cartController.deleteOne({ _id: id });

        if (result.deletedCount === 1) {
            // Document deleted successfully
            res.status(200).send({ message: "Document deleted successfully" });
        } else {
            // Document with the provided id not found
            res.status(404).send({ message: "Document not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const updateQuantity = async (req, res) => {
    try {
        const cartController = defaultModal.Carts;
        const { id, quantity } = req.body;
        const _id = id;
        const result = await cartController.findByIdAndUpdate(_id, { quantity: quantity });

        if (result) {
            // Document updated successfully
            res.status(200).send({ message: "Quantity updated successfully" });
        } else {
            // Document with the provided id not found
            res.status(404).send({ message: "Document not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


module.exports = {
    addToCart,
    findCartList,
    removeFromCart,
    updateQuantity
}