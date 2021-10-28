const Thread=require('../models/threadModel')
const Post=require('../models/postModel')
const {client}=require('../utility/redisClient')

const createThread= async (request, reply)=>
{
    const tempThread=new Thread({
        body: request.body.body,
        poster: request.body.poster,
        replies: []
    })

    try{
        const savedThread=await tempThread.save()
        const parentThread=await Thread.findById(request.body.parentId)
        await parentThread.replies.addToSet(savedThread._id)
        await parentThread.save();
        await parentThread.populate('replies poster')
        await parentThread.populate('poster')
        reply.send(parentThread)
    }
    catch(err)
    {
        console.log(err)
        reply.send(err)

    }
}

const createThreadOnPost = async (request, reply)=>
{
    const tempThread=new Thread({
        body: request.body.body,
        poster: request.body.poster,
        replies: []
    })

    try{
        const savedThread=await tempThread.save()
        const parentThread=await Post.findById(request.body.parentId)
        await parentThread.replies.addToSet(savedThread._id)
        await parentThread.save();
        await parentThread.populate('replies')
        await savedThread.populate('poster')
        reply.send(savedThread)
        client.del(request.body.parentId)
    }
    catch(err)
    {
        console.log(err)
        reply.send(err)

    }
}

const getThreadById=async (request, reply)=>
{
    const id=request.params.id
    console.log("The route was hit")
    try{
        const thread=await Thread.findById(id).populate('replies').populate('poster')
        console.log(thread)
        reply.send(thread)
    }
    catch(err)
    {
        console.log(err)
        reply.send(err)
    }
}

const deleteThread=async (request, reply)=>
{
    const id=request.params.id
    try{
        const deletedThread=await Thread.findByIdAndDelete(id)
        reply.send(deletedThread)
    }
    catch(err)
    {
        console.log(err)
        reply.send(err)
    }
}


module.exports={createThread, createThreadOnPost, getThreadById, deleteThread}