// file Entity.mjs.

import { pickRandom, peasantJobs, peasantNames } from './helpers.mjs';

class Entity {
  constructor(name) {
    this.name = name;
  }

  act() { }
}

class Peasant extends Entity {
  constructor(name, job) {
    super(name);
    this.job = job || pickRandom(peasantJobs);
  }

  getRandomName() {
    return [pickRandom(peasantNames.firsts), pickRandom(peasantNames.lasts)].join(" ");
  }

  getJob() {
    return this.job;
  }

  getName() {
    return this.name;
  }

  getLongName() {
    return this.name + " the " + this.job;
  }
}

export class Player extends Peasant {
  constructor(name) {
    super(name, 'Hangman');
  }

  act() {
    // requestGuess();

    // submitGuess();
  }
}

export class HangedPerson extends Peasant {
  constructor(lives = 9) {
    super();
    this.name = super.getRandomName();
    this.lives = lives;
  }

  act() {
    return this.yelp();
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

    return pickRandom(painNoises);
  }

  loseLife() {
    this.lives -= 1;

    return this.yelp();
  }
}


const peasant = new HangedPerson();

console.log(peasant.getLongName());
