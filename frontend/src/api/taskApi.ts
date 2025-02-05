import axios from 'axios';
import { Task } from '../types/Task';;

const apiUrl = import.meta.env.VITE_API_URL;

// Tipo para crear una tarea (sin id)
type CreateTaskDTO = Omit<Task, 'id'>;

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${apiUrl}/tasks`);
    return response.data;
  },

  getTask: async (id: number): Promise<Task> => {
    const response = await axios.get(`${apiUrl}/tasks/${id}`);
    return response.data;
  },

  createTask: async (task: CreateTaskDTO): Promise<Task> => {
    const response = await axios.post(`${apiUrl}/tasks`, task);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<CreateTaskDTO>): Promise<Task> => {
    const response = await axios.put(`${apiUrl}/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/tasks/${id}`);
  },

  toggleComplete: async (id: string): Promise<Task> => {
    const response = await axios.patch(`${apiUrl}/tasks/${id}/toggle`);
    return response.data;
  },

  findByTitle: async (title: string): Promise<Task[]> => {
    const response = await axios.get(`${apiUrl}/tasks/search?title=${title}`);
    return response.data;
  },

  findByCompleted: async (completed: boolean): Promise<Task[]> => {
    const response = await axios.get(`${apiUrl}/tasks/search?completed=${completed}`);
    return response.data;
  },

  findByAll: async (title: string, completed: boolean): Promise<Task[]> => {
    const response = await axios.get(`${apiUrl}/tasks/search?title=${title}&completed=${completed}`);
    return response.data;
  },
};