import { MdLogout, MdTask } from "react-icons/md";
import SideBarCard from "./sidebarCard";
import { Divider } from "@mui/material";
import { FaHome } from "react-icons/fa";

interface SidebarProps {
  selectedFilter: string;
  handleSidebarClick: (name: string) => void;
  handleFilter: (data: string) => void;
  filters?: string[];
}
export default function Sidebar({
  selectedFilter,
  handleFilter,
  handleSidebarClick,
  filters,
}: SidebarProps) {
  return (
    <div className="flex h-full w-full flex-col items-start bg-zinc-950 text-zinc-200">
      <div className="flex w-full flex-1 flex-col gap-3 px-5 py-8">
        <h1 className="mb-4 text-xl font-bold text-indigo-700">
          Welcome, Nome!
        </h1>
        <SideBarCard
          onClick={() => handleSidebarClick("Home")}
          selected={selectedFilter === "Home"}
          name="Home"
          icon={FaHome}
        />
        <SideBarCard
          onClick={() => handleSidebarClick("Completed")}
          selected={selectedFilter === "Completed"}
          name="Completed"
          icon={MdTask}
        />

        <div className="mt-2 flex flex-col gap-1">
          <span className="font-semibold text-zinc-700">Filters</span>
          <Divider
            sx={{
              background: "#27272a",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          />

          <SideBarCard
            name="Personal"
            checkable={true}
            handleCheck={handleFilter}
            checked={filters?.includes("Personal")}
          />
          <SideBarCard
            name="Work"
            checkable={true}
            handleCheck={handleFilter}
            checked={filters?.includes("Work")}
          />
          <SideBarCard
            name="Diet"
            checkable={true}
            handleCheck={handleFilter}
            checked={filters?.includes("Diet")}
          />
          <SideBarCard
            name="Study"
            checkable={true}
            handleCheck={handleFilter}
            checked={filters?.includes("Study")}
          />
        </div>
      </div>

      <div className="mt-4 flex w-full border-t-[1px] border-zinc-700">
        <button className="flex w-full items-center justify-between px-8 py-4 text-lg font-semibold text-zinc-200 hover:bg-zinc-900">
          <span className="text-base text-zinc-400">Logout</span>
          <MdLogout color="#a1a1aa" />
        </button>
      </div>
    </div>
  );
}
