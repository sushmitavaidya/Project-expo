import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import "../../resources/Reports.css";
import GraphVisualizer from "../../components/GraphVisualizer";

const Reports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const handleFetchReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both Start Date and End Date.");
      return;
    }

    if (startDate > endDate) {
      alert("Start date must be earlier than the end date.");
      return;
    }

    const formattedStartDate = startDate
      ? startDate.toISOString().split("T")[0]
      : "N/A";
    const formattedEndDate = endDate
      ? endDate.toISOString().split("T")[0]
      : "N/A";

    window.open(
      `/user-details?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      "_blank"
    );
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="date-picker-input" onClick={onClick} ref={ref}>
      <input
        type="text"
        value={value}
        readOnly
        placeholder="YYYY-MM-DD"
        className="form-control"
        style={{ cursor: "default" }}
      />
      <FaCalendarAlt
        className="calendar-icon"
        style={{
          cursor: "pointer",
        }}
      />
    </div>
  ));

  return (
    <div className="container mt-3">
      {/* Main Heading */}
      <h2 className="text-center">Report Stats</h2>

      {/* Grey Container */}
      <div className="grey-container mt-3 py-4 px-4">
        <div className="row justify-content-center align-items-center mb-3">
          {/* Year Dropdown */}
          <div className="col-md-2 text-end">
            <label className="form-label fw-bold">Year:</label>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {generateYearOptions().map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Start Date and End Date */}
        <div className="row justify-content-center align-items-center mb-3">
          <div className="col-md-2 text-end">
            <label className="form-label fw-bold">Start Date:</label>
          </div>
          <div className="col-md-3">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              customInput={<CustomInput />}
              className="form-control"
            />
          </div>

          <div className="col-md-2 text-end">
            <label className="form-label fw-bold">End Date:</label>
          </div>
          <div className="col-md-3">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              customInput={<CustomInput />}
              className="form-control"
            />
          </div>
        </div>

        {/* Fetch User Details Button */}
        <div className="text-center">
          <button
            className="btn btn-primary px-4 py-2"
            onClick={handleFetchReport}
          >
            Fetch User Details
          </button>
        </div>
      </div>

      {/* Graph Section */}
      <GraphVisualizer />
    </div>
  );
};

export default Reports;
