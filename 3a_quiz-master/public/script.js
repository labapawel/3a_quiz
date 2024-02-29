let progressBar = document.querySelector(".w3-grey");
let timeValue = 0;
let timer = 0;
let changeQuestion = 0;
let questionIndex = 0;

let UID = window.localStorage.getItem("UID");
if (!UID) {
  UID = Math.floor(Math.random() * 100000000000) + `_` + new Date().getTime();
  window.localStorage.setItem("UID", UID);
}
// console.log(UID);

let connect = io("ws://localhost:3000");
connect.on("connect", () => {
  console.log("Połączono", connect.id);
});
let username = "";

// pytanie o imie usera
connect.on("username", () => {
  if (!username) {
    username = prompt("Podaj swoje imie");
  }
  connect.emit("username", username, UID);
});

let pytania = [];
const $ = (name) => document.querySelector(name);

const czyt_pyt = () => {
  fetch("pytania.json")
    .then((e) => e.json())
    .then((j) => {
      pytania = [];
      pytania.push(...j);
      losuj_pyt();
    });
};
let answer = "";
let pytanie = {};

const losuj_pyt = () => {
  pytanie = pytania.filter((e) => !e.wylosowane)[0];
  if (!pytanie) {
    czyt_pyt();
  }
  pytanie.wylosowane = true;
  $(".pytanie").innerHTML = pytanie.pytanie;
  for (let i = 0; i < pytanie.odp.length; i++) {
    $(`.p${i}`).innerHTML = pytanie.odp[i];
    $(`.p${i}`).addEventListener("click", () => {
      answer = i;
      $(`.p${i}`).style.color = "red"
    });
  }
};

czyt_pyt();

let questions = [];

const saveAnswer = (questionIndex, isCorrect) => {
  let answers = JSON.parse(localStorage.getItem("answers")) || [];

  const savedUsername = JSON.parse(localStorage.getItem("username"));

  const socketUsername = username;

  const finalUsername = savedUsername || socketUsername || "Unknown";

  answers.push({
    username: finalUsername,
    index: questionIndex,
    correct: isCorrect,
  });

  localStorage.setItem("answers", JSON.stringify(answers));
};

const nextQuestion = () => {
  //   console.log(pytanie);

  if (answer == pytanie.poprawna) {
    saveAnswer(questionIndex, 1);
    // console.log("masz punkt");
  } else {
    saveAnswer(questionIndex, 0);
    // console.log("nie masz");
  }
  answer = null;
  //   console.log(questionIndex, pytania.length);
  if (questionIndex < pytania.length) {
    timeValue = 0;
    questionIndex++;
    losuj_pyt();
  } else {
    window.location.href = "/ScorePage.html";
  }
};

const startTimer = () => {
  clearInterval(timer);
  clearInterval(changeQuestion);

  timer = setInterval(countdown, 1000);
  changeQuestion = setInterval(nextQuestion, 11000);
};

const countdown = () => {
  let percentage = timeValue + "%";
  progressBar.style.width = percentage;
  timeValue += 10;
};

startTimer();

window.onload = () => {
  connect.emit("getUsername");
  connect.emit("loadQuestions");
};
