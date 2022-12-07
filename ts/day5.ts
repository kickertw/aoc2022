import Stack from './utils/stack.ts';
import { readAndNewLineSplit } from "./utils/utils.ts";

const input = await readAndNewLineSplit('input.txt');

function findInputSplitLine(input:string[]):number {
    let splitLine = 0;
    while (true) {
        if (input[splitLine].length == 0) break;
        splitLine++;
    }
    
    return splitLine;
}

function initStacks(input:string[], splitLine:number):Stack<string>[] {
    const retVal = [];

    // Get the total number of stacks and initialize the stack array
    input[splitLine-1] = input[splitLine-1].trimEnd();
    const stackCount = parseInt(input[splitLine-1].charAt(input[splitLine-1].length - 1));
    for(let ii = 0; ii < stackCount; ii++) {
        retVal[ii] = new Stack<string>();
    }

    // Sart populating the stacks
    for(let ii = splitLine-2; ii >= 0; ii--) {
        let idx = 1;
        let stackIdx = 0;
        while (idx < input[ii].length) {
            const stackVal = input[ii].charAt(idx);
            if (stackVal === ' ') { 
                stackIdx++;
            } else {
                retVal[stackIdx++].push(input[ii].charAt(idx));
            }
            idx += 4;
        }        
    }

    return retVal;
}

function moveCratesWith9000(input:string[], allStacks:Stack<string>[]):Stack<string>[] {
    for(const move of input){
        const moveSplit = move.split(' ');
        const qty = parseInt(moveSplit[1]);
        const stackFrom = parseInt(moveSplit[3]) - 1;
        const stackTo = parseInt(moveSplit[5]) - 1;

        for(let ii = 0; ii < qty; ii++) {
            allStacks[stackTo].push(allStacks[stackFrom].pop());
        }
    }

    return allStacks;
}

function moveCratesWith9001(input:string[], allStacks:Stack<string>[]):Stack<string>[] {
    for(const move of input){
        const moveSplit = move.split(' ');
        const qty = parseInt(moveSplit[1]);
        const stackFrom = parseInt(moveSplit[3]) - 1;
        const stackTo = parseInt(moveSplit[5]) - 1;

        const tempStack = new Stack<string>();
        for(let ii = 0; ii < qty; ii++) {
            tempStack.push(allStacks[stackFrom].pop());
        }

        for(let ii = 0; ii < qty; ii++) {
            allStacks[stackTo].push(tempStack.pop());
        }        
    }

    return allStacks;
}

const splitLine = findInputSplitLine(input);
let originalStacks = initStacks(input, splitLine);
const p1Stacks = moveCratesWith9000(input.slice(splitLine + 1), originalStacks);

// I really should deep clone instead of doing this again. I know it's dumb 😅
originalStacks = initStacks(input, splitLine);
const p2Stacks = moveCratesWith9001(input.slice(splitLine + 1), originalStacks);

let p1Answer = '';
let p2Answer = '';
for(let ii = 0; ii < originalStacks.length; ii++) {
    p1Answer += p1Stacks[ii].peek();
    p2Answer += p2Stacks[ii].peek();
}
console.log(`P1 answer = ${p1Answer}. P2 answer = ${p2Answer}`);