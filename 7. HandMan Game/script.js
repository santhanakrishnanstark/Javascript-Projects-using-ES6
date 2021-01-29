var figureParts = document.querySelectorAll(".figure-part");
var wordEl = document.querySelector(".word");
var wrongLettersEl = document.querySelector(".wrong-letter");
var popupContainer = document.querySelector(".popup-container");
var finalMessage = document.querySelector("#final-message");
var playBtn = document.querySelector("#play-button");
var notificationContainer = document.querySelector(".notification-container");

const words = ["ironman", "thor", "hulk", "avengers"];

const selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord == selectedWord) {
    finalMessage.innerText = "Congratulation! you Won !!!";
    popupContainer.style.display = "flex";
  }
}

function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length == figureParts.length) {
    finalMessage.innerText = "Unfortunately You Lost !";
    popupContainer.style.display = "flex";
  }
}

function showNotification() {
  notificationContainer.classList.add("show");
  setTimeout(() => {
    notificationContainer.classList.remove("show");
  }, 2000);
}

// keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  let selectedWord = words[Math.floor(Math.random * words.length)];
  displayWord();
  updateWrongLettersEl();
  popupContainer.style.display = "none";
});

displayWord();
