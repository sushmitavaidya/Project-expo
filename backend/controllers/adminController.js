const Booking = require("../models/Booking");
const User = require("../models/usersModel");

// Function to get Dashboard Data (total booked slots, total customers, total revenue)
const getDashboardData = async (req, res) => {
  try {
    const totalBookedSlots = await Booking.countDocuments({});
    const totalCustomers = await Booking.distinct("vehicleNo").countDocuments();

    const bookings = await Booking.find();
    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.price,
      0
    );

    res.status(200).json({
      success: true,
      data: { totalBookedSlots, totalCustomers, totalRevenue },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get Monthly Revenue Data
const getMonthlyRevenue = async (req, res) => {
  try {
    const monthlyRevenue = await Booking.aggregate([
      {
        $addFields: {
          parkInDate: { $toDate: "$parkIn" }, // Convert parkIn to a Date object if not already in Date type
        },
      },
      {
        $project: {
          month: { $month: "$parkInDate" }, // Extract the month from parkIn date
          day: { $dayOfMonth: "$parkInDate" }, // Extract the day of the month
          revenue: "$price", // Assuming 'price' represents the revenue
        },
      },
      {
        $group: {
          _id: { month: "$month", day: "$day" }, // Group by month and day
          maxRevenue: { $max: "$revenue" }, // Get max revenue for that day
        },
      },
      {
        $sort: { "_id.month": 1, "_id.day": 1 }, // Sort by month and day (ascending)
      },
    ]);

    const monthlyData = {};
    monthlyRevenue.forEach(({ _id, maxRevenue }) => {
      const { month, day } = _id;
      if (!monthlyData[month]) {
        monthlyData[month] = Array(31).fill(0); // Initialize revenue data array for each month
      }
      monthlyData[month][day - 1] = maxRevenue; // Map revenue to corresponding day
    });

    const labels = Array.from({ length: 31 }, (_, i) => i + 1); // Labels for days of the month
    const datasets = Object.keys(monthlyData).map((month) => ({
      label: `Month ${month}`,
      data: monthlyData[month],
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      fill: true,
    }));

    return res.json({ success: true, labels, datasets });
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardData, getMonthlyRevenue };
