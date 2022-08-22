// file Guess.js.

const validityRegex = /^[A-Z]{1}$/i;
export class Guess {
  constructor(guess) {
    this.value = String(guess).toUpperCase();
    this.valid = validityRegex.test(this.value);
  }

  toString() {
    return (this.valid ? this.value : null);
  }
}
