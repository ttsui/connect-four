import ComputerPlayer from "../ComputerPlayer";
import { RED as R, EMPTY as _ } from "../constants";

it("place token in first column with an empty space", () => {
  const moveCallback = jest.fn();
  let boardState =[
    [_, _],
    [_, _]
  ];

  const player = new ComputerPlayer(R, { state: () => boardState });
  player.getMove(moveCallback);
  expect(moveCallback).toHaveBeenCalledWith(R, 1);

  boardState =[
    [R, _],
    [R, _]
  ];
  player.getMove(moveCallback);
  expect(moveCallback).toHaveBeenCalledWith(R, 2);
});
