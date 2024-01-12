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
let klienci = [];

io.on("connection", client=>{
    console.log("nawiązano połączenie: ", client.id);
    client.emit('username');
    client.on('username', (username, uid)=>{
        console.log("Klient:", username, uid);
        let kl = klienci.filter(e=>e.uid==uid)[0];
        if(!kl)
        {
            kl = {'uid': uid, 'username': username, "socket": client}
            klienci.push(kl);
        }
     })
});