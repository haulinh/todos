import { useLocation, useParams, } from "react-router-dom";
import { TodoDetail } from "../components/TodoDetail";
import { useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { URL_API_TODOS } from "./TodoListContainer";

export const TodoContainer = () => {
  const [todoDetail, setTodoDetail] = useState({});
  const params = useParams();
  const location = useLocation()

  const handleOnChange = (name, value) => {
    setTodoDetail({...todoDetail, [name]: value})
  }

  useEffect(() => {
    const fetchTodoDetail = async () => {
        const response = await axios.get(`${URL_API_TODOS}/${params.id}   `)
        setTodoDetail(response.data)
    }

    fetchTodoDetail()
  }, [])

  console.log(location.state)

  return (
    <>
      <h3>Todo detail</h3>
      <TodoDetail onChange={handleOnChange} todoDetail={todoDetail} id={params} />
    </>
  );
};
