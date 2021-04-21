'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//ES6 Enhancement: computed property names
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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
  [4 + 2]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

console.log(openingHours);

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
