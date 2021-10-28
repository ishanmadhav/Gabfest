import React from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import sanitize from 'sanitize-html'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/outline'
import { asyncDownvote, asyncUpvote } from '../../slices/postSlice'

export default function PostShort({title, body, upvotes, downvotes, poster, replies, id}) {
    const history=useHistory()
    const dispatch=useDispatch()
    const createContent=()=>
    {
        return {__html: body}
    }
    const cleanBody=sanitize(body,{
        allowedTags: [],
        allowedAttributes: {}
    })

    const openFull=()=>
    {
        history.push(`/post/${id}`)
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
        <div className="p-5 grid grid-cols-12 border-2 w-full shadow-md bg-white mt-5">
            <div className=''>
            <ArrowUpIcon onClick={handleUpvote} className="h-6 w-6 hover:text-blue-600 block cursor-pointer"/>
            <span className="block ml-2">{upvotes-downvotes?upvotes-downvotes:0}</span>
            <ArrowDownIcon onClick={handleDownvote} className="h-6 w-6 hover:text-red-600 block mt-2 cursor-pointer"/>
            </div>
            
            <div className="cursor-pointer col-span-10" onClick={openFull}>
                <h2 className="font-semibold text-lg"> {title} </h2> 
                <div className="col-span-5">{cleanBody}</div>
            </div>
            
        </div>
    )
}
