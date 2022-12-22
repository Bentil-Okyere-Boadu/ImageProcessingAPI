import path from "path";
import fs from "fs";

export const searchFile = (filename: string, directory: string) : boolean => {
    return fs.existsSync(path.join(directory, filename.concat(`.jpg`)))  
} 

