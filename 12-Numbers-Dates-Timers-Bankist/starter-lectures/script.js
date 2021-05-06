'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Internally, Javascript, PHP, and Ruby represent all numbers as FLOATS stored in binary, not decimal
// some decimal numbers are difficult to represent in binary
console.log(23 === 23.0); // true
console.log(0.1 + 0.2); // 0.30000000000000004
// important scientific and financial work is NOT done in these languages

// a trick to CONVERT strings to numbers w/o using Number() with +'string'
console.log(Number('23'));
console.log(+'23');

// PARSE numbers from strings - Number.parseInt('string', radix)
// radix == base, like binary(2) or decimal(10))
console.log(Number.parseInt('30px', 10)); // 30 -- string must start w/ a number
console.log(Number.parseInt('30', 2)); // NaN
console.log(Number.parseInt('e23', 10)); // NaN
console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseInt('2.5rem')); // 2

// IS A NUMBER?
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20x')); // true
console.log(Number.isNaN(23 / 0)); // false
// BETTER WAY == Number.isFinite()

// CHECK IF A VALUE IS A NUMBER -- Number.isFinite() or Number.isInteger()
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20x')); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false

// Math methods
// square root
console.log(Math.sqrt(25));
// same as
console.log(25 ** (1 / 2));
// CUBIC ROOT FORMULA
console.log(8 ** (1 / 3));

// max value, min value
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23 -- it does type coercion
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN -- it does NOT do parsing
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// PI CONSTANT
// radius of a circle
console.log(Math.PI * Number.parseFloat('10px') ** 2); // area of a circle with a radius of 10 squared

// RANDOM NUMBERS -- Math.random returns a value between 0 and 1, exclusive
console.log(Math.random()); // e.g., 0.8233887959379125
console.log(Math.floor(Math.random() * 6) + 1);
// truncate decimal; multiply by 6 to get between 0 and 6, exclusive; add 1 to not get zero and to get 6 (1 - 6)

// template means of getting a random number between min and max, inclusive
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

// Rounding INTEGERS -- all do type coercion
console.log(Math.trunc(23.45)); // 23
console.log(Math.round(23.9)); // 24
console.log(Math.round('23.4')); // 23
console.log(Math.floor(23.9)); // 23
console.log(Math.ceil('23.2')); // 24

// Trunc and Floor behave differently with negative numbers
console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24, which is correct

// Rounding FLOATS -- boxes the primitive to access property, then returns primitive
console.log((2.7).toFixed(0)); // '3' -- returns a string, not a number!
console.log((2.7).toFixed(3)); // '2.700'
console.log((2.345).toFixed(2)); // '2.35'
console.log(+(2.345).toFixed(2)); // 2.35 -- A NUMBER, not a string

// REMAINDER OPERATOR, MODULO, MODULUS
console.log(5 % 2); // 1 => 5 / 2 == 2, r1
// convenient means of checking for even or odd number
let num = 6;
if (num % 2 === 0) {
  console.log('The number is even');
}
const isOdd = n => n % 2 !== 0;
console.log(isOdd(3)); // true
console.log(isOdd(100)); // false

// do something every nth time
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = 'blue';
    }
  });
});

// BIGINT -- ES2020 -- special type of integer
// integers are 64-bit, meaning each int has 64 zeros or ones
// 53 bits for digits, the other 11 for the sign and the decimal point
// biggest number that can be represented is equal to: 2 ** 53 - 1
console.log(Number.MAX_SAFE_INTEGER);
// the new primitive BigInt was introduced to allow Javascript to store larger numbers
console.log(1234567890987654321234567890987654321n); // 1234567890987654321234567890987654321n
console.log(BigInt(1234567890987654321234567890987654321)); // 1234567890987654334677226778884308992n -- only works up to 53-bit limit
console.log(BigInt(1234567890)); // 1234567890n

// BigInt Operations
console.log(10000n + 10000n); // 20000n
console.log(1234567890987654321234567890987654321n + 1n); // 1234567890987654321234567890987654322n
// console.log(1234567890987654321234567890987654321n + 1); // script.js:371 Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
// CASTING
const hugeNum = 1234567890987654321234567890987654321n;
const intNum = 1;
console.log(hugeNum + BigInt(intNum)); // 1234567890987654321234567890987654322n

// exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false first is bigint, second is int
console.log(20n == 20); // true
console.log(hugeNum + ' is really big!'); // coerced into a string value

// Math functions
// console.log(Math.sqrt(16n)); // Uncaught TypeError: Cannot convert a BigInt value to a number
console.log(10n / 3n); // 3n
console.log(10 / 3); //3.3333333333333335

// DATES and TIME
// create a date -- there are 4 ways
const now = new Date();
console.log(now); // Fri Apr 30 2021 21:45:25 GMT-050

const now2 = new Date('Aug 02 2020 18:05:41');
console.log(now2); // Sun Aug 02 2020 18:05:41 GMT-0500 (Central Daylight Time)

const now3 = new Date('December 24, 2015'); // not recommended to just type in something; can be unreliable; best to take values generated by Javascript
console.log(now3); //Thu Dec 24 2015 00:00:00 GMT-0600 (Central Standard Time)

const now4 = new Date('2019-11-18T21:31:17.178Z'); // Z == UTC (Coordinated Universal Time is the time in London with no time zone and no daylight savings time
console.log(now4); // Mon Nov 18 2019 15:31:17 GMT-0600 (Central Standard Time)

const now5 = new Date(2037, 10, 19, 15, 23, 5);
console.log(now5); // Thu Nov 19 2037 15:23:05 GMT-0600 (Central Standard Time)
// months array is zero-based, so November is month at index 10
console.log(new Date(2037, 10, 31));
// Tue Dec 01 2037 00:00:00 GMT-0600 (Central Standard Time)
// Javascript auto-corrected to December 1st, because November has only 30 days in it

// pass into the Date constructor the number of milliseconds after Unix Time (midnight, January 1, 1970)
console.log(new Date(0)); // Wed Dec 31 1969 18:00:00 GMT-0600 (Central Standard Time)
// NOT offset for timezone
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sat Jan 03 1970 18:00:00 GMT-0600 (Central Standard Time)
// 3 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
// === 259200000 is the timestamp, which is useful

// Dates are objects, so the have properties and methods
// DATE METHODS
const future = new Date(2037, 10, 19, 15, 23);

console.log(future); // Thu Nov 19 2037 15:23:00 GMT-0600 (Central Standard Time)
console.log(future.getFullYear()); // 2037 -- DO NOT use getYear()
console.log(future.getMonth()); // 10 -- so, November
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4 -- zero is Sunday, so 4 is Thursday
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // `2037-11-19T21:23:00.000Z`;

console.log(future.getTime()); // 2142278580000
console.log(new Date(2142278580000)); // matches
// Thu Nov 19 2037 15:23:00 GMT-0600 (Central Standard Time)

// Timestamp for now
console.log(Date.now()); // 1619838847949
console.log(new Date(1619838847949)); // the date string when I ran Date.now()
// Fri Apr 30 2021 22:14:07 GMT-0500 (Central Daylight Time)//

// DATE setters match the getters (above)
future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040 15:23:00 GMT-0600 (Central Standard Time)

// DATE CALCULATIONS WITH TIMESTAMPS -- for complex things, use a library like Moment.js
const futureCalc = new Date(2037, 10, 19, 15, 23);
console.log('futureCalc Number()', Number(futureCalc));
console.log('futureCalc with + ', +futureCalc);

const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
const calcDays1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log('calcDays1 ', calcDays1);

// INTERNATIONALIZATION
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
// Dates and Times
const nowInter = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long', // numeric, long, 2-digit
  year: 'numeric', // 2-digit
  weekday: 'long', // short, narrow
};
const locale = navigator.language;
console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
  nowInter
);

// Numbers
const number = 3884764.23;

const optionsObj = {
  style: 'unit', // 'percent', 'currency' (only these three)
  unit: 'mile-per-hour', // many of these; find in MDN documentation, 'celsius'
  // currency: 'EUR' // required if style is set to currency
  useGrouping: false, // or true, use the periods and commas, etc, in output or not
};

console.log('US: ', new Intl.NumberFormat('en-US', optionsObj).format(number));
console.log(
  'Germany: ',
  new Intl.NumberFormat('de-DE', optionsObj).format(number)
);
console.log(
  'Syria: ',
  new Intl.NumberFormat('ar-SY', optionsObj).format(number)
);
console.log(
  'Browser: ',
  new Intl.NumberFormat(navigator.language, optionsObj).format(number)
);

// TIMERS -- setTimeout() and setInterval()
// setTimeout() runs after specified amount to time in milliseconds (3000 == 3 seconds)
// setInterval() runs continuously at the set time interval until it is turned off
// these do not block subsequent code from running -- they are asynchronous functions
// these are scheduled to run on the event loop

// schedule the run of a function with setTimeout()
setTimeout(() => console.log('Here is your pizza 🍕'), 2000);

setTimeout(
  (ing1, ing2) => console.log(`Here's your ${ing1} and ${ing2} pizza 🍕`),
  4000,
  'Canadian Bacon',
  'Pineapple'
);

// CANCEL the timer with clearTimeout()
const ingredients = ['Sausage', 'Olives', 'Mushrooms'];
const pizzaTimer = setTimeout(
  (ing1, ing2, ing3) =>
    console.log(`Here's your ${ing1}, ${ing2}, and ${ing3} pizza 🍕`),
  6000,
  ...ingredients
);
if (ingredients.includes('Sausage')) clearTimeout(pizzaTimer);

// setInterval()
/*
setInterval(function () {
  const nowI = new Date();
  const nowHour = `${nowI.getHours()}`.padStart(2, 0);
  const nowMinutes = `${nowI.getMinutes()}`.padStart(2, 0);
  const nowSeconds = `${nowI.getSeconds()}`.padStart(2, 0);
  console.log(`${nowHour}:${nowMinutes}:${nowSeconds}`);
}, 1000);
*/
