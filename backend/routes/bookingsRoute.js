
const router = require("express").Router();
const Booking = require("../models/Booking.js");
const Slot = require("../models/slot.js")

router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch bookings" });
    }

})

// // POST route to create a booking
// router.post("/book-now", async (req, res) => {
//   try {
//     const { name, parkIn, parkOut, vehicleNo, slotId, price } = req.body;

//     // Generate a booking ID using a random number
//     const bookingId = `BOOK-${Math.floor(100000 + Math.random() * 900000)}`;

//     // Validate incoming fields
//     if (!name || !parkIn || !parkOut || !vehicleNo || !price || !slot) {
//       return res.status(400).send({
//         message: "All fields are required.",
//         success: false,
//       });
//     }

//     // Validate price to ensure it's a number
//     // if (isNaN(price)) {
//     //   return res.status(400).send({
//     //     message: "Total price must be a valid number.",
//     //     success: false,
//     //   });
//     // }

//     // Create a new booking
//     const newBooking = new Booking({
//       name,
//       parkIn,
//       parkOut,
//       vehicleNo,
//       slot,
//       price: Number(price),
//       bookingId,
//     });

//     // Save the booking to the database
//     await newBooking.save();

//     res.status(200).send({
//       message: "Booking successful",
//       data: newBooking,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error during booking:", error);
//     res.status(500).send({
//       message: "Booking failed",
//       data: error.message,
//       success: false,
//     });
//   }
// });

const handleSlotChange = async (value) => {
  const slot = slots.find((slot) => slot._id === value);
  const { parkIn, parkOut } = form.getFieldsValue();

  if (parkIn && parkOut) {
    try {
      const response = await axios.post("/api/validate-slot", {
        slotId: value,
        parkIn,
        parkOut,
      });

      if (response.data.success) {
        setSelectedSlot(slot);

        // Calculate amount if slot is valid
        const amount = calculatePayableAmount(parkIn, parkOut, slot.price);
        setPayableAmount(amount);
      } else {
        message.error("Slot is not available for the selected time range.");
        setSelectedSlot(null);
      }
    } catch (error) {
      console.error("Error validating slot:", error);
      message.error("Failed to validate slot.");
    }
  } else {
    message.error("Please select Park In and Park Out times first.");
  }
};

// Create a new booking
router.post("/book-now", async (req, res) => {
  try {
    const { name, vehicleNo, parkIn, parkOut, slotId, price} = req.body;
    const bookingId = `BOOK-${Math.floor(100000 + Math.random() * 900000)}`;
    // if (isNaN(payableAmount) || payableAmount <= 0) {
    //   return res.status(400).json({ success: false, message: "Invalid payable amount." });
    // }

    // Validate time range
    if (new Date(parkIn) >= new Date(parkOut)) {
      return res.status(400).send({
        success: false,
        message: "Park Out time must be later than Park In time",
      });
    }

    // Fetch slot and calculate payable amount
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(400).send({ success: false, message: "Invalid slot ID" });
    }

    // const hoursParked = Math.ceil(
    //   (new Date(parkOut) - new Date(parkIn)) / (1000 * 60 * 60)
    // );
    // const payableAmount = hoursParked * slot.price;

    const newBooking = new Booking({
      name,
      vehicleNo,
      parkIn,
      parkOut,
      slotId,
      price,
      bookingId
    });

    await newBooking.save();

    res.send({ success: true, message: "Booking successful", booking: newBooking });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});



module.exports = router;