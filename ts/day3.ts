import { readAndNewLineSplit } from "./utils/utils.ts";
const input = await readAndNewLineSplit('input.txt');

function getItemPriorityVal(input:string) {
    const upper = input.toUpperCase();
    let offset = 96;

    if (input === upper) 
        offset = 64 - 26;
    
    return input.charCodeAt(0) - offset;
}

function findMatchingItem(input1:string[], input2:string) {
    let matchingItem = '';
    for(const element of input1) {
        if(input2.includes(element)){ 
            matchingItem = element;
            break;
        }
    };
    
    return matchingItem;
}

function findGroupBadge(inputs:string[]) {
  const row1 = inputs[0].split('');
  for(const letter of row1) {
    if (inputs[1].includes(letter) && inputs[2].includes(letter)) return letter;
  }

  // We should never get here
  return '';
}

let prioritySum = 0;
let counter = 0;
let p2PrioritySum = 0;
const groupRuckSacks:string[] = [];

for(const line of input) {
  const rucksackSize = line.length / 2;  
  const match = findMatchingItem(line.substring(0,rucksackSize).split(''), line.substring(rucksackSize));  
  prioritySum += getItemPriorityVal(match);

  // For Part 2
  groupRuckSacks[counter++] = line;

  if (counter == 3) {
    const groupBadge = findGroupBadge(groupRuckSacks);
    p2PrioritySum += getItemPriorityVal(groupBadge);
    counter = 0;    
  }  
}

console.log(`Part 1 Sum = ${prioritySum}. Part 2 Sum = ${p2PrioritySum}`);