#!/usr/bin/env node

let prompt = require('prompt-sync')({
  sigint: true // lets you ctrl-c escape the program within the prompt
});

const condition = true;

do {
  condition = false;
  let input = prompt('sup?');

} while (condition == true);

console.log('hello world');
