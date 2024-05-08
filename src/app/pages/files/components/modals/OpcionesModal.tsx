import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '../../../../../components/IconButton';
import { useState } from 'react';
import { useFileExplorer } from '../../../../../store/fileExplorerStore';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../../../../../store/authStore';
import * as alertifyjs from "alertifyjs";
import { FolderService } from '../../../../../services/FolderService';

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

interface UploadFileProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const OpcionesModal = ({
    open, setOpen
}: UploadFileProps) => {

    const user = useAuth(s => s.user);
    const [currentFolder, actualizarArchivos] = useFileExplorer(s => [s.currentFolder, s.actualizarArchivos]);

    const [nombre, setNombre] = useState("");

    const guardar = async () => {
        console.log(user)
        if(!user){
            return;
        }
        const res = await FolderService.Create(user.id, currentFolder ?? "root", nombre);
        if(!res.success && res.errors.length > 0) {
            alertifyjs.error(res.errors.join(", "));
        } else {
            alertifyjs.success("Archivo subido correctamente");
            actualizarArchivos(user.id, currentFolder ?? "root");
        }
    }

    return (
        <Modal
            open={open}
            sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(128, 128, 128, 0.05)' } }}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    className="!mt-5 !rounded-none !bg-gray-500 hover:!bg-gray-400"
                    icon={<SaveIcon/>}
                    onClick={guardar}
                >
                    Guardar
                </IconButton>
                <IconButton
                    className="!mt-5 !rounded-none !bg-gray-500 hover:!bg-gray-400"
                    icon={<SaveIcon/>}
                    onClick={guardar}
                >
                    Guardar
                </IconButton>
            </Box>
        </Modal>
    );
}
