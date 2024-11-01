const express = require('express')
const productController= require('../Controller/productController');
const userController = require('../Controller/userController')
const router = new express.Router();
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const wishlistController = require('../Controller/wishlistController');
const cartController = require('../Controller/cartController')

// get all products
router.get('/all-product',productController.getAllProducts)

//user registration
router.post('/register',userController.registerController)

//user login
router.post('/login',userController.loginController)

// get product details by ID
router.get('/get-product/:id',productController.getProductDetailsById)

// add to wishlist
router.post('/add-wishlist',jwtMiddleware,wishlistController.addToWishlist)

//get wishliat items
router.get('/wishlist/allproduct',jwtMiddleware,wishlistController.getItemsFromWishlist)

//remove item from wishist
router.delete('/wishlist/removeItem/:id',jwtMiddleware,wishlistController.removeWishlistItem)

//add item to cart
router.post('/add-cart',jwtMiddleware,cartController.addToCart)

// get item from cart
router.get('/cart/allProduct', jwtMiddleware,cartController.getAllCartItems)

// remove item from cart
router.delete('/cart/remove-item/:id', jwtMiddleware,cartController.removeItem);

// increment item in cart
router.get('/cart/increment/:id',jwtMiddleware,cartController.incrementItem)

// decrement item in cart
router.get('/cart/decrement/:id', jwtMiddleware,cartController.decrementItem)

// empty cart
router.delete('/empty-cart',jwtMiddleware,cartController.emptyCart)


module.exports = router;