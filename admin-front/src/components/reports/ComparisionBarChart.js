import { Legend } from "chart.js";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ComparisionBarChart = ({}) => {
  const datax = [
    {
      name: "Page A",
      "Min Package": 4000,
      "Max Package": 2400,
      "Avg Package": 2400,
    },
    {
      name: "Page B",
      "Min Package": 3000,
      "Max Package": 1398,
      "Avg Package": 2210,
    },
    {
      name: "Page C",
      "Min Package": 2000,
      "Max Package": 9800,
      "Avg Package": 2290,
    },
    {
      name: "Page D",
      "Min Package": 2780,
      "Max Package": 3908,
      "Avg Package": 2000,
    },
    {
      name: "Page E",
      "Min Package": 1890,
      "Max Package": 4800,
      "Avg Package": 2181,
    },
    {
      name: "Page F",
      "Min Package": 2390,
      "Max Package": 3800,
      "Avg Package": 2500,
    },
    {
      name: "Page G",
      "Min Package": 3490,
      "Max Package": 4300,
      "Avg Package": 2100,
    },
  ];
  return (
    <>
      <div className="mt-4 flex justify-between  items-center bg-section p-3 rounded-md">
        <h1 className="text-2xl">Comparision Chart</h1>
      </div>
      <div className="w-full my-5 flex-wrap flex flex-row justify-center items-center  overflow-x-auto overflow-y-hidden">
        <ResponsiveContainer width="100%" height={340}>
          <BarChart width="100%" height={400} data={datax}>
            <Bar
              fill="red"
              type="monotone"
              dataKey="Min Package"
              label={"Min Package"}
            ></Bar>
            <Bar
              fill="blue"
              type="monotone"
              dataKey="Max Package"
              label={"Max Package"}
            />
            <Bar
              fill="pink"
              type="monotone"
              dataKey="Avg Package"
              label={"Avg Package"}
            />
            <CartesianGrid strokeDasharray="3 3" />
            {/* formatter={(val, name) => [val + " LPA", "Package"]} */}
            <Tooltip cursor={false} />
            {/* <Tooltip
              formatter={(val, name) => [val + " MAx", "mixn Package"]}
            />{" "} */}
            {/* <Legend /> */}
            <XAxis color="#ffffff" dataKey={"name"} fill="#fffff" />
            <YAxis unit={"  LPA"} fill="white" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ComparisionBarChart;
