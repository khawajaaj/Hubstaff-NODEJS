const request = require('request')
const app_token=require('./token')


const projects =  (user, callback) => {
    
    const token1 = app_token.load()
    const token = token1.access_token
    const apiUrl = 'https://api.hubstaff.com/v2/organizations/223965/projects?status=active'

    return new Promise ((resolve,reject)=> {
        request({
            url: apiUrl,
            json: true,
            'auth': {
                'bearer': token
              }}, (error, response) => {
            if (error) {
                reject({message: 'Unable to connect to API service'});
            } else if(response.statusCode == 401){
                const Myprojects=[]
                resolve({data: Myprojects});
            }else if(response.statusCode == 200) {
                const Myprojects = []
                response.body.projects.forEach((project) => {
                    Myprojects.push({
                        id:project.id,
                        name: project.name,
                        status:project.status,
                        create_date:project.created_at,
                        error:true
                    });
                });
                resolve({data:Myprojects});
            }
        }).auth(null, null, true, token)
    
    });
     
}


/// Project Creation

const create_projects = (addProject, callback) => {
    
    const token1 = app_token.load()
    const token = token1.access_token
    const apiUrl = 'https://api.hubstaff.com/v2/organizations/223965/projects'
    
    var formData ={
        name: addProject
    }
    request.post({url: apiUrl,json:true ,formData:formData},(error, response) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if(response.statusCode == 401){
            callback('Authentication Needed')
        }
        else if(response.statusCode == 400){
            callback("Name Already Exists")
        }
         else if(response.statusCode == 201) {
            
            callback(undefined,{
                projectStatus: 'Project Successfully Created!'
            })
            
        }


    }).auth(null, null, true, token);

}


module.exports = {projects:projects,
                  create_projects:create_projects             
                    }