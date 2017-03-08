import App from "../App";
import { EMPTY as _, RED as R, YELLOW as Y } from "../constants";

function boardToString(board) {
  return board.map(row => row.join(" ")).join("\n");
}

it("reads input from user then prints board", () => {
  const input = {
    question: jest.fn().mockImplementationOnce((prompt, callback) => callback("2"))
                       .mockImplementationOnce((prompt, callback) => callback("1")),
    close: jest.fn()
  };
  const output = jest.fn();

  const app = new App(input, output);

  app.start();

  expect(input.question).toHaveBeenCalled();
  expect(output).toHaveBeenCalledWith(boardToString([
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [_, _, _, _, _, _, _],
    [Y, R, _, _, _, _, _],
    [1, 2, 3, 4, 5, 6, 7]
  ]));
});

it("closes input once the game is over", () => {
  let turnNumber = 0;
  const input = {
    question: jest.fn((prompt, callback) => {
      callback(turnNumber++);
    }),
    close: jest.fn()
  };
  const output = jest.fn();

  const app = new App(input, output);

  app.start();

  expect(input.close).toHaveBeenCalledTimes(1);
});

it("show an error message when an invalid column is given, and prompt again", () => {
  const input = {
    question: jest.fn().mockImplementationOnce((prompt, callback) => callback("99")),
    close: jest.fn()
  };
  const output = jest.fn();

  const app = new App(input, output);

  app.start();

  expect(output).toHaveBeenCalledWith("Invalid column number: 99");
});
