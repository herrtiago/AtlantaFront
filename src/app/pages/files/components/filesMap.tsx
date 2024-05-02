import { Typography } from "@mui/material";
import { useFileExplorer } from "../../../../store/fileExplorerStore";
import { FileIcon, defaultStyles } from 'react-file-icon';

export const FilesMap = () => {

    const currentFiles = useFileExplorer(s => s.currentFiles);

    return (
        <div className="flex-1 p-10 bg-gray-400 border border-gray-600 rounded-md shadow-xl">
            {
                currentFiles.length > 0 ?
                    currentFiles.map((file, i) => (
                        <div key={i} className="file-item">
                            <FileIcon extension={file.extension} />
                            <p>{file.name}</p>
                        </div>
                    ))
                    : (
                    <div className="w-full h-full flex justify-center items-center">
                        <Typography>No hay archivos</Typography>
                    </div>
                )
            }
        </div>
    )
}