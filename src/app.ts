import express, { Application } from 'express';
import path from 'path';
import errorHandler from './utils/errorHandler';
import connectDB from './config/db';
import cors from 'cors';
import clientRoutes from './routes/clientRoutes';
import serviceRoutes from './routes/serviceRoutes';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import solutionRoutes from './routes/solutionRoutes';


// Initialize Express app
const app: Application = express();

app.use(cors());
// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: '10mb' })); // JSON limit for larger requests
app.use(express.urlencoded({ extended: true }));

// Static file serving (for uploaded files, if needed)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Connect to the database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/solutions', solutionRoutes);

// Global error handler
app.use(errorHandler);

export default app;
