// ShareModal.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "../../../../../components/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import { useAuth } from "../../../../../store/authStore";
import * as alertifyjs from "alertifyjs";
import { FolderService } from "../../../../../services/FolderService";
import { FileService } from "../../../../../services/FileService";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

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

interface ShareModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: string;
  itemType: "folder" | "file";
}

export const ShareModal = ({ open, setOpen, itemId, itemType }: ShareModalProps) => {
  const user = useAuth((s) => s.user);
  const [usersId, setUsersId] = React.useState<string>("");

  const [link, setLink] = React.useState<string | null>(null);

  const shareItem = async () => {
    if (!user || !usersId) return;

    const idsList = usersId.split(",").map((email) => email.trim());

    let res;
    if (itemType === "folder") {
      res = await FolderService.Share(user.id, itemId, idsList);
    } else {
      res = await FileService.Share(user.id, itemId, idsList);
    }

    if (!res.success && res.errors.length > 0) {
      alertifyjs.error(res.errors.join(", "));
    } else {
      alertifyjs.success(`${itemType === "folder" ? "Carpeta" : "Archivo"} compartido correctamente`);
      //setOpen(false);
      setUsersId(""); // Reiniciar los correos electrónicos
      setLink(window.location.origin + `/files?folderId=${itemId}`);
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
        <Typography id="modal-modal-title">Compartir con usuarios</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Ingresa los id's de los usuarios a los que desea compartir.
        </Typography>
        <input
          type="text"
          className="w-full border mt-2 p-2"
          value={usersId}
          onChange={(e) => setUsersId(e.target.value)}
        />
        {
          link && (
            <div className="mt-2 w-full h-10 p-1">
              <div className="bg-gray-100 w-full h-full rounded-lg flex justify-between items-center px-2 text-gray-500">
                <p>{link}</p>
                <ContentPasteIcon className=" text-gray-500" />
              </div>
            </div>
          )
        }
        <IconButton
          className="!mt-2 !rounded-none !bg-blue-500 hover:!bg-blue-400"
          icon={<SaveIcon />}
          onClick={shareItem}
        >
          Compartir
        </IconButton>
      </Box>
    </Modal>
  );
};
