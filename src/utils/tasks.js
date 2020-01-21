const request = require('request')
const app_token = require('./token')

const tasks = (user, callback) => {
    const token1 = app_token.load()
    const token = token1.access_token
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

    const token1 = app_token.load()
    const token = token1.access_token
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
    
    const token1 = app_token.load()
    const token = token1.access_token
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
    //return new Promise ((resolve,reject)=> {
    request.put({url: apiUrl,json:formData},(error, response) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if(response.statusCode == 401){
            callback('Authentication Needed')
        }
        else if(response.statusCode == 400){
            callback("Name Already Exists")
        }
         else if(response.statusCode == 200) {
            callback(undefined,{
                projectStatus: 'Task Successfully Created!'
            })
            //resolve({data5:{projectStatus: 'Data Posted'}})
            
        }


    }).auth(null, null, true, token);
//});
}

/// Assign Task

const assign_task = (user_id,project,taskname,start_date,callback) => {
    
    const token1 = app_token.load()
    const token = token1.access_token   
    const apiUrl = 'https://api.hubstaff.com/v2/projects/'+project+'/tasks'
    
    var formData ={
        summary: taskname,
        assignee_id:user_id,
        created_at:start_date,
    }
    //return new Promise ((resolve,reject)=> {
    request.post({url: apiUrl,json:formData},(error, response) => {
        
        if (error) {
            callback('Unable to connect to weather service')
        } else if(response.statusCode == 401){
            callback('Authentication Needed')
        }
        else if(response.statusCode == 400){
            callback('Name Already Exists')
        }
         else if(response.statusCode == 201 || response.statusCode == 200) {
            callback(undefined,{
                taskStatus: 'Task Successfully Assigned!'
            })
           // resolve({data:{taskStatus: 'Task Successfully Created!'}})
            
        }


    }).auth(null, null, true, token);
//});
}


const getTasks = (user, callback) => {

    const token1 = app_token.load()
    const token = token1.access_token
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

    const token1 = app_token.load()
    const token = token1.access_token
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
    
    const token1 = app_token.load()
    const token = token1.access_token   
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


const getActivites = (timeStart,timeStop,ProjectID, callback) => {
    const token1 = app_token.load()
    const token = token1.access_token    
     //const apiUrl = 'https://api.hubstaff.com/v2/organizations/223965/activities?time_slot[start]='+timeStart+'&time_slot[stop]='+timeStop+'&project_ids='+ProjectID;
     const apiUrl = 'https://api.hubstaff.com/v2/organizations/223965/activities?time_slot[start]='+timeStart+'&time_slot[stop]='+timeStop+'&project_ids='+ProjectID
     return new Promise ((resolve,reject)=> {
     request({
         url: apiUrl,
         json: true
     }, (error, response) => {
         if (error) {
             
             reject({message:'Unable to connect to API service'})
         } else if(response.statusCode == 401){
             const Myprojects=[]
             resolve({data5:Myprojects})
         }

          else if(response.statusCode == 200) {
             const Myprojects = []
             response.body.activities.forEach((project) => {
                 Myprojects.push({
                     id:project.id,
                     task_id:project.task_id,
                     name: project.user_id,
                     tracked:project.tracked,
                     starts_at:project.starts_at,
                     error:true
                 })
             });
             
             resolve({data5:Myprojects})
         }
 
 
     }).auth(null, null, true, token)
 });
 }





module.exports = {projects:projects,
                  tasks:tasks,
                  create_tasks:create_tasks ,
                  assign_task:assign_task,
                  getTasks:getTasks,
                  complete_tasks:complete_tasks,
                  getCompletedTasks:getCompletedTasks,
                  getActivites:getActivites           
                    }