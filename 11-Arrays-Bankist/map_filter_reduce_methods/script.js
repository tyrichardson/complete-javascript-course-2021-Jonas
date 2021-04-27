"use strict";
// MAP, FILTER, REDUCE, FIND, FINDINDEX, SOME, EVERY, FLAT, FLATMAP

// map, filter, and reduce are used to transform data (DATA TRANSFORMATION METHODS)
// popular in functional programming paradigm
// unlike forEach(), these DO NOT MUTATE the original array
// makes chaining of methods possible

// MAP - returns new array
// takes an array, loops over it, executing code against each value, and returns a new array
// can use parameters current element, index, array
// can be a pure function (only returns a value), and not produce any side effects (actions in func body)

// FILTER - returns new array
// takes an array, loops over it, matches elements to some boolean criteria and returns only the matching elements in a new array
// can be a pure function (only returns a value), and not produce any side effects (actions in func body)

// REDUCE - returns single value
// takes an array, loops over it, reducing the elements into a single returned value (start with an accumulator and use it with each subsequent current element of the array -- a "snowball" effect)
// can be a pure function (only returns a value), and not produce any side effects (actions in func body)

// THE MAP METHOD -- returns a new array
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSD = 1.1;
const movementsUSD = movements.map((mov) => mov * eurToUSD);
console.log("original movements array ", movements);
console.log("***");
console.log("movementsUSD ", movementsUSD);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);
console.log("movements map ", movementsDescription);

// THE FILTER METHOD -- returns a new array of only positive values
const deposits = movements.filter((mov) => mov > 0);
console.log("filtered deposits ", deposits);
console.log("original movements array ", movements);

// instead of for/of loop which requires an exterior variable
const depositsForOf = [];
for (const mov of movements) if (mov > 0) depositsForOf.push(mov);
console.log("deposits for/of ", depositsForOf);

const withdrawals = movements.filter((mov) => mov < 0);
console.log("withdrawals ", withdrawals);

// THE REDUCE METHOD -- returns a single value
// reduce() takes accumulator (sum/value), the current value, the index, and the arr
const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0); // the value here assigned as zero is initial value assigned to the accumulator (acc)
console.log("balance reduce ", balance);

// instead of for/of loop which requires an exterior variable
let balance2 = 0; // the accumulator
for (const mov of movements) balance2 += mov;
console.log("balances for/of ", balance2);

// get max value
let maxValue = movements.reduce(
  (acc, cur) => (acc > cur ? acc : cur),
  movements[0]
);
console.log("reduce maxValue ", maxValue);

// method chaining to take movement deposit, convert them to USD, then add them up
// Like a PIPELINE
// this works because filter and map return new arrays
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);
console.log("totalDepositsUSD ", totalDepositsUSD);

// add console.log for debugging during development to see the filtered array:
/*
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUSD;
  })
  .reduce((acc, mov) => acc + mov, 0);
  */

// THE FIND METHOD -- returns a value (may be 'undefined') -- ES6
// loops over array and returns THE FIRST VALUE that meets certain boolean conditions
// find(cur, i, arr)
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal);

// THE FINDINDEX METHOD -- returns the array index value -- ES6
// findIndex(cur, i, arr)
const index = movements.findIndex((mov) => mov === 3000);
console.log("findIndex ", index);
movements.splice(index, 1);
console.log(movements);

// findIndex(callback) is superior to indexOf(value) because it allows more complex boolean criteria (a CONDITION) than the search for a simple, single value (EQUALITY)

// SOME
// similar to includes(), which only checks for EQUALITY (===)
// some() takes a callback checking a CONDITION
console.log(movements);
console.log("includes() ", movements.includes(-130)); // true
// const anyDeposits = movements.some((mov) => mov > 0); // true
const anyDeposits = movements.some((mov) => mov > 5000); // false

console.log("anyDeposits using some() ", anyDeposits);

// EVERY
// similar to some(), but every element must match the CONDITION criteria
// const anyDeposits = movements.every((mov) => mov > 0); // true
const everyDeposits = movements.every((mov) => mov > 0); // false
console.log("everyDeposits ", everyDeposits);

const deposit = (mov) => mov > 0;
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // [200, 450, 70, 1300]

// FLAT and FLATMAP handle nested arrays

// FLAT -- ES2019
// flat() takes a depth parameter; the default is 1
// an array of arrays
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const arrDeep = [
  [[1, 2], 3],
  [4, [5, 6]],
  [7, 8, 9],
];
console.log(arrDeep.flat()); // [Array(2), 3, 4, Array(2), 7, 8, 9]
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// example of using flat(), the bank wants to know the balance of all the movements in all the accounts
const totalAccountMovements = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log("accountMovements ", totalAccountMovements);

// map() followed by flat() is very common, so flatmap() was introduced to make it a single call

// FLATMAP -- ES2019
// example of the above using flatMap() -- which can only go one level deep!
const totalAcctMovements = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log("totalAcctMovements flatMap ", totalAcctMovements);
