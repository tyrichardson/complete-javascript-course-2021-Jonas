'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//ES6 Enhancement: computed property names
const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// ES6 enhancement: an add outside objects to other objects as properties
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhancement to add outside objects as properties on an object
  openingHours,

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // ES6 enhancement for methods
  orderES6(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // method can depend on destructuring for parameters/arguments
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${time} to ${address}.`
    );
  },

  // method can used spread operator
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`You ordered pasta with ${ing1}, ${ing2}, and ${ing3}.`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(
      'orderPizza mainIng & otherIngs... = ',
      mainIngredient,
      otherIngredients
    );
  },
};

//////////////////////////////////////////////////////

// A MAP is used to map values to keys
// keys can have any type -- in objects, keys are strings
// most often, you want to create a new EMPTY map
const rest = new Map();

// then use the set method to populate the map
// can also pass in an array -- see below
rest.set('name', 'Classical Greece');
rest.set(1, 'Athens');
// set returns the map
console.log(rest.set(2, 'Lesbos'));

// can chain the set method
console.log(
  rest
    .set('categories', ['Dolmas', 'Soups', 'Wines', 'Desserts'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open. 😄')
    .set(false, 'We are closed. 😦')
);

// get method
console.log(rest.get('name')); // Classical Greece
console.log(rest.get(true)); // We are open. 😄
console.log(rest.get(1)); // Athens

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // We are open. 😄

// methods: has, delete, size, clear (removes all elements), entries, keys, values
console.log(rest.has('categories')); // true
rest.delete(2);
console.log(rest); // 2 => "Lesbos" was removed
console.log(rest.size); // 7
// rest.clear();
// console.log(rest.size); // 0

// these are more useful when placed inside an array (an array of arrays)
console.log('rest.entries()', [...rest.entries()]);
console.log('rest.keys() ', [...rest.keys()]);
console.log('rest.values() ', [...rest.values()]);

// arrays and objects can be map keys
rest.set([1, 2], 'Test');
console.log(rest);
console.log(rest.size); // 8

// can that "array key" be accessed?
console.log(rest.get([1, 2])); // undefined
// NO. Those are two different arrays that happen to contain the same values

// This can be done by using a reference to the same array
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest);
console.log(rest.size); // 9
console.log(rest.get(arr)); // Test

rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size); // 10
console.log(rest.get(document.querySelector('h1'))); // Heading

// POPULATE MAP BY PASSING IN AN ARRAY OF ARRAYS
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct 💯'],
  [false, 'Try again!'],
]);
console.log(question); // return is like Object.entries(openingHours)
console.log(Object.entries(openingHours)); // an array of arrays

// Convert an object to a map
const openingHoursMap = new Map(Object.entries(openingHours));
console.log('openingHoursMap', openingHoursMap);

// ITERATING over a map
// Quiz
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = Number(prompt('Your answer'));
// console.log(answer);
// console.log(question.get(question.get('correct') === answer));

// Convert a map to an array (of arrays)
console.log('question map to array ', [...question]);
