import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { TodoListContainerWithRedux } from "./container/TodoListContainerWithRedux";
import { TodoContainer } from "./container/TodoContainer";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/todos'/>
  },
  {
    path: "/todos",
    element: <TodoListContainerWithRedux />,
  },
  {
    path: "/todos/:id",
    element: <TodoContainer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
