import React from 'react'
import { useState } from 'react'
// import './basicForm.css'
export const BasicForm = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const [AllEntry, setAllEntry] = useState([])
    const submitForm = (e) =>{

        e.preventDefault()    // prevents html page from loading
        const newEntry = {email: email, password: password}
        setAllEntry([...AllEntry,newEntry])    // it will set value of allEntry to previous value of allEntry plus newEntry, hence we will be able to store all values of users who log in and log out one after one
    }
  return (

    <div>
        <body>
    <div className='center'>
        <h1>Login</h1>
        <form onSubmit={submitForm}>
            
        </form>
    </div>
    </body>
    </div>
  )
}

 
