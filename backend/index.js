//require('dotenv').config();
const express = require("express")
const cors = require("cors")
const app = express()

const port = 3001 || process.env.PORT

//app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())

const server = require("http").Server(app)
const io = require("socket.io").listen(server)



app.post("/message",(req,res)=>{
    io.to(req.body.socketid).emit('message', req.body.link);
    console.log(req.body)
    res.send("success")
})

io.on("connection", (socket) => {


    console.log(socket.id)

    socket.on('disconnect', () => {

    })

    //ends here

    socket.on("SendMessage", (message, callback) => {
        io.to(message.socketid).emit('message', message.link);
    })


})



server.listen(port, () => {
    console.log("listening on port " + port)
})