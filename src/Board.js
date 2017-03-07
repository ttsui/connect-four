import { EMPTY, GAME_RESULT, RED } from "./constants";
import InvalidMove from "./InvalidMove";
import _ from "lodash";

const WINNING_NUMBER_OF_CONNECTIONS = 4;

class Board {
  constructor(numberOfRows = 6, numberOfColumns = 7, initialState = []) {
    this._state = initialState;

    for (let i=0; i < numberOfRows; i++) {
      this._state.push(new Array(numberOfColumns).fill(EMPTY))
    }
  }

  dropTokenIntoColumn(token, column) {
    for (let row=this._state.length-1; row >= 0; row--) {
      if (this._state[row][column] === EMPTY) {
        this._state[row][column] = token;
        return;
      }
    }

    throw new InvalidMove("Column is full");
  }

  isGameOver() {
    let result = GAME_RESULT.INCOMPLETE;

    this._state.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell === EMPTY) {
          return;
        }

        if (this._isConnectFour(rowIdx, colIdx)) {
          if (cell === RED) {
            result = GAME_RESULT.RED_WINS;
          } else {
            result = GAME_RESULT.YELLOW_WINS;
          }
        }
      });
    });

    return result;
  }

  state() {
    return this._state;
  }

  _isConnectFour(rowIdx, colIdx) {
    const firstCell = this._state[rowIdx][colIdx];
    let isConnectedColumn = true;
    let isConnectedRow = true;
    let isConnectedTopToBottomDiagnol = true;
    let isConnectedBottomToTopDiagnol = true;

    for (let i=1; i < WINNING_NUMBER_OF_CONNECTIONS; i++) {
      isConnectedColumn = isConnectedColumn && (this._state[rowIdx + i][colIdx] === firstCell);
      isConnectedRow = isConnectedRow && (this._state[rowIdx][colIdx + i] === firstCell);
      isConnectedTopToBottomDiagnol = isConnectedTopToBottomDiagnol && (this._state[rowIdx + i][colIdx + i] === firstCell);
      isConnectedBottomToTopDiagnol = isConnectedBottomToTopDiagnol && (this._state[rowIdx + i][colIdx - i] === firstCell);
    }

    return isConnectedRow ||
           isConnectedColumn ||
           isConnectedTopToBottomDiagnol ||
           isConnectedBottomToTopDiagnol;
  }

  _printBoard() {
    this._state.forEach(row => console.log(row.join(" ")));
  }
}

export default Board
