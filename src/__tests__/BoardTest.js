import Board from "../Board";
import {
  EMPTY as _,
  YELLOW as Y,
  RED as R,
  GAME_RESULT
} from "../constants";
import InvalidMove from "../InvalidMove";

let board;

function fillBoard() {

}

beforeEach(() => {
  board = new Board();
});

it("initial state of board is empty", () => {
  const state = board.state();

  expect(state.length).toEqual(6);
  expect(state[0].length).toEqual(7);
  expect(state).toEqual([
                          [_, _, _, _, _, _, _],
                          [_, _, _, _, _, _, _],
                          [_, _, _, _, _, _, _],
                          [_, _, _, _, _, _, _],
                          [_, _, _, _, _, _, _],
                          [_, _, _, _, _, _, _]
                        ]);
});

it("tokens can be dropped into given column", () => {
  board.dropTokenIntoColumn(R, 2);
  board.dropTokenIntoColumn(Y, 2);

  expect(board.state()).toEqual([
                                  [_, _, _, _, _, _, _],
                                  [_, _, _, _, _, _, _],
                                  [_, _, _, _, _, _, _],
                                  [_, _, _, _, _, _, _],
                                  [_, _, Y, _, _, _, _],
                                  [_, _, R, _, _, _, _]
                                ]);
});

it("exception thrown when dropping token into full column", () => {
  const smallBoard = new Board(1, 1);
  smallBoard.dropTokenIntoColumn(R, 0);

  const dropTokenIntoFullColumn = () => smallBoard.dropTokenIntoColumn(R, 0);

  expect(dropTokenIntoFullColumn).toThrowError("Column is full");
  expect(dropTokenIntoFullColumn).toThrowError(InvalidMove);
});

it("exception thrown when dropping token with an invalid column number", () => {
  const smallBoard = new Board(1, 1);

  const dropTokenIntoInvalidColumn = () => smallBoard.dropTokenIntoColumn(R, 2);

  expect(dropTokenIntoInvalidColumn).toThrowError("Invalid column number: 3");
  expect(dropTokenIntoInvalidColumn).toThrowError(InvalidMove);
});

it("isGameOver() returns winningToken when there is a winning sequence of tokens", () => {
  const theBoard = (state) => (new Board(5, 5, state));

  const columnConnectFour = theBoard([
    [_, _, _, _, _],
    [R, _, _, _, _],
    [R, _, _, _, _],
    [R, _, _, _, _],
    [R, _, _, _, _]
  ]);
  expect(columnConnectFour.isGameOver()).toEqual({ status: GAME_RESULT.WINNER, winningToken: R });

  const rowConnectFour = theBoard([
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, Y, Y, Y, Y]
  ]);
  expect(rowConnectFour.isGameOver()).toEqual({ status: GAME_RESULT.WINNER,
                                                winningToken: Y });

  const topToBottomDiagnolConnectFour = theBoard([
    [_, _, _, _, _],
    [_, R, _, _, _],
    [_, Y, R, _, _],
    [_, Y, Y, R, _],
    [_, Y, Y, R, R]
  ]);
  expect(topToBottomDiagnolConnectFour.isGameOver()).toEqual({
                                                       status: GAME_RESULT.WINNER,
                                                       winningToken: R
                                                     });

  const bottomToTopDiagnolConnectFour = theBoard([
    [_, _, _, _, _],
    [_, _, _, R, _],
    [_, _, R, Y, _],
    [_, R, Y, Y, _],
    [R, Y, Y, R, _]
  ]);
  expect(bottomToTopDiagnolConnectFour.isGameOver()).toEqual({
                                                       status: GAME_RESULT.WINNER,
                                                       winningToken: R
                                                     });
});

it("isGameOver() returns INCOMPLETE when there are still moves possible ", () => {
  const theBoard = (state) => (new Board(5, 5, state));

  const gameNotOver = theBoard([
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, _, _, _, _],
    [R, R, Y, R, _]
  ]);

  expect(gameNotOver.isGameOver()).toEqual({ status: GAME_RESULT.INCOMPLETE });
});

it("isGameOver() returns DRAW when there are no more moves possible ", () => {
  const theBoard = (state) => (new Board(4, 4, state));

  const draw = theBoard([
    [R, Y, R, R],
    [Y, R, Y, Y],
    [R, R, Y, Y],
    [R, R, Y, R]
  ]);

  expect(draw.isGameOver()).toEqual({ status: GAME_RESULT.DRAW });
});

it("validMoves() returns column numbers where a valid move can be made", () => {
  const smallBoard = new Board(2, 2);

  expect(smallBoard.validMoves()).toEqual([0, 1]);

  smallBoard.dropTokenIntoColumn(R, 0);
  smallBoard.dropTokenIntoColumn(R, 0);
  expect(smallBoard.validMoves()).toEqual([1]);

});
