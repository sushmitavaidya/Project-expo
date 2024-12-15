import React, { useState } from "react";
import "../resources/slot.css";

function SlotSelection({ slots, selectedSlot, setSelectedSlot }) {
  const [selectedFloor, setSelectedFloor] = useState(null);

  const floors = [...new Set(slots.map((slot) => slot.floor))];
  const filteredSlots = selectedFloor
    ? slots.filter((slot) => slot.floor === selectedFloor)
    : [];

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="card shadow p-2 w-400">
      <h3 className="text-center">Select Floor</h3>
      <div className="d-flex gap-2 mb-4 justify-content-center">
        {floors.map((floor) => (
          <button
            key={floor}
            className={`btn ${selectedFloor === floor ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSelectedFloor(floor)}
          >
            Floor {floor}
          </button>
        ))}
      </div>

      <h3 className="text-center">Select Slot</h3>
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        {filteredSlots.map((slot) => (
          <button
            key={slot.label}
            className={`btn ${selectedSlot?.label === slot.label ? "btn-success" : "btn-outline-secondary"}`}
            onClick={() => handleSlotSelection(slot)}
            style={{ width: "45%" }} // Adjust width to fit 2 per row
          >
            {slot.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SlotSelection;