# Developer Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Development Setup](#development-setup)
5. [Creating New Agents](#creating-new-agents)
6. [Adding New API Endpoints](#adding-new-api-endpoints)
7. [Working with AI Providers](#working-with-ai-providers)
8. [Testing](#testing)
9. [Contributing](#contributing)
10. [Code Style](#code-style)

---

## Architecture Overview

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Client Layer                           │
│  (Web App, Mobile App, API Clients)                          │
└────────────────────────┬─────────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                      API Layer (Express.js)                   │
│  ┌──────────┬──────────┬──────────┬─────────┬─────────────┐ │
│  │  Crops   │  Trees   │Fertilizer│ Farming │    Water    │ │
│  │  Routes  │  Routes  │  Routes  │ Routes  │   Routes    │ │
│  └──────────┴──────────┴──────────┴─────────┴─────────────┘ │
└────────────────────────┬─────────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                   Business Logic Layer                        │
│  ┌──────────┬──────────┬──────────┬─────────┬─────────────┐ │
│  │   Crop   │   Tree   │Fertilizer│ Farming │    Water    │ │
│  │  Agent   │  Agent   │  Agent   │  Agent  │   Agent     │ │
│  └──────────┴──────────┴──────────┴─────────┴─────────────┘ │
└────────────────────────┬─────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
┌─────────▼─────┐ ┌─────▼─────┐ ┌─────▼────────┐
│  AI Provider   │ │ Knowledge │ │   Database   │
│   (Unified     │ │   Base    │ │  (MongoDB)   │
│    Client)     │ │           │ │              │
└────────────────┘ └───────────┘ └──────────────┘
```

### Request Flow

1. **Client sends request** → API endpoint
2. **API route** validates request → calls agent
3. **Agent** processes request:
   - Builds context from input + knowledge base
   - Calls AI provider via unified client
   - Enriches response with additional data
4. **Response** returned to client

### N8N Orchestration

```
┌─────────────────────────────────────────┐
│          N8N Workflow Engine            │
│  ┌────────────────────────────────────┐ │
│  │    Main Orchestrator Workflow      │ │
│  │  (Routes queries to agents)        │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  Crop Analysis Pipeline            │ │
│  │  (Multi-step crop analysis)        │ │
│  └────────────────────────────────────┘ │
└────────┬────────────────────────────────┘
         │
         ▼
    API Endpoints
```

---

## Project Structure

```
ai_model/
├── agents/                          # AI Agent implementations
│   ├── crop_advisor/
│   │   └── crop_agent.js            # Annual crops agent
│   ├── tree_advisor/
│   │   └── tree_agent.js            # Tree crops agent
│   ├── fertilizer_advisor/
│   │   └── fertilizer_agent.js      # Fertilizer agent
│   ├── farming_techniques/
│   │   └── farming_agent.js         # Farming techniques agent
│   └── water_management/
│       └── water_agent.js           # Water management agent
│
├── api/                             # REST API
│   ├── routes/                      # Route definitions
│   │   ├── crop-routes.js
│   │   ├── tree-routes.js
│   │   ├── fertilizer-routes.js
│   │   ├── farming-routes.js
│   │   ├── water-routes.js
│   │   └── farmer-routes.js
│   ├── controllers/                 # (Future: Business logic)
│   ├── middleware/                  # (Future: Auth, validation)
│   └── server.js                    # Express app setup
│
├── config/                          # Configuration
│   ├── config.js                    # Environment config
│   ├── logger.js                    # Winston logger setup
│   ├── database.js                  # MongoDB connection
│   ├── ai-client.js                 # Unified AI client
│   └── .env.example                 # Environment template
│
├── data/                            # Data and knowledge bases
│   ├── knowledge_base/
│   │   ├── crops.js                 # Annual crops data
│   │   └── tree_crops.js            # Tree crops data
│   └── sample_data/                 # (Future: Sample datasets)
│
├── database/                        # Database related
│   ├── schemas/
│   │   └── schemas.js               # Mongoose schemas
│   └── migrations/                  # (Future: Migration scripts)
│
├── n8n/                            # N8N workflows
│   ├── workflows/
│   │   ├── main_orchestrator.json
│   │   └── crop_analysis_pipeline.json
│   └── README.md
│
├── docs/                           # Documentation
│   ├── SETUP_GUIDE.md
│   ├── COMPLETE_API_REFERENCE.md
│   ├── USER_GUIDE.md
│   ├── DEVELOPER_GUIDE.md
│   ├── TREE_CROPS_GUIDE.md
│   ├── DEPLOYMENT.md
│   └── API_DOCUMENTATION.md
│
├── tests/                          # Test files
│   ├── unit/                       # Unit tests
│   ├── integration/                # Integration tests
│   └── e2e/                        # End-to-end tests
│
├── logs/                           # Application logs
├── uploads/                        # File uploads
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

## Technology Stack

### Backend
- **Node.js** 18+ - JavaScript runtime
- **Express.js** 4.x - Web framework
- **MongoDB** 7.0 - NoSQL database
- **Mongoose** 8.x - MongoDB ODM

### AI Integration
- **@anthropic-ai/sdk** - Claude AI
- **openai** - GPT models
- **@google/generative-ai** - Gemini
- Custom implementations for Kimi2, Grok

### Automation
- **N8N** 1.19+ - Workflow automation

### Utilities
- **Winston** - Logging
- **Joi** - Validation
- **Axios** - HTTP client
- **uuid** - ID generation

### Development
- **Nodemon** - Auto-reload
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## Development Setup

### 1. Prerequisites

```bash
# Check Node.js version
node --version  # Should be v18 or higher

# Check npm version
npm --version   # Should be v9 or higher

# Check MongoDB
mongosh --version
```

### 2. Clone and Install

```bash
# Clone repository
git clone <repository-url>
cd ai_model

# Install dependencies
npm install

# Setup environment
cp config/.env.example config/.env
```

### 3. Configure Environment

Edit `config/.env`:

```env
NODE_ENV=development
API_PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/farmer_learning_platform

# AI Provider (choose one)
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=your-key-here

# Logging
LOG_LEVEL=debug
```

### 4. Start Development Server

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start API
npm run dev

# Terminal 3: Start N8N (optional)
npx n8n
```

### 5. Verify Setup

```bash
# Test API
curl http://localhost:3000/health

# Should return:
# {"status":"healthy", ...}
```

---

## Creating New Agents

### Agent Template

```javascript
// agents/my_agent/my_agent.js

import { aiClient } from '../../config/ai-client.js';
import { logger } from '../../config/logger.js';

/**
 * My Custom Agent
 * Description of what this agent does
 * Supports multiple AI providers
 */
class MyCustomAgent {
  constructor() {
    this.aiClient = aiClient;
  }

  /**
   * Main method - processes request
   */
  async processRequest(params) {
    try {
      const { requiredParam, optionalParam = 'default' } = params;

      // Validate inputs
      if (!requiredParam) {
        throw new Error('Missing required parameter');
      }

      logger.info('Processing request', { requiredParam });

      // Build context for AI
      const context = this.buildContext(params);

      // Get AI response
      const aiResponse = await this.getAIResponse(context);

      // Process and enrich response
      const result = this.processResponse(aiResponse);

      return {
        success: true,
        result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error in MyCustomAgent', { error: error.message });
      throw error;
    }
  }

  /**
   * Build context/prompt for AI
   */
  buildContext(params) {
    return `You are an expert in [domain].

CONTEXT:
${JSON.stringify(params, null, 2)}

TASK:
[Detailed instructions for the AI]

FORMAT:
Provide response as JSON with structure:
{
  "field1": "...",
  "field2": [...]
}`;
  }

  /**
   * Get response from AI
   */
  async getAIResponse(context) {
    try {
      const systemPrompt = 'You are an expert [domain] advisor.';

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        context,
        {
          temperature: 0.7,
          maxTokens: 4000
        }
      );

      logger.info(`Got response from ${response.provider}`);

      return response.parsed || { raw: response.content };
    } catch (error) {
      logger.error('Error getting AI response', { error: error.message });
      throw error;
    }
  }

  /**
   * Process and enrich AI response
   */
  processResponse(aiResponse) {
    // Add any post-processing logic
    return aiResponse;
  }
}

export default MyCustomAgent;
```

### Adding Agent Routes

```javascript
// api/routes/my-routes.js

import express from 'express';
import MyCustomAgent from '../../agents/my_agent/my_agent.js';
import { logger } from '../../config/logger.js';

const router = express.Router();
const myAgent = new MyCustomAgent();

router.post('/process', async (req, res) => {
  try {
    const { requiredParam, optionalParam } = req.body;

    // Validation
    if (!requiredParam) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter'
      });
    }

    logger.info('Request received', { requiredParam });

    const result = await myAgent.processRequest({
      requiredParam,
      optionalParam
    });

    res.json(result);
  } catch (error) {
    logger.error('Error in route:', error);
    res.status(500).json({
      success: false,
      error: 'Processing failed',
      message: error.message
    });
  }
});

export default router;
```

### Register Routes in Server

```javascript
// api/server.js

import myRoutes from './routes/my-routes.js';

// ... other code

app.use('/api/my-endpoint', myRoutes);
```

---

## Adding New API Endpoints

### 1. Define Route

```javascript
// api/routes/example-routes.js

import express from 'express';
const router = express.Router();

// GET endpoint
router.get('/items', async (req, res) => {
  try {
    // Implementation
    res.json({ success: true, items: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST endpoint
router.post('/items', async (req, res) => {
  try {
    const { name, value } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }

    // Implementation
    res.status(201).json({ success: true, item: { name, value } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
```

### 2. Add Input Validation

```javascript
import Joi from 'joi';

const itemSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().optional(),
  category: Joi.string().valid('type1', 'type2')
});

router.post('/items', async (req, res) => {
  try {
    // Validate input
    const { error, value } = itemSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    // Use validated value
    // ...
  } catch (error) {
    // Error handling
  }
});
```

### 3. Add Documentation

Document your endpoint in `docs/COMPLETE_API_REFERENCE.md`:

```markdown
### Get Items

**Endpoint**: `GET /api/example/items`

**Query Parameters**:
- `category` (optional): Filter by category
- `limit` (optional): Max items to return

**Success Response (200)**:
\`\`\`json
{
  "success": true,
  "items": [...]
}
\`\`\`
```

---

## Working with AI Providers

### Using the Unified AI Client

The platform uses a unified client that works with all AI providers:

```javascript
import { aiClient } from './config/ai-client.js';

// Generate completion
const response = await aiClient.generateCompletion(
  systemPrompt,
  userPrompt,
  {
    temperature: 0.7,
    maxTokens: 4000,
    provider: 'anthropic'  // Optional: override default
  }
);

// Response structure
const {
  content,    // Raw text response
  parsed,     // Parsed JSON (if available)
  provider,   // Which provider was used
  model       // Which model was used
} = response;
```

### Provider-Specific Features

#### Anthropic Claude
```javascript
// Anthropic automatically handles JSON extraction
const response = await aiClient.generateWithProvider(
  'anthropic',
  systemPrompt,
  userPrompt
);
```

#### OpenAI
```javascript
// OpenAI can enforce JSON response
// (handled automatically by unified client)
```

#### Google Gemini
```javascript
// Gemini supports vision
// (extend ai-client.js for vision features)
```

### Adding a New AI Provider

1. **Install SDK**:
```bash
npm install new-ai-provider-sdk
```

2. **Update config.js**:
```javascript
// config/config.js
newProviderApiKey: process.env.NEW_PROVIDER_API_KEY || '',
newProviderModel: process.env.NEW_PROVIDER_MODEL || 'default-model',
```

3. **Update ai-client.js**:
```javascript
// config/ai-client.js

import NewProviderSDK from 'new-ai-provider-sdk';

class AIClient {
  initializeClients() {
    // ... existing code

    if (config.newProviderApiKey) {
      this.newProvider = new NewProviderSDK({
        apiKey: config.newProviderApiKey
      });
    }
  }

  async generateCompletion(systemPrompt, userPrompt, options = {}) {
    // ... existing code

    switch (provider) {
      // ... existing cases

      case 'newprovider':
        return await this.generateNewProvider(systemPrompt, userPrompt, temperature, maxTokens);
    }
  }

  async generateNewProvider(systemPrompt, userPrompt, temperature, maxTokens) {
    if (!this.newProvider) {
      throw new Error('New Provider client not initialized');
    }

    const response = await this.newProvider.chat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature,
      max_tokens: maxTokens
    });

    const content = response.choices[0].message.content;

    return {
      content,
      parsed: this.parseJSON(content),
      provider: 'newprovider',
      model: config.newProviderModel
    };
  }
}
```

---

## Testing

### Unit Tests

```javascript
// tests/unit/crop-agent.test.js

import CropAdvisorAgent from '../../agents/crop_advisor/crop_agent.js';

describe('CropAdvisorAgent', () => {
  let agent;

  beforeEach(() => {
    agent = new CropAdvisorAgent();
  });

  test('analyzeLocation should determine climate zone correctly', () => {
    const location = { latitude: 10, longitude: 77 };
    const result = agent.analyzeLocation(location);

    expect(result.climateZone).toBe('tropical');
  });

  test('recommendCrops should require location', async () => {
    await expect(agent.recommendCrops({})).rejects.toThrow();
  });
});
```

### Integration Tests

```javascript
// tests/integration/api.test.js

import request from 'supertest';
import app from '../../api/server.js';

describe('Crops API', () => {
  test('POST /api/crops/recommend returns recommendations', async () => {
    const response = await request(app)
      .post('/api/crops/recommend')
      .send({
        location: { latitude: 28.6, longitude: 77.2 },
        soilType: 'loamy',
        season: 'monsoon',
        farmSize: '5 acres'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.recommendations).toBeDefined();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- crop-agent.test.js

# Watch mode
npm run test:watch
```

---

## Contributing

### Branching Strategy

```
main (production)
  ├── develop (development)
  │   ├── feature/new-agent
  │   ├── feature/api-endpoint
  │   └── fix/bug-description
  └── hotfix/critical-bug
```

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples**:
```
feat(agents): add pest prediction agent
fix(api): correct NPK calculation for rice
docs(api): update fertilizer endpoint documentation
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Add tests
4. Update documentation
5. Run linter: `npm run lint`
6. Run tests: `npm test`
7. Create PR with description
8. Wait for review
9. Address feedback
10. Merge after approval

---

## Code Style

### JavaScript Style Guide

```javascript
// Use ES6+ features
import, export, const, let, arrow functions, template literals

// Naming conventions
const camelCase = 'for variables and functions';
const PascalCase = 'for classes';
const UPPER_SNAKE_CASE = 'for constants';

// Function documentation
/**
 * Calculate NPK requirements
 * @param {string} crop - Crop name
 * @param {Object} soilAnalysis - Soil test results
 * @returns {Object} NPK requirements
 */
async function calculateNPK(crop, soilAnalysis) {
  // Implementation
}

// Error handling
try {
  const result = await agent.process(params);
  return result;
} catch (error) {
  logger.error('Error processing', { error: error.message });
  throw error;
}

// Async/await over promises
// ✅ Good
const data = await fetchData();

// ❌ Avoid
fetchData().then(data => { ... });
```

### ESLint Configuration

Create `.eslintrc.json`:

```json
{
  "env": {
    "node": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-console": "warn"
  }
}
```

---

## Additional Resources

### Internal Documentation
- [API Reference](./COMPLETE_API_REFERENCE.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Tree Crops Guide](./TREE_CROPS_GUIDE.md)

### External Resources
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [N8N Documentation](https://docs.n8n.io/)
- [Anthropic API Reference](https://docs.anthropic.com/)
- [OpenAI API Reference](https://platform.openai.com/docs/)

---

## Questions?

- Create an issue on GitHub
- Check existing documentation
- Contact the development team
- Join our developer community

Happy coding! 🚀
