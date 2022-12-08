export async function readAndNewLineSplit(filepath: string): Promise<string[]> {
    const data = await Deno.readTextFile(filepath);
    return data.toString().split(/\r?\n/);
}

export async function create2DIntArray(filepath: string): Promise<number[][]> {
    const inputs = await readAndNewLineSplit(filepath);

    const retVal = [];
    for(let ii = 0; ii < inputs.length; ii++) {
        const arrayOfInput = inputs[ii].split('');
        retVal[ii] = arrayOfInput.map(str => { return parseInt(str)});
    }

    return retVal;
}

export function transpose2DArray<T>(array:T[][]):T[][] {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}