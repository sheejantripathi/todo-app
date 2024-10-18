import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import useGoogleAuth from "./hooks/useGoogleAuth";
import LoginPage from "./components/LoginPage";
import CustomNavbar from "./components/Navbar";
import MyTodos from "./components/MyTodos";
import TodoItem from "./components/TodoItem";
import axios from "axios"; // Assuming you use axios for API calls

const App = () => {
  const { profile, login, logOut, error } = useGoogleAuth();
  const [todos, setTodos] = useState([]);
  const [newTodoTask, setNewTodoTask] = useState(""); // Task name
  const [newTodoDeadline, setNewTodoDeadline] = useState(""); // Deadline date
  const [newTodoCompleted, setNewTodoCompleted] = useState(false); // Is completed

  useEffect(() => {
    if (profile) {
      fetchTodos();
    }
  }, [profile]);

  const fetchTodos = async () => {
    // Fetch todos from your API
    const response = await axios.get("/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!newTodoTask.trim() || !newTodoDeadline) return; // Ensure task and deadline are provided

    // Make a POST request to add the new todo
    const response = await axios.post("/todos", {
      task: newTodoTask,
      deadline: newTodoDeadline,
      is_complete: newTodoCompleted,
      user_id: profile.id,
    });

    const addedTodo = response.data;

    // Update the state with the new todo
    setTodos([addedTodo, ...todos]);

    // Clear the inputs after adding
    setNewTodoTask("");
    setNewTodoDeadline("");
    setNewTodoCompleted(false);
  };

  const updateTodo = async (updatedTodo) => {
    await axios.put(`/api/todos/${updatedTodo.id}`, updatedTodo);

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <Router>
      <div>
        {profile ? (
          <>
            <CustomNavbar profile={profile} logOut={logOut} />
            <Container>
              <h1 className="mt-5 mb-5 text-center">
                <b>The Ultimate Todos of Champions</b>
              </h1>

              {/* Add Todo Form */}
              <Row className="mb-3">
                {/* Task Name Input */}
                <Col xs={3}>
                  <Form.Control
                    type="text"
                    placeholder="Enter task"
                    value={newTodoTask}
                    onChange={(e) => setNewTodoTask(e.target.value)}
                  />
                </Col>

                {/* Deadline Input */}
                <Col xs={3}>
                  <Form.Control
                    type="date"
                    value={newTodoDeadline}
                    onChange={(e) => setNewTodoDeadline(e.target.value)}
                  />
                </Col>

                {/* Is Completed Switch */}
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Check
                    type="switch"
                    id="completed-switch"
                    label="Completed"
                    checked={newTodoCompleted}
                    onChange={(e) => setNewTodoCompleted(e.target.checked)}
                  />
                </Col>

                {/* Add Button */}
                <Col xs={3}>
                  <Button onClick={addTodo} className="w-100">
                    Add Todo
                  </Button>
                </Col>
              </Row>

              <Routes>
                <Route path="/" element={<MyTodos userId={profile.id} />} />
              </Routes>
            </Container>
          </>
        ) : (
          <LoginPage login={login} error={error} />
        )}
      </div>
    </Router>
  );
};

export default App;
