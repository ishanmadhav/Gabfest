import React, {useState} from 'react'
import { createCommunity } from '../../slices/forumSlice'
import { useDispatch } from 'react-redux'

export default function CreateCommunity() {
   const dispatch = useDispatch()
   const [name, setName]=useState('')
   const [description, setDescription]=useState('')
   const user=JSON.parse(localStorage.getItem('gabprofile'))

    const handleNameChange=(e)=>
    {
        setName(e.target.value)
    }

    const handleDescriptionChange=(e)=>
    {
        setDescription(e.target.value)
    }

    const handleSubmit=()=>
    {
        const formData={
            name: name,
            description: description,
            createdBy: user.result._id
        }
        console.log(formData)
        console.log("Create was clicked!")
        dispatch(createCommunity(formData))
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        
            <div className="inline-block align-bottom bg-white px-10 py-10 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <h1 className="text-2xl mb-5"> Create a New Community </h1>
            <div>
                <input onChange={handleNameChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent" type="text" placeholder="Name"/>
                <textarea onChange={handleDescriptionChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent" rows="4" placeholder="Description" />
                <button onClick={handleSubmit} className="block bg-gray-400 hover:bg-blue-600 focus:bg-blue-600 transition duration-1000 text-white rounded-full py-2 px-8">Create</button>

            </div>
            </div>
        </div>
    </div>
    )
}
