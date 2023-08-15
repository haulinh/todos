import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from '../store/Todos'

export default configureStore({
    reducer: {
        todos: TodoReducer,
    }
})

// Tạo store redux