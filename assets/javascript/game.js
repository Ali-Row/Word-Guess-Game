//  access the HTML elements using the id of the elements
let curWord = document.getElementById("currentWord");
let lettersUsed = document.getElementById("lettersGuessed");
let countGuess = document.getElementById("numberOfGuesses");
let gameMessage = document.getElementById("userMessage");
let displayMessage = document.getElementById("dispMessage");
// let playAudio = document.getElementById("audioFrame");
// let audioFile = document.getElementById("song");
let pickWord = document.getElementById("nextWord");
		
// Declare variables for wins, remaining guesses, user choice
let wins = 0;
let remainingGuess = 12;
let wordChoice;
let pick;
let pos;
let userChoice;
		
countGuess.innerHTML = "<strong>" + remainingGuess + "</strong>";
		
// Declare arrays for word list and letters guessed by user
let wordList = ["Strong", "Heavy", "Music", "Funny", "Simple", "Car", "Pencil", "Guess", "Pickle", "Portfolio", "Outbreak", "Table", "Fable", "Mystery", "Maximum", "Amazing"];
let lettersGuessed = [];
let selectedWord = [];

// This function uses the Math.random function to pick a random word from the word list array,
// loop through the selected word and create a blank space on the document equal to the word length.
function pickAWord() {
	resetVariables();
	pick = Math.floor(Math.random() * wordList.length);
	wordChoice = wordList[pick].toLowerCase();
	countGuess.innerHTML = "<strong>" + remainingGuess + "</strong>";
	pos = wordList.indexOf(wordList[pick]);
	wordList.splice(pos, 1);
	for(let i = 0; i < wordChoice.length; i++) {
		selectedWord.push("-");
	}
	curWord.innerHTML = "<span>" + selectedWord + "</span>";
}

// onkeyup function captures the users keyboard input
document.onkeyup = function(event) {
	// audioFile.pause();
	userChoice = (String.fromCharCode(event.keyCode)).toLowerCase();
	if(lettersGuessed.indexOf(userChoice) === -1) {
    	lettersGuessed.push(userChoice);
	    lettersUsed.innerHTML = "<strong>"+lettersGuessed+"<strong>";
	    checkUserInput(userChoice);
	    if(remainingGuess > 0 && selectedWord.join("") !== wordChoice && lettersGuessed.length !== 0) {
	    	remainingGuess--;
	    }
	    countGuess.innerHTML = "<strong>" + remainingGuess + "</strong>";
	    if(remainingGuess === 0 && selectedWord.join("") !== wordChoice) { 
	    	gameMessage.innerHTML = "<strong>Out of guesses!</strong>";
	    	// audioFile.src = "assets/audio/lose-sound.mp3";
	    	// audioFile.type = "audio/mpeg"
	    	// audioFile.play();
	    	pickAWord();
	    }
	}else {
	    displayMessage.innerHTML = "<strong>Letter already used, type something else!</strong>";	
	}	
}	

// This function checks the user input against the selected word and replaces 
// the letter in the user display at the right position if it matches.
// It plays an audio file if the word is guessed correctly or incorrectly by the player.
function checkUserInput(userInput) {
	for(let j = 0; j < wordChoice.length; j++) {
		if(wordChoice[j] === userInput){
			selectedWord.splice(j, 1, userInput);
		}
	}
	curWord.innerHTML = "<span>" + selectedWord + "</span>";
	if(selectedWord.join("") === wordChoice) {
		gameMessage.innerHTML = "<strong>You Win!</strong>";
        
		// audioFile.src = "assets/audio/skrillex-disco-rangers.mp3";
      	// audioFile.type = "mp3";
      	// audioFile.play();
      	pickAWord();
    }
}

// Event listener for the next word button
pickWord.addEventListener('click', function() {
	// audioFile.pause();
	pickAWord();
});

// Resets all variables
function resetVariables() {
	lettersGuessed.length = 0;
 	selectedWord.length = 0;
 	lettersUsed.innerHTML = "";
 	displayMessage.innerHTML = "";
	remainingGuess = 12;
}