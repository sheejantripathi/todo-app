import { useState, useEffect } from "react";
import TodosTable from "./TodosTable";
import AddGroupButton from "./AddGroupButton";
import axios from "../axiosConfig"; // Assuming axiosConfig.js is correctly configured

const MyTodos = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos for the user
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`/todos`);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  // Delete todo
  const handleTodoDelete = async (todoId) => {
    try {
      await axios.delete(`/todos/${todoId}`);
      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Edit todo
  const handleTodoEdit = (todoId) => {
    console.log("Edit todo:", todoId); // You can add your navigation logic here
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Todos</h2>
      <AddGroupButton />
      <TodosTable
        todos={todos}
        onEdit={handleTodoEdit}
        onDelete={handleTodoDelete}
      />
    </div>
  );
};

export default MyTodos;
