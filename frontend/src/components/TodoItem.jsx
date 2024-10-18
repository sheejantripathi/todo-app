import { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "../axiosConfig";

const TodoItem = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(todo.id === "new");
  const [editedTodo, setEditedTodo] = useState({
    ...todo,
    deadline: formatDate(todo.deadline) || "", // Ensure deadline is always a string
  });

  useEffect(() => {
    setEditedTodo({
      ...todo,
      deadline: formatDate(todo.deadline) || "", // Update editedTodo when todo prop changes
    });
  }, [todo]);

  const updateTodo = async (updatedTodo) => {
    try {
      console.log(updatedTodo);
      const response = await axios.put(`/todos/${updatedTodo.id}`, {
        ...updatedTodo,
        deadline: updatedTodo.deadline
          ? new Date(updatedTodo.deadline).toISOString()
          : null,
      });
      const savedTodo = response.data;
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === savedTodo.id ? savedTodo : t))
      );
      setIsEditing(false);
      setEditedTodo({
        ...savedTodo,
        deadline: formatDate(savedTodo.deadline) || "",
      });
    } catch (error) {
      console.error("Failed to update todo:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedTodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value || "", // Ensure value is never undefined
    }));
  };

  const handleCompleteChange = (e) => {
    const { checked } = e.target;
    setEditedTodo((prev) => ({
      ...prev,
      isComplete: checked,
    }));
  };

  function formatDate(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD' or '' if invalid
  }

  return (
    <Row className="mb-2 align-items-center border rounded">
      <Col xs={4} className="py-2 border-end d-flex align-items-center">
        {isEditing ? (
          <Form.Control
            type="text"
            name="task"
            value={editedTodo.task || ""}
            onChange={handleChange}
            placeholder="Enter todo title"
          />
        ) : (
          <span>{editedTodo.task}</span>
        )}
      </Col>
      <Col xs={3} className="py-2 border-end d-flex align-items-center">
        {isEditing ? (
          <Form.Control
            type="date"
            name="deadline"
            value={editedTodo.deadline || ""}
            onChange={handleChange}
          />
        ) : (
          <span>{editedTodo.deadline}</span>
        )}
      </Col>
      <Col xs={2} className="py-2 border-end d-flex align-items-center">
        <Form.Check
          type="switch"
          id={`complete-switch-${editedTodo.id}`}
          label="Completed"
          checked={editedTodo.isComplete || false}
          onChange={isEditing ? handleCompleteChange : handleChange}
          name="isComplete"
        />
      </Col>
      <Col
        xs={3}
        className="py-2 d-flex justify-content-end align-items-center"
      >
        {isEditing ? (
          <Button
            variant="success"
            onClick={() => updateTodo(editedTodo)}
            className="me-2"
          >
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
        <Button
          variant="danger"
          onClick={() => deleteTodo(editedTodo.id)}
          disabled={isEditing}
        >
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
    isComplete: PropTypes.bool,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default TodoItem;
