import readline from "readline";
import Board from "./Board";
import { RED, GAME_RESULT } from "./constants";

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
  }

  start() {
    this._getInput();
  }

  _getInput() {
    this._input.question("Enter column number: ", column => {
      this._board.dropTokenIntoColumn(RED, parseInt(column));

      this._printBoard();

      const gameResult = this._board.isGameOver();
      if (gameResult !== GAME_RESULT.INCOMPLETE) {
        this._input.close();
        this._output("Game result is: ", gameResult);
      } else {
        this._getInput();
      }
    });
  }

  _printBoard() {
    this._board.state().forEach(row => this._output(row.join(" ")));
  }
}

export default App
