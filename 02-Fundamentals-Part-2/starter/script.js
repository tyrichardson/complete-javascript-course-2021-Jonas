'use strict'; // provides great error messages
// Programming is mostly getting data, storing data, processing data, and returning data
function logger () {
    console.log('My name is Ty.')
}
logger();
logger();
logger();
// function declaration (function with a name)
// hoisted, so can be called "before" line appears in code
function fruitProcessor(apples, oranges) {
    // console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);
let num = Number('23'); // convert string to number
console.log(typeof num);
function calcAge1(birthYear) {
    return 2021 - birthYear;   
}
let currentAge = calcAge1(1963);
console.log(currentAge);
// function expression (anonymous function)
const calcAge2 = function (birthYear) {
    return 2021 - birthYear;
}
const currentAge2 = calcAge2(1963);
console.log(currentAge2);
// arrow function (ES6), are bound w/ "this" keyword
const calcAge3 = (birthYear) => 2021 - birthYear;
console.log(calcAge3(1963));
const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2021 - birthYear;
    return `${firstName} can retire in ${65 - age} years.`;
}
console.log(yearsUntilRetirement(1963, 'Ty'));
// functions calling other functions
function cutFruitPieces(fruit) {
    return fruit * 4;
}
function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange`;
    return juice;
}
console.log(fruitProcessor(2, 3));
// code challenge 1
let dolphinsArr1 = [44, 23, 71];
let koalasArr1 = [65, 54, 48];
let dolphinsArr2 = [85, 54, 41];
let koalasArr2 = [23, 34, 27];
const checkWinner = (dAvg, kAvg) => {
    let winner;
    if (dAvg >= kAvg * 2) {
        winner = `Dolphins win (${dAvg} vs. ${kAvg})`;
    } else if (kAvg >= dAvg * 2) {
        winner = `Koalas win (${kAvg} vs. ${dAvg})`;
    } else {
        winner = `No winner`;
}
    return winner;
}  
const calcAverage = (dArr, kArr) => {
    let dAvg = (dArr[0] + dArr[1] + dArr[2]) / 3;
    let kAvg = (kArr[0] + kArr[1] + kArr[2]) / 3;
    let winner = checkWinner(dAvg, kAvg);
    return winner;
}
console.log(calcAverage(dolphinsArr1, koalasArr1));
console.log(calcAverage(dolphinsArr2, koalasArr2));
// Data Structure: Array
// Literal syntax
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);
// Constructor syntax
const years = new Array(1991, 1984, 2008, 2020);
console.log(years);
console.log(friends[0], years[2]);
// array property "length"
console.log(friends.length, friends[friends.length - 1]);
// mutate the array = reassign value(2) held in the array
// did not change which array assigned to const friends (array reference not changed)
friends[2] = 'Jay';
console.log(friends[2]);
const ty = ['Ty', 'Richardson', 2021 - 1963, 'hopeful', friends];
console.log(`Ty's age is ${ty[2]} and his friends are ${friends}`);
const calculateAge = function(birthYear) {
    return 2021 - birthYear;
}
console.log(calculateAge(years[2]), calculateAge(years[3]));
const agesArr = [calculateAge(years[2]), calculateAge(years[3])];
console.log(agesArr);
// built-in array methods: push & unshift (return length); pop & shift (return removed element value);)
const l1 = friends.push('Jacob', 'David');
console.log(friends, l1);
const l2 = friends.unshift('Bob');
console.log(friends, l2);
const el1 = friends.pop();
console.log(friends, el1);
const el2 = friends.shift();
console.log(friends, el2);
console.log(friends.indexOf('Steven'));
console.log(friends.includes('Steven')); // returns true or false
// indexOf element value that doesn't exist returns -1
console.log(friends.indexOf('Ty'));
console.log(friends.includes('Ty'));
if (friends.includes('Peter')) {
    console.log(`You have a friend named Peter.`);
} else {
    console.log(`You do not have a friend named Peter.`);
}
// code challenge 2
let tip;
let bill = [125, 555, 44];
let billPlusTip;
for (let i = 0; i < 3; i++) {
    tip = (bill[i] > 50 && bill[i] < 300) ? .15 : .20;
    tip = tip.toFixed(2);
    billPlusTip = bill[i] + (bill[i] * tip);
    console.log(`The bill was ${bill[i]}, the tip was ${(tip * bill[i])}, and the total value ${billPlusTip}`);
}
