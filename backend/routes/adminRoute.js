const router = require('express').Router();
const  User  = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const Booking = require('../models/Booking');
const {
  getDashboardData,
  getMonthlyRevenue,
} = require("../controllers/adminController");

// router.get("/bookings",adminMiddleware,async (req, res) => {
//     try {
//         const bookings = await Booking.find();
//         console.log(bookings);
//         res.status(200).json(bookings);
//       } catch (error) {
//         res.status(500).json({ error: "Failed to fetch bookings" });
//       }
// })

// router.get("/dashboard-data",adminMiddleware,async (req, res) => {
//     try {
//         // Fetch total parking slots
//         const totalSlots = await SlotModel.countDocuments();
    
//         // Fetch total customers
//         const totalCustomers = await UserModel.countDocuments();
    
//         // Calculate total revenue
//         const totalRevenueData = await Booking.aggregate([
//           { $group: { _id: null, totalRevenue: { $sum: "$amountPaid" } } },
//         ]);
//         const totalRevenue = totalRevenueData[0]?.totalRevenue || 0;
    
//         res.status(200).json({ totalSlots, totalCustomers, totalRevenue });
//       } catch (error) {
//         res.status(500).json({ message: "Error fetching dashboard data", error });
//       }
// })

// Get dashboard data
router.get("/dashboard-data", getDashboardData);

// Get monthly revenue data
router.get("/monthly-revenue", getMonthlyRevenue);


router.get("/prices",adminMiddleware,async (req, res) => {
    try {
        const prices = await PriceModel.find();
        res.status(200).json(prices);
      } catch (err) {
        res.status(500).json({ error: "Error fetching prices" });
      }
})
router.post("/prices",adminMiddleware,async (req, res) => {
    const { type, amount } = req.body;
  
    // Check if price already exists
    const existingPrice = await PriceModel.findOne({ type });
    if (existingPrice) {
      return res
        .status(400)
        .json({
          error: `${
            type === "hourly" ? "Hourly" : "Daily (24 hours)"
          } price already exists.`,
        });
    }
  
    try {
      const newPrice = new PriceModel({ type, amount });
      await newPrice.save();
      res.status(201).json(newPrice);
    } catch (err) {
      res.status(500).json({ error: "Error adding price" });
    }
})
router.put("/price/:id",adminMiddleware,async (req, res) => {
    const { type, amount } = req.body;
    try {
      const updatedPrice = await PriceModel.findByIdAndUpdate(
        req.params.id,
        { type, amount },
        { new: true }
      );
      res.status(200).json(updatedPrice);
    } catch (err) {
      res.status(500).json({ error: "Error updating price" });
    }
})
router.delete("/price/:id",adminMiddleware,async (req, res) => {
    try {
        await PriceModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Price deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: "Error deleting price" });
      }
})
router.get("/reports/summary",adminMiddleware,async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      // Total earnings for a date range
      const earnings = await ReportModel.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalEarnings: { $sum: "$amount" },
          },
        },
      ]);
  
      // Total customers for a date range
      const customers = await UserModel.countDocuments({
        registrationDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });
  
      res.status(200).json({
        totalEarnings: earnings.length ? earnings[0].totalEarnings : 0,
        totalCustomers: customers,
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching report summary" });
    }
})
router.get("/reports/users",adminMiddleware,async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      const users = await UserModel.find({
        registrationDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users data" });
    } 
})
router.get("/transactions",adminMiddleware,async (req, res) => {
    try {
        // Fetch all transactions from the database
        const transactions = await TransactionModel.find()
          .populate("bookingId")
          .populate("userId");
    
        // Transform data if needed for frontend display
        const formattedTransactions = transactions.map((transaction) => ({
          transactionId: transaction.transactionId,
          bookingId: transaction.bookingId ? transaction.bookingId._id : "N/A",
          userId: transaction.userId ? transaction.userId._id : "N/A",
          paymentMethod: transaction.paymentMethod,
          amountPaid: transaction.amount,
          date: transaction.createdAt.toISOString().split("T")[0],
        }));
    
        res.status(200).json(formattedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Failed to fetch transactions." });
      }
})

module.exports = router;