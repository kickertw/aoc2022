var fs = require('fs');

let data = fs.readFileSync('day1input.txt', 'utf8');
let input = data.toString().split(/\r?\n/);;

let allCalories: number[] = [];
let tempVal: number = 0;
let counter: number = 0;

for (var val of input) {
    if (val != '') {
        tempVal += parseInt(val);
    } else {
        allCalories.push(tempVal);
        tempVal = 0;
    }
}

allCalories.push(tempVal);
allCalories = allCalories.sort().reverse();

console.log(`max = ${allCalories[0]}, top 3 total = ${(allCalories[0] + allCalories[1] + allCalories[2])}`);