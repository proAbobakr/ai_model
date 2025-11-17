import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

export const config = {
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',

  // API Configuration
  api: {
    port: process.env.API_PORT || 3000,
    host: process.env.API_HOST || 'localhost',
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000'
  },

  // Database
  database: {
    type: process.env.DB_TYPE || 'mongodb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'farmer_learning_platform',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/farmer_learning_platform'
  },

  // AI Providers
  aiProvider: process.env.AI_PROVIDER || 'anthropic',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  anthropicModel: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',

  // N8N
  n8n: {
    host: process.env.N8N_HOST || 'localhost',
    port: process.env.N8N_PORT || 5678,
    protocol: process.env.N8N_PROTOCOL || 'http',
    webhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook',
    apiKey: process.env.N8N_API_KEY || ''
  },

  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-this',
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10')
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
  },

  // Cache
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '3600'),
    enabled: process.env.ENABLE_CACHE === 'true'
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/app.log'
  },

  // External APIs
  externalApis: {
    weatherApiKey: process.env.WEATHER_API_KEY || '',
    soilDataApiKey: process.env.SOIL_DATA_API_KEY || '',
    satelliteApiKey: process.env.SATELLITE_API_KEY || ''
  },

  // File Upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
    uploadDir: process.env.UPLOAD_DIR || './uploads'
  },

  // Feature Flags
  features: {
    cropRecommendation: process.env.ENABLE_CROP_RECOMMENDATION !== 'false',
    fertilizerAdvisor: process.env.ENABLE_FERTILIZER_ADVISOR !== 'false',
    waterManagement: process.env.ENABLE_WATER_MANAGEMENT !== 'false',
    farmingTechniques: process.env.ENABLE_FARMING_TECHNIQUES !== 'false'
  }
};

export default config;
