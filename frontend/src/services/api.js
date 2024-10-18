import axios from "../axiosConfig";

export const getTodos = () => axios.get("/todos");
export const updateOrCreateTodo = (todo) => axios.post("/todos", todo);
export const updateTodo = (id, todo) => axios.put(`/todos/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`/todos/${id}`);

export default axios;
