const Community = require('../models/communityModel')
const User=require('../models/userModel')
const {client}=require('../utility/redisClient')

const createCommunity=async (request, reply)=>
{
    console.log(request.body)
    const tempCommunity=new Community({
        name: request.body.name,
        description: request.body.description,
        createdBy: request.body.createdBy,
        posts: []
    })
    console.log('A community is being created')
    const savedCommunity=await tempCommunity.save()
    reply.send(savedCommunity)
}


const getCommunity=async (request, reply)=>
{
    const id=request.params.id
    const community=await Community.findById(id)
    console.log("Getting the community!")
    reply.send(community)
}

const addUserToCommunity=async (request, reply)=>
{   
    const id=request.params.id
    console.log("Trying to add user to community")
    console.log(request.body)
    try{
        const user=await User.findById(request.body.userId)
        await user.communities.addToSet(id)
        const updatedUser=await user.save()
        await updatedUser.populate('communities')
        const community=await Community.findById(id)
        community.members.addToSet(request.body.userId)
        await community.save()
        reply.send(community)
    }
    catch(error)
    {
        console.log(error)
        reply.send(error)
    }
    
}

const getCommunityPosts=async (request, reply)=>
{
    try{
        const id=request.params.id
        const community=await Community.findById(id).populate('posts')
        reply.send(community)
        console.log('Setting in Redis cache')
        client.setex(id, 300, JSON.stringify(community))
    }
    catch(error)
    {
        console.log(error)
        reply.send(error)
    }
    
}

const getCommunitiesByUserId=async (request, reply)=>
{
    const id=request.params.userId
    const user=await User.findById(id).populate('communities')
    console.log(user)
    reply.send(user.communities)
}

const getAllCommunities=async (request, reply)=>
{
    const communities=await Community.find()
    reply.send(communities)
}

module.exports={createCommunity, getCommunity, addUserToCommunity, getCommunityPosts, getCommunitiesByUserId, getAllCommunities}