const express = require('express');
const app = express();
const env = require('dotenv');
env.config(); // process.env.host

app.use(express.static(__dirname+'/public'));
let server = app.listen(3000, ()=>{
    console.log("http://localhost:3000");    
})

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
        Credentials: true
    }
})

io.on("connection", client=>{

});