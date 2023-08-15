import { useEffect, useState } from "react";
import { Todo } from "../components/Todo";
import { Button } from "reactstrap";
import axios from "axios";

export const URL_API_TODOS = "https://64c7a27aa1fe0128fbd50f0a.mockapi.io/todos";

export const TodoListContainer = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const handleAddTodo = async () => {
    const newTodo = {
      name: inputValue,
    };

    const response = await axios.post(URL_API_TODOS, newTodo)

    const newTodos = [...todos, response.data];
    setTodos(newTodos);
    setInputValue('')
  };

  const handleDelete = async (idDeleted) => {
    await axios.delete(`${URL_API_TODOS}/${idDeleted}`)
    const newTodos = todos.filter((todo) => todo.id !== idDeleted);
    setTodos(newTodos);
  };

  const handleEdit = async (idTodo, name, value) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === idTodo) {
        return { ...todo, [name]: value };
      } else {
        return todo;
      }
    });
    
    setTodos(newTodos);
  };

  const handleSave = async () => {
    const todoEdit = todos.find((todo) => todo.id === idEdit);
    axios.put(`${URL_API_TODOS}/${todoEdit.id}`, todoEdit)
  };

  const listDone = todos.filter((todo) => todo.completed);
  const listNotDone = todos.filter((todo) => !todo.completed);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(URL_API_TODOS)
      setTodos(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h3>Todo List</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button disabled={inputValue === ''} color="primary" onClick={handleAddTodo}>add</Button>
      </div>
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
            onEdit={handleEdit}
            onSave={handleSave}
            setIdEdit={setIdEdit}
            idEdit={idEdit}
          />
        ))}
      </div>

      <div>
        <h3>List done</h3>
        <ul>
          {listDone.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>List todo</h3>
        <ul>
          {listNotDone.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
