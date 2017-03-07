import Board from "../Board";
import { EMPTY as _, YELLOW as Y, RED as R} from "../constants";

let board;

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
