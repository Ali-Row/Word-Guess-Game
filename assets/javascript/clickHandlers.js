startBtn.addEventListener("click", startGame);
nextWordBtn.addEventListener("click", nextWord);
document.addEventListener("keyup", (e) => canType && runUserGuess(e));