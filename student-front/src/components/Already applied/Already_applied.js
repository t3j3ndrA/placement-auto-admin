import React from "react";

import { Navbar } from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import crypto from "crypto-js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Pre_loading_page } from "../Pre-Loading/Pre_loading_page";
import axios from "axios";
import getStuId from "../../utils/getStuId";
export const Already_applied = () => {
  let navigate = useNavigate();
  const [_data, set_data] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const studId = getStuId();
  useEffect(() => {
    console.log("hello from homepage");

    const getValues = async () => {
      try {
        const { data } = await axios.get(`/api/student/${studId}/applications`);
        console.log("Data from company page: ", data);
        set_data(data.data);
        setIsLoading(false);
        console.log("Data stored in useState: ", _data);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    getValues();
    return () => {};
  }, []);

  function convertToDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  function encrypter(data) {
    const key = "RanDOM@12345";
    var encrypted = crypto.AES.encrypt(data, key).toString();
    encrypted = encrypted
      .replace(/\+/g, "p1L2u3S")
      .replace(/\//g, "s1L2a3S4h")
      .replace(/=/g, "e1Q2u3A4l");
    // encrypted = encrypted.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');
    return encrypted;
  }

  function redirect(data) {
    console.log("hello from redirect");
    const encrypt = encrypter(data);
    console.log("data from encryption: " + encrypt);
    navigate(`/Company/${encrypt}`);
  }

  const renderItem1 = (item) => {
    return (
      <div
        className=" p-4 mx-10 my-8 text-white rounded-lg"
        style={{ backgroundColor: "#1A1C33" }}
      >
        <div>
          <h3>
            <b>{item.name}</b>
          </h3>
        </div>

        <br />

        <div className="flex flex-row justify-between">
          <div>
            <label>
              <b>{item.website}</b>
            </label>
          </div>

          <div>
            <label>Mail to: </label>
            <label>
              <u>
                <b>{item.email}</b>
              </u>
            </label>
          </div>
        </div>

        <br />

        <div className=" mx-auto container bg-white dark:bg-gray-800 shadow rounded">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="w-full h-16 border-gray-300 border-b py-8">
                <th
                  role="columnheader"
                  className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"
                >
                  Role
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"
                >
                  AVG. Package
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"
                >
                  TYPE
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"
                >
                  DEADLINE
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"
                >
                  INTERVIEW DATE
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"
                >
                  MODE
                </th>
              </tr>
            </thead>
            <tbody>
              {item.roles.map((item1) => {
                return (
                  <React.Fragment>
                    <tr className="h-24 border-gray-300 border-b">
                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item1.name}
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item1.avgPackage} LPA
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item1.type}
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {convertToDate(item1.deadline)}
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {convertToDate(item1.interviewDate)}
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item1.mode}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <br />
        <div className="grid justify-items-center">
          <div className="bg-white text-black w-1/4 rounded-lg grid justify-items-center">
            <Link to={"/Company/" + encrypter(item._id)}>
              <button>View More</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {isLoading ? (
        <Pre_loading_page />
      ) : (
        <div style={{ backgroundColor: "#0B0E2A" }}>
          <Navbar />

          <br />
          <br />
          <br />
          <br />
          <br />

          <div className="flex justify-center">
            <div className="w-2/12 grid justify-items-center m-2 p-2 hover:bg-blue-700 bg-indigo-900">
              <button className="text-white">Full Time Job</button>
            </div>
            <div className="w-2/12 grid justify-items-center m-2 p-2 hover:bg-blue-700 bg-indigo-900">
              <button className="text-white hover:bg-#2538E6">
                Internship
              </button>
            </div>
            11
          </div>

          <br />
          <br />
          <br />
          {_data.map(renderItem1)}
        </div>
      )}
    </div>
  );
};
