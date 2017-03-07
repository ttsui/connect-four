import { EMPTY } from "./constants";
import InvalidMove from "./InvalidMove";

class Board {
  constructor(numberOfRows = 6, numberOfColumns = 7) {
    this._state = [];

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

  state() {
    return this._state;
  }
}

export default Board
