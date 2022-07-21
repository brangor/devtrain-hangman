#!/usr/bin/env node
// @ts-check

let prompt = require('prompt-sync')({
  sigint: true // lets you ctrl-c escape the program within the prompt
});

const LIVES = 9;
const SECRETWORD = "GUTSY";

const guesses = [];

const painSounds = [
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

const HANGPERSON = "HANGPERSON says: ";
const SCOUNDREL = "SCOUNDREL says: ";

console.log(HANGPERSON + "WELCOME to HANGPERSON");
console.log(HANGPERSON + "GUESS the WORD or the SCOUNDREL DIES");

do {
  console.log(`
  HANGPERSON STATUS:
  ${LIVES - guesses.length}/${LIVES} guesses left
  `);

  let correctGuesses = [];
  for (let h = 0; h < guesses.length; h++) {
    console.log(`DEBUG: looking at you, kid`);
    let charChecked = guesses[h].toUpperCase();
    console.log(`DEBUG: looking at ${charChecked}`);
    if (SECRETWORD.toUpperCase().includes(charChecked)) {
      correctGuesses.push(charChecked);
      console.log(`DEBUG: correctGuesses updated, now ${correctGuesses}`)
    }
  }

  let secretReveal = SECRETWORD;

  for (let i = 0; i < secretReveal.length; i++) {
    let char = secretReveal.charAt(i).toUpperCase();
    console.log(`DEBUG: checking ${i}th character of ${secretReveal}`);
    if (correctGuesses.includes(char)) {
      console.log(`DEBUG: guesses includes ${char}`);
      correctGuesses[correctGuesses.lastIndexOf(char)] = '?'
      console.log(`DEBUG: correctGuesses updated, now ${correctGuesses}`)
    } else {
      console.log(`DEBUG: guesses doesnt include ${char}`);
      secretReveal = secretReveal.replace(char, '_');
      console.log(`DEBUG: secretReveal updated, now ${secretReveal}`)
    }
  }

  console.log(HANGPERSON + `HERE's what you've GUESSED so FAR:
  ${secretReveal.split(''). join(' ')}
  `);

  let guess = prompt(HANGPERSON + 'any LAST words?').toUpperCase();

  if (guess.length != 1) {
    console.log(HANGPERSON+"ONE CHARACTER at a TIME, ya RASCAL");
    continue;
  } else {
    guesses.push(guess);
  }

  console.log(`DEBUG: guesses includes ${guesses.toString}`);

  if (SECRETWORD.includes(guess)) {
    console.log(HANGPERSON + "That's ONE of 'EM!");
  } else {
    console.log(SCOUNDREL + painSounds[Math.floor(Math.random()*painSounds.length)]);
  }

} while (guesses.length < LIVES); // could represent whether the letters all exist in the guesses or guesses > LIVES
//!SECRETWORD.includes(guesses.toString) &&

console.log('hello world');

function debug(msg) {
  return "DEBUG MSG: " + msg;
}
