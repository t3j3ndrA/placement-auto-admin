import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import data from'./Input.json'
import {useEffect, useState} from 'react'
import axios from 'axios'

export const Demo1 = () => {
  let url = "http://127.0.0.1:5000/api"
  const [_data, set_data] = useState([])
  useEffect(() => {
    console.log("hello from company page")

    const id = '63f73eb5437902cd5d462e11'
    const getValues = async() =>{
      try{
        const {data} = await axios.get(`${url}/Company/${id}`)
          console.log("Data from company page: ", data)
          set_data(data)
          console.log("Data stored in useState: ", _data)
      }catch(err){
        console.log("error: ", err)
      }
    }

    getValues()
    return () => {
      
    }
  }, [])
  
  return (
    <div style={{ backgroundColor: '#0B0E2A' }}>
    <Navbar/>
    
    <div style={{ backgroundColor: '#0B0E2A' }} className="text-white pt-28 ">
    <div style={{ backgroundColor: "#1A1C33" }} className="mx-72 grid ">

      <br />
      <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">Company Name</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = {_data.name} autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}


    <br />
      <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">Website</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = {_data.website} autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}


    <br />
      <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">Email</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = {_data.email} autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}


    <br />
      <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">For Batch</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = {_data.forBatch} autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}

    <div className='mx-2'>
      <h2>Roles</h2>
    </div>

    <br />

    <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">Role</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = "Python backend Developer" autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}


    <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">Appplying for</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = "Full time job" autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}


    <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">Description</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = "Required a python backend developer who can  design, build and maintain efficient, reusable, and reliable Python code and Implement and maintain databases, including data modeling, data access, and data storage." autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}


    <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">Skills required</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = "DSA, Java, C++, Web development, Basics of AWS" autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}

    <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">Job type</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = "Remote" autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}

    <div className='flex flex-row align-middle justify-center'>
        <div className='basis-1/3 mx-2'>
          <label htmlFor="">Location</label>
        </div>
        <div className='mx-2 w-full'>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = "Mumbai" autoComplete='false' readOnly={true}></input>
        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value = "Pune" autoComplete='false' readOnly={true}></input>
        </div>
      </div>
      <br />
    {/* ********************************* */}



      <br /><br />
      <div className='flex justify-around mx-8'>
        <div>
            <button style={{ backgroundColor: '#3040D6' }} className = 'p-3 rounded-full w-40'>Save Changes</button>
          </div>

          <div>
            <button style={{ backgroundColor: '#3040D6' }} className = 'p-3 rounded-full w-40'>Cancel</button>
          </div>
        </div>

        <br /><br />
    </div>

    <br /><br /><br />
  </div>
  <div/>
</div>
  )
}