import App from "../App";
import { EMPTY as _, RED as R, YELLOW as Y } from "../constants";

function boardToString(board) {
  return board.map(row => row.join(" ")).join("\n");
}

it("reads input from user then prints board", () => {
  const input = {
    question: jest.fn().mockImplementationOnce((prompt, callback) => callback("1")),
    close: jest.fn()
  };
  const output = jest.fn();

  const app = new App(input, output);

  app.start();

  expect(input.question).toHaveBeenCalled();
  expect(output).toHaveBeenLastCalledWith(boardToString([
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, R, _, _, _, _, _]
  ]));
});

it("closes input once the game is over", () => {
  const input = {
    question: jest.fn((prompt, callback) => callback("1")),
    close: jest.fn()
  };
  const output = jest.fn();

  const app = new App(input, output);

  app.start();

  expect(input.close).toHaveBeenCalledTimes(1);
});
