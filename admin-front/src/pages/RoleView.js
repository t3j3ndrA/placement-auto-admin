import React from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";

const RoleView = () => {
const { cid, rid } = useParams();
  return (
    <div className="bg-backg min-h-screen text-white">
      {/* Navbar */}
      <Navbar focusOn="company" />
      {/* Wrapper */}
      
      <div className="px-2 py-5 flex flex-col gap-3 md:px-8 lg:px-52">
        <Link to={`/admin/company/${cid}/role/${rid}/applications`}>
        <p className="text-2xl bg-subSection px-3 py-2">View Students Applications</p>
        </Link>
        <Link to={`/admin/company/${cid}/role/${rid}/elligibles`}>
        <p className="text-2xl bg-subSection px-3 py-2">View Eligible Students</p>
        </Link>
        <Link to={`/admin/company/${cid}/role/${rid}/notify`}>
        <p className="text-2xl bg-subSection px-3 py-2">Mark Students Eligibles</p>
        </Link>
        <Link to={`/admin/company/${cid}/role/${rid}/placed`}>
        <p className="text-2xl bg-subSection px-3 py-2">Manage Placed Students</p>
        </Link>
      </div>
    </div>
  );
};

export default RoleView;
