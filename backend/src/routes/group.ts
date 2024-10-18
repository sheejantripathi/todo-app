import { Router, Request, Response } from 'express';
import Group from '../models/Group';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Group route works' });
});

router.get('/:id', (req: Request, res: Response) => {
    res.json({ message: `Group ${req.params.id} works` });
});

router.post('/', async (req: Request, res: Response) => {
    try {
        // Create a new group
        const newGroup = await Group.create({
            name: req.body.name,
        });
        res.status(201).json({ message: 'Group created', group: newGroup });
        
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Internal Server Error' });   
    }
});

export default router;