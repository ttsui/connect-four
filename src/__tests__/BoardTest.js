import Board from "../Board";
import { EMPTY as _, YELLOW as Y, RED as R} from "../constants";
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
