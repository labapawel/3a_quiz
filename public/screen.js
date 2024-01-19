let connect = io('ws://localhost:3000');
connect.on('connect', ()=>{
    console.log("Połączono", connect.id)

})
let pytania = [];

const $=name=>document.querySelector(name);

function czytajPytania(){
    fetch('pytania.json')
    .then(e=>e.json())
    .then(j=>{
        pytania = [];
        pytania.push(...j);
        losujPytanie();
    })

}

function losujPytanie()
{
    let pytanie = pytania.filter(e=>!e.wylosowane)[0];
    if(!pytanie)
    {
        czytajPytania();
    }
    pytanie.wylosowane = true;
    $('.pytanie').innerHTML = pytanie.pytanie;
    for(let i=0;i<pytanie.odp.length; i++)
        $(`.p${i}`).innerHTML = pytanie.odp[i];
    
    //console.log($('.pytanie'));
}

czytajPytania()

    console.log("test");