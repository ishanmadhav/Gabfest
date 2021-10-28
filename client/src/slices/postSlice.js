import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api/api';

const initialState={
    title: "",
    replies: [],
    upvotes: 0,
    downvotes: 0,
    poster: "",
    body: ""
}

export const postSlice=createSlice({name: 'post', initialState,
    reducers: {
        setPost: (state, action)=>
        {
            console.log("We have reached the reducer")
            console.log(action.payload.replies)
            state.title=action.payload.title
            state.body=action.payload.body
            state.replies=action.payload.replies
            state.upvotes=action.payload.upvotes
            state.downvotes=action.payload.downvotes
            state.poster=action.payload.poster
        },
        addReplies: (state, action)=>
        {
            console.log(action.payload)
            state.replies.push(action.payload)
        },
        addThread: (state, action)=>
        {
            console.log(action.payload)
            for (var i=0;i<state.replies.length;i++)
            {
                if (state.replies[i]._id===action.payload.replyId)
                {
                    state.replies[i]=action.payload.thread
                }
            }
        },
        upvotePost: (state, action)=>
        {
            console.log("Upvoting")
            state.upvotes=state.upvotes+1
        },
        downvotePost: (state, action)=>
        {
            console.log("Downvoting")
            state.downvotes=state.downvotes+1
        }
    }
})

export const {setPost, addReplies, addThread, upvotePost, downvotePost}=postSlice.actions


//Selectors
export const selectReplies=(state)=>state.post.replies

export const selectTitle=(state)=>state.post.title

export const selectBody=(state)=>state.post.body

export const selectVotes=(state)=>{
    const votes={
        upvotes: state.post.upvotes,
        downvotes: state.post.downvotes
    }

    return votes
}

//Thunks
export const loadPost=(postId, setLoading)=>async (dispatch, getState)=>
{
    console.log('The post is trying to load')
    try{
        const {data}=await api.getPost(postId)
        console.log(data)
        dispatch(setPost(data))
        setLoading(false)
    }
    catch(error)
    {
        console.log(error)
    }
    
}

export const postReply=(replyData)=>async (dispatch, getState)=>
{
    console.log('Reply process started')
    try{
        const {data}=await api.postReply(replyData)
        dispatch(addReplies(data))
    }
    catch(error)
    {
        console.log(error)
    }
}

export const postThread=(threadData)=>async (dispatch, getState)=>
{
    console.log("Thread proceses started")
    console.log(threadData)
    try{
        const {data}=await api.postThread(threadData)
        console.log(data)
        console.log("Thread added on server")
        dispatch(addThread({thread: data, replyId: threadData.parentId}))
    }
    catch(error)
    {

    }
}

export const asyncUpvote=(id)=>async (dispatch, getState)=>
{
    console.log("Upvoting post")
    try{
        const {data}=await api.upvote(id)
        dispatch(upvotePost(data))

    }
    catch(error)
    {
        console.log(error)
    }
    
}

export const asyncDownvote=(id)=>async (dispatch, getState)=>
{
    console.log("Downvoting post")
    try{
        const {data}=await api.downvote(id)
        dispatch(downvotePost(data))
    }
    catch(error)
    {
        console.log(error)
    }
}

export default postSlice.reducer