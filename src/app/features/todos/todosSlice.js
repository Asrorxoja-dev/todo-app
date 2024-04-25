import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

function dataFromLocal() {
  return JSON.parse(localStorage.getItem("todos")) || { todos: [] };
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: dataFromLocal(),
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter(todo => todo.id !== payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    toggleTodo: (state, { payload }) => {
      const todoIndex = state.todos.findIndex(todo => todo.id === payload);
      if (todoIndex !== -1) {
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
        localStorage.setItem("todos", JSON.stringify(state));
      }
    }
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
