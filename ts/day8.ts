import { create2DIntArray, transpose2DArray } from "./utils/utils.ts";

function p1FindAllVisableTrees(grid:number[][]):number {
    let retVal = 0;
    const gridWidth = grid[0].length;
    const gridHeight = grid.length;    
    const tGrid = transpose2DArray(grid);

    for(let row = 0; row < gridHeight; row++) {
        for(let col = 0; col < gridWidth; col++) {
            if (row == 0 || row == gridHeight - 1 || col == 0 || col == gridWidth - 1) {
                retVal++;
                continue;
            }

            const treeHeight = grid[row][col];
            const leftMax = Math.max(...grid[row].slice(0,col));
            const rightMax = Math.max(...grid[row].slice(col+1));
            const aboveMax = Math.max(...tGrid[col].slice(0,row));
            const belowMax = Math.max(...tGrid[col].slice(row+1));

            if (leftMax < treeHeight || rightMax < treeHeight || aboveMax < treeHeight || belowMax < treeHeight) {
                retVal++;
            } 
        }
    } 
    
    return retVal;
}

function getViewingDistance(currentTreeHeight:number, trees:number[], debug = false):number {
    let counter = 0;

    //console.log(`   ${currentTreeHeight} vs ${trees}`);
    for (let ii = 0; ii < trees.length; ii++) {
        if (trees[ii] >= currentTreeHeight) {
            ii = trees.length;
        }

        counter++;
    }

    return counter;
}

function p2FindBestTree(grid:number[][]):number {
    let retVal = 0;
    const gridWidth = grid[0].length;
    const gridHeight = grid.length;    
    const tGrid = transpose2DArray(grid);

    for(let row = 0; row < gridHeight; row++) {
        for(let col = 0; col < gridWidth; col++) {
            //edge trees are going to have a ZERO scenic score
            if (row == 0 || row == gridHeight - 1 || col == 0 || col == gridWidth - 1) continue;

            const treeHeight = grid[row][col];
            const leftScore = getViewingDistance(treeHeight, grid[row].slice(0,col).reverse());
            const rightScore = getViewingDistance(treeHeight, grid[row].slice(col+1));
            const topScore = getViewingDistance(treeHeight, tGrid[col].slice(0,row).reverse());
            const botScore = getViewingDistance(treeHeight, tGrid[col].slice(row+1));

            const scenicScore = leftScore * rightScore * topScore * botScore;
            //console.log(`${row},${col} - ${leftScore} / ${rightScore} / ${topScore} / ${botScore}`);
            retVal = scenicScore > retVal ? scenicScore : retVal;
        }
    }    

    return retVal;
}

const grid = await create2DIntArray('input.txt');
const p1Answer = p1FindAllVisableTrees(grid);
const p2Answer = p2FindBestTree(grid);

console.log(`P1 = ${p1Answer}, P2 = ${p2Answer}`);