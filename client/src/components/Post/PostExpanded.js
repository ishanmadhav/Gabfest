import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { loadPost, selectBody, selectReplies, selectTitle, selectVotes } from '../../slices/postSlice'
import ReplyEditor from '../Thread/ReplyEditor'
import {ArrowUpIcon, ArrowDownIcon} from '@heroicons/react/outline'
import Reply from '../Thread/Reply'
import { selectAllPosts, selectPostById } from '../../slices/communitySlice'
import Loader from 'react-loader-spinner'
import { asyncUpvote, asyncDownvote } from '../../slices/postSlice'

export default function PostExpanded() {
    const dispatch = useDispatch()
    const {id}=useParams()
    const title=useSelector(selectTitle)
    const body=useSelector(selectBody)
    const replies=useSelector(selectReplies)
    const votes=useSelector(selectVotes)
    const posts=useSelector(selectAllPosts)
    const post=posts.find((item)=>item._id==id)
    
    const [loading, setLoading]=useState(true)
    useEffect(()=>
    {
        dispatch(loadPost(id, setLoading))
        console.log(replies)
        console.log("Printing this post")
        console.log(post)
        
    }, [])

    const createContent=()=>
    {
        return {__html: post.body}
    }

    const handleUpvote=()=>
    {
        dispatch(asyncUpvote(id))
    }

    const handleDownvote=()=>
    {
        dispatch(asyncDownvote(id))
    }
    
    return (
        <div className="bg-gray-300 h-full grid grid-cols-5 gap-2">
            <div></div>
            <div className="bg-white col-span-5 md:col-span-3 border-2 w-full shadow-md p-5">
                <h1 className="text-xl font-medium">{post.title}</h1>
                <div className="mt-5" dangerouslySetInnerHTML={createContent()}>
                </div>
                <div className="font-semibold mb-5 mt-5">
                <ArrowUpIcon onClick={handleUpvote} className="h-6 w-6 hover:text-blue-600 inline cursor-pointer"/>{votes.upvotes-votes.downvotes}<ArrowDownIcon onClick={handleDownvote} className="h-6 w-6 hover:text-red-600 inline cursor-pointer"/>
                </div>

                <div className="mt-5 mb-5 p-5">
                    <ReplyEditor id={id}/>
                </div>
                {loading?<div className="grid place-items-center mt-20"><Loader className="" type="Bars" color="#50524d" height={80} width={80} /></div>: <div className="grid mt-32 grid-cols-1 divide-y divide-gray-200">
                    {
                        replies.map((reply)=>(<Reply reply={reply}/>))
                    }
        
                </div>
                       }
                

            </div>
            <div></div>
        </div>
    )
}
