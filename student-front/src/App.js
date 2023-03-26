import { Login } from "./components/Form/Login";
import { Register } from "./components/Register/Register";
import { Profile } from "./components/User Profile/Profile";
import { Company_page } from "./components/Company/Company_page";

// css for react toastifier
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Homepage1 } from "./components/Homepage/Homepage1";
import crypto from "crypto-js";
import { Already_applied } from "./components/Already applied/Already_applied";

function Fetch_id() {
  var { id } = useParams();
  const encodedWord = crypto.enc.Base64.parse(id); // encodedWord via Base64.parse()
  const decoded = crypto.enc.Utf8.stringify(encodedWord);
  return <Company_page fetched_url={{ id1: decoded }} />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Homepage" element={<Homepage1 />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Company/:id" element={<Fetch_id />} />
          <Route exact path="/AlreadyApplied" element={<Already_applied />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
