const express = require("express");
const Price = require("../models/Price");
const router = express.Router();

// Get all prices
router.get("/", async (req, res) => {
  try {
    const prices = await Price.find();
    res.status(200).json(prices);
  } catch (err) {
    res.status(500).json({ error: "Error fetching prices" });
  }
});

// Add a new price
router.post("/", async (req, res) => {
  const { type, amount } = req.body;

  // Check if price already exists
  const existingPrice = await Price.findOne({ type });
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
    const newPrice = new Price({ type, amount });
    await newPrice.save();
    res.status(201).json(newPrice);
  } catch (err) {
    res.status(500).json({ error: "Error adding price" });
  }
});

// Update a price
router.put("/:id", async (req, res) => {
  const { type, amount } = req.body;
  try {
    const updatedPrice = await Price.findByIdAndUpdate(
      req.params.id,
      { type, amount },
      { new: true }
    );
    res.status(200).json(updatedPrice);
  } catch (err) {
    res.status(500).json({ error: "Error updating price" });
  }
});

// Delete a price
router.delete("/:id", async (req, res) => {
  try {
    await Price.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Price deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting price" });
  }
});

module.exports = router;
