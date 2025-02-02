import express from 'express';
import {
  createProject,
  deleteProject,
  editProject,
  editSortProject,
  getProjectById,
  getProjects
} from '../controllers/projectController';
import upload from '../utils/multerConfig';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Route to get Projects
 */
router.get('/', getProjects);

/**
 * Route to get Project by id
 */
router.get('/:id', getProjectById);

/**
 * Route to create Project
 */
router.post('/create', authMiddleware, upload.single('image'), createProject);

/**
 * Route to delete Project
 */
router.delete('/:id', authMiddleware, deleteProject);

router.put('/sort', authMiddleware, editSortProject);

router.put('/edit/:id', authMiddleware, upload.single('image'), editProject);

export default router;