import { jwtDecode } from "jwt-decode";
import { TaskDto } from "../dtos/taskDto";
import { FetchTasks, ITask, ITaskType } from "../interfaces/task";

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
  const url = "https://localhost:7298/api/Task/getAllTypes";

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
  const url = "https://localhost:7298/api/Task/createTask";
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
  const url = "https://localhost:7298/api/Task/updateTask";

  const data = { ...task };

  console.log(data);

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
      throw new Error("Error updating task");
    }
    console.log("Task updated");

    return true;
  } catch (error) {
    console.log("deu ruim");

    console.error(error);
    return false;
  }
}

export async function deleteTask(taskId: string): Promise<boolean> {
  const url = `https://localhost:7298/api/Task/deleteTask/${taskId}`;
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
  const url = "https://localhost:7298/api/Task/getAllTasks";

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
    console.log(data.value);

    return data.value;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTaskById(taskId: string): Promise<FetchTasks | null> {
  const url = `https://localhost:7298/api/Task/getTaskById/${taskId}`;

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
