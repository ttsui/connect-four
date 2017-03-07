import App from "../App";

it("reads column from user", () => {
  const input = {
    question: jest.fn((prompt, callback) => callback("1")),
    close: jest.fn()
  };
  const output = jest.fn();

  const app = new App(input, output);

  app.start();

  expect(output).toHaveBeenLastCalledWith("Game result is: ", "RED_WINS");
})
