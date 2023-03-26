import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import crypto from "crypto-js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Pre_loading_page } from "../Pre-Loading/Pre_loading_page";
import axios from "axios";
import getStuId from "../../utils/getStuId";

export const Homepage1 = () => {
  let navigate = useNavigate();
  const [_data, set_data] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getValues = async () => {
      try {
        const { data } = await axios.get(`/api/company/of/${getStuId()}`, {
          withCredentials: true,
        });
        set_data(data.data);
        setIsLoading(false);
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
    const encodedWord = crypto.enc.Utf8.parse(data); // e
    var encoded = crypto.enc.Base64.stringify(encodedWord);
    encoded = encoded
      .replace(/\+/g, "p23S")
      .replace(/\//g, "sL3S4")
      .replace(/=/g, "e2uAl");
    return encoded;
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
