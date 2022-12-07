export default class Folder {
    name = '';
    size = 0;
    parentFolder: Folder | null = null;
    subFolders: Folder[] = [];

    constructor(folderName:string = '/', parent:Folder | null = null) {
        this.name = folderName;
        this.parentFolder = parent;
    }

    // Safely adds a subfolder if it doesn't already exist
    public addSubFolder(childFolder:Folder):void {
        if (this.subFolders.length == 0){
            this.subFolders.push(childFolder);
            return;
        }

        // if the folder already exists, no need to add it
        for(const child of this.subFolders) {
            if (child.name === childFolder.name) return;
        }

        this.subFolders.push(childFolder);
    }

    public getSubFolder(name:string): Folder | null {
        for(const child of this.subFolders) {
            if (child.name === name) return child;
        }

        //should never get here
        return null;
    }
}