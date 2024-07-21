import { MdLogout, MdTask } from "react-icons/md";
import SideBarCard from "./sidebarCard";
import { Divider } from "@mui/material";
import { FaHome } from "react-icons/fa";
import { getTasksType } from "../service/taskService";
import { ITaskType } from "../interfaces/task";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  selectedFilter: string;
  handleFilter: (filter: string) => void;
  handleSidebarClick: (filter: string) => void;
  filters: string[];
}
export default function Sidebar({
  selectedFilter,
  handleFilter,
  handleSidebarClick,
  filters,
}: SidebarProps) {
  const [data, setData] = useState<ITaskType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTasksType();
        setData(result || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="flex h-full w-full flex-col items-start bg-zinc-950 text-zinc-200">
      <div className="flex w-full flex-1 flex-col gap-3 px-5 py-8">
        <h1 className="mb-4 text-center text-xl font-bold text-indigo-700">
          Welcome!
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

        <div
          className="no-scrollbar mt-2 flex flex-col gap-1 overflow-auto"
          style={{ maxHeight: "calc(65vh - 40px)" }}
        >
          <span className="font-semibold text-zinc-700">Filters</span>
          <Divider
            sx={{
              background: "#27272a",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          />
          <div className="flex flex-col gap-1"></div>

          {data &&
            data.length > 0 &&
            data.map((type) => (
              <SideBarCard
                key={type.value}
                name={type.name}
                checkable={true}
                handleCheck={handleFilter}
                checked={filters?.includes(type.name)}
              />
            ))}
        </div>
      </div>

      <div className="mt-4 flex w-full border-t-[1px] border-zinc-700">
        <button
          onClick={logout}
          className="flex w-full items-center justify-between px-8 py-4 text-lg font-semibold text-zinc-200 hover:bg-zinc-900"
        >
          <span className="text-base text-zinc-400">Logout</span>
          <MdLogout color="#a1a1aa" />
        </button>
      </div>
    </div>
  );
}
