import { useState, useCallback, useEffect } from "react";
import { IFolder } from "../../../../interfaces/IFolder";
import { IUser } from "../../../../interfaces/IUser";
import { FolderService } from "../../../../services/FolderService";
import { styled, alpha } from '@mui/material/styles';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 15,
        borderLeft: `2px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));


export interface IFolderBranchProps {
    user: IUser | null
    folder: IFolder
    itemId: string
    autoOpen?: boolean
}

export const FolderBranch = ({
    user,
    folder,
    itemId,
    autoOpen
}: IFolderBranchProps) => {

    const [folders, setFolders] = useState<IFolder[]>([]);

    const fetchFolder = useCallback(async (folderId: string) => {
        if (!user) return;

        const res = await FolderService.Fetch(user.id, folderId);
        if (!res.success || !res.data) return;

        setFolders([...res.data.folders]);
    }, [user]);

    const handleOnClick = () => {
        if (!folder) return;
        fetchFolder(folder.id);
    }

    useEffect(() => {
        if (autoOpen && folder) {
            fetchFolder(folder.id);
        }
    }, [autoOpen, folder]);

    return (
        <CustomTreeItem 
            itemId={itemId}
            label={folder.name}
        //onClick={handleOnClick}
        >
            {
                folders.length > 0 && (
                    folders.map((folder, i) => (
                        <FolderBranch
                            key={i}
                            itemId={folder.id}
                            folder={folder}
                            user={user}
                            autoOpen={true}
                        />
                    ))
                )
            }
        </CustomTreeItem>
    )
}