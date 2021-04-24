'use strict';
'use strict';

// DEFAULT PARAMETERS

const bookingArray = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookingArray.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', 3, 1200);
createBooking('LH123', undefined, 400); // how to skip a parameter and use its default
console.log(bookingArray);

// PASSING BY VALUE vs "PASSING BY REFERENCE"
// primitives are copies of the values held by other primitives -- unique copies, 2 things
// "references" are memory addresses to the an object in the MEMORY HEAP; so, the same "thing" is pointed to by two variables -- and so values within those objects (things) get changed by accident

const flight = 'LH234';
const ty = {
  name: 'Ty Richardson',
  passport: 1234567890,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999'; // does not effect flight variable

  passenger.name = 'Mr.' + passenger.name; // changes value in object ty

  if (passenger.passport === 1234567890) {
    //  alert('Checked in.');
  } else {
    //  alert('Wrong passport!');
  }
};

checkIn(flight, ty);
console.log(flight); // has not changed
console.log(ty); // has changed

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
  console.log(person.passport);
};

newPassport(ty); // changes passport property value of ty
checkIn(flight, ty);

// FIRST-CLASS FUNCTIONS MEANS FUNCTIONS ARE VALUES, A TYPE OF OBJECT (a concept)
// can store functions in variables and object properties
// can pass functions as arguments to other functions
// can return functions from other functions
// can call methods on functions (e.g., counter.inc.bind(someOtherObject));

// HIGHER-ORDER FUNCTIONS - CALLBACKS and CLOSURES (code that is written)
// a function that receives another function as an argument (a callback) and/or returns a new function (a closure)

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function -- takes a function, a callback function
// Higher level of abstraction -- leaves specifics/details to the callback
// .name property returns the name of the function
const transformer = function (str, func) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${func(str)}`);
  console.log(`Transformed by: ${func.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// an event listener takes a callback function (high5)
const high5 = function () {
  console.log(`👋`);
};
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

// CLOSURES - new functions that are returned by functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// greeterHey is assigned the value of the function expression returned by greet(greeting)
// the variable/value "greeting = 'Hey'" is available to it via its closure
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

// since the value assigned to greet('Hello') is a function, it can be called like this:
greet('Hello')('Ty');

const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2('Goodbye')('Big Fella');

// METHODS THAT MANIPULATE THE "THIS" KEYWORD
// CALL() -- takes the 'this' object and arguments to pass to function
// standard object and method call
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}, ${name}` });
  },
};

lufthansa.book(239, 'Ty Richardson');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

// pretend lufthansa adds a new line of business
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// don't copy/paste the method, make a new function set to the methods value -- keep the code DRY
// BUT the "this" will be undefined in this standard function (it's no longer a method)
// You must manually define what the "this" keyword means, contextually
// .call() takes as its first parameter the object to which "this" will refer (this = eurowings)
const book = lufthansa.book;

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

// to work, objects must have the same properties -- enter classes/Object Oriented Programming
const swissAir = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swissAir, 583, 'Francis Graybill');
console.log(swissAir);

// APPLY() -- takes 'this' object and an array of arguments to pass to the function
// not used often, anymore
const flightData = [876, 'George Cooper'];
book.apply(swissAir, flightData);
console.log('apply() ', swissAir);

// more frequently used, the spread operator
book.call(swissAir, ...flightData);
console.log('apply() ', swissAir);

// BIND() -- most important of these methods
// bind() does not immediately call the function, it RETURNS A NEW FUNCTION WITH THE "THIS" KEYWORD BOUND TO THE FUNCTION SELECTED

const bookEW = book.bind(eurowings);
bookEW(69, 'Joe Big Wig Man');
console.log(eurowings);

const bookSW = book.bind(swissAir);
bookSW(5678, 'Wilma Flintstone');
console.log(swissAir);

// additional arguments can be saved in the "bind functions" for specific cases
// PARTIAL APPLICATION pattern -- presets arguments data
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Julie Cox');
bookEW23('David Cox');
console.log(eurowings);

// used with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes); // ends up being == NaN
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// console.log(this) == NaN
// because in an event handler, 'this' is set to the element -- in this case, the button at '.buy'
// proving 'this' is set DYNAMICALLY
// using the following sets 'this' as expected, causing the number of planes to increase by 1
lufthansa.buyPlane();

// how to fix this? use bind() to return a new function setting 'this' appropriately
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Again: partial application with bind (preset parameters)
// order of parameters is important
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // don't need to define 'this', so put 'null'
console.log(addVAT(100)); // s/b 123 -- and it is!

// Not the same as using default arguments -- bind() returns a new function, entirely

// challenge: create a function that returns a function like addVAT (see greet function)
// using a CLOSURE

const atTaxRate = function (rate) {
  return function (value) {
    console.log(`${value + value * rate}`);
  };
};

const atTaxRate23 = atTaxRate(0.23);
atTaxRate23(100);

// (IIFF) == Immediately Invoked Function Expression pattern
// runs immediately, then "disappears"
// a function expressing wrapped in (), then followed by () to execute
// invented to ENCAPSULATE variables, make the PRIVATE (accessible only within function scope)
// let and const have made IIFEs old-fashioned, because they have BLOCK SCOPE

(function () {
  let value = "IFFE variable assigned 'value'";
  console.log(
    `This IIFE will only run once, and never again, and only it has access to: ${value}`
  );
})();

// console.log(`${value} is not accessible outside of the IFFE`); // ReferenceError

(() => console.log('Arrow functions can also be IIFEs'))();

{
  let val = 6;
  const vals = 7;
  var valus = 9;
}
console.log(`var valus == ${valus}`);

// console.log(`let val == ${val}, const vals == ${vals}`); // ReferenceError

// CLOSURES
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passenger(s)`);
  };
};

const booker = secureBooking();
const booker2 = secureBooking();

booker(); // 1 passenger(s)
booker(); // 2 passenger(s)
booker(); // 3 passenger(s)

booker2(); // 1 passenger(s)

console.dir(booker);
console.dir(booker2);

// CLOSURES ARE CREATED IN MORE WAYS THAT BY BEING FUNCTIONS RETURNED BY FUNCTIONS
// closures are created to link back to the variable environment where they were created/born
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b / 7);
  };
};

g();
f();
console.dir(f);
h();
f();
console.dir(f);

// another example using A TIMER
// setTimeout waits as a separate function on the EVENT LOOP, separate from the boardPassengers execution context -- it accesses n and perGroup via its closure

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups with ${perGroup} passengers.`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds.`);
};

boardPassengers(180, 3);

// if perGroup were not in the closure, after looking in the local scope, the function would look on up the scope chain for it. If it existed, like below, it would be used.
// const perGroup = 1000;

// setTimeout calls a callback, the function expression shown
setTimeout(function () {
  console.log('TIMER');
}, 1000);

// CODE CHALLENGE 2, CLOSURES

//1. Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element is clicked. Do not select the h1 element again!
// 2. And now explain to yourself( or someone around you) why this worked! Take all the time you need.Think about when exactly the callback function is executed, and what that means for the variables involved in this example.

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    // this callback is separate from IFFE
    console.log('body clicked');
    header.style.color = 'blue';
  });
})();
