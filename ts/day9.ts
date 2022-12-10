import { readAndNewLineSplit } from "./utils/utils.ts";
import Point from './utils/geometry.ts';

const input = await readAndNewLineSplit('input.txt');

const head = new Point(0,0);
const tail = new Point(0,0);
const tailLocationHistory = new Set<string>();
tailLocationHistory.add(`${tail.X},${tail.Y}`);



//  xxh
//  xxx
//  x.x
//  xxxh
//
function moveTailToHead(head:Point, tail:Point): void {
    const yDiff = head.Y - tail.Y;
    const xDiff = head.X - tail.X;

    if (!head.isNextTo(tail)) {        
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
}

for(const step of input) {
    const stepArr = step.split(' ');

    //console.log('processing ' + step);
    for (let ii = 0; ii < parseInt(stepArr[1]); ii++) {
        switch(stepArr[0]) {
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
        
        //console.log(`   H = (${head.X},${head.Y}) / T = (${tail.X},${tail.Y})`);
        moveTailToHead(head, tail);
        //console.log(`   H = (${head.X},${head.Y}) / T = (${tail.X},${tail.Y})`);
        
        if (!tailLocationHistory.has(`${tail.X},${tail.Y}`)) {
            tailLocationHistory.add(`${tail.X},${tail.Y}`);
            //console.log(`${tail.X},${tail.Y} added`);
            //console.log(tailLocationHistory);
        }
    }
}

console.log(tailLocationHistory.size);