import { SimpleTreeView } from "@mui/x-tree-view"
import { IFolder } from "../../../../interfaces/IFolder"
import { useAuth } from "../../../../store/authStore"
import { FolderBranch } from "./folderBranch"

export interface IFolders {
    folder: IFolder
    folders: IFolders[]
}


export const FolderTree = () => {

    const user = useAuth(s => s.user);

    return (
        <SimpleTreeView
            aria-label="file system navigator"
            sx={{ height: 200, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            <FolderBranch
                itemId="root"
                folder={{id: "root", name: "root", folderId: null}}
                user={user}
                autoOpen={true}
            />
        </SimpleTreeView>
    )
}