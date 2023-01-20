import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Students = () => {
  return (
    <div className="bg-backg grid grid-cols-12 min-h-screen">
      <Navbar />
      <div className="col-start-3 col-end-13 text-white">
        <h1>Students</h1>
        <p>
          Students Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Inventore minima ratione placeat recusandae repellat voluptas
          veritatis. Esse nobis magni voluptates ea, rem officiis cupiditate
          odio enim consectetur id nesciunt consequatur?
        </p>
        {new Array(20).fill(0).map((item) => (
          <div className="bg-section w-64 h-52 m-4"></div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Students;
