import { Typography } from "@mui/material";
import { useFileExplorer } from "../../../../store/fileExplorerStore";
import { FileIcon } from 'react-file-icon';
import { useEffect } from "react";
import { FileService } from "../../../../services/FileService";
import { useAuth } from "../../../../store/authStore";
import { downloadFile } from "../../../../utils/downloadFile";

export const FilesMap = () => {

    const user = useAuth(s => s.user)
    const currentFiles = useFileExplorer(s => s.currentFiles);

    const HandleClick = async (fileId: string) => {
        if(!user) return;
        const res = await FileService.Fetch(user.id, fileId)
        if(res.success && res.data) {
            downloadFile(res.data)
        }
    }


    return (
        <div className="flex-1 p-2 bg-gray-50 border border-gray-100 rounded-md shadow-xl">
            {
                currentFiles.length > 0 ?
                    <div className="w-full h-full grid grid-cols-10">
                        {
                            currentFiles.map((file, i) => (
                                <div key={i} className="w-24 flex flex-col items-center" onClick={() => HandleClick(file.id)}>
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