import { readAndNewLineSplit } from "./utils/utils.ts";

class Monkey {
    items:number[] = [];
    operation:string | undefined;
    test = 0;
    testTrueMonkeyIdx = 0;
    testFalseMonkeyIdx = 0;
    inspectCounter = 0;
}

function replaceOld(operation:string | undefined, old:number): string {
    if (!operation) return '';

    let newFormula = operation;
    while (newFormula.includes('old')) {
        newFormula = newFormula.replace('old', old.toString());
    }    

    return newFormula
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
const totalRounds = 20;
for(let ii = 0; ii < totalRounds; ii++) {
    for(let jj = 0; jj < monkeys.length; jj++) {
        //inspect items
        for(const item of monkeys[jj].items) {
            // deno-lint-ignore prefer-const
            let newWorryLevel = 0;
            let newFormula = replaceOld(monkeys[jj].operation, item);
            newFormula = `newWorryLevel = Math.floor((${newFormula}) / 3);`;
            eval(newFormula);

            // Test and throw to another monkey
            const nextMonkey = newWorryLevel % monkeys[jj].test === 0 ? monkeys[jj].testTrueMonkeyIdx : monkeys[jj].testFalseMonkeyIdx;
            monkeys[nextMonkey].items.push(newWorryLevel);
        }

        monkeys[jj].inspectCounter += monkeys[jj].items.length;
        monkeys[jj].items = [];
    }
}

let inspectArray = monkeys.map(m => { return m.inspectCounter });
inspectArray = inspectArray.sort((a,b) => { return a-b;}).reverse();
console.log(`P1 = ${inspectArray[0]} * ${inspectArray[1]} = ${inspectArray[0] * inspectArray[1]}`);