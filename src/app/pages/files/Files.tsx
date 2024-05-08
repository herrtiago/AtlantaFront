import { useEffect, useMemo, useState } from "react";
import "../../../assets/css/files.css"
import { useFileExplorer } from "../../../store/fileExplorerStore";
import FileExplorer, { ExtendedTreeItemProps } from "./components/fileExplorer";
import { TreeViewBaseItem } from "@mui/x-tree-view";
import { useAuth } from "../../../store/authStore";
import { UploadFileModal } from "./components/modals/UploadFileModal";
import { FilesMap } from "./components/filesMap";
import NavBar from "../Navbar";
import { ButtonGroup } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import IconButton from "../../../components/IconButton";
import { FolderPath } from "./components/FolderPath";
import { CreateFolderModal } from "./components/modals/CreateFolderModal";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useSearchParams } from "react-router-dom";

type fileExplorerData = TreeViewBaseItem<ExtendedTreeItemProps>;

export const FilesView = () => {

  const [params] = useSearchParams();
  const [upModal, setUpModal] = useState(false);
  const [fModal, setFModal] = useState(false);

  const user = useAuth(s => s.user);
  const [files, fetchAll, fetchFolder] = useFileExplorer(s => [s.files, s.fetchAll, s.fetchFolder]);

  useEffect(() => {
    if (!user) return;

    const folderId = params.get("folderId");

    if(folderId) {
      console.log("aca");
      fetchFolder(user.id, folderId);
    } else {
      fetchAll(user.id);
    }

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
    console.log("all",all)
    return all;
  }, [files]);

  const copyId = () => {

  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex text-center">
        {/* Contenedor izquierda opciones */}
        <div className="flex flex-col h-full w-96 bg-[#333] text-white">
          <ButtonGroup className="!flex" variant="outlined" aria-label="Basic button group">
            <IconButton
              className="flex-1 !rounded-none !bg-gray-500 hover:!bg-gray-400"
              icon={<CreateNewFolderIcon />}
              onClick={() => setFModal(true)}
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
          <div className="flex-1 px-4">
            <FileExplorer items={explorer} />
          </div>
          <div className="w-full h-20 bg-gray-500 flex relative">
            <div className="h-full aspect-square flex justify-center items-center">
              <AccountCircleIcon className="!w-2/3 !h-2/3" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[20px]">{user?.fullname}</span>
              <span className="text-[15px]">{user?.email}</span>
              <div className="flex">
                <span className="mt-2 text-[9px]">{user?.id}</span>
                <div >
                  <ContentPasteIcon className="ml-3 !w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor principal*/}
        <div className="flex flex-col flex-1 px-5 pt-5 pb-5">
          <FolderPath />
          <FilesMap />
        </div>
        <UploadFileModal
          open={upModal}
          setOpen={setUpModal}
        />
        <CreateFolderModal
          open={fModal}
          setOpen={setFModal}
        />
      </div>
    </div>
  );
};