import React,{useState, useEffect} from 'react'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import {XIcon} from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { createPost } from '../../slices/communitySlice'
import { useHistory } from 'react-router'
import { postReply } from '../../slices/postSlice'
import * as api from '../../api/api'

export default function ThreadEditor({id, parent, setParent, setEditor}) {
    const dispatch=useDispatch()
    const history=useHistory()
    const [quill, setQuill]=useState(null)
    const [title, setTitle]=useState('')
    const user=JSON.parse(localStorage.getItem('gabprofile'))
    const postThread=async (e)=>
    {
        e.preventDefault()
        var content=quill.root.innerHTML
        const formData={
            body: content, 
            poster: user.result._id,
            parentId: id
        }

        const {data}=await api.postThread(formData)
        console.log("Reply added successfully")
        if (setParent)
        {
            setParent(data.replies)
        }
        if (setEditor)
        {
            setEditor(false)
        }
        
        

    }

    useEffect(()=>
    {
        var newQuill=new Quill('#thread-editor', {
            modules: {
                toolbar: [
                    [{'font':[]}],
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  ['link','blockquote'],
                  [{ 'align': [] }],
                  [{ 'indent': '-1'}, { 'indent': '+1' }],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  
                ]
              },
            placeholder: 'What are your thoughts?',
            theme: 'snow'
        })
        if (newQuill)
        {
            setQuill(newQuill)
        }
    }, [])
    return (
        <div className="h-32">
           
            <div id="thread-editor" >
            
            </div>
            <button onClick={postThread} className="p-2 mt-0 border-black border-2 float-right hover:bg-black hover:ring-2 hover:ring-black hover:text-white">
                            POST
            </button>
        </div>
        
    )
}
