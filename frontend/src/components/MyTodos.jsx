import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import TodoItem from "./TodoItem";

const MyTodos = ({ todos, setTodos }) => {
  const sortedTodos = [...todos].sort((a, b) => a.isComplete - b.isComplete);

  return (
    <Container>
      {sortedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </Container>
  );
};

MyTodos.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      isComplete: PropTypes.bool,
    })
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default MyTodos;
