// src/components/BMIChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BMIChart = ({ records }) => {
  const chartData = {
    labels: records.map((r) => r.date).reverse(),
    datasets: [
      {
        label: "BMI Over Time",
        data: records.map((r) => r.bmi).reverse(),
        fill: false,
        borderColor: "#4b9cf5",
        backgroundColor: "#4b9cf5",
        tension: 0.3,
        pointBackgroundColor: "#1d3557",
        pointBorderColor: "#fff",
        pointRadius: 4,
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 40,
        ticks: { stepSize: 5 }
      }
    }
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default BMIChart;
