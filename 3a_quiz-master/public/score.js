let answers = JSON.parse(localStorage.getItem("answers"));
console.log(answers);

let users = [];
answers.forEach((element) => {
  let userIndex = users.findIndex((user) => user.username === element.username);
  if (userIndex === -1) {
    users.push({
      username: element.username,
      score: element.correct === 1 ? 1 : 0,
    });
    console.log("Added: ", element.username);
  } else {
    users[userIndex].score += element.correct === 1 ? 1 : 0;
    console.log("Updated: ", element.username, element.correct);
  }
});
var xValues = users.map((user) => user.username);
var yValues = users.map((user) => user.score);

const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

let colors = [];
for (let i = 0; i < users.length + 1; i++) {
  colors.push(randomHexColorCode());
}
var barColors = colors;

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
      fontColor: "#ECE8D9",
    },
    legend: {
      labels: {
        fontColor: "#ECE8D9",
      },
    },
  },
});
