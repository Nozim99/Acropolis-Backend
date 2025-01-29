import express from 'express';
import { createService, deleteService, getServices } from '../controllers/serviceController';
// import authMiddleware from '../middlewares/authMiddleware';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();


// Route to create a service
router.post('/create', authMiddleware, createService);

// Route to get all services
router.get('/', getServices);

// Delete a service by id
router.delete('/:id', authMiddleware, deleteService);

export default router;
