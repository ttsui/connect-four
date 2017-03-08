
class HumanPlayer {
  constructor(token, input) {
    this._token = token;
    this._input = input;
  }

  getMove(callback) {
    this._input.question("Enter column number: ", column => {
      callback(this._token, parseInt(column));
    });
  }
}

export default HumanPlayer;
