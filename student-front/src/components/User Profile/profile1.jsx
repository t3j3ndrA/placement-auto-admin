import React from 'react'
import axios from 'axios';
// import loadImg from './1.jpeg'
import { useState , useEffect} from 'react'
import { Link , useNavigate} from "react-router-dom";
import { Homepage } from '../Homepage/Homepage';
// const path = require("path")
// import { Path } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import myImage from './person.jpg'
// import { text } from 'express';
export const Profile1 = () => {

    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [oldPassword, setoldPassword] = useState('12345')
    const [newPassword, setnewPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [Email, setEmail] = useState('pqr@gmail.com')

    let url = "http://127.0.0.1:5000/api"

    let id = Email;  //Email is const to a user, so we can use it as a primary key

    let middle1 = (req, res, next) =>{
      res.headerSent = false;
      res.sendResponse = res.send;
      res.send = function(data) {
        if (res.headerSent) return;
        res.headerSent = true;
        res.sendResponse(data);
      };
      next();
    }
  //   useEffect(() =>{    
  //     const getValues  = async() =>{
  //       try{
  //         console.log("getValues function implemented")
  //         const post = {
  //           email: Email,
  //           password: oldPassword,
  //           firstName: firstname
  //         }
  //         console.log("Patch request from useEffect: ")
  //         console.log("from client to server ", post)
  //           // axios.patch("http://localhost:5000/api/profile").then((resp) => console.log("resp" + resp.data)).catch((err)=>{console.log("erro" + err)});
  //           const {data} = await axios.get(`${url}/profile/${id}`);
  //           console.log("data >> ");
  //           setfirstname(data.task.firstName)
  //           setlastname(data.task.lastName)
  //           setEmail(data.task.email)
  //           setoldPassword(data.task.password)

  //           console.log("after update from useEffect ")
  //           console.log(oldPassword)
            
            
  //       }catch(err){
  //           console.log("error: " + err)
  //       }
  //   };
  //   // axios.patch("http://localhost:5000/api/profile").then((resp) => console.log("resp" ,resp.data)).catch((err)=>{console.log("erro" + err)});

  //   // getValues();
  //   return () =>{

  //   };
  // }, [])


  //   let navigate = useNavigate()
  //   const handleInputs = () =>{

  //   }

    // const postEntry = async(e) =>{
    //     e.preventDefault();
    //     console.log("hello from postENtry is profile.jsx")
    //     try{
    //       const post = {
    //         email: Email,
    //         password: oldPassword,
    //         firstName: firstname,
    //       }
    //       console.log("Patch request from postEntry: ")
    //       console.log(post)
    //       // const res = axios.get(`${url}/Login`)
    //       axios.withCredentials = true;
    //       // const res = await axios.patch(`/profile/${id}`, post, {withCredentials : true })
    //       // const res = await axios.get(`http://localhost:5000/get-session`, {withCredentials : true })

    //       const res = await axios.post(`http://localhost:5000/api/profile/pqr@gmail.com`, post, {withCredentials : true })

    //       console.log(res.status)
    //       console.log("res = ", res.data)
    //       if(res.status == 200){
    //         // navigate('/Homepage') 
    //       }else{
            
    //       }
    
    //     }catch(e){
    //       console.log("error: ", e)
    //       alert("Incorrect email")
    //     }
          
    //   }
  return (

    <div style={{backgroundColor: '#0B0E2A'}} className = "text-white">
        <div style = {{backgroundColor: "#1A1C33"}} className = "mx-72 grid justifyitems-center">
          <div className='grid justify-items-center mt-10'>
            <img src = {myImage} className= "rounded-full h-1/4 grid items-center"/>
          </div>
            <br/><br/>
            <form>
              <div className="flex flex-col">
                Firstname:
                <div>
                <input type="email" className='rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete = 'false'></input>
                </div>
              </div>
            </form>

            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius distinctio deleniti dicta dolorum doloremque laudantium nisi, dignissimos quaerat quae impedit est veniam possimus voluptates illum alias ab facilis ex nemo odit provident tenetur? Sunt at quisquam porro facere delectus? Esse?
        </div>
    </div>
  )
}
