# Deployment Guide

This guide walks you through deploying the AI-Powered Farmer Learning Platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Docker Deployment](#docker-deployment)
4. [Manual Deployment](#manual-deployment)
5. [N8N Configuration](#n8n-configuration)
6. [Production Considerations](#production-considerations)
7. [Monitoring](#monitoring)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Docker**: v20.10 or higher
- **Docker Compose**: v2.0 or higher
- **MongoDB**: v7.0 or higher (if not using Docker)

### Required API Keys

You'll need API keys from at least one AI provider:

1. **OpenAI**: Get your API key from [platform.openai.com](https://platform.openai.com)
2. **Anthropic**: Get your API key from [console.anthropic.com](https://console.anthropic.com)

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai_model
```

### 2. Configure Environment Variables

```bash
cp config/.env.example config/.env
```

Edit `config/.env` with your actual values:

```env
# Choose your AI provider
AI_PROVIDER=anthropic  # or 'openai'

# Add your API keys
ANTHROPIC_API_KEY=sk-ant-your-key-here
OPENAI_API_KEY=sk-your-key-here

# Database (if not using Docker)
MONGODB_URI=mongodb://localhost:27017/farmer_learning_platform

# Security (change these!)
JWT_SECRET=your-super-secure-random-string-here

# N8N (if not using Docker)
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=change-this-secure-password
```

---

## Docker Deployment (Recommended)

### 1. Start All Services

```bash
docker-compose up -d
```

This will start:
- MongoDB (port 27017)
- N8N (port 5678)
- API Server (port 3000)
- Redis (port 6379)

### 2. Verify Services

```bash
docker-compose ps
```

All services should show "Up" status.

### 3. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f n8n
```

### 4. Stop Services

```bash
docker-compose down
```

### 5. Stop and Remove Data

```bash
docker-compose down -v
```

---

## Manual Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB

```bash
# If MongoDB is not running
mongod --dbpath /path/to/data/directory
```

Or use MongoDB as a service:
```bash
sudo systemctl start mongodb
```

### 3. Start N8N

In a separate terminal:

```bash
npx n8n
```

Or install globally:
```bash
npm install -g n8n
n8n start
```

### 4. Start API Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

---

## N8N Configuration

### 1. Access N8N UI

Open browser: `http://localhost:5678`

Login with credentials from `.env`:
- Username: `admin`
- Password: Your configured password

### 2. Import Workflows

1. Go to **Workflows** → **Import from File**
2. Import these files in order:
   - `n8n/workflows/main_orchestrator.json`
   - `n8n/workflows/crop_analysis_pipeline.json`

### 3. Activate Workflows

1. Open each imported workflow
2. Click **Active** toggle in top right
3. Verify webhook URLs are accessible

### 4. Configure Credentials

If workflows require database credentials:

1. Go to **Credentials**
2. Add new **MongoDB** credential
3. Enter connection details
4. Test and save

---

## Production Considerations

### Security

1. **Change Default Passwords**
   ```env
   JWT_SECRET=use-a-long-random-string
   N8N_BASIC_AUTH_PASSWORD=strong-password
   ```

2. **Enable HTTPS**
   - Use reverse proxy (nginx, Caddy)
   - Configure SSL certificates
   - Update `N8N_PROTOCOL=https`

3. **Firewall Rules**
   ```bash
   # Allow only necessary ports
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw deny 27017/tcp  # Block external MongoDB access
   ```

4. **Environment Variables**
   - Never commit `.env` file
   - Use secrets management in production
   - Rotate API keys regularly

### Performance

1. **Database Optimization**
   ```javascript
   // Create indexes (already in schemas)
   db.farmers.createIndex({ farmerId: 1 })
   db.queryLogs.createIndex({ createdAt: -1 })
   ```

2. **Enable Caching**
   ```env
   ENABLE_CACHE=true
   CACHE_TTL=3600
   ```

3. **Rate Limiting**
   ```env
   RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
   RATE_LIMIT_MAX_REQUESTS=100
   ```

### Scaling

1. **Load Balancing**
   - Deploy multiple API instances
   - Use nginx/HAProxy for load balancing
   - Share session state via Redis

2. **Database Replication**
   - Set up MongoDB replica set
   - Configure read replicas
   - Enable sharding for large datasets

3. **Container Orchestration**
   - Use Kubernetes for orchestration
   - Configure auto-scaling
   - Set resource limits

---

## Monitoring

### Health Checks

Check API health:
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 3600,
  "environment": "production"
}
```

### Logs

Application logs are stored in:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only

Monitor logs:
```bash
tail -f logs/combined.log
```

### Database Monitoring

```bash
# Connect to MongoDB
mongosh

# Check database stats
use farmer_learning_platform
db.stats()

# Check collection sizes
db.farmers.count()
db.queryLogs.count()
```

### N8N Monitoring

Access N8N executions:
1. Open N8N UI
2. Go to **Executions**
3. Monitor workflow success/failure rates

---

## Troubleshooting

### API Server Won't Start

**Problem**: Port already in use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

**Problem**: Database connection failed

- Verify MongoDB is running: `systemctl status mongodb`
- Check connection string in `.env`
- Test connection: `mongosh "your-connection-string"`

### N8N Workflows Not Triggering

**Problem**: Webhook not accessible

- Verify workflow is active
- Check webhook URL matches configuration
- Test webhook: `curl -X POST http://localhost:5678/webhook/farmer-query`

**Problem**: Agent endpoints not responding

- Verify API server is running
- Check API logs for errors
- Test endpoint directly: `curl http://localhost:3000/health`

### AI Responses Failing

**Problem**: Invalid API key

- Verify API key in `.env` is correct
- Check key hasn't expired
- Test key with provider's API directly

**Problem**: Rate limit exceeded

- Wait for rate limit window to reset
- Upgrade API tier with provider
- Implement request queuing

### MongoDB Issues

**Problem**: Out of disk space

```bash
# Check disk usage
df -h

# Clean old logs
db.queryLogs.deleteMany({ createdAt: { $lt: new Date('2024-01-01') } })
```

**Problem**: Slow queries

```bash
# Enable profiling
db.setProfilingLevel(2)

# Check slow queries
db.system.profile.find().sort({ ts: -1 }).limit(5)
```

### Docker Issues

**Problem**: Container won't start

```bash
# Check logs
docker-compose logs <service-name>

# Rebuild containers
docker-compose up -d --build

# Reset everything
docker-compose down -v
docker-compose up -d
```

---

## Backup and Recovery

### Database Backup

```bash
# Backup MongoDB
mongodump --uri="mongodb://localhost:27017/farmer_learning_platform" --out=/backups/$(date +%Y%m%d)

# Restore MongoDB
mongorestore --uri="mongodb://localhost:27017/farmer_learning_platform" /backups/20240115
```

### N8N Workflows Backup

Workflows are in JSON format in `n8n/workflows/`
- Commit to version control
- Regular backups to cloud storage

### Configuration Backup

```bash
# Backup all configs (exclude .env with secrets)
tar -czf config-backup-$(date +%Y%m%d).tar.gz \
  package.json \
  docker-compose.yml \
  n8n/ \
  --exclude=config/.env
```

---

## Maintenance

### Regular Tasks

**Daily:**
- Monitor error logs
- Check API health endpoint
- Review failed N8N executions

**Weekly:**
- Review slow query logs
- Check disk space usage
- Analyze API usage patterns

**Monthly:**
- Update dependencies
- Rotate API keys
- Clean old query logs
- Database optimization

### Updates

```bash
# Update dependencies
npm update

# Update Docker images
docker-compose pull
docker-compose up -d
```

---

## Support

For deployment issues:
- Check logs first
- Review this troubleshooting guide
- Create an issue on GitHub
- Contact: support@farmerlearning.ai

---

## Production Checklist

Before going to production:

- [ ] Changed all default passwords
- [ ] Configured HTTPS
- [ ] Set up proper firewall rules
- [ ] Enabled monitoring and logging
- [ ] Configured automated backups
- [ ] Set up error alerting
- [ ] Load tested the API
- [ ] Configured auto-scaling (if applicable)
- [ ] Set up CI/CD pipeline
- [ ] Created disaster recovery plan
- [ ] Documented custom configurations
- [ ] Trained team on operations
