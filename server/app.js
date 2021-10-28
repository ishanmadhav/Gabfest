require('dotenv').config()
const app = require('fastify')({logger: false})
const mongoose=require('mongoose');
const cors=require('cors')


const PORT=5000||process.env.PORT
//const CONNECTION_URL='mongodb://localhost/gabfestbeta2'
const CONNECTION_URL='mongodb+srv://mongodbuser9:gfNugto3grTnwMPn@gabfestcluster.2l1vp.mongodb.net/gabDB?retryWrites=true&w=majority'


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})




const userRoutes = require('./routes/userRoutes');
const communityRoutes=require('./routes/communityRoutes')
const threadRoutes=require('./routes/threadRoutes')
const postRoutes=require('./routes/postRoutes')



userRoutes.forEach((route)=>{
    app.route(route)
})

communityRoutes.forEach((route)=>{
    app.route(route)
})

threadRoutes.forEach((route)=>{
    app.route(route)
})

postRoutes.forEach((route)=>{
    app.route(route)
})


const start=async () =>
{
    try {
        await app.register(require('middie'))
        app.use(cors())
        await app.listen(PORT)
    }
    catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
