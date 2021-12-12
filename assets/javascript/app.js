let wins = 0;
let losses = 0;
let wordIndex = 0;
let guessesLeft = 0;
const words = ["test", "amazing", "unbelievable", "cool", "yes"];
let userGuesses = "";
let hiddenWord = [];


const buildHiddenWord = () => {
    let currentWord = words[wordIndex];
    hiddenWord = [];
    for (let i = 0; i < currentWord.length; i++) {
        hiddenWord.push("_");
    } 
    guessesLeft = hiddenWord.length + 4;
}

const renderWord = () => {
    let displayWord = document.querySelector(".display-word");
    displayWord.textContent = "";
    displayWord.textContent = hiddenWord.join("");
}

const checkGameOver = () => {
    if (wordIndex === words.length) {
        alert("Game Over!");
        resetGame();
    }
}
 
const renderNewWord = () => {
    checkGameOver();
    buildHiddenWord();
    renderWord();
}

const nextWord = () => {
    wordIndex++;
    renderNewWord();
}

const renderInfo = (selector, message) => {
    let displayInfo = document.querySelector(selector);
    displayInfo.textContent = "";
    displayInfo.textContent = message;
}

const checkLetter = (letter) => {
    let currentWord = words[wordIndex];

     for (let i in currentWord) {
        const char = currentWord[i].toLowerCase();
        const userGuess = letter.toLowerCase();

        if (char === userGuess) {
            let nextWordBtn = document.querySelector(".next-word-btn");
            nextWordBtn.classList.remove("hide");
            hiddenWord[i] = userGuess;
            renderWord();
        }
    }
}

document.onkeyup = function(e) {
    let currentWord = words[wordIndex];
    if (guessesLeft === 1) {
        losses++;
        renderInfo(".display-losses", "Losses: " + losses);
    } else if (guessesLeft === 0) {
        return alert("Out of guesses!");
    }

    guessesLeft--;
    renderInfo(".display-guesses", "Guesses Left: " + guessesLeft);
    let userGuess = e.key;
    userGuesses += userGuess;
    checkLetter(userGuess);
    
    if (currentWord === hiddenWord.join("")) {
        wins++;
        renderInfo(".display-wins", "Wins: " + wins);
    }
}

const startGame = () => {
    let startContainer = document.querySelector(".start-container");
    let gameContainer = document.querySelector(".game-container");
    startContainer.classList.add("hide");
    gameContainer.classList.remove("hide");

    renderNewWord();
    renderInfo(".display-wins", "Wins: " + wins);
    renderInfo(".display-losses", "Losses: " + losses);
    renderInfo(".display-guesses", "Guesses Left: " + guessesLeft);
}

const resetGame = () => {
    window.location.reload();
}

let startBtn = document.querySelector(".start-btn");
let nextWordBtn = document.querySelector(".next-word-btn");

startBtn.addEventListener("click", startGame);
nextWordBtn.addEventListener("click", nextWord);
