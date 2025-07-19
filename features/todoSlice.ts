import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, createTodo, updateTodo, removeTodo } from "../services/API";
import { TodoItem } from "@/types/todo";

// Define loading state types
interface ActionLoadingState {
  adding: boolean;
  toggling: Record<string, boolean>;
  deleting: Record<string, boolean>;
}

// Define complete slice state
interface TodosState {
  items: TodoItem[];
  loading: boolean; // for initial fetch
  actionLoading: ActionLoadingState;
}

type AddTodoArgs = {
  title: string;
  reminderAt: Date;
};


const initialState: TodosState = {
  items: [],
  loading: false,
  actionLoading: {
    adding: false,
    toggling: {},
    deleting: {},
  },
};

// Async thunks
export const fetchTodos = createAsyncThunk<TodoItem[]>(
  "todos/fetchTodos",
  async () => await getTodos()
);

export const addTodo = createAsyncThunk<TodoItem, AddTodoArgs>(
  "todos/addTodo",
  async ({ title, reminderAt }) => await createTodo(title, reminderAt)
);


export const toggleTodo = createAsyncThunk<TodoItem, TodoItem>(
  "todos/toggleTodo",
  async (todo) => await updateTodo({ ...todo, completed: !todo.completed })
);

export const deleteTodo = createAsyncThunk<string, string>(
  "todos/deleteTodo",
  async (id) => {
    await removeTodo(id);
    return id;
  }
);

// Slice
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 📦 Fetch all
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<TodoItem[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      })

      // ➕ Add todo
      .addCase(addTodo.pending, (state) => {
        state.actionLoading.adding = true;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoItem>) => {
        state.items.unshift(action.payload);
        state.actionLoading.adding = false;
      })
      .addCase(addTodo.rejected, (state) => {
        state.actionLoading.adding = false;
      })

      // ✅ Toggle todo
      .addCase(toggleTodo.pending, (state, action) => {
        const id = action.meta.arg._id;
        state.actionLoading.toggling[id] = true;
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<TodoItem>) => {
        const updated = action.payload;
        const index = state.items.findIndex((t) => t._id === updated._id);
        if (index !== -1) state.items[index] = updated;
        state.actionLoading.toggling[updated._id] = false;
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        const id = action.meta.arg._id;
        state.actionLoading.toggling[id] = false;
      })

      // ❌ Delete todo
      .addCase(deleteTodo.pending, (state, action) => {
        const id = action.meta.arg;
        state.actionLoading.deleting[id] = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload;
        state.items = state.items.filter((t) => t._id !== id);
        delete state.actionLoading.deleting[id];
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        const id = action.meta.arg;
        delete state.actionLoading.deleting[id];
      });
  },
});

export default todoSlice.reducer;
