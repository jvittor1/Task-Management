import { FetchTasks, ITask } from "../interfaces/task";
import { getTasksType } from "../service/taskService";

export async function formatTasks(tasks: FetchTasks[]): Promise<ITask[]> {
  const enumType = await getTasksType();

  if (!enumType) {
    throw new Error("Types not found");
  }

  return tasks.map((task) => {
    const type = enumType.find((type) => type.value === task.type);
    if (!type) {
      throw new Error(`Type not found for task with id ${task.id}`);
    }

    return {
      id: task.id,
      name: task.name,
      status: task.status,
      startTime: task.startTime,
      endTime: task.endTime,
      data: task.data,
      type: type.name,
    };
  });
}

export async function formatTask(task: FetchTasks): Promise<ITask> {
  const enumType = await getTasksType();

  if (!enumType) {
    throw new Error("Types not found");
  }

  const type = enumType.find((type) => type.value === task.type);
  if (!type) {
    throw new Error(`Type not found for task with id ${task.id}`);
  }

  return {
    id: task.id,
    name: task.name,
    status: task.status,
    startTime: task.startTime,
    endTime: task.endTime,
    data: task.data,
    type: type.name,
  };
}
