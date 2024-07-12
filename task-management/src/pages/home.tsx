import { FaHome, FaPlus } from "react-icons/fa";
import CardList from "../components/cardList";
import { MdTask } from "react-icons/md";
import ResponsiveDatePickers from "../components/datePicker";
import { Divider } from "@mui/material";
import { tasksData } from "../mockData/data";
import { useEffect, useState } from "react";
import { ITask } from "../interfaces/task";
import SideBarCard from "../components/sidebarCard";
import { Dayjs } from "dayjs";
import { formattedDate } from "../helper/formattedDate";
import DialogComponent from "../components/dialog";
import { BiPencil } from "react-icons/bi";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("Home");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    applyFilters();
  }, [tasksData, filters, selectedFilter, filterDate]);

  function handleSidebarClick(data: string) {
    setSelectedFilter(data);
  }

  function handleFilter(data: string) {
    if (filters.includes(data)) {
      const newFilters = filters.filter((filter) => filter !== data);
      setFilters(newFilters);
    } else {
      setFilters([...filters, data]);
    }
  }

  function applyFilters() {
    let filteredTasks = tasksData.filter((task) => {
      if (selectedFilter === "Home") {
        return task.status === false;
      } else if (selectedFilter === "Completed") {
        return task.status === true;
      } else {
        return task.type.toLowerCase() === selectedFilter.toLowerCase();
      }
    });

    if (filters.length > 0) {
      filteredTasks = filteredTasks.filter((task) =>
        filters.some((filter) => task.type.includes(filter)),
      );
    }

    if (filterDate) {
      filteredTasks = filteredTasks.filter((task) => task.date === filterDate);
    }

    setTasks(filteredTasks);
  }

  function handleDateChange(date: Dayjs | null) {
    if (date) {
      const newDate = formattedDate(date);
      setFilterDate(newDate);
    } else {
      setFilterDate("");
    }
  }

  return (
    <section className="flex h-screen w-full bg-zinc-950 text-zinc-200">
      <div className="flex h-full max-w-60 grow-[0.1] flex-col items-start bg-zinc-950">
        <div className="flex w-full flex-1 flex-col gap-3 px-5 py-8">
          <h1 className="mb-4 text-xl font-bold text-indigo-700">
            Welcome, Nome!
          </h1>
          <SideBarCard
            onClick={handleSidebarClick}
            selected={selectedFilter === "Home" ? true : false}
            name="Home"
            icon={FaHome}
          />
          <SideBarCard
            onClick={handleSidebarClick}
            selected={selectedFilter === "Completed" ? true : false}
            name="Completed"
            icon={MdTask}
          />

          <div className="mt-2 flex flex-col gap-1">
            <span className="font-semibold text-zinc-700">Filters</span>
            <Divider
              sx={{
                background: "#27272a  ",
                marginTop: "8px",
                marginBottom: "8px",
              }}
            />

            <SideBarCard
              name="Personal"
              checkable={true}
              checked={handleFilter}
            />
            <SideBarCard name="Work" checkable={true} checked={handleFilter} />
            <SideBarCard name="Diet" checkable={true} checked={handleFilter} />
            <SideBarCard name="Study" checkable={true} checked={handleFilter} />
          </div>
        </div>

        <div className="mt-4 flex w-full border-t-[1px] border-zinc-700">
          <button className="flex w-full items-center gap-2 px-5 py-4 text-zinc-400 transition duration-150 ease-in-out hover:bg-zinc-700 hover:text-zinc-200">
            <FaPlus />
            Create New List
          </button>
        </div>
      </div>

      <div className="flex h-full flex-1 flex-col bg-zinc-900 px-24 py-8">
        <h2 className="flex items-center justify-start gap-3 text-2xl font-semibold text-zinc-600">
          Todo List <BiPencil />
        </h2>
        <Divider sx={{ background: "#3f3f46  ", marginTop: "4px" }} />
        <div className="mt-6 flex w-full items-center justify-start gap-3">
          <button
            onClick={() => setDialogOpen(true)}
            className="flex w-24 items-center gap-3 rounded bg-indigo-600 px-4 py-2 text-base font-semibold text-zinc-200 shadow-sm shadow-zinc-950 transition duration-150 ease-in-out hover:bg-indigo-700"
          >
            <FaPlus />
            Add
          </button>
          <ResponsiveDatePickers onChange={handleDateChange} />
        </div>
        <div className="no-scrollbar mt-9 flex max-h-[70vh] w-full flex-col items-center gap-3 overflow-auto">
          {tasks.map((task) => (
            <CardList
              key={task.id}
              id={task.id}
              title={task.title}
              startTime={task.startTime}
              endTime={task.endTime}
              date={task.date}
              type={task.type}
              status={task.status}
            />
          ))}
        </div>
      </div>

      {dialogOpen && <DialogComponent onClose={() => setDialogOpen(false)} />}
    </section>
  );
}
