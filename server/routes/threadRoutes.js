const {createThread, createThreadOnPost, getThreadById, deleteThread}=require('../controllers/threadController')
const { isAuthenticated } = require('../middleware/isAuthenticated')

const routes=[
    {
        method: 'POST',
        url: '/thread',
        handler: createThread,
        preHandler: isAuthenticated
    },
    {
        method: 'POST',
        url: '/post_thread',
        handler: createThreadOnPost,
        preHandler: isAuthenticated
    },
    {
        method: 'GET',
        url: '/thread/:id',
        handler: getThreadById,
        preHandler: isAuthenticated
    },
    {
        method: 'DELETE',
        url: '/thread/:id',
        handler: deleteThread,
        preHandler: isAuthenticated
    }
    
]

module.exports=routes