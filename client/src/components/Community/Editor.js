import React,{useState, useEffect} from 'react'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import {XIcon} from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { createPost } from '../../slices/communitySlice'
import { useHistory } from 'react-router'

export default function Editor({id, setEditor}) {
    const dispatch=useDispatch()
    const history=useHistory()
    const [quill, setQuill]=useState(null)
    const [title, setTitle]=useState('')
    const user=JSON.parse(localStorage.getItem('gabprofile'))
    const postContents=(e)=>
    {
        e.preventDefault()
        var content=quill.root.innerHTML
        console.log(content)
        const formData={
            title: title,
            body: content,
            poster: user.result._id,
            parentId: id
        }
        console.log(formData)
        dispatch(createPost(formData, history))

    }

    const handleTitleChange=(e)=>
    {
        setTitle(e.target.value)
    }

    useEffect(()=>
    {
        var newQuill=new Quill('#editor', {
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
            placeholder: 'What is on your mind?',
            theme: 'snow'
        })
        if (newQuill)
        {
            setQuill(newQuill)
        }
    }, [])
    return (
        <div className="h-24 mb-10">
            Create Post!
           <XIcon onClick={()=>setEditor(false)} className="h-6 w-6 float-right mt-2 cursor-pointer"/>
            <input onChange={handleTitleChange} className="shadow appearance-none border rounded mt-3 w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:border-transparent" type="text" placeholder="Title"/>

            <div id="editor" >
            
            </div>
            <button onClick={postContents} className="p-2 mt-0 border-black border-2 w-full hover:bg-black hover:ring-2 hover:ring-black hover:text-white">
                            POST
            </button>
        </div>
        
    )
}
