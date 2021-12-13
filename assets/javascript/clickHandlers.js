startBtn.addEventListener("click", startGame);
nextWordBtn.addEventListener("click", nextWord);
document.onkeyup = e => canType && runUserGuess(e);