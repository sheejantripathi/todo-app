import request from 'supertest';
import app from '../app';  // Assuming your Express app is exported from app.ts
import Todo from '../models/Todo';  // Sequelize model
import authMiddleware from '../middleware/auth'; // Mock auth middleware

jest.mock('../middleware/auth'); // Mock the authentication middleware
jest.mock('../models/Todo'); // Mock the Todo model

describe('Todos API', () => {
  // Mock authentication middleware
  beforeEach(() => {
    (authMiddleware as jest.Mock).mockImplementation((req, res, next) => {
      req.user = { id: 1 };  // Mock user ID
      next();
    });
  });

  // Test for GET /todos
  describe('GET /todos', () => {
    it('should fetch all todos for the authenticated user', async () => {
      const mockTodos = [
        { id: 1, task: 'Test Todo 1', userId: 1, deadline: '2023-10-10', isComplete: false },
        { id: 2, task: 'Test Todo 2', userId: 1, deadline: '2023-10-11', isComplete: true }
      ];

      (Todo.findAll as jest.Mock).mockResolvedValue(mockTodos);

      const response = await request(app).get('/todos');
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockTodos);
    });

    it('should return 500 if there is a server error', async () => {
      (Todo.findAll as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).get('/todos');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'An error occurred while fetching todos');
    });
  });

  // Test for GET /todos/:id
  describe('GET /todos/:id', () => {
    it('should return a single todo by ID', async () => {
      const mockTodo = { id: 1, task: 'Test Todo 1', userId: 1, deadline: '2023-10-10', isComplete: false };

      (Todo.findOne as jest.Mock).mockResolvedValue(mockTodo);

      const response = await request(app).get('/todos/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTodo);
    });

    it('should return 404 if the todo is not found', async () => {
      (Todo.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/todos/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Todo not found');
    });

    it('should return 500 on server error', async () => {
      (Todo.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).get('/todos/1');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'An error occurred while fetching the todo');
    });
  });

  // Test for POST /todos
  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const newTodo = {
        task: 'New Todo',
        deadline: '2023-11-01',
        isComplete: false,
      };

      const savedTodo = { ...newTodo, id: 3, userId: 1 };

      (Todo.create as jest.Mock).mockResolvedValue(savedTodo);

      const response = await request(app).post('/todos').send(newTodo);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(savedTodo);
    });

    it('should return 500 on server error', async () => {
      (Todo.create as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).post('/todos').send({
        task: 'New Todo',
        deadline: '2023-11-01',
        isComplete: false,
      });
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'An error occurred while creating the todo');
    });
  });

  // Test for PUT /todos/:id
  describe('PUT /todos/:id', () => {
    it('should update a todo', async () => {
      const existingTodo = {
        id: 7,
        task: 'Existing Todo',
        userId: 1,
        deadline: '2023-10-10',
        isComplete: false,
      };

      (Todo.findOne as jest.Mock).mockResolvedValue(existingTodo);
      (Todo.prototype.save as jest.Mock).mockResolvedValue(existingTodo);

      const updatedTodo = {
        task: 'Updated Todo',
        deadline: '2023-12-12',
        isComplete: true,
      };

      const response = await request(app).put('/todos/7').send(updatedTodo);
      expect(response.status).toBe(200);
      expect(response.body.task).toBe(updatedTodo.task);
      expect(response.body.deadline).toBe(updatedTodo.deadline);
      expect(response.body.isComplete).toBe(updatedTodo.isComplete);
    });

    it('should return 404 if todo not found', async () => {
      (Todo.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app).put('/todos/999').send({
        task: 'Updated Todo',
        deadline: '2023-12-12',
        isComplete: true,
      });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Todo not found');
    });

    it('should return 500 on server error', async () => {
      (Todo.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).put('/todos/1').send({
        task: 'Updated Todo',
        deadline: '2023-12-12',
        isComplete: true,
      });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'An error occurred while updating the todo');
    });
  });

  // Test for DELETE /todos/:id
  describe('DELETE /todos/:id', () => {
    it('should delete a todo', async () => {
      const mockTodo = { id: 7, task: 'Test Todo', userId: 1, deadline: '2023-10-10', isComplete: false };

      (Todo.findOne as jest.Mock).mockResolvedValue(mockTodo);
      (Todo.prototype.destroy as jest.Mock).mockResolvedValue(mockTodo);

      const response = await request(app).delete('/todos/7');
      expect(response.status).toBe(204);
    });

    it('should return 404 if todo not found', async () => {
      (Todo.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/todos/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Todo not found');
    });

    it('should return 500 on server error', async () => {
      (Todo.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).delete('/todos/1');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'An error occurred while deleting the todo');
    });
  });
});
