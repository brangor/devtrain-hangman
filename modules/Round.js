// file Round.js.

export class Round {
  constructor(game) {
    this.player = game.player;
    this.guess = null;
  }

  perform() {
    this.promptGuess();
  }

  promptGuess(player) {
    let guess;
    do {
      guess = new Guess(promptSync("guess a letter: "));
      this.game.getIssuesWithGuess(guess).forEach(issue => console.log(issue));
    } while (!guess.valid);

    player.addGuess(guess);
  }
}
