// const router = require('express').Router();
// const SlotModel = require('../models/slot.js')
// router.get("/dashboard-data",async (req, res) => {
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

const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  getMonthlyRevenue,
} = require("../controllers/adminController");

// Route to get dashboard data
router.get("/dashboard-data", getDashboardData);

// Route to get hourly revenue
router.get("/monthly-revenue", getMonthlyRevenue);

module.exports = router;
