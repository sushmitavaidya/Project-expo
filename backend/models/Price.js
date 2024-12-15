const mongoose = require("mongoose");

// Define schema for prices
const priceSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["hourly", "daily"] }, // Type: hourly or daily
  amount: { type: Number, required: true }, // Price
});

// Create and export the model
module.exports = mongoose.model("Price", priceSchema);
