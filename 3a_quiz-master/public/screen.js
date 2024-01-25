let pytania = []
const $=name=>document.querySelector(name)


czyt_pyt = ()=>{
    fetch("pytania.json")
    .then(e=>e.json())
    .then(j=>{
        pytania = []
        pytania.push(...j)
        losuj_pyt()
        
    })
}

losuj_pyt = ()=>{
    let pytanie = pytania.filter(e=>!e.niewylosowane)[0];
    if(!pytanie){

        czyt_pyt()
    }
    pytanie.wylosowane = true
    $('.pytanie').innerHTML = pytanie.pytanie
    for (let i = 0; i < pytanie.odp.length; i++) {
    $(`.p${i}`).innerHTML = pytanie.odp[i]
    }
}

czyt_pyt()
