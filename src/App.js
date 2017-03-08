import readline from "readline";
import _ from "lodash";
import Board from "./Board";
import { RED, YELLOW, GAME_RESULT } from "./constants";
import HumanPlayer from "./HumanPlayer";
import ComputerPlayer from "./ComputerPlayer";

function createInput() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

class App {
  constructor(input = createInput(), output = console.log) {
    this._board = new Board();
    this._input = input;
    this._output = output
    this._turnNumber = 0;
    this._players = [
      new HumanPlayer(RED, this._input),
      new ComputerPlayer(YELLOW, this._board)
    ];
  }

  start() {
    this._printBoard();
    this._nextTurn();
  }

  _checkForEndGame() {
    const gameResult = this._board.isGameOver();

    if (gameResult !== GAME_RESULT.INCOMPLETE) {
      this._input.close();
      this._output(this._gameOverMessage(gameResult));
    } else {
      this._nextTurn();
    }
  }

  _gameOverMessage(gameResult) {
    let message = "Game Over: ";

    switch (gameResult) {
      case GAME_RESULT.RED_WINS:
        return message + "Red player wins!"
      case GAME_RESULT.YELLOW_WINS:
        return message + "Yellow player wins!"
      case GAME_RESULT.RED_WINS:
        return message + "It's a draw."
    }
  }

  _nextTurn() {
    const validMoves = this._board.validMoves().map(c => c+1).join(", ");
    this._output(`Valid column numbers: ${validMoves}`);

    const currentPlayer = this._players[this._turnNumber % this._players.length];
    currentPlayer.getMove((token, column) => {
      try {
        this._board.dropTokenIntoColumn(token, column - 1);
        this._printBoard();
        this._turnNumber = this._turnNumber + 1;
      } catch (e) {
        this._output(e.message);
      }

      this._checkForEndGame();
    });
  }

  _printBoard() {
    const columnNumbers = _.range(1, 8).join(" ");
    const output = this._board.state().map(row => row.join(" ")).join("\n");

    this._output(`${output}\n${columnNumbers}`);
  }
}

export default App
