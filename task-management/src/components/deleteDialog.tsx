import { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import { getTaskById } from "../helper/getTask";

interface DeleteDialogComponentProps {
  onClose: () => void;
  taskId: number;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#18181b",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    backgroundColor: "#18181b",
    color: "#f1f1f1",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    backgroundColor: "#18181b",
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: "#18181b",
    color: "#f1f1f1",
  },
}));

export default function DeleteDialogComponent(
  props: DeleteDialogComponentProps,
) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleDelete = (taskId: number) => {
    console.log(getTaskById(taskId));

    handleClose();
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <MdClose color="#f1f1f1" />
      </IconButton>
      <DialogContent dividers sx={{ marginTop: "24px", width: "340px" }}>
        <h2 className="text-lg font-semibold">Are you sure?</h2>
        <p className="mt-2 text-base">
          Do you really want to delete this task? This process cannot be undone.
        </p>

        <button
          onClick={() => handleDelete(props.taskId)}
          className="mt-4 flex w-full items-center justify-center rounded bg-red-600 px-8 py-3 text-base font-semibold text-zinc-200 transition duration-150 ease-in-out hover:bg-red-700"
        >
          Delete
        </button>

        <button
          onClick={handleClose}
          className="mt-2 flex w-full items-center justify-center rounded bg-zinc-500 px-8 py-3 text-base font-semibold text-zinc-200 transition duration-150 ease-in-out hover:bg-zinc-600"
        >
          Cancel
        </button>
      </DialogContent>
    </BootstrapDialog>
  );
}
