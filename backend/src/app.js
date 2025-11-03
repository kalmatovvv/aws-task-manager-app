import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import tasksRouter from './routes/tasks.js';
import { errorHandler, notFoundHandler } from './middlewares/error.js';
import logger from './middlewares/logger.js';
import { sequelize } from './models/index.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (message) => logger.http(message.trim()) } }));

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/tasks', tasksRouter);

// 404 and Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    // Sync models in dev; in production prefer migrations
    const syncForce = process.env.DB_SYNC_FORCE === 'true';
    await sequelize.sync({ alter: !syncForce, force: syncForce });
    logger.info('Database connected and models synchronized');

    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server', { error: err.message });
    process.exit(1);
  }
}

start();

export default app;


