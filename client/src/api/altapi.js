import axios from 'axios'
const URL="http://localhost:5000"

const jwtToken=localStorage.getItem('gabprofile')
var parsedToken
if (jwtToken!=null)
{
    parsedToken=JSON.parse(jwtToken).token
}

export const demo=(id)=>axios.post(`${URL}/postx`, {
    headers: {
        authorization: 'Bearer '+parsedToken
    }
    })