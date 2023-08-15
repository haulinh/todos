import axios from "axios";
import { Button } from "reactstrap";
import { URL_API_TODOS } from "../container/TodoListContainerWithRedux";
import { useNavigate } from "react-router-dom";

export const TodoDetail = ({ todoDetail, onChange }) => {
  const navigate = useNavigate()

  const handleOnSave = async () => {
    await axios.put(`${URL_API_TODOS}/${todoDetail.id}`, todoDetail)
    navigate('/todos')
  }

  return (
    <>
      <div style={{ display: "flex", columnGap: 8 }}>
        <input
          onChange={(e) => onChange("completed", e.target.checked)}
          checked={todoDetail.completed}
          type="checkbox"
        />
        <input
          onChange={(e) => onChange("name", e.target.value)}
          value={todoDetail.name}
        />
      </div>
      <Button onClick={handleOnSave} style={{ marginTop: 20 }}>Save</Button>
    </>
  );
};
