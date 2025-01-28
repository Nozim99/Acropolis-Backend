import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

/**
 * Route for user login.
 * Accepts username and password in the request body.
 */
router.post('/login', login);

export default router;
