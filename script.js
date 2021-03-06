// array that keeps track of what is 
// in each square of our tic-tac-toe board
var original_board;
const human_player = 'O';
// const human_player_one = 'X';
// const human_player_two = 'O';
const ai_player = 'X';

const winning_combinations = [
	["0", "1", "2"],
	["3", "4", "5"],
	["6", "7", "8"],
	["0", "3", "6"],
	["1", "4", "7"],
	["2", "5", "8"],
	["0", "4" ,"8"],
	["2", "4" ,"6"],  
];

//const cells = document.querySelectorAll('.cell');
const cells = document.getElementsByClassName('cell');
startGame();
var turn_decider = 0;
var number_of_plays = 0;

function startGame() {
	//document.querySelector(".endgame").style.display = "none";
	original_board = Array.from(Array(9).keys());

	for (var i = 0; i < cells.length; i++)
	{
		cells[i].innerText = ' ';
		cells[i].addEventListener('click', turnClick, false);
		//console.log(cells[i].innerText);
	}

	turn_decider = 0;
	number_of_plays = 0;
	document.getElementById("tiedgame").style.display = "none";
	document.getElementById("endgame").style.display = "none";
}

function whos_turn()
{
	if (turn_decider % 2 == 0)
	{
		turn_decider++;
		return 0;
	}
	else
	{
		turn_decider++;
		return 1;
	}
}

function turnClick(square) {
	var decider = whos_turn();
	if (decider == 0)
	{
		turn (square.target.id, ai_player);
	}
	else
	{
		turn (square.target.id, human_player);
	}

}

function turn (squareId, player) {
	number_of_plays++;
	original_board[squareId] = player;
	document.getElementById(squareId).innerText = player;
	document.getElementById(squareId).removeEventListener('click', turnClick);
	let gameWon = checkGameOver(original_board, player);

	if (gameWon)
	{
		document.getElementById("endgame").style.display = "block";
		// remove event listeners for all cells
		for (var i = 0; i < cells.length; i++)
		{
			cells[i].removeEventListener('click', turnClick);
		}
	}

	if (number_of_plays == 9 && !gameWon)
	{
		document.getElementById("tiedgame").style.display = "block";
	}

}

function arrayContainsArray (superset, subset) {
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}

function checkGameOver(board, player) {
	// collect all id's of cells where player has already clicked
	var used_squares = [];
	for (var i = 0; i < board.length; i++)
	{
		if (cells[i].innerText === player)
		{
			used_squares.push(cells[i].id);
		}
	}
	// console.log(used_squares);

	var game_over = false;

	if (used_squares.length >= 3)
	{
		// check if any 3 cells lie in the winning winning_combinations
		for (var i = 0; i < winning_combinations.length; i++)
		{
			//console.log(used_squares);
			if (arrayContainsArray(used_squares, winning_combinations[i]))
			{
				game_over = true;
				//console.log("GAME OVER");
				break;
			}
			//console.log(winning_combinations[i]);
		}
	}

	return game_over;
}

function gameOver() {
	startGame();	
}