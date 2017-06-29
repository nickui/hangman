var wins = 0;
var losses = 0;
var words = [
	["C", "O", "M", "P", "U", "T", "E", "R"],
	["J","A","V","A","S","C","R","I","P","T"],
	["M","O","U","S","E"],
	["K","E","Y","B","O","A","R","D"],
	["M","O","T","H","E","R","B","O","A","R","D"],
	["F","L","O","P","P","Y"],
	["M","O","N","I","T","O","R"],
	["B","I","N","A","R","Y"]
]
var random = Math.floor((Math.random()*(words.length-1))); 

var currentWord = words[random]; // the word to guess will be chosen from the array above
var hiddenWord = new Array(currentWord.length);
var wrongGuesses = 0;

// every letter in the word is symbolized by an underscore in the guessfield
for (var i = 0; i < hiddenWord.length; i++){
	hiddenWord[i] = "_ ";
}

// prints the guessfield
function printhiddenWord(){
	for (var i = 0; i < hiddenWord.length; i++){
	var underscoreCharacters = document.getElementById("underscoreCharacters");
	var letter = document.createTextNode(hiddenWord[i]);
	underscoreCharacters.appendChild(letter);
	}
}

function moveLetters(num) { 
    var txt = document.getElementById("guessField").value; 
    txt = num; 
    document.getElementById("guessField").value = txt;
    document.getElementById("guessButton").click();
    } 

function disableButton(e, c) {  
e.className = e.className.replace(new RegExp('(?:^|s)' + c + '(?!S)'), '');
//	wb = this;
//	document.getElementById(this).className = "btn btn-primary disabled";
}   

//checks if the the letter provided by the user matches one or more of the letters in the word
var letterMatches = function letterMatching(){
	var f = document.gameForm; 
	var b = f.elements["guessField"]; 
	var letterGuess = b.value; // the letter provided by the user
	letterGuess = letterGuess.toUpperCase();
	for (var i = 0; i < currentWord.length; i++){
		if(currentWord[i] === letterGuess){
			hiddenWord[i] = letterGuess + " ";
			var wrongLetter = true;
		}
	b.value = "";
	}
	
	//deletes the guessfield and replaces it with the new one
	var underscoreCharacters = document.getElementById("underscoreCharacters");
	underscoreCharacters.innerHTML=""; 
	printhiddenWord();
	
	// if a guessed letter is not in the word, the letter will be put on the "wrong letters"-list and hangman grows
	if(!wrongLetter){
		var generateLetters = document.getElementById("generateLetters");
		var letter = document.createTextNode(" " + letterGuess);
		generateLetters.appendChild(letter); 
		wrongGuesses++;
		var hangman = document.getElementById("hangman");
    hangman.src = "hangman" + wrongGuesses + ".png";
	}
	
	//checks if all letters have been found
	var allDone = true;
	for (var i = 0; i < hiddenWord.length; i++){
		if(hiddenWord[i] === "_ "){
			allDone = false;
		}
	}
	if(allDone){
		wins++;
		window.alert("You win, you were not hung!");
	}
	
	//once you got six wrong letters, you lose
	if(wrongGuesses === 6){
		losses++;
		window.alert("Uh...I guess you lost your life. You should of guessed " + currentWord);
	}
}

function disableButton(aaa) {  

	document.getElementById(aaa).className = "btn btn-primary disabled";
	document.getElementById(aaa).disabled = true;
} 

function init(){
	printhiddenWord();
}

window.onload = init;