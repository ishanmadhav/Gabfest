const {createPost, getAllPosts, getPostById, deletePostById, editPostById, getPostsByUserId, upvotePost, downvotePost} = require('../controllers/postController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { isInCache } = require('../middleware/isInCache')

const routes=[
    {
        method: 'POST',
        url: '/post',
        handler: createPost,
        preHandler: isAuthenticated
    },
    {
        method: 'GET',
        url: '/post/:id',
        handler: getPostById,
        preValidation: isAuthenticated,
        preHandler: isInCache
    },
    {
        method: 'DELETE',
        url: '/post/:id',
        handler: deletePostById,
        preHandler: isAuthenticated
    },
    {
        method: 'PUT',
        url: '/post/:id',
        handler: editPostById,
        preHandler: isAuthenticated
    },
    {
        method: 'GET',
        url: '/posts',
        handler: getAllPosts
    },
    {
        method: 'GET',
        url: '/posts/:id',
        handler: getPostsByUserId,
        preValidation: isAuthenticated,
        preHandler: isInCache
    },
    {
        method: 'POST',
        url: '/post/:id/upvote',
        preValidation: isAuthenticated,
        handler: upvotePost
    },
    {
        method: 'POST',
        url: '/post/:id/downvote',
        preValidation: isAuthenticated,
        handler: downvotePost
    }
]

module.exports=routes