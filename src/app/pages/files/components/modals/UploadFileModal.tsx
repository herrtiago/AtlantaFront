import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
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

export const UploadFileModal = ({
    open, setOpen
}: UploadFileProps) => {

    const user = useAuth(s => s.user);
    const [currentFolder, actualizarArchivos] = useFileExplorer(s => [s.currentFolder, s.actualizarArchivos]);

    const [archivo, setArchivo] = useState<File | null>(null);

    const [nombre, setNombre] = useState("");
    const [extension, setExtension] = useState("");

    useEffect(() => {
        if (archivo) {
            const fileName = archivo.name.split(".");
            setNombre(fileName.slice(0, fileName.length - 1).join("."));
            setExtension(fileName[fileName.length - 1]);
        }
    }, [archivo]);

    const guardar = async () => {
        if(!user || !archivo){
            return;
        }
        const file: ICreateFile = {
            folderId: currentFolder,
            name: nombre,
            extension,
            content: await getBase64(archivo)
        }
        const res = await FileService.Create(user.id, file);
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
                <Typography id="modal-modal-title">
                    Nombre
                </Typography>
                <div className='flex'>
                    <Input
                        className='w-3/4 mr-2'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <Input
                        className='w-1/4'
                        value={extension}
                        onChange={(e) => setExtension(e.target.value)}
                    />
                </div>
                <IconButton
                    className="!mt-5 !rounded-none !bg-gray-500 hover:!bg-gray-400"
                    icon={<CloudUploadIcon />}
                    type='file'
                    onChange={(e) => {
                        if (e.target.files) {
                            setArchivo(e.target.files[0])
                        }
                    }}
                >
                    Subir archivo
                </IconButton>
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
