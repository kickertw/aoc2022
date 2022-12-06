
export async function readAndNewLineSplit(filepath: string): Promise<string[]> {
    const data = await Deno.readTextFile(filepath);
    return data.toString().split(/\r?\n/);
}