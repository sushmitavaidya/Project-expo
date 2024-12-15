import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Import required for Chart.js 3+ versions
import "../resources/Reports.css";

const GraphVisualizer = () => {
  const [timeRange, setTimeRange] = useState("Weekly");

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  // Mock data for the bar graph
  const data = {
    labels: ["A", "B", "C", "D", "E", "F"], // Example labels
    datasets: [
      {
        label: `${timeRange} Data`,
        data: [12, 19, 3, 5, 2, 3], // Example data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "X-Axis",
        },
      },
      y: {
        title: {
          display: true,
          text: "Y-Axis",
        },
      },
    },
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label fw-bold">Select Time Range:</label>
          <select
            className="form-select"
            value={timeRange}
            onChange={handleTimeRangeChange}
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default GraphVisualizer;
