'use strict';

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0), // [0, 0, 0, 0]
};

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:

// 1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
/*
  What is your favorite programming language?
  0 : JavaScript
  1: Python
  2: Rust
  3: C++
  (Write option number)

  */
// 1.2. Based on the input number, update the 'answers' array property. For example, if the option is 3, increase the value at position 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g., answer 52 wouldn't make sense, right?)

poll.registerNewAnswer = function () {
  let input = Number(
    prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`
    )
  );
  typeof input === 'number' &&
    input < this.answers.length &&
    this.answers[input]++;

  this.displayResults('string');
  this.displayResults.call({ answers: ['Peter', 'Paul', 'Mary', 123] });
  this.displayResults.call(
    { answers: ['Peter', 'Paul', 'Mary', 123] },
    'string'
  );
};

// 2. Call this method whenever the user clicks the "Answer poll" button.
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".

poll.displayResults = function (type = 'array') {
  if (type == 'array') {
    console.log(this.answers);
  } else if (type == 'string') {
    console.log(`Poll results are ${this.answers.join(', ')}`);
  }
};

// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?

// test data for bonus feature
let data1 = [5, 2, 3];
let data2 = [1, 5, 3, 9, 6, 1];

poll.displayResults.call({ answers: data1 }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
