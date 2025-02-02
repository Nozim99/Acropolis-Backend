import express from 'express';
import {
  createService,
  deleteService,
  editService,
  editSortService,
  getServiceById,
  getServices
} from '../controllers/serviceController';
import authMiddleware from '../middleware/authMiddleware';


const router = express.Router();


// Route to create a service
router.post('/create', authMiddleware, createService);

// Route to get all services
router.get('/', getServices);

router.get('/:id', getServiceById);

// Delete a service by id
router.delete('/:id', authMiddleware, deleteService);

router.put('/sort', authMiddleware, editSortService);

router.put('/edit/:id', authMiddleware, editService);

export default router;
