// file Screen.js.

import size from 'window-size';

import promptSync from 'prompt-sync';

const CONFIG = {
  instream: promptSync(),
  outstream: process.stdout
}

export class Screen {
  constructor(
    input = CONFIG.instream,
    output = CONFIG.outstream,
    height = size.height,
    width = size.width
  ) {
    this.input = input;
    this.output = output;
    this.height = height;
    this.width = width;
  }

  prompt(prompt) {
    return this.input(prompt);
  }

  write(output) {
    this.output.write(String(output));
  }

  clear() {
    console.log("\x1B[2J\n\n");
  }
}

// const screen = new Screen()
// screen.clear();
// screen.out("Hello World!\n");
// const name = screen.in("What is your name? ");

// screen.out(`Hello ${name}!\n`);
