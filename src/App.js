import readline from "readline";
import _ from "lodash";
import Board from "./Board";
import { RED, YELLOW, GAME_RESULT } from "./constants";
import HumanPlayer from "./HumanPlayer";

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
      new HumanPlayer(YELLOW, this._input)
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
      this._output("Game result is: ", gameResult);
    } else {
      this._nextTurn();
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
