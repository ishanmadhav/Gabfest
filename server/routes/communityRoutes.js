const {createCommunity, getCommunity, addUserToCommunity, getCommunityPosts, getCommunitiesByUserId, getAllCommunities} = require('../controllers/communityController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { isInCache } = require('../middleware/isInCache')

const routes=[
    {
        method: 'POST',
        url: '/community',
        handler: createCommunity,
        preHandler: isAuthenticated
    },
    {
        method: 'GET',
        url: '/community/:id',
        handler: getCommunity,
        preHandler: isAuthenticated
    },
    {
        method: 'POST',
        url: '/community/:id/add_user',
        handler: addUserToCommunity,
        preHandler: isAuthenticated
    },
    {
        method: 'GET',
        url: '/community/:id/posts',
        handler: getCommunityPosts,
        preValidation: isAuthenticated,
        preHandler: isInCache
    },
    {
        method: 'GET',
        url: '/user/:userId/communities',
        handler: getCommunitiesByUserId,
        preHandler: isAuthenticated
    },
    {
        method: 'GET',
        url: '/communities',
        preHandler: isAuthenticated,
        handler: getAllCommunities
    }

]

module.exports=routes