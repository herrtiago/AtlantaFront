import { create } from "zustand"
import { FolderService } from "../services/FolderService";
import { IFolderFiles } from "../interfaces/IFolderFiles";
import { IFileInfo } from "../interfaces/IFileInfo";

export type IFileExplorer = {
    currentFolder: string | null
    currentFiles: IFileInfo[]
    files: { [key: string]: IFolderFiles }
    fetchFolder: (userId: string, folderId: string) => void
    fetchAll: (userId: string) => void
    setCurrentFolder: (folderId: string) => void
    actualizarArchivos: (userId: string, folderId: string) => void
}

export const useFileExplorer = create<IFileExplorer>((set) => ({
    currentFolder: null,
    currentFiles: [],
    files: {},
    fetchFolder: async (userId: string, folderId: string) => {
        const res = await FolderService.Fetch(userId, folderId);
        console.log(res);

        if(!res.success || !res.data) return;

        const files: { [key: string]: IFolderFiles } = {};

        files["root"] = res.data;

        set({
            files: { ...files }
        });
    },
    fetchAll: async (userId: string) => {
        return;
        const files: { [key: string]: IFolderFiles } = {};

        const fetchFolder = async (folderId: string) => {
            const res = await FolderService.Fetch(userId, folderId);
            if (!res.success || !res.data) return;

            files[folderId] = res.data;
            if (!res.data.folders) return;

            for (let i = 0; i < res.data.folders.length; i++) {
                await fetchFolder(res.data.folders[i].id);
            }
        }

        await fetchFolder("root");

        set({
            files: { ...files }
        });
    },
    setCurrentFolder: (folderId: string) => {
        set(s => ({
            currentFolder: folderId,
            currentFiles: s.currentFolder ? (s.files[folderId]?.files ?? []) : []
        }))
    },
    actualizarArchivos: async (userId, folderId) => {
        const res = await FolderService.Fetch(userId, folderId);
        if (!res.success || !res.data) return;

        set(s => {
            if(res.data){
                s.files[folderId] = res.data;
            }
            return ({
                files: {...s.files},
                currentFiles: s.currentFolder ? (s.files[folderId]?.files ?? []) : []
            })
        })
        
    }
}));