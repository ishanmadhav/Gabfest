import React, {useState, useEffect} from 'react'
import { ReplyIcon, ChatIcon, ArrowUpIcon, ArrowDownIcon, DotsVerticalIcon } from '@heroicons/react/outline'
import * as api from '../../api/api'
import ThreadEditor from './ThreadEditor'

export default function Thread({thread}) {
    const [showReplies, setShowReplies]=useState(false)
    const [editor, setEditor]=useState(false)
    const [replies, setReplies]=useState([])
    const [username, setUsername]=useState('')
    const [avatar, setAvatar]=useState('https://avatars.dicebear.com/api/bottts/Sam Houser.svg')
    useEffect(async ()=>{
        console.log("in a thread")
        console.log(thread)
        const {data}=await api.getThreadById(thread._id)
        console.log(data)
        setReplies(data.replies)
        setUsername(data.poster.username)
        setAvatar(data.poster.avatar)
        console.log(replies)
    }, [])

    const handleEditor=()=>
    {
        setEditor(!editor)
    }
    const createThreadContent=(replyBody)=>
    {
        return {__html: replyBody}
    }


    return (
        <div>
            <div className="ml-3 font-light font-sm ">
                    <img    
                    className="h-4 w-4 rounded-full inline"
                        src={avatar}
                        alt=""
                      />
                {username}</div>
            <div className="ml-3 p-5 " dangerouslySetInnerHTML={createThreadContent(thread.body)}>
            
            </div>
            <div className="grid grid-cols-5 border-b-2 border-gray-200">
                            <div className="col-span-4"></div>
                            <div className="">
                            <ArrowUpIcon className="h-4 w-4 m-2 hover:text-blue-600 inline cursor-pointer"/>
                            <ArrowDownIcon className="h-4 w-4 m-2 hover:text-red-600 inline cursor-pointer"/>
                                <button onClick={handleEditor} className="hover:bg-gray-200 m-2">
                                    <ChatIcon className="h-4 w-4 inline" />
                                    Reply
                                </button>
                                <DotsVerticalIcon className="h-4 w-4 inline cursor-pointer hover:bg-gray-200"/>
                                
                            </div>
                            
                                            
            </div>
            {editor?<ThreadEditor id={thread._id} parent={replies} setParent={setReplies} setEditor={setEditor}/>:<div></div>}
            {
                                replies.map((child)=>(<div className="ml-5"><Thread thread={child} /></div>))
            }
        </div>
        
    )
}
