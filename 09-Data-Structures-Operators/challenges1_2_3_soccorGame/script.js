const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// CODE CHALLENGE #1

// 1
const [players1, players2] = game.players;
console.log('1: ', players1, players2);
//2
const [gk, ...fieldPlayers] = players1;
console.log('2: ', gk, fieldPlayers);
// 3
const allPlayers = [...players1, ...players2];
console.log('3: ', allPlayers);
// 4
const newArray = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log('4 ', newArray);
// 5
// const { team1, x: draw, team2 } = game.odds;
// console.log('5: ', team1, draw, team2);
// OR
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log('5: ', team1, draw, team2);
// 6
function printGoals(...playerNames) {
  console.log('6: ', playerNames, playerNames.length);
}
printGoals('Davies', 'Muller', 'Lewandowski');
printGoals('Davies', 'Muller');
printGoals(...game.scored);
// 7 second expression evaluated because first is truthy; if falsy, second expression would no evaluate
team1 < team2 && console.log('Team 1 is more likely to win');

// CODE CHALLENGE #2

for (let i = 0; i < game.scored.length; i++) {
  console.log(`Goal ${i + 1}: ${game.scored[i]}.`);
}
// OR
for (const [i, player] of game.scored.entries()) {
  console.log(`OR - Goal ${i + 1}: ${player}`);
}

const odds = Object.entries(game.odds);
let val = 0;
for (let el of odds) {
  if (el.includes('team1')) {
    val += el[1];
    console.log('val1 ', val);
  }
  if (el.includes('team2')) {
    val += el[1];
    console.log('val2 ', val);
  }
}
let avg = val / 2;
console.log('avg odds, not including odds of a draw ', avg);

// OR

let orVal = 0;
for (const odds of Object.values(game.odds)) {
  orVal += odds;
}
orVal /= Object.values(game.odds).length;
console.log('or avg odds, including odds of a draw ', orVal);

/*
print to console:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
*/
console.log('odds ', odds);
console.log(`
Odds of victory ${game[`${odds[0][0]}`]}: ${odds[0][1]}
Odds of draw: ${odds[1][1]}
Odds of victory ${game[`${odds[2][0]}`]}: ${odds[2][1]}
`);

// OR
for (const [team, odd] of odds) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odds of ${teamStr}: ${odd}`);
}

function printGoals2(...playerNames) {
  return {
    Gnarby: 1,
    Hummels: 1,
    Lewandowski: 2,
  };
}
console.log(printGoals2('Gnarby', 'Hummels', 'Lewandowski'));

// OR
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log('scorers ', scorers);

// CODE CHALLENGE 3

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);
console.log('gameEvents map: ', gameEvents);

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// put map values into an array
const gameEventsArray = [];
for (const [key, value] of gameEvents) {
  if (value) {
    gameEventsArray.push(value);
  }
}
console.log('gameEventsArray ', gameEventsArray);
// more concise to use spread operator
console.log('using spread operator ', [...gameEvents.values()]);
// convert array to a set, auto-removing duplicates
const gameEventsSet = [...new Set(gameEventsArray)];
console.log('gameEventsSet ', gameEventsSet);
const events = [...gameEventsSet];
console.log('events ', events);

//OR

const eventsOR = [...new Set(gameEvents.values())];
console.log('eventsOR ', eventsOR);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log
gameEvents.delete(64);
console.log('gameEvents map after delete 64: ', gameEvents);

// 3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes."(keep in mind that a game has 90 minutes)

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes.`
);

// BONUS for specificity

const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes.`
);

// 4. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:[FIRST HALF] 17:⚽ GOAL

for (let [key, value] of gameEvents) {
  if (key <= 45) {
    console.log(`[FIRST HALF] ${key}: ${value}`);
  } else {
    console.log(`[SECOND HALF] ${key}: ${value}`);
  }
}

// OR
console.log(' ');

for (let [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}
