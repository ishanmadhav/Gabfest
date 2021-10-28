import axios from 'axios'
const URL="http://localhost:5000"

const jwtToken=localStorage.getItem('gabprofile')
var parsedToken
if (jwtToken!=null)
{
    parsedToken=JSON.parse(jwtToken).token
}

export const createUser=(data)=>axios.post(`${URL}/user`, data)

export const loginUser=(data)=>axios.post(`${URL}/user/login`, data)

export const getCommunityPosts=(id)=>axios.get(`${URL}/community/${id}/posts`, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const createNewCommunity=(data)=>axios.post(`${URL}/community`, data, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const getJoinedCommunities=(id)=>axios.get(`${URL}/user/${id}/communities`, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const getAllCommunities=()=>axios.get(`${URL}/communities`, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const joinCommunity=({id, userId})=>axios.post(`${URL}/community/${id}/add_user`, {
    userId: userId
}, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const createPost=(data)=>axios.post(`${URL}/post`, data, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const getPost=(id)=>axios.get(`${URL}/post/${id}`, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const postReply=(data)=>axios.post(`${URL}/post_thread`, data, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const postThread=(data)=>axios.post(`${URL}/thread`, data, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const getThreadById=(id)=>axios.get(`${URL}/thread/${id}`, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const getPostsByUserId=(id)=>axios.get(`${URL}/posts/${id}`, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const upvote=(id)=>axios.post(`${URL}/post/${id}/upvote`, {data:null }, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})

export const downvote=(id)=>axios.post(`${URL}/post/${id}/downvote`, {data: null}, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
})