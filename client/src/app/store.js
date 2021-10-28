import { configureStore } from "@reduxjs/toolkit";
import communitiesReducer from '../slices/forumSlice'
import communityReducer from '../slices/communitySlice'
import postReducer from '../slices/postSlice'

export const store=configureStore({
    reducer: {
        communities: communitiesReducer,
        community: communityReducer,
        post: postReducer
    }
})