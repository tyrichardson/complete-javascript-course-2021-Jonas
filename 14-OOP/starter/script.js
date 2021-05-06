'use strict';
// A constructor function is a normal function, we just call it using the keyword "new"
// by convention, class names are capitalized
// arrow functions cannot work as constructors, because they do not bind "this"
// not really classes, but a pattern for prototypal inheritance

// CONSTRUCTOR function example:
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  /* Bad practice to create a method like this w/in a Class constructor object -- not DRY
  this.calcAge = function () {
    console.log(2020 - this.birthYear);
  };
  */
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

/*
  What happens when the function is called with new, as above?
  1. a new, empty object is created: {}
  2. function is called, "this" assignment made: this = {}
  3. this {} is linked to the object prototype
  4. function is automatically returns the object, empty or populated -- an instance
  */

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1927);
console.log(matilda, jack);

const ty = { firstName: 'Ty', birthYear: 1963 };
console.log(jonas instanceof Person); // true
console.log(ty instanceof Person); // false
const tyArr = [{ firstName: 'Ty', birthYear: 1963 }];

// PROTOTYPES -- all JS objects have a property named prototype, like Person.prototype
// Person.prototype => the methods and properties inherited by instances of Person
// METHODS should be set to the prototype property of Class constructors

Person.prototype.calcAge = function () {
  console.log(2020 - this.birthYear);
};
console.log(Person.prototype);

console.log(jonas.calcAge());
console.log(jonas);
// calcAge is not on the object, but it is accessible via prototypal inheritance
// DRY -- only one copy exists, but all instances can access it
// this is bound to the object calling the method via the Class constructor/prototype
console.log(jonas.__proto__); // === Person.prototype
// {calcAge: ƒ, constructor: ƒ}
// calcAge: ƒ ()
// constructor: ƒ (firstName, birthYear)
// __proto__: Object

// Person.prototype is the prototype used to create instances of Person
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false
// .prototype property might be better called .prototypeOfLinkedObjects or some such
// .__proto__ is set to prototype of its constructor, such as Person.prototype

// PROPERTIES can be set to the prototype of Class constructors
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);
// species is not on the instance object, NOT its own property
console.log(jonas.hasOwnProperty('species')); // false
console.log(jonas.hasOwnProperty('firstName')); // true

// PROTOTYPE CHAIN

console.log(jonas.__proto__.__proto__); // === Person.__proto__
console.log(jonas.__proto__.__proto__.__proto__); // null
console.log(Person.prototype.constructor); // the Person Class function definition
console.log(tyArr.__proto__); // properties and methods of Array constructor
console.log(tyArr.__proto__ === Array.prototype); // true
console.log(tyArr.__proto__.__proto__ === Object.prototype); // true

// CAN ADD METHODS AND PROPERTIES TO THE ARRAY.PROTOTYPE OBJECT
// NOT a good idea to extend a built-in prototype method or property
const arr = [3, 6, 3, 6, 3, 6, 4, 5, 4, 5, 9, 3, 9, 3, 9, 3, 2, 1];
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique()); // (7) [3, 6, 4, 5, 9, 2, 1]

const h1 = document.querySelector('h1');
console.dir(h1); // large number of properties and methods
/* The Prototype Chain of h1
__proto__: HTMLHeadingElement:
__proto__: HTMLElement
__proto__: Element
__proto__: Node
__proto__: EventTarget
__proto__: Object
*/

console.dir(x => x + 1);
/* anonymous()
arguments: (...)
caller: (...)
length: 1
name: ""
__proto__: ƒ ()
 [[FunctionLocation]]: script.js:100
[[Scopes]]: Scopes[2]
*/
// __proto__ unfolded:
/*
__proto__: ƒ ()
apply: ƒ apply()
arguments: (...)
bind: ƒ bind()
call: ƒ call()
caller: (...)
constructor: ƒ Function()
length: 0
name: ""
toString: ƒ toString()
Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
get arguments: ƒ ()
set arguments: ƒ ()
get caller: ƒ ()
set caller: ƒ ()
__proto__: Object
[[FunctionLocation]]: ​
[[Scopes]]: Scopes[0]
*/

// ES6 UPDATE TO OOP/Prototypal Inheritance/class constructors (just syntax)
// methods NOT on instance objects, but on class prototype automatically
// CLASSES ARE NOT HOISTED
// CLASSES ARE FIRST-CLASS FUNCTIONS (can be passed into and returned from functions)
// CLASSES ARE ALWAYS EXECUTED IN STRICT MODE

// class expression example:
const AreaClass = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

// class declaration example:
class PersonClass {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2021 - this.birthYear);
  }
  get age() {
    return 2021 - this.birthYear;
  }
}

const jessica = new PersonClass('Jessica', 2011);
jessica.calcAge(); // is not on jessica instance, but on __proto__
console.log(jessica);
/*
PersonClass {firstName: "Jessica", birthYear: 2011}
birthYear: 2011
firstName: "Jessica"
__proto__: Object
*/
console.log(jessica.__proto__ === PersonClass.prototype); // true

PersonClass.prototype.greet = function () {
  console.log(`Hey, ${this.firstName}!`);
};
jessica.greet(); // Hey, Jessica!

// GETTER AND SETTER PROPERTIES -- NOT REQUIRED, BUT CAN BE USEFUL
// Accessor Properties, as opposed to Data Properties
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop(); // creates array with one element, then pops it
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // written like a property, not called like a method
console.log((account.latest = 50)); // assigned a value like a
console.log(account.movements);

console.log(jessica.age); // 10

// VALIDATION USING GETTERS AND SETTERS
class PersonFull {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  get age() {
    return 2021 - this.birthYear;
  }
  // Setting a property that already exists: create new property with _ and a getter for it
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name.`);
    }
  }
  get fullName() {
    return this._fullName;
  }
  // Static Method (as opposed to Instance Method)
  static hey = function () {
    console.log('Hey there! 👋');
  };
}

const francis = new PersonFull('Francis Farmer', 1921);
console.log(francis); // PersonFull {_fullName: "Francis Farmer", birthYear: 1921}
// need a getter to access _fullName; the setter hides fullName property
console.log(francis.fullName); // Francis Farmer
// without the getter, this returns undefined

// const walter = new PersonFull('Walter', 1965); // get the alert, but instance still created
// console.log(walter); // PersonFull {birthYear: 1965}

// STATIC METHODS -- methods on the Array constructor, not its instances
const example = Array.from(document.querySelectorAll('h1'));
console.log(example); // [h1]
// console.log(example.from()); // is NOT a thing
// examples are like Math.abs(), Number.parseInt()...

PersonFull.hey();
// francis.hey(); // script.js:239 Uncaught TypeError: francis.hey is not a function
// Add static methods to class like this, too
// PersonFull.hey = function () {
//   console.log('Hey there! 👋');
// };

// OBJECT.CREATE -- allows "true" class inheritance
// Third way to do prototypal inheritance -- manually set the prototype for an object
// example:
// Create an Object Literal
const PersonProto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
};
const steven = Object.create(PersonProto);
console.log(steven);
/*
{}
__proto__:
  calcAge: ƒ calcAge()
  __proto__: Object
*/
steven.name = 'Steven';
steven.birthYear = 1952;
steven.calcAge(); // 69
console.log(steven.__proto__ === PersonProto); // true -- PersonProto is calcAge;
/*
{calcAge: ƒ}
calcAge: ƒ calcAge()
__proto__: Object
*/

// create the object automatically using a new method in our class
const PersonProtoAuto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const sarah = Object.create(PersonProtoAuto);
sarah.init('Sarah', 1999);
sarah.calcAge(); // 22

// REAL INHERITANCE BETWEEN CLASSES
// CONSTRUCTOR FUNCTIONS AND CLASSNAME.PROTOTYPE METHODS
// Parent and Child classes
// Parent is most general
const PersonPC = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonPC.prototype.calcAgeCl = function () {
  console.log(2021 - this.birthYear);
};

// Child is more specific, with unique properties and methods
const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  PersonPC.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(PersonPC.prototype);

Student.prototype.introduce = function () {
  console.log(`Hi. My name's ${this.firstName}, and I'm in ${this.course}.`);
};

Student.prototype.constructor = Student;

const mike = new Student('Mike', 1952, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAgeCl(); // 69
console.dir(mike);
/*
Student
birthYear: 1952
course: "Computer Science"
firstName: "Mike"
__proto__: PersonPC
constructor: ƒ (firstName, birthYear, course)
arguments: (...)
caller: (...)
length: 3
name: "Student"
prototype: PersonPC {introduce: ƒ, constructor: ƒ}
__proto__: ƒ ()
[[FunctionLocation]]: script.js:300
[[Scopes]]: Scopes[2]
introduce: ƒ ()
__proto__:
calcAgeCl: ƒ ()
constructor: ƒ (firstName, birthYear)
__proto__: Object
*/

// ES6 INHERITANCE BETWEEN CLASSES -- PARENT AND CHILD CLASSES
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2021 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.fullName}!`);
  }

  get age() {
    return 2021 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there 👋');
  }
}

// extends links the StudentCl.__proto__ to PersonCl prototype
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // provides "this", so must come in this place
    this.course = course;
    // own properties not required, but usually do exist
    // if they don't, no constructor/super required in the child class
  }

  introduce() {
    console.log(`Hi. My name's ${this.fullName}, and I'm in ${this.course}.`);
  }

  // polymorphism
  calcAge() {
    console.log(
      `I'm ${2021 - this.birthYear} years old, but I feel ${
        2021 - this.birthYear + 10
      }.`
    );
  }
}

const martha = new StudentCl('Martha Jones', 1973, 'Philosophy');
console.dir(martha);
martha.introduce();
martha.calcAge(); // polymorphism - method on the instance appears first in prototype chain

// OBJECT.CREATE() method for inheritance between classes -- parent / child
// using as parent PersonProtoAuto (above)
const steve = Object.create(PersonProtoAuto);

const StudentProtoAuto = Object.create(PersonProtoAuto);

StudentProtoAuto.init = function (firstName, birthYear, course) {
  PersonProtoAuto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProtoAuto.introduce = function () {
  console.log(`Hi. My name's ${this.firstName}, and I'm in ${this.course}.`);
};

const jay = Object.create(StudentProtoAuto);
jay.init('Jay', 2001, 'Drama');
jay.calcAge();
jay.introduce();
console.dir(jay);
/*
Object
birthYear: 2001
course: "Drama"
firstName: "Jay"
__proto__:
init: ƒ (firstName, birthYear, course)
introduce: ƒ ()
__proto__:
calcAge: ƒ calcAge()
init: ƒ init(firstName, birthYear)
__proto__:
constructor: ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
*/

// MORE ABOUT CLASSES
// create default properties
// create code that runs in constructor
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}!`);
  }

  // API (Application Public Interface)
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved.');
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// BAD IDEA to interact directly with properties in the following way!
// acc1.movements.push(250);
// acc1.movements.push(-200);
// SOME METHODS should not be public!
// acc1.approveLoan(50000);

acc1.deposit(250);
acc1.withdraw(140); // abstracted the negative sign out of the user's domain
acc1.requestLoan(1000);

console.log(acc1);

// How to make properties and methods inaccessible to users to protect them?
// ENCAPSULATION -- keep some methods and properties "private"
// protection / data privacy & prevent other people's code from breaking when we make changes in our classes
// NOT TRUE PRIVACY, but a CONVENTION AMONG DEVELOPERS:
// use convention of adding an underscore to make "PROTECTED PROPERTY"
// (but those in the know can still access it)
// team members will use _

class AccountE {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an accountE, ${owner}!`);
  }

  _approveLoan(val) {
    return true;
  }

  // API (Application Public Interface)
  getMovements() {
    return this._movements;
  }

  getPin() {
    return this._pin;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved.');
    }
  }
}

const accE1 = new AccountE('Jonas', 'EUR', 1111);
accE1.deposit(250);
accE1.withdraw(140);
console.log(accE1.getMovements());
console.log(accE1.getPin());
console.log(accE1);
console.log('accE1._movements not really private ', accE1._movements);

// TRULY PRIVATE PROPERTIES AND METHODS IN JAVASCRIPT CLASSES
// CLASS FIELDS PROPOSAL (properties are called fields in Java and C++)
// There are 8 fields in this proposal, these 4:
// Public fields
// Private fields
// Public methods -- not a change, the API
// Private methods
// ... and the same 4 as STATIC methods/properties on the class
class AccountP {
  // Public fields are on instances
  locale = navigator.language;

  // Private fields are on instances
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an accountP, ${owner}!`);
  }

  _approveLoan(val) {
    return true;
  }

  // API (Application Public Interface)
  // Public Methods
  getMovements() {
    return this.#movements;
  }

  getPin() {
    return this.#pin;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved.');
    }
    return this;
  }

  // Private Methods -- not yet implemented, but s/b like this:
  // #approveLoan(val) {
  //   return true;
  // }
}

const accP1 = new AccountP('Jonas', 'EUR', 1111);
accP1.deposit(250);
accP1.withdraw(140);
accP1.requestLoan(5000);
console.log(accP1.getMovements());
// console.log(accP1.#movements); // Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class
console.log(accP1.getPin());
console.log(accP1);

// CHAINING METHODS IN A CLASS
// return the object itself ("this") at the end of a method that we want to be chain-able
accP1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
// Loan approved.
console.log(accP1.getMovements()); // (8) [250, -140, 5000, 300, 500, -35, 25000, -4000]
