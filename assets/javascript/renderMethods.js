const renderInfo = (cssSelector, message) => {
    let displayInfo = document.querySelector(cssSelector);
    displayInfo.textContent = "";
    displayInfo.textContent = message;
}

const renderNewWord = () => {
    checkGameOver();
    buildHiddenWord();
    renderInfo(".display-word", hiddenWord.join(""))
    canType = true;
}