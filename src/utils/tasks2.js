const request = require('request')


const tasks = (user, callback) => {

   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdIaDlVNCIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE1Nzg1NTExNTgsImlhdCI6MTU3ODI5MTk1OCwic2NvcGUiOiJodWJzdGFmZjp3cml0ZSBodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiTTc5YTZwY0g1aC0xcTkxLXYxR1lTdkFDbGlBbGxvVjNvcEJva1Y2S2VHdUVTcFgwVE1kTVdXV0xjbmFxNlhxTzFVQ2FZZWxBT2paMVFyQ21GNll0NEE9PSJ9.n0XWvsjIthll0mHhEcNcOl57C3UVEgtwlbKx09StobSjkv7DYLAGZxr4UAcZcgfzeTaMGCmtaxDQkz0YA7ETR7EwNGTJsdp-QYmBkWTYbUZBMSvTeULdfBSnlAe1nYjc3wQJswJGYb7n8wlJ9r3cEmkESCCM56ZlP-vfazDPD0Rm221myDvavPW5L62FAT7gEPxCBukrqSqf5lho8-PclC0ctDaWaUDPsle5pnUgCAJERWzSZtooZCG2vlNRVsmAejWjoOONXWSQZV5nXJPCUFoDh1EEiuu2pjA0oOiQYSGt64EKru35N6MPEpiVBugcPdSIP-4Kd05YyE9eZ6zjFA'
    const apiUrl = 'https://api.hubstaff.com/v2/organizations/223965/members'
    return new Promise ((resolve,reject)=> {
    request({
        url: apiUrl,
        json: true
    }, (error, response) => {
        if (error) {
            reject({message: 'Unable to connect to API service'});
        } else if(response.statusCode == 401){
            const Myprojects=[]
            resolve({data:Myprojects})
        }
        
         else if(response.statusCode == 200) {
            const Myprojects = []
            response.body.members.forEach((project) => {
                Myprojects.push({
                    id:project.user_id,
                    currency: project.currency,
                    status:project.membership_status,
                    create_date:project.created_at,
                    
                    error:true
                })
            });
            
            resolve({data: Myprojects})
        }

    }).auth(null, null, true, token)
});
}


const projects =  (user, callback) => {

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
            resolve({data1:Myprojects})
        }

         else if(response.statusCode == 200) {
            const Myprojects = []
            response.body.projects.forEach((project) => {
                Myprojects.push({
                    id:project.id,
                    name: project.name,
                    status:project.status,
                    create_date:project.created_at,
                    
                    error:true
                })
            });
            
            resolve({data1: Myprojects})
        }


    }).auth(null, null, true, token)
});
}

const create_tasks =  (project,user, callback) => {
    
   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdIaDlVNCIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE1Nzg1NTExNTgsImlhdCI6MTU3ODI5MTk1OCwic2NvcGUiOiJodWJzdGFmZjp3cml0ZSBodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiTTc5YTZwY0g1aC0xcTkxLXYxR1lTdkFDbGlBbGxvVjNvcEJva1Y2S2VHdUVTcFgwVE1kTVdXV0xjbmFxNlhxTzFVQ2FZZWxBT2paMVFyQ21GNll0NEE9PSJ9.n0XWvsjIthll0mHhEcNcOl57C3UVEgtwlbKx09StobSjkv7DYLAGZxr4UAcZcgfzeTaMGCmtaxDQkz0YA7ETR7EwNGTJsdp-QYmBkWTYbUZBMSvTeULdfBSnlAe1nYjc3wQJswJGYb7n8wlJ9r3cEmkESCCM56ZlP-vfazDPD0Rm221myDvavPW5L62FAT7gEPxCBukrqSqf5lho8-PclC0ctDaWaUDPsle5pnUgCAJERWzSZtooZCG2vlNRVsmAejWjoOONXWSQZV5nXJPCUFoDh1EEiuu2pjA0oOiQYSGt64EKru35N6MPEpiVBugcPdSIP-4Kd05YyE9eZ6zjFA'
    const apiUrl = 'https://api.hubstaff.com/v2/projects/'+project+'/update_members'
    
    const formData ={
        members:[
            {
                user_id:user,
                role: "manager"
            }
        ],
        ignored:true
    }
    return new Promise ((resolve,reject)=> {
    request.put({url: apiUrl,json:formData},(error, response) => {
        if (error) {
            reject({message:'Unable to connect to weather service'})
        } else if(response.statusCode == 401){
            reject({message:'Authentication Needed'})
        }
        else if(response.statusCode == 400){
            reject({message:"Name Already Exists"})
        }
         else if(response.statusCode == 201 || response.statusCode == 200) {
            
            resolve({data5:{projectStatus: 'Data Posted'}})
            
        }


    }).auth(null, null, true, token);
});
}

/// Assign Task

const assign_task = (project, user_id,taskname,start_date,end_date,callback) => {
    
   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdIaDlVNCIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE1Nzg1NTExNTgsImlhdCI6MTU3ODI5MTk1OCwic2NvcGUiOiJodWJzdGFmZjp3cml0ZSBodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiTTc5YTZwY0g1aC0xcTkxLXYxR1lTdkFDbGlBbGxvVjNvcEJva1Y2S2VHdUVTcFgwVE1kTVdXV0xjbmFxNlhxTzFVQ2FZZWxBT2paMVFyQ21GNll0NEE9PSJ9.n0XWvsjIthll0mHhEcNcOl57C3UVEgtwlbKx09StobSjkv7DYLAGZxr4UAcZcgfzeTaMGCmtaxDQkz0YA7ETR7EwNGTJsdp-QYmBkWTYbUZBMSvTeULdfBSnlAe1nYjc3wQJswJGYb7n8wlJ9r3cEmkESCCM56ZlP-vfazDPD0Rm221myDvavPW5L62FAT7gEPxCBukrqSqf5lho8-PclC0ctDaWaUDPsle5pnUgCAJERWzSZtooZCG2vlNRVsmAejWjoOONXWSQZV5nXJPCUFoDh1EEiuu2pjA0oOiQYSGt64EKru35N6MPEpiVBugcPdSIP-4Kd05YyE9eZ6zjFA'
    const apiUrl = 'https://api.hubstaff.com/v2/projects/'+project+'/tasks'
    
    var formData ={
        summary: taskname,
        assignee_id:user_id,
        created_at:start_date,
    }
   // console.log(formData);
    return new Promise ((resolve,reject)=> {
    request.post({url: apiUrl,json:true ,formData:formData},(error, response) => {
        console.log(response.body)
        console.log(response.statusCode)
        if (error) {
            reject({message:'Unable to connect to weather service'})
        } else if(response.statusCode == 401){
            reject({message:'Authentication Needed'})
        }
        else if(response.statusCode == 400){
            reject({message:'Name Already Exists'})
        }
         else if(response.statusCode == 201 || response.statusCode == 200) {
            
            resolve({data:{taskStatus: 'Task Successfully Created!'}})
            
        }


    }).auth(null, null, true, token);
});
}


const getTasks = (user, callback) => {

   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdIaDlVNCIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE1Nzg1NTExNTgsImlhdCI6MTU3ODI5MTk1OCwic2NvcGUiOiJodWJzdGFmZjp3cml0ZSBodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiTTc5YTZwY0g1aC0xcTkxLXYxR1lTdkFDbGlBbGxvVjNvcEJva1Y2S2VHdUVTcFgwVE1kTVdXV0xjbmFxNlhxTzFVQ2FZZWxBT2paMVFyQ21GNll0NEE9PSJ9.n0XWvsjIthll0mHhEcNcOl57C3UVEgtwlbKx09StobSjkv7DYLAGZxr4UAcZcgfzeTaMGCmtaxDQkz0YA7ETR7EwNGTJsdp-QYmBkWTYbUZBMSvTeULdfBSnlAe1nYjc3wQJswJGYb7n8wlJ9r3cEmkESCCM56ZlP-vfazDPD0Rm221myDvavPW5L62FAT7gEPxCBukrqSqf5lho8-PclC0ctDaWaUDPsle5pnUgCAJERWzSZtooZCG2vlNRVsmAejWjoOONXWSQZV5nXJPCUFoDh1EEiuu2pjA0oOiQYSGt64EKru35N6MPEpiVBugcPdSIP-4Kd05YyE9eZ6zjFA'
    const apiUrl = 'https://api.hubstaff.com/v2/organizations/223965/tasks?status=active'
    return new Promise ((resolve,reject)=> {
    request({
        url: apiUrl,
        json: true
    }, (error, response) => {
        if (error) {
            reject({message:'Unable to connect to API service'})
        } else if(response.statusCode == 401){
            const Myprojects=[]
            resolve({data3:Myprojects})
        }

         else if(response.statusCode == 200) {
            const Myprojects = []
            console.log
            response.body.tasks.forEach((project) => {
                Myprojects.push({
                    id:project.id,
                    name: project.summary,
                    status:project.status,
                    project_id:project.project_id,
                    create_date:project.created_at,
                    lock_version:project.lock_version,
                    
                    error:true
                })
            });
            
            resolve({data3:Myprojects})
        }


    }).auth(null, null, true, token)
});
}


//Show Completed Tasks
const getCompletedTasks = (user, callback) => {

   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdIaDlVNCIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE1Nzg1NTExNTgsImlhdCI6MTU3ODI5MTk1OCwic2NvcGUiOiJodWJzdGFmZjp3cml0ZSBodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiTTc5YTZwY0g1aC0xcTkxLXYxR1lTdkFDbGlBbGxvVjNvcEJva1Y2S2VHdUVTcFgwVE1kTVdXV0xjbmFxNlhxTzFVQ2FZZWxBT2paMVFyQ21GNll0NEE9PSJ9.n0XWvsjIthll0mHhEcNcOl57C3UVEgtwlbKx09StobSjkv7DYLAGZxr4UAcZcgfzeTaMGCmtaxDQkz0YA7ETR7EwNGTJsdp-QYmBkWTYbUZBMSvTeULdfBSnlAe1nYjc3wQJswJGYb7n8wlJ9r3cEmkESCCM56ZlP-vfazDPD0Rm221myDvavPW5L62FAT7gEPxCBukrqSqf5lho8-PclC0ctDaWaUDPsle5pnUgCAJERWzSZtooZCG2vlNRVsmAejWjoOONXWSQZV5nXJPCUFoDh1EEiuu2pjA0oOiQYSGt64EKru35N6MPEpiVBugcPdSIP-4Kd05YyE9eZ6zjFA'
    const apiUrl = 'https://api.hubstaff.com/v2/organizations/223965/tasks?status=completed'
    return new Promise ((resolve,reject)=> {
    request({
        url: apiUrl,
        json: true
    }, (error, response) => {
        if (error) {
            reject({message:'Unable to connect to API service'})
        } else if(response.statusCode == 401){
            const Myprojects=[]
            resolve({data4:Myprojects})
        }

         else if(response.statusCode == 200) {
            const Myprojects = []
            console.log
            response.body.tasks.forEach((project) => {
                Myprojects.push({
                    id:project.id,
                    name: project.summary,
                    status:project.status,
                    project_id:project.project_id,
                    completed_at:project.completed_at,
                    lock_version:project.lock_version,
                    
                    error:true
                })
            });
            
            resolve({data4: Myprojects})
        }


    }).auth(null, null, true, token)
});
}




// Complete task
const complete_tasks = (task_id,lock_version,status,completed_at, callback) => {
    
   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdIaDlVNCIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE1Nzg1NTExNTgsImlhdCI6MTU3ODI5MTk1OCwic2NvcGUiOiJodWJzdGFmZjp3cml0ZSBodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiTTc5YTZwY0g1aC0xcTkxLXYxR1lTdkFDbGlBbGxvVjNvcEJva1Y2S2VHdUVTcFgwVE1kTVdXV0xjbmFxNlhxTzFVQ2FZZWxBT2paMVFyQ21GNll0NEE9PSJ9.n0XWvsjIthll0mHhEcNcOl57C3UVEgtwlbKx09StobSjkv7DYLAGZxr4UAcZcgfzeTaMGCmtaxDQkz0YA7ETR7EwNGTJsdp-QYmBkWTYbUZBMSvTeULdfBSnlAe1nYjc3wQJswJGYb7n8wlJ9r3cEmkESCCM56ZlP-vfazDPD0Rm221myDvavPW5L62FAT7gEPxCBukrqSqf5lho8-PclC0ctDaWaUDPsle5pnUgCAJERWzSZtooZCG2vlNRVsmAejWjoOONXWSQZV5nXJPCUFoDh1EEiuu2pjA0oOiQYSGt64EKru35N6MPEpiVBugcPdSIP-4Kd05YyE9eZ6zjFA'
    const apiUrl = 'https://api.hubstaff.com/v2/tasks/'+task_id
    
    var formData ={
        lock_version: lock_version,
        status:status,
        completed_at:completed_at,
    }

    request.put({url: apiUrl,json:formData},(error, response) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if(response.statusCode == 401){
            callback('Authentication Needed')
        }
        else if(response.statusCode == 400){
            callback("Name Already Exists")
        }
         else if(response.statusCode == 201 || response.statusCode == 200) {
            
            callback(undefined,{
                taskStatus: 'Task Completed!'
            })
            
        }


    }).auth(null, null, true, token);

}


module.exports = {projects:projects,
                  tasks:tasks,
                  create_tasks:create_tasks ,
                  assign_task:assign_task,
                  getTasks:getTasks,
                  complete_tasks:complete_tasks,
                  getCompletedTasks:getCompletedTasks           
                    }