import { Router, Request, Response } from 'express';
import Todo from '../models/Todo';
import authMiddleware from '../middleware/auth'

const router = Router();

//get all the todos
router.get('/', authMiddleware, async (req: any, res: Response) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.status(201).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching todos' });
  }
});

// get a single todo
router.get('/:id', authMiddleware, async (req: any, res: Response) => {
    try {
        const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });
    
        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
    
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the todo' });
    }
});

// post a new todo
router.post('/', authMiddleware, async (req: any, res: Response) => {
  try {
    const newTodo = await Todo.create({
      userId: req.user.id,
      task: req.body.task,
      deadline: req.body.deadline,
      isComplete: req.body.is_complete,
    });
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the todo' });
  }
});


// update a todo
router.put('/:id', authMiddleware, async (req: any, res: Response) => {
    try {
        const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });
    
        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
    
        todo.task = req.body.task;
        todo.deadline = req.body.deadline;
        todo.isComplete = req.body.is_complete;
        todo.groupId = req.body.group_id;
    
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the todo' });
    }
});

// delete a todo
router.delete('/:id', authMiddleware, async (req: any, res: Response) => {
    try {
        const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });
    
        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
    
        await todo.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the todo' });
    }
});

export default router;
