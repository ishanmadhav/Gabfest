import React from 'react'
import {ChatIcon, UsersIcon} from '@heroicons/react/outline'
import { useHistory } from 'react-router'

export default function ForumTile({name, description, posts, members, id}) {
    const history=useHistory()
    const openCommunity=()=>
    {
        console.log("Clicked on Open Community")
        history.push(`/community/${id}`)
    }

    return (
        <div className="shadow-md border-2 p-6">
            <h1 onClick={openCommunity} className="text-lg font-semibold cursor-pointer">{name}</h1>
            <p class="text-gray-500">{description}</p>
            <p class="text-gray-500"><ChatIcon className="h-5 w-5 inline" />{posts?posts.length:0} <UsersIcon className="h-4 w-4 inline"/>{members?members.length:0}</p>
            
        </div>
    )
}
