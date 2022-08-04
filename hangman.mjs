#!/usr/bin/env node

const dictionaryFile = './lib/dictionary.json';

import { readFile } from 'fs/promises';
import promptSync from 'prompt-sync';

const CONFIG = {
  instream: promptSync(),
  outstream: process.stdout
}

async function main() {
  const dictionary =
    JSON.parse(
      await readFile(dictionaryFile, import.meta.file)
    );

  const secretWord = selectRandomWord(dictionary);

  game(secretWord, CONFIG.outstream, CONFIG.instream);
}

main();

function selectRandomWord( wordList ) {
  let wordCount = Object.values(wordList).length;
  let randomIndex = Math.floor(Math.random() * wordCount);
  let randomWord = Object.values(wordList)[randomIndex];
  return randomWord;
}

function game( secret, outstream, instream ) {

  const LIVES = 9;
  const guesses = [];

  output("welcome to hangman", outstream);

  const SECRETWORD = secret["word"].toUpperCase();

  output("status: " + hideLetters(SECRETWORD, correctGuesses(SECRETWORD, guesses)), outstream);

  let secretReveal;
  do {
    let guess = "";
    do {
      guess = input("guess a letter: ", instream).toUpperCase().trim().substring(0, 1);
    } while( guess.length == 0 )

    clearConsole( outstream );

    guesses.push(guess);

    secretReveal = hideLetters(SECRETWORD, correctGuesses(SECRETWORD, guesses));

    output("status: " + secretReveal, outstream);
    output("guesses: " + showGuesses(guesses), outstream, false);
    output("lives: " + (LIVES - (guesses.length - correctGuesses(SECRETWORD, guesses).length)), outstream, false);

  } while ((LIVES - guesses.length + correctGuesses(SECRETWORD, guesses).length) > 0 && secretReveal.includes('_'));

  clearConsole( outstream );

  if (secretReveal.includes('_')) {
    output("you lost all your lives and so you lose the game", outstream);
    output("you were trying to guess " + SECRETWORD, outstream);
  } else {
    output("you won", outstream);
    output("you guessed " + SECRETWORD, outstream);
  }

  output("that means:\n\t" + secret["definition"], outstream);
}

function output( text, outstream, newline = true ) {
  outstream.write(String(text) + (newline ? "\n\n" : "\n"));
}

function input( text, instream ) {
  return instream(text);
}

function clearConsole( outstream ) {
  outstream.write("\x1B[2J");
}

function correctGuesses( secretWord, guesses ) {
  let correctGuesses = [];
  for (let h = 0; h < guesses.length; h++) {
    let charChecked = guesses[h];
    if (secretWord.toUpperCase().includes(charChecked)) {
      correctGuesses.push(charChecked);
    }
  }
  return correctGuesses;
}

function hideLetters( word, correctGuesses ) {
  let array = [];
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  word.split("").map( (letter) => {
    if (format.test(letter) || correctGuesses.includes(letter)) {
      array.push(letter);
    } else {
      array.push('_');
    }
  });

  return array.join(" ");
}


function showGuesses( guesses ) {
  return (guesses.length > 0) ? guesses.join(", ") : "";
}
