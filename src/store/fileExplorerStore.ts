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

const defaultFiles: { [key: string]: IFolderFiles } = {
    "a52ebd38-b9bd-4967-92f4-e28b4179df42": {
        files: [],
        folders: []
    },
    "3adc4ef3-7313-4978-bea6-0cf86db3ac23": {
        files: [],
        folders: []
    },
    "3adc4ef3-7313-4978-bea6-0cf86db3ac24": {
        files: [
            {
                "id": "1",
                "name": "paisaje1",
                "extension": "jpg",
                "mimeType": "image/jpeg",
                "folderId": "3adc4ef3-7313-4978-bea6-0cf86db3ac24",
                "size": 1024,
                "createdDate": 1622508269298
            },
            {
                "id": "2",
                "name": "paisaje2",
                "extension": "png",
                "mimeType": "image/png",
                "folderId": "3adc4ef3-7313-4978-bea6-0cf86db3ac24",
                "size": 2048,
                "createdDate": 1622508269299
            },
            {
                "id": "3",
                "name": "paisaje3",
                "extension": "jpg",
                "mimeType": "image/jpeg",
                "folderId": "3adc4ef3-7313-4978-bea6-0cf86db3ac24",
                "size": 1536,
                "createdDate": 1622508269299
            },
            {
                "id": "4",
                "name": "paisaje4",
                "extension": "jpg",
                "mimeType": "image/jpeg",
                "folderId": "3adc4ef3-7313-4978-bea6-0cf86db3ac24",
                "size": 4096,
                "createdDate": 1622508269300
            },
            {
                "id": "5",
                "name": "paisaje5",
                "extension": "jpeg",
                "mimeType": "image/jpeg",
                "folderId": "3adc4ef3-7313-4978-bea6-0cf86db3ac24",
                "size": 3072,
                "createdDate": 1622508269300
            }
        ]
        ,
        folders: []
    },
    "f12bdfef-cefd-4ca8-afd2-894ae6829524": {
        files: [],
        folders: [
            {
                id: "3adc4ef3-7313-4978-bea6-0cf86db3ac23",
                name: "cats",
                folderId: "f12bdfef-cefd-4ca8-afd2-894ae6829524",
                //folders: []
            }, {
                id: "3adc4ef3-7313-4978-bea6-0cf86db3ac24",
                name: "paisajes",
                folderId: "f12bdfef-cefd-4ca8-afd2-894ae6829524",
                //folders: []
            }
        ]
    },
    "80be8b6b-3a2a-47cd-b3ec-f110c630bce9": {
        files: [],
        folders: [
            {
                id: "f12bdfef-cefd-4ca8-afd2-894ae6829524",
                name: "imagenes",
                folderId: "80be8b6b-3a2a-47cd-b3ec-f110c630bce9",
                //folders: []
            }
        ]
    },
    "3adc4ef3-7313-4978-bea6-0cf86db3ac29": {
        files: [],
        folders: []
    },
    "4b7fcd26-3f58-49f6-ba1a-e249c4b180e1": {
        files: [],
        folders: []
    },
    "root": {
        files: [],
        folders: [
            {
                id: "3adc4ef3-7313-4978-bea6-0cf86db3ac29",
                name: "archivos",
                folderId: null,
                //folders: []
            },
            {
                id: "4b7fcd26-3f58-49f6-ba1a-e249c4b180e1",
                name: "trabajos U",
                folderId: null,
                //folders: []
            }, {
                id: "80be8b6b-3a2a-47cd-b3ec-f110c630bce9",
                name: "administrador",
                folderId: null,
                //folders: []
            }, {
                id: "a52ebd38-b9bd-4967-92f4-e28b4179df42",
                name: "administrador",
                folderId: null,
                //folders: []
            }
        ]
    }
}

export const useFileExplorer = create<IFileExplorer>((set) => ({
    currentFolder: null,
    currentFiles: [],
    files: defaultFiles,
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