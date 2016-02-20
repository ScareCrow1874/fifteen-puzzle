/*	This Javascript file adds functionality of playing fifteen puzzle game on
	webpage "fifteen puzzle". It involves moving a tile, shuffling for random
	arrangement and finding out moveable tiles.
*/

(function() { //a module for everything
	"use strict";

	var blankRow = 3;
	var blankCol = 3;

	window.onload = function() { //handling events when page is loaded
		generate();
		var squares = document.querySelectorAll(".puzzlepiece");
		for (var i = 0; i < squares.length; i++) {
			squares[i].onclick = oneMove;
			squares[i].onmouseover = highlight;
			squares[i].onmouseout = restore; //restores style when not hovered
		}
		document.getElementById("shufflebutton").onclick = shuffle;
	};

	function generate() { //generates the initial state for the game
		for (var i = 0; i < 15; i++) {
			var piece = document.createElement("div");
			piece.className = "puzzlepiece";
			var row = Math.floor(i / 4);
			var col = i % 4;
			piece.id = "square_" + row + "_" + col;
			piece.style.backgroundPosition = (-100 * col) + "px " + (-100 * row) + "px";
			piece.style.top = row * 100 + "px";
			piece.style.left = col * 100 + "px";
			piece.innerHTML = i + 1;
			document.getElementById("puzzlearea").appendChild(piece);
		}
	}

	function oneMove() { //makes one move
		move(this);
	}

	function shuffle() { //creates random game state
		var squares = document.querySelectorAll(".puzzlepiece");
		for (var i = 0; i < 1000; i++) { //pseudo random, moves 1000 times
			var neighbors = [];
			for (var j = 0; j < squares.length; j++) { //finds out moveable tiles
				var row = parseInt(window.getComputedStyle(squares[j]).top) / 100;
				var col = parseInt(window.getComputedStyle(squares[j]).left) / 100;
				if (canMove(row, col)) {
					neighbors.push(squares[j]);
				}
			}

			var pick = parseInt(Math.random() * neighbors.length); //randomly picks a tile
			move(neighbors[pick]);
		}
	}

	function highlight() { //highlights moveable tiles
		var row = parseInt(window.getComputedStyle(this).top) / 100;
		var col = parseInt(window.getComputedStyle(this).left) / 100;
		if (canMove(row, col)) { //adds designed style
			this.classList.add("highlight");
		} else { //adds standard cursor
			this.classList.add("default");
		}
	}

	function restore() { //deletes any highlight
		this.classList.remove("highlight");
		this.classList.remove("default");
	}

	function canMove(row, col) { //returns if tile at given place can move
		var samerow = Math.abs(blankRow - row) == 1 && Math.abs(blankCol - col) == 0;
		var samecol = Math.abs(blankRow - row) == 0 && Math.abs(blankCol - col) == 1;

		return samerow || samecol;	
	}

	function move(element) { //moves given tile
		var row = parseInt(window.getComputedStyle(element).top) / 100;
		var col = parseInt(window.getComputedStyle(element).left) / 100;

		if (canMove(row, col)) {
			element.style.top = blankRow * 100 + "px";
			element.style.left = blankCol * 100 + "px";
			element.id = "square_" + blankRow + "_" + blankCol;
			blankRow = row;
			blankCol = col;
		}
	}
})();