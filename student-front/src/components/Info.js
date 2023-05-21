import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";

const Info = ({ msg }) => {
  return (
    <div className="flex flex-row mt-2 gap-[8px] items-center">
      <AiFillInfoCircle className="text-blue-500 text-xl" />
      <p className="text-placeholder">{msg}</p>
    </div>
  );
};

export default Info;
