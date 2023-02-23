import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
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

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Companies />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/companies",
    element: <Companies />,
  },
  {
    path: "/companies/company-view/:id",
    element: <CompanyView />,
  },
  {
    path: "/students/student-view/:id",
    element: <StudentView />,
  },
  {
    path: "/companies/create-post",
    element: <CreateCompany />,
  },
  {
    path: "/reports",
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
    </QueryClientProvider>
  </React.StrictMode>
);
