// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     parkIn: { type: Date, required: true },
//     parkOut: { type: Date, required: true },
//     vehicleNo: { type: String, required: true },
//     price: { type: Number, required: true },
//     bookingId: { type: String, unique: true, required: true },
//     slot: { type: String, required: true },
//     isParkedOut: { type: Boolean, default: false }, // To track if the user has parked out
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Booking", bookingSchema);
const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parkIn: { type: Date, required: true },
    parkOut: { type: Date, required: true },
    vehicleNo: { type: String, required: true },
    price: { type: Number, required: true },
    bookingId: { type: String, unique: true, required: true },
    // slot: { type: String, required: true },
    slotId :{type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
    isParkedOut: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// This method will calculate total revenue and number of customers dynamically
// bookingsSchema.statics.calculateStats = async function () {
//   const result = await this.aggregate([
//     {
//       $group: {
//         _id: null,
//         totalRevenue: { $sum: "$price" },
//         totalCustomers: { $sum: 1 },
//       },
//     },
//   ]);

//   return result[0] || { totalRevenue: 0, totalCustomers: 0 };
// };

module.exports = mongoose.model("Booking", bookingsSchema);
