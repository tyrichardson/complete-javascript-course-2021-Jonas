'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
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

// Logical Operators OR <||> AND <&&> can be used with any data type
// can return any data type, and can be used for short-circuiting
// based on truthiness / falsiness of the values
// OR short circuits on truthy first value, only needs to evaluate one element
console.log(3 || 'Ty'); // 3 is truthy, so it is returned
console.log('' || 'Ty'); // undefined is falsy, so 'Ty' is returned
console.log(true || 0); // true is returned
console.log(undefined || null); // null is returned
console.log(undefined || 0 || '' || 'Hello' || 23); // 'Hello' is returned (first truthy value found)
const guests1 = restaurant.numGuests || 10;
console.log('guests1 ', guests1);
// >>> displays 10
// if restaurant.numGuests can equal 0, then need a workaround
// Nullish Coalescing Operator <??> includes null & undefined, but NOT zero or ""
// makes zero and "" recognized as truthy values
restaurant.numberOfGuests = 0;
const guests = restaurant.numberOfGuests ?? 10;
console.log('guests ?? ', guests);

console.log('--- AND ---');
// AND short circuits on falsy first value, because must evaluate elements until one is different from the previous -- and it returns the "different" one
console.log('AND ', 0 && 'Ty'); // displays 0
console.log('AND ', 7 && 'Ty'); // displays 'Ty'
console.log('AND ', 'Hello' && 23 && null && 'Ty'); // displays null

// instead of if statement on restaurant.orderPizza
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// REST OPERATOR also uses <...>, but it packs elements into an array
// ON LEFT HAND SIDE OF ASSIGNMENT OPERATOR (should come last)
// uses Rest Operator with Destructuring ("take the REST of them...")
// ARRAYS
const [a, b, ...others] = [1, 2, 3, 4, 5, 6, 7];
console.log('a, b, others ', a, b, others);
// >>> a, b, others  1 2 (5) [3, 4, 5, 6, 7]

// use both Spread and Rest operators
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log('pizza, , risotto, otherFood = ', pizza, risotto, otherFood);
//>>> pizza, , risotto, otherFood =  Pizza Risotto (4) ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]

// OBJECTS
const { sat, ...weekdays } = restaurant.openingHours;
console.log('sat is ' + sat + ' and weekdays is ' + weekdays);
// above displays [object Object] because values cannot be converted to strings
console.log('sat & weekdays = ', sat, weekdays);

// FUNCTIONS -- rest argument -- packs all arguments into a single array
const add = function (...numbers) {
  console.log('rest operator function return ', numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log('rest sum ', sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(1, 2, 3, 0.4, 5, 6, 7, 8, 9);
const xArr = [23, 5, 7];
// Spread Operator used in call of function that uses Rest Operator
add(...xArr);

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
// >>> orderPizza mainIng & otherIngs... =  mushrooms (3) ["onions", "olives", "spinach"]
// if only one ingredient argument, then otherIngredients is an empty array <[]> which can be used in the function if desired

// SPREAD OPERATOR <...> works on Iterables to unpack values from an iterable
// ON RIGHT HAND SIDE OF ASSIGNMENT OPERATOR
// arrays, strings, maps, sets, and objects
// ARRAYS
// like destructuring: gets elements from arrays, but takes all of them and it does not create new variables
//ALWAYS delivers values separated by commas!!!
// like creating an array or passing arguments to a function
const arr = [7, 8, 9];
const comboArr = [1, 2, arr];
console.log(comboArr);
const newArr = [1, 2, ...arr];
console.log(newArr); // passes an array
console.log(...newArr); // passes individual values from array
// new array made from spread of existing array + a new index & value
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);
// Shallow copy of an array
const mainMenuCopy = [...restaurant.mainMenu];
console.log('mainMenuCopy = ', mainMenuCopy);
// concatenate two arrays using spread operator
const combinedMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log('combinedMenu = ', combinedMenu);
// STRINGS
const str = 'Ty';
console.log(...str);
const letters = [...str, ' ', 'R.'];
console.log(letters);
// FUNCTION using spread operator
/* const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
console.log('ingredients ', ingredients);
restaurant.orderPasta(...ingredients);
*/
// OBJECTS
const newRestaurant = { founded: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);
// Shallow copy
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(
  'copy = ' + ' ' + restaurantCopy.name + ' original = ' + restaurant.name
);

/*
// object as parameter to method that uses destructuring
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// destructuring with object literals
// objects are not ordered, so don't need to "skip" things like you do for arrays
// APIs generally return objects (JSON -> object is in name)
let { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
// >>> name is now a variable == 'Classico Italiano
// >>> openingHours is an object literal
// >>> categories is an array

// Give new variable names to the properties taken from objects
let {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Set default values in case there is no match
let { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
// >>> [], starters arrays

// MUTATE: assign new values to variables from object properties
let d = 111;
let e = 999;
let obj = { d: 23, e: 7, f: 14 };
// ({ d, e } = obj);
console.log(d, e);

// nested objects
// let { fri } = openingHours;
// console.log(fri);
let {
  fri: { open, close },
} = openingHours;
console.log(open, close);
// could give new names to variables
// ...fri: {open: o, close: c}, ...

/*
// destructuring -- works similarly to arguments object in execution context to supplies arguments to parameter names
// arrays
// assign existing values to new variables
let arr = [2, 3, 4];
let [a, b, c] = arr;
console.log(a, b, c);
let [first, second] = restaurant.categories;
console.log(first, second);
let [firstOne, , secondOne] = restaurant.starterMenu;
console.log(firstOne, secondOne);

// assign new values to array, MUTATING
[first, second] = [second, first];
console.log(first, second);

let [starterCourse, mainCourse] = restaurant.order(2, 0);
console.log(starterCourse, mainCourse);

// nested arrays
let nested = [2, 4, [5, 6]];
let [i, , j] = nested;
console.log(i, j);
// >>> 2, [5, 6]
let [k, , [l, m]] = nested;
console.log(k, l, m);
// >>> 2, 5, 6

// assign default values to arrays of unknown length
let [p, q, r] = [8, 9];
console.log(p, q, r);
// >>> r == undefined
// assign default values just like in parameters of a function
// see likeness to how arguments object works in execution context
let [s = 1, t = 1, u = 1] = [8, 9];
console.log(s, t, u);
*/
