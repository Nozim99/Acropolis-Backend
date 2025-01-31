import express from 'express';
import { createProject, deleteProject, getProjects } from '../controllers/projectController';
import upload from '../utils/multerConfig';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Route to get Projects
 */
router.get('/', getProjects);

/**
 * Route to create Project
 */
router.post('/create', authMiddleware, upload.single('image'), createProject);

/**
 * Route to delete Project
 */
router.delete('/:id', authMiddleware, deleteProject);

export default router;