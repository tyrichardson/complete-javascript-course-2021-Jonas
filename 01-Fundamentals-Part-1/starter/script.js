// Intro to JS
// string literal
let js = "amazing";
let firstName = "Jonas";
firstName = "Ty";
const PI = 3.1415;
console.log(`${40 + 8 + 23 - 10}, ${firstName}, ${PI}`);
// Data Types -- Dynamic Typing / Type Coercion
// Primitive Data Types: number, string, boolean, undefined, null, symbol (unique & cannot be changed), bigInt (larger value than Number can handle)
// Primitives are data that are not objects and do not have methods; they are not mutable (they are always reassigned)
// Primitive Wrapper Objects provide methods to primitives (e.g., string.length)
let jsIsFun = true;
console.log(jsIsFun);
console.log(typeof true, typeof tip, typeof firstName, typeof 23, typeof "Ty");
console.log(firstName.length);
// Operators
console.log(2 ** 3); // ** === exponential
// evaluate Math by order of precedence; evaluate Assignment from right-to-left
let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);
// challenge one & two
let markMass = 80;
let markHeight = 1.69;
let johnMass = 92;
let johnHeight = 1.95;
let markBMI = Math.round(markMass / (Math.pow(markHeight, 2)));
let johnBMI = Math.round(johnMass / (Math.pow(johnHeight, 2)));
if (markBMI > johnBMI) {
    // concatenation
  console.log("Mark's BMI of " + markBMI + " is higher than John's " + johnBMI);
} else {
    // string template
  console.log(`John's BMI of ${johnBMI} is higher than Mark's of ${markBMI}`);
}
// challenge three
let dolphinsArr = [[96, 108, 89], [97, 112, 101], [97, 112, 101]];
let koalasArr = [[88, 91, 110], [109, 95, 123], [109, 95, 10]];
let dolphinsAvgArr = [];
let koalasAvgArr = [];
for (let i = 0; i < dolphinsArr.length; i++) {
    dolphinsAvgArr[i] = (dolphinsArr[i][0] + dolphinsArr[i][1] + dolphinsArr[i][2]) / 3;
    koalasAvgArr[i] = (koalasArr[i][0] + koalasArr[i][1] + koalasArr[i][2]) / 3;
}
for (let i = 0; i < dolphinsAvgArr.length; i++) {
    if (dolphinsAvgArr[i] == koalasAvgArr[i] && (dolphinsAvgArr[i] > 100 && koalasAvgArr[i] > 100)) {
        console.log(`Dolphins and Koalas tie with scores over 100.`)
        } else if (dolphinsAvgArr[i] > koalasAvgArr[i] && dolphinsAvgArr[i] > 100) {
            console.log(`Dolphins win over Koalas! Trophy awarded!`);
        } else if (koalasAvgArr[i] > dolphinsAvgArr[i] && koalasAvgArr[i] > 100){
            console.log(`Koalas win over Dolphins! Trophy awarded!`);
        }
    }
// challenge four
let tip;
let bill = [275, 40, 430];
let billPlusTip;
for (let i = 0; i < 3; i++) {
    tip = (bill[i] > 50 && bill[i] < 300) ? .15 : .20;
    billPlusTip = bill[i] + (bill[i] * tip);
    console.log(`The bill was ${bill[i]}, the tip was ${Math.fround(tip * bill[i])}, and the total value ${billPlusTip}`);
}


