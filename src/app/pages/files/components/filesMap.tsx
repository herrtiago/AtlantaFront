import { Typography } from "@mui/material";
import { useFileExplorer } from "../../../../store/fileExplorerStore";
import { FileIcon } from 'react-file-icon';
import { useEffect } from "react";

export const FilesMap = () => {

    const currentFiles = useFileExplorer(s => s.currentFiles);

    return (
        <div className="flex-1 p-2 bg-gray-50 border border-gray-100 rounded-md shadow-xl">
            {
                currentFiles.length > 0 ?
                    <div className="w-full h-full grid grid-cols-10">
                        {
                            currentFiles.map((file, i) => (
                                <div key={i} className="w-24 flex flex-col items-center">
                                    <div className="max-w-16">
                                        <FileIcon color="#d1d5db" extension={file.extension} />
                                    </div>
                                    <p>{file.name}.{file.extension}</p>
                                </div>
                            ))
                        }
                    </div>
                    : (
                        <div className="w-full h-full flex justify-center items-center">
                            <Typography>No hay archivos</Typography>
                        </div>
                    )
            }
        </div>
    )
}