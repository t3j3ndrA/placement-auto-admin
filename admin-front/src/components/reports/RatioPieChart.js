import React from "react";
// import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const RatioPieChart = ({ data, title }) => {
  return (
    <div className="flex flex-col">
      <div className="mt-4 flex justify-between  items-center bg-section p-3 rounded-md">
        <h1 className="text-xl">{title}</h1>
      </div>
      <Pie
        data={{
          labels: ["Placed", "Not Placed"],
          datasets: [{ data, backgroundColor: ["#4ec970", "#ff6666"] }],
        }}
      />
    </div>
  );
};

export default RatioPieChart;
