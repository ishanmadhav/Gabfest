const mongoose=require('mongoose')
const Schema=mongoose.Schema
const faker=require('faker')

const getNewUserName = () => {
    return faker.internet.userName()
}


const userSchema=new Schema({
    name: String,
    email: String,
    isAdmin: {
        type: Boolean,
        default: true
    },
    username: {
        type: String,
        default: ()=>getNewUserName()
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://avatars.dicebear.com/api/bottts/Someting.svg"
    },
    communities: [{type: Schema.Types.ObjectId, ref: 'Community'}],
    saved: [{type: Schema.Types.ObjectId, ref: 'Post'}]
})

const User=mongoose.model('User', userSchema)
module.exports=User