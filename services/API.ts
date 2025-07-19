import axios from "axios";
import { TodoItem } from "@/types/todo";

type AddTodoArgs = {
  title: string;
  reminderAt: Date;
};

const API = `https://todo-server-13dg.onrender.com/api/todo`;

// Fetch all todos
export const getTodos = async (): Promise<TodoItem[]> => {
  const response = await axios.get<TodoItem[]>(API);
  return response.data;
};

// Create a new todo
export const createTodo = async (title: string, reminderAt: Date): Promise<TodoItem> => {
  const response = await axios.post<TodoItem>(API, { title, reminderAt });
  return response.data;
};

// Update a todo (including toggle or edit)
export const updateTodo = async (todo: TodoItem): Promise<TodoItem> => {
  const response = await axios.put<TodoItem>(`${API}/${todo._id}`, todo);
  return response.data;
};

// Toggle completed status (can be removed if using updateTodo directly)
export const toggleTodoStatus = async (
  id: string,
  completed: boolean
): Promise<TodoItem> => {
  const response = await axios.put<TodoItem>(`${API}/${id}`, { completed });
  return response.data;
};

// Delete a todo
export const removeTodo = async (id: string): Promise<string> => {
  await axios.delete(`${API}/${id}`);
  return id;
};
