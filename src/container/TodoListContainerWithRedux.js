import { useEffect, useState } from "react";
import { Todo } from "../components/Todo";
import { Badge, Button, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTodo,
  fetchTodos,
  selectTodosDone,
  selectTodosNotDone,
  removeTodo,
  selectTodosFilter,
  selectTodos,
} from "../store/todos";
import { parsePath, useNavigate } from "react-router-dom";
import { setUser } from "../store/global";

export const URL_API_TODOS =
  "https://64c7a27aa1fe0128fbd50f0a.mockapi.io/todos";

export const TodoListContainerWithRedux = () => {
  const [inputValue, setInputValue] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const todos = useSelector(selectTodosFilter(searchText));
  const todos = useSelector(selectTodos)
  const todosFilter = todos.filter(todo => todo.name.toLowerCase().includes(searchText.toLowerCase()))

  console.log({todosFilter, searchText})
  const status = useSelector((state) => state.todos.status);
  const todosNeedDone = useSelector(state => state.todos.todosNeedDone)
  const todosDone = useSelector(selectTodosDone);
  const todosNotDone = useSelector(selectTodosNotDone);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

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

  const handleLogout = () => {
    localStorage.clear("user");
    dispatch(setUser({ username: "", password: "" }));
    navigate("/login");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Todo List Demo Git</h3>
        <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search"/>
        <Button onClick={() => navigate('/todos-need-done')} color="warning">
          Todo List Need Done 
          <Badge>{todosNeedDone.length}</Badge>
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

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
            {todosFilter.map((todo) => (
              <Todo
                key={todo.id}
                name={todo.name}
                id={todo.id}
                image={todo.image}
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
