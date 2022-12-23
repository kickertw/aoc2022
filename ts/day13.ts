// deno-lint-ignore-file
import { readAndNewLineSplit, swapArrayElements } from "./utils/utils.ts";

function comparePackets(a: any[], b: any[], indent = ''): number {
    let diff: number;
    for(let ii = 0; ii < a.length; ii++) {
        // If the right list runs out of items first, the inputs are not in the right order
        if (typeof(b[ii]) === 'undefined') return 1;

        const aType = typeof(a[ii]);
        const bType = typeof(b[ii]);

        // If both values are integers, the lower integer should come first.
        if (aType === 'number' && bType === 'number') {
            //console.log(`${indent}Comparing ${a[ii]} to ${b[ii]}`);
            diff = a[ii] - b[ii];
            if (diff != 0) return diff;
        }

        // If both values are lists, compare the first value of each list, then the second value, and so on.
        if (aType === 'object' && bType === 'object') {
            //console.log(`${indent}Comparing (list v list) ${a[ii]} vs ${b[ii]}`);
            diff = comparePackets(a[ii], b[ii], '   ');
            if (diff != 0) return diff;
        }

        // If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison
        if (aType !== bType)
        {
            //console.log(`${indent}Comparing (list v num) ${a[ii]} vs ${b[ii]}`);
            if (aType === 'number') {
                diff = comparePackets([a[ii]], b[ii], '   ');
            } else {
                diff = comparePackets(a[ii], [b[ii]], '   ');
            }

            if (diff != 0) return diff;
        }
    }

    return a.length - b.length;
}

// deno-lint-ignore no-explicit-any
function partition(items: any[], left: number, right: number): number {
    // deno-lint-ignore no-explicit-any
    const pivot: any = items[Math.floor((right + left) / 2)]; //middle element
    let i = left; //left pointer
    let j = right; //right pointer

    while (i <= j) {
        while (comparePackets(pivot, items[i]) > 0) {
            i++;
        }

        while (comparePackets(pivot, items[j]) < 0) {
            j--;
        }

        if (i <= j) {
            swapArrayElements(items, i, j); //swapping two elements
            i++;
            j--;
        }
    }

    return i;
}

// deno-lint-ignore no-explicit-any
function sortPackets(items: any[], left: number, right: number): any[] {
    if (items.length > 1) {
        const index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            sortPackets(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            sortPackets(items, index, right);
        }
    }
    return items;
}

let inputs: string[] = await readAndNewLineSplit('input.txt');

let p1 = 0;
let packetIndex = 1;
for(let ii = 0; ii < inputs.length; ) {
    let a: any[] = [];
    let b: any[] = [];
    
    eval(`a = ${inputs[ii]};`);
    eval(`b = ${inputs[ii+1]};`);

    if (comparePackets(a, b) < 0) {
        //console.log(`Packet Pair ${packetIndex} is valid`);
        //console.log("");
        p1 += packetIndex;
    } else {
        //console.log(`Packet Pair ${packetIndex} is INVALID`);
        //console.log("");
    }

    ii += 3;
    packetIndex++;
}

console.log(`P1 = ${p1}`);

inputs = inputs.filter((p) => { return p.length > 0; });
inputs.push('[[2]]');
inputs.push('[[6]]');

// convert string input into packets
let packets: any[] = [];
for(const input of inputs) {
    eval(`packets.push(${input});`);
}

packets = sortPackets(packets, 0, packets.length - 1);

var key1Index = packets.findIndex((p) => {return p.toString() == '2' }) + 1;
var key2Index = packets.findIndex((p) => {return p.toString() == '6'}) + 1;

console.log(`P2 = ${key1Index * key2Index}`);