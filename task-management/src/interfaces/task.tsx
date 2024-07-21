export interface ITask {
  id: string;
  name: string;
  status: boolean;
  startTime: string;
  endTime: string;
  data: string;
  type: string;
}

export interface ITaskType {
  value: number;
  name: string;
}

export interface FetchTasks {
  id: string;
  name: string;
  data: string;
  startTime: string;
  endTime: string;
  type: number;
  status: boolean;
  userId: string;
  user: any;
}
