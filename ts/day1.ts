const data = await Deno.readTextFile('day1input.txt');
const input = data.toString().split(/\r?\n/);

let allCalories: number[] = [];
let tempVal = 0;

for (const val of input) {
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