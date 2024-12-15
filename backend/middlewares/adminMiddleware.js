const jwt = require('jsonwebtoken');

const adminMiddleware = (req , res , next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({message : "Auth failed",success: false });
        }
        const decoded = jwt.verify(token , process.env.jwt_secret);
        if(decoded !== process.env.admin_email + process.env.admin_password){
            return res.status(401).json({message : "Auth failed",success: false });
        }
        // req.body.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({message : "Auth failed",success: false });
    }
};
module.exports = adminMiddleware;