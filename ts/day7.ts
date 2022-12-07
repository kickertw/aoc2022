import { readAndNewLineSplit } from "./utils/utils.ts";
import Folder from './utils/folder.ts';

function getTotalFolderSize(folder:Folder): number{
    let totalSize = folder.size;

    if (folder.subFolders.length > 0) {
        for(const sub of folder.subFolders) {
            totalSize += getTotalFolderSize(sub);
        }
    }

    return totalSize;
}

function createFolderSystem (inputs:string[], allFoldersFlat:Folder[]):Folder {
    let mode: string | null = null;
    const root = new Folder('/');
    let currentFolder = root;
    allFoldersFlat.push(root);
    
    // This should parse all the commands and create the folder structure + folder sizes
    for (const input of inputs) {
        const inputArr = input.split(' ');
        
        // if $, a command is about to be run
        if (inputArr[0] === '$') {
            mode = inputArr[1];
    
            // navigating to another folder
            if (mode === 'cd') {
                if (inputArr[2] !== '/') {
                    if (inputArr[2] === '..' && currentFolder.parentFolder != null) {
                        currentFolder = currentFolder.parentFolder;
                    } else {
                        const next = currentFolder.getSubFolder(inputArr[2]);
                        if (next == null) throw Error('should never get here');
                        currentFolder = next;
                    }
                }
            }
        } else if (mode === 'ls') {
            // reading input from LS
            if (inputArr[0] == 'dir') {
                const child = new Folder(inputArr[1], currentFolder);
                allFoldersFlat.push(child);
                currentFolder.addSubFolder(child);
            } else {
                const fileSize = parseInt(inputArr[0]);
                currentFolder.size += fileSize;
            }
        }
    }

    return root;
}

function p1GetCombinedFolderSize(folder:Folder, maxSize = 100000):number {
    let retVal = 0;

    const subSize = getTotalFolderSize(folder);
    retVal += subSize < maxSize ? subSize : 0;

    if (folder.subFolders.length > 0) {
        for (const sub of folder.subFolders) {
            retVal += p1GetCombinedFolderSize(sub);
        }
    }

    return retVal;
}

function p2GetClosestFolderToSpaceNeeded(folders:Folder[], neededSpace:number ): number {
    let lowestfolderSize = 70000000;
    for(const folder of folders) {
        const folderSize = getTotalFolderSize(folder);
        if (folderSize >= neededSpace && folderSize < lowestfolderSize) lowestfolderSize = folderSize;
    }

    return lowestfolderSize;
}

function printFolderStructure(root:Folder, indent = ''):void {
    console.log(indent + `[${root.name}] - just files = ${root.size} - total size = ${getTotalFolderSize(root)}`);
    for(const sub of root.subFolders){
        printFolderStructure(sub, indent + '   ');
    }
}

const inputs = await readAndNewLineSplit('input.txt');
const allFoldersFlat:Folder[] = [];
const root = createFolderSystem(inputs, allFoldersFlat);
printFolderStructure(root);

const p1Ans = p1GetCombinedFolderSize(root);

console.log(`Total size of folders under 100,000 = ${p1Ans}`);

const maxDiskSpace = 70000000;
const neededFreeSpace = 30000000;
const totalUsedSpace = getTotalFolderSize(root);
const currentfreeSpace = maxDiskSpace - totalUsedSpace;
const neededSpace = neededFreeSpace - currentfreeSpace;

console.log(`
    Current Free Space = ${currentfreeSpace}
    NeededSpace = ${neededSpace}`);
const p2Ans = p2GetClosestFolderToSpaceNeeded(allFoldersFlat, neededSpace);

console.log(`P2 Ans ${p2Ans}`);