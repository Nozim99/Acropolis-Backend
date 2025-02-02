import express from 'express';
import {
  createSolution,
  deleteSolution,
  editSolution,
  editSortSolutions, getSolutionById,
  getSolutions
} from '../controllers/solutionController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Route to get solutions
router.get('/', getSolutions);

router.get('/:id', getSolutionById);

// Route to create solution
router.post('/create', authMiddleware, createSolution);

// Route to delete Solution
router.delete('/:id', authMiddleware, deleteSolution);

router.put('/sort', authMiddleware, editSortSolutions);

router.put('/edit/:id', authMiddleware, editSolution);

export default router;