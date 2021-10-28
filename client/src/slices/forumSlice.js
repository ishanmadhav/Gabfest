import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createNewCommunity, getJoinedCommunities, joinCommunity } from '../api/api';

const initialState={
    list: []
}

export const communitySlice=createSlice({name: 'communities',
    initialState, 
    reducers: {
        setCommunities: (state, action)=>
        {
            state.list=action.payload
        },
        addCommunity: (state, action)=>
        {
            state.list.push(action.payload)
        },
        clearCommunities: (state, action)=>
        {
            state.list.splice(0, state.list.length)
        }
    }
})

export const {setCommunities, addCommunity, clearCommunities}=communitySlice.actions

//Selectors
export const selectAllCommunities=(state)=>state.communities.list

export const selectCommunity=(state, id)=>state.communities.list.find(id)

//Thunks
export const loadCommunities=(userId)=>async (dispatch, getState)=>
{
    const {data}=await getJoinedCommunities(userId)
    console.log("Loading communities")
    console.log(data)
    dispatch(setCommunities(data))

}

export const createCommunity=(communityData)=>async(dispatch)=> //history can be passed alongwith communityData in order to be able to redirect
{
    console.log("The thunk has been reached")
    const {data}=await createNewCommunity(communityData)
    dispatch(addCommunity(data))
}

export const addUserToCommunity=(id, userId, router)=>async(dispatch)=>
{
    console.log("User adding process started")
    const {data}=await joinCommunity({id, userId})
    dispatch(addCommunity(data))
    router.push('/communities/joined')

}


export default communitySlice.reducer