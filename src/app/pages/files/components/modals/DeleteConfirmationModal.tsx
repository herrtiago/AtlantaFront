import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "../../../../../components/IconButton";
import SaveIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useFileExplorer } from "../../../../../store/fileExplorerStore";
import { useAuth } from "../../../../../store/authStore";
import * as alertifyjs from "alertifyjs";
import { FolderService } from "../../../../../services/FolderService";
import { FileService } from "../../../../../services/FileService";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DeleteConfirmationModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: string;
  itemType: "folder" | "file";
}

export const DeleteConfirmationModal = ({
  open,
  setOpen,
  itemId,
  itemType,
}: DeleteConfirmationModalProps) => {
  const user = useAuth((s) => s.user);
  const [currentFolder, actualizarArchivos] = useFileExplorer((s) => [
    s.currentFolder,
    s.actualizarArchivos,
  ]);

  const handleDelete = async () => {
    if (!user) return;

    let res;
    if (itemType === "folder") {
      res = await FolderService.Delete(user.id, itemId);
      window.location.reload();
    } else {
      res = await FileService.Delete(user.id, itemId);
    }

    if (!res.success && res.errors.length > 0) {
      alertifyjs.error(res.errors.join(", "));
    } else {
      alertifyjs.success(
        `${itemType === "folder" ? "Carpeta" : "Archivo"} eliminado correctamente`
      );
      actualizarArchivos(user.id, currentFolder ?? "root");
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title">Confirmar Eliminación</Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ¿Está seguro de que desea eliminar esta {itemType === "folder" ? "carpeta" : "archivo"} y
          todo su contenido?
        </Typography>
        <Box className="flex justify-between mt-4">
          <IconButton
            className="!rounded-none !bg-red-500 hover:!bg-red-400"
            icon={<SaveIcon />}
            onClick={handleDelete}
          >
            Aceptar
          </IconButton>
          <IconButton
            className="!rounded-none !bg-gray-500 hover:!bg-gray-400"
            icon={<CloseIcon />}
            onClick={() => setOpen(false)}
          >
            Cancelar
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};
