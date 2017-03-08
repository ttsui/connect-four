import App from "../App";
import HumanPlayer from "../HumanPlayer";
import ComputerPlayer from "../ComputerPlayer";
import { EMPTY as _, RED as R, YELLOW as Y } from "../constants";

function boardToString(board) {
  return board.map(row => row.join(" ")).join("\n");
}

it("reads input from user then prints board", () => {
  const input = {
    question: jest.fn().mockImplementationOnce((prompt, callback) => callback("2")),
    close: jest.fn()
  };
  const output = jest.fn();

  const players = [ new HumanPlayer(R, input) ];
  const app = new App(players, output);
  app.start();

  expect(input.question).toHaveBeenCalled();
  expect(output).toHaveBeenCalledWith(boardToString([
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, R, _, _, _, _, _],
    [1, 2, 3, 4, 5, 6, 7]
  ]));
});

it("calls game over callback when the game is over", () => {
  const output = jest.fn();
  const onGameOver = jest.fn();

  const players = [ new ComputerPlayer(R) ];
  const app = new App(players, output);
  app.start(onGameOver) ;

  expect(onGameOver).toHaveBeenCalled();
});

it("show an error message when an invalid column is given, and prompt again", () => {
  const input = {
    question: jest.fn().mockImplementationOnce((prompt, callback) => callback("99")),
    close: jest.fn()
  };
  const output = jest.fn();

  const players = [ new HumanPlayer(R, input) ];
  const app = new App(players, output);
  app.start();

  expect(output).toHaveBeenCalledWith("Invalid column number: 99");
});
