import axios from 'axios';
import { Task } from '../types/Task';;

const apiUrl = import.meta.env.VITE_API_URL;

// Tipo para crear una tarea (sin id)
type CreateTaskDTO = Omit<Task, 'id'>;

export const taskApi = {

  // Acá están los métodos con los que llamamos al backend.
  // Decidi usar Axios por temas de simplificación.


  //Obtener todas las tareas
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${apiUrl}/tasks`);
    return response.data;
  },

  //Obtener tarea por taskId
  getTask: async (id: number): Promise<Task> => {
    const response = await axios.get(`${apiUrl}/tasks/${id}`);
    return response.data;
  },

  // Crear task con el DTO
  createTask: async (task: CreateTaskDTO): Promise<Task> => {
    const response = await axios.post(`${apiUrl}/tasks`, task);
    return response.data;
  },

  //Actualizar el task con el ID y DTO
  updateTask: async (id: string, task: Partial<CreateTaskDTO>): Promise<Task> => {
    const response = await axios.put(`${apiUrl}/tasks/${id}`, task);
    return response.data;
  },

  //Eliminar task
  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/tasks/${id}`);
  },

  //El toggle para cambiar el campo completed
  toggleComplete: async (id: string): Promise<Task> => {
    const response = await axios.patch(`${apiUrl}/tasks/${id}/toggle`);
    return response.data;
  },

  //Filtrado por título
  findByTitle: async (title: string): Promise<Task[]> => {
    const response = await axios.get(`${apiUrl}/tasks/search?title=${title}`);
    return response.data;
  },
  //Filtrado por estado
  findByCompleted: async (completed: boolean): Promise<Task[]> => {
    const response = await axios.get(`${apiUrl}/tasks/search?completed=${completed}`);
    return response.data;
  },

  //Filtrado por ambos
  findByAll: async (title: string, completed: boolean): Promise<Task[]> => {
    const response = await axios.get(`${apiUrl}/tasks/search?title=${title}&completed=${completed}`);
    return response.data;
  },
};