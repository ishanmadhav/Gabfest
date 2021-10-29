import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { loadCommunities, selectAllCommunities } from '../../slices/forumSlice'
import ForumTile from './ForumTile'
import { useDispatch, useSelector } from 'react-redux'
import ForumTileX from './ForumTileX'
import { getAllCommunities } from '../../api/api'

export default function Feed() {
    const dispatch = useDispatch()
    const user=JSON.parse(localStorage.getItem('gabprofile'))
    const communities=useSelector(selectAllCommunities)
    
    const [list, setList]=useState([])
    useEffect(async ()=>
    {
        const {data}=await getAllCommunities()
        shuffle(data)
        setList(data)
       
    }, [])
    useEffect(()=>
    {
      if (user)
      {
          dispatch(loadCommunities(user.result._id))
      }
    },[])
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }

    
    
    return (
        <div className="bg-gray-300 grid grid-cols-5 gap-2">
            <div></div>
            <div className="bg-white col-span-3 border-2 border-gray-400 p-2">
                <div className="border-gray-400 border-2 m-4 p-3">
                <span className="flex justify-between"><h1 className="text-xl font-sans font-semibold inline">Your Communities! </h1>  <Link className="inline text-gray-400 hover:underline" to='/communities/joined'>View all</Link> </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                       {
                           communities.map((community)=>(
                                <ForumTile name={community.name} description={community.description} id={community._id} posts={community.posts} members={community.members}/>
                           ))
                       }
                    </div>
                </div>
                
                <div className="border-gray-400 border-2 m-4 p-3">
                <span className="flex justify-between"><h1 className="text-xl font-sans font-semibold inline">Discover Communities! </h1>  <Link className="inline text-gray-400 hover:underline" to='/communities/all'>View all</Link> </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-5">
                        {
                            list.slice(0,6).map((community)=>(
                                <ForumTile name={community.name} description={community.description} id={community._id} posts={community.posts} members={community.members}/>
                            ))
                        }
                    </div>
                </div>
                
                <div className="border-gray-400 border-2 m-4 p-3">
                    <span className="flex justify-between"><h1 className="text-xl font-sans font-semibold inline">General Discussion </h1>  <Link className="inline text-gray-400 hover:underline" to='/communities/all'>View all</Link> </span> 
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                        <ForumTile />
                        <ForumTile />
                        <ForumTile />
                        <ForumTile />
                        <ForumTile />
                        <ForumTile />
                    </div>
                </div>
                
            </div>
            <div></div>
        </div>
    )
}
