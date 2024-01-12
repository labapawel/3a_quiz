// dla klienta (ucznia)

// generowanie unikalnego ID dla klienta, uid będzie stały.
let UID = window.localStorage.getItem("UID");
if(!UID)
    {
        UID = Math.floor(Math.random()*100000000000)+`_`+(new Date).getTime();        
        window.localStorage.setItem("UID", UID);
    }
console.log(UID);

let connect = io('ws://localhost:3000');
//console.log(connect)
connect.on('connect', ()=>{
    console.log("Połączono", connect.id)

})
let username = "";

// putanie o imie usera
connect.on('username', ()=>{
  if(!username)
  {
    username = prompt("Podaj swoje imie");
  }
  connect.emit('username', username, UID);    
})