import HumanPlayer from "../HumanPlayer";
import { RED } from "../constants";

it("reads input from player", () => {
  const input = {
    question: jest.fn((prompt, callback) => callback("1")),
    close: jest.fn()
  };

  const moveCallback = jest.fn();
  const player = new HumanPlayer(RED, input);
  player.getMove(null, moveCallback);

  expect(moveCallback).toHaveBeenCalledWith(RED, 1);
});
