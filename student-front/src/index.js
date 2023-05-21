import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClic={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
    </QueryClientProvider>
  </React.StrictMode>
);
