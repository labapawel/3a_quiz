var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Wyniki quizu",
    },
  },
});

let answers = JSON.parse(localStorage.getItem("answers"));
console.log(answers);

let users = [];
//do poprawy wynik i sumowanie dla kazdego uzytkownika, a pozniej dodanie do diagramu i wyswietlenie go!
answers.forEach((element) => {
  if (element.username in users) {
    users.push(element.username);
    console.log("dodalem: ", element.username);
  } else {
    console.log("juz jest!  ", users, element.username);
  }
});
console.log(users);
