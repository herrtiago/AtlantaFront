import { useFileExplorer } from "../../../../store/fileExplorerStore";

export const FilesMap = () => {

    const [files, currentFiles, fetchAll] = useFileExplorer(s => [s.files, s.currentFiles, s.fetchAll]);


    return (
        <div className="flex-1 p-10 bg-gray-400 border border-gray-600 rounded-md shadow-xl">

            {currentFiles.map((file, i) => (
                <div key={i} className="file-item">
                    <FolderIcon />
                    <p>{file.name}</p>
                </div>
            ))}
        </div>
    );
};
