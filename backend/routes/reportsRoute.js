const express = require("express");
const router = express.Router();
const Earnings = require("../models/reports"); // Import your earnings model
const User = require("../models/usersModel"); // Import your users model

// Endpoint to fetch earnings and users count for a specific date range
router.get("/summary", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Total earnings for a date range
    const earnings = await Earnings.aggregate([
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
    const customers = await User.countDocuments({
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
});

// Endpoint to fetch users' data for a specific date range
router.get("/users", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const users = await User.find({
      registrationDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users data" });
  }
});

module.exports = router;
