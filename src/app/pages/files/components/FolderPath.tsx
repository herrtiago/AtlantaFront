import { useMemo } from "react";
import { useFileExplorer } from "../../../../store/fileExplorerStore"
import { IFolder } from "../../../../interfaces/IFolder";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const FolderPath = () => {

    const [currentFolder, files] = useFileExplorer(s => [s.currentFolder, s.files]);

    const path = useMemo(() => {

        const getParent = (folderId: string, path: IFolder[]): IFolder[] => {
            const folder = files[folderId];

            if (!folder) return path;

            for (let i = 0; i < folder.folders.length; i++) {
                const element = folder.folders[i];
                if (element.id == currentFolder) {
                    return [...path, element];
                }
                getParent(element.id, [...path, element]);
            }

            return path;
        }

        //return getParent("root", []);

        return ["root", "administrador", "imagenes", "paisajes"]
    }, [currentFolder, files]);

    return (
        <div className="flex items-center mb-5">
            {
                path.map(folder => (
                   <Button variant="outlined">{folder}</Button>
                )).reduce<JSX.Element[]>((p, c, i, a) => {
                    if(i !== a.length - 1) {
                        return [...p, c, <ArrowForwardIosIcon/>];
                    } else {
                        return [...p, c];
                    }
                }, [])
            }
        </div>
    )
}