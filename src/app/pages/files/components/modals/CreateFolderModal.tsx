import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Icon, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '../../../../../components/IconButton';
import { useEffect, useState } from 'react';
import { useFileExplorer } from '../../../../../store/fileExplorerStore';
import SaveIcon from '@mui/icons-material/Save';
import { FileService } from '../../../../../services/FileService';
import { useAuth } from '../../../../../store/authStore';
import { getBase64 } from '../../../../../utils/getBase64';
import * as alertifyjs from "alertifyjs";
import { ICreateFile } from '../../../../../interfaces/ICreateFile';
import { FolderService } from '../../../../../services/FolderService';

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

interface UploadFileProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateFolderModal = ({
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
            alertifyjs.success("Carpeta creada correctamente");
            actualizarArchivos(user.id, currentFolder ?? "root");
            setNombre(""); // Reiniciar el nombre después de crear la carpeta
            setOpen(false); // Cerrar el modal después de guardar
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title">
                    Nombre
                </Typography>
                <div className='flex'>
                    <Input
                        className='w-3/4 mr-2'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className='mt-5 flex'>

                </div>
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
