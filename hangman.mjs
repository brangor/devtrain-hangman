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

  game(secretWord);
}

main();

function selectRandomWord( wordList ) {
  let wordCount = Object.values(wordList).length;
  let randomIndex = Math.floor(Math.random() * wordCount);
  let randomWord = Object.values(wordList)[randomIndex];
  return randomWord;
}

function game( secret ) {
  clearConsole();

  const LIVES = 9;
  const guesses = [];

  output("welcome to hangman");

  const SECRETWORD = secret["word"].toUpperCase();

  output("status: " + hideLetters(SECRETWORD, correctGuesses(SECRETWORD, guesses)));

  let secretReveal;

  do {
    let guess = "";
    do {
      guess = input("guess a letter: ").toUpperCase().trim().substring(0, 1);
    } while( guess.length == 0 )

    clearConsole();

    guesses.push(guess);

    secretReveal = hideLetters(SECRETWORD, correctGuesses(SECRETWORD, guesses));

    output("status: " + secretReveal);
    output("guesses: " + showGuesses(guesses), false);
    output("lives: " + (LIVES - (guesses.length - correctGuesses(SECRETWORD, guesses).length)), false);

  } while ((LIVES - guesses.length + correctGuesses(SECRETWORD, guesses).length) > 0 && secretReveal.includes('_'));

  clearConsole();

  if (secretReveal.includes('_')) {
    output("you lost the game");
    output("you were trying to guess " + SECRETWORD);
  } else {
    output("you won");
    output("you guessed " + SECRETWORD);
  }

  output("that means:\n\t" + secret["definition"], false);
}

function output( text, newline = true ) {
  CONFIG.outstream.write(text + (newline ? "\n\n" : "\n"));
}

function input( text ) {
  return CONFIG.instream(text);
}

function clearConsole() {
  CONFIG.outstream.write("\x1B[2J");
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
