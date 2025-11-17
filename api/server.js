import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from '../config/config.js';
import { logger } from '../config/logger.js';
import { connectDatabase } from '../config/database.js';

// Import routes
import cropRoutes from './routes/crop-routes.js';
import fertilizerRoutes from './routes/fertilizer-routes.js';
import farmingRoutes from './routes/farming-routes.js';
import waterRoutes from './routes/water-routes.js';
import farmerRoutes from './routes/farmer-routes.js';
import treeRoutes from './routes/tree-routes.js';

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS
app.use(compression()); // Compression
app.use(express.json()); // JSON parser
app.use(express.urlencoded({ extended: true })); // URL-encoded parser

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv
  });
});

// API Routes
app.use('/api/crops', cropRoutes);
app.use('/api/fertilizer', fertilizerRoutes);
app.use('/api/farming', farmingRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/trees', treeRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'AI-Powered Farmer Learning Platform API',
    version: '1.0.0',
    documentation: `${config.api.baseUrl}/docs`,
    endpoints: {
      crops: `${config.api.baseUrl}/api/crops`,
      trees: `${config.api.baseUrl}/api/trees`,
      fertilizer: `${config.api.baseUrl}/api/fertilizer`,
      farming: `${config.api.baseUrl}/api/farming`,
      water: `${config.api.baseUrl}/api/water`,
      farmers: `${config.api.baseUrl}/api/farmers`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    path: req.path
  });

  res.status(err.status || 500).json({
    success: false,
    error: config.nodeEnv === 'development' ? err.message : 'Internal server error',
    ...(config.nodeEnv === 'development' && { stack: err.stack })
  });
});

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDatabase();

    // Start listening
    app.listen(config.api.port, config.api.host, () => {
      logger.info(`Server started successfully`, {
        host: config.api.host,
        port: config.api.port,
        environment: config.nodeEnv,
        url: `http://${config.api.host}:${config.api.port}`
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();

export default app;
