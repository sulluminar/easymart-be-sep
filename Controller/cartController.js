const carts = require('../Model/cartModel');

exports.addToCart = async (req, res) => {
    const userId = req.payload;
    const { id, title, price, quantity, description, category, image, rating, } = req.body;
    try {
        const existingProduct = await carts.findOne({ id, userId });
        if (existingProduct) {
            existingProduct.quantity = existingProduct.quantity + 1;
            existingProduct.grandTotal = existingProduct.quantity * existingProduct.price;
            existingProduct.save();
            res.status(200).json("Item added to cart")
        }
        else {
            console.log("===", userId)
            const newProduct = new carts({
                userId,
                id,
                title,
                price,
                description,
                category,
                image,
                rating,
                quantity,
                grandTotal: price,
            })
            newProduct.save();
            res.status(200).json("New Item added to cart")
        }
    } catch (error) {
        res.status(401).json(error)

    }

}

exports.getAllCartItems = async (req, res) => {
    const userId = req.payload;
    try {
        const allproducts = await carts.find({ userId });
        res.status(200).json(allproducts)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.removeItem = async (req, res) => {
    const { id } = req.params;
    try {
        await carts.deleteOne({ _id: id });
        res.status(200).json("Item removed successfully")

    } catch (error) {
        res.status(401).json("Error in removing item")
    }
}

exports.incrementItem = async (req, res) => {
    const { id } = req.params;
    try {
        const selectedItem = await carts.findOne({ _id: id });
        if (selectedItem) {
            selectedItem.quantity += 1;
            selectedItem.grandTotal = selectedItem.price * selectedItem.quantity;
            selectedItem.save();
            res.status(200).json(selectedItem)
        }
        else {
            res.status(401).json("No such product")
        }

    } catch (error) {
        res.status(401).json("error in incrementing item");
    }
}

exports.decrementItem = async (req, res) => {
    const { id } = req.params;
    try {
        const selectedItem = await carts.findOne({ _id: id })
        if (selectedItem) {
            selectedItem.quantity -= 1;
            if (selectedItem.quantity == 0) {
                await carts.deleteOne({ _id: id });
                res.status(200).json("Item removed from cart")
            }
            else {
                selectedItem.grandTotal = selectedItem.quantity * selectedItem.price;
                await selectedItem.save();
                res.status(200).json("Item decremented successfully")
            }
        }

    } catch (error) {
        res.status(401).json("unable to decrement item")
    }
}

exports.emptyCart = async (req,res)=>{
    const userId = req.payload;
    try {
        await carts.deleteMany({userId});
        res.status(200).json("cart deleted successfully")
    } catch (error) {
        res.status(401).json(error)
    }
}

