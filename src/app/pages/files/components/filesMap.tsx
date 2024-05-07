// FilesMap.tsx
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoveIcon from "@mui/icons-material/DriveFileMove";

export const FilesMap = () => {
  const user = useAuth((s) => s.user);
  const currentFiles = useFileExplorer((s) => s.currentFiles);
  const actualizarArchivos = useFileExplorer((s) => s.actualizarArchivos);
  const currentFolder = useFileExplorer((s) => s.currentFolder);

  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  const [deleteFileId, setDeleteFileId] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [moveFileId, setMoveFileId] = useState<string | null>(null);
  const [isMoveModalOpen, setMoveModalOpen] = useState(false);

  const HandleClick = async (fileId: string) => {
    if (!user) return;
    const res = await FileService.Fetch(user.id, fileId);
    if (res.success && res.data) {
      downloadFile(res.data);
    }
  };

  const openRenameModal = (fileId: string) => {
    setSelectedFileId(fileId);
    setRenameModalOpen(true);
  };

  const openDeleteModal = (fileId: string) => {
    setDeleteFileId(fileId);
    setDeleteModalOpen(true);
  };

  const openMoveModal = (fileId: string) => {
    setMoveFileId(fileId);
    setMoveModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      actualizarArchivos(user.id, currentFolder ?? "root");
    }
  }, [user, currentFolder, actualizarArchivos]);

  return (
    <div className="flex-1 p-2 bg-orange-50 border border-gray-100 rounded-md shadow-xl">
      {currentFiles.length > 0 ? (
        <div className="grid grid-cols-8 gap-4">
          {currentFiles.map((file, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center p-2 border border-gray-300 rounded-lg bg-white shadow-md w-28"
              onClick={() => HandleClick(file.id)}
            >
              <div className="max-w-16">
                <FileIcon color="#d1d5db" extension={file.extension} />
              </div>
              <p className="truncate w-24 text-center text-sm">
                {file.name}
                {file.extension ? `.${file.extension}` : ""}
              </p>
              <EditIcon
                className="absolute top-1 right-10 m-1 cursor-pointer text-blue-400"
                onClick={(e) => {
                  e.stopPropagation();
                  openRenameModal(file.id);
                }}
              />
              <MoveIcon
                className="absolute top-1 right-6 m-1 cursor-pointer text-green-500"
                onClick={(e) => {
                  e.stopPropagation();
                  openMoveModal(file.id);
                }}
              />
              <DeleteIcon
                className="absolute top-1 right-1 m-1 cursor-pointer text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal(file.id);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Typography>No hay archivos</Typography>
        </div>
      )}
      {selectedFileId && (
        <RenameFileModal
          open={isRenameModalOpen}
          setOpen={setRenameModalOpen}
          fileId={selectedFileId}
          fileType="file"
        />
      )}
      {deleteFileId && (
        <DeleteConfirmationModal
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          itemId={deleteFileId}
          itemType="file"
        />
      )}
      {moveFileId && (
        <MoveFileModal
          open={isMoveModalOpen}
          setOpen={setMoveModalOpen}
          fileId={moveFileId}
          fileType="file"
        />
      )}
    </div>
  );
};
