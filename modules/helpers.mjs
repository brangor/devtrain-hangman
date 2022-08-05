function pickRandom( list ) {
  return list[Math.floor(Math.random()*list.length)];
}

const peasantJobs = [
  "Butcher",
  "Baker",
  "Stonemason",
  "Weaver",
  "Winemaker",
  "Mason",
  "Farmer",
  "Watchman",
  "Shoemaker",
  "Wheelwright",
  "Roofer",
  "Locksmith",
  "Tanner",
  "Grocer",
  "Armourer",
  "Carpenter",
  "Cook",
  "Blacksmith",
  "Hangman"
];

const peasantNames = {
  firsts: [
    "Gage",
    "Langley",
    "Dell",
    "Radcliff",
    "Æðelric",
    "Sandford",
    "Osmond",
    "Hedley",
    "Winfred",
    "Kendrick",
    "Hildred",
    "Warwick",
    "Sigeberht",
    "Elistrange"
  ],
  lasts: [
    "Blackwoode",
    "Tashe",
    "Butts",
    "Huffe",
    "Audleye",
    "Thorne",
    "Rhodese",
    "Lewine",
    "Elwine",
    "Strudwicke",
    "Walsmsleye",
    "Holemese",
    "Thorntone",
    "Kimberlye"
  ]
};

export { pickRandom, peasantJobs, peasantNames };

