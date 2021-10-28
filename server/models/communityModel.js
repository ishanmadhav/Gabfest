const mongoose=require('mongoose')
const Schema=mongoose.Schema

const communitySchema=new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    createdOn: {
        type: Date,
        default: ()=>Date.now()
    },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]

})


const Community=mongoose.model('Community', communitySchema)

module.exports=Community