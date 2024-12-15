// import React, { useState } from "react";
// import { Button, Form, Input, message, Modal, Row, Col, AutoComplete } from "antd";
// import axios from "axios";
// import SlotSelection from "../../components/slotSelection";

// function BookNow() {
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [vehicleOptions] = useState([{ value: "KA01AB1234" }]);
//   const [price, setPrice] = useState(0);
//   const [form] = Form.useForm();

//   // Function to calculate price based on parking duration
//   const calculatePrice = (parkIn, parkOut) => {
//     if (!parkIn || !parkOut) return 0;

//     const durationInMilliseconds = parkOut - parkIn;
//     const durationInHours = Math.ceil(durationInMilliseconds / (1000 * 60 * 60)); // Convert to hours
//     const pricePerHour = 10;

//     return durationInHours * pricePerHour;
//   };

//   // Handlers for Park In and Park Out changes
//   const handleDateTimeChange = () => {
//     const parkIn = form.getFieldValue("parkIn");
//     const parkOut = form.getFieldValue("parkOut");

//     if (parkIn && parkOut) {
//       const parkInTime = new Date(parkIn).getTime();
//       const parkOutTime = new Date(parkOut).getTime();

//       if (parkOutTime > parkInTime) {
//         const totalPrice = calculatePrice(parkInTime, parkOutTime);
//         setPrice(totalPrice);
//       } else {
//         setPrice(0);
//         message.error("Park Out time must be after Park In time.");
//       }
//     }
//   };

//   // Function to handle form submission
//   const handleBooking = async (values) => {
//     if (!selectedSlot) {
//       message.error("Please select a parking slot.");
//       return;
//     }

//     try {
//       const { parkIn, parkOut } = values;
//       const parkInTime = new Date(parkIn).getTime();
//       const parkOutTime = new Date(parkOut).getTime();

//       if (parkOutTime <= parkInTime) {
//         message.error("Park Out time must be after Park In time.");
//         return;
//       }

//       values.slot = selectedSlot; // Add selected slot to the booking details
//       values.price = price;

//       const response = await axios.post("/api/bookings/book-now", values);
//       if (response.data.success) {
//         message.success(response.data.message);
//         form.resetFields();
//         setSelectedSlot(null);
//         setPrice(0);
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error during booking:", error);
//       message.error("Failed to book the slot. Please try again.");
//     }
//   };

//   // Modal handlers
//   const showConfirmationModal = () => {
//     form.validateFields().then(() => setIsModalVisible(true)).catch(() => {});
//   };

//   const handleModalOk = () => {
//     form.submit(); // Trigger form submission
//     setIsModalVisible(false);
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <div>
//       <Row gutter={[20]} align="top">
//         {/* Left Side: Booking Form */}
//         <Col lg={12} xs={24} sm={24}>
//           <div className="w-400 card p-2">
//             <h2>BOOK YOUR SLOT!!</h2>
//             <Form
//               layout="vertical"
//               form={form}
//               onFinish={handleBooking}
//               onValuesChange={handleDateTimeChange}
//             >
//               <Form.Item
//                 label="Name"
//                 name="name"
//                 rules={[{ required: true, message: "Please enter your name!" }]}
//               >
//                 <Input placeholder="Enter your name" />
//               </Form.Item>

//               <Form.Item
//                 label="Vehicle No"
//                 name="vehicleNo"
//                 rules={[{ required: true, message: "Please enter or select your vehicle number" }]}
//               >
//                 <AutoComplete
//                   options={vehicleOptions}
//                   placeholder="Enter or select vehicle number"
//                   filterOption={(inputValue, option) =>
//                     option.value.toLowerCase().includes(inputValue.toLowerCase())
//                   }
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Park In"
//                 name="parkIn"
//                 rules={[
//                    { 
//                      required: true, 
//                      message: "Please select Park In date and time" 
//                    },
//                    {
//                      validator: (_, value) => {
//                        if (new Date(value) < new Date()) {
//                        return Promise.reject(new Error("Park In date cannot be earlier than today"));
//                    }
//                return Promise.resolve();
//                }
//             }
//             ]}
//           >
//             <Input type="datetime-local" />
//           </Form.Item>


//               <Form.Item
//                 label="Park Out"
//                 name="parkOut"
//                 rules={[{ required: true, message: "Please select Park Out date and time" }]}
//               >
//                 <Input type="datetime-local" />
//               </Form.Item>

//               <Form.Item label="Price">
//                 <Input value={`Rs ${price}`} readOnly />
//               </Form.Item>

//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <Button type="primary" onClick={showConfirmationModal}>
//                   Confirm Booking
//                 </Button>
//                 <Button
//                   onClick={() => {
//                     form.resetFields();
//                     setPrice(0);
//                     setSelectedSlot(null);
//                   }}
//                 >
//                   Reset
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </Col>

//         {/* Right Side: Slot Selection */}
//         <Col lg={12} xs={24} sm={24}>
//           <SlotSelection
//             selectedSlot={selectedSlot}
//             setSelectedSlot={setSelectedSlot}
//           />
//         </Col>
//       </Row>

//       {/* Confirmation Modal */}
//       <Modal
//         title="Confirm Booking"
//         visible={isModalVisible}
//         onOk={handleModalOk}
//         onCancel={handleModalCancel}
//         okText="Book Now"
//         cancelText="Cancel"
//       >
//         <p>
//           <strong>Selected Slot:</strong> {selectedSlot || "None"}
//         </p>
//         <p>Do you want to confirm this booking?</p>
//       </Modal>
//     </div>
//   );
// }

// export default BookNow;


import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, message, Modal, Row, Col } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import SlotSelection from "../../components/slotSelection";
import { useSelector } from "react-redux";

function BookNow() {
  const { user } = useSelector(state => state.users);
  const [form] = Form.useForm();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [price, setprice] = useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isSlotSelectionDisabled, setIsSlotSelectionDisabled] = useState(true); // Disable slot selection initially

  // Fetch available slots
  const fetchSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/slots");
      if (response.data.success) {
        setSlots(response.data.slots.filter((slot) => slot.isAvailable));
      } else {
        message.error("Failed to fetch slots");
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      message.error("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  // const adminPrice = await axios.get(`/api/prices`);
  // Calculate payable amount dynamically
  const calculateprice = (parkIn, parkOut, pricePerHour = 10) => {
    
    if (!parkIn || !parkOut || !pricePerHour) return 0;

    const hoursParked = dayjs(parkOut).diff(dayjs(parkIn), "hour");
    if (hoursParked <= 0) return 0;

    return hoursParked * pricePerHour;
  };

  // Enable slot selection only after both times are selected
  const handleTimeChange = () => {
    const { parkIn, parkOut } = form.getFieldsValue();

    if (parkIn && parkOut) {
      setIsSlotSelectionDisabled(false);
    } else {
      setIsSlotSelectionDisabled(true);
      setSelectedSlot(null);
      setprice(0);
    }

    if (selectedSlot && parkIn && parkOut) {
      const price = calculateprice(parkIn, parkOut, selectedSlot.price);
      setprice(price);
    }
  };

  // Handle slot selection
  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);

    const { parkIn, parkOut } = form.getFieldsValue();
    if (parkIn && parkOut) {
      const amount = calculateprice(parkIn, parkOut, slot.price);
      setprice(amount);
    }
  };

  // Handle form submission
  const handleSubmit = (values) => {
    const price = calculateprice(values.parkIn, values.parkOut, selectedSlot?.price);
    if (price > 0 && selectedSlot) {
      setprice(price);
      setIsConfirmModalOpen(true);
    } else {
      message.error("Invalid parking time or no slot selected.");
    }
  };

  // Confirm booking
  const confirmBooking = async () => {
    const values = form.getFieldsValue();
    const bookingDetails = {
      ...values,
      slotId: selectedSlot._id,
      price: price,
    };

    try {
      const response = await axios.post("/api/bookings/book-now", bookingDetails);

      if (response.data.success) {
        message.success("Slot booked successfully!");
        fetchSlots();
        navigate("/payment-form");
      } else {
        message.error("Failed to book slot. Try again.");
      }
    } catch (error) {
      console.error("Error booking slot:", error);
      message.error("Failed to book slot.");
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div>
      <Row gutter={[20]} align="top">
        {/* Left Side: Booking Form */}
        <Col lg={12} xs={24} sm={24}>
          <div className="w-400 card p-2">
            <h2>Book Your Slot!!</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Name"
                name="name"
                initialValue={user?.name}
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Vehicle Number"
                name="vehicleNo"
                rules={[
                  { required: true, message: "Please enter your vehicle number" },
                  {
                    pattern: /^[A-Za-z]{2}\d{2}[A-Za-z]{1,2}\d{4}$/,
                    message: "Please enter a valid vehicle number",
                  },
                ]}
              >
                <Input placeholder="Enter vehicle number" />
              </Form.Item>

              <Form.Item
                label="Park In Time"
                name="parkIn"
                rules={[
                  {
                    required: true,
                    message: "Please select Park In date and time",
                  },
                  {
                    validator: (_, value) => {
                      if (value && new Date(value) < new Date()) {
                        return Promise.reject(new Error("Park In date cannot be earlier than today"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  onChange={handleTimeChange}
                />
              </Form.Item>

              <Form.Item
                label="Park Out Time"
                name="parkOut"
                rules={[
                  { required: true, message: "Please select Park Out time" },
                  {
                    validator: (_, value) => {
                      const parkIn = form.getFieldValue("parkIn");
                      if (value && dayjs(value).isBefore(parkIn)) {
                        return Promise.reject(new Error("Park Out time must be after Park In time"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  onChange={handleTimeChange}
                />
              </Form.Item>

              <Form.Item label="Selected Slot">
                {selectedSlot
                  ? `Floor ${selectedSlot.floor} - Slot ${selectedSlot.label}`
                  : "No slot selected"}
              </Form.Item>

              <Form.Item label="Payable Amount">
                <Input value={`Rs ${price}`} readOnly />
              </Form.Item>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Confirm and Pay
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    form.resetFields();
                    setSelectedSlot(null);
                    setIsSlotSelectionDisabled(true);
                    setprice(0);
                  }}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </div>
        </Col>

        {/* Right Side: Slot Selection */}
        <Col lg={12} xs={24} sm={24}>
          <SlotSelection
            slots={slots}
            selectedSlot={selectedSlot}
            setSelectedSlot={handleSlotSelection}
            disabled={isSlotSelectionDisabled}
          />
        </Col>
      </Row>

      <Modal
        title="Confirm Booking"
        open={isConfirmModalOpen}
        onOk={confirmBooking}
        onCancel={() => setIsConfirmModalOpen(false)}
      >
        <p>Slot: Floor {selectedSlot?.floor}, Label {selectedSlot?.label}</p>
        <p>Payable Amount: Rs {price}</p>
      </Modal>
    </div>
  );
}

export default BookNow;