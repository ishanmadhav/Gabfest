const mongoose=require('mongoose')
const Schema=mongoose.Schema

const threadSchema=new Schema({
    body: {
        type: String,
        required: true
    },
    poster: {type: Schema.Types.ObjectId, ref: 'User'},
    replies: [{type: Schema.Types.ObjectId, ref: 'Thread'}],
    upvotes: {
        type: Number,
        default: 0
    }, 
    downvotes: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: ()=>Date.now()
    }
})

const Thread=mongoose.model('Thread', threadSchema)
module.exports=Thread