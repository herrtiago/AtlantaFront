import { Typography } from "@mui/material";
import { useFileExplorer } from "../../../../store/fileExplorerStore";
import { FileIcon } from "react-file-icon";
import { useEffect, useState } from "react";
import { FileService } from "../../../../services/FileService";
import { useAuth } from "../../../../store/authStore";
import { downloadFile } from "../../../../utils/downloadFile";
import { RenameFileModal } from "./modals/RenameFileModal";
import { DeleteConfirmationModal } from "./modals/DeleteConfirmationModal";
import { MoveFileModal } from "./modals/MoveFileModal";
import { ShareModal } from "./modals/ShareModal";
import { ContextMenu } from "../../../../components/ContextMenu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoveIcon from "@mui/icons-material/DriveFileMove";
import ShareIcon from "@mui/icons-material/Share";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import * as alertitify from "alertifyjs";

export const FilesMap = () => {
  const user = useAuth((s) => s.user);
  const currentFiles = useFileExplorer((s) => s.currentFiles);
  const actualizarArchivos = useFileExplorer((s) => s.actualizarArchivos);
  const currentFolder = useFileExplorer((s) => s.currentFolder);

  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [isMoveModalOpen, setMoveModalOpen] = useState(false);

  const [isShareModalOpen, setShareModalOpen] = useState(false);


  const [itemId, setItemId] = useState<string | null>(null);

  const [clicked, setClicked] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({
    x: 0,
    y: 0
  });

  const descargarItem = async () => {
    if (!user || !itemId) return;
    const res = await FileService.Fetch(user.id, itemId);
    if (res.success && res.data) {
      downloadFile(res.data);
    } else {
      if (res.errors.length > 0) {
        alertitify.error(res.errors.join(", "));
      } else {
        alertitify.error("No se pudo descargar el archivo");
      }
    }
  };

  const openRenameModal = () => {
    setRenameModalOpen(true);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const openMoveModal = () => {
    setMoveModalOpen(true);
  };

  const openShareModal = () => {
    setShareModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      actualizarArchivos(user.id, currentFolder ?? "root");
    }
  }, [user, currentFolder, actualizarArchivos]);

  return (
    <div className="flex-1 p-2 bg-orange-50 border border-gray-100 rounded-md shadow-xl">
      {currentFiles.length > 0 ? (
        <div className="grid grid-cols-10 gap-2">
          {currentFiles.map((file, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center p-1 border border-gray-300 rounded-lg bg-white shadow-md w-24"
              onContextMenu={(e) => {
                e.preventDefault();
                const newPos = {
                  x: e.pageX,
                  y: e.pageY
                }
                setContextMenuPos({ ...newPos });
                setClicked(true);
                setItemId(file.id);
              }}
            >
              <div className="max-w-16">
                <FileIcon color="#d1d5db" extension={file.extension} />
              </div>
              <p className="truncate w-20 text-center text-sm">
                {file.name}
                {file.extension ? `.${file.extension}` : ""}
              </p>
              {
                /*
                <EditIcon
                className="absolute top-0 right-16 m-1 cursor-pointer text-blue-400"
                onClick={(e) => {
                  e.stopPropagation();
                  openRenameModal(file.id);
                }}
              />
              <MoveIcon
                className="absolute top-0 right-12 m-1 cursor-pointer text-green-500"
                onClick={(e) => {
                  e.stopPropagation();
                  openMoveModal(file.id);
                }}
              />
              <ShareIcon
                className="absolute top-0 right-8 m-1 cursor-pointer text-yellow-500"
                onClick={(e) => {
                  e.stopPropagation();
                  openShareModal(file.id);
                }}
              />
              <DeleteIcon
                className="absolute top-0 right-0 m-1 cursor-pointer text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal(file.id);
                }}
              />
                */
              }

            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Typography>No hay archivos</Typography>
        </div>
      )}
      {itemId && (
        <>
          <RenameFileModal
            open={isRenameModalOpen}
            setOpen={setRenameModalOpen}
            fileId={itemId}
            fileType="file"
          />
          <DeleteConfirmationModal
            open={isDeleteModalOpen}
            setOpen={setDeleteModalOpen}
            itemId={itemId}
            itemType="file"
          />
          <MoveFileModal
            open={isMoveModalOpen}
            setOpen={setMoveModalOpen}
            fileId={itemId}
            fileType="file"
          />
          <ShareModal
            open={isShareModalOpen}
            setOpen={setShareModalOpen}
            itemId={itemId}
            itemType="file"
          />
        </>
      )}
      {
        clicked && (
          <ContextMenu
            className="text-white"
            options={[
              {
                text: "Descargar",
                icon: <CloudDownloadIcon />,
                onClick: (e) => {
                  e.stopPropagation();
                  descargarItem();
                }
              },
              {
                text: "Renombrar",
                icon: <EditIcon />,
                onClick: (e) => {
                  e.stopPropagation();
                  openRenameModal();
                  setClicked(false);
                }
              }, {
                text: "Mover",
                icon: <MoveIcon />,
                onClick: (e) => {
                  e.stopPropagation();
                  openMoveModal();
                  setClicked(false);
                }
              }, {
                text: "Compartir",
                icon: <ShareIcon />,
                onClick: (e) => {
                  e.stopPropagation();
                  openShareModal();
                  setClicked(false);
                }
              }, {
                text: "Eliminar",
                icon: <DeleteIcon />,
                onClick: (e) => {
                  e.stopPropagation();
                  openDeleteModal()
                  setClicked(false);
                }
              }
            ]}
            x={contextMenuPos.x}
            y={contextMenuPos.y}
            setClicked={setClicked}
          />
        )
      }
    </div>
  );
};
