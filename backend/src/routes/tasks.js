import { Router } from 'express';
import { listTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = Router();

router.get('/', listTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;


