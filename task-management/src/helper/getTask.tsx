import { ITask } from "../interfaces/task";
import { tasksData } from "../mockData/data";

export function getTaskById(taskId: number): ITask | undefined {
  return tasksData.find((task) => task.id === taskId);
}
