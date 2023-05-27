const socket = io()//calling io means connecting io 
let namee ;

let textarea = document.querySelector('#textarea')
let nametext = document.querySelector('#nametext')
let messagearea = document.querySelector('.message_area')
let name1 = document.querySelector('.name')

// do{
    
// }while(!namee)
nametext.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
    namee= e.target.value
    name1.style.zIndex="-9999";
    }
})
namee = nametext.value
textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        seandMessage(e.target.value)
    }
})

function seandMessage(message){
    let msg ={
        user:namee,
        message:message.trim()
    }
    //Append
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scrollTobottom()    

    //send to server
    socket.emit('message',msg)//yhis will send message to server
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messagearea.appendChild(mainDiv)
}
//io to establish connection 
//socket.on to listen to the event

//recive message 

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollTobottom()
})

function scrollTobottom(){
    messagearea.scrollTop=messagearea.scrollHeight
}