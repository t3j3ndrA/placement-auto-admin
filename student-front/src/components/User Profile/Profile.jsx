import React from 'react'
import axios from 'axios';
import { useState , useEffect} from 'react'
import { Link , useNavigate} from "react-router-dom";
import { Homepage } from '../Homepage/Homepage';
import myImage from './person.jpg'
import { Navbar } from '../Navbar/Navbar';
import { Pre_loading_page } from '../Pre-Loading/Pre_loading_page';

export const Profile = () => {

    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [rollNumber, setrollNumber] = useState('')
    const [email, setemail] = useState("abcde@gmail.com")
    const [password, setpassword] = useState('12345')

    const[student, setstudent] = useState({
      _id : "",
      firstName: "",
      lastName: "",
      middleName: "",
      password: "",
      rollNumber: "",
      collegeId: "",
      gender: "",
      branch: "",
      passingYear: "",
      trainingCompanyStatus: "",
      salary: "",
      homeAddress: "",

      result : {
      sem1SPI: "", 
      sem2SPI: "", 
      sem3SPI: "", 
      sem4SPI: "", 
      sem5SPI: "", 
      sem6SPI: "", 
      sem7SPI: "", 
      sem8SPI: "",
      cpi: "",
      twelfthPerc: "",
      tenthPerc: "",
      diplomaPerc: "",
      },

      dateOfBirth: "",
      personalPhoneNumber: "",
      parentsPhoneNumber: "",
      city: "",
      pincode: "",
      registrationStatus : "",
      collegEmail : "",
      personalEmail: "",

      competitiveCoding: 
        [
          {
            platform: "",
            stars: "",
            ratings: "",
            profile: "" ,
          }
        ],

        address: {
        city: "" ,
        district: "",
        subDistrict: "",
        state: "",
        postalCode: "",
        completeAddress: "",
        },

        placementStatus: {
        selected: "",
        companyName: "",
        duration: "",
        package: "",
        joiningDate: "",
        mode: "",
        },

        internshipStatus: {
          selected: "",
          companyName: "",
          duration: "",
          stipend: "",
          joiningDate: "",
          mode: "",
        },

        result: {
          sem1: 0,
          sem2: 0,
          sem3: 0,
          sem4: 0,
          sem5: 0,
          sem6: 0,
          sem7: 0,
          sem8: 0,
          twelfthPerc: 0,
          tenthPerc: 0,
          diplomaPerc: 0,
          cpi: 0
        },

        competitiveCoding : []
    })
    const [isLoading, setIsLoading] = useState(true);
    let url = "http://127.0.0.1:5000/api"

    // let id = Email;  //Email is const to a user, so we can use it as a primary key

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

    function convertToDate(dateString){
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const formattedDate = `${day}-${month}-${year}`;
      return formattedDate;
    }

    const handleAddProfile = (e) =>{    // Add new Coding profile
      e.preventDefault();
      const newObject = {
          platform: "",
          stars: "",
          ratings: "",
          profile: "" ,
        }

        setstudent(prevState => ({
          ...prevState,
          competitiveCoding: [
            ...prevState.competitiveCoding,
            newObject
          ]
        }));
    }

    const handleDeleteProfile = (e) =>{
      e.preventDefault();
      const newCompititiveCoding = [...student.competitiveCoding];
      newCompititiveCoding.pop();
      setstudent(prevState =>({
        ...prevState, competitiveCoding : newCompititiveCoding
      }))
    }
    
    const handlePlatformChange = (e,index) =>{

      const newCompititiveCoding = [...student.competitiveCoding];
      newCompititiveCoding[index].platform = e.target.value;

      setstudent(prevState => ({...prevState, competitiveCoding : newCompititiveCoding}))
    }

    const handleProfileChange = (e,index) =>{

      const newCompititiveCoding = [...student.competitiveCoding];
      newCompititiveCoding[index].profile = e.target.value;

      setstudent(prevState => ({...prevState, competitiveCoding : newCompititiveCoding}))
    }

    const handleRatingChange = (e,index) =>{

      const newCompititiveCoding = [...student.competitiveCoding];
      newCompititiveCoding[index].ratings = e.target.value;

      setstudent(prevState => ({...prevState, competitiveCoding : newCompititiveCoding}))
    }

    const handleStarschange = (e,index) =>{

      const newCompititiveCoding = [...student.competitiveCoding];
      newCompititiveCoding[index].stars = e.target.value;

      setstudent(prevState => ({...prevState, competitiveCoding : newCompititiveCoding}))
    }

    const handleDate = (e) =>{
      // const dateString = e;
      const [day, month, year] = e.split('-');
      const dateObject = new Date(`${year}-${month}-${day}`);
      return dateObject;
    }

    useEffect(() =>{
      const getValues  = async() =>{
        try{
          console.log("getValues function implemented")
          const post = {
            personalEmail : email
            }
          // console.log("Patch request from useEffect: ")
          console.log("from client to server ", post)
            const {data} = await axios.get("http://127.0.0.1:5000/api/student/?id=63ec9c9fe7db39977126093a" , post, {withCredentials : true})
            // const task = await fetch(`http://127.0.0.1:5000/api/student/profile`).then(response => response.json())
            // const {data} = await axios.get(`${url}/profile/${id}`);

            // const requestOptions = {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(post)
            // };
            
            // console.log("body : ", JSON.stringify(post))
            // const task = await fetch("http://127.0.0.1:5000/api/student/profile", requestOptions)
            //   .then(response => response.json())
            //   .then(data => console.log(data))
            //   .catch(error => console.error(error));

            console.log("data >> ", data.task);
            // setEmail(data.task.email)
            setstudent(data.data);
            // setstudent({
            //   _id : data.task._id,
            //   firstName: data.task.firstName,
            //   lastName: data.task.lastName,
            //   middleName: data.task.middleName ,
            //   password: data.task.password ,
            //   rollNumber: data.task.rollNumber ,
            //   collegeId: data.task.collegeId ,
            //   gender: data.task.gender ,
            //   branch: data.task.branch ,
            //   passingYear: data.task.passingYear ,
            //   trainingCompanyStatus: data.task.trainingCompanyStatus,
            //   salary: data.task.salary,
            //   dateOfBirth: convertToDate(data.task.dateOfBirth),

            //   result : {
            //     sem1: data.task.result.sem1,
            //     sem2: data.task.result.sem2,
            //     sem3: data.task.result.sem3,
            //     sem4: data.task.result.sem4,
            //     sem5: data.task.result.sem5,
            //     sem6: data.task.result.sem6,
            //     sem7: data.task.result.sem7,
            //     sem8: data.task.result.sem8,
            //     twelfthPerc: data.task.result.twelfthPerc,
            //     tenthPerc: data.task.result.tenthPerc,
            //     diplomaPerc: data.task.result.diplomaPerc,
            //     cpi : data.task.result.cpi
            //   },

            //   collegeEmail: data.task.collegeEmail,
            //   personalEmail: data.task.personalEmail,
            //   personalPhoneNumber: data.task.personalPhoneNumber,
            //   parentsPhoneNumber: data.task.parentsPhoneNumber,

            //   competitiveCoding: data.task.competitiveCoding

            //   // address: {
            //   // city:  data.task.address.city | null,
            //   // district: data.task.address.district | null,
            //   // subDistrict: data.task.address.subDistrict | null,
            //   // state: data.task.address.state | null,
            //   // postalCode: data.task.address.postalCode | null,
            //   // completeAddress: data.task.address.completeAddress | null,
            //   // },
      
            //   // placementStatus: {
            //   // selected: data.task.placementStatusselected,
            //   // companyName: data.task.placementStatus.companyName,
            //   // duration: data.task.placementStatus.duration,
            //   // package: data.task.placementStatus.package,
            //   // joiningDate: data.task.placementStatus.joiningDate,
            //   // mode: data.task.placementStatus.mode,
            //   // },
      
            //   // internshipStatus: {
            //   //   selected: data.task.internshipStatus.selected,
            //   //   companyName: data.task.internshipStatus.companyName,
            //   //   duration: data.task.internshipStatus.duration,
            //   //   stipend: data.task.internshipStatus.stipend,
            //   //   joiningDate: data.task.internshipStatus.joiningDate,
            //   //   mode: data.task.internshipStatus.mode,
            //   // },
            // })

            console.log("usestate after update: ", student)
            setIsLoading(false)
        }catch(err){
            console.log("error: " + err)
        }
    };
    // axios.patch("http://localhost:5000/api/profile").then((resp) => console.log("resp" ,resp.data)).catch((err)=>{console.log("erro" + err)});

    getValues();
    return () =>{

    };
  }, [])


    let navigate = useNavigate()
    const handleInputs = () =>{

    }

    const postEntry = async(e) =>{
        // e.preventDefault();
        console.log("hello from postEntry is profile.jsx")
        try{

          // converting date from user to Date object in javascript
          const dateObject = handleDate(student.dateOfBirth.toString())
          {setstudent(prevState => ({...prevState,dateOfBirth: dateObject}))}

          console.log("updated date : ", dateObject)
          const post = student
          console.log("Post request from postEntry: ")
          console.log(post)
          // const res = axios.get(`${url}/Login`)
          axios.withCredentials = true;
          // const res = await axios.patch(`/profile/${id}`, post, {withCredentials : true })
          // const res = await axios.get(`http://localhost:5000/get-session`, {withCredentials : true })

          const res = await axios.post(`http://localhost:5000/api/student/profile/update`, post, {withCredentials : true })

          console.log("after making changes: ", res.data)
          location.reload()
          // console.log(res.status)
          // console.log("res = ", res.data)
          // if(res.status == 200){
          //   // navigate('/Homepage')
          // }else{
            
          // }
    
        }catch(e){
          console.log("error: ", e)
          alert("Incorrect email")
        }
    
      }
  return (

    <div>
      { isLoading ? <Pre_loading_page/> :
    <div style={{ backgroundColor: '#0B0E2A' }}>
    <Navbar/>
    <div style={{ backgroundColor: '#0B0E2A' }} className="text-white pt-16">
    <div style={{ backgroundColor: "#1A1C33" }} className="mx-72 grid ">

      <div className='grid justify-items-center mt-10'>
        <img src={myImage} className="rounded-full h-1/4"/>
      </div>

      <form>
        {/* ************************* row 1 *********************** */}
        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Firstname</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.firstName}  onChange = {(e) =>{setstudent(prevState => ({...prevState,firstName: e.target.value}))}}></input>
            </div>
          </div>
          
          <div>
            <label className='flex'>Middlename</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.middleName}  onChange = {(e) =>{setstudent(prevState => ({...prevState,middleName: e.target.value}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>Lastname</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'  value={student.lastName}  onChange = {(e) =>{setstudent(prevState => ({...prevState,lastName: e.target.value}))}}></input>
            </div>
          </div>
        </div>


        {/* ********************* row 2 ************************* */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Personal Email</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.personalEmail}  onChange = {(e) =>{setstudent(prevState => ({...prevState,personalEmail: e.target.value}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>Date of Birth</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.dateOfBirth}  onChange = {(e) => {setstudent(prevState => ({...prevState,dateOfBirth: e.target.value}))}}></input>
            </div>
          </div>
        </div>

        {/* ********************* row 2 ************************* */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>College Mail</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.collegeEmail}  onChange = {(e) =>{setstudent(prevState => ({...prevState, collegeEmail: e.target.value}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>Address 2</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
            </div>
          </div>
        </div>

        {/* ******************* row 3 ********************** */}

        <br />
        <div className='mx-8'>
        <label className='flex'>Address</label>
            <div>
              <input type="text" className='w-full px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={"ad"}  onChange = {(e) =>{setstudent(prevState => ({...prevState,homeAddress: e.target.value}))}}></input>
            </div>
        </div>

        {/* *********************** row 4 ************************ */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>City</label>
            <div>
              <input value={student?.address?.city} type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'   onChange = {(e) =>{setstudent(prevState => ({...prevState,city: e.target.value}))}}></input>
            </div>
          </div>


          <div>
            <label className='flex'>Pincode</label>
            <div>
              <input type="text" value={student?.address?.postalCode} className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' onChange = {(e) =>{setstudent(prevState => ({...prevState,pincode: e.target.value}))}}></input>
            </div>
          </div>
        </div>

        {/* ********************** row 5 ************************ */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>State</label>
            <div>
              <input type="text" value={student?.address?.state} className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' onChange = {(e) =>{setstudent(prevState => ({...prevState,state: e.target.value}))}}></input>
            </div>
          </div>
        </div>


        {/* *************************** row 6 ************************* */}

        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Age</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
            </div>
          </div>


          <div>
            <label className='flex'>Gender</label>
            <div className='flex'>
              <input type="radio" className='mx-2'  value="Male" name = "gender"/><label> Male</label>
              <input type="radio" className='mx-2' value="Female" name = "gender"/><label> Female</label>
            </div>
          </div>
        </div>

        {/* ******************************* row 7 ************************* */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Personal Contact Number</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.personalPhoneNumber}  onChange = {(e) =>{setstudent(prevState => ({...prevState,personalPhoneNumber: e.target.value}))}}></input>
            </div>
          </div>


          <div className=' break-before-all'>
            <label className='flex'>Guardian/Parent Contact Number</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.parentsPhoneNumber}  onChange = {(e) =>{setstudent(prevState => ({...prevState,parentsPhoneNumber: e.target.value}))}}></input>
            </div>
          </div>
        </div>


        {/* ********************* row 8 ********************** */}

        <br />
        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Student Resume</label>
          </div>

          <div>
            <button style={{ backgroundColor: '#3040D6' }} className = 'p-3 rounded-full'>Upload Resume</button>
          </div>
        </div>

        {/* ********************* row 9 ************************* */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Branch</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.branch}  onChange = {(e) =>{setstudent(prevState => ({...prevState,branch: e.target.value}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>Passing Year</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.passingYear}  onChange = {(e) =>{setstudent(prevState => ({...prevState,passingYear: e.target.value}))}}></input>
            </div>
          </div>
        </div>

        {/* ********************* row 10 ************************* */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Password</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.password}  onChange = {(e) =>{setstudent(prevState => ({...prevState,password: e.target.value}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>Confirm Password</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
            </div>
          </div>
        </div>

        <br />
          <div className=''>
            <h3 className='flex mx-8'>SPI</h3>
          </div>
        <br />

        {/* ********************* row 11 ************************* */}

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>1st Semester</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-1/3' autoComplete='false' name="sem1" value={student.result.sem1}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, sem1 : e.target.value}}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>2nd Semester</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-1/3'  autoComplete='false' value={student.result.sem2}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, sem2 : e.target.value}}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>3rd Semester</label>
            <div>
              <input type="text" className=' px-3 py-2 flex-shrink rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-1/3' autoComplete='false' value={student.result.sem3}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, sem3 : e.target.value}}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>4th Semester</label>
            <div>
              <input type="text" className=' px-3 py-2 flex-shrink rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-1/3' autoComplete='false' value={student.result.sem4}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, sem4 : e.target.value}}))}}></input>
            </div>
          </div>
        </div>

        {/* ********************* row 12 ************************* */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>5th Semester</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-1/3' autoComplete='false' value={student.result.sem5}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, sem5 : e.target.value}}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>6th Semester</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-1/3'  autoComplete='false' value={student.result.sem6}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, sem6 : e.target.value}}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>7th Semester</label>
            <div>
              <input type="text" className=' px-3 py-2 flex-shrink rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-1/3' autoComplete='false' value={student.result.sem7}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, sem7 : e.target.value}}))}}></input>
            </div>
          </div>

          <div>
            <label className='flex'>8th Semester</label>
            <div>
              <input type="text" className=' px-3 py-2 flex-shrink rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-1/3' autoComplete='false' value={student.result.sem8}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, sem8 : e.target.value}}))}}></input>
            </div>
          </div>
        </div>

      
      {/* ********************* row 13 ********************** */}

      <br />
        <div className='flex justify-between mx-8 '>
          <div>
            <label className='flex'>CPI (to be updated by Institute)</label>
          </div>
          <div>
          <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.result.cpi}  onChange = {(e) =>{setstudent(prevState => ({...prevState,cpi: e.target.value}))}}></input>
          <div>
          </div>
          </div>
        </div>

        {/* ********************* row 14 ************************* */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>SSC/Diploma Percentage</label>
            <div>
              <label className='flex'>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.result.twelfthPerc}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, twelfthPerc : e.target.value}}))}}></input>%</label>
            </div>
          </div>
            <div>
            <button style={{ backgroundColor: '#3040D6' }} className = 'p-3 rounded-full'>Upload Marksheet</button>
            </div>
        </div>

        {/* ********************* row 14 ************************* */}
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>HSC Percentage</label>
            <div>
              <label className='flex'>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' value={student.result.tenthPerc}  onChange = {(e) =>{setstudent(prevState => ({...prevState,result : {...prevState.result, tenthPerc : e.target.value}}))}}></input>%</label>
            </div>
          </div>
            <div>
            <button style={{ backgroundColor: '#3040D6' }} className = 'p-3 rounded-full'>Upload Marksheet</button>
            </div>
        </div>

        {/* ********************* row 15 ********************** */}

        <br />
        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Coding Profile</label>
          </div>

          <div className='flex flex-row justify-between'>
          <div className='mx-8'>
            <button style={{ backgroundColor: '#3040D6' }} className = 'p-3 rounded-full' onClick={handleAddProfile}>Add Profile</button>
          </div>

          <div>
            <button style={{ backgroundColor: '#3040D6' }} className = 'p-3 rounded-full' onClick={handleDeleteProfile}>Delete Profile</button>
          </div>
          </div>
        </div>

        <br />
        {
          student.competitiveCoding ? <div>
            {
              student.competitiveCoding.map((item,index) =>{
                return(<div>
                <div className='flex justify-between mx-8'>
                <div>
                  <label className='flex'>Platform</label>
                  <div>
                    <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' key={index} value={student.competitiveCoding[index].platform}  onChange = {(e) => handlePlatformChange(e,index)}></input>
                  </div>
                </div>
      
                <div>
                  <label className='flex'>Profile</label>
                  <div>
                    <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' key={index} value={student.competitiveCoding[index].profile} onChange = {(e) => handleProfileChange(e,index)}></input>
                  </div>
                </div>
              </div>

              <br />

              <div className='flex justify-between mx-8'>
                <div>
                  <label className='flex'>Stars</label>
                  <div>
                    <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' key={index} value={student.competitiveCoding[index].stars} onChange = {(e) => handleStarschange(e,index)}></input>
                  </div>
                </div>
      
                <div>
                  <label className='flex'>Ratings</label>
                  <div>
                    <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false' key={index} value={student.competitiveCoding[index].ratings} onChange = {(e) => handleRatingChange(e,index)}></input>
                  </div>
                </div>
              </div>
              <br />
              <hr />
              <br />
              </div>)
              })
            }
          </div> : null
        }
        <br />

        <br />
          <div className=''>
            <h3 className='flex mx-8'><b>Placement/Internship status</b></h3>
          </div>
        <br />

        <br />
          <div className=''>
            <h3 className='flex mx-8'>Internship</h3>
          </div>
        <br />

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Selected for Internship</label>
          </div>

          <div>
            <select value={student?.internshipStatus?.selected} name="internship_status" id="internship_status" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>
              <option value="--Select--" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }} defaultValue={true}>--Select--</option>
            <option value="yes" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>Yes</option>
            <option value="no" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>No</option>
            </select>
          </div>

          <div>
          <label className='flex'>Company Name</label>
        <input type="text" value={student?.internshipStatus?.companyName} className='px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
        </div>
      </div>

        {/* ********************* row - 16  ************************* */}

        <br />
        <div className='flex justify-between mx-8'>
        <div>
            <label className='flex'>Joining Date</label>
            <div>
              <input type="text" value={student?.internshipStatus?.joiningDate} className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
            </div>
          </div>

          <div>
            <label className='flex'>Internship Duration (in Months)</label>
            <div>
              <input type="text" value={student?.internshipStatus?.duration} className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
            </div>
          </div>
        </div>

        {/* ************************ row - 17  ************************* */}
        <br />

        <div className='flex justify-between mx-8'>

          <div>
          <label className='flex'>Stipend (In thousand Rupees)</label>
            <div>
              <input type="text" value={student?.internshipStatus?.stipend} className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
            </div>
          </div>

          <div>
            <label className='flex'>Mode</label>
            <div className='text-black'>
            <select value={student?.internshipStatus?.mode} name="internship_status" id="internship_status" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>
            <option value="--Select--" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }} defaultValue={true}>--Select--</option>
            <option value="remote" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>Remote</option>
            <option value="onsite" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>Work from Home</option>
            </select>
            </div>
          </div>
        </div>

        <br />

        <br />
          <div className=''>
            <h3 className='flex mx-8'>Placement</h3>
          </div>
        <br />

        {/* ********************* row - 18  ************************* */}

        <div className='flex justify-between mx-8'>
          <div>
            <label className='flex'>Selected for Placement</label>
          </div>

          <div>
            <select name="internship_status" id="internship_status" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>
              <option value="--Select--" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }} defaultValue={true}>--Select--</option>
            <option value="yes" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>Yes</option>
            <option value="no" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>No</option>
            </select>
          </div>

          <div>
          <label className='flex'>Company Name</label>
        <input type="text" className='px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
        </div>
      </div>

        {/* ********************* row - 19  ************************* */}

        <br />
        <div className='flex justify-between mx-8'>
        <div>
            <label className='flex'>Joining Date</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
            </div>
          </div>

          <div>
            <label className='flex'>Job Bond (in Months)</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
            </div>
          </div>
        </div>

        {/* ************************ row - 20  ************************* */}
        <br />

        <div className='flex justify-between mx-8'>

          <div>
          <label className='flex'>Annual Package (In Lakhs)</label>
            <div>
              <input type="text" className=' px-3 py-2 flex rounded-lg mt-2 pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete='false'></input>
            </div>
          </div>

          <div>
            <label className='flex'>Mode</label>
            <div className='text-black'>
            <select name="internship_status" id="internship_status" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>
            <option value="--Select--" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }} defaultValue={true}>--Select--</option>
            <option value="yes" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>Remote</option>
            <option value="no" className='text-white p-1' style={{ backgroundColor: '#0B0E2A' }}>Work from Home</option>
            </select>
            </div>
          </div>
        </div>

      </form>


      <br /><br /><br />

      <div className='flex justify-around mx-8'>
        <div>
            <button style={{ backgroundColor: '#3040D6' }} className = 'p-3 rounded-full w-40' onClick={postEntry}>Save Changes</button>
          </div>

          <div>
            <button style={{ backgroundColor: '#3040D6' }} className = 'p-3 rounded-full w-40'>Cancel</button>
          </div>
        </div>

        <br /><br />
    </div>

    <br /><br /><br />
  </div>
  </div>
}
  </div>
  )
}
