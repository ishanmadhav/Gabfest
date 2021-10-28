import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadPosts, selectAllPosts, selectDescription, selectMembers, selectName } from '../../slices/communitySlice'
import { useParams } from 'react-router'
import Editor from './Editor'
import PostShort from '../Post/PostShort'
import { selectAllCommunities, selectCommunity } from '../../slices/forumSlice'
import Loader from 'react-loader-spinner'
import PostsMapper from './PostsMapper'


export default function CommunityExpanded() {
    const posts=useSelector(selectAllPosts)
    const name=useSelector(selectName)
    const description=useSelector(selectDescription)
    const members=useSelector(selectMembers)
    const {id} =useParams()
    //const community=useSelector((state, id)=>(state.communities.list))

    const dispatch=useDispatch()
    
    const [editor, setEditor]=useState(false)
    const [loading, setLoading]=useState(true)
    


    useEffect(()=>
    {
        console.log(id)
        dispatch(loadPosts(id, setLoading))
        console.log(posts)
        
        

    }, [])
    return (
        
        <div className="grid grid-cols-7">
            <button onClick={()=>console.log(posts)}>Click me</button>
            <div className="bg-gray-300"></div>
            <div className="grid col-span-5 grid-cols-3 bg-gray-300">
                <div className="bg-gray-300 h-8 p-10 w-full col-span-3"></div>
                <div className="col-span-3 md:col-span-2 bg-gray-300">
                    <h1 className="text-4xl font-bold bg-white p-5 border-2">{name}</h1>
                    <div className={`p-5 ${editor?"pb-64":""} border-2 w-full shadow-md bg-white mt-5 mb-10`} >
                        {editor?<Editor id={id} setEditor={setEditor} />:<div>Create a post!
                        <input onClick={()=>setEditor(true)} className="shadow appearance-none border rounded mt-3 w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent" type="text" placeholder="Create Post"/> </div>}
                    </div>
                   
                    {loading?<div className="grid place-items-center mt-10"><Loader className="" type="Bars" color="#50524d" height={80} width={80} /></div>: posts.slice(0).reverse().map((post)=>(
                            <PostShort title={post.title} poster={post.poster} body={post.body} replies={post.replies} upvotes={post.upvotes} downvotes={post.downvotes} id={post._id}/>
                        ))
                       }

                       
                    
                </div>
                <div className="shadow-md md:visible invisible ml-2 bg-white">
                    <p className="bg-gray-400 w-full text-white text-center font-bold">About Community</p>
                    <p className="mt-10 text-center">{description} </p>
                    <p className="font-semibold text-center">Posts: {posts?posts.length:0} Members: {members?members.length:0}</p>
                    <div className="flex align-items-center"><button onClick={()=>setEditor(true)} className="rounded-xl m-auto bg-gray-400 p-3 p-3 mt-3 font-semibold hover:bg-gray-600 text-white w-1/2">Create Post</button></div>
                </div>
            </div>
            <div className="bg-gray-300"></div>

        </div>
    ) 
}


/*
posts.map((post)=>
              {
                return (<div>{post.title}</div>)
              }) */