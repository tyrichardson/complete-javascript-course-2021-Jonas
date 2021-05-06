'use strict';
/*
CHALLENGE 1
Use a constructor function to implement a 'Car'.
A car has a 'make' and a 'speed' property.
The 'speed' property is the current speed of the car in km/h.
Implement an 'accelerate' method that will increase the car's speed by 10, 
and log the new speed to the console.
Implement a 'brake' method that will decrease the car's speed by 5, 
and log the new speed to the console.
Create two 'Car' objects and experiment with calling 
'accelerate' and 'brake' multiple times on each of them.
Test data:
Data car1: 'BMW' going at 120 km/h
Data car2: 'Mercedes' going at 95 km/h
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed; // km/h
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`The ${this.make} accelerated to ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The ${this.make} braked to ${this.speed} km/h`);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(bmw);
console.log(mercedes);
bmw.accelerate();
mercedes.accelerate();
bmw.brake();
mercedes.brake();

// CHALLENGE 3
/*
Use a constructor function to implement an Electric Car (called 'EV') as a child "class"of 'Car'.
Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%, Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! Hint:Review the definition of polymorphism 😉 
Test data:
Data car1: 'Tesla' going at 120 km/h, with a charge of 23%
*/
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
// tie EV __proto__ to Car prototype
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
// example of polymorphism -- child method overwriting an inherited parent method of same name
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going ${this.speed} km/h, with a charge of ${this.charge}.`
  );
};
const tesla = new EV('Tesla', 120, 23);
console.log('tesla ', tesla);
tesla.brake();
tesla.accelerate();
tesla.chargeBattery(50);
tesla.accelerate();
tesla.__proto__.__proto__.accelerate(); // 'The undefined accelerated to NaN km/h' -- the Car accelerate()
console.dir(tesla);

/*
CHALLENGE 2
Re-create Challenge #1, but this time using an ES6 class(call it 'CarCl')
Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
Add a setter called 'speedUS' which sets the current speed in mi/h
(but converts it to km/h before storing the value, by multiplying the input by 1.6)
Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.
Test data:
Data car1: 'Ford' going at 120 km/h
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  get speedUS() {
    console.log(
      `The ${this.make} is going ${this.speed} km/h, which is ${
        this.speed / 1.6
      } mph`
    );
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
  accelerate() {
    this.speed += 10;
    console.log(`The ${this.make} accelerated to ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`The ${this.make} braked to ${this.speed} km/h`);
    return this;
  }
}
const ford = new CarCl('Ford', 120);
console.log(ford);
ford.speedUS;
ford.accelerate();
ford.brake();
ford.speedUS = 50;
ford.speedUS;
ford.accelerate();
ford.brake();

/*
CHALLENGE 4
Re-create Challenge #3, but this time using ES6 classes: 
Create an 'EVCl' child class of the 'CarCl' class
Make the 'charge' property private
Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class
Update the 'brake' method in the 'CarCl' class for chaining
Then experiment with chaining!
Test data:
Data car1: 'Rivian' going at 120 km/h, with a charge of 23%
*/

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} accelerated to ${
        this.speed
      } km/h, and now has a charge of ${this.#charge}.`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log('rivian ', rivian);
rivian.brake();
rivian.accelerate();
rivian.chargeBattery(50);
rivian.accelerate();
rivian.speedUS;
rivian.__proto__.__proto__.accelerate(); // 'The undefined accelerated to NaN km/h' -- the CarCL accelerate()
console.dir(rivian);
rivian.brake().chargeBattery(75).accelerate(); // the last method displays, having acted on the previous methods
