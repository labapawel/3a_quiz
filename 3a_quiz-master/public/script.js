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

let timer;
let currentQuestionIndex = 0;
let questions;

function startTimer() {
  timer = setTimeout(nextQuestion, 15000);
}

function resetTimer() {

  clearTimeout(timer);
}

function loadQuestions() {
  // Tutaj użyj odpowiednich środków (np. Fetch API) do wczytania pytań z pliku JSON
  // Poniżej znajdziesz przykładowy obiekt z pytaniami (możesz dostosować go do swoich potrzeb)
  //questions = [
    //{ question: "Jaka jest główna stolica Polski?", answer: "Warszawa" },
    //{ question: "Ile wynosi 2 + 2?", answer: "4" },
    // Dodaj więcej pytań w formacie { question: "Treść pytania", answer: "Poprawna odpowiedź" }
  //];

  // Rozpocznij timer po wczytaniu pytań
  startTimer();

  // Wyświetl pierwsze pytanie
  displayQuestion();
}

function displayQuestion() {
  const questionElement = document.getElementById("question");
  questionElement.textContent = `Pytanie: ${questions[currentQuestionIndex].question}`;
}

//function checkAnswer() {
  // Przykładowa logika:
//  const userAnswer = document.getElementById("answer").value;
//  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
//if (userAnswer.toLowerCase() === correctAnswer) {
//    nextQuestion();
//  } else {
//    alert("Błędna odpowiedź. Spróbuj ponownie!");
//  }
//}

function nextQuestion() {
  // Przejdź do następnego pytania
  currentQuestionIndex++;

  // Sprawdź czy są jeszcze jakieś pytania
  if (currentQuestionIndex < questions.length) {
    // Wyświetl nowe pytanie
    displayQuestion();

    // Zresetuj timer dla nowego pytania
    resetTimer();
    startTimer();
  } else {
    // Wyświetl komunikat o zakończeniu pytań
    alert("Koniec pytań. Dziękujemy!");
  }
}

// Rozpocznij proces wczytywania pytań
window.onload = loadQuestions;
