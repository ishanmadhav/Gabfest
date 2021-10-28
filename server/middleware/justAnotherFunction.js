const justAnotherFunction=(request, reply, done)=>
{
    console.log('The second middleware function in order')
    done()

}


module.exports={justAnotherFunction}