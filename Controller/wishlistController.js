const wishlists = require('../Model/wishlistModel')

exports.addToWishlist = async (req, res) => {
    console.log("===1-==");
    const { id, title, price, description, category, image, rating } = req.body;
    const userId = req.payload;
    console.log(id, title, price, description, category, image, rating)
    console.log(userId)
    try {
        const existingProduct = await wishlists.findOne({ id, userId });
        if (existingProduct) {
            res.status(406).json("product already exist in your wishlist")
        }
        else {
            const newProduct = new wishlists({
                userId, id, title, price, description, category, image, rating,
            })
            await newProduct.save();
            res.status(200).json("product added to wishlist successfully")
        }
    } catch (error) {
        res.status(401).json(error)

    }

}
exports.getItemsFromWishlist = async (req, res) => {
    const userId = req.payload;
    try {
        const allproducts = await wishlists.find({ userId });
        res.status(200).json(allproducts)

    } catch (error) {
        res.status(401).json("Error in getting wishlist items")
    }
}
exports.removeWishlistItem = async(req,res)=>{
    const {id} = req.params;
    console.log("22222".id)
    try {
        const removeditem = await wishlists.findByIdAndDelete({_id:id});
        res.status(200).json("Item removed from wishlist")
    } catch (error) {
        res.status(401).json("Error in removing item")
    }
}