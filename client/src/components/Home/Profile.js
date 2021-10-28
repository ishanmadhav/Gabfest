import React, {useEffect, useState} from 'react'
import { getPostsByUserId } from '../../api/api'
import PostShort from '../Post/PostShort'

export default function Profile() {
    const [posts, setPosts]=useState([])
    const user=JSON.parse(localStorage.getItem('gabprofile'))
    useEffect(async ()=>
    {
        console.log(user.result._id)
        const {data}=await getPostsByUserId(user.result._id)
        console.log(data)
        setPosts(data)
    },[])


    return (
        <div className="grid grid-cols-7">
            <div className="bg-gray-300"></div>
            <div className="grid grid-cols-3 col-span-5 bg-gray-300">
                <div className="bg-gray-300 h-8 p-10 w-full col-span-3"></div>

                <div className="col-span-3 md:col-span-2 bg-gray-300">
                    <h1 className="text-4xl font-bold bg-white p-5 border-2">{user.result.name}</h1>
                    {posts? posts.slice(0).reverse().map((post)=>(
                            <PostShort title={post.title} poster={post.poster} body={post.body} replies={post.replies} id={post._id}/>
                        ))
                    :<div></div>}
                </div>
                <div className="shadow-md md:visible invisible ml-2 bg-white">
                    <img src={user.result.avatar} />
                </div>
            </div>
            <div className="bg-gray-300"></div>

        </div>
    )
}
