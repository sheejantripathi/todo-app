import { Router, Request, Response } from 'express';
import Todo from '../models/Todo';
// import { isAuthenticated } from '../middleware/auth';

const router = Router();

// router.get('/', isAuthenticated, async (req: any, res: Response) => {
//   try {
//     const todos = await Todo.findAll({ where: { userId: req.user.id } });
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching todos' });
//   }
// });

// router.post('/', isAuthenticated, async (req: any, res: Response) => {
//   try {
//     const newTodo = await Todo.create({
//       userId: req.user.id,
//       title: req.body.title,
//       completed: false
//     });
//     res.status(201).json(newTodo);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the todo' });
//   }
// });

// Add other routes (PUT, DELETE, etc.)

export default router;
