import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const PlacementRatio = () => {
  const pieData = [
    { name: "Placed", value: 100 },
    { name: "Not Placed", value: 20 },
  ];

  return (
    <div className="bg-section mx-auto px-4 py-4 w-full">
      <div className="flex justify-around  items-start bg-section p-3 rounded-md min-w-full">
        <h1 className="text-2xl">Placement ratio</h1>
        <div className=" w-[200px] h-[200px]">
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              dataKey="value"
              outerRadius={80}
              color={["red", "green"]}
              fill="#8884d8"
            >
              <Cell fill="red" />
              <Cell fill="green" />
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default PlacementRatio;
