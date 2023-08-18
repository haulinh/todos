import axios from "axios";
import { Button } from "reactstrap";
import { URL_API_TODOS } from "../container/TodoListContainer";
import { Link } from "react-router-dom";
import { Upload } from "./Upload";
import { useDispatch } from "react-redux";
import { uploadImage } from "../store/todos";

export const Todo = ({
  name,
  done,
  id,
  image,
  onDelete = () => {},
  onEdit = () => {},
  onSave,
  setIdEdit,
  idEdit,
}) => {
  const dispatch = useDispatch();

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

  const handleUploadImage = (imgUrl) => {
    dispatch(uploadImage({ id, imgUrl }));
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
        {image && (
          <img style={{ width: 50, height: 50 }} src={image} alt={name} />
        )}
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

        <Link to={`/todos/${id}`} state={{ a: 3000 }}>
          <Button color="warning">edit</Button>
        </Link>

        <Upload onUploadComplete={handleUploadImage} />

        <Button color="danger" onClick={() => onDelete(id)}>
          delete
        </Button>
      </div>
    </div>
  );
};
