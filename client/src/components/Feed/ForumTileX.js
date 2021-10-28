import React from 'react'
import {ChatIcon, UsersIcon} from '@heroicons/react/outline'
import { useHistory } from 'react-router'

export default function ForumTileX({title, description, id}) {
    const history=useHistory()
    const openCommunity=()=>
    {
        console.log("Clicked on Open Community")
        history.push(`/community/${id}`)
    }
    return (
        <div className="shadow-md border-2 p-6">
            <h1 onClick={openCommunity} className="text-lg font-semibold cursor-pointer">{title}</h1>
            <p className="text-gray-500">{description}</p>
            <p className="text-gray-500"><ChatIcon className="h-5 w-5 inline" />12 <UsersIcon className="h-4 w-4 inline"/> 5</p>
            
        </div>
    )
}
