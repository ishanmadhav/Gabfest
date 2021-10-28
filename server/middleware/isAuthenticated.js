const jwt=require('jsonwebtoken')
const User=require('../models/userModel')


const isAuthenticated=(request, reply, done)=>
{

    try{
        let token;
        console.log(request.headers)
        //console.log(request.paramas.id)
        console.log(`inside the middleware....${request.headers.authorization}`)
        if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
        token = request.headers.authorization.split(' ')[1];
        console.log(`still inside the middleware.... ${token}')`)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        done()
        }
        else
        {
            reply.code(500).send({message: 'Unauthenticated User'})
        }
        
    }
    catch(error)
    {
        console.log(error)
        reply.send(error)
    }
   
}

module.exports={isAuthenticated}