let wins = 0;
let losses = 0;
let wordIndex = 0;
let guessesLeft = 0;
const words = ["test", "amazing", "unbelievable", "cool", "yes"];
let userGuesses = "";
let hiddenWord = [];

const buildHiddenWord = () => {
    hiddenWord = [];
    let currentWord = words[wordIndex];
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
        startGame();
    }
}
 
const renderNewWord = () => {
    checkGameOver();
    buildHiddenWord();
    renderWord();
}

const renderInfo = (selector, message) => {
    let displayInfo = document.querySelector(selector);
    displayInfo.textContent = "";
    displayInfo.textContent = message;
}

const checkLetter = (letter) => {
    let currentWord = words[wordIndex];
    for (let i = 0; i < currentWord.length; i++) {

        if (currentWord[i].toLowerCase() === letter.toLowerCase()) {
            hiddenWord[i] = letter.toLowerCase();
            renderWord();
        }
    };
}

document.onkeyup = function(e) {
    let currentWord = words[wordIndex];
    if (guessesLeft === 1) {
        losses++;
        renderInfo(".display-losses", "Losses: " + losses);
        wordIndex++;
        renderNewWord()
    } 

    guessesLeft--;
    renderInfo(".display-guesses", "Guesses Left: " + guessesLeft);
    let userGuess = e.key;
    userGuesses += userGuess;
    checkLetter(userGuess);
    
    if (currentWord === hiddenWord.join("")) {
        wins++;
        renderInfo(".display-wins", "Wins: " + wins);
        wordIndex++;
        renderNewWord();
    }
}

const startGame = () => {
    let startContainer = document.querySelector(".start-container");
    let gameContainer = document.querySelector(".game-container");
    startContainer.classList.add("hide");
    gameContainer.classList.remove("hide");

    buildHiddenWord();
    renderWord();
    renderInfo(".display-wins", "Wins: " + wins);
    renderInfo(".display-losses", "Losses: " + losses);
    renderInfo(".display-guesses", "Guesses Left: " + guessesLeft);
}

const resetGame = () => {
    window.location.reload();
}

let startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", startGame);
