import { readAndNewLineSplit } from "./utils/utils.ts";
const input = await readAndNewLineSplit('input.txt');

let counter = 0;
let p2Counter = 0;
for(const ii of input) {
    const ranges = ii.split(',');
    const range1:number[] = ranges[0].split('-').map((i: string) => { return parseInt(i)});
    const range2:number[] = ranges[1].split('-').map((i: string) => { return parseInt(i)});

    // Check to see if one range is a subset of the other
    if ((range1[0] >= range2[0] && range1[1] <= range2[1]) || (range2[0] >= range1[0] && range2[1] <= range1[1])) counter++;

    // Check to see if one range overlaps the other
    if (range1[1] >= range2[0] && range2[1] >= range1[0]) p2Counter++;
}

console.log(`Part 1 = ${counter}, Part 2 = ${p2Counter}`);