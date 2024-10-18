import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const TodoRow = ({ todo, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{todo.task}</td>
      <td>{todo.deadline}</td>
      <td>
        <div
          className="d-flex justify-content-between"
          style={{ width: "100px" }}
        >
          <Button
            variant="warning"
            className="me-2"
            onClick={() => onEdit(todo.id)}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(todo.id)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

TodoRow.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoRow;
