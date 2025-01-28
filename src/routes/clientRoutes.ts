// import express from 'express';
// import { createClient, getClients } from '../controllers/clientController';
// import authMiddleware from '../middleware/authMiddleware';
//
// const router = express.Router();
//
// /**
//  * Route to create a client.
//  * Requires authentication middleware and accepts image in the request body.
//  */
// router.post('/create', authMiddleware, createClient);
//
// /**
//  * Route to get clients
//  */
// router.get('/', getClients);
//
// export default router;



import express from 'express';
import { createClients, getClients } from '../controllers/clientController';
import authMiddleware from '../middleware/authMiddleware';
import upload from '../utils/multerConfig'


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

export default router;

