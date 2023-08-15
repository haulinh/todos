import { useEffect, useState } from "react";
import { Todo } from "../components/Todo";
import { Button, Spinner } from "reactstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTodo,
  remove,
  fetchTodos,
  selectTodosDone,
  selectTodosNotDone,
  removeTodo,
  setA,
} from "../store/Todos";
import { useNavigate } from "react-router-dom";

export const URL_API_TODOS =
  "https://64c7a27aa1fe0128fbd50f0a.mockapi.io/todos";

export const TodoListContainerWithRedux = () => {
  const [inputValue, setInputValue] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const todosDone = useSelector(selectTodosDone);
  const todosNotDone = useSelector(selectTodosNotDone);

  const handleAddTodo = async () => {
    const newTodo = {
      name: inputValue,
      id: crypto.randomUUID(),
    };
    dispatch(addNewTodo(newTodo));
    setInputValue("");
  };

  const handleDelete = async (idDeleted) => {
    dispatch(removeTodo(idDeleted));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <>
      <h3>Todo List</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          disabled={inputValue === ""}
          color="primary"
          onClick={handleAddTodo}
        >
          add
        </Button>
      </div>

      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginTop: 20,
            }}
          >
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                name={todo.name}
                id={todo.id}
                done={todo.completed}
                onDelete={handleDelete}
                setIdEdit={setIdEdit}
                idEdit={idEdit}
              />
            ))}
          </div>

          <div>
            <h3>List done</h3>
            <ul>
              {todosDone.map((todo) => (
                <li key={todo.id}>{todo.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>List todo</h3>
            <ul>
              {todosNotDone.map((todo) => (
                <li key={todo.id}>{todo.name}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};