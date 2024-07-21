import React, { createContext, useState, ReactNode, useEffect } from "react";
import { ITask } from "../interfaces/task";
import { getAllTasks } from "../service/taskService";
import { formatTasks } from "../helper/formattedTasks";
import { jwtDecode } from "jwt-decode";

export interface TaskStateContextProps {
  tasksData: ITask[];
  setTasksData: React.Dispatch<React.SetStateAction<ITask[]>>;
  fetchTasksData: () => Promise<void>;
  updateTasks: () => void;
}

export const TaskStateContext = createContext<
  TaskStateContextProps | undefined
>(undefined);

const checkAuthentication = (): boolean => {
  const token = localStorage.getItem("token");
  const userId = window.location.pathname.split("/")[2];

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    return userId === decodedToken.sub;
  } catch (e) {
    return false;
  }
};

export const TaskStateProvider = ({ children }: { children: ReactNode }) => {
  const [tasksData, setTasksData] = useState<ITask[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(checkAuthentication());
    };

    checkLogin();
  }, []);

  const fetchTasksData = async () => {
    try {
      const fetchTasks = await getAllTasks();
      if (fetchTasks && fetchTasks.length > 0) {
        const formattedTasks = await formatTasks(fetchTasks);
        setTasksData(formattedTasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTasks = () => {
    if (isLoggedIn) {
      fetchTasksData();
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasksData();
    }
  }, [isLoggedIn]);

  return (
    <TaskStateContext.Provider
      value={{ tasksData, setTasksData, fetchTasksData, updateTasks }}
    >
      {children}
    </TaskStateContext.Provider>
  );
};
