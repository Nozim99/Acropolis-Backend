import express from 'express';
import { createService, getServices } from '../controllers/serviceController';
// import authMiddleware from '../middlewares/authMiddleware';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware
router.use(authMiddleware);

// Route to create a service
router.post('/create', createService);

// Route to get all services
router.get('/', getServices);

export default router;
