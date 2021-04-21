'use strict';

// Optional Chaining queries for "true" like an if statement

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const openingHours = {
  thurs: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 12 + 12,
  },
};
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
};
// console.log(restaurant.openingHours.mon.open); // throws reference error, stopping script

// Finding out if properties exist can require long if statements, e.g.:
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open); // returns nothing
}
// ES2020 OPTIONAL CHAINING ENHANCEMENT, functions like a browser query string
// if a specified property does not exist, undefined is returned
console.log(restaurant.openingHours?.mon?.open); // returns undefined
console.log(restaurant.openingHours?.thurs?.open); // returns 12

const days = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];

// two question marks works like the ternary operator
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? '...nope';
  console.log(`On ${day}, we open at ${open}`);
}

// METHODS can use Optional Chaining to see if they exist
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist.'); // >>> returns order
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist.'); // >>> returns Method does not exist.

// ARRAYS can use Optional Chaining to see if they are empty
const users = [{ name: 'Ty', email: 'howdy@hello.org' }];
console.log(users[0]?.name ?? 'User array empty.');
