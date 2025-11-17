# AI-Powered Farmer Learning Platform

A comprehensive AI system using n8n workflows and specialized AI agents to provide farmers with intelligent recommendations for crops, farming techniques, fertilizers, water management, storage, economics, and transportation.

## 🌾 Features

### Core Production
- **Multiple AI Provider Support**: Choose from OpenAI, Anthropic Claude, Google Gemini, Kimi2, or Grok
- **Crop Recommendation System**: AI-powered suggestions based on location, climate, soil type, and season
- **Farming Techniques Education**: Best practices, modern techniques, and traditional methods
- **Fertilizer & Mineral Advisor**: Customized fertilizer recommendations with NPK ratios and micronutrients
- **Water Management System**: Irrigation scheduling, water quality analysis, and conservation tips

### Post-Harvest & Market
- **Storage Advisory**: Optimal storage conditions, facility design, quality monitoring, and loss prevention
- **Economics & Market Strategy**: Pricing strategies, market timing, profit analysis, and export opportunities
- **Transportation & Logistics**: Vehicle selection, route optimization, packaging guidelines, and cost management

### Platform
- **Location-Based Intelligence**: Recommendations tailored to specific geographic regions
- **8 Specialized AI Agents**: Complete farm-to-market guidance via n8n workflows
- **35+ API Endpoints**: Comprehensive REST API for all farming needs

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
│   ├── crop_advisor/           # Crop recommendation agent
│   ├── farming_techniques/     # Farming education agent
│   ├── fertilizer_advisor/     # Fertilizer recommendation agent
│   └── water_management/       # Water & irrigation agent
├── n8n/                        # n8n workflow configurations
│   └── workflows/              # Workflow JSON files
├── database/                   # Database related files
│   ├── schemas/                # Database schemas
│   └── migrations/             # Migration scripts
├── api/                        # REST API
│   ├── routes/                 # API routes
│   ├── controllers/            # Request handlers
│   └── middleware/             # Middleware functions
├── config/                     # Configuration files
├── data/                       # Data files
│   ├── knowledge_base/         # AI knowledge bases
│   └── sample_data/            # Sample datasets
├── docs/                       # Documentation
└── tests/                      # Test files
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

### Farming Techniques
- `POST /api/farming/techniques` - Get farming techniques
- `POST /api/farming/pest-management` - Get pest management advice
- `POST /api/farming/crop-rotation` - Get crop rotation plan
- `POST /api/farming/sustainable-practices` - Get sustainable practices

### Fertilizer
- `POST /api/fertilizer/recommend` - Get fertilizer recommendations
- `POST /api/fertilizer/soil-analysis` - Analyze soil deficiencies
- `POST /api/fertilizer/organic-alternatives` - Get organic alternatives
- `POST /api/fertilizer/schedule` - Get fertilization schedule

### Water Management
- `POST /api/water/irrigation-schedule` - Get irrigation schedule
- `POST /api/water/quality-analysis` - Analyze water quality
- `POST /api/water/conservation-strategies` - Get conservation tips
- `POST /api/water/drought-management` - Get drought management plan

### Storage & Post-Harvest
- `POST /api/storage/recommend` - Get storage recommendations
- `POST /api/storage/post-harvest` - Get post-harvest handling guidelines
- `POST /api/storage/facility-design` - Get storage facility design
- `POST /api/storage/quality-monitoring` - Get quality monitoring plan
- `POST /api/storage/loss-prevention` - Get loss prevention strategies
- `POST /api/storage/compare-methods` - Compare storage methods

### Economics & Markets
- `POST /api/economics/market-strategy` - Get market strategy
- `POST /api/economics/optimal-timing` - Get optimal selling timing
- `POST /api/economics/pricing-strategy` - Get pricing strategy
- `POST /api/economics/profit-analysis` - Get profit analysis
- `POST /api/economics/value-added` - Get value-added opportunities
- `POST /api/economics/demand-forecast` - Get demand forecast
- `POST /api/economics/export-opportunities` - Get export opportunities
- `POST /api/economics/compare-crops` - Compare crop economics

### Transportation & Logistics
- `POST /api/hauling/transportation-plan` - Get comprehensive transport plan
- `POST /api/hauling/vehicle-requirements` - Get vehicle specifications
- `POST /api/hauling/packaging-guidelines` - Get packaging and loading guidelines
- `POST /api/hauling/route-optimization` - Get route optimization
- `POST /api/hauling/cost-optimization` - Get cost optimization strategies
- `POST /api/hauling/quality-preservation` - Get quality preservation plan
- `POST /api/hauling/compliance-requirements` - Get compliance and documentation
- `POST /api/hauling/compare-modes` - Compare transportation modes

### Farmer Management
- `POST /api/farmers/register` - Register new farmer
- `GET /api/farmers/:farmerId` - Get farmer profile
- `PUT /api/farmers/:farmerId` - Update farmer profile
- `GET /api/farmers/:farmerId/history` - Get query history

**See [Complete API Reference](docs/COMPLETE_API_REFERENCE.md) for detailed documentation with examples.**

## 🤖 AI Agents

The platform uses 8 specialized AI agents, each powered by your choice of AI provider:

### 1. Crop Advisor Agent
**Location**: `agents/crop_advisor/`

Provides intelligent annual crop recommendations based on:
- Geographic location and climate zone
- Soil type and pH levels
- Season and weather patterns
- Market demand and profitability

### 2. Tree Advisor Agent
**Location**: `agents/tree_advisor/`

Specialized for perennial crops and long-term farming:
- Tree crop recommendations with ROI analysis
- Lifecycle planning (establishment to full production)
- Intercropping strategies
- Pruning guides and variety selection

### 3. Fertilizer Advisor Agent
**Location**: `agents/fertilizer_advisor/`

Recommends optimal fertilization:
- NPK ratio calculations based on crop and soil
- Micronutrient requirements
- Application timing and methods
- Organic vs synthetic options
- Growth stage-specific recommendations

### 4. Farming Techniques Agent
**Location**: `agents/farming_techniques/`

Educates farmers on best practices:
- Modern farming methods
- Organic and sustainable practices
- Pest and disease management (IPM)
- Crop rotation strategies
- Soil health management

### 5. Water Management Agent
**Location**: `agents/water_management/`

Optimizes water usage:
- Irrigation scheduling based on crop and climate
- Water conservation techniques
- Drought management strategies
- Water quality analysis
- Irrigation method selection

### 6. Storage Advisor Agent
**Location**: `agents/storage_advisor/`

Post-harvest storage optimization:
- Optimal storage conditions (temperature, humidity)
- Storage facility design and specifications
- Quality monitoring and loss prevention
- Post-harvest handling procedures
- Storage method comparisons

### 7. Economics Advisor Agent
**Location**: `agents/economics_advisor/`

Market strategy and profit optimization:
- Market price analysis and timing
- Pricing strategies and profit maximization
- Value-added product opportunities
- Export market identification
- Demand forecasting and crop economics

### 8. Hauling Advisor Agent
**Location**: `agents/hauling_advisor/`

Transportation and logistics planning:
- Vehicle selection and specifications
- Packaging and loading guidelines
- Route optimization and cost management
- Quality preservation during transport
- Compliance and documentation requirements

## 🔄 N8N Workflows

The platform includes pre-configured n8n workflows:

1. **Main Orchestrator**: Routes farmer queries to appropriate agents
2. **Crop Analysis Pipeline**: Processes crop recommendation requests
3. **Learning Content Delivery**: Delivers educational content
4. **Data Collection**: Gathers and processes farmer feedback

## 📖 Usage Examples

### Get Crop Recommendations

```bash
curl -X POST http://localhost:3000/api/crops/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090,
      "region": "North India"
    },
    "soil_type": "loamy",
    "season": "monsoon",
    "farm_size": "5 acres"
  }'
```

### Get Fertilizer Recommendations

```bash
curl -X POST http://localhost:3000/api/fertilizer/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "crop": "wheat",
    "soil_analysis": {
      "nitrogen": "low",
      "phosphorus": "medium",
      "potassium": "high",
      "ph": 6.5
    },
    "growth_stage": "vegetative"
  }'
```

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
