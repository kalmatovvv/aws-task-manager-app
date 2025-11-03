import { ValidationError, DatabaseError } from 'sequelize';
import logger from './logger.js';

export function notFoundHandler(req, res, _next) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(err, _req, res, _next) {
  logger.error('Unhandled error', { error: err.message });
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: 'Validation error', errors: err.errors.map(e => e.message) });
  }
  if (err instanceof DatabaseError) {
    return res.status(500).json({ message: 'Database error' });
  }
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
}


