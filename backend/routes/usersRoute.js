const router = require('express').Router();
const  User  = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const usersModel = require('../models/usersModel');

//register new user
router.post('/register',async (req,res)=>{
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if(existingUser){
            return res.send({
                message: 'User already exists',
                success: false,
                data: null
            });
        }
        const userId = `USER-${Math.floor(100000 + Math.random() * 900000)}`;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // req.body.password = hashedPassword;
        const newUser = new User(
            {...req.body,
            userId,
            password : hashedPassword,}
        );
        await newUser.save();
        res.send({
            message: 'User created successfully',
            success: true,
            data: null
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null
        });
    }
});

//login user
router.post('/login',async (req,res)=>{
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if(!userExists){
            return res.send({
                message: 'User does not exist',
                success: false,
                data: null
            });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, userExists.password);
        if(!passwordMatch){
            return res.send({
                message: 'Invalid password',
                success: false,
                data: null
            });
        }
    
        const token = jwt.sign(
            { userId: userExists._id }, 
            process.env.jwt_secret,
            { expiresIn: '1d' }
        );

        res.send({
            message: 'User logged in successfully',
            success: true,
            data: token
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });
    }
});

//get user by id
router.post('/get-user-by-id', authMiddleware , async (req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            message: "User fetched successfully",
            success: true,
            data: user
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    console.log("UserId from middleware:", req.body.userId); // Log userId from middleware

    try {
        const user = await User.findById(req.body.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Route Error:", error); // Log error
        res.status(500).json({ message: 'Server error', success: false });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await usersModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch bookings" });
    }

})

module.exports = router;