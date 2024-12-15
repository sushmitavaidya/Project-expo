import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminRevenueChart from "./AdminRevenueChart"; // Import the updated ChartComponent
import axios from "axios";

const AdminHome = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBookedSlots: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard-data");
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div
      className="admin-home"
      style={{
        padding: "10px",
        maxHeight: "100vh",
        overflowY: "auto",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Welcome Section */}
      <div className="welcome-section text-center mb-3">
        <div
          className="p-4 border rounded shadow"
          style={{ backgroundColor: "#f1f1f1" }}
        >
          <h1 className="h6 mb-2">Hi, Admin!</h1>
          <p className="text-muted small">
            Welcome to the admin dashboard. Manage car parking slots, customers,
            payments, and other administrative tasks.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
        <div
          className="card text-center p-2 shadow"
          style={{ flex: "5 5 32%", minWidth: "100px" }}
        >
          <i className="ri-parking-box-fill text-primary mb-1"></i>
          <p className="mb-5 small">
            Total Parking Slots: 20
            <br />
            Total Booked Slots: {dashboardData.totalBookedSlots} / 20
          </p>
        </div>
        <div
          className="card text-center p-2 shadow"
          style={{ flex: "5 5 32%", minWidth: "100px" }}
        >
          <i className="ri-user-fill text-success mb-1"></i>
          <p className="mb-5 small">
            Total Customers: {dashboardData.totalCustomers}
          </p>
        </div>
        <div
          className="card text-center p-2 shadow"
          style={{ flex: "5 5 32%", minWidth: "100px" }}
        >
          <i className="ri-money-dollar-circle-fill text-warning mb-1"></i>
          <p className="mb-5 small">
            Revenue Earned: Rs.{dashboardData.totalRevenue}
          </p>
        </div>
      </div>

      {/* Graph Section */}
      <div className="graph-section">
        <div className="card shadow p-2" style={{ backgroundColor: "#ffffff" }}>
          <h5 className="text-center small mb-2">Monthly Revenue Chart</h5>
          <AdminRevenueChart />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
