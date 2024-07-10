import { LuClock } from "react-icons/lu";
import MenuOptionButton from "./menuOptionButton";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { formatTimeRange } from "../helper/formattedTime";
import { ITask } from "../interfaces/task";

export default function CardList(props: ITask) {
  return (
    <div className="ease-in-ou flex w-full cursor-pointer items-center justify-between rounded-md bg-zinc-950 px-2 py-[6px] text-zinc-300 transition duration-150 hover:bg-zinc-800">
      <div className="flex items-center justify-center gap-2 text-base font-semibold">
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
        {props.title}
      </div>

      <div className="flex gap-2 text-sm text-zinc-300">
        <span className="flex items-center justify-center rounded bg-zinc-800 px-2">
          {props.date}
        </span>

        <span className="flex items-center justify-center gap-1 rounded bg-zinc-800 px-2">
          {" "}
          <LuClock /> {formatTimeRange(props.startTime, props.endTime)}
        </span>

        {<MenuOptionButton />}
      </div>
    </div>
  );
}
