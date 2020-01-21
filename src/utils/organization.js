const request = require('request')
const app_token = require('./token')

const organizations = (user, callback) => {

    const token1 = app_token.load()
    const token = token1.access_token
    const apiUrl = 'https://api.hubstaff.com/v2/organizations'

    request({
        url: apiUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if(response.statusCode == 401){
            const Myprojects=[]
            callback(undefined,Myprojects)
        }

         else if(response.statusCode == 200) {
            const Myprojects = []
            response.body.organizations.forEach((project) => {
                Myprojects.push({
                    id:project.id,
                    name: project.name,
                    status:project.status,
                    create_date:project.created_at,
                    
                    error:true
                })
            });
            
            callback(undefined, Myprojects)
        }


    }).auth(null, null, true, token)

}

module.exports = organizations
