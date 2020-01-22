const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const projects = require('./utils/projects')
const user = require('./utils/user')
const organizations = require('./utils/organization')
const tasks= require('./utils/tasks')
var schedule = require('node-schedule');
const token = require('./utils/token')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory
app.use(express.static(publicDirectoryPath))

const users='user'

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 12;
rule.minute = 0;
var j = schedule.scheduleJob(rule, function(){
    token.refresh_token(users).then(data =>{

                console.log("token refreshed")

             }).catch(error =>{
                 console.log("error")
             })

});
//
app.get('/', (req, res) => {
    projects.projects(users).then(result => {
       
        res.render('index', result);
    }).catch(error => {
        
        return res.send({ error });
    });
});


app.get('/task', (req, res) => {
    tasks.tasks(users).then(data => {
        projects.projects(users).then(data1 => {
            tasks.getTasks(users).then(data3 => {
                tasks.getCompletedTasks(users).then(data4 => {
                   const customData= {"data":data, "data1":data1,"data3":data3,"data4":data4};
                 res.render('task',{data:customData})
                }).catch(error => {
                    return res.send({ error });
                });
                
            }).catch(error => {
                return res.send({ error });
            });
            
            
            }).catch(error => {
                return res.send({ error });
            });

        
        }).catch(error => {
            return res.send({ error });
        });


 })

 app.get('/task-created', (req, res) => {
    if(!req.query.project_id){
        return res.send({
            error:'Select Project'
        })
    }
    // if(!req.query.name){
    //     return res.send({
    //         error:'enter name'
    //     })
    // }
     tasks.create_tasks(req.query.project_id,req.query.user_name, (error, data) => {
        
        if (error) {
            return res.send({
                error
            })
        }
    })

    tasks.assign_task(req.query.user_name,req.query.project_id,req.query.taskname,req.query.taskStart,(error,data)=>{
        if (error) {
              return res.send({
                  error
              })
          }
          res.send({taskStatus:data})
    
    })
   })

 app.get('/task-completed', (req, res) => {
    tasks.complete_tasks(req.query.task_id,req.query.lock_version,req.query.status,req.query.completed_at,(error,data)=>{
        if (error) {
              return res.send({
                  error
              })
          }
          res.send({taskStatus:data})
    
    })
 })

 app.get('/task-activities', (req, res) => {
    tasks.getActivites(req.query.timeStart,req.query.timeStop,req.query.project_id).then(data => {
       
        res.send({activities:data})

    }).catch(error=>{
        return res.send({error})
    })
 })



app.get('/organization', (req, res) => {
    organizations(users, (error, data) => {
     if (error) {
         return res.send({
             error
         })
     }
     //res.send(data.location)
     res.render('organizations',{data:data})
     })
 })

app.get('/profile',(req,res)=>{

    user(users, (error,data)=>{
        if(error){
        return res.send({
            error
        })
        }

        res.render('profile',{
            id:data[0].id,
            name:data[0].name,
            email:data[0].email,
            status:data[0].status
        })
    })


})


app.get('/created', (req, res) => {

    if(!req.query.search){
        return res.send({
            error:'enter address'
        })
    }

    projects.create_projects(req.query.search, (error, data) => {
        
        if (error) {
            return res.send({
                error
            })
        }
        res.send({projectStatus:data})
    })


})



app.get('/create-project', (req, res) => {

    res.render('create',{
        page:'create'
    })


})

// app.get('/help', (req, res) => {
//     res.render('help', {
//         message: 'This is a message to help you',
//         title: 'Help',
//         name: "Khawaja Awais"
//     })
// })
app.get('/help', (req, res) => {

    projects(user, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }
        //res.send(data.location)
        res.render('help',{data:data})
        })



    })



app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'this is error'
        })
    }
    res.send({
        product: 'one prod'
    })
})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404 error',
        name: "Khawaja Awais",
        page: 'Help Not found'
    })
})

app.get('*', (req, res) => {

    res.render('404', {
        title: '404 error',
        name: "Khawaja Awais",
        page: 'Page Not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})