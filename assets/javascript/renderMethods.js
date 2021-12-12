const renderWord = () => {
    displayWord.textContent = "";
    displayWord.textContent = hiddenWord.join("");
}

const renderNewWord = () => {
    checkGameOver();
    buildHiddenWord();
    renderWord();
    canType = true;
}

const renderInfo = (cssSelector, message) => {
    let displayInfo = document.querySelector(cssSelector);
    displayInfo.textContent = "";
    displayInfo.textContent = message;
}