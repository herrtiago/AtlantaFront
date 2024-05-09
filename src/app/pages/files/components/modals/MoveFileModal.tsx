// MoveFileModal.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import IconButton from "../../../../../components/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import { useFileExplorer } from "../../../../../store/fileExplorerStore";
import { useAuth } from "../../../../../store/authStore";
import * as alertifyjs from "alertifyjs";
import { FolderService } from "../../../../../services/FolderService";
import { FileService } from "../../../../../services/FileService";
import { IFolder } from "../../../../../interfaces/IFolder";
import { IFolderFiles } from "../../../../../interfaces/IFolderFiles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  p: 4,
};

interface MoveFileModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileId: string;
  fileType: "folder" | "file";
}

interface FolderOption {
  id: string;
  name: string;
}

// Función recursiva para listar todas las subcarpetas
const listFolders = (files: { [key: string]: IFolderFiles }): FolderOption[] => {

  const all: { [key: string]: FolderOption } = {};

  const getParent = (folderId: string, name: string) => {
    const folder = files[folderId];

    if (!folder) return;

    for (let i = 0; i < folder.folders.length; i++) {
      const element = folder.folders[i];
      
      if (!all[element.id]) {
        all[element.id] = {
          id: element.id,
          name: name + "/" + element.name
        }
      }
      getParent(element.id, name + "/" + element.name);
    }
  }

  getParent("root", "");

  return Object.values(all);
};

export const MoveFileModal = ({
  open,
  setOpen,
  fileId,
  fileType,
}: MoveFileModalProps) => {
  const user = useAuth((s) => s.user);
  const [currentFolder, actualizarArchivos, files] = useFileExplorer((s) => [
    s.currentFolder,
    s.actualizarArchivos,
    s.files
  ]);
  const [availableFolders, setAvailableFolders] = useState<FolderOption[]>([]);
  const [newParentId, setNewParentId] = useState("root");

  useEffect(() => {
    if (user) {
      const allFolders = listFolders(files);
      setAvailableFolders([...allFolders]);
    }
  }, [user, files]);

  const mover = async () => {
    if (!user || !newParentId) return;

    let res;
    if (fileType === "folder") {
      res = await FolderService.Move(user.id, fileId, newParentId);
    } else {
      res = await FileService.Move(user.id, fileId, newParentId);
    }

    if (!res.success && res.errors.length > 0) {
      alertifyjs.error(res.errors.join(", "));
    } else {
      alertifyjs.success(
        `${fileType === "folder" ? "Carpeta" : "Archivo"} movido correctamente`
      );
      actualizarArchivos(user.id, currentFolder ?? "root");
      setNewParentId(""); // Reiniciar el nuevo directorio
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(128, 128, 128, 0.05)' } }}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title">Mover a</Typography>
        <select
          className="w-full border mt-2 p-2"
          value={newParentId}
          onChange={(e) => setNewParentId(e.target.value)}
        >
          {availableFolders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <IconButton
          className="!mt-5 !rounded-none !bg-blue-500 hover:!bg-blue-400"
          icon={<SaveIcon />}
          onClick={mover}
        >
          Mover
        </IconButton>
      </Box>
    </Modal>
  );
};
