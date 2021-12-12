// Globals
let wins = 0;
let losses = 0;
let wordIndex = 0;
let guessesLeft = 0;
const words = ["test", "amazing", "unbelievable", "cool", "yes"];
let userGuesses = "";
let hiddenWord = [];
let canType = true;

let startBtn = document.querySelector(".start-btn");
let nextWordBtn = document.querySelector(".next-word-btn");
let displayWord = document.querySelector(".display-word");


const buildHiddenWord = () => {
    let currentWord = words[wordIndex];
    hiddenWord = [];
    for (each of currentWord) {
        hiddenWord.push("_");
    } 
    guessesLeft = hiddenWord.length + 4;
}

const checkGameOver = () => {
    if (wordIndex === words.length) {
        setTimeout(() => renderInfo(".display-word", "Game Over!"), 500);
        setTimeout(() => nextWordBtn.textContent = "Restart", 500);
        nextWordBtn.addEventListener("click", resetGame);
    }
}

const nextWord = () => {
    wordIndex++;
    renderNewWord();
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

const runUserGuess = (e) => {
    let userGuess = e.key;
    userGuesses += userGuess;
    checkLetter(userGuess);
    let currentWord = words[wordIndex];
    let userWord = hiddenWord.join("");

    if (currentWord === userWord) {
        canType = false;
        wins++;
        renderInfo(".display-wins", "Wins: " + wins);
        setTimeout(() => renderInfo(".display-word", "You Won!"), 1000);
    } else if (guessesLeft === 1) {
        canType = false;
        losses++;
        renderInfo(".display-losses", "Losses: " + losses);
        renderInfo(".display-guesses", "Guesses Left: " + 0);
        setTimeout(() => renderInfo(".display-word", "You Lose!"), 500);
        return setTimeout(() => renderInfo(".display-word", "Out of Guesses!"), 1500);
    }

    guessesLeft--;
    renderInfo(".display-guesses", "Guesses Left: " + guessesLeft);
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

// Click handlers
startBtn.addEventListener("click", startGame);
nextWordBtn.addEventListener("click", nextWord);
document.onkeyup = e => canType ? runUserGuess(e) : "";
