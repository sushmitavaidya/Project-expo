// const mongoose = require("mongoose");

// const slotSchema = new mongoose.Schema({
//   slotNumber: {
//     type: String,
//     required: true,
//   },
//   isAvailable: {
//     type: Boolean,
//     default: true,
//   },
//   // You can add more fields as needed
// });

// const Slot = mongoose.model("Slot", slotSchema);

// module.exports = Slot;
const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
  },
  floor: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

// Auto-generate slotNumber before saving
slotSchema.pre("save", function (next) {
  if (!this.slotNumber) {
    this.slotNumber = `${this.floor}-${this.label}`;
  }
  next();
});

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
