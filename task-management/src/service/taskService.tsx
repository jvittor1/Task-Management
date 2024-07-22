import { jwtDecode } from "jwt-decode";
import { TaskDto } from "../dtos/taskDto";
import { FetchTasks, ITask, ITaskType } from "../interfaces/task";

const urlTask = import.meta.env.VITE_TASK_ENDPOINTS_URL;

function verifyToken(): boolean {
  const token = localStorage.getItem("token");
  const userId = window.location.pathname.split("/")[2];

  if (!token) {
    return false;
  }

  if (userId !== jwtDecode(token).sub) {
    return false;
  }

  return true;
}

export async function getTasksType(): Promise<ITaskType[] | null> {
  const url = `${urlTask}/getTasksType`;

  if (!verifyToken()) {
    window.location.href = "/login";
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching tasks types");
    }

    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createTask(task: TaskDto): Promise<boolean> {
  const url = `${urlTask}/createTask`;
  const userId = window.location.pathname.split("/")[2];

  const data = { ...task, userId: userId };

  if (!verifyToken()) {
    window.location.href = "/login";
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error creating task");
    }
    console.log("Task created");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateTask(task: ITask): Promise<boolean> {
  const url = `${urlTask}/updateTask/${task.id}`;

  const data = { ...task };

  console.log(data);

  if (!verifyToken()) {
    window.location.href = "/login";
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error updating task");
    }
    console.log("Task updated");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteTask(taskId: string): Promise<boolean> {
  const url = `${urlTask}/deleteTask/${taskId}`;
  if (!verifyToken()) {
    window.location.href = "/login";
  }

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting task");
    }
    console.log("Task deleted");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getAllTasks(): Promise<FetchTasks[] | null> {
  const url = `${urlTask}/getAllTasks`;

  if (!verifyToken()) {
    window.location.href = "/login";
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      console.log("Deu ruim");

      throw new Error("Error fetching tasks");
    }

    const data = await response.json();

    return data.value;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTaskById(taskId: string): Promise<FetchTasks | null> {
  const url = `${urlTask}/getTaskById/${taskId}`;

  if (!verifyToken()) {
    window.location.href = "/login";
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching task");
    }

    const data = await response.json();
    console.log(data.value);

    return data.value;
  } catch (error) {
    console.error(error);
    return null;
  }
}
