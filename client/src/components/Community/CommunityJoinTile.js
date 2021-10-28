import React from 'react'
import {ChatIcon, UsersIcon, CubeTransparentIcon} from '@heroicons/react/outline'
import { useHistory } from 'react-router'
import { addUserToCommunity } from '../../slices/forumSlice'
import { useDispatch } from 'react-redux'

export default function CommunityJoinTile({title, description, id}) {
    const history=useHistory()
    const dispatch = useDispatch()
    const user=JSON.parse(localStorage.getItem('gabprofile'))
    const joinCommunity=()=>
    {

        console.log("Clicked on Join Community")
        dispatch(addUserToCommunity(id, user.result._id, history))
    }
    const openCommunity=()=>
    {
        console.log("Clicked on Open Community")
        history.push(`/community/${id}`)
    }
    return (
        <div  className="shadow-md border-2 p-6 grid grid-cols-2">
            <div>
                <h1 onClick={openCommunity} className="text-lg font-semibold cursor-pointer" >{title}</h1>
                <p class="text-gray-500">{description}</p>
                <p class="text-gray-500"><ChatIcon className="h-5 w-5 inline" />12 <UsersIcon className="h-4 w-4 inline"/> 5</p>
            </div>
            <div className="flex justify-center items-center"> 
                <button onClick={joinCommunity} className="bg-gray-400 hover:bg-green-400 focus:bg-green-400 rounded-xl p-3"><CubeTransparentIcon />Join</button>
            </div>
            
        </div>
    )
}
