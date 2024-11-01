const products = require('../Model/productModel')

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await products.find()
        res.status(200).json(allProducts)

    } catch (error) {
        res.status(406).json(error)
    }
}

// get product details by ID
exports.getProductDetailsById = async (req, res) => {
    const {id} = req.params;
    try {
        const productDetails = await products.findOne({id});
        res.status(200).json(productDetails)

    } catch (error) {
        res.status(401).json(error)
    }
}