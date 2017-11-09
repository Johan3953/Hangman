// Array holding words
var words = [ "AMAZON", "APPLE", "HP", "MASTERCARD", "PEPSI" ];


var hangman = {
	numWins: 0,
	winLose: "",
	audio: "",

	numTriesLeft: 10,
	word: "",
	wordArray: [],
	lettersGuessed: [],
	wordGuessed: [],
	correctGuessCount: 0,
	wordComplete : false
};

function updatePic() {

	var pic = document.getElementById("picDisplay").src=("assets/images/" + hangman.word + ".jpg");
	pic.innerHTML;
}

function setup() {
	hangman.numTriesLeft = 10;
	hangman.wordArray = [];
	hangman.lettersGuessed = [];
	hangman.wordGuessed = [];
	hangman.correctGuessCount = 0;
	hangman.wordComplete = false;

	// Computer picks a random word from the words array
	hangman.word = words[Math.floor(Math.random()*words.length)];

	hangman.wordArray = hangman.word.split("");
	console.log("\n" + hangman.wordArray);

	// Displaying the random word as blanks
	for (var i = 0; i < hangman.wordArray.length; i++) {
		hangman.wordGuessed.push(" ");
	}
	document.getElementById("wordDisplay").innerHTML = hangman.wordGuessed;
	console.log(hangman.wordGuessed);
}


// Displaying the current game stats
function writeStats() {
	
	var stats = "<br>" +
	"******************************************************************************" + "<br>" +
	hangman.winLose + "<br>" + 
	"Wins: " + hangman.numWins + "<br>" + 
	"Lives: " + hangman.numTriesLeft + "<br>" + 
	"Guesses: " + hangman.lettersGuessed + "<br>" + 
	"******************************************************************************";
	document.getElementById("statsDisplay").innerHTML = stats;
}


function initialSetup() {
	setup();
	updatePic();
	writeStats();
}


//
// ** Play the game **
//


// Capture user input
document.onkeyup = function(event) {

	// Changes input to uppercase
	var userInput = String.fromCharCode(event.keyCode);

	userInput = userInput.toUpperCase();

	// Checks for repeats
	for (var i=0; i<hangman.lettersGuessed.length; i++) {
		if (userInput === hangman.lettersGuessed[i]) {
			alert("You already tried that.");
			return;
		}
	}

	var goodGuess = 0;
		
	// Checks the array for match
	for (var i=0; i<hangman.wordArray.length; i++) {
		if (userInput === hangman.wordArray[i]) {			
			hangman.wordGuessed[i] = userInput;
			goodGuess = true;
			hangman.correctGuessCount++;
			document.getElementById("wordDisplay").innerHTML = hangman.wordGuessed;
			
			if (hangman.correctGuessCount == hangman.wordArray.length) {
				hangman.wordComplete = true;
			}
		}
	}

	if (goodGuess == false) {
		hangman.numTriesLeft--;
	}

	hangman.lettersGuessed.push(userInput);
	writeStats();
	console.log(userInput + " numTriesLeft: " + hangman.numTriesLeft + " wordComplete: " + hangman.wordComplete);
	console.log(hangman.wordGuessed + " correctGuessCount: " + hangman.correctGuessCount);

	if ((hangman.numTriesLeft === 0) || (hangman.wordComplete === true)) {
		gameOver();
	}
}


function gameOver() {
	if (hangman.audio != "") {
		hangman.audio.pause();
	}

	if (hangman.numTriesLeft === 0) {
		hangman.winLose = " You did NOT guess --> " + hangman.word + " <-- correctly";
		hangman.audio = new Audio('assets/sounds/defeat.mp3');
	} else if (hangman.wordComplete === true){
		hangman.winLose = " Yay! You guessed --> " + hangman.word + " <-- correctly ";
		hangman.numWins++;
		hangman.audio = new Audio('assets/sounds/victory.mp3');
	}
	hangman.audio.play();
	initialSetup();
}
