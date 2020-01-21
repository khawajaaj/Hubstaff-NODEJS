const request = require('request')
const app_token=require('./token')

const user = (user, callback) => {

    const token1 = app_token.load()
    const token = token1.access_token    
    const apiUrl = 'https://api.hubstaff.com/v2/users/me'

    request({url: apiUrl,json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if(response.statusCode == 401){
            const Myprojects=[]
            callback(undefined,Myprojects)
        }

         else if(response.statusCode == 200) {
            const Myprojects = []
            const resPath = response.body.user
                Myprojects.push({
                    id:resPath.id,
                    name: resPath.name,
                    email:resPath.email,
                    status:resPath.status,
                    
                    error:true
                })
            
            
            callback(undefined, Myprojects)
        }


    }).auth(null, null, true, token)

}

module.exports = user
