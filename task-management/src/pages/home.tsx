import { FaHome, FaPlus } from "react-icons/fa";
import CardList from "../components/cardList";
import { GiBiceps } from "react-icons/gi";
import { MdTask, MdWork } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import ResponsiveDatePickers from "../components/datePicker";
import { Divider } from "@mui/material";

const generateCardLists = () => {
  const cardLists = [];
  for (let i = 0; i < 10; i++) {
    cardLists.push(
      <CardList
        key={i}
        name={`Task ${i + 1}`}
        startTime="09:00"
        endTime="12:00"
        checkable={true}
        deletable={true}
      />,
    );
  }
  return cardLists;
};

export default function Home() {
  return (
    <section className="flex h-screen w-full bg-zinc-950 text-zinc-200">
      <div className="flex h-full max-w-60 grow-[0.1] flex-col items-start bg-zinc-950">
        <div className="flex w-full flex-1 flex-col gap-3 px-5 py-8">
          <h1 className="mb-4 text-xl font-bold text-indigo-700">
            Welcome, Nome!
          </h1>
          <CardList name="Home" icon={FaHome} iconColor="#0284c7  " />
          <CardList name="Completed" icon={MdTask} iconColor="#fcd34d" />
          <CardList name="Personal" icon={IoMdPerson} iconColor="#f87171 " />
          <CardList name="Work" icon={MdWork} iconColor="#d97706" />
          <CardList name="Diet" icon={GiBiceps} deletable={true} />
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
          <ResponsiveDatePickers />
        </div>
        <div className="no-scrollbar mt-9 flex max-h-[70vh] w-full flex-col items-center gap-3 overflow-auto">
          {generateCardLists()}
        </div>
      </div>
    </section>
  );
}
