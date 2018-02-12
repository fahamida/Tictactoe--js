// functions checktie, turn,minimax and click turn were inspired from similar functions found on this page: https://github.com/beaucarnes/fcc-project-tutorials/blob/master/tictactoe/7/script.js

//declaring variables
var origBoard;
var you;
var computer;

const cells = document.querySelectorAll('.cell');
  document.querySelector(".winnerDisplay").style.display = "none";
document.querySelector("#choose").style.display = "block";

// function to allow player to choose a letter
function myLetter() {

  if (document.getElementById("x").checked == true) {
    you = document.getElementById("x").value;
    computer = document.getElementById("o").value;
    console.log(you);
  } else if (document.getElementById("o").checked == true) {
    you = document.getElementById("o").value;
    computer = document.getElementById("x").value;
    console.log(you);
  }else{
    you = document.getElementById("x").value;
    computer = document.getElementById("o").value;
  }
}

// function to start the game
function startGame(){
  
 document.querySelector(".winnerDisplay").style.display = "none";
 origBoard = Array.from(Array(9).keys());
 document.querySelector("#choose").style.display = "none"; 
 document.querySelector("#game1").style.display = "block";
	for (var i = 0 ; i < origBoard.length; i++){
	cells[i].innerText = '';
//	cells[i].style.removeProperty('background-color');
	cells[i].addEventListener('click', turnClick, false);
  }
}

//
function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, you)
		if (!checkTie()) turn(bestSpot(), computer);
	}
}

//
function turn(squareId, player) {
  origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
let gameWon = checkWin(origBoard, player)
if (gameWon) gameOver(gameWon)  
}

//function to check for a win
function checkWin(board, player) {
   if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    )
   {
        return true;
    } else {
        return false;
    }
}

//function gameover determines the winner
function gameOver(gameWon) {

	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == you ? "You win!" : "You lose!");
}
//function to dispaly the winner
function declareWinner(x) {
	document.querySelector(".winnerDisplay").style.display = "block";
	document.querySelector(".winnerDisplay .text").innerText = x;
    document.querySelector("#game1").style.display = "none";
document.querySelector("#choose").style.display = "none";
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, computer).index;
}
//function to check for a tie
function checkTie() {
if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].removeEventListener('click', turnClick, false);
		}
  		declareWinner("Tie Game!")
		return true;
	}
	return false;
}

//minimax function
function minimax(newBoard, player) {
	var availSpots = emptySquares(newBoard);

if (checkWin(newBoard, player)) {
		return {score: -10};
	} else if (checkWin(newBoard, computer)) {
		return {score: 20};
	} else if (availSpots.length === 0) {
    return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
 		newBoard[availSpots[i]] = player;

		if (player == computer) {
			var result = minimax(newBoard, you);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, computer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === computer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}