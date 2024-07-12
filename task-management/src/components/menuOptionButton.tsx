import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import DialogComponent from "./dialog";
import DeleteDialogComponent from "./deleteDialog";

const options = [
  {
    name: "delete",
    icon: <MdDelete />,
  },
  {
    name: "edit",
    icon: <MdEdit />,
  },
];

const ITEM_HEIGHT = 48;

interface IMenuOptionButton {
  taskId: number;
}

export default function MenuOptionButton(props: IMenuOptionButton) {
  const [editDialogOpen, setEditDialogOpen] = React.useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option: string) => {
    if (option === "delete") {
      setDeleteDialogOpen(true);
    } else if (option === "edit") {
      setEditDialogOpen(true);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MdMoreVert color="#fff" size={16} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 500,
            }}
            key={option.name}
            onClick={() => handleClose(option.name)}
          >
            {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
            {option.icon}
          </MenuItem>
        ))}
      </Menu>

      {editDialogOpen && (
        <DialogComponent
          taskId={props.taskId}
          onClose={() => setEditDialogOpen(false)}
        />
      )}

      {deleteDialogOpen && (
        <DeleteDialogComponent
          taskId={props.taskId}
          onClose={() => setDeleteDialogOpen(false)}
        />
      )}
    </div>
  );
}
