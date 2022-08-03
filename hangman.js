#!/usr/bin/env node

let prompt = require('prompt-sync')({
  sigint: true // lets you ctrl-c escape the program within the prompt
});

const LIVES = 9;

const guesses = [];

console.log("you have started a game of hangman");

const SECRETWORD = "onomatopoeia".toUpperCase();
console.log("i have secretly picked a word for you to guess");

console.log("status:", "_ ".repeat(SECRETWORD.length));

let correctGuesses = [];
let secretReveal;
do {
  let guess = "";
  do {
    guess = prompt("guess a letter: ").toUpperCase().trim().substring(0, 1);
  } while( guess.length == 0 )

  guesses.push(guess);

  secretReveal = SECRETWORD;
  correctGuesses = [];

  for (let h = 0; h < guesses.length; h++) {
    let charChecked = guesses[h];
    if (SECRETWORD.toUpperCase().includes(charChecked)) {
      correctGuesses.push(charChecked);
    }
  }

  for (let i = 0; i < secretReveal.length; i++) {
    let char = secretReveal.charAt(i);
    if (!correctGuesses.includes(char)) {
      secretReveal = secretReveal.replace(char, '_');
    }
  }

  console.log("status:", secretReveal.split(''). join(' '));

  if (SECRETWORD.includes(guess)) {
    console.log("you correctly guessed a letter in the secret word");
  } else {
    console.log("that letter is not in the secret word so you lose a life");
  }

  console.log(`you have ${LIVES - (guesses.length - correctGuesses.length)} lives left\n`);

} while ((LIVES - guesses.length + correctGuesses.length) > 0 && secretReveal.includes('_'));

if (secretReveal.includes('_')) {
  console.log("you lost all your lives and so you lose the game");
  console.log("i will reveal the word to you, it was", SECRETWORD);
} else {
  console.log("you guessed all the letters and so you won");
}
