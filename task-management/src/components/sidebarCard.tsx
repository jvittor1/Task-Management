import { IconType } from "react-icons";
import MenuOptionButton from "./menuOptionButton";

interface SideBarCardProps {
  name: string;
  icon: IconType;
  deletable?: boolean;
  onClick: (data: string) => void;
  selected: boolean;
}
export default function SideBarCard(props: SideBarCardProps) {
  return (
    <div
      onClick={() => props.onClick(props.name)}
      className={`ease-in-ou flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-[6px] text-zinc-300 transition duration-150 hover:bg-zinc-800 ${props.selected ? "bg-zinc-800" : "bg-zinc-950"}`}
    >
      <div
        className={`flex items-center justify-center gap-2 text-base font-semibold ${props.selected ? "text-zinc-100" : "text-zinc-400"}`}
      >
        {<props.icon color={"#4f46e5 "} />}
        {props.name}
      </div>

      <div className="flex gap-2">
        {props.deletable && <MenuOptionButton />}
      </div>
    </div>
  );
}
