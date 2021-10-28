const redis=require('redis')
const client=redis.createClient({
    host: 'redis-19739.c264.ap-south-1-1.ec2.cloud.redislabs.com',
    port: '19739',
    password: 'v34tH1FsXSp1QfPMaLEI1UdlwsrVCsnS'
})

const isInCache=(request, reply, done)=>
{
    const id=request.params.id
    console.log('Checking in cache')
    client.get(id, (err, data)=>
    {
        if (err)
        {
            console.log('Not found in cache')
            done()
        }
        else
        {
            console.log(data)
            if (!data)
            {
                done()
            }
            else
            {
                console.log('Found data in cache')
                reply.send(data)
            }
            
        }
    })  
}

module.exports={isInCache}