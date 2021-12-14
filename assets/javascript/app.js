// Globals
const words = ["awesome", "amazing", "unbelievable", "cool", "yes", "scene", "tragedy", "stump", "round", "turbo"];
let wins = 0;
let losses = 0;
let wordIndex = 0;
let guessesLeft = 0;
let userGuesses = "";
let hiddenWord = [];
let canType = false;

let startBtn = document.querySelector(".start-btn");
let nextWordBtn = document.querySelector(".next-word-btn");
let displayWord = document.querySelector(".display-word");

const winSound = new Audio('assets/audio/win-sound.wav');
const loseSound = new Audio('assets/audio/lose-sound.wav');

const buildHiddenWord = () => {
    let currentWord = words[wordIndex];
    hiddenWord = [];
    for (each of currentWord) {
        hiddenWord.push("_");
    } 
    guessesLeft = hiddenWord.length + 3;
    renderInfo(".display-guesses", `Guesses Left: ${guessesLeft}`);
}

const checkGameOver = () => {
    if (wordIndex === words.length) {
        renderInfo(".display-word", "Game Over!");
        nextWordBtn.textContent = "Restart";
        nextWordBtn.addEventListener("click", resetGame);
        renderInfo(".display-guesses", "");
        renderInfo(".display-guessed-letters", "");
    }
}

const nextWord = () => {
    wordIndex++;
    renderNewWord();
    renderInfo(".display-round", `Round ${wordIndex + 1} of ${words.length}`);
    userGuesses = "";
    renderInfo(".display-guessed-letters", "");
}

const checkLetter = (letter) => {
    let currentWord = words[wordIndex];

     for (let i in currentWord) {
        const char = currentWord[i].toLowerCase();
        const userGuess = letter.toLowerCase();

        if (char === userGuess) {
            hiddenWord[i] = userGuess;
            renderInfo(".display-word", hiddenWord.join(""))
        }
    }
}

const runUserGuess = (e) => {
    nextWordBtn.classList.remove("hide");
    let userGuess = e.key;
    userGuesses += userGuess;
    let guessedLetters = new Set(userGuesses);

    renderInfo(".display-guessed-letters", `Guessed Letters: ${[...guessedLetters]}`);

    checkLetter(userGuess);
    let currentWord = words[wordIndex];
    let userWord = hiddenWord.join("");

    if (currentWord === userWord) {
        canType = false;
        wins++;
        renderInfo(".display-wins", `Wins: ${wins}`);
        setTimeout(() => renderInfo(".display-word", "You Won!"), 1000);
        setTimeout(() => winSound.play(), 1000);
    } else if (guessesLeft === 1) {
        canType = false;
        losses++;
        renderInfo(".display-losses", `Losses: ${losses}`);
        renderInfo(".display-guesses", `Guesses Left: ${0}`);
        setTimeout(() => renderInfo(".display-word", "You Lose!"), 500);
        setTimeout(() => loseSound.play(), 1000);
        return setTimeout(() => renderInfo(".display-word", "Out of Guesses!"), 1000);
    } 
    guessesLeft--;
    renderInfo(".display-guesses", `Guesses Left: ${guessesLeft}`);
} 

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[randIndex];
        array[randIndex] = temp;
    }
}

const startGame = () => {
    let startContainer = document.querySelector(".start-container");
    let gameContainer = document.querySelector(".game-container");
    startContainer.classList.add("hide");
    gameContainer.classList.remove("hide");
    canType = true;

    shuffleArray(words);
    renderNewWord();
    renderInfo(".display-wins", `Wins: ${wins}`);
    renderInfo(".display-losses", `Losses: ${losses}`);
    renderInfo(".display-guesses", `Guesses Left: ${guessesLeft}`);
    renderInfo(".display-round", `Round ${wordIndex + 1} of ${words.length}`);
}

const resetGame = () => {
    window.location.reload();
}

