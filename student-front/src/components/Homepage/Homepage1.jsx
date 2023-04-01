import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import crypto from "crypto-js";
import { Link } from "react-router-dom";
import axios from "axios";
import getStuId from "../../utils/getStuId";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import encrypter from "../../utils/encrypter";
import convertToDate from "../../utils/convertToDate";
import { toast } from "react-toastify";

export const Homepage1 = () => {
  const getValues = async () => {
    return axios
      .get(`/api/company/of/${getStuId()}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        return data.data;
      });
  };

  const {
    data: _data,
    isLoading,
    isError,
  } = useQuery(["companies", "filter"], getValues, {
    keepPreviousData: true,
  });

  if (isError) {
    toast.error("📶 Low internet connection ");
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
                    <tr className=" border-gray-300 border-b">
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
        <div className=" grid justify-items-center">
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
    <>
      <div
        className="mx-0 my-0 min-h-screen"
        style={{ backgroundColor: "#0B0E2A" }}
      >
        <Navbar />
        {isLoading || isError ? (
          <div className="mt-5 text-center">
            <ClipLoader color="white" size={45} />
          </div>
        ) : (
          _data.map(renderItem1)
        )}
      </div>
    </>
  );
};
