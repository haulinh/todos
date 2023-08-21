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
import { Col, Row } from "reactstrap";
import { LoginContainer } from "./container/LoginContainer";
import { RegisterContainer } from "./container/RegisterConatiner";
import { RequireAuth } from "./components/RequireAuth";

// const App = () => {
//   const [count, setCount] = useState(0);
//   const [todos, setTodos] = useState([]);
//   const calculation = useMemo(() => expensiveCalculation(count), [count]);
//   console.log({ calculation });

//   const increment = () => {
//     setCount((c) => c + 1);
//   };

//   const addTodo = useCallback(() => {
//     setTodos((t) => [...t, "New Todo"]);
//   }, []);

//   return (
//     <>
//       <Row>
//         <Col className="bg-light border" xs="6" lg='12'>
//           .col-3
//         </Col>
//         <Col className="bg-light border" xs="auto">
//           .col-auto - variable width content
//         </Col>
//         <Col className="bg-light border" xs="3">
//           .col-3
//         </Col>
//       </Row>
//       <Todos todos={todos} addTodo={addTodo} />
//       <hr />
//       <div>
//         Count: {count}
//         <button onClick={increment}>+</button>
//       </div>

//       <div>
//         Count: {count}
//         <button onClick={increment}>+</button>
//         <h2>Expensive Calculation</h2>
//         {calculation}
//       </div>
//     </>
//   );
// };

// const Todos = memo(({ todos, addTodo }) => {
//   console.log("child render");
//   return (
//     <>
//       <h2>My Todos</h2>
//       {todos.map((todo, index) => {
//         return <p key={index}>{todo}</p>;
//       })}
//       <button onClick={addTodo}>Add Todo</button>
//     </>
//   );
// });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/todos" />,
  },
  {
    path: "/todos",
    element: (
      <RequireAuth>
        <TodoListContainerWithRedux />
      </RequireAuth>
    ),
  },
  {
    path: "/todos/:id",
    element: (
      <RequireAuth>
        <TodoContainer />
      </RequireAuth>
    ),
  },
  // {
  //   path: "/test",
  //   element: <App />,
  // },
  {
    path: "/login",
    element: <LoginContainer />,
  },
  {
    path: "/register",
    element: <RegisterContainer />,
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
