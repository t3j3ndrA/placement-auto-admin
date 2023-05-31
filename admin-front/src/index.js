import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Students from "./pages/Students";

import { QueryClient, QueryClientProvider } from "react-query";
import Reports from "./pages/Reports";
import PageNotFound from "./pages/PageNotFound";
import Companies from "./pages/Companies";
import CompanyView from "./pages/CompanyView";
import CreateCompany from "./pages/CreateCompany";
import StudentView from "./pages/StudentView";
import Applications from "./pages/Applications";
import Elligibles from "./pages/Elligibles";
import NotifyStudents from "./pages/NotifyStudents";
import RegisterStudent from "./pages/RegisterStudent";
import CreateCompany1 from "./pages/CreateCompany1";
import { ToastContainer } from "react-toastify";
import ManagePlaced from "./pages/ManagePlaced";
import RoleView from "./pages/RoleView";
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Companies />,
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/students",
    element: <Students />,
  },
  {
    path: "/admin/students/register",
    element: <RegisterStudent />,
  },
  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/companies/company-view/:id",
    element: <CompanyView />,
  },
  {
    path: "/admin/students/student-view/:id",
    element: <StudentView />,
  },
  {
    path: "/admin/companies/create-post",
    element: <CreateCompany1 />,
  },
  {
    path: "/admin/company/:cid/role/:rid",
    element: <RoleView />,
  },
  {
    path: "/admin/company/:cid/role/:rid/applications",
    element: <Applications />,
  },
  {
    path: "/admin/company/:cid/role/:rid/placed",
    element: <ManagePlaced/>,
  },
  {
    path: "/admin/company/:cid/role/:rid/elligibles",
    element: <Elligibles />,
  },
  {
    path: "/admin/company/:cid/role/:rid/notify",
    element: <NotifyStudents />,
  },
  {
    path: "/admin/reports",
    element: <Reports />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClic={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="dark"
      />
    </QueryClientProvider>
  </React.StrictMode>
);
