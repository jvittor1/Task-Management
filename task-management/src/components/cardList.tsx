import { LuClock } from "react-icons/lu";
import MenuOptionButton from "./menuOptionButton";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { formatTimeRange } from "../helper/formattedTime";
import { ITask } from "../interfaces/task";

export default function CardList(props: ITask) {
  return (
    <div className="ease-in-ou flex w-full cursor-pointer items-center justify-between rounded-md bg-zinc-950 px-2 py-3 text-zinc-300 shadow shadow-zinc-900 transition duration-150 hover:bg-zinc-800">
      <div className="flex items-center justify-center gap-2 text-sm font-semibold lg:text-base">
        {
          <Checkbox
            defaultChecked={props.status === true}
            sx={{
              [`&, &.${checkboxClasses.checked}`]: {
                color: "#4f46e5",
              },
            }}
          />
        }
        <span className="flex flex-col">
          {props.title}
          <p className="text-xs font-semibold text-indigo-600">{props.type}</p>
        </span>
      </div>

      <div className="flex gap-2 text-sm text-zinc-300">
        <span className="hidden items-center justify-center rounded bg-zinc-800 px-2 lg:flex">
          {props.date}
        </span>

        <span className="hidden items-center justify-center gap-1 rounded bg-zinc-800 px-2 lg:flex">
          {" "}
          <LuClock /> {formatTimeRange(props.startTime, props.endTime)}
        </span>

        {<MenuOptionButton taskId={props.id} />}
      </div>
    </div>
  );
}
