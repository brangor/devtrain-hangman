# NODE HANGMAN
## Write a JavaScript game

Implement the game according to the following rules and constraints. When done, hit up the reviewer for a review. And if you get stuck, it pays to work the problem for a short time to see if you can get past it, and if you can’t please ask for help or advice. We want to hit that sweet spot between having a go at solving things for yourself and not getting stuck on something for ages.

It is important to read the rules and constraints before starting.

---
## Rules
1. User can start a game by running the program
1. The user has 9 lives
1. Computer secretly picks a word for the user to guess
1.  The user is shown the word, but all the letters are replaced with a non letter character
1. User takes turns to guess letters in the word
1. If the letter is not in the word the user loses a life
1. After each turn the user is shown the word again. The letters they have guessed successfully are revealed, and the unguessed are replaced with a non letter character
1. If the user runs out of lives the game is lost and the word is fully revealed
1. If the user guesses all the letters correctly the game is won

## Constraints
1. The rules are a very basic view of the game. There are additional features that will help the game be more playable (for example showing the player how many lives they have remaining after every turn, or filtering bad words out of the word list). Feel free to implement these features, but do not go too far beyond the scope outlined in the rules. Everything in the rules should be covered off before attempting these nice-to-have features.
2. MINIMUM VIABLE PRODUCT: This should be your first full “working” version of the game. You should aim to get here as quickly as possible. You should be able to present your minimum viable hangman game implementation for review (recommend creating a commit called “MVP” when you achieve this). After getting this working (provided you have saved it with a commit) you can carry on with making things better / implementing things.
3. Latest javascript / es features are all good to use
4. Code should live in a single file
5. Do not create any functions or classes
6. Do not use packages
    1. You can use standard node packages
    2. You can use a package for getting user input (eg prompt-sync)
7. Do not create tests

## Tips
- This word list contains English words ordered by usage: words.txt 
- Use git to create “save points” in your code when you are happy with something. This way you can go back to previous commits if you don’t like your current approach. You will also always have working code ready for review.
- Try to stick within the scope defined by the rules and constraints. There are extra features available (at the bottom of the page) to work on for situations where you are waiting for a review and need something to do in the meantime.

---
## Getting Started

There are two ways to write a runnable node script:

### Easy
- Create a new directory
- Create a file called ``hilo.js``
- Add ruby code to the file (eg ``console.log(‘hello world’)``)
- Run the code with node ``hilo.js``

### Advanced
- Create a new directory
- Create a file called ``hilo.js``
- Add ruby code to the file (eg ``console.log(‘hello world’)``)
- Add the following code to the top of the file: ``#!/usr/bin/env node``
- This shebang tells the shell what program to run the file with
- Make the file executable with ```chmod +x hilo.js```
- Now you can run your node script with ```./hilo.js```

---
## Extras
There may be a time where you are ready for review but the reviewer is busy. These extra features will serve as little extra challenges.

Before you continue *are you 100% confident that your current code meets the brief and you are happy to present it for review?* Don’t work on any new features if this isn’t the case.

Create a new git branch to work on any new features so that they can be switched away from / abandoned if needed.

The features are in no particular order. Pick one that looks interesting to you. [HIDDEN]

