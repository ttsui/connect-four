import { EMPTY } from "./constants";

class ComputerPlayer {
  constructor(token) {
    this._token = token;
  }

  getMove(board, callback) {
    const columnWithSpace = board.state()[0].indexOf(EMPTY);

    if (columnWithSpace !== -1) {
      callback(this._token, columnWithSpace + 1);
    }
  }
}

export default ComputerPlayer;
