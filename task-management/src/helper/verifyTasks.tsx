import { TaskDto } from "../dtos/taskDto";
import { ITask } from "../interfaces/task";

export function verifyTasks(
  taskToUpdate: ITask,
  originalTask: TaskDto,
): boolean {
  return (
    taskToUpdate.name === originalTask.name &&
    taskToUpdate.startTime === originalTask.startTime &&
    taskToUpdate.endTime === originalTask.endTime &&
    taskToUpdate.data === originalTask.data &&
    taskToUpdate.type === originalTask.type
  );
}
