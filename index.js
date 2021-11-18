// Bulls and Cows
// Get library for user input
// we need to keep the next line, so we can prompt the user for input
// const prompt = require("prompt-sync")({ sigint: true });

// // Test that prompt is working
// let name = prompt("What is your name? ");
// console.log(`User's input is: ${name}`);

// Feel free to edit / remove the line above, this is just to test the package
//  Although we may want to use the user's name for something
let colorOne = Math.floor(Math.random() * 255) + 1;
let colorTwo = Math.floor(Math.random() * 255) + 1;
let colorT = Math.floor(Math.random() * 255) + 1;
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
secretNumber = Math.trunc(randomNumber(1000, 9999)) + "";
console.log("secret", secretNumber);

console.log(colorOne);

let score = 20;
let input = document.querySelector(".player");
let playerTitle = document.querySelector(".title");
input.onchange = handleChange;
let playerName;
function handleChange(e) {
  playerName = e.target.value;
  playerTitle.textContent = ` ${playerName} Guess My Number!`;
  input.value = "";
}

let level = false;
const toggle = document
  .querySelector(".difficulty")
  .addEventListener("click", function () {
    let easy = document.querySelector(".difficulty");
    if (easy.textContent === "Hard") {
      level = true;
      easy.textContent = "Easy";
    } else {
      level = false;
      easy.textContent = "Hard";
    }

    console.log(`${easy.textContent}`);
    console.log(`Level :${level}`);
  });
// lo;
// document.querySelector(".player").addEventListener("onchange", function () {});
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  // secretNumber;
  console.log(`Secret inside addEvent ${typeof secretNumber}`);

  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = `#222`;
  document.querySelector(".number").style.width = "15rem";
});

document.querySelector(".check").addEventListener("click", function () {
  const guess = String(document.querySelector(".guess").value);
  console.log(`Level ${playerTitle.textContent}`);

  if (!guess) {
    document.querySelector(".message").textContent = "No Number!";
  } else if (guess.length < 4 || guess.length > 4) {
    document.querySelector(".message").textContent =
      "The Number Must to contain 4 digits!";
    document.querySelector(".guess").value = "";
  } else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "Correct Number!";
    document.querySelector(
      "body"
    ).style.backgroundColor = `rgb(${colorOne},${colorTwo},${colorT})`;
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    console.log(`Secret inside click event ${secretNumber}`);
    let count = 0;
    let bullEasy = "";
    let cowCount = 0;
    for (let i = 0; i < guess.length; i++) {
      console.log(`${guess[i] === secretNumber[i]}`);

      if (guess[i] === secretNumber[i]) {
        count++;
        bullEasy += secretNumber[i] + " - ".slice(-1);
        document.querySelector(".bull").textContent =
          count === 1
            ? `${
                playerName ? playerName : (playerName = "Player 1")
              }, you got ${count} bull! It's: ${bullEasy ? bullEasy : null} `
            : `${
                playerName ? playerName : (playerName = "Player 1")
              }, you got ${count} bulls!  They are: ${
                bullEasy ? bullEasy : null
              }`;
        document.querySelector(".guess").value = "";
      } else if (secretNumber.split("").includes(guess[i])) {
        cowCount++;
        console.log("Cow Count", cowCount);
        document.querySelector(
          ".cows"
        ).textContent = `You got ${cowCount} cow!`;
        document.querySelector(".guess").value = "";
      }
    }
    if (score > 1) {
      document.querySelector(".message").textContent =
        guess > secretNumber ? "Too high! Try again!" : "Too low! Try again!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You loose!";
      document.querySelector(".score").textContent = 0;
    }
  }
});
