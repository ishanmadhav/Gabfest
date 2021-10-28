import React, {useEffect, useState} from 'react'
import { loginUser } from '../../api/api'
import { useHistory } from 'react-router'
import { configureStore } from '@reduxjs/toolkit'

export default function Home() {
    const history=useHistory()
    //Form State
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    const redirectToSignup=()=>
    {
        history.push('/')
    }

    const handleEmailChange=(e)=>
    {
        setEmail(e.target.value)
    }
    const handlePasswordChange=(e)=>
    {
        setPassword(e.target.value)
    }

    const handleLogin=async (e)=>
    {
        e.preventDefault()
        const formData={
            email: email,
            password: password
        }
        console.log("Login Being attempted")
        console.log(formData)
        try{
            const response=await loginUser(formData)
            console.log(response)
            localStorage.setItem('gabprofile', JSON.stringify(response.data))
            history.push('/feed')
        }
        catch(error)
        {
            console.log(error)
        }
        
    }
   
    return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        
            <div className="inline-block align-bottom bg-white px-10 py-10 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <h1 className="text-2xl mb-5"> Sign Up </h1>
            <div>
                <input onChange={handleEmailChange} className="shadow appearance-none border rounded w-3/4 py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent" type="text" placeholder="Email"/>
                <input onChange={handlePasswordChange}  className="shadow appearance-none border rounded w-3/4 py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent" type="password" placeholder="Password"/>
                <button onClick={handleLogin} className="block bg-green-400 hover:bg-green-600 transition duration-1000 text-white rounded-full py-2 px-8">Log in</button>
                <p>Don't have an account? <button onClick={redirectToSignup} className=" bg-blue-400 inline transition duration-1000 hover:bg-blue-600 text-white rounded-full py-2 px-8">Sign Up</button></p>
            </div>
            </div>
        </div>
    </div>
        )
    }
