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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [], // This will contain the day labels
    datasets: [],
  });

  const [loading, setLoading] = useState(true);

  // Fetch real-time data or simulate it for the last 10 days
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate an API response with labels for the days of the month (1, 2, 3...)
        const response = {
          labels: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10, // X-axis - Days of the month
          ],
          revenue: [1200, 1500, 1800, 2000, 2100, 2500, 2800, 3000, 3500, 3800], // Y-axis - Revenue for each day
        };

        // Parse the data into the format required for Chart.js
        setChartData({
          labels: response.labels, // Days of the month
          datasets: [
            {
              label: "Total Revenue (USD)",
              data: response.revenue, // Revenue data for each day
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
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
                labels: {
                  font: {
                    size: 12,
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Days of the Month", // X-axis title
                },
                ticks: {
                  font: {
                    size: 10,
                  },
                  // Set step size to show the days sequentially
                  stepSize: 1,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Total Revenue (USD)", // Y-axis title
                },
                ticks: {
                  font: { size: 10 },
                  beginAtZero: true,
                },
              },
            },
            // Adding the months' name at the bottom of the chart
            responsive: true,
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default ChartComponent;
