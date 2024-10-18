import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TodoItem from "./TodoItem";
import { getTodos } from "../services/api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  // const handleAddTodo = async () => {
  //   const newTodo = {
  //     task: "",
  //     deadline: new Date().toISOString().split("T")[0],
  //     isCompleted: false,
  //   };

  //   try {
  //     const response = await createTodo(newTodo);
  //     setTodos([...todos, response.data]);
  //   } catch (error) {
  //     console.error("Failed to create todo:", error);
  //     // Handle error (e.g., show an error message to the user)
  //   }
  // };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <Container>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      ))}
    </Container>
  );
};

export default TodoList;
