import React from 'react'
import data from './data.json'
import loadImg from '../Form/1.jpeg'
import Cards from './Cards';
import Input from './Input.json'
import Input1 from './Input1.json'
import { Navbar } from '../Navbar/Navbar';
import {useEffect, useState} from 'react'
import { json } from 'react-router-dom'

export const Homepage = () => {

    let url = "http://127.0.0.1:5000/api"
    const [_data, set_data] = useState({})
    useEffect(() => {
        console.log("hello from homepage")
    
        const getValues = async () => {
          try {
            // const data = await axios.get(`${url}/Company/${id}`)
            const data = await fetch(`${url}/comapny`).then(response => response.json()).then(console.log(json))
            console.log("Data from company page: ", data)
            set_data(data)
            console.log("Data stored in useState: ", _data)
            // objectToarray = Object.entries(_data)
          } catch (err) {
            console.log("error: ", err)
          }
        }

        getValues()
        return () => {
    
        }
      }, [])
    
    const renderCardItem = (item, key) => {
        return (
            <React.Fragment>
                {/* <table className="min-w-full bg-white dark:bg-gray-800"> */}
                <tr className="h-24 border-gray-300 border-b">
                    <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{item.name}</td>

                    <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">INR {item.package} lpa</td>

                    <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">02.03.20</td>

                    <td className="px-5 py-3 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Click here to apply</button></td>
                </tr>
                {/* </table> */}
            </React.Fragment>
        )
    }

    const renderItem1 = (item) => {
        return (

            <div className=' p-4 mx-72 text-white rounded-lg' style={{ backgroundColor: '#1A1C33' }}>

                <div>
                    <h3><b>item.name</b></h3>
                </div>

                <br />

                <div className='flex flex-row justify-between'>
                    <div>
                        <label><b>{item.website}</b></label>
                    </div>

                    <div>
                        <label>Mail to: </label><label><u><b>{item.email}</b></u></label>
                    </div>
                </div>

                <br />

                <div className='flex flex-row justify-between '>
                    <div className='p-2 rounded-lg' style={{ backgroundColor: '#292B45' }}>
                        <div>
                            <label className='text-[#989898]'>{item.role}</label>
                        </div>
                        <div>
                            <label>{ }</label>
                        </div>
                    </div>

                    <div className='p-2 rounded-lg' style={{ backgroundColor: '#292B45' }}>
                        <div>
                            <label className=' text-[#989898]'>Last Date to Apply</label>
                        </div>
                        <div className='flex space-x-1 -space-x-1'>
                            <div>
                                <label>6:30 PM</label>
                            </div>
                            <div>
                                <label>12-08-2023</label>
                            </div>
                        </div>
                    </div>

                    <div className='p-2 rounded-lg' style={{ backgroundColor: '#292B45' }}>
                        <div>
                            <label className=' text-[#989898]'>Stipend</label>
                        </div>
                        <div>
                            <label>INR 25 lpa</label>
                        </div>
                    </div>
                </div>

                <br />

                <div>
                    <label>Amazon.com, Inc. is an American multinational company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.</label>
                </div>

                <br />

                <div className='grid justify-items-center'>
                    <div className='bg-white text-black w-1/4 rounded-lg grid justify-items-center'>

                        <button>View More</button>
                    </div>
                </div>
            </div>
        )
    }
    return (

        <div style={{ backgroundColor: '#0B0E2A' }}>

            <Navbar />

            <br />
            <br />
            <br />
            <br />
            <br />

            <div className='flex justify-center'>
                <div  className='w-2/12 grid justify-items-center m-2 p-2 hover:bg-blue-700 bg-indigo-900'>
                    <button className='text-white' >Full Time Job</button>
                </div>


                <div className='w-2/12 grid justify-items-center m-2 p-2 hover:bg-blue-700 bg-indigo-900'>
                    <button className='text-white hover:bg-#2538E6' >Internship</button>
                </div>
            </div>

            <br />
            <br />
            <br />

            <div className=" mx-auto container bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded">

                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                        <tr className="w-full h-16 border-gray-300 border-b py-8">

                            <th role="columnheader" className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Company Name</th>
                            <th role="columnheader" className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Package</th>
                            <th role="columnheader" className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Date</th>
                            {/* <th className="px-5 py-3 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                        <div className="opacity-0 w-2 h-2 rounded-full bg-indigo-400"></div>
                                    </th>  */}
                        </tr>
                    </thead>
                    <tbody>
                        {Input.companies.map(renderCardItem)}
                    </tbody>
                </table>
            </div>

            <br />
            <br />
            <br />
            { }
        </div>
    )
}




// return (
//   <div className='grid gap-2 lg:grid-cols-1'>
//             {Input.companies.map(renderCardItem)}
//   </div>
// )



{/* <td className="pr-8 relative">
                                        
                                    </td> */}



{/* <thead>
                                <tr className="w-full h-16 border-gray-300 border-b py-8">
                                    <th className="pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                        <input placeholder="check box" type="checkbox" className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:outline-none focus:ring-2  focus:ring-gray-400" onclick="checkAll(this)" />
                                    </th>
                                    <th  className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                        <div className="text-gray-600 dark:text-gray-400 opacity-0 cursor-default relative w-10">
                                            <div className="absolute top-0 right-0 w-5 h-5 mr-2 -mt-1 rounded-full bg-indigo-700 text-white flex justify-center items-center text-xs">3</div>
                                            <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/compact_table_with_actions_and_select-svg8.svg" alt="icon-tabler-file"/>
                                            <img className="dark:block hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/compact_table_with_actions_and_select-svg8dark.svg" alt="icon-tabler-file"/>
                                        </div>
                                    </th>
                                    <th role="columnheader" className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Invoice Number</th>
                                    <th role="columnheader" className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Client</th>
                                    <th role="columnheader" className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Company Contact</th>
                                    <th role="columnheader" className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Amount</th>
                                    <th role="columnheader" className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Date</th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                        <div className="opacity-0 w-2 h-2 rounded-full bg-indigo-400"></div>
                                    </th>
                                    <td role="columnheader" className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">More</td>
                                </tr>
                            </thead> */}