import { ITask } from "../interfaces/task";

export function orderTasks(tasks: ITask[]): ITask[] {
  return tasks.sort((a, b) => {
    // Converting the date and endTime strings to Date objects
    const dateA = new Date(`${a.data} ${a.endTime}`);
    const dateB = new Date(`${b.data} ${b.endTime}`);

    // Sorting in descending order (most recent first)
    return dateA.getTime() - dateB.getTime();
  });
}
