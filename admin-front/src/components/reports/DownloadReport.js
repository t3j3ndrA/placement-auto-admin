import axios from "axios";
import React, { useState } from "react";
import FilterInput from "../FilterInput";
import download from "downloadjs";
import { BeatLoader } from "react-spinners";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    year: new Date().getFullYear() + 1,
    limit: 10,
  });

  const handleFilterChange = (e) => {
    if (e.target.value) {
      e.target.style.border = "2px dotted green";
    } else {
      e.target.style.border = "";
    }
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const fetchStudents = async () => {
    setIsLoading(true);
    let filterURL = "";
    for (const query in filter) {
      filterURL += `${query}=${filter[query]}&`;
    }

    const { data } = await axios.get(
      `/api/reports/yearly/download?${filterURL}`,
      {
        withCredentials: true,
        responseType: "blob",
      }
    );

    download(data, `Placement-Reports-${filter.year}.xls`);
    setIsLoading(false);
  };

  return (
    <div className="my-3 flex flex-row items-center flex-wrap gap-6">
      <FilterInput
        name="year"
        value={filter.year}
        title="Year"
        onChangeFun={handleFilterChange}
      />
      <button
        type="button"
        onClick={fetchStudents}
        className="text-section font-semibold bg-white rounded-md text-md px-4 py-[6px] self-end "
        disabled={isLoading}
      >
        {isLoading ? <BeatLoader /> : "Download"}
      </button>
    </div>
  );
};

export default DownloadReport;
