import { EMPTY } from "./constants";

class Board {
  constructor(numberOfRows = 6, numberOfColumns = 7) {
    this._state = [];

    for (let i=0; i < numberOfRows; i++) {
      this._state.push(new Array(numberOfColumns).fill(EMPTY))
    }
  }

  state() {
    return this._state;
  }
}

export default Board
