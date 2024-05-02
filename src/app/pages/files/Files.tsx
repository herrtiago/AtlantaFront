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

type fileExplorerData = TreeViewBaseItem<ExtendedTreeItemProps>;

export const FilesView = () => {

  const [upModal, setUpModal] = useState(false);

  const user = useAuth(s => s.user);
  const [files, currentFiles, fetchAll] = useFileExplorer(s => [s.files, s.currentFiles, s.fetchAll]);

  useEffect(() => {
    if (!user) return;
    //fetchAll(user.id);
  }, [user]);

  const explorer = useMemo<fileExplorerData[]>(() => {

    return [
      {
        "id": "3adc4ef3-7313-4978-bea6-0cf86db3ac29",
        "label": "gatitos",
        "children": []
      },
      {
        "id": "4b7fcd26-3f58-49f6-ba1a-e249c4b180e1",
        "label": "gatitosv2",
        "children": []
      },
      {
        "id": "80be8b6b-3a2a-47cd-b3ec-f110c630bce9",
        "label": "administrador",
        "children": [
          {
            "id": "f12bdfef-cefd-4ca8-afd2-894ae6829524",
            "label": "imagenes",
            "children": [
              {
                "id": "3adc4ef3-7313-4978-bea6-0cf86db3ac23",
                "label": "gatitos",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "a52ebd38-b9bd-4967-92f4-e28b4179df42",
        "label": "imagenes",
        "children": []
      }
    ]

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
    console.log(JSON.stringify(all))
    return all;
  }, [files]);

  const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
    </svg>
  );

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="flex text-center">
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
            >
              Subir archivo
            </IconButton>
          </ButtonGroup>
          <div className="px-4">
            <FileExplorer items={explorer} />
          </div>
        </div>


        {/* Contenedor principal*/}
        <div className="flex flex-col flex-1 bg-[#60a5fa] p-12">
          <h2 className="text-6xl font-hand mb-5 flex justify-center items-center">Tus archivos</h2>
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