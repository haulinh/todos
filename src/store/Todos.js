import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API_TODOS } from "../container/TodoListContainer";
import axios from "axios";

// loading, idle, succeeded, failed

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "idle",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        const indexDelete = state.todos.findIndex(
          (todo) => todo.id === action.payload
        );
        state.todos.splice(indexDelete, 1);
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        const todoUpdate = state.todos.find((todo) => todo.id === action.payload.id);
        todoUpdate.image = action.payload.imgUrl
      });
  },
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(URL_API_TODOS);
  return response.data;
});

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (newTodo) => {
    const response = await axios.post(URL_API_TODOS, newTodo);
    return response.data;
  }
);

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (idDeleted) => {
    await axios.delete(`${URL_API_TODOS}/${idDeleted}`);
    return idDeleted;
  }
);

export const uploadImage = createAsyncThunk(
  "todos/uploadImage",
  async (params) => {
    await axios.put(`${URL_API_TODOS}/${params.id}`, {
      image: params.imgUrl,
    });
    return {
      id: params.id,
      imgUrl: params.imgUrl,
    };
  }
);

export const selectTodos = (state) => state.todos.todos;
export const selectTodosDone = (state) =>
  state.todos.todos.filter((todo) => todo.completed);
export const selectTodosNotDone = (state) =>
  state.todos.todos.filter((todo) => !todo.completed);

export default todosSlice.reducer;

export const { setA } = todosSlice.actions;
