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

// A SET is a collection of unordered, unique values; they can be mixed data types
// items cannot be retrieved from a set; if that is needed, use an array
// arrays are more feature rich (methods and properties) than sets

// most common data type for a set is an array; data type must be an ITERABLE
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log('ordersSet ', ordersSet); // {"Pasta", "Pizza", "Risotto"}
console.log(ordersSet.size); // 3 (size, not length)

console.log(new Set('Jonas')); // {"J", "o", "n", "a", "s"}

console.log(ordersSet.has('Pizza')); // true
console.log(ordersSet.has('Bread')); // false

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log('ordersSet ', ordersSet); // {"Pasta", "Pizza", "Risotto", "Garlic Bread"}

ordersSet.delete('Risotto');
console.log('ordersSet ', ordersSet); // {"Pasta", "Pizza", "Garlic Bread"}

for (const order of ordersSet) {
  console.log(order);
}

// Use case for a set is to remove duplicate values from an array
// Example:
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUniqueSet = new Set(staff);
console.log(staffUniqueSet); // {"Waiter", "Chef", "Manager"}
// instead, use the spread operator (...) to put the unique values directly into a new array
const staffUniqueArray = [...new Set(staff)];
console.log(staffUniqueArray); // ["Waiter", "Chef", "Manager"]
// just want to know how many unique values are in the array?
console.log(new Set(staff).size); // 3
console.log(new Set('Mississippi').size); // 4
