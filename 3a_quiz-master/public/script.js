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


let timer;
    let currentQuestionIndex = 0;
    let questions = [];

    const findElement = (selector) => document.querySelector(selector);

    const loadQuestions = () => {
      fetch("pytania.json")
        .then((response) => response.json())
        .then((data) => {
          questions = data;
          startTimer();
          displayQuestion();
        })
        .catch((error) => console.error("Error loading questions:", error));
    };

    const startTimer = () => {
      timer = setTimeout(nextQuestion, 15000);
    };

    const resetTimer = () => {
      clearTimeout(timer);
    };

    const displayQuestion = () => {
      const questionElement = findElement("#question");
      const optionsElement = findElement("#options");

      const currentQuestion = questions[currentQuestionIndex];
      questionElement.textContent = currentQuestion.pytanie;

      optionsElement.innerHTML = "";
      currentQuestion.odp.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option");
        optionButton.dataset.index = index;
        optionButton.addEventListener("click", () => selectOption(index));
        optionsElement.appendChild(optionButton);
      });
    };

    const selectOption = (index) => {
      const selectedOption = parseInt(index);
      checkAnswer(selectedOption);
    };

    const checkAnswer = (selectedOption) => {
      const correctOption = questions[currentQuestionIndex].poprawna;

      if (selectedOption === correctOption) {
        nextQuestion();
      } else {
        alert("Błędna odpowiedź. Spróbuj ponownie!");
      }
    };

    const nextQuestion = () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
        resetTimer();
        startTimer();
      } else {
        alert("Koniec pytań. Dziękujemy!");
      }
    };

    window.onload = loadQuestions;
