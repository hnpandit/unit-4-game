// Rutgers Coding BootCamp - Full Stack Developer - Mon/Wed
// jQuery homework - Himanshu Pandit
// Himanshu 1, 2018

// Here we keep global variables
var txtWord = document.getElementById('user-text');
var txtRound = document.getElementById('num-round');
var txtGuess = document.getElementById('num-guess');
var txtGuessed = document.getElementById('guess-text');
var txtNumWin = document.getElementById('num-win');
var txtHint = document.getElementById('hint');
var txtDetails = document.getElementById('details');

const maxRounds = 5;
const maxGuess = 10;

var numRound = 0;
var numWin = 0;
var numGuess = maxGuess;
var numMatchFound = 0;
var gameOver = false;

var wordGuessGame = {
    "words": [
      "arguments",
      "boolean",
      "for",
      "return",
      "var"
    ],

    "hints": [
        " This keyword starts with a and we can pass to function",
        " This keyword starts with b and it is one of the data types with two values",
        " This keyword starts wtih f and used for loops",
        " This keyword starts with r and used for coming out",
        " This keyword starts with v and this is how you declare variable"
    ],

    "details": [
        "https://www.w3schools.com/js/js_function_parameters.asp",
        "https://www.w3schools.com/js/js_booleans.asp",
        "https://www.w3schools.com/js/js_loop_for.asp",
        "https://www.w3schools.com/jsref/jsref_return.asp",
        "https://www.w3schools.com/js/js_variables.asp"
    ],

    "guessWord": [],

    "realWord": [],
  
    startGame: function() {
        this.refreshDisplay();
    },

    updateCounters: function() {
        numGuess--;
        if (numGuess == 0)
        { 
            if (numRound == maxRounds - 1)
            {
                gameOver = true;
            }
            else
            {
                this.resetRound();
            }
        }
    },

    resetRound: function() {
        numMatchFound = 0;
        numGuess = maxGuess;
        numRound = numRound + 1;
        txtWord.textContent = " ";
        wordGuessGame.guessWord.length = 0;
        this.refreshDisplay();
    },

    refreshDisplay: function() {

        if (numRound == maxRounds)
        {
            gameOver = true;
            return;
        }
        txtRound.textContent = (numRound + 1) + " of " + maxRounds;
        txtGuess.textContent = numGuess + " of " + maxGuess;
        txtNumWin.textContent = numWin + " out of " + maxRounds;
        txtHint.textContent = "";
        
        
        var strWord = "";
        for (var j=0; j < wordGuessGame.words[numRound].length; j++) 
        {
            if (this.doesLetterExist(wordGuessGame.guessWord, wordGuessGame.words[numRound][j]))
            {   
                strWord =  strWord + wordGuessGame.words[numRound][j] + " ";
            }
            else
            {
                strWord =  strWord + "_" + " ";
            }
            txtWord.textContent = strWord;
        }

        var strGuesses;
        if (wordGuessGame.guessWord.length == 0)
        {
            strGuesses = "none";
        }
        else
        {
            strGuesses = "'";
            for (k=0; k < wordGuessGame.guessWord.length; k++)
            {
                strGuesses = strGuesses + wordGuessGame.guessWord[k].toUpperCase() + " ";
            }
            strGuesses = strGuesses + "'";
        }
        txtGuessed.textContent = strGuesses;
        },

    doesLetterExist: function(arr, key)
    {
        for (k=0; k < arr.length; k++)
        {
            if (key === arr[k])
            {
                return true;
            }
        }
        return false;
    },

    countMultiple: function(arr, key)
    {
        var count = 0;
        for (k=0; k < arr.length; k++)
        {
            if (arr.charAt(k) === key)
            {
                count++;
            }
        }
        return count;
    },

    processUserInput: function(key) 
    {
        if (this.doesLetterExist(wordGuessGame.guessWord, key))
        {   
            //alert("You have already guessed " + key.toUpperCase()); 
        }
        else    
        {
            this.guessWord.push(key);   
            this.updateCounters();
            this.refreshDisplay();
            var count = this.countMultiple(wordGuessGame.words[numRound], key)
            numMatchFound = numMatchFound + count;
            if (numMatchFound == wordGuessGame.words[numRound].length)
            {
                var strMessage;
                numWin++;
                strMessage = "Congratulations. ";
                strMessage = strMessage + "You can find more informatio about keyword "
                strMessage = strMessage + " " + wordGuessGame.words[numRound];
                strMessage = strMessage + " at " + wordGuessGame.details[numRound];
                txtDetails.textContent = strMessage;
                this.refreshDisplay();
                this.resetRound();
            }
        }  
    }
  };

function hintMe()
{
    txtHint.textContent = wordGuessGame.hints[numRound];
}

// Start game here...
wordGuessGame.startGame();

// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function(event) {
  if (event.which >= 65 && event.which <= 90) {
    if (gameOver)
    {
        alert("Game is over.");
    }
    else
    {
        wordGuessGame.processUserInput(event.key);
    } 
  }  
};
