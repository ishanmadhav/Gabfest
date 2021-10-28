const mongoose=require('mongoose')
const Schema=mongoose.Schema

const postSchema=new Schema({
    title: {
        type: String,
        required: true
    },
    body: String,
    createdOn: {
        type: Date,
        default: ()=>Date.now()
    },
    poster: {type: Schema.Types.ObjectId, ref: 'User'},
    upvotes: {
        type: Number,
        default: 0
    }, 
    downvotes: {
        type: Number,
        default: 0
    },
    replies: [{type: Schema.Types.ObjectId, ref: 'Thread'}]
})

const Post=mongoose.model('Post', postSchema)

module.exports=Post