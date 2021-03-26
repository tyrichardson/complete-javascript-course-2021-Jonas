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
// Code Challenge 1
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
// array is a special type of object with built-in properties and methods 
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
// Code Challenge 2
let tip;
let bill = [125, 555, 44];
let billPlusTip;
for (let i = 0; i < 3; i++) {
    tip = (bill[i] > 50 && bill[i] < 300) ? .15 : .20;
    tip = tip.toFixed(2);
    billPlusTip = bill[i] + (bill[i] * tip);
    console.log(`The bill was ${bill[i]}, the tip was ${(tip * bill[i])}, and the total value ${billPlusTip}`);
}
// Data Structure: Objects (properties are unordered)
// Object Literal
const tyObj = {
    firstName: 'Ty',
    lastName: 'Richardson',
    age: 2021 - 1963,
    job: 'Bookseller',
    friends: friends
};
console.log(tyObj, tyObj.friends, tyObj['friends']);
const nameKey = 'Name';
console.log(tyObj['first' + nameKey] + " " + tyObj['last' + nameKey]);

// tyObj.location = "Minneapolis";

// Use brackets when property key must be an expression instead of the literal property key value. If it doesn't exist, undefined is returned.
// Dot Operator is "Member Access";
// Brackets Operator is "Calculated Member Access"

/*
/const interestedIn = prompt('What do you want to know about Ty? Choose between firstName, lastName, age, job, and friends');
console.log(tyObj[interestedIn]);
if (tyObj[interestedIn]) {
    console.log(tyObj[interestedIn]);
} else {
    console.log(`tyObj[${interestedIn}] doesn't exist as a property key on the object tyObj.`);
}
*/
// Challenge getting values from tyObj
console.log(`${tyObj.firstName} has ${tyObj.friends.length} friends, and his best friend is called ${tyObj.friends[0]}.`);
// Methods on an object (function expressions)
const objTy= {
    firstName: 'Ty',
    lastName: 'Richardson',
    birthYear: 1963,
    job: 'bookseller',
    friends: friends,
    hasDriversLicense: true,

    /* calcAge: function() {
         return 2021 - this.birthYear;
    } */
    // better to store the result and return it, in case it is an expensive operation
    calcAge: function() {
        this.age = 2021 - this.birthYear;
        return this.age;
    },

    getSummary: function() {
        return `${this.firstName} ${this.lastName} is a ${this.calcAge()}-year old ${this.job} who has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`;
    }
};
console.log(objTy.calcAge());
console.log(objTy['calcAge']());
// "this" refers to the object that called the method. In this case, calcAge() was called by objTy. So, this == objTy; Arrow functions don't work this way -- they are not bound by "this" to the object that called them.
// Challenge: create summary method
console.log(objTy.getSummary());
// Code Challenge 3
const markObj = {
    firstName: 'Mark',
    lastName: 'Miller',
    weight: 78,
    height: 1.69,

    calcBMI: function() {
        this.bmi = this.weight / (this.height ** 2);
        return this.bmi.toFixed(2);
    }
}
const johnObj = {
    firstName: 'John',
    lastName: 'Smith',
    weight: 92,
    height: 1.95,
    
    calcBMI: function() {
        this.bmi = this.weight / (this.height ** 2);
        return this.bmi.toFixed(2);
    }
}
if (markObj.calcBMI() > johnObj.calcBMI()) {
    console.log(`Mark's BMI (${markObj.calcBMI()}) is higher than John's (${johnObj.calcBMI()})`);
} else {
    console.log(`John's BMI (${johnObj.calcBMI()}) is higher than Mark's (${markObj.calcBMI()})`);
}
// Loops
// Flow Control that automates repetition; emojis from command + i
console.log(`Lifting weights rep 1 🏋️`);
console.log(`Lifting weights rep 2 🏋️`);
// etc.
for (let rep = 1; rep < 6; rep++) {
    console.log(`Lifting weights loop rep ${rep} 🏋️`);
}
// Continue skips the rest of the current iteration and starts loop again
// Break ends the loop and give control to next line of code
// Code Challenge 4
let tipsArr = [];
let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let totalsArr = [];
function calcTip(billsArr) {
    for (let i = 0; i < bills.length; i++) {
        tipsArr.push((billsArr[i] > 50 && billsArr[i] < 300) ? .15 : .20);
        totalsArr.push(billsArr[i] + (billsArr[i] * tipsArr[i]));
    }
}
calcTip(bills);
console.log(tipsArr, totalsArr);
function calcAvg(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    sum /= arr.length;
    return sum;
}
console.log(calcAvg(totalsArr));
