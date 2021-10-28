const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const createUser=async (request, reply)=>
{

    try{
        console.log(request.body)
        const avatarSVG=`https://avatars.dicebear.com/api/bottts/${request.body.name}.svg`
        const hashedPassword=await bcrypt.hash(request.body.password, 10)
        const tempUser=new User({
            name: request.body.name,
            email: request.body.email,
            communities: [],
            saved: [],
            avatar: avatarSVG,
            password: hashedPassword
        })
        const savedUser=await tempUser.save()
        const token=jwt.sign({id:savedUser._id}, process.env.SECRET_KEY)
        console.log(token)
        reply.send({result: savedUser, token: token})
    }
    catch(error)
    {
        console.log(error)
        reply.send
    }
    

}

const getUser=async (request, reply)=>
{
    const id=request.params.id
    console.log(id)
    const user=await User.findById(id)
    reply.send(user)
    
}

const deleteUser=async (request, reply)=>
{
    const id=request.params.id

    const deletedUser=await User.findByIdAndDelete(id)
    reply.send(deletedUser)
}

const editUser=async (request, reply)=>
{
    const id=request.params.id
    const user=await User.findById(id)   
    user.name=request.body.name
    user.email=request.body.email
    user.username=request.body.username
    const savedUser=await user.save()

    reply.send(savedUser)
}

const getAllUsers=async (request, reply)=>
{
    const users=await User.find()
    reply.send(users)
}

const loginUser=(request, reply)=>
{
    console.log(request.body)
    User.findOne({email: request.body.email}, (err, user)=>
    {
        if (err)
        {
            console.log(err)
            return reply.send(err)
        }
        else
        {
            console.log(user)
            bcrypt.compare(request.body.password, user.password, function(berr, result)
            {
                if (berr)
                {
                    console.log(berr)
                }
                else
                {
                    if (result)
                    {
                        const token=jwt.sign({id:user._id}, process.env.SECRET_KEY)
                        reply.send({result: user, token: token})
                    }
                }
            })
        }
    })
}

module.exports={createUser, getUser, deleteUser, editUser, getAllUsers, loginUser}