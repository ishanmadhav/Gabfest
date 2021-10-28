const {createUser, getUser, deleteUser, editUser, getAllUsers, loginUser}=require('../controllers/userController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const {isInCache}=require('../middleware/isInCache')
const {justAnotherFunction}=require('../middleware/justAnotherFunction')

const routes=[
    {
        method: 'POST',
        url: '/user',
        handler: createUser
    },
    {
        method: 'GET',
        url: '/user/:id',
        handler: getUser
    },
    {
        method: 'DELETE',
        url: '/user/:id',
        handler: deleteUser,
        preHandler: isAuthenticated
    },
    {
        method: 'PUT',
        url: '/user/:id',
        handler: editUser,
        preHandler: isAuthenticated
    },
    {
        method: 'GET',
        url: '/users',
        handler: getAllUsers
    },
    {
        method: 'POST',
        url: '/user/login',
        handler: loginUser
    }
]

module.exports=routes