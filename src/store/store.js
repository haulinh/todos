import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from './todos'
import GlobalReducer from '../store/global'

export default configureStore({
    reducer: {
        todos: TodoReducer,
        global: GlobalReducer
    }
})

// Tạo store redux