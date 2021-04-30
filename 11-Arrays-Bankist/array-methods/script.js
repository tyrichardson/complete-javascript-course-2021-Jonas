"use strict";
// MAP, FILTER, REDUCE, FIND, FINDINDEX, SOME, EVERY, FLAT, FLATMAP, SORT, code for declaring and initializing arrays, code for converting into TITLE CASE

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSD = 1.1;
const movementsUSD = movements.map((mov) => mov * eurToUSD);
console.log("original movements array ", movements);
console.log("***");
console.log("movementsUSD ", movementsUSD);

// THE MAP METHOD -- returns a new array
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

// SORT -- mutates original array
const owners = ["Jonas", "Ty", "Julie", "Frank", "Lila", "Lenu", "Zachary"];
console.log(owners.sort());
console.log(owners);
// both display: ["Frank", "Jonas", "Julie", "Lenu", "Lila", "Ty", "Zachary"]

// sorts based on strings, so numbers first get converted to strings before they are sorted
let movementsNum = movements;
console.log(movementsNum);
// console.log(movementsNum.sort());
// displays [-130, -400, -650, 1300, 200, 450, 70]
// fix by using a compare callback
// for ASCENDING order:
// if return < 0, A then B (keep this order)
// if return > 0, B then A (switch this order)
movementsNum.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movementsNum);
// reverse comparisons for DESCENDING order
// also works with strings, but NOT for mixed arrays

// more compact (zero keeps current order)
movementsNum.sort((a, b) => a - b);

// CONSTRUCTOR METHOD
// new Array()
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const arr2 = new Array(1, 2, 3);
console.log(arr2);
const x = new Array(7); // declares an array of length 7 that is EMPTY

// ARRAY.FILL()
x.fill(1); // mutates array by assigning the value 1 to each index
console.log(x);
// fill can take a beginning index and an ending index, exclusive
x.fill(2, 2, 5);
console.log(x); // (7) [1, 1, 2, 2, 2, 1, 1]
// fill can be used on any array

// ARRAY.FROM() -- preferred
// works like map; takes current value, index
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // (7) [1, 1, 1, 1, 1, 1, 1]

// e.g.
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// array.from() introduced to create arrays from iterables like maps and sets; also for Node Lists, like the one returned by document.querySelectorAll()

// AN ITERABLE CAN BE DEFINED AS ANY DATA STRUCTURE WITH THE LENGTH PROPERTY

// ADDITIONAL METHOD PRACTICE/EXAMPLES

// sum of all deposits
const bankDepositSum = accounts
  .flatMap((el) => el.movements)
  .filter((el) => el > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum);

// a count of how many deposits more than 1,000?
const numDeposits1000 = accounts
  .flatMap((el) => el.movements)
  .filter((el) => el > 1000).length;
console.log(numDeposits1000);
// OR
// use reduce() accumulator as a counter
const numOfDeposits1000 = accounts
  .flatMap((el) => el.movements)
  .reduce((acc, cur) => (cur > 1000 ? acc + 1 : acc), 0);
console.log(numOfDeposits1000);

// CANNOT USE ACC++ IN THE ABOVE -- WHY? BECAUSE IT RETURNS THE CURRENT VALUE, THEN INCREMENTS THE VALUE
// ++ACC would first increment the value, then return that value
let a = 10;
console.log(a++);
console.log(a);
console.log(++a);
console.log(a);

// USE REDUCE TO CREATE AN OBJECT
// return the sums of all the deposits and all the withdrawals
// our acc must be an object, since we are to return an object
const sums = accounts
  .flatMap((el) => el.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);
// OR using destructuring and bracket notation
const { dep, withd } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? "dep" : "withd"] += cur;
      return sums;
    },
    { dep: 0, withd: 0 }
  );
console.log(dep, withd);

// array.reduce() can also return an array
// array.reduce() can be used in place of many other methods

// Example of converting strings to TITLE CASE
const convertTitleCase = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");
  return capitalize(titleCase);
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title, but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));
