import { Router, Request, Response } from 'express';
import Group from '../models/Group';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, async(req: any, res: Response) => {
  try {
    // Fetch all groups
    const groups = await Group.findAll({ where: { userId: req.user.id } });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    
  }
});

router.get('/:id', authMiddleware, (req: any, res: Response) => {
    try {
        // Fetch a single group by ID
        const group = Group.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/', authMiddleware, async (req: any, res: Response) => {
    try {
        // Create a new group
        const newGroup = await Group.create({
            name: req.body.name,
            userId: req.user.id,
        });
        res.status(201).json({ message: 'Group created', group: newGroup });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });   
    }
});

router.put('/:id', authMiddleware, async (req: any, res: Response) => {
    try {
        // Update a group by ID
        const group = await Group.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        group.name = req.body.name;
        await group.save();
        res.status(200).json({ message: 'Group updated', group });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', authMiddleware, async (req: any, res: Response) => {
    try {
        // Delete a group by ID
        const group = await Group.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        await group.destroy();
        res.status(200).json({ message: 'Group deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;