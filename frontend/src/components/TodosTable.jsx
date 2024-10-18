import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";

const TodosTable = ({ todos, onEdit, onDelete }) => {
  if (!todos || todos.length === 0) {
    return <p>No todos found</p>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Task</th>
          <th>Deadline</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.task}</td>
            <td>{todo.deadline}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(todo.id)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(todo.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

TodosTable.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodosTable;
