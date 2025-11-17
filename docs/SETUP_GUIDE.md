# Complete Setup and Installation Guide

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Pre-Installation Checklist](#pre-installation-checklist)
3. [Installation Methods](#installation-methods)
4. [Configuration](#configuration)
5. [First-Time Setup](#first-time-setup)
6. [Verification](#verification)
7. [Common Issues](#common-issues)

---

## System Requirements

### Hardware Requirements

**Minimum**:
- CPU: 2 cores
- RAM: 4 GB
- Storage: 20 GB free space
- Network: Stable internet connection

**Recommended** (Production):
- CPU: 4+ cores
- RAM: 8+ GB
- Storage: 50+ GB SSD
- Network: 100 Mbps+

### Software Requirements

**Required**:
- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB 7.0 or higher
- Docker 20.10+ and Docker Compose 2.0+ (for containerized deployment)

**Optional**:
- Git (for version control)
- PM2 (for process management)
- Nginx (for reverse proxy)

### Supported Operating Systems

- Ubuntu 20.04+ / Debian 11+
- CentOS 8+ / RHEL 8+
- macOS 12+ (Monterey or later)
- Windows 10/11 with WSL2

---

## Pre-Installation Checklist

Before starting installation, ensure you have:

- [ ] At least one AI provider API key (OpenAI, Anthropic, Gemini, Kimi2, or Grok)
- [ ] MongoDB installed and running OR access to MongoDB Atlas
- [ ] System meets minimum hardware requirements
- [ ] Admin/sudo access to the server
- [ ] Firewall rules configured (ports 3000, 5678, 27017)
- [ ] Domain name configured (for production)
- [ ] SSL certificate ready (for production)

---

## Installation Methods

### Method 1: Docker Installation (Recommended)

**Advantages**: Easiest, consistent environment, includes all dependencies

#### Step 1: Install Docker

**Ubuntu/Debian**:
```bash
# Update package index
sudo apt update

# Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

**macOS**:
```bash
# Install Docker Desktop from:
# https://docs.docker.com/desktop/install/mac-install/
# Or use Homebrew:
brew install --cask docker
```

#### Step 2: Clone Repository

```bash
# Clone the repository
git clone <repository-url>
cd ai_model

# Verify files
ls -la
```

#### Step 3: Configure Environment

```bash
# Copy environment template
cp config/.env.example config/.env

# Edit configuration
nano config/.env
# OR
vim config/.env
```

**Required Configuration**:
```env
# Choose your AI provider
AI_PROVIDER=anthropic

# Add your API key (choose one or more)
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
# OPENAI_API_KEY=sk-your-actual-key-here
# GEMINI_API_KEY=your-actual-key-here

# Database (default values work for Docker)
MONGODB_URI=mongodb://mongodb:27017/farmer_learning_platform

# Security (CHANGE THESE!)
JWT_SECRET=change-this-to-random-secure-string-min-32-chars
N8N_BASIC_AUTH_PASSWORD=change-this-secure-password
```

#### Step 4: Start Services

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

#### Step 5: Verify Installation

```bash
# Test API
curl http://localhost:3000/health

# Expected response:
# {"status":"healthy","timestamp":"...","uptime":...}

# Test N8N
open http://localhost:5678
# Login with credentials from .env
```

---

### Method 2: Manual Installation

**Advantages**: More control, better for development

#### Step 1: Install Node.js

**Ubuntu/Debian**:
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should be v18.x or higher
npm --version   # Should be 9.x or higher
```

**macOS**:
```bash
# Using Homebrew
brew install node@18

# Or using NVM (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc  # or ~/.zshrc
nvm install 18
nvm use 18
```

#### Step 2: Install MongoDB

**Ubuntu/Debian**:
```bash
# Import MongoDB GPG key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
sudo systemctl status mongod
mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
```

**macOS**:
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Verify
mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
```

**Alternative: MongoDB Atlas** (Cloud):
```bash
# Sign up at https://www.mongodb.com/cloud/atlas
# Create a free cluster
# Get connection string and update .env:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farmer_learning_platform
```

#### Step 3: Clone and Install Dependencies

```bash
# Clone repository
git clone <repository-url>
cd ai_model

# Install dependencies
npm install

# This will install all required packages
```

#### Step 4: Configure Environment

```bash
# Copy environment template
cp config/.env.example config/.env

# Edit with your settings
nano config/.env
```

**Complete Configuration Example**:
```env
# Node Environment
NODE_ENV=development

# API Configuration
API_PORT=3000
API_HOST=localhost
API_BASE_URL=http://localhost:3000

# Database
DB_TYPE=mongodb
DB_HOST=localhost
DB_PORT=27017
DB_NAME=farmer_learning_platform
MONGODB_URI=mongodb://localhost:27017/farmer_learning_platform

# AI Provider (choose one: openai, anthropic, gemini, kimi2, grok)
AI_PROVIDER=anthropic

# Anthropic Configuration
ANTHROPIC_API_KEY=sk-ant-your-key-here
ANTHROPIC_MODEL=claude-3-sonnet-20240229

# OpenAI Configuration (optional)
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4-turbo-preview

# Google Gemini Configuration (optional)
GEMINI_API_KEY=your-key-here
GEMINI_MODEL=gemini-pro

# Security
JWT_SECRET=your-super-secure-random-string-at-least-32-characters-long
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

#### Step 5: Install and Configure N8N

```bash
# Install N8N globally
npm install -g n8n

# Or run with npx
npx n8n

# N8N will start on http://localhost:5678
# First time: Create an owner account
```

#### Step 6: Start the Application

**Development Mode**:
```bash
# Start API server with auto-reload
npm run dev

# In another terminal, start N8N
n8n
```

**Production Mode**:
```bash
# Install PM2 for process management
npm install -g pm2

# Start API with PM2
pm2 start api/server.js --name farmer-platform-api

# Start N8N with PM2
pm2 start n8n --name n8n

# Save PM2 configuration
pm2 save
pm2 startup
```

---

## Configuration

### Environment Variables Reference

#### Core Settings

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | development | No |
| `API_PORT` | API server port | 3000 | No |
| `API_HOST` | API server host | localhost | No |

#### Database

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/... | Yes |
| `DB_NAME` | Database name | farmer_learning_platform | No |

#### AI Providers

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `AI_PROVIDER` | Active AI provider | anthropic | Yes |
| `ANTHROPIC_API_KEY` | Anthropic API key | - | If using Anthropic |
| `OPENAI_API_KEY` | OpenAI API key | - | If using OpenAI |
| `GEMINI_API_KEY` | Gemini API key | - | If using Gemini |
| `KIMI2_API_KEY` | Kimi2 API key | - | If using Kimi2 |
| `GROK_API_KEY` | Grok API key | - | If using Grok |

#### Security

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | JWT signing secret | - | Yes (Production) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 | No |

### Getting AI Provider API Keys

#### Anthropic Claude
1. Visit: https://console.anthropic.com
2. Sign up or log in
3. Go to API Keys section
4. Create new key
5. Copy and add to `.env`: `ANTHROPIC_API_KEY=sk-ant-...`

#### OpenAI
1. Visit: https://platform.openai.com
2. Sign up or log in
3. Go to API Keys
4. Create new secret key
5. Copy and add to `.env`: `OPENAI_API_KEY=sk-...`

#### Google Gemini
1. Visit: https://ai.google.dev
2. Sign in with Google account
3. Get API key
4. Copy and add to `.env`: `GEMINI_API_KEY=...`

#### Kimi2 (Moonshot AI)
1. Visit: https://platform.moonshot.cn
2. Register account
3. Get API key
4. Copy and add to `.env`: `KIMI2_API_KEY=...`

#### Grok (xAI)
1. Visit: https://console.x.ai
2. Request access
3. Get API key
4. Copy and add to `.env`: `GROK_API_KEY=...`

---

## First-Time Setup

### 1. Import N8N Workflows

```bash
# Access N8N UI
open http://localhost:5678

# Login with credentials from .env

# Import workflows:
# 1. Click "Workflows" in sidebar
# 2. Click "Import from File"
# 3. Select: n8n/workflows/main_orchestrator.json
# 4. Click "Import"
# 5. Activate the workflow (toggle in top right)
# 6. Repeat for: n8n/workflows/crop_analysis_pipeline.json
```

### 2. Test API Endpoints

```bash
# Test health endpoint
curl http://localhost:3000/health

# Test crop recommendation
curl -X POST http://localhost:3000/api/crops/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "location": {"latitude": 28.6, "longitude": 77.2, "region": "Delhi"},
    "soilType": "loamy",
    "season": "monsoon",
    "farmSize": "5 acres"
  }'

# Test tree crop recommendation
curl -X POST http://localhost:3000/api/trees/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "location": {"latitude": 25.2, "longitude": 55.3, "region": "UAE"},
    "soilType": "sandy",
    "waterAvailability": "limited",
    "farmSize": "20 acres"
  }'
```

### 3. Create First Farmer Profile

```bash
curl -X POST http://localhost:3000/api/farmers/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Farmer",
    "phone": "+1234567890",
    "location": {
      "latitude": 28.6,
      "longitude": 77.2,
      "region": "Delhi",
      "country": "India"
    },
    "farmDetails": {
      "farmSize": "10 acres",
      "soilType": "loamy",
      "waterSource": "well",
      "farmingStyle": "mixed"
    }
  }'
```

---

## Verification

### Check All Services

```bash
# Check API
curl http://localhost:3000/health
# Expected: {"status":"healthy",...}

# Check MongoDB
mongosh --eval 'db.runCommand({ ping: 1 })'
# Expected: { ok: 1 }

# Check N8N
curl http://localhost:5678
# Expected: HTML response

# Check Docker (if using Docker)
docker-compose ps
# Expected: All services "Up"
```

### Verify Database Connection

```bash
# Connect to MongoDB
mongosh

# Switch to database
use farmer_learning_platform

# Show collections (should be empty initially)
show collections

# Exit
exit
```

### Test AI Provider

```bash
# The API will test the AI provider when you make a request
# Check logs for confirmation:

# Docker:
docker-compose logs api | grep "provider"

# Manual:
tail -f logs/combined.log | grep "provider"
```

---

## Common Issues

### Issue: Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Find process using port
lsof -i :3000
# OR
netstat -ano | grep 3000

# Kill the process
kill -9 <PID>

# Or change port in .env
API_PORT=3001
```

### Issue: MongoDB Connection Failed

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution**:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check connection string in .env
# Should be: mongodb://localhost:27017/farmer_learning_platform
```

### Issue: AI Provider Authentication Failed

**Error**: `401 Unauthorized` or `Invalid API key`

**Solution**:
```bash
# Verify API key in .env
cat config/.env | grep API_KEY

# Check for extra spaces or quotes
# Key should be: ANTHROPIC_API_KEY=sk-ant-xxxxx
# NOT: ANTHROPIC_API_KEY="sk-ant-xxxxx"

# Test API key directly
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{"model":"claude-3-sonnet-20240229","max_tokens":10,"messages":[{"role":"user","content":"Hi"}]}'
```

### Issue: N8N Workflows Not Loading

**Error**: Workflows not visible or not executing

**Solution**:
```bash
# Check N8N logs
docker-compose logs n8n
# OR
pm2 logs n8n

# Restart N8N
docker-compose restart n8n
# OR
pm2 restart n8n

# Re-import workflows from UI
```

### Issue: Dependencies Installation Failed

**Error**: `npm install` fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still failing, try:
npm install --legacy-peer-deps
```

---

## Next Steps

After successful installation:

1. **Read the API Documentation**: `docs/API_DOCUMENTATION.md`
2. **Configure N8N Workflows**: `docs/N8N_GUIDE.md`
3. **Review Security Settings**: `docs/SECURITY.md`
4. **Set Up Monitoring**: `docs/MONITORING.md`
5. **Deploy to Production**: `docs/DEPLOYMENT.md`

---

## Getting Help

- **Documentation**: Check all docs in `docs/` directory
- **Logs**: Check `logs/combined.log` for errors
- **Issues**: Create an issue on GitHub
- **Community**: Join our discussion forum

---

## Quick Reference Commands

```bash
# Docker
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose logs -f            # View logs
docker-compose ps                 # Check status

# Manual
npm run dev                       # Development mode
npm start                         # Production mode
npm test                          # Run tests
pm2 status                        # Check PM2 processes
pm2 logs                          # View PM2 logs

# MongoDB
mongosh                           # Connect to MongoDB
show dbs                          # List databases
use farmer_learning_platform      # Switch database
show collections                  # Show collections

# System
curl localhost:3000/health        # Health check
netstat -tuln | grep LISTEN       # Check listening ports
df -h                             # Check disk space
free -h                           # Check memory
```
