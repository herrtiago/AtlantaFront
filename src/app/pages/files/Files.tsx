import { useEffect, useMemo, useState } from "react";
import "../../../assets/css/files.css"
import { useFileExplorer } from "../../../store/fileExplorerStore";
import FileExplorer, { ExtendedTreeItemProps } from "./components/fileExplorer";
import { TreeViewBaseItem } from "@mui/x-tree-view";
import { useAuth } from "../../../store/authStore";
import { UploadFileModal } from "./components/modals/UploadFileModal";
import { FilesMap } from "./components/filesMap";
import NavBar from "../Navbar";
import { ButtonGroup, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import IconButton from "../../../components/IconButton";
import { FolderPath } from "./components/FolderPath";

type fileExplorerData = TreeViewBaseItem<ExtendedTreeItemProps>;

export const FilesView = () => {

  const [upModal, setUpModal] = useState(false);

  const user = useAuth(s => s.user);
  const [files, fetchAll] = useFileExplorer(s => [s.files, s.fetchAll]);

  useEffect(() => {
    if (!user) return;
    fetchAll(user.id);
  }, [user]);

  const explorer = useMemo<fileExplorerData[]>(() => {
    const obtenerFolders = (folderId: string) => {
      if (!files[folderId]) return [];

      const folders = files[folderId].folders;

      const data: fileExplorerData[] = folders.map(folder => ({
        id: folder.id,
        label: folder.name,
        children: obtenerFolders(folder.id)
      }));

      return data;
    }
    const all = obtenerFolders("root")
    
    return all;
  }, [files]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex text-center">
        {/* Contenedor izquierda opciones */}
        <div className="w-96 bg-[#333] text-white">
          <ButtonGroup className="!flex" variant="outlined" aria-label="Basic button group">
            <IconButton
              className="flex-1 !rounded-none !bg-gray-500 hover:!bg-gray-400"
              icon={<CreateNewFolderIcon />}
            >
              Crear carpeta
            </IconButton>
            <IconButton
              className="flex-1 !rounded-none !bg-gray-500 hover:!bg-gray-400"
              icon={<CloudUploadIcon />}
              onClick={() => setUpModal(true)} 
            >
              Subir archivo
            </IconButton>
          </ButtonGroup>
          <div className="px-4">
            <FileExplorer items={explorer} />
          </div>
        </div>

        {/* Contenedor principal*/}
        <div className="flex flex-col flex-1 px-5 pt-5 pb-5">
          <FolderPath/>
          <FilesMap />
        </div>
        <UploadFileModal
          open={upModal}
          setOpen={setUpModal}
        />
      </div>
    </div>
  );
};