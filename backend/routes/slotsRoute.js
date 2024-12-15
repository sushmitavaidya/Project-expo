const express = require("express");
const router = express.Router();
const Slot = require("../models/slot");

// Get all slots
router.get("/", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.send({ success: true, slots });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Create a slot
router.post("/", async (req, res) => {
  try {
    const { floor, label } = req.body;

    if (!floor || !label) {
      return res
        .status(400)
        .send({ success: false, message: "Floor and label are required" });
    }

    const existingSlot = await Slot.findOne({ floor, label });
    if (existingSlot) {
      return res
        .status(400)
        .send({ success: false, message: "Slot already exists" });
    }

    const newSlot = new Slot({ floor, label });
    await newSlot.save();
    res.send({
      success: true,
      message: "Slot created successfully",
      data: newSlot,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to save slot" });
  }
});

// Update a slot
router.put("/:id", async (req, res) => {
  try {
    const { floor, label } = req.body;
    await Slot.findByIdAndUpdate(req.params.id, { floor, label });
    res.send({ success: true, message: "Slot updated successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Delete a slot
router.delete("/:id", async (req, res) => {
  try {
    await Slot.findByIdAndDelete(req.params.id);
    res.send({ success: true, message: "Slot deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});



module.exports = router;
