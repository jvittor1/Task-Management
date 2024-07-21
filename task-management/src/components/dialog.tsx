import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import FormTaskComponent from "./formTask";
import { getTaskById } from "../service/taskService";
import { ITask } from "../interfaces/task";
import { formatTask } from "../helper/formattedTasks";

interface DialogProps {
  onClose: () => void;
  taskId?: string;
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
  "& .css-oucraa-MuiStack-root > .MuiTextField-root": {
    minWidth: 0,
  },
}));

export default function DialogComponent(props: DialogProps) {
  const [taskData, setTasksData] = useState<ITask | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (props.taskId) {
        try {
          const fetchTasks = await getTaskById(props.taskId);

          if (fetchTasks) {
            try {
              const formattedTasks = await formatTask(fetchTasks);
              setTasksData(formattedTasks);
            } catch (formatError) {
              console.error("Error formatting tasks:", formatError);
            }
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    fetchData();
  }, [props.taskId]);

  const formRef = useRef<HTMLFormElement | null>(null);

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    props.onClose();
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
      <DialogContent
        dividers
        sx={{
          marginTop: "24px",
          width: {
            xs: "100%",
            sm: "440px",
            md: "440px",
            lg: "580px",
            xl: "580px",
          },
        }}
      >
        {taskData && (
          <FormTaskComponent
            ref={formRef}
            onClose={handleClose}
            taskData={taskData}
            isUpdate={!!taskData}
          />
        )}
        {!taskData && <FormTaskComponent ref={formRef} onClose={handleClose} />}

        <button
          onClick={() => formRef.current!.submit()}
          className="mt-4 flex w-full items-center justify-center rounded bg-indigo-600 px-8 py-3 text-base font-semibold text-zinc-200 transition duration-150 ease-in-out hover:bg-indigo-700"
        >
          Save
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
