import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

// Context values
interface ContextmenuProviderProps {
    isRenameModalOpen: boolean
    isDeleteModalOpen: boolean
    isMoveModalOpen: boolean
    isShareModalOpen: boolean
    setRenameModalOpen: Dispatch<SetStateAction<boolean>>
    setDeleteModalOpen: Dispatch<SetStateAction<boolean>>
    setMoveModalOpen: Dispatch<SetStateAction<boolean>>
    setShareModalOpen: Dispatch<SetStateAction<boolean>>

    clicked: boolean
    setClicked: Dispatch<SetStateAction<boolean>>
    contextMenuPos: {
        x: number;
        y: number;
    }
    setContextMenuPos: Dispatch<SetStateAction<{
        x: number;
        y: number;
    }>>
}

// Context init values
const initialContextmenuProvider: ContextmenuProviderProps = {
    isRenameModalOpen: false,
    isDeleteModalOpen: false,
    isMoveModalOpen: false,
    isShareModalOpen: false,
    setRenameModalOpen: () => { },
    setDeleteModalOpen: () => { },
    setMoveModalOpen: () => { },
    setShareModalOpen: () => { },

    clicked: false,
    setClicked: () => { },
    contextMenuPos: { x: 0, y: 0 },
    setContextMenuPos: () => { }
}

// Create Context
const ContextmenuContext = createContext<ContextmenuProviderProps>(initialContextmenuProvider)

// Provider Type
type ContextmenuProviderType = React.FC<{
    children: React.ReactNode
}>;

export const ContextmenuProvider: ContextmenuProviderType = ({
    children
}) => {

    const [isRenameModalOpen, setRenameModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isMoveModalOpen, setMoveModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);

    const [clicked, setClicked] = useState(false);
    const [contextMenuPos, setContextMenuPos] = useState({
        x: 0,
        y: 0
    });

    return (
        <ContextmenuContext.Provider value={{
            isRenameModalOpen, setRenameModalOpen,
            isDeleteModalOpen, setDeleteModalOpen,
            isMoveModalOpen, setMoveModalOpen,
            isShareModalOpen, setShareModalOpen,

            clicked, setClicked,
            contextMenuPos, setContextMenuPos
        }}>
            {children}
        </ContextmenuContext.Provider>
    )
}

// Exports a custom hook
export const useContextmenu = () => useContext(ContextmenuContext);