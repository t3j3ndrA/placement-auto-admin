import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PackageLineChart = ({ data }) => {
  return (
    <>
      <div className="mt-4 flex justify-between  items-center bg-section p-3 rounded-md">
        <h1 className="text-2xl">Line Chart</h1>
      </div>
      <div className="w-full my-5 flex-wrap flex flex-row justify-center items-center  overflow-x-auto overflow-y-hidden">
        <ResponsiveContainer width="100%" height={340}>
          <LineChart width="100%" height={400} data={data?.data}>
            <Line
              type="monotone"
              dataKey="placementStatus.package"
              label={"Package"}
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={(val, name) => [val + " LPA", "Package"]} />
            {/* <Legend /> */}
            <XAxis color="#ffffff" dataKey={"firstName"} fill="#fffff" />
            <YAxis
              dataKey={"placementStatus.package"}
              unit={"  LPA"}
              fill="white"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default PackageLineChart;
