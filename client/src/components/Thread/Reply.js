import React, {useEffect, useState} from 'react'
import Thread from './Thread'
import { ReplyIcon, ChatIcon, ArrowUpIcon, ArrowDownIcon, DotsVerticalIcon } from '@heroicons/react/outline'
import ReplyThreadEditor from './ReplyThreadEditor'


export default function Reply({reply}) {
    const [editor, setEditor]=useState(false)
    const handleEditor=()=>
    {
        setEditor(!editor)
    }
    const createThreadContent=(replyBody)=>
    {
        return {__html: replyBody}
    }
    useEffect(()=>
    {
        console.log('Printing reply')
        console.log(reply)
        console.log("The username is "+reply.poster.username)
    },[])
    return (
        <div>
            <div className="p-5">
                    <img    
                    className="h-4 w-4 rounded-full inline"
                        src={reply.poster.avatar?reply.poster.avatar:'https://avatars.dicebear.com/api/bottts/Sam Houser.svg'}
                        alt=""
                      />
                    <div className="inline font-light font-sm ">{reply?reply.poster.username:""}</div>
                    <div className="" dangerouslySetInnerHTML={createThreadContent(reply.body)}>
                        
                    </div>
                        <div className="grid grid-cols-5">
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

                        
                        {editor?<ReplyThreadEditor id={reply._id} setEditor={setEditor}/>:<div></div>}
            </div>
            
            {
                reply.replies.map((thread)=>(<div className="ml-5"><Thread thread={thread}/></div>))
            }
            
            
        </div>
       
    )
}
