import React, { memo, useCallback, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { TodoListContainerWithRedux } from "./container/TodoListContainerWithRedux";
import { TodoContainer } from "./container/TodoContainer";

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000_000_000; i++) {
    num += 1;
  }
  return num;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count])
  console.log({calculation})

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, []);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>

      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </>
  );
};

const Todos = memo(({ todos, addTodo }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/todos" />,
  },
  {
    path: "/todos",
    element: <TodoListContainerWithRedux />,
  },
  {
    path: "/todos/:id",
    element: <TodoContainer />,
  },
  {
    path: "/test",
    element: <App />,
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
