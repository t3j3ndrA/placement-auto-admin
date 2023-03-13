import logo from './logo.svg';
import './App.css';
import { BasicForm } from './components/Form/basicForm';
import { Login } from './components/Form/Login';
import { Homepage } from './components/Homepage/Homepage';
import { Navbar } from './components/Navbar/Navbar';
import { Register } from './components/Register/Register'
import { Profile } from './components/User Profile/Profile';
import { Profile1 } from './components/User Profile/profile1';
import { Company_page } from './components/Company/Company_page';
import { Demo } from './components/Company/Demo';
import { Demo1 } from './components/Company/Demo1';
import { BrowserRouter, Route, Routes, useParams, Link} from "react-router-dom";
import { Card1 } from './components/Homepage/Card1';
import Cards from './components/Homepage/Cards';
import { Card2 } from './components/Homepage/Card2';
import { Homepage1 } from './components/Homepage/Homepage1';
import crypto from 'crypto-js'
import { Pre_loading_page } from './components/Pre-Loading/Pre_loading_page'; 
import { Already_applied } from './components/Already applied/Already_applied';

function Fetch_id(){
  var {id} = useParams();
  const encodedWord = crypto.enc.Base64.parse(id); // encodedWord via Base64.parse()
  const decoded = crypto.enc.Utf8.stringify(encodedWord);
  return <Company_page fetched_url = {{id1: decoded}}/>
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path = '/' element = {<Login/>}/>
      <Route exact path='/Login' element = {<Login/>}/>
        <Route exact path = '/Homepage' element = {<Homepage1/>}/>
        <Route exact path = '/Register' element = {<Register/>}/>
        <Route exact path = '/Profile' element = {<Profile/>}/>
        <Route exact path = '/Company/:id' element = {<Fetch_id/>}/>
        <Route exact path='/AlreadyApplied' element = {<Already_applied/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
