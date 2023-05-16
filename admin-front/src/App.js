import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies("user");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.user) navigate("/login");
  }, []);
  const increase = () => {
    setCount(count + 1);
  };
  const handleLogout = async () => {
    removeCookie("user");
    axios
      .post("/api/auth/logout", { withCredentials: true })
      .then((response) => {
        return response.data;
      })
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
    navigate("/login");
  };

  return (
    <div className="bg-backg grid grid-cols-12 ">
      <Navbar />
      <div className="col-start-3 col-end-13 text-white">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={increase}>+</button>
        <h1>This is the home page</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          minima ratione placeat recusandae repellat voluptas veritatis. Esse
          nobis magni voluptates ea, rem officiis cupiditate odio enim
          consectetur id nesciunt consequatur?
        </p>
        {new Array(20).fill(0).map((item, index) => (
          <div className="bg-section w-64 h-52 m-4"></div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
