const tForm = document.querySelector('#fmtask')
const search = document.querySelector('#pr-name')
const name = document.querySelector('#us-name')
const taskName = document.querySelector('#tk-name')
const taskstart = document.querySelector('#tk-strt')
const msg = document.querySelector('#tmsg-1');
const msg2 = document.querySelector('#tmsg-2');
const task_action = document.querySelector('.task-action')

const task_id = task_action.getAttribute('data-id')
const lock_version = task_action.getAttribute('data-lock')
const task_activity = document.querySelector('.task-activity')



var host = window.location.hostname
var port = window.location.port
const current_time = getDateTime()
const prevDay = prevgetDateTime()
msg.style.display = 'none';
msg2.style.display = 'none';
tForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const project = search.value
    const user = name.value
    const taskname = taskName.value
    
    const taskStart = taskstart.value
    msg.textContent = 'Loading ...'
    fetch('http://'+host+':'+port+'/task-created?project_id=' + project + '&user_name=' + user).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                msg.textContent = data.error
            } else {
                // msg.style.display = 'none';
                // msg2.style.display = 'block';
                // msg2.textContent= "Data Posted"
            }
        })
    }).then((response) => {
        return fetch('http://'+host+':'+port+'/task-created?project_id=' + project + '&user_name=' + user + '&taskname=' + taskname + '&taskStart=' + taskStart).then((response) => {
            response.json().then((data) => {
                if (data.error) {

                    msg.textContent = data.error
                } else {
                    msg.style.display = 'none';
                    msg2.style.display = 'block';
                    msg2.textContent = "Task Successfully Created !"
                }
            })
        })
    })

})
task_action.addEventListener('click', (e) => {
    fetch('http://'+host+':'+port+'/task-completed?task_id=' + task_id + '&lock_version=' + lock_version + '&status=completed&completed_at=' + current_time).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                msg.textContent = data.error
            } else {

                task_action.outerHTML = "<p>Completed</p>"
                // msg.style.display = 'none';
                // msg2.style.display = 'block';
                // msg2.textContent= "Data Posted"
            }
        })
    })

})




$( ".task-activity" ).click(function() {
    var project_id = $(this).attr('data-projectId');
    var task_id = $(this).attr('data-taskId');
    var task_name = $(this).attr('data-taskname');
    var elems = [].filter.call( document.getElementById("pr-name"), function( input ) {
        return input.value === project_id;
    });
    var proj_name= elems[0].textContent
    var prevDay= prevgetDateTime()
    console.log(prevDay)
    fetch('http://'+host+':'+port+'/task-activities?timeStart=2020-01-09T08%3A35%3A16Z&timeStop=2020-01-14T08%3A35%3A16Z' + '&project_id=' + project_id).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                msg.textContent = data.error
            } else {        
                var time_total =0;
                if(data.activities.data5.length==0){
                    $("#NamesGridView").html(
                        "<div><b>Task name:</b> "+task_name+"<br><b>Project Name: </b>" + proj_name+"<br>ID<br>Tracked<br>Starts at<br>" + " <br> No Activity Yet </div>");
                        
                }

                for (var i = 0; i < data.activities.data5.length; i++) {

                    if(task_id == data.activities.data5[i].task_id ){
                        if(i==0){
                            time_total = time_total+ parseInt(data.activities.data5[i].tracked)
                        $("#NamesGridView").html(
                            "<div><b>Task name:</b> "+task_name+"<br><b>Project Name: </b>" + proj_name+"<br><b>Activity ID: </b>" + data.activities.data5[i].id + 
                                                "<br><b>Total Seconds Tracked: </b>" + data.activities.data5[i].tracked + "<br><b>Starts at: </b>" + data.activities.data5[i].starts_at +"<br><b>Task ID: </b>" + data.activities.data5[i].task_id+"</div>");
                        }
                        else{
                            time_total = time_total+ parseInt(data.activities.data5[i].tracked)
                            $("#NamesGridView").append(
                                "<div><b>Project Name:</b> " + proj_name+ "<b><br>Activity ID: </b>" + data.activities.data5[i].id + 
                                                    "<br><b>Total Seconds Tracked: </b>" + data.activities.data5[i].tracked + "<br><b>Starts at: </b>" + data.activities.data5[i].starts_at + "<br><b>Task ID: </b>" + data.activities.data5[i].task_id+ "</div>");
                            }
                             
                            
                    }
                    
                }
                $("#NamesGridView").append(
                    "<div><b>Total Time Tracked: <b>"+time_total+ "</div>");
               
                
            }
        })
    })

  });



function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';
    return dateTime;
}

function prevgetDateTime() {
    var d = new Date();
    var now = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 17);
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';
    return dateTime;
}


function replacetime(tracked,start){
    var sec= 0
    var newstart = start.slice(11,19);
    while(t>0){
    
    
    if(t==0){
        return newstart
    }
    if(t>60 && t<120){
        sec = newstart.slice(17,19);
        var final_sec= parseInt(sec)+t;
        newstart = newstart.slice(11,17);
        newstart = newstart + final_sec
    }
    if(t>120 && t<3600){
        var min = parseInt(t)/60
        sec = newstart.slice(17,19);
        var final_min= newstart.slice(14,16);
        final_min = parseInt(final_min)+min + sec
        newstart =newstart.slice(11,14);
        newstart = newstart + final_min;
    }

    }


}