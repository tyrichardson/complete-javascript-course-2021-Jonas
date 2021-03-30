'use strict'; // enforces block scoping from ES6

function calcAge(birthYear) {
  const age = 2021 - birthYear;
  // this is undefined
  console.log('calcAge ', this);

  function printAge() {
    const output = `You are ${age}, for in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1940 && birthYear <= 1964) {
      var boomer = true;
      const str = `Oh, and you're a boomer, ${firstName}`;
      console.log(str);
      function add(a, b) {
        return a + b;
      }
      console.log(add(2, 3));
    }

    // add(2, 3); // not accessible, block scope

    console.log(boomer); // var accessible
    // console.log(output); // let not accessible
  }

  // console.log(boomer); // function scope
  printAge();
  return age;
}

// const firstName = 'Ty';
calcAge(1963);
// console.log(age); // not accessible

// this == Window object, the this of its scope
console.log(this);

const calcAgeArrow = birthYear => {
  const age = 2021 - birthYear;
  // this == Window object (finds this of its parent scope)
  console.log('calcAgeArrow ', this);
};
calcAgeArrow(1975);

const ty = {
  birthYear: 1983,
  calcAge: function () {
    // this == ty object
    console.log(this);
    console.log(2021 - this.birthYear);
  },
};
// this is the ty object because it was called by on ty object
ty.calcAge();

const matilda = {
  birthYear: 1993,
};
// method borrowing
matilda.calcAge = ty.calcAge;
// this == matilda object (displayed in console)
matilda.calcAge();

const func = ty.calcAge;
console.log('func ', func);
// no property "birthYear", so throws error
// func();

const tyGuy = {
  firstName: 'Ty',
  birthYear: 1963,
  calcAge: function () {
    console.log(this);
    console.log(2021 - this.birthYear);

    // means of capturing this == tyGuy to use below so function call isBoomer() will have "this" set to tyGuy by using "self"
    // ES6 has the solution of the arrow function
    const self = this;

    const isBoomer = function () {
      console.log(this);
      //  console.log(this.birthYear >= 1945 && this.birthYear <= 1964);

      console.log(self);
      console.log(self.birthYear >= 1945 && self.birthYear <= 1964);
    };
    // plain old function calls have this == undefined
    isBoomer();
  },
  // never use arrow functions as methods
  greet: () => console.log(`Hey, ${this.firstName}!`),
};

var firstName =
  'used var in the global scope, so there is a property firstName on the Window object, so this.firstName = this string.';
// displays "Hey, undefined!" because this == parent object, so this.firstName is undefined (whereas just "this" would be the Window object, on which there is no "firstName" property)
tyGuy.greet();
tyGuy.calcAge();

//ES6
const tyTy = {
  firstName: 'Ty',
  birthYear: 1963,
  calcAge: function () {
    console.log(this);
    console.log(2021 - this.birthYear);

    // arrow function with take this of parent (tyTy)
    // isBoomer is not a method on tyTy object
    const isBoomer = () => {
      console.log(this.birthYear >= 1945 && this.birthYear <= 1964);
    };
    isBoomer();
  },
};
tyTy.calcAge();

// Arguments keyword -- does not exist in arrow functions
// is an array that contains all arguments passed into function
const argsKeyword = function (a, b) {
  console.log(arguments);
  return a + b;
};
argsKeyword(2, 5, 8, 12);

// primitive vs object mutability
// objects by reference, not value
let age = 30;
let oldAge = age;
age = 35;
console.log('age ', age);
console.log('oldAge ', oldAge);

const me = {
  name: 'Ty',
  age: 58,
  family: ['Dennis', 'Sharon', 'Lori', 'Brit'],
};

// how to copy an object, instead of just referring to one
let me2 = Object.assign({}, me);
console.log('me2.age: ', me2.age);

// only creates a shallow copy, not a deep clone
// doesn't copy objects inside the object (nested objects, e.g., arrays, objects...)
me2.family.push('Julie');
console.log('me2.family ', me2.family);
console.log('me family ', me.family);
// the array object is by reference, and both objects point to the same array
// to make a deep clone of an object, use a library (like lodash)

const friend = me;
friend.age = 23;
console.log('friend ', friend);
console.log('me ', me);

// how to copy an object, instead of just referring to one
me2 = Object.assign({}, me);
console.log('me2 reassigned to me after friend changes ', me2.age);
