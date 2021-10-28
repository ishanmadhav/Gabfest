const Post=require('../models/postModel')
const Community=require('../models/communityModel')
const {client}=require('../utility/redisClient')


const createPost=async (request, reply)=>
{
    const tempPost=new Post({
        title: request.body.title,
        body: request.body.body,
        poster: request.body.poster,
        replies: []
    })
        console.log(request.body)
        const savedPost=await tempPost.save()
        const community=await Community.findById(request.body.parentId)
        await community.posts.addToSet(savedPost._id)
        await community.save()
        await community.populate('posts')
        console.log(community)
        reply.send(savedPost)
        client.del(request.body.poster)
        client.del(request.body.parentId)
    
    
}

const getPostById=async (request, reply)=>
{
    const id=request.params.id
    try{
        const post=await Post.findById(id).populate({path: 'replies', populate: {path: 'replies'}}).populate({path: 'replies', populate: {path: 'poster'}})
        console.log(post)
        reply.send(post)
        console.log('Setting in Redis cache')
        client.setex(id, 300, JSON.stringify(post))
        
    }
    catch(err)
    {
        console.log(err)
        reply.send(err)
    }
    
}

const deletePostById=async (request, reply)=>
{
    const id=request.params.id
    try{
        const deletedPost=await Post.findByIdAndDelete(id)
        reply.send(deletedPost)
    }
    catch(err)
    {
        console.log(err)
        reply.send(err)
    }

}

const getAllPosts=async (request, reply)=>
{
    try{
        const posts=await Post.find()
        reply.send(posts)
    }
    catch(err)
    {
        console.log(err)
        reply.send(err)
    }
    
}

const editPostById=async (request, reply)=>
{
    const id=request.params.id
    try{
        const post=await Post.findById(id)
        reply.send(post)
    }
    catch(err)
    {
        console.log(err)
        reply.send(err)
    }

}

const upvotePost=async (request, reply)=>
{
    const id=request.params.id
    try{
        console.log("Upvoting")
        console.log(id)
        console.log(request.headers)
        const post=await Post.findById(id)
        post.upvotes=post.upvotes+1
        await post.save()
        reply.send(post)
    }
    catch(error)
    {
        console.log(error)
        reply.send(error)
    }
}

const downvotePost=async (request, reply)=>
{
    const id=request.params.id
    try{
        console.log(id)
        console.log("Downvoting")
        const post=await Post.findById(id)
        post.downvotes=post.downvotes+1
        await post.save()
        reply.send(post)
    }
    catch(error)
    {
        console.log(error)
        reply.send(error)
    }
}



const getPostsByUserId=async (request, reply)=>
{
    const id=request.params.id
    try
    {
        console.log(id)
        const posts=await Post.find({poster: id})
        reply.send(posts)
        console.log(posts)
        console.log('Setting in Redis cache')
        client.setex(id, 300, JSON.stringify(posts))
        
    }
    catch(error)
    {
        console.log(error)

    }
}

module.exports={createPost, getAllPosts, getPostById, editPostById, deletePostById, getPostsByUserId, upvotePost, downvotePost}