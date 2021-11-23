let colorOne = Math.floor(Math.random() * 255) + 1;
let colorTwo = Math.floor(Math.random() * 255) + 1;
let colorT = Math.floor(Math.random() * 255) + 1;
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
let secretNumber = Math.trunc(randomNumber(1000, 9999)) + "";
console.log("secret", secretNumber);

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  score = 20;

  secretNumber = Math.trunc(randomNumber(1000, 9999)) + "";
  console.log(`Secret inside addEvent ${secretNumber}`);

  document.querySelector(".message").textContent = "Start guessing...";
  // document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = `#222`;
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".cows").textContent = "....";
  document.querySelector(".bull").textContent = "....";
  rightMean.textContent = "";
  document.querySelector(".highscore").textContent = 0;
};

let winner = document.querySelector(".winner");
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const hardMean = [
  "Oh man you s...🤮",
  "You should give up",
  "Not even in thousand of attempts",
  "No hope..",
  "Good bye, I'm out...👋",
  "What a ...💩",
];
let randomMean = Math.floor(Math.random() * hardMean.length);
console.log(`${hardMean[randomMean]}`);

let html = `${hardMean[randomMean]}`;
const rightMean = document.querySelector(".mean-message");
console.log(colorOne);

let score = 20;
let highScore = 0;
let input = document.querySelector(".player");
let playerTitle = document.querySelector(".title");
input.onchange = handleChange;
let playerName;
function handleChange(e) {
  playerName = e.target.value;
  playerTitle.textContent = ` ${playerName} Guess My Number!`;
  input.value = "";
}

let inputPlayer = "player name ...";
let numPlayer = "Your number...";
// input.placeholder = inputPlayer;
let begin = 0;
let end = inputPlayer.length;

function runningText() {
  document.getElementsByName(
    "marquee1"
  )[0].placeholder = `${inputPlayer.substring(
    begin,
    end
  )} ${inputPlayer.substring(0, begin)}`;

  begin++;
  if (begin >= end) {
    begin = 0;
  }
  window.setTimeout("runningText()", 500);
}
runningText();

function runningNum() {
  document.getElementsByName(
    "marquee2"
  )[0].placeholder = `${numPlayer.substring(begin, end)} ${numPlayer.substring(
    0,
    begin
  )}`;

  begin++;
  if (begin >= end) {
    begin = 0;
  }
  window.setTimeout("runningNum()", 500);
}
runningNum();

let level = false;
const toggle = document
  .querySelector(".difficulty")
  .addEventListener("click", function () {
    let easy = document.querySelector(".difficulty");
    if (easy.textContent === "Hard") {
      level = true;
      easy.textContent = "Easy";
      document.querySelector(".difficulty").style.backgroundColor = "#008000";
    } else {
      level = false;
      easy.textContent = "Hard";
      document.querySelector(".difficulty").style.backgroundColor = "#ff0000";
    }
    rightMean.textContent = "";
    console.log(`${easy.textContent}`);
    console.log(`Level :${level}`);
    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector(".bull").textContent = "...";
    document.querySelector(".cows").textContent = "....";
  });

// lo;
// document.querySelector(".player").addEventListener("onchange", function () {});
document.querySelector(".again").addEventListener("click", function () {
  score = 20;

  secretNumber = Math.trunc(randomNumber(1000, 9999)) + "";
  console.log(`Secret inside addEvent ${secretNumber}`);

  document.querySelector(".message").textContent = "Start guessing...";
  // document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = `#222`;
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".cows").textContent = "....";
  document.querySelector(".bull").textContent = "....";
  rightMean.textContent = "";

  console.log(`${level}`);
});

document.querySelector(".check").addEventListener("click", function () {
  const guess = String(document.querySelector(".guess").value);

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

    openModal();

    winner.textContent = `${
      playerName ? playerName : "Player1"
    } is the winner, with a score of ${score}!!! 🎆👏🎈🔥`;
    if (score > highScore) {
      highScore = score;
      console.log(`My current high Score ${score}`);

      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    let count = 0;
    let bullEasy = "";
    let cowCount = 0;
    let cowEasy = "";
    for (let i = 0; i < guess.length; i++) {
      console.log(` My level: ${level}`);
      if (guess[i] === secretNumber[i] && level === false) {
        count++;
        document.querySelector(".bull").textContent = `${
          count > 1 ? `You got ${count} bulls!` : `You got ${count} bull!`
        }`;
        document.querySelector(".guess").value = "";
        console.log(`${playerName}`);
      } else if (guess[i] === secretNumber[i]) {
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
      } else if (secretNumber.split("").includes(guess[i]) && level === false) {
        cowCount++;
        document.querySelector(".cows").textContent = `${
          cowCount > 1 ? `You got ${cowCount} cows` : `You got ${cowCount} cow!`
        }`;
        document.querySelector(".guess").value = "";
      } else if (secretNumber.split("").includes(guess[i])) {
        cowCount++;
        cowEasy += `${guess[i]} `;
        console.log("Cow Count", cowCount);
        document.querySelector(".cows").textContent = ` ${
          cowCount > 1
            ? `You got ${cowCount} cows! They are ${cowEasy}`
            : `You got ${cowCount} cow! It is ${cowEasy}`
        }`;
        document.querySelector(".guess").value = "";
      }
    }
    if (score > 1) {
      document.querySelector(".message").textContent =
        guess > secretNumber ? "Too high! Try again!" : "Too low! Try again!";
      score--;
      document.querySelector(".score").textContent = score;

      level === false
        ? (rightMean.textContent = html)
        : (rightMean.textContent = "");
    } else {
      document.querySelector(".message").textContent = "You loose!";
      document.querySelector(".score").textContent = 0;
    }
  }
});
