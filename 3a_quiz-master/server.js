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
let username, uid
io.on("connection", client => {
    console.log("nawiązano połączenie: ", client.id);
    client.emit('username');
    client.on('username', (_username, _uid) => {
        console.log("Klient:", _username, _uid);
        username, uid = _username, _uid
        let kl = klienci.filter(e => e._uid == _uid)[0];
        if (!kl) {
            kl = { 'uid': _uid, 'username': _username, "socket": client }
            klienci.push(kl);
        }
    })
    client.on('disconnect', () => {
        console.log('Klient opuścił grę');
        klienci = klienci.filter(klient => klient.socketId !== client.id);
    });
});
