import React from "react";
import { Navbar } from "../Navbar/Navbar";
import crypto from "crypto-js";
import { Link } from "react-router-dom";
import axios from "axios";
import getStuId from "../../utils/getStuId";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import encrypter from "../../utils/encrypter";
import convertToDate from "../../utils/convertToDate";
import { toast } from "react-toastify";

export const Already_applied = () => {
  const studId = getStuId();

  const getValues = async () => {
    return axios.get(`/api/student/${studId}/applications`).then(({ data }) => {
      return data.data;
    });
  };

  const {
    data: _data,
    isLoading,
    isError,
  } = useQuery(["applied-companies", "filter"], getValues, {
    keepPreviousData: true,
  });

  if (isError) {
    toast.error("📶 Low internet connection ");
  }

  const renderItem1 = (item) => {
    return (
      <div className=" p-4 mx-10 my-8 text-black bg-[#d8ecff] rounded-md  border-blue-500 ">
        <div>
          <h3 className="text-blue-600 text-xl">
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

        <div className=" mx-auto container  rounded">
          <table className="min-w-full">
            <thead>
              <tr className="w-full h-16 dark:text-blue-600 border-gray-400 font-semibold border-b py-8">
                <th
                  role="columnheader"
                  className="px-5 py-3 font   pr-6 text-left text-sm tracking-normal leading-4"
                >
                  Role
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3   pr-6 text-left text-sm tracking-normal leading-4"
                >
                  AVG. Package
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3   pr-6 text-left text-sm tracking-normal leading-4"
                >
                  TYPE
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3   pr-6 text-left text-sm tracking-normal leading-4"
                >
                  DEADLINE
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3  pr-6 text-left text-sm tracking-normal leading-4"
                >
                  INTERVIEW DATE
                </th>
                <th
                  role="columnheader"
                  className="px-5 py-3  pr-6 text-left text-sm tracking-normal leading-4"
                >
                  MODE
                </th>
              </tr>
            </thead>
            <tbody>
              {item.roles.map((item1) => {
                return (
                  <React.Fragment>
                    <tr className=" border-gray-400 border-b">
                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
                        {item1.name}
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
                        {item1.avgPackage} LPA
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
                        {item1.type}
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
                        {convertToDate(item1.deadline)}
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
                        {convertToDate(item1.interviewDate)}
                      </td>

                      <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-900 tracking-normal leading-4">
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
          <Link to={"/Company/" + encrypter(item._id)}>
            <div className="bg-blue-500 text-white  rounded-lg grid justify-items-center">
              <button className="px-4 py-2">View More</button>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      {isLoading || isError ? (
        <div className="mt-5 text-center">
          <ClipLoader color="blue" size={45} />
        </div>
      ) : (
        _data.map(renderItem1)
      )}
    </div>
  );
};
