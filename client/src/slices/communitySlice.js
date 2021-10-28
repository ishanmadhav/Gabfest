import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api/api';

const initialState={
    posts: [],
    name: "",
    description: "",
    members: []
}

export const communitySlice=createSlice({name: 'community',
    initialState, 
    reducers: {
        setPosts: (state, action)=>
        {
            state.posts=action.payload
        },
        addPost: (state, action)=>
        {
            state.posts.push(action.payload)
        },
        clearPosts: (state, action)=>
        {
            state.posts.splice(0, state.posts.length)
        },
        setName: (state, action)=>
        {
            state.name=action.payload
        },
        setDescription: (state, action)=>
        {
            state.description=action.payload
        },
        setMembers: (state, action)=>
        {
            state.members=action.payload
        }
    }
})

export const {setPosts, addPost, clearPosts, setName, setDescription, setMembers}=communitySlice.actions

//Selectors
export const selectAllPosts=(state)=>state.community.posts

export const selectName=(state)=>state.community.name

export const selectDescription=(state)=>state.community.description

export const selectMembers=(state)=>state.community.members



//Thunks
export const loadPosts=(communityId, setLoading)=>async (dispatch, getState)=>
{
    const {data}=await api.getCommunityPosts(communityId)
    dispatch(setPosts(data.posts))
    dispatch(setName(data.name))
    dispatch(setDescription(data.description))
    dispatch(setMembers(data.members))
    setLoading(false)
}

export const createPost=(postData, router)=>async (dispatch, getState)=>
{
    try{
        const {data}=await api.createPost(postData)
        console.log(data)
        dispatch(addPost(data))
        router.push('/community/'+postData.parentId)
    }
    catch(error)
    {
        console.log(error)
    }
    

}


export default communitySlice.reducer