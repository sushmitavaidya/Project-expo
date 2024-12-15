const Transaction = require('../models/Transaction');

const router = require('express').Router();

router.get("/",async (req, res) => {
    try {
        // Fetch all transactions from the database
        const transactions = await Transaction.find()
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