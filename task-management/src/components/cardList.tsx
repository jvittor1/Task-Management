import { IconType } from "react-icons";
import { LuClock } from "react-icons/lu";
import MenuOptionButton from "./menuOptionButton";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { formatTimeRange } from "../helper/formattedTime";

interface CardListProps {
  name: string;
  startTime?: string;
  endTime?: string;
  icon?: IconType;
  checkable?: boolean;
  deletable?: boolean;
  color?: string;
  iconColor?: string;
}
export default function CardList(props: CardListProps) {
  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-[6px] text-zinc-300 transition duration-150 ease-in-out ${props.color ? `bg-${props.color}-600` : "bg-zinc-950"} ${props.color ? `hover:bg-${props.color}-800` : "hover:bg-zinc-800"} `}
    >
      <div className="flex items-center justify-center gap-2 text-base font-semibold">
        {props.icon && <props.icon color={props.iconColor} />}
        {props.checkable && (
          <Checkbox
            sx={{
              [`&, &.${checkboxClasses.checked}`]: {
                color: "#4f46e5",
              },
            }}
          />
        )}
        {props.name}
      </div>

      <div className="flex gap-2">
        {props.startTime && props.endTime && (
          <span className="flex items-center justify-center gap-1 rounded bg-zinc-800 px-2 text-sm text-zinc-300">
            {" "}
            <LuClock /> {formatTimeRange(props.startTime, props.endTime)}
          </span>
        )}
        {props.deletable && <MenuOptionButton />}
      </div>
    </div>
  );
}
