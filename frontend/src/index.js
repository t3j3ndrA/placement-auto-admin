import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Company from "./pages/Company";
import { QueryClient, QueryClientProvider } from "react-query";
import NewCompany from "./pages/NewCompany";
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "/company",
    element: <Company />,
  },
  {
    path: "/new-company",
    element: <NewCompany />,
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
