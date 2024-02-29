let pytania = [];
const $ = name => document.querySelector(name);

console.log(klienci);
console.log(username);
console.log(uid);

czyt_pyt = () => {
    fetch("pytania.json")
    .then(e => e.json())
    .then(j => {
        pytania = [];
        pytania.push(...j);
        losuj_pyt();
    });
};

losuj_pyt = () => {
    let pytanie = pytania.filter(e => !e.niewylosowane)[0];
    if (!pytanie) {
        czyt_pyt();
    }
    pytanie.wylosowane = true;
    $('.pytanie').innerHTML = pytanie.pytanie;
    for (let i = 0; i < pytanie.odp.length; i++) {
        $(`.p${i}`).innerHTML = pytanie.odp[i];
    }
    console.log(klienci);
};

czyt_pyt();

let score_tab = [{username: "klient z ios", odp: '1,1,1,1'}];

const existingUser = score_tab.find(klienci => klienci.username === username);

if (existingUser) {
    console.log("Użytkownik istnieje w tablicy.");
} else {
    console.log("Użytkownik nie istnieje w tablicy.");
}
