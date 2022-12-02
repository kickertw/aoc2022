import { readAndNewLineSplit } from "./utils/utils.ts";
const input = await readAndNewLineSplit('day2input.txt');

interface Tuple {
    [key: string]: number;
}

const baseScore: Tuple = {
    'A': 1, 'X': 1,
    'B': 2, 'Y': 2,
    'C': 3, 'Z': 3
};

const p2BaseScore: Tuple = {
    'X': 0, 'Y': 3, 'Z': 6
}

// P1: A/X = Rock, B/Y = Paper, C/Z = Scissors
function getPart1ScoreTotal(baseScore: Tuple): number {
    let r1Score = 0;
    input.forEach(round => {
        const vals = round.split(' ');
        const player1Val:string = vals[0];
        const player2Val:string = vals[1];
    
        // Set Base Score
        r1Score += baseScore[player2Val];
    
        // Add score (3 if draw, 6 if win)
        if (player1Val == 'A') {
            switch(player2Val) {
                case 'X':
                    r1Score += 3;
                    break;
                case 'Y':
                    r1Score += 6;
                    break;
            }
        } else if (player1Val == 'B') {
            switch(player2Val) {
                case 'Y':
                    r1Score += 3;
                    break;
                case 'Z':
                    r1Score += 6;
                    break;
            }
        } else {
            switch(player2Val) {
                case 'Z':
                    r1Score += 3;
                    break;
                case 'X':
                    r1Score += 6;
                    break;
            }
        }
    });

    return r1Score;
}

// P2: A = Rock, B = Paper, C = Scissors
//     X = lose, Y = draw, Z = win
function getPart2ScoreTotal(baseScore: Tuple): number {
    let totalScore = 0;

    input.forEach(round => {
        const vals = round.split(' ');
        const player1Val:string = vals[0];
        const winLoseDraw:string = vals[1];

        totalScore += baseScore[winLoseDraw];
    
        // Add score (3 if draw, 6 if win)
        if (player1Val == 'A') {
            switch(winLoseDraw) {
                case 'X':   //lose by scissors
                    totalScore += 3;
                    break;
                case 'Y':   // draw by rock
                    totalScore += 1;
                    break;
                default:    // win by paper
                    totalScore += 2;
                    break;          
            }
        } else if (player1Val == 'B') {
            switch(winLoseDraw) {
                case 'X':   //lose by rock
                    totalScore += 1;
                    break;
                case 'Y':   // draw by paper
                    totalScore += 2;
                    break;
                default:    // win by scissors
                    totalScore += 3;
                    break;          
            }
        } else {
            switch(winLoseDraw) {
                case 'X':   //lose by paper
                    totalScore += 2;
                    break;
                case 'Y':   // draw by scissors
                    totalScore += 3;
                    break;
                default:    // win by rock
                    totalScore += 1;
                    break;  
            }
        }
    });    

    return totalScore;
}

console.log(getPart1ScoreTotal(baseScore));
console.log(getPart2ScoreTotal(p2BaseScore));