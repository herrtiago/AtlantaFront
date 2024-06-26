import * as React from "react";
import clsx from "clsx";
import { animated, useSpring } from "@react-spring/web";
import { styled, alpha } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import FolderRounded from "@mui/icons-material/FolderRounded";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { treeItemClasses } from "@mui/x-tree-view/TreeItem";
import {
  unstable_useTreeItem2 as useTreeItem2,
  UseTreeItem2Parameters,
  UseTreeItem2Status,
} from "@mui/x-tree-view/useTreeItem2";
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { useFileExplorer } from "../../../../store/fileExplorerStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoveIcon from "@mui/icons-material/DriveFileMove";
import ShareIcon from "@mui/icons-material/Share";
import { RenameFileModal } from "./modals/RenameFileModal";
import { DeleteConfirmationModal } from "./modals/DeleteConfirmationModal";
import { MoveFileModal } from "./modals/MoveFileModal";
import { ShareModal } from "./modals/ShareModal";
import { ContextMenu } from "../../../../components/ContextMenu";
import { ContextmenuProvider, useContextmenu } from "../context/ContextMenuProvider";

export type ExtendedTreeItemProps = {
  id: string;
  label: string;
};

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: "70%",
        bgcolor: "warning.main",
        display: "inline-block",
        verticalAlign: "middle",
        zIndex: 1,
        mx: 1,
      }}
    />
  );
}

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[800]
      : theme.palette.grey[400],
  position: "relative",
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
  },
})) as unknown as typeof TreeItem2Root;

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  flexDirection: "row-reverse",
  borderRadius: theme.spacing(0.7),
  marginBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  fontWeight: 500,
  [`& .${treeItemClasses.iconContainer}`]: {
    marginRight: theme.spacing(2),
  },
  [`&.Mui-expanded `]: {
    "&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon": {
      color: theme.palette.primary.dark,
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: "16px",
      top: "40px",
      height: "calc(100% - 48px)",
      width: "2px",
      backgroundColor: theme.palette.primary,
    },
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  },
  [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
      paddingLeft: "40px",
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

const StyledTreeItemLabelText = styled(Typography)({
  color: "white",
  fontFamily: "General Sans",
  fontWeight: 500,
}) as unknown as typeof Typography;

interface CustomLabelProps {
  children: React.ReactNode;
  expandable?: boolean;
}

function CustomLabel({ expandable, children, ...other }: CustomLabelProps) {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component={FolderRounded}
        className="labelIcon"
        color="gray"
        sx={{ mr: 1, fontSize: "1.2rem" }}
      />
      <StyledTreeItemLabelText variant="body2">
        {children}
      </StyledTreeItemLabelText>
      {expandable && <DotIcon />}
    </TreeItem2Label>
  );
}

const isExpandable = (reactChildren: React.ReactNode) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
  Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> { }

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const [currentFolder, setCurrentFolder] = useFileExplorer((s) => [s.currentFolder, s.setCurrentFolder]);

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const expandable = isExpandable(children);

  const {
    isRenameModalOpen, setRenameModalOpen,
    isDeleteModalOpen, setDeleteModalOpen,
    isMoveModalOpen, setMoveModalOpen,
    isShareModalOpen ,setShareModalOpen,

    setContextMenuPos, setClicked
  } = useContextmenu();

  return (
    //@ts-ignore
    <TreeItem2Provider itemId={itemId}>
      <StyledTreeItemRoot {...getRootProps(other)}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              "Mui-expanded": status.expanded,
              "Mui-selected": currentFolder == item.id,
              "Mui-focused": currentFolder == item.id,
              "Mui-disabled": status.disabled,
            }),
            onClick: () => {
              setCurrentFolder(item.id);
            },
            onContextMenu: (e) => {
              e.preventDefault();
              const newPos = {
                x: e.pageX,
                y: e.pageY
              }
              setContextMenuPos({ ...newPos });
              setClicked(true);
            }
          })}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>

          <CustomLabel
            {...getLabelProps({ expandable: expandable && status.expanded })}
          >
            {label}
          </CustomLabel>
        </CustomTreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </StyledTreeItemRoot>
      <RenameFileModal
        open={isRenameModalOpen}
        setOpen={setRenameModalOpen}
        fileId={item.id}
        fileType="folder"
      />
      <MoveFileModal
        open={isMoveModalOpen}
        setOpen={setMoveModalOpen}
        fileId={item.id}
        fileType="folder"
      />
      <ShareModal
        open={isShareModalOpen}
        setOpen={setShareModalOpen}
        itemId={item.id}
        itemType="folder"
      />
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        setOpen={setDeleteModalOpen}
        itemId={item.id}
        itemType="folder"
      />
    </TreeItem2Provider>
  );
});

interface FileExplorerProps {
  items: TreeViewBaseItem<ExtendedTreeItemProps>[];
}

function FileExplorerHandler({ items }: FileExplorerProps) {

  const {
    setRenameModalOpen,
    setDeleteModalOpen,
    setMoveModalOpen,
    setShareModalOpen,

    clicked, setClicked,
    contextMenuPos
  } = useContextmenu();

  const openRenameModal = () => setRenameModalOpen(true);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const openMoveModal = () => setMoveModalOpen(true);
  const openShareModal = () => setShareModalOpen(true);

  return (
    <>
      <RichTreeView
        items={items}
        className="!h-full"
        aria-label="file explorer"
        defaultExpandedItems={["1", "1.1"]}
        defaultSelectedItems="1.1"
        sx={{
          height: "fit-content",
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
        }}
        slots={{ item: CustomTreeItem }}
      />
      {
        clicked && (
          <ContextMenu
            options={[
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
    </>

  );
}


export default function FileExplorer({ items }: FileExplorerProps) {
  return (
    <ContextmenuProvider>
      <FileExplorerHandler items={items} />
    </ContextmenuProvider>
  )
}