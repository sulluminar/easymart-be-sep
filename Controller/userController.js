
const users = require('../Model/userModel')
const jwt = require('jsonwebtoken')


// register user
exports.registerController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Account already exist")
        }
        else {
            const newUser = new users({
                username,
                email,
                password,
            })
            newUser.save();
            res.status(200).json("user registerd successfully")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//login
exports.loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email, password });
        if (existingUser) {
            const token = jwt.sign({userId:existingUser._id},process.env.SECRET_KEY)
            res.status(200).json({existingUser,token})
        }
        else {
            res.status(406).json("Invalid email id or password")
        }

    } catch (error) {
        res.status(401).json(error)
    }
}