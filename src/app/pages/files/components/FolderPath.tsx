import { useMemo } from "react";
import { useFileExplorer } from "../../../../store/fileExplorerStore"
import { IFolder } from "../../../../interfaces/IFolder";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const FolderPath = () => {

    const [currentFolder, setCurrentFolder, files] = useFileExplorer(s => [s.currentFolder, s.setCurrentFolder, s.files]);

    const path = useMemo(() => {    

        const getParent = (folderId: string, path: IFolder[]): IFolder[] | null => {
            const folder = files[folderId];

            if (!folder) return path;

            for (let i = 0; i < folder.folders.length; i++) {
                const element = folder.folders[i];
                if (element.id == currentFolder) {
                    return [...path, element];
                }
                const _path = getParent(element.id, [...path, element]);
                if(_path != null) return _path;
            }

            return null;
        }

        const folders: IFolder[] = [{id: "root", folderId: "root", name: "root"}];

        if(currentFolder != null) {
            const path = getParent("root", []);
            if(path!=null) {
                folders.push(...path);
            }
        }

        return folders.map(folder => (
            <Button variant="outlined" onClick={() => setCurrentFolder(folder.id)}>{folder.name}</Button>
         )).reduce<JSX.Element[]>((p, c, i, a) => {
             if(i !== a.length - 1) {
                 return [...p, c, <ArrowForwardIosIcon/>];
             } else {
                 return [...p, c];
             }
         }, [])
    }, [currentFolder, files]);

    return (
        <div className="flex items-center mb-5">
            {
                path.map((path, i) => (
                    <div key={i}>
                        {path}
                    </div>
                ))
            }
        </div>
    )
}