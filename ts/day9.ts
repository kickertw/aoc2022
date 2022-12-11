import { readAndNewLineSplit } from "./utils/utils.ts";
import Point from './utils/geometry.ts';

const input = await readAndNewLineSplit('input.txt');

const head = new Point(0,0);
const tail = new Point(0,0);
const tailLocationHistory = new Set<string>();
tailLocationHistory.add(`${tail.X},${tail.Y}`);


function moveTailToHead(head:Point, tail:Point): void {
    const yDiff = head.Y - tail.Y;
    const xDiff = head.X - tail.X;

    if (xDiff == 0) {
        //Move Up/Down
        tail.Y += tail.Y < head.Y ? 1 : -1;
    } else if (yDiff == 0) {
        //Move Left/Right
        tail.X += tail.X < head.X ? 1 : -1;
    } else if (Math.abs(xDiff) == 2 || Math.abs(yDiff) == 2) {
        //Move Diagonally
        tail.X += tail.X < head.X ? 1 : -1;
        tail.Y += tail.Y < head.Y ? 1 : -1;
    }
}

function moveHead(direction:string, head:Point): void {
  switch(direction) {
    case 'R':
        head.X++;
        break;
    case 'L':
        head.X--;
        break;
    case 'U':
        head.Y++;
        break;
    case 'D':
        head.Y--;
        break;
    default:
        break;
  }
}

function printGrid(knots:Point[], size = 10): void {
    console.clear();
    const grid = [];

    for(let ii = 0; ii < size; ii++) {
        grid[ii] = Array(size).fill('.');
    }

    for(let ii = 0; ii < knots.length; ii++) {
        const output = ii == 0 ? 'H' : ii.toString();
        const currentVal = grid[knots[ii].Y][knots[ii].X];
        grid[knots[ii].Y][knots[ii].X] = currentVal !== '.' ? currentVal : output;
    }

    for(let ii = size-1; ii >= 0; ii--) {
        let row = '';
        for (let jj = 0; jj < size; jj++) {
            row += grid[ii][jj];
        }
        console.log(row);
    }
    console.log(`H = ${knots[0].X},${knots[0].Y}`);
}

// Part 1
for(const step of input) {
    const stepArr = step.split(' ');

    //console.log('processing ' + step);
    for (let ii = 0; ii < parseInt(stepArr[1]); ii++) {
        moveHead(stepArr[0], head);
        if (!head.isNextTo(tail)) {
            moveTailToHead(head, tail);
        }

        if (!tailLocationHistory.has(`${tail.X},${tail.Y}`)) {
            tailLocationHistory.add(`${tail.X},${tail.Y}`);
        }
    }
}

console.log(`P1 = ${tailLocationHistory.size}`);

// Part 2
tailLocationHistory.clear();
const knotArray = [ 
    new Point(0,0), new Point(0,0), new Point(0,0),
    new Point(0,0), new Point(0,0), new Point(0,0),
    new Point(0,0), new Point(0,0), new Point(0,0),
    new Point(0,0)
];

const tailIndex = knotArray.length-1;
for(const step of input) {
    const stepArr = step.split(' ');

    for (let ii = 0; ii < parseInt(stepArr[1]); ii++) {
        moveHead(stepArr[0], knotArray[0]);
        
        for(let ii = 0; ii < knotArray.length - 1; ii++) {
            if (!knotArray[ii].isNextTo(knotArray[ii+1])) {
                moveTailToHead(knotArray[ii], knotArray[ii+1]);
            }
        }

        if (!tailLocationHistory.has(`${knotArray[tailIndex].X},${knotArray[tailIndex].Y}`)) {
            tailLocationHistory.add(`${knotArray[tailIndex].X},${knotArray[tailIndex].Y}`);
        }

        printGrid(knotArray, 30);
        prompt();
    }
}

//console.log(tailLocationHistory);
//console.log(tailIndex);
console.log(`P2 = ${tailLocationHistory.size}`);