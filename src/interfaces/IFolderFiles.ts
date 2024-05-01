import { IFileInfo } from "./IFileInfo";
import { IFolder } from "./IFolder";

export interface IFolderFiles {
    files: IFileInfo[]
    folders: IFolder[]
}