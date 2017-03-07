import readline from "readline";
import _ from "lodash";
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
    this._printBoard();
    this._getInput();
  }

  _getInput() {
    this._input.question("Enter column number: ", column => {
      try {
        this._board.dropTokenIntoColumn(RED, parseInt(column) - 1);
        this._printBoard();
      } catch (e) {
        this._output(e.message);
      }

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
    const columnNumbers = _.range(1, 8).join(" ");
    const output = this._board.state().map(row => row.join(" ")).join("\n");

    this._output(`${output}\n${columnNumbers}`);
  }
}

export default App
