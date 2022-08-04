#!/usr/bin/env node

const dictionaryFile = './lib/dictionary.json';

import { readFile } from 'fs/promises';
import promptSync from 'prompt-sync';

const prompt = promptSync();

async function main() {
  const dictionary =
    JSON.parse(
      await readFile(dictionaryFile, import.meta.file)
    );

  // console.log(selectRandomWord(dictionary)["word"]);
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

  const LIVES = 9;
  const guesses = [];

  console.log("you have started a game of hangman");

  const SECRETWORD = secret["word"].toUpperCase();

  console.log("status:", hideLetters(SECRETWORD, correctGuesses(SECRETWORD, guesses)));

  let secretReveal;
  do {
    console.log("definition:",hint(secret["definition"], guesses));

    let guess = "";
    do {
      guess = prompt("guess a letter: ").toUpperCase().trim().substring(0, 1);
    } while( guess.length == 0 )

    guesses.push(guess);

    secretReveal = hideLetters(SECRETWORD, correctGuesses(SECRETWORD, guesses));

    console.log("\nstatus:", secretReveal);

    if (SECRETWORD.includes(guess)) {
      console.log("\nCORRECT!");
    } else {
      console.log("\nWRONG!");
    }

    console.log("\nguesses:", showGuesses(guesses));
    console.log("lives left:", LIVES - (guesses.length - correctGuesses(SECRETWORD, guesses).length));

  } while ((LIVES - guesses.length + correctGuesses(SECRETWORD, guesses).length) > 0 && secretReveal.includes('_'));

  if (secretReveal.includes('_')) {
    console.log("you lost all your lives and so you lose the game");
    console.log("i will reveal the word to you, it was", SECRETWORD);
  } else {
    console.log("you guessed all the letters and so you won");
  }
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

function hint( text, permittedLetters ) {
  const format = "/"+permittedLetters.join("")+"/i";
  return text.replace(format, "?");
}

function showGuesses( guesses ) {
  return (guesses.length > 0) ? guesses.join(", ") : "";
}
