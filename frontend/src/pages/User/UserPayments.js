import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import "../../resources/Bookings.css";

const UserPayments = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/bookings`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  // CSV headers
  // const headers = [
  //   { label: "Booking ID", key: "bookingId" },
  //   { label: "Slot", key: "slot" },
  //   { label: "Name", key: "name" },
  //   { label: "Vehicle Number", key: "vehicleNo" },
  //   { label: "Park In Time", key: "parkIn" },
  //   { label: "Park Out Time", key: "parkOut" },
  //   { label: "Price", key: "price" },
  //   { label: "Is Parked Out", key: "isParkedOut" },
  // ];

  // Filter bookings based on the search term
  // const filteredBookings = bookings.filter(
  //   (booking) =>
  //     booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     booking.vehicleNo?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">Payments Management</h2>

      <div className="bookings-actions">
        {/* Search Input */}
        <input
          type="text"
          className="search-input"
          placeholder="Search by Booking ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Export to CSV Button
        <CSVLink
          data={bookings} // Export all bookings
          headers={headers}
          filename="bookings.csv"
          className="btn export-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
          >
            <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
          </svg>
          Export to CSV
        </CSVLink> */}
      </div>

      {/* Bookings Table */}
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Payment ID</th>
            <th>Transaction ID</th>
            
            <th>Payment method</th>
            <th>Amount paid</th>
            {/* <th>Park Out Time</th> */}
            {/* <th>Price</th>
            <th>Is Parked Out</th> */}
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.bookingId}>
                {/* <td>{booking.bookingId}</td>
                <td>{booking.slotId}</td> */}
                {/* <td>{booking.name}</td> */}
                {/* <td>{booking.vehicleNo}</td>
                <td>{new Date(booking.parkIn).toLocaleString()}</td>
                <td>{new Date(booking.parkOut).toLocaleString()}</td>
                <td>{booking.price}</td> */}
                {/* <td>{booking.isParkedOut ? "Yes" : "No"}</td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-bookings">
                No Payments found.
              </td>
            </tr>
          )}
          
        </tbody>
      </table>
    </div>
  );
};

export default UserPayments;
