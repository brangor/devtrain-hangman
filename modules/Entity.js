// file Entity.js.

import { pickRandom, peasantJobs, peasantNames } from './helpers.js';
import { Guess } from './Guess.js';

const states = {
  great: "great",
  awful: "awful",
  okay: "okay",
  wounded: "wounded",
  dying: "dying",
  dead: "dead",
}

const thresholds = {
  [states.great]: 100,
  [states.okay]: 60,
  [states.awful]: 9,
  [states.wounded]: 7,
  [states.dying]: 3,
  [states.dead]: 0,
}

class Entity {
  constructor(name, health = 100, state = states.okay) {
    this.name = name;
    this.health = health;
    this.state = state;
  }

  setName(name) {
    this.name = name;
  }

  getState() {
    if (this.health <= thresholds[states.dead]) {
      this.state = states.dead;
    } else if (this.health <= thresholds[states.dying]) {
      this.state = states.dying;
    } else if (this.health <= thresholds[states.wounded]) {
      this.state = states.wounded;
    } else if (this.health <= thresholds[states.okay]) {
      this.state = states.okay;
    } else if (this.health <= thresholds[states.great]) {
      this.state = states.great;
    }
    return this.state;
  }

  getName() {
    return this.name;
  }

  isDead() {
    return this.getState() === states.dead;
  }
}

export class Peasant extends Entity {
  constructor(name, job) {
    super(name);
    this.name = (name || this.getRandomName());
    this.job = (job || this.getRandomJob());
  }

  getRandomName() {
    return [pickRandom(peasantNames.firsts), pickRandom(peasantNames.lasts)].join(" ");
  }

  getRandomJob() {
    return pickRandom(peasantJobs);
  }

  getJob() {
    return this.job;
  }

  getLongName() {
    return this.getName() + " the " + this.job;
  }

  says(message) {
    return `${this.getLongName()} says: "${message}"`;
  }
}

export class Player extends Peasant {
  constructor(name) {
    super(name, 'Hangman');
    this.guesses = [];
  }

  saveGuess(guess) {
    this.guesses.push(guess);
  }

  guess(prompt) {
    const guess = new Guess(prompt);
    return guess;
  }
}

export class HangedPerson extends Peasant {
  constructor(health = 9) {
    super();
    this.name = super.getRandomName();
    this.health = health;
  }

  yelp() {
    const painNoises = [
      "owowow",
      "yeoouch",
      "i can't feel my leg",
      "that's smarts",
      "pull it together!",
      "nonononono",
      "i need my momma",
      "augghhh",
      "aw jeez, this is it",
      "tell me ma i love her",
    ];

    this.health -= 1;
    return this.says(pickRandom(painNoises));
  }

  takeDamage() {
    this.health -= 1;
    return this.says(this.yelp());
  }
}
