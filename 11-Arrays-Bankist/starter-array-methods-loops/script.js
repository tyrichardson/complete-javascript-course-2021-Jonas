'use strict';

// ARRAY METHODS

// SLICE()
// returns an array
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); // ["c", "d", "e"]
console.log(arr.slice(2, 4)); // ["c", "d"]
console.log(arr.slice(-1)); // ["e"]
console.log(arr.slice(-2)); // ["d", "e"]
console.log(arr.slice(1, -2)); // ["b", "c"]
// shallow copy
console.log(arr.slice()); // ["a", "b", "c", "d", "e"]
console.log([...arr]); // ["a", "b", "c", "d", "e"]

// SPLICE()
// mutates the array, splice(start, number to remove)
// usually used to delete items from an array, returning the deleted index values in an array

let arrSplice = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(arrSplice.splice(2, 2)); // ["c", "d"] -- starting at index 2, delete & return 2
console.log(arrSplice); // ["a", "b", "e", "f", "g"];
console.log(arrSplice.splice(-1)); // ["g"] -- deletes last value
console.log(arrSplice); // ["a", "b", "e", "f"]
console.log(arrSplice.splice(1)); // ["b", "e", "f"] -- start at index 1, delete/return to the end
console.log(arrSplice); // ["a"]


// REVERSE()
// mutates array

let arrReverse = ['a', 'b', 'c', 'd', 'e'];
console.log(arrReverse.reverse()); // ["e", "d", "c", "b", "a"]
console.log(arrReverse); // ["e", "d", "c", "b", "a"]

// CONCAT() -- can use spread operator, if preferred
let arrR = ['a', 'b', 'c', 'd', 'e'];
const letters = arrR.concat(arrReverse);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'e', 'd', 'c', 'b', 'a'];
console.log([...arrR, ...arrReverse]); // ["a", "b", "c", "d", "e", "e", "d", "c", "b", "a"]

// JOIN()
console.log(letters.join(' - ')); // a - b - c - d - e - e - d - c - b - a (typeof string)

// and all the others on MDN
*/

// LOOP METHODS -- for...of, forEach
// break & continue work in for...of loops, NOT in forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for...of

for (let movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

// if more info is needed, like the index: for ([i, movement] of movements.entries()){}
// then the index (i) can be used

// forEach()

// forEach takes a callback function
// loops over array, executing callback on each iteration passing in the current element of the array as an argument
// forEach passes in the current element's value, its index, and the entire array

console.log('-- forEach() --');
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Transaction ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Transaction ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

// iteration 0: movement == 200
// iteration 1: movement == 450
// iteration 2: movement == 400
// etc.

// forEach also works on MAPS and SETS using the variable names value, key, and map (as variable names for the current element's value, its index, and the entire array (iterable))

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesSet = new Set([
  'USD',
  'United States dollar',
  'EUR',
  'Euro',
  'GBP',
  'Pound sterling',
  'USD',
  'EUR',
  'Euro',
]);
console.log(currenciesSet);

currenciesSet.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
/* displays:
USD: USD
United States dollar: United States dollar
EUR: EUR
Euro: Euro
GBP: GBP
Pound sterling: Pound sterling

Because SETS don't have indexes or keys, so the second parameter equals the first
-- kept this way so that forEach could be used for sets, too
-- usually written:
*/
console.log('--- w/o key ---');
currenciesSet.forEach(function (value, _, map) {
  console.log(`${value}`);
});
