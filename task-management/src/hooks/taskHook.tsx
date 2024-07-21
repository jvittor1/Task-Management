import { useContext } from "react";
import { TaskStateContext } from "../contexts/TaskStateContext";

export function useTask() {
  const task = useContext(TaskStateContext);
  if (task === undefined) {
    throw new Error("useTask must be used within a TaskStateProvider");
  }
  return task;
}
