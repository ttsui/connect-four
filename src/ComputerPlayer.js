import { EMPTY } from "./constants";

class ComputerPlayer {
  constructor(token, board) {
    this._token = token;
    this._board = board;
  }

  getMove(callback) {
    const columnWithSpace = this._board.state()[0].indexOf(EMPTY);

    if (columnWithSpace !== -1) {
      callback(this._token, columnWithSpace + 1);
    }
  }
}

export default ComputerPlayer;
