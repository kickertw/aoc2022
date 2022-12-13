import { readAndNewLineSplit } from "./utils/utils.ts";

class Monkey {
    items:number[] = [];
    operation:string | undefined;
    test = 0;
    testTrueMonkeyIdx = 0;
    testFalseMonkeyIdx = 0;
}

const inputs = await readAndNewLineSplit('input.txt');

// Initializing monkeys
const monkeys:Monkey[] = [];
for(let ii = 0; ii < inputs.length; ii++) {
    const tempMonkey = new Monkey();
    const monkeyIdx = parseInt(inputs[ii].charAt(7));

    tempMonkey.items = inputs[ii+1].substring(18).split(', ').map(val => { return parseInt(val) });
    tempMonkey.operation = inputs[ii+2].split(' = ').at(-1);
    tempMonkey.test = parseInt(inputs[ii+3].substring(21));
    tempMonkey.testTrueMonkeyIdx = parseInt(inputs[ii+4].slice(-1));
    tempMonkey.testFalseMonkeyIdx = parseInt(inputs[ii+5].slice(-1));
    monkeys[monkeyIdx] = tempMonkey;
    ii += 6;
}

// Running monkeys
const totalRounds = 1;
for(let ii = 0; ii < totalRounds; ii++) {
    for(let jj = 0; jj < monkeys.length; jj++) {
        //inspect an item
        for(const item of monkeys[jj].items) {
            let new = 0;
            let newFormula = monkeys[jj].operation?.replace('old', item.toString());
            eval(`new = ${newFormula}`);
            if (new)
        }
    }
}