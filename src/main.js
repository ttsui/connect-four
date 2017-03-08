import readline from "readline";
import HumanPlayer from "./HumanPlayer";
import ComputerPlayer from "./ComputerPlayer";
import App from "./App";
import { RED, YELLOW } from "./constants";

const input =  readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const players = [
  new HumanPlayer(RED, input),
  new ComputerPlayer(YELLOW)
];

const onGameOver = () => { input.close(); };
new App(players).start(onGameOver);
