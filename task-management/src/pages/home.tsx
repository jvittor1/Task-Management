import { FaHome, FaPlus } from "react-icons/fa";
import CardList from "../components/cardList";
import { GiBiceps } from "react-icons/gi";
import { MdTask, MdWork } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import ResponsiveDatePickers from "../components/datePicker";
import { Divider } from "@mui/material";
import { tasksData } from "../mockData/data";
import { useEffect, useState } from "react";
import { ITask } from "../interfaces/task";
import SideBarCard from "../components/sidebarCard";
import dayjs, { Dayjs } from "dayjs";
import { formattedDate } from "../helper/formattedDate";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filterDate, setFilterDate] = useState<string>(formattedDate(dayjs()));
  const [selectedFilter, setSelectedFilter] = useState<string>("Home");

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  function handleSidebarClick(data: string) {
    setSelectedFilter(data);
    const filter = data.toLowerCase();

    if (filter === "home") {
      setTasks(tasksData);
    } else if (filter === "completed") {
      const filteredTasks = tasksData.filter((task) => task.status === true);
      setTasks(filteredTasks);
    } else {
      const filteredTasks = tasksData.filter(
        (task) => task.type.toLowerCase() === filter,
      );
      setTasks(filteredTasks);
    }
  }

  function handleDateChange(date: Dayjs | null) {
    if (date) {
      const newDate = formattedDate(date);
      setFilterDate(newDate);

      if (selectedFilter === "Home") {
        const filteredTasks = tasksData.filter((task) => task.date === newDate);
        setTasks(filteredTasks);
      } else if (selectedFilter === "Completed") {
        const filteredTasks = tasksData.filter(
          (task) => task.status === true && task.date === newDate,
        );
        setTasks(filteredTasks);
      } else {
        const filteredTasks = tasksData.filter(
          (task) =>
            task.type.toLowerCase() === selectedFilter.toLowerCase() &&
            task.date === newDate,
        );
        setTasks(filteredTasks);
      }
    } else {
      setFilterDate(formattedDate(dayjs()));
      setTasks(tasksData);
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
          <SideBarCard
            onClick={handleSidebarClick}
            selected={selectedFilter === "Personal" ? true : false}
            name="Personal"
            icon={IoMdPerson}
          />
          <SideBarCard
            onClick={handleSidebarClick}
            selected={selectedFilter === "Work" ? true : false}
            name="Work"
            icon={MdWork}
          />
          <SideBarCard
            onClick={handleSidebarClick}
            selected={selectedFilter === "Diet" ? true : false}
            name="Diet"
            icon={GiBiceps}
            deletable={true}
          />
        </div>

        <div className="mt-4 flex w-full border-t-[1px] border-zinc-700">
          <button className="flex w-full items-center gap-2 px-5 py-4 text-zinc-400 transition duration-150 ease-in-out hover:bg-zinc-700 hover:text-zinc-200">
            <FaPlus />
            Create New List
          </button>
        </div>
      </div>

      <div className="flex h-full flex-1 flex-col bg-zinc-900 px-14 py-8">
        <h2 className="text-2xl font-semibold text-zinc-300">Todo List</h2>
        <Divider sx={{ background: "#52525b ", marginTop: "4px" }} />
        <div className="mt-6 flex w-full items-center justify-start gap-3">
          <button className="flex w-24 items-center gap-3 rounded bg-indigo-600 px-4 py-2 text-base font-semibold text-zinc-200 transition duration-150 ease-in-out hover:bg-indigo-700">
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
    </section>
  );
}
