const express = require("express")
const app = express();
const http = require("http").createServer(app)


const port = process.env.PORT || 3000


http.listen(port,()=>{
    console.log(`it is running on ${port}`)
})

app.use(express.static(__dirname+'/public'))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

//socket

const io = require('socket.io')(http)//passing our server to socket.io 

io.on('connection',(socket)=>{
    console.log("Connected....")
    //here message is the event
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})