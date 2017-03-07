import Board from "../Board";
import { EMPTY as _, YELLOW as Y, RED as R} from "../constants";

it("initial state of board is empty", () => {
  const expected =
    [
      [_, _, _, _, _, _, _],
      [_, _, _, _, _, _, _],
      [_, _, _, _, _, _, _],
      [_, _, _, _, _, _, _],
      [_, _, _, _, _, _, _],
      [_, _, _, _, _, _, _]
    ];
  const board = new Board();

  const state = board.state();

  expect(state.length).toEqual(6);
  expect(state[0].length).toEqual(7);
  expect(state).toEqual(expect.arrayContaining(expected));
});
