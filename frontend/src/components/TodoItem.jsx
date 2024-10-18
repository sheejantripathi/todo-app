import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { updateOrCreateTodo, deleteTodo } from "../services/api";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(todo.id === "new");
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleSave = async () => {
    try {
      const updatedTodo = await updateOrCreateTodo(editedTodo.id, editedTodo);
      onUpdate(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update todo:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      onDelete(todo.id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedTodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // Extracts 'YYYY-MM-DD'
  };

  return (
    <Row className="mb-2 align-items-center border rounded">
      <Col xs={4} className="py-2 border-end d-flex align-items-center">
        {isEditing ? (
          <Form.Control
            type="text"
            name="task"
            value={editedTodo.task}
            onChange={handleChange}
            placeholder="Enter todo title"
          />
        ) : (
          <span>{todo.task}</span>
        )}
      </Col>
      <Col xs={3} className="py-2 border-end d-flex align-items-center">
        {isEditing ? (
          <Form.Control
            type="date"
            name="deadline"
            value={formatDate(editedTodo.deadline)}
            onChange={handleChange}
          />
        ) : (
          <span>{todo.deadline}</span>
        )}
      </Col>
      <Col xs={2} className="py-2 border-end d-flex align-items-center">
        <Form.Check
          type="switch"
          id={`complete-switch-${todo.id}`}
          label="Completed"
          checked={isEditing ? editedTodo.isComplete : todo.isComplete}
          onChange={(e) =>
            isEditing
              ? handleChange(e)
              : onUpdate({ ...todo, isCompleted: e.target.checked })
          }
          name="isCompleted"
        />
      </Col>
      <Col
        xs={3}
        className="py-2 d-flex justify-content-end align-items-center"
      >
        {isEditing ? (
          <Button variant="success" onClick={handleSave} className="me-2">
            Save
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => setIsEditing(true)}
            className="me-2"
          >
            Edit
          </Button>
        )}
        <Button variant="danger" onClick={handleDelete} disabled={isEditing}>
          Delete
        </Button>
      </Col>
    </Row>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
