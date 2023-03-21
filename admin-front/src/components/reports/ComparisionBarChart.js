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

const ComparisionBarChart = ({ data }) => {
  return (
    <>
      <div className="mt-4 flex justify-between  items-center bg-section p-3 rounded-md">
        <h1 className="text-2xl">Comparision Chart</h1>
      </div>
      <div className="w-full my-5 flex-wrap flex flex-row justify-center items-center  overflow-x-auto overflow-y-hidden">
        <ResponsiveContainer width="100%" height={340}>
          <BarChart width="100%" height={400} data={data}>
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
