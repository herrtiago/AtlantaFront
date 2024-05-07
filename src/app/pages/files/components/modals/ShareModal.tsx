// ShareModal.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "../../../../../components/IconButton";
import SaveIcon from "@mui/icons-material/Save";
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
  
interface ShareModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    itemId: string;
    itemType: "folder" | "file";
  }
  
  export const ShareModal = ({ open, setOpen, itemId, itemType }: ShareModalProps) => {
    const user = useAuth((s) => s.user);
    const [emails, setEmails] = React.useState<string>("");
  
    const shareItem = async () => {
      if (!user || !emails) return;
  
      const emailList = emails.split(",").map((email) => email.trim());
  
      let res;
      if (itemType === "folder") {
        res = await FolderService.Share(user.id, itemId, emailList);
      } else {
        res = await FileService.Share(user.id, itemId, emailList);
      }
  
      if (!res.success && res.errors.length > 0) {
        alertifyjs.error(res.errors.join(", "));
      } else {
        alertifyjs.success(`${itemType === "folder" ? "Carpeta" : "Archivo"} compartido correctamente`);
        setOpen(false);
        setEmails(""); // Reiniciar los correos electrónicos
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
        <Typography id="modal-modal-title">Compartir con usuarios</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Ingresa las direcciones de correo separadas por comas.
        </Typography>
        <input
          type="text"
          className="w-full border mt-2 p-2"
          placeholder="correo1@example.com, correo2@example.com"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
        />
        <IconButton
          className="!mt-5 !rounded-none !bg-blue-500 hover:!bg-blue-400"
          icon={<SaveIcon />}
          onClick={shareItem}
        >
          Compartir
        </IconButton>
      </Box>
    </Modal>
  );
};
