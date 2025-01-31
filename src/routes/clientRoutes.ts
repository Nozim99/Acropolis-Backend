import express from 'express';
import { createClients, deleteClient, getClients } from '../controllers/clientController';
import authMiddleware from '../middleware/authMiddleware';
import upload from '../utils/multerConfig';


const router = express.Router();

/**
 * Route to create a client.
 * Requires authentication middleware and accepts image in the request body.
 */
router.post('/create', authMiddleware, upload.array('images'), createClients);

/**
 * Route to get clients
 */
router.get('/', getClients);

/**
 * Delete a service by id
 */
router.delete('/:id', authMiddleware, deleteClient);

export default router;

