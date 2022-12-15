import { readAndNewLineSplit } from "./utils/utils.ts";

class Monkey {
    items:BigInt[] = [];
    operation:string | undefined;
    test = BigInt(0);
    testTrueMonkeyIdx = 0;
    testFalseMonkeyIdx = 0;
    inspectCounter = 0;
}

function replaceOld(operation:string | undefined, old:BigInt): string {
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

    tempMonkey.items = inputs[ii+1].substring(18).split(', ').map(val => { return BigInt(val) });
    tempMonkey.operation = inputs[ii+2].split(' = ').at(-1);
    tempMonkey.test = BigInt(inputs[ii+3].substring(21));
    tempMonkey.testTrueMonkeyIdx = parseInt(inputs[ii+4].slice(-1));
    tempMonkey.testFalseMonkeyIdx = parseInt(inputs[ii+5].slice(-1));
    monkeys[monkeyIdx] = tempMonkey;
    ii += 6;
}

// Running monkeys
const totalRounds = 2000;
for(let ii = 0; ii < totalRounds; ii++) {
    for(let jj = 0; jj < monkeys.length; jj++) {
        //inspect items
        for(const item of monkeys[jj].items) {
            // deno-lint-ignore prefer-const
            let newWorryLevel = BigInt(0);
            let newFormula = replaceOld(monkeys[jj].operation, item);

            newFormula = `newWorryLevel = Math.floor(${newFormula});`;
            eval(newFormula);

            // Test and throw to another monkey
            console.log(`${newWorryLevel} / ${monkeys[jj].test}`);
            const modulo = BigInt(newWorryLevel) % BigInt(monkeys[jj].test);
            const nextMonkey = modulo === BigInt(0) ? monkeys[jj].testTrueMonkeyIdx : monkeys[jj].testFalseMonkeyIdx;
            monkeys[nextMonkey].items.push(newWorryLevel);
        }

        monkeys[jj].inspectCounter += monkeys[jj].items.length;
        monkeys[jj].items = [];
    }

    if ([1,20,1000].includes(ii)) {
        console.log(`== After round ${ii} ==`);
        for(let i = 0; i < monkeys.length; i++){
            console.log(`  Monkey ${i} inspected ${monkeys[i].inspectCounter}`);
        }
    }
}

let inspectArray = monkeys.map(m => { return m.inspectCounter });
inspectArray = inspectArray.sort((a,b) => { return a-b;}).reverse();
const p2Ans = BigInt(inspectArray[0]) * BigInt(inspectArray[1]);
console.log(p2Ans);