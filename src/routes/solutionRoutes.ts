import express from 'express';
import { createSolution, deleteSolution, getSolutions } from '../controllers/solutionController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Route to get solutions
router.get('/', getSolutions);

// Route to create solution
router.post('/create', authMiddleware, createSolution);

// Route to delete Solution
router.delete('/:id', authMiddleware, deleteSolution);

export default router;