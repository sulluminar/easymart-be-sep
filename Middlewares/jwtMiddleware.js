const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1]
        console.log(token);
        const jwtResponse= jwt.verify(token,process.env.SECRET_KEY);
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
        
    } catch (error) {
        console.log("----------")
        res.status(401).json("Authorization failed, please login ...")
        
    }
}

module.exports = jwtMiddleware;