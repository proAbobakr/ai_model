# AI-Powered Farmer Learning Platform

A comprehensive AI system using n8n workflows and specialized AI agents to provide farmers with intelligent recommendations for crops, farming techniques, fertilizers, and water management.

## 🌾 Features

### Annual Crops Support
- **Crop Recommendation System**: AI-powered suggestions based on location, climate, soil type, and season
- **5 Major Crops**: Wheat, Rice, Tomato, Potato, Corn with complete cultivation data

### Tree Crops & Perennials
- **Long-term Investment Planning**: ROI analysis for tree crops
- **7 Tree Species**: Date Palm, Mango, Coconut, Citrus, Avocado, Olive, Pomegranate
- **Intercropping Advice**: Optimize income during tree establishment phase
- **Pruning Guides**: Age-specific pruning instructions
- **Perennial Crop Management**: Long-term planning, pruning schedules, and lifecycle management

### AI-Powered Intelligence
- **Multiple AI Provider Support**: Choose from OpenAI, Anthropic Claude, Google Gemini, Kimi2, or Grok
- **Farming Techniques Education**: Best practices, modern techniques, and traditional methods for both annual and perennial crops
- **Fertilizer & Mineral Advisor**: Customized fertilizer recommendations with NPK ratios and micronutrients
- **Water Management System**: Irrigation scheduling, water quality analysis, and conservation tips

### Platform Features
- **Location-Based Intelligence**: Recommendations tailored to specific geographic regions
- **Multi-Agent Architecture**: 5 specialized AI agents working together via n8n workflows
- **REST API**: Complete API with 35+ endpoints for all farming needs
- **Docker Deployment**: Production-ready containerized deployment

## 🏗️ Architecture

```
┌─────────────────┐
│   Farmer Input  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  N8N Workflows  │◄──── Orchestration Layer
└────────┬────────┘
         │
         ├──────┬──────┬──────┬──────┐
         ▼      ▼      ▼      ▼      ▼
     ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
     │ AI │ │ AI │ │ AI │ │ AI │ │Data│
     │ 1  │ │ 2  │ │ 3  │ │ 4  │ │ DB │
     └────┘ └────┘ └────┘ └────┘ └────┘
       │      │      │      │      │
       └──────┴──────┴──────┴──────┘
                    │
                    ▼
         ┌──────────────────┐
         │  Recommendations │
         └──────────────────┘
```

## 📁 Project Structure

```
ai_model/
├── agents/                      # AI Agent implementations
│   ├── crop_advisor/           # Annual crop recommendation agent
│   ├── tree_advisor/           # Tree crop & perennial advisor
│   ├── farming_techniques/     # Farming education agent
│   ├── fertilizer_advisor/     # Fertilizer recommendation agent
│   └── water_management/       # Water & irrigation agent
├── api/                        # REST API
│   ├── routes/                 # API routes (crops, trees, fertilizer, water, farming, farmer)
│   └── server.js               # Express server setup
├── config/                     # Configuration files
│   ├── ai-client.js            # Unified AI provider client
│   ├── config.js               # Environment configuration
│   ├── database.js             # MongoDB connection
│   └── logger.js               # Winston logger setup
├── data/                       # Data files
│   └── knowledge_base/         # AI knowledge bases
│       ├── crops.js            # Annual crops database
│       └── tree_crops.js       # Tree crops database
├── database/                   # Database related files
│   └── schemas/                # Mongoose schemas (8 models)
├── docs/                       # Comprehensive documentation
│   ├── SETUP_GUIDE.md          # Installation & setup
│   ├── COMPLETE_API_REFERENCE.md  # Full API docs
│   ├── USER_GUIDE.md           # Farmer-facing guide
│   ├── DEVELOPER_GUIDE.md      # Technical implementation
│   ├── EXAMPLES.md             # Tutorials & examples
│   ├── TREE_CROPS_GUIDE.md     # Tree crop documentation
│   └── TROUBLESHOOTING.md      # Common issues & solutions
├── n8n/                        # n8n workflow configurations
│   ├── workflows/              # Workflow JSON files
│   └── README.md               # N8N setup guide
├── tests/                      # Test files
├── docker-compose.yml          # Docker services configuration
├── Dockerfile                  # API container definition
└── package.json                # Node.js dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- n8n (self-hosted or cloud)
- MongoDB or PostgreSQL
- API key for at least one AI provider:
  - **OpenAI** (GPT-4, GPT-3.5)
  - **Anthropic** (Claude 3)
  - **Google Gemini** (Gemini Pro)
  - **Moonshot AI** (Kimi2)
  - **xAI** (Grok)

### Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp config/.env.example config/.env
# Edit config/.env with your API keys and database credentials
```

4. Start the database:
```bash
docker-compose up -d db
```

5. Run database migrations:
```bash
npm run migrate
```

6. Start n8n:
```bash
docker-compose up -d n8n
```

7. Import n8n workflows:
   - Access n8n at http://localhost:5678
   - Import workflows from `n8n/workflows/`

8. Start the API server:
```bash
npm run dev
```

**📖 For detailed installation instructions, troubleshooting, and configuration, see the [Setup Guide](docs/SETUP_GUIDE.md).**

## 🔧 Configuration

Edit `config/.env` with your settings:

```env
# API Configuration
API_PORT=3000
API_HOST=localhost

# Database
DB_TYPE=mongodb
DB_HOST=localhost
DB_PORT=27017
DB_NAME=farmer_learning_platform

# AI Provider Selection (openai, anthropic, gemini, kimi2, grok)
AI_PROVIDER=anthropic

# AI Provider Keys (configure at least one)
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4-turbo-preview

ANTHROPIC_API_KEY=your_anthropic_key
ANTHROPIC_MODEL=claude-3-sonnet-20240229

GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-pro

KIMI2_API_KEY=your_kimi2_key
KIMI2_MODEL=moonshot-v1-8k
KIMI2_BASE_URL=https://api.moonshot.cn/v1

GROK_API_KEY=your_grok_key
GROK_MODEL=grok-1
GROK_BASE_URL=https://api.x.ai/v1

# N8N Configuration
N8N_HOST=localhost
N8N_PORT=5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
```

### Supported AI Providers

The platform supports multiple AI providers. You can switch between them by setting the `AI_PROVIDER` environment variable:

| Provider | Model Options | API Key Source |
|----------|--------------|----------------|
| **OpenAI** | gpt-4-turbo-preview, gpt-4, gpt-3.5-turbo | [platform.openai.com](https://platform.openai.com) |
| **Anthropic** | claude-3-opus, claude-3-sonnet, claude-3-haiku | [console.anthropic.com](https://console.anthropic.com) |
| **Google Gemini** | gemini-pro, gemini-pro-vision | [ai.google.dev](https://ai.google.dev) |
| **Kimi2 (Moonshot)** | moonshot-v1-8k, moonshot-v1-32k, moonshot-v1-128k | [platform.moonshot.cn](https://platform.moonshot.cn) |
| **Grok (xAI)** | grok-1 | [console.x.ai](https://console.x.ai) |

**Note:** You only need to configure one AI provider, but you can configure multiple and switch between them.

## 📚 Documentation

Comprehensive documentation is available to help you get started and make the most of the platform:

### Getting Started
- **[Setup Guide](docs/SETUP_GUIDE.md)** - Complete installation and configuration instructions
  - Docker installation (recommended)
  - Manual installation
  - Getting AI provider API keys
  - First-time setup and verification
  - Common installation issues

- **[User Guide](docs/USER_GUIDE.md)** - Farmer-friendly guide to using the platform
  - Getting started with the platform
  - Annual crops recommendations
  - Tree crops and long-term planning
  - Fertilizer and water management
  - Pest and disease management
  - Success stories and tips

### API & Integration
- **[Complete API Reference](docs/COMPLETE_API_REFERENCE.md)** - Full API documentation
  - All 35+ endpoints documented
  - Request/response examples
  - Error handling
  - Code examples in cURL, JavaScript, Python

- **[Examples & Tutorials](docs/EXAMPLES.md)** - Practical examples and tutorials
  - Quick start examples
  - Complete use case tutorials
  - Integration examples (Node.js, Python, React)
  - Advanced scenarios
  - N8N workflow examples

### Development
- **[Developer Guide](docs/DEVELOPER_GUIDE.md)** - Technical implementation details
  - Architecture deep-dive
  - Creating new agents
  - Adding new API endpoints
  - Working with AI providers
  - Testing guide
  - Contributing guidelines

- **[Tree Crops Guide](docs/TREE_CROPS_GUIDE.md)** - Comprehensive tree crop documentation
  - Complete species information
  - Economic analysis and ROI
  - Management principles
  - Regional recommendations

### Support
- **[Troubleshooting Guide](docs/TROUBLESHOOTING.md)** - Solutions to common issues
  - Installation issues
  - Connection issues
  - API errors
  - AI provider issues
  - Database issues
  - Performance optimization
  - Debugging tips

## 📚 API Endpoints

### Annual Crops
- `POST /api/crops/recommend` - Get crop recommendations
- `GET /api/crops/:cropName` - Get detailed crop information
- `POST /api/crops/compare` - Compare multiple crops

### Tree Crops
- `POST /api/trees/recommend` - Get tree crop recommendations
- `GET /api/trees/:treeName/guide` - Get cultivation guide
- `POST /api/trees/compare` - Compare tree crops
- `POST /api/trees/intercropping` - Get intercropping advice
- `GET /api/trees/:treeName/pruning` - Get pruning guide
- `GET /api/trees/category/:category` - Browse by category
- `GET /api/trees/info/:treeName` - Get detailed tree information

### Farming Techniques
- `POST /api/farming/techniques` - Get farming techniques
- `POST /api/farming/pest-management` - Get pest management advice
- `POST /api/farming/crop-rotation` - Get crop rotation plan
- `POST /api/farming/sustainable-practices` - Get sustainable practices
- `GET /api/farming/organic-guide/:crop` - Get organic farming guide

### Fertilizer Recommendations
- `POST /api/fertilizer/recommend` - Get fertilizer recommendations
- `POST /api/fertilizer/soil-analysis` - Analyze soil deficiencies
- `POST /api/fertilizer/organic-alternatives` - Get organic alternatives
- `POST /api/fertilizer/schedule` - Get fertilization schedule

### Water Management
- `POST /api/water/irrigation-schedule` - Get irrigation schedule
- `POST /api/water/quality-analysis` - Analyze water quality
- `POST /api/water/conservation-strategies` - Get conservation tips
- `POST /api/water/drought-management` - Get drought management plan

### Farmer Management
- `POST /api/farmers/register` - Register new farmer
- `GET /api/farmers/:farmerId` - Get farmer profile
- `PUT /api/farmers/:farmerId` - Update farmer profile
- `GET /api/farmers/:farmerId/history` - Get query history

**See [Complete API Reference](docs/COMPLETE_API_REFERENCE.md) for detailed documentation with examples.**

## 🤖 AI Agents

The platform uses 5 specialized AI agents, each powered by your choice of AI provider:

### 1. Crop Advisor Agent
**Location**: `agents/crop_advisor/`

Provides intelligent annual crop recommendations based on:
- Geographic location and climate zone
- Soil type and pH levels
- Season and weather patterns
- Farm size and water availability
- Market demand and profitability

**Supported Crops**: Wheat, Rice, Tomato, Potato, Corn

### 2. Tree Advisor Agent
**Location**: `agents/tree_advisor/`

Specialized for perennial crops and long-term farming:
- Tree crop recommendations with ROI analysis
- Lifecycle planning (establishment to full production)
- Intercropping strategies for establishment phase
- Age-specific pruning guides
- Variety selection and pollination requirements

**Supported Trees**: Date Palm, Mango, Coconut, Citrus, Avocado, Olive, Pomegranate

### 3. Fertilizer Advisor Agent
**Location**: `agents/fertilizer_advisor/`

Recommends optimal fertilization:
- NPK ratio calculations based on crop and soil
- Micronutrient requirements
- Application timing and methods
- Organic vs synthetic options
- Growth stage-specific recommendations
- Soil deficiency analysis

### 4. Farming Techniques Agent
**Location**: `agents/farming_techniques/`

Educates farmers on best practices:
- Modern farming methods
- Organic and sustainable practices
- Pest and disease management (IPM)
- Crop rotation strategies
- Soil health management
- Season-specific techniques

### 5. Water Management Agent
**Location**: `agents/water_management/`

Optimizes water usage:
- Irrigation scheduling based on crop and climate
- Water conservation techniques
- Drought management strategies
- Water quality analysis
- Irrigation method selection
- Seasonal adjustments

## 🔄 N8N Workflows

The platform includes pre-configured n8n workflows:

1. **Main Orchestrator**: Routes farmer queries to appropriate agents
2. **Crop Analysis Pipeline**: Processes crop recommendation requests
3. **Learning Content Delivery**: Delivers educational content
4. **Data Collection**: Gathers and processes farmer feedback

## 📖 Usage Examples

### Get Annual Crop Recommendations

```bash
curl -X POST http://localhost:3000/api/crops/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "location": {
      "country": "India",
      "region": "Punjab",
      "latitude": 30.9010,
      "longitude": 75.8573
    },
    "soilType": "clay loam",
    "season": "kharif",
    "farmSize": 5,
    "waterAvailability": "canal irrigation"
  }'
```

### Get Tree Crop Recommendations

```bash
curl -X POST http://localhost:3000/api/trees/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "location": {
      "country": "Saudi Arabia",
      "region": "Al-Ahsa"
    },
    "soilType": "sandy loam",
    "waterAvailability": "drip irrigation",
    "farmSize": 2,
    "timeframe": "long-term",
    "purpose": "commercial"
  }'
```

### Get Fertilizer Recommendations

```bash
curl -X POST http://localhost:3000/api/fertilizer/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "crop": "wheat",
    "farmSize": 10,
    "unit": "hectares",
    "soilAnalysis": {
      "nitrogen": "medium",
      "phosphorus": "low",
      "potassium": "medium",
      "pH": 6.8
    },
    "growthStage": "pre-planting"
  }'
```

### Get Irrigation Schedule

```bash
curl -X POST http://localhost:3000/api/water/irrigation-schedule \
  -H "Content-Type: application/json" \
  -d '{
    "crop": "wheat",
    "soilType": "clay",
    "climate": {
      "temperature": 20,
      "humidity": 60,
      "rainfall": 50
    },
    "growthStage": "vegetative",
    "irrigationMethod": "flood"
  }'
```

**📖 For more examples, tutorials, and integration guides, see the [Examples & Tutorials](docs/EXAMPLES.md) documentation.**

## 🧪 Testing

Run tests:
```bash
npm test
```

Run with coverage:
```bash
npm run test:coverage
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Contact support at support@farmerlearning.ai

## 🗺️ Roadmap

- [ ] Mobile app integration
- [ ] Multi-language support
- [ ] Satellite imagery integration
- [ ] Weather API integration
- [ ] Community forum
- [ ] Marketplace integration
- [ ] Offline mode support

---

Built with ❤️ for farmers worldwide
