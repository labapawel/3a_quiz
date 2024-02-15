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
      timer = setTimeout(nextQuestion, 500);
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
      const currentQuestion = questions[currentQuestionIndex];
      const correctOption = currentQuestion.poprawna;
      const isCorrect = (selectedOption === correctOption);
    
      currentQuestion.isCorrect = isCorrect;
    

      saveAnswer(currentQuestionIndex, isCorrect);
    
      nextQuestion();
    };
    
    const saveAnswer = (questionIndex, isCorrect) => {    
      let answers = JSON.parse(localStorage.getItem('answers')) || [];
      
      const savedUsername = JSON.parse(localStorage.getItem("username"));
  
      const socketUsername = username;
  
      const finalUsername = savedUsername || socketUsername || "Unknown";
  
      answers.push({ username: finalUsername, index: questionIndex, correct: isCorrect });
      
      localStorage.setItem('answers', JSON.stringify(answers));  
  };
    

  const nextQuestion = () => {
    resetTimer(); 
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
      startTimer(); 
    } else {
      window.location.href = "/ScorePage.html";
    }
  };
  

    window.onload = loadQuestions;
