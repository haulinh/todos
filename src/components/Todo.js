import axios from "axios";
import { Button } from "reactstrap";
import { URL_API_TODOS } from "../container/TodoListContainer";
import { Link } from "react-router-dom";

export const Todo = ({
  name,
  done,
  id,
  onDelete = () => {},
  onEdit = () => {},
  onSave,
  setIdEdit,
  idEdit,
}) => {
  const handleClick = () => {
    setIdEdit(id);
  };

  const handeSave = () => {
    onSave();
    setIdEdit("");
  };

  const handleCheckboxClick = async (e) => {
    onEdit(id, "completed", e.target.checked);
    await axios.put(`${URL_API_TODOS}/${id}`, {
      completed: e.target.checked,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        rowGap: 8,
        columnGap: 8,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", columnGap: 8 }}>
        <input type="checkbox" checked={done} onChange={handleCheckboxClick} />
        {id === idEdit ? (
          <input
            value={name}
            onChange={(e) => onEdit(id, "name", e.target.value)}
          />
        ) : (
          <span>{name}</span>
        )}
      </div>

      <div style={{ display: "flex", columnGap: 8 }}>
        {/* {id === idEdit ? (
          <Button color="success" onClick={handeSave}>
            save
          </Button>
        ) : (
          <Button color="warning" onClick={handleClick}>
            edit
          </Button>
        )} */}

        <Link to={`/todos/${id}`} state={{a: 3000}}>
          <Button color="warning">
            edit
          </Button>
        </Link>

        <Button color="danger" onClick={() => onDelete(id)}>
          delete
        </Button>
      </div>
    </div>
  );
};
