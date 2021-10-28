import React, {useState, useEffect} from 'react'
import { getAllCommunities } from '../../api/api'
import CommunityJoinTile from './CommunityJoinTile'


export default function AllCommunities() {
    const [communities, setCommunities]=useState([])
    useEffect(async ()=>
    {
        const {data}=await getAllCommunities()
        shuffle(data)
        setCommunities(data)
        
    }, [])
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
    return (
        <div className="bg-gray-300 h-screen">
            <div className="bg-gray-300 grid grid-cols-5 gap-2">
            <div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-3 bg-white">
                {
                    communities.map((community)=>(
                        <CommunityJoinTile title={community.name} description={community.description} id={community._id}/>
                    ))
                }
            </div>
            <div></div>
        </div>
        </div>
        
        
    )
}
