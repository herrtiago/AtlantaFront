import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IconButton from '../../../../../components/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import { useFileExplorer } from '../../../../../store/fileExplorerStore';
import { useAuth } from '../../../../../store/authStore';
import * as alertifyjs from "alertifyjs";
import { FolderService } from '../../../../../services/FolderService';
import { FileService } from '../../../../../services/FileService';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface MoveFileModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fileId: string;
    fileType: 'folder' | 'file';
}

export const MoveFileModal = ({
    open, setOpen, fileId, fileType
}: MoveFileModalProps) => {

    const user = useAuth(s => s.user);
    const [currentFolder, actualizarArchivos] = useFileExplorer(s => [s.currentFolder, s.actualizarArchivos]);

    const [newParentId, setNewParentId] = useState("");

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
            alertifyjs.success(`${fileType === "folder" ? "Carpeta" : "Archivo"} movido correctamente`);
            actualizarArchivos(user.id, currentFolder ?? "root");
            setNewParentId(""); // Reiniciar el nuevo directorio
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
                <Typography id="modal-modal-title">
                    Mover a
                </Typography>
                <input
                    type="text"
                    className="w-full border mt-2 p-2"
                    placeholder="Nuevo directorio"
                    value={newParentId}
                    onChange={(e) => setNewParentId(e.target.value)}
                />
                <IconButton
                    className="!mt-5 !rounded-none !bg-gray-500 hover:!bg-gray-400"
                    icon={<SaveIcon />}
                    onClick={mover}
                >
                    Mover
                </IconButton>
            </Box>
        </Modal>
    );
};
