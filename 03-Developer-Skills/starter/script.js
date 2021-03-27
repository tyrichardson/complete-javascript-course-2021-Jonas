// Remember, we're gonna use strict mode in all scripts now!
"use strict";
// Code Challenge 1
// take in an array and output each element in a statement
// function (arr)
// loop
// each element into a console.log statement

let arr1 = [17, 21, 23];
let arr2 = [12, 5, -5, 0, 4];
const printForcast = (arr) => {
  let str = "...";
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}\xB0C in ${i + 1} days... `;
  }
  return str;
};
console.log(printForcast(arr1));
console.log(printForcast(arr2));
