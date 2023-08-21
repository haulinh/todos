import { useState } from "react";
import { Todo } from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo, removeTodoNeedDone
} from "../store/todos";
import { useNavigate } from "react-router-dom";

export const URL_API_TODOS =
  "https://64c7a27aa1fe0128fbd50f0a.mockapi.io/todos";

export const TodoListNeedDone = () => {
  const [inputValue, setInputValue] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todosNeedDone = useSelector((state) => state.todos.todosNeedDone);

  const handleDelete = async (idDeleted) => {
    dispatch(removeTodoNeedDone(idDeleted));
  };

  return (
    <>
      <h3>Todo List Need Done</h3>

      {todosNeedDone.map((todo) => (
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
    </>
  );
};
