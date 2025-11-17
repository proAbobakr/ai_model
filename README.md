# AI-Powered Farmer Learning Platform

A comprehensive AI system using n8n workflows and specialized AI agents to provide farmers with intelligent recommendations for crops, farming techniques, fertilizers, and water management.

## 🌾 Features

- **Crop Recommendation System**: AI-powered suggestions based on location, climate, soil type, and season
- **Farming Techniques Education**: Best practices, modern techniques, and traditional methods
- **Fertilizer & Mineral Advisor**: Customized fertilizer recommendations with NPK ratios and micronutrients
- **Water Management System**: Irrigation scheduling, water quality analysis, and conservation tips
- **Location-Based Intelligence**: Recommendations tailored to specific geographic regions
- **Multi-Agent Architecture**: Specialized AI agents working together via n8n workflows

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
- API keys for AI providers (OpenAI, Anthropic, etc.)

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

# AI Provider Keys
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# N8N Configuration
N8N_HOST=localhost
N8N_PORT=5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
```

## 📚 API Endpoints

### Crop Recommendations
- `POST /api/crops/recommend` - Get crop recommendations
- `GET /api/crops/:cropId` - Get detailed crop information

### Farming Techniques
- `POST /api/farming/techniques` - Get farming techniques for a crop
- `GET /api/farming/best-practices/:region` - Get regional best practices

### Fertilizer Recommendations
- `POST /api/fertilizer/recommend` - Get fertilizer recommendations
- `GET /api/fertilizer/analysis` - Analyze soil requirements

### Water Management
- `POST /api/water/irrigation-schedule` - Get irrigation schedule
- `POST /api/water/quality-analysis` - Analyze water quality

## 🤖 AI Agents

### 1. Crop Advisor Agent
Provides intelligent crop recommendations based on:
- Geographic location and climate zone
- Soil type and pH levels
- Season and weather patterns
- Market demand and profitability

### 2. Farming Techniques Agent
Educates farmers on:
- Modern farming methods
- Organic and sustainable practices
- Pest and disease management
- Crop rotation strategies

### 3. Fertilizer Advisor Agent
Recommends optimal fertilization:
- NPK ratio calculations
- Micronutrient requirements
- Application timing and methods
- Organic vs synthetic options

### 4. Water Management Agent
Optimizes water usage:
- Irrigation scheduling
- Water conservation techniques
- Drainage solutions
- Water quality management

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
