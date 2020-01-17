const createProject = document.querySelector('#project-add')
const projectField = document.querySelector('#pr-search')
const msg = document.querySelector('#pr-msg');
const msg2 = document.querySelector('#msg-2');
msg.style.display = 'none';
msg2.style.display = 'none';
createProject.addEventListener('submit',(e)=>{
    e.preventDefault()
    const project= projectField.value
    msg.textContent= 'Loading ...'
    fetch('http://localhost:3000/created?search='+project).then((response)=>{

        response.json().then((data)=>{
            console.log(data.error)
            if(data.error){
                msg.style.display = 'block';
                msg.textContent=data.error
            }
            else{
                msg2.style.display = 'block';
                msg.style.display = 'none';
                msg2.textContent = data.projectStatus.projectStatus
            }
        })
      
    
})
    
})