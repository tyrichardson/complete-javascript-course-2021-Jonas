'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

// METHODS & PROPERTIES-- strings are primitives; so cannot be mutate, only replaced
// They have methods and properties because of JS BOXING
// Boxing places the primitive in a "box", which is an object on which are prototypical methods and properties that are bound to the string variable
// It is based on class inheritance, Object Oriented, constructor

console.log(new String('jonas')); // ["j", "o", "n", "a", "s"]
console.log(typeof new String('jonas')); // object
console.log(typeof new String('jonas').slice(1)); // string (an array of strings)

// .length
console.log(airline.length); // 16
console.log('B737'.length); // 4

// indexOf(), lastIndexOf()
console.log(airline.indexOf('r')); // 6
console.log(airline.lastIndexOf('r')); // 10
console.log(airline.indexOf('portugal')); // -1 (means false)

// Why are the indexes useful?
// .slice() requires index values to extract characters from string
console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4, 7)); // Air (start index 4, return 3 characters: length = 7 - 4)
console.log(airline.slice(0, airline.indexOf(' '))); // TAP
console.log(airline.slice(-1)); // l -- returns last character
console.log(airline.slice(-2)); // al -- the last two characters
console.log(airline.slice(1, -1)); // AP Air Portugal (start at index 1, end length - 1)

const checkMiddleSeat = function (seat) {
  // B and E are the middle seats in our small plane
  const s = seat.slice(-1);
  if (s == 'B' || s == 'E') {
    console.log(`You got ${seat}, a middle seat 👎`);
  } else {
    console.log(`You got ${seat}, a good seat! 👍`);
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// toLowerCase(), toUpperCase()
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
// use it to correct capitalization in a passenger name
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
console.log(passengerLower); // jonas
// const passengerCorrect = passengerLower[0].toUpperCase();
// console.log(passengerCorrect); // J
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // Jonas
// a verification function could take any passenger name and make sure it is correct

// Compare email addresses from user input, trim(), trimStart(), trimEnd()
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);
// more concise using method chaining
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
// then a function can compare to base email and return true or false or whatever

// Replacing values
// replace()
const priceGB = '288,97£'; // comma is used instead of dot (£ = option + 3)
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceGB, priceUS);
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate')); // only hits the first instance of 'door'
console.log(announcement.replaceAll('door', 'gate')); // hits all instances of 'door'
// REGULAR EXPRESSION used with replace()
console.log(announcement.replace(/door/g, 'gate')); // find 'door', globally

// Methods that return BOOLEANS
// includes(), startsWith(), endsWith()
const airplane = 'A320neo';
console.log(airplane.includes('A320')); // true
console.log(airplane.startsWith('A')); // true
console.log(airplane.startsWith('Airbus')); // false
console.log(airplane.endsWith('neo')); // true
console.log(airplane.endsWith('NEO')); // false

const checkBaggage = function (items) {
  const baggage = items.toLowerCase(); // IMPORTANT!
  if (baggage.includes('knife') || baggage.includes('gun')) {
    // includes() is case sensitive
    console.log('You are not allowed on board!');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage(`I have a Laptop, some Food, and a Pocket Knife`);
checkBaggage(`Socks and camera`);
checkBaggage(`Got some snacks and a gun for protection.`);

// string.split() takes a divider string as an argument, returns an array
// array.join() takes a divider string as an argument, returns a string
console.log('a+very+nice+string'.split('+')); // ["a", "very", "nice", "string"]
console.log('Ty Richardson'.split(' ')); // ["Ty", "Richardson"]
const [firstName, lastName] = 'Ty Richardson'.split(' '); // returns 2 strings
console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' '); // returns a single string
console.log(newName);

// Capitalize a name using slice()
const capitalizeName = function (name) {
  const nameSplit = name.split(' ');
  const namesUpper = [];
  for (const n of nameSplit) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('ty richardson');

// OR using replace()
const capitalizeName2 = function (name) {
  const nameSplit = name.split(' ');
  const namesUpper = [];
  for (const n of nameSplit) {
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName2('jessica ann smith davis');
capitalizeName2('ty richardson');

// PADDING string so that it has a certain length (add character(s) to front or back)
// .padStart(int, value) adds value in front of string until string.length == int
// .padEnd(int, value) adds value behind string until string.length = int
const message = 'Go to gate 23';
console.log(message.padStart(25, '+')); // ++++++++++++Go to gate 23
console.log('Ty'.padStart(25, '+')); ///// +++++++++++++++++++++++Ty
const msg = 'Go to gate 23';
console.log(msg.padEnd(30, '+')); /// Go to gate 23+++++++++++++++++
console.log('Ty'.padEnd(30, '+')); // Ty++++++++++++++++++++++++++++
console.log(msg.padStart(25, '+').padEnd(30, '+')); /// ++++++++++++Go to gate 23+++++
console.log('Ty'.padStart(25, '+').padEnd(30, '+')); // +++++++++++++++++++++++Ty+++++

// example of masking a credit card number so only last 4 are visible
const maskCreditCard = function (number) {
  const str = number + ''; // coerced string conversion
  const lastFour = str.slice(-4);
  return lastFour.padStart(str.length, '*');
};

console.log(maskCreditCard(433789463864647384)); // **************7360
console.log(maskCreditCard('34598735800098722987456002234')); // *************************2234

// repeat() takes an int for number of times to repeat string
const repeatingMessage = 'Bad weather... All Departures Delayed... ';
console.log(repeatingMessage.repeat(5));

const planesInLine = function (num) {
  console.log(`There are ${num} planes in line ${`✈️`.repeat(num)}`);
};
planesInLine(5); // There are 5 planes in line ✈️✈️✈️✈️✈️
planesInLine(2); // There are 2 planes in line ✈️✈️
planesInLine(12); // There are 12 planes in line ✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️

// string.concat(), array.reverse() are also used a lot
console.log('Ty'.concat(' Richardson')); // Ty Richardson
const str = 'Richardson';
const strSplit = str.split('');
console.log(strSplit); // ["R", "i", "c", "h", "a", "r", "d", "s", "o", "n"]
strSplit.reverse();
console.log(strSplit); // ["n", "o", "s", "d", "r", "a", "h", "c", "i", "R"]
const rev = strSplit.join('');
console.log(rev); // nosdrahciR
