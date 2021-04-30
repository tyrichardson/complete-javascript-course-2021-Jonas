"use strict";

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.

A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

1. Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia'and 'dogsKate'), and does the following things:
  
  1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
  
  2. Create an array with both Julia's (corrected) and Kate's data
  
  3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
  
  4. Run the function for both test datasets
  
  Test data:
  Data1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
  Data2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

const checkDogs = function (dogsJulia, dogsKate) {
  let dogsJuliaCopy = [...dogsJulia];
  // or dogsJulia.slice();
  dogsJuliaCopy.splice(0, 1);
  dogsJuliaCopy.splice(-2);
  // or dogsJulia.slice(1, 3)
  let allDogsArr = dogsJuliaCopy.concat(dogsKate);
  allDogsArr.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult, and it is ${dog}-years old.`
      );
    } else {
      console.log(`Dog number ${i + 1} is still a 🐶`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log("***");
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Challenge 2
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
1: Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
  1.Calculate the dog age in human years using the following formula: 
    If the dog is <= 2years old, humanAge = 2 * dogAge. 
    If the dog is > 2years old, humanAge = 16 + dogAge * 4.
  2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
  3.Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
  4.Run the function for both test datasets
  Test data:
  Data1: [5, 2, 4, 1, 15, 8, 3]
  Data2: [16, 6, 10, 5, 6, 1, 4]


const calcAverageHumanAge = (ages) => {
  let humanAges = ages
    .map((age) => (age <= 2 ? age * 2 : age * 4 + 16))
    .filter((humanAges) => humanAges >= 18);
  let avg = humanAges.reduce((acc, cur) => acc + cur, 0);
  console.log("average dogAge ", avg / humanAges.length);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

// Challenge 3
/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge (above), but this time a an arrow function, and using chaining!
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/
const calcAverageHumanAge = (ages) =>
  ages
    .map((age) => (age <= 2 ? age * 2 : age * 4 + 16))
    .filter((humanAges) => humanAges >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

let avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
let avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// Challenge 4
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

console.log("original dogs ", dogs);

// Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended * 1.10)
// the current portion should be between 90 % and 110 % of the recommended portion

dogs.forEach((el) => {
  el.recommendedFood = Math.trunc(el.weight ** 0.75 * 28);
});

console.log("forEach dogs recommendedFood", dogs);

/*
let sarahDog = dogs.findIndex((el) => el.owners.includes("Sarah"));
console.log("sarahDog ", sarahDog);

if (dogs[sarahDog].curFood < dogs[sarahDog].recommendedFood * 0.9) {
  console.log(`Sarah's dog is eating too little.`);
} else if (dogs[sarahDog].curFood > dogs[sarahDog].recommendedFood * 1.1) {
  console.log(`Sarah's dog is eating too much.`);
} else {
  console.log(`Sarah's dog is eating a healthy amount of food.`);
}
*/
// OR
const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log("sarahDog ", sarahDog);
console.log(
  `Sarah's dog is eating too ${
    sarahDog.curFood > sarahDog.recommendedFood * 1.1 ? "much" : "little"
  }` // not really the proper formula for discovering if curFood is in range
);

const ownersEatTooMuch = dogs
  .filter((el) => el.curFood > el.recommendedFood)
  .flatMap((el) => el.owners);

const ownersEatTooLittle = dogs
  .filter((el) => el.curFood < el.recommendedFood)
  .flatMap((el) => el.owners);

console.log("ownersEatTooMuch ", ownersEatTooMuch);
console.log("ownersEatTooLittle ", ownersEatTooLittle);

/*
let namesM = "";
let namesL = "";
let m = [];
let l = [];

ownersEatTooMuch.forEach((el) => {
  namesM += `${el} `;
  let arr = namesM.split(" ");
  arr.splice(-1);
  m = arr.join(" and ");
});
console.log(`${m}'s dogs eat too much!`);

ownersEatTooLittle.forEach((el) => {
  namesL += `${el} `;
  let arr = namesL.split(" ");
  arr.splice(-1);
  l = arr.join(" and ");
});
console.log(`${l}'s dogs eat too little!`);
*/
// OR
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

console.log(
  `There is a dog eating exactly the right amount of food: ${dogs.some(
    (el) => el.curFood === el.recommendedFood
  )}`
);

const checkEatingOkay = (el) =>
  el.curFood > el.recommendedFood * 0.9 &&
  el.curFood < el.recommendedFood * 1.1;

console.log(
  `There is a dog eating an okay amount of food: ${dogs.some(checkEatingOkay)}`
);

const goodDogOwners = dogs.filter(checkEatingOkay);

console.log("goodDogOwners ", goodDogOwners);

let shallowArr = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(shallowArr);

/*
const ownersEatTooMuch = dogs
  .filter((el) => el.curFood > el.recommendedFood)
  .flatMap((el) => el.owners)
  .reduce((acc, cur) => {
    acc.push(cur);
    return acc;
  }, []);
  */
