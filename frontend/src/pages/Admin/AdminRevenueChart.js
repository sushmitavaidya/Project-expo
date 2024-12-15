import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminRevenueChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Day labels (1 to 31)
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/monthly-revenue"); // API endpoint for monthly revenue
        const data = await response.json();

        if (data && data.datasets) {
          setChartData({
            labels: data.labels, // Days of the month
            datasets: data.datasets, // Monthly revenue data
          });
        } else {
          console.error("Error: datasets is undefined");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching monthly revenue data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "300px" }}>
      {loading ? (
        <p className="text-center">Loading chart...</p>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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
                  text: "Days of the Month", // X-axis title
                },
                ticks: {
                  font: { size: 10 },
                  stepSize: 1, // Show tick marks for each day
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Total Revenue (Rs.)", // Y-axis title
                },
                ticks: {
                  font: { size: 10 },
                  beginAtZero: true,
                  stepSize: 50, // Adjust this step size as necessary
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default AdminRevenueChart;
