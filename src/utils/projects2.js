const request = require('request')


const projects = (user, callback) => {
    
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdIaDlVNCIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE1Nzg1NTExNTgsImlhdCI6MTU3ODI5MTk1OCwic2NvcGUiOiJodWJzdGFmZjp3cml0ZSBodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiTTc5YTZwY0g1aC0xcTkxLXYxR1lTdkFDbGlBbGxvVjNvcEJva1Y2S2VHdUVTcFgwVE1kTVdXV0xjbmFxNlhxTzFVQ2FZZWxBT2paMVFyQ21GNll0NEE9PSJ9.n0XWvsjIthll0mHhEcNcOl57C3UVEgtwlbKx09StobSjkv7DYLAGZxr4UAcZcgfzeTaMGCmtaxDQkz0YA7ETR7EwNGTJsdp-QYmBkWTYbUZBMSvTeULdfBSnlAe1nYjc3wQJswJGYb7n8wlJ9r3cEmkESCCM56ZlP-vfazDPD0Rm221myDvavPW5L62FAT7gEPxCBukrqSqf5lho8-PclC0ctDaWaUDPsle5pnUgCAJERWzSZtooZCG2vlNRVsmAejWjoOONXWSQZV5nXJPCUFoDh1EEiuu2pjA0oOiQYSGt64EKru35N6MPEpiVBugcPdSIP-4Kd05YyE9eZ6zjFA'
    const apiUrl = 'https://api.hubstaff.com/v2/organizations/223965/projects?status=active'

    return new Promise ((resolve,reject)=> {
        request({
            url: apiUrl,
            json: true
        }, (error, response) => {
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
    
    })
     
}


/// Project Creation

const create_projects = (addProject, callback) => {
    
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdIaDlVNCIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE1Nzg1NTExNTgsImlhdCI6MTU3ODI5MTk1OCwic2NvcGUiOiJodWJzdGFmZjp3cml0ZSBodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiTTc5YTZwY0g1aC0xcTkxLXYxR1lTdkFDbGlBbGxvVjNvcEJva1Y2S2VHdUVTcFgwVE1kTVdXV0xjbmFxNlhxTzFVQ2FZZWxBT2paMVFyQ21GNll0NEE9PSJ9.n0XWvsjIthll0mHhEcNcOl57C3UVEgtwlbKx09StobSjkv7DYLAGZxr4UAcZcgfzeTaMGCmtaxDQkz0YA7ETR7EwNGTJsdp-QYmBkWTYbUZBMSvTeULdfBSnlAe1nYjc3wQJswJGYb7n8wlJ9r3cEmkESCCM56ZlP-vfazDPD0Rm221myDvavPW5L62FAT7gEPxCBukrqSqf5lho8-PclC0ctDaWaUDPsle5pnUgCAJERWzSZtooZCG2vlNRVsmAejWjoOONXWSQZV5nXJPCUFoDh1EEiuu2pjA0oOiQYSGt64EKru35N6MPEpiVBugcPdSIP-4Kd05YyE9eZ6zjFA'
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
                projectStatus: 'Data Posted'
            })
            
        }


    }).auth(null, null, true, token);

}


module.exports = {projects:projects,
                  create_projects:create_projects             
                    }