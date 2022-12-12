import { readAndNewLineSplit } from "./utils/utils.ts";

function p1SumSignalStrengths(inputs:string[]): number {
    let totalStrength = 0;
    let cycle = 1;
    let x = 1;

    for (const input of inputs) {
        if ([20,60,100,140,180,220].includes(cycle)) {
            console.log(`   cycle[${cycle}] => ${cycle} * ${x} = ${cycle * x}`);
            totalStrength += cycle * x;
        }
        
        cycle++;
    
        if (input !== 'noop') {
            const inputArr = input.split(' ');
            const addVal = parseInt(inputArr[1]);
           
            if ([20,60,100,140,180,220].includes(cycle)) {
                console.log(`   cycle[${cycle}] => ${cycle} * ${x} = ${cycle * x}`);
                totalStrength += cycle * x;
            }        
            
            cycle++;
    
            // ADDX operation will always be performed after the cycle ends
            x += addVal;
        }
    }

    return totalStrength
}

function drawPixel(crt:Array<string[]>, cycle:number, x:number): void {
    let row = 0;

    if (cycle > 200) {
        row = 5;
    } else if (cycle > 160) {
        row = 4;
    } else if (cycle > 120) {
        row = 3;
    } else if (cycle > 80) {
        row = 2;
    } else if (cycle > 40) {
        row = 1;
    }

    const pixelIndex = cycle - (row * 40) - 1;
    if ([x-1, x, x+1].includes(pixelIndex)) {
        crt[row][pixelIndex] = '#';
    }    
}

function p2GenerateImage(inputs:string[]): Array<string[]> {
    // initialize the CRT
    const crt = new Array<string[]>(6);
    for(let ii = 0; ii < 6; ii++) {
        crt[ii] = Array<string>(40).fill('.');
    }

    let x = 1;
    let inputIdx = 0;
    let addX = 0;
    let cycleToAdd = 0;
    let grabInput = true;
    let input = new Array<string>;
    for (let cycle = 1; cycle <= 240; cycle++) {       
        //console.log(`C[${cycle}] / X = ${x}`);;
        // 1. Get the input/instruction 
        if (grabInput) { 
            input = inputs[inputIdx++].split(' ');
            if (input[0] === 'addx') {
                grabInput = false;
                addX = parseInt(input[1]);
                cycleToAdd = cycle + 1;
                //console.log(`   begin executing ${inputs[inputIdx-1]}`);;
            }
        }

        // 2. Draw
        drawPixel(crt, cycle, x);
        //console.log(crt[0].join(''));

        // 3. Execute the instruction in the right cycle
        if (cycleToAdd == cycle) {
            x += addX;
            grabInput = true;
            //console.log(`   finish executing addx ${addX} (X is now ${x})`);
        }
        //prompt(' ');
    }

    return crt;
}

const inputs = await readAndNewLineSplit('input.txt');
const totalStrength = p1SumSignalStrengths(inputs);
console.log(`P1 = ${totalStrength}`);
console.log('');

//console.clear();
const crt = p2GenerateImage(inputs);
for (const row of crt) {
    console.log(row.join(''));
}