//import { readAndNewLineSplit } from "./utils/utils.ts";
//const input = await readAndNewLineSplit('day2input.txt');

function getItemPriorityVal(input:string){
    const upper = input.toUpperCase();
    let offset = 96;

    if (input === upper) 
        offset = 64 - 26;
    
    return input.charCodeAt(0) - offset;
}

function findMatchingItem(input1:string[], input2:string){
    let matchingItem = '';
    for(const element of input1) {
        if(input2.includes(element)){ 
            matchingItem = element;
            break;
        }
    };
    
    return matchingItem;
}

const input1:string[] = "abcdAfg".split('');
const input2:string= "hijklmA";

const match = findMatchingItem(input1, input2);
console.log("matching Item = " + match);
const matchVal = getItemPriorityVal(match);
console.log(matchVal);