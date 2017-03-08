import ComputerPlayer from "../ComputerPlayer";
import { RED as R, EMPTY as _ } from "../constants";

it("place token in first column with an empty space", () => {
  const moveCallback = jest.fn();
  let boardState =[
    [_, _],
    [_, _]
  ];
  let board = {
    state: () => boardState
  };

  const player = new ComputerPlayer(R);
  player.getMove(board, moveCallback);
  expect(moveCallback).toHaveBeenCalledWith(R, 1);

  boardState =[
    [R, _],
    [R, _]
  ];
  player.getMove(board, moveCallback);
  expect(moveCallback).toHaveBeenCalledWith(R, 2);
});
