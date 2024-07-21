import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import CardList from "../components/cardList";
import ResponsiveDatePickers from "../components/datePicker";
import { Divider } from "@mui/material";
import { ITask } from "../interfaces/task";
import { Dayjs } from "dayjs";
import { formatFilterDate, formattedDate } from "../helper/formattedDate";
import DialogComponent from "../components/dialog";
import ResponsiveSidebar from "../components/responsiveSidebar";
import Sidebar from "../components/sidebar";
import { useTask } from "../hooks/taskHook";

export default function Home() {
  const [filterTasks, setFilterTasks] = useState<ITask[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("Home");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);
  const { tasksData } = useTask();

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
      const newFilterDate = formatFilterDate(filterDate);
      tasksData.forEach((task) => console.log(task.data));
      filteredTasks = filteredTasks.filter(
        (task) => task.data === newFilterDate,
      );
    }

    setFilterTasks(filteredTasks);
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
      <div className="hidden h-full max-w-60 grow-[0.1] flex-col items-start bg-zinc-950 lg:flex">
        <Sidebar
          selectedFilter={selectedFilter}
          handleFilter={handleFilter}
          handleSidebarClick={handleSidebarClick}
          filters={filters}
        />
      </div>

      <div className="flex h-full flex-1 flex-col bg-zinc-900 px-12 py-8 lg:px-24">
        <h2 className="flex items-center justify-start gap-3 text-2xl font-semibold text-zinc-600">
          Todo List <BiPencil />
        </h2>
        <Divider sx={{ background: "#3f3f46  ", marginTop: "4px" }} />
        <div className="mt-6 flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDialogOpen(true)}
              className="flex w-24 items-center gap-3 rounded bg-indigo-600 px-4 py-2 text-base font-semibold text-zinc-200 shadow-sm shadow-zinc-950 transition duration-150 ease-in-out hover:bg-indigo-700"
            >
              <FaPlus />
              Add
            </button>
            <ResponsiveDatePickers onChange={handleDateChange} />
          </div>
          <div className="block lg:hidden">
            <ResponsiveSidebar
              selectedFilter={selectedFilter}
              handleFilter={handleFilter}
              handleSidebarClick={handleSidebarClick}
              filters={filters}
            />
          </div>
        </div>
        <div className="no-scrollbar mt-9 flex max-h-[70vh] w-full flex-col items-center gap-3 overflow-auto">
          {filterTasks.length === 0 && (
            <p className="mt-16 text-lg font-semibold text-zinc-600">
              No tasks found
            </p>
          )}

          {filterTasks.map((task) => (
            <CardList
              key={task.id}
              id={task.id}
              name={task.name}
              startTime={task.startTime}
              endTime={task.endTime}
              data={task.data}
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
