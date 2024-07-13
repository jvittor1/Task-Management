import { Checkbox, checkboxClasses } from "@mui/material";
import { IconType } from "react-icons";

interface SideBarCardProps {
  name: string;
  icon?: IconType;
  checkable?: boolean;
  onClick?: (data: string) => void;
  selected?: boolean;
  handleCheck?: (data: string) => void;
  checked?: boolean;
}
export default function SideBarCard(props: SideBarCardProps) {
  return (
    <div
      onClick={() => (props.onClick ? props.onClick(props.name) : null)}
      className={`ease-in-ou flex w-full cursor-pointer items-center rounded-md px-2 py-[6px] text-zinc-300 transition duration-150 hover:bg-zinc-800 ${props.selected ? "bg-zinc-800" : "bg-zinc-950"}`}
    >
      <div
        className={`flex items-center justify-center gap-2 text-base font-semibold ${props.selected ? "text-zinc-100" : "text-zinc-400"}`}
      >
        {props.icon && <props.icon color={"#4f46e5 "} />}

        {props.checkable && (
          <Checkbox
            size="small"
            sx={{
              [`&, &.${checkboxClasses.checked}`]: {
                color: "#4f46e5",
              },
            }}
            checked={props.checked ? props.checked : false}
            onChange={() =>
              props.handleCheck ? props.handleCheck(props.name) : null
            }
          />
        )}

        {props.name}
      </div>
    </div>
  );
}
