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

  expect(dropTokenIntoFullColumn).toThrowError("Column is full")
  expect(dropTokenIntoFullColumn).toThrowError(InvalidMove);
});

it("isGameOver() returns winner when there is a winning sequence of tokens", () => {
  const theBoard = (state) => (new Board(5, 5, state));

  const columnConnectFour = theBoard([
    [_, _, _, _, _],
    [R, _, _, _, _],
    [R, _, _, _, _],
    [R, _, _, _, _],
    [R, _, _, _, _]
  ]);
  expect(columnConnectFour.isGameOver()).toEqual(GAME_RESULT.RED_WINS);

  const rowConnectFour = theBoard([
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, Y, Y, Y, Y]
  ]);
  expect(rowConnectFour.isGameOver()).toEqual(GAME_RESULT.YELLOW_WINS);

  const topToBottomDiagnolConnectFour = theBoard([
    [_, _, _, _, _],
    [_, R, _, _, _],
    [_, Y, R, _, _],
    [_, Y, Y, R, _],
    [_, Y, Y, R, R]
  ]);
  expect(topToBottomDiagnolConnectFour.isGameOver()).toEqual(GAME_RESULT.RED_WINS);

  const bottomToTopDiagnolConnectFour = theBoard([
    [_, _, _, _, _],
    [_, _, _, R, _],
    [_, _, R, Y, _],
    [_, R, Y, Y, _],
    [R, Y, Y, R, _]
  ]);
  expect(bottomToTopDiagnolConnectFour.isGameOver()).toEqual(GAME_RESULT.RED_WINS);
});

it("isGameOver() returns INCOMPLETE when there are still moves possible ", () => {
  const theBoard = (state) => (new Board(5, 5, state));

  const noWinner = theBoard([
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, _, _, _, _],
    [R, R, Y, R, _]
  ]);
  expect(noWinner.isGameOver()).toEqual(GAME_RESULT.INCOMPLETE);
});
