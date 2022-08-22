#!/usr/bin/env node
// file Game.js.

import { Peasant, Player, HangedPerson } from './Entity.js';
import { Guess } from './Guess.js';
import { pickRandom } from './helpers.js';
import { Screen } from './Screen.js';

const messages = {
  welcome: "Welcome to the game of hangman.\n",
  goodbye: "Thanks for playing.\n",
  gameOver: "Game over.\n",
  win: "You win!\n",
  lose: "You lose.\n",
  goodGuess: "Good guess!\n",
  badGuess: "Bad guess.\n",
  greetings: "Hello, ",
  validGuess: "Valid guess.\n",
  invalidGuess: "Invalid guess.\n",
  tryAgain: "Try again.\n",
}

const states = {
  won: "won",
  lost: "lost",
  active: "active",
}

export class Game {
  constructor(dictionary) {
    this.secret = pickRandom(dictionary);
    this.secretWord = this.secret.word.toUpperCase();

    this.player = new Player();
    this.victim = new HangedPerson(9);
    this.screen = new Screen();
    this.debug("secret word is " + this.secretWord);
  }

  start() {
    this.player.setName(this.prompt("What is your name? "));
    this.print(messages.greetings + this.player.getName());

    while (!this.gameOver()) {
      let guess;
      do {
        guess = new Guess(this.prompt("guess a letter: "));
        this.debug(guess + " " + guess.valid);

        if (!guess.valid) {
          this.print(messages.invalidGuess);
          this.print(messages.tryAgain);
        }
      } while (!guess.valid);

      const issues = this.getIssuesWithGuess(String(guess));

      this.player.saveGuess(String(guess));

      if (issues.length === 0) {
        this.print(messages.goodGuess);
      } else {
        issues.forEach(issue => this.print(issue));
        this.print(this.victim.yelp());
      }

      this.showStatus();
    }

    if (this.getState() === states.won) {
      this.print(messages.win);
    } else {
      this.print(messages.lose);
    }

  }

  debug(msg) {
    this.print("DEBUG: " + String(msg));
  }

  print(output) {
    this.screen.write(String(output + "\n"));
  }

  prompt(prompt) {
    return this.screen.prompt(prompt);
  }

  showStatus() {
    this.debug('guesses so far: ' + this.player.guesses)
    this.debug('lives left: ' + this.victim.health);
    this.print(`Status: ${this.revealWord(this.player.guesses)}`);
  }

  revealWord(guesses) {
    const hiddenCharactersRegex = /[a-zA-Z]/g;

    return this.secretWord.replace(hiddenCharactersRegex, character => {
      return guesses.includes(character) ? character : '_';
    });
  }

  getIssuesWithGuess(guess) {
    const issues = [];
    if (this.player.guesses.includes(String(guess))) {
      issues.push("You've already guessed that letter");
      return issues;
    }
    if (!this.secretWord.includes(String(guess))) {
      issues.push("That letter isn't in the word");
      return issues;
    }
    return issues;
  }

  getState() {
    if (this.victim.isDead() || this.player.isDead()) {
      return states.lost;
    } else if (this.revealWord(this.player.guesses) === this.secretWord) {
      return states.won;
    } else {
      return states.active;
    }
  }

  gameOver() {
    return this.getState() !== states.active;
  }
}
