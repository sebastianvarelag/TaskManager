export interface Task{
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export type CreateTaskDTO = Omit<Task, 'id'>;