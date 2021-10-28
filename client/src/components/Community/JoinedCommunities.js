import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllCommunities } from '../../slices/forumSlice'
import ForumTileX from '../Feed/ForumTileX'

export default function JoinedCommunities() {
    const dispatch=useDispatch()
    const communities=useSelector(selectAllCommunities)
    useEffect(()=>
    {
        console.log("Printing communities")
        console.log(communities)
    },[])
    return (
        <div className="bg-gray-300 h-auto grid grid-cols-5 gap-2">
            <div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-3 bg-white">
                
                    {
                        communities.map((community)=>(
                            <ForumTileX title={community.name} description={community.description} id={community._id}/>
                        ))
                    }
                

            </div>
            <div></div>
        </div>
    )
}
