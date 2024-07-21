import { LuClock } from "react-icons/lu";
import MenuOptionButton from "./menuOptionButton";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { formatTimeRange } from "../helper/formattedTime";
import { ITask } from "../interfaces/task";
import { useTask } from "../hooks/taskHook";
import { updateTask } from "../service/taskService";

export default function CardList(props: ITask) {
  const taskHook = useTask();

  async function handleStatusChange(task: ITask, status: boolean) {
    const taskToUpdate = { ...task, status: status };

    try {
      const result = await updateTask(taskToUpdate);
      if (result) {
        setTimeout(() => {
          taskHook.fetchTasksData();
        }, 500);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-md bg-zinc-950 px-2 py-3 text-zinc-300 shadow shadow-zinc-900 transition duration-150 ease-in-out hover:bg-zinc-800">
      <div className="flex items-center justify-center gap-2 text-sm font-semibold lg:text-base">
        {
          <Checkbox
            defaultChecked={props.status === true}
            sx={{
              [`&, &.${checkboxClasses.checked}`]: {
                color: "#4f46e5",
              },
            }}
            onChange={(e) => handleStatusChange(props, e.target.checked)}
          />
        }
        <span className="flex flex-col">
          {props.name}
          <p className="text-xs font-semibold text-indigo-600">{props.type}</p>
        </span>
      </div>

      <div className="flex gap-2 text-sm text-zinc-300">
        <span className="hidden items-center justify-center rounded bg-zinc-800 px-2 md:flex">
          {props.data}
        </span>

        <span className="hidden items-center justify-center gap-1 rounded bg-zinc-800 px-2 md:flex">
          {" "}
          <LuClock /> {formatTimeRange(props.startTime, props.endTime)}
        </span>

        {<MenuOptionButton taskId={props.id} />}
      </div>
    </div>
  );
}
