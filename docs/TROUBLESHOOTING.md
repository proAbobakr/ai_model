# Troubleshooting Guide

This guide helps you diagnose and resolve common issues with the AI-Powered Farmer Learning Platform.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Connection Issues](#connection-issues)
3. [API Errors](#api-errors)
4. [AI Provider Issues](#ai-provider-issues)
5. [Database Issues](#database-issues)
6. [N8N Issues](#n8n-issues)
7. [Performance Issues](#performance-issues)
8. [Common Error Messages](#common-error-messages)
9. [Debugging Tips](#debugging-tips)
10. [Getting Help](#getting-help)

---

## Installation Issues

### Issue: npm install fails with permission errors

**Symptoms:**
```
EACCES: permission denied, access '/usr/local/lib/node_modules'
```

**Solutions:**

1. **Option 1: Use nvm (Recommended)**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js
nvm install 18
nvm use 18

# Try installation again
npm install
```

2. **Option 2: Fix permissions**
```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

3. **Option 3: Use --unsafe-perm flag**
```bash
npm install --unsafe-perm
```

---

### Issue: Docker build fails with network timeout

**Symptoms:**
```
ERROR [internal] load metadata for docker.io/library/node:18-alpine
failed to solve with frontend dockerfile.v0: failed to create LLB definition
```

**Solutions:**

1. **Check Docker daemon is running:**
```bash
sudo systemctl status docker
sudo systemctl start docker  # If not running
```

2. **Configure Docker DNS:**
```bash
# Edit /etc/docker/daemon.json
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}

# Restart Docker
sudo systemctl restart docker
```

3. **Use different registry mirror:**
```bash
# In Dockerfile, try different base image registry
FROM node:18-alpine
# Could try:
# FROM registry.npmjs.org/library/node:18-alpine
```

4. **Build with no-cache:**
```bash
docker-compose build --no-cache
```

---

### Issue: Port already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

1. **Find process using the port:**
```bash
# Linux/Mac
sudo lsof -i :3000
sudo lsof -i :8080  # For n8n

# Windows
netstat -ano | findstr :3000
```

2. **Kill the process:**
```bash
# Linux/Mac
kill -9 <PID>

# Windows
taskkill /PID <PID> /F
```

3. **Change port in configuration:**
```bash
# Edit .env
PORT=3001  # Instead of 3000
N8N_PORT=8081  # Instead of 8080
```

---

## Connection Issues

### Issue: Cannot connect to MongoDB

**Symptoms:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

1. **Check MongoDB is running:**
```bash
# Docker
docker ps | grep mongodb

# Local MongoDB
sudo systemctl status mongod

# If not running:
sudo systemctl start mongod
```

2. **Verify connection string:**
```bash
# In .env, check:
MONGODB_URI=mongodb://localhost:27017/farmer_ai

# For Docker:
MONGODB_URI=mongodb://mongodb:27017/farmer_ai
```

3. **Check MongoDB logs:**
```bash
# Docker
docker logs ai_farmer_mongodb_1

# Local
sudo tail -f /var/log/mongodb/mongod.log
```

4. **Test connection manually:**
```bash
# Using mongosh
mongosh mongodb://localhost:27017/farmer_ai

# Using Docker exec
docker exec -it ai_farmer_mongodb_1 mongosh
```

5. **Firewall issues:**
```bash
# Allow MongoDB port
sudo ufw allow 27017

# Check if port is accessible
telnet localhost 27017
```

---

### Issue: Cannot connect to N8N interface

**Symptoms:**
- Browser shows "This site can't be reached"
- N8N interface not loading at http://localhost:8080

**Solutions:**

1. **Check N8N container is running:**
```bash
docker ps | grep n8n

# If not running:
docker-compose up -d n8n
```

2. **Check N8N logs:**
```bash
docker logs ai_farmer_n8n_1

# Look for startup messages
```

3. **Verify port mapping:**
```bash
# Check docker-compose.yml
services:
  n8n:
    ports:
      - "8080:5678"  # Should map to 5678 internally
```

4. **Try different browser:**
- Clear browser cache
- Try incognito/private mode
- Try different browser

5. **Check N8N environment variables:**
```bash
docker exec ai_farmer_n8n_1 env | grep N8N
```

---

### Issue: API requests timeout

**Symptoms:**
```
Error: timeout of 2000ms exceeded
```

**Solutions:**

1. **Increase timeout in client:**
```javascript
axios.post('http://localhost:3000/api/crops/recommend', data, {
  timeout: 30000  // 30 seconds
});
```

2. **Check server is responding:**
```bash
curl -v http://localhost:3000/health
```

3. **Check server logs:**
```bash
# Docker
docker logs ai_farmer_api_1

# Local
tail -f logs/app.log
```

4. **Verify AI provider response time:**
- AI providers might be slow
- Check AI provider status page
- Try different provider

---

## API Errors

### Issue: 401 Unauthorized

**Symptoms:**
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

**Solutions:**

1. **Check if authentication is enabled:**
- Current version doesn't require authentication
- Future versions might implement it

2. **Verify request headers:**
```bash
curl -H "Content-Type: application/json" \
     -X POST http://localhost:3000/api/crops/recommend \
     -d '{"location": {...}}'
```

---

### Issue: 400 Bad Request - Validation Error

**Symptoms:**
```json
{
  "status": "error",
  "message": "Validation error",
  "errors": [
    {
      "field": "location.latitude",
      "message": "latitude must be a number"
    }
  ]
}
```

**Solutions:**

1. **Check request body format:**
```javascript
// Correct format
{
  "location": {
    "country": "India",
    "region": "Punjab",
    "latitude": 30.9010,  // Number, not string
    "longitude": 75.8573
  },
  "soilType": "loam",
  "farmSize": 5  // Number, not string
}

// Wrong format
{
  "location": {
    "latitude": "30.9010",  // ❌ String instead of number
    "farmSize": "5"  // ❌ String instead of number
  }
}
```

2. **Verify required fields:**
- Check API documentation for required fields
- Ensure all required fields are present

3. **Check data types:**
```javascript
// Common mistakes:
farmSize: "5"      // ❌ Should be: farmSize: 5
temperature: "20"  // ❌ Should be: temperature: 20
organic: "true"    // ❌ Should be: organic: true
```

---

### Issue: 404 Not Found

**Symptoms:**
```json
{
  "status": "error",
  "message": "Route not found"
}
```

**Solutions:**

1. **Verify endpoint URL:**
```bash
# Correct endpoints:
POST /api/crops/recommend       ✅
GET  /api/crops/wheat           ✅
POST /api/trees/recommend       ✅

# Wrong endpoints:
POST /crops/recommend           ❌ Missing /api
GET  /api/crop/wheat            ❌ Should be /crops
POST /api/tree/recommend        ❌ Should be /trees
```

2. **Check server routes:**
```bash
# View all registered routes
curl http://localhost:3000/

# Response includes all available endpoints
```

3. **Verify method (GET vs POST):**
```bash
# Wrong:
GET /api/crops/recommend  ❌

# Correct:
POST /api/crops/recommend ✅
```

---

### Issue: 429 Too Many Requests

**Symptoms:**
```json
{
  "status": "error",
  "message": "Too many requests, please try again later"
}
```

**Solutions:**

1. **Wait and retry:**
```javascript
async function retryWithBackoff(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.response?.status === 429) {
        const delay = Math.pow(2, i) * 1000;  // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}
```

2. **Adjust rate limit configuration:**
```javascript
// In api/server.js, modify rate limiter:
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 200  // Increase from 100 to 200
});
```

3. **Implement request queuing:**
```javascript
const queue = [];
const processQueue = async () => {
  if (queue.length > 0) {
    const request = queue.shift();
    await request();
    setTimeout(processQueue, 100);  // Wait 100ms between requests
  }
};
```

---

### Issue: 500 Internal Server Error

**Symptoms:**
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

**Solutions:**

1. **Check server logs:**
```bash
# Docker
docker logs ai_farmer_api_1 --tail 100

# Local
tail -f logs/app.log
```

2. **Common causes:**
- AI provider API key invalid
- Database connection lost
- Unhandled exception in code

3. **Verify environment variables:**
```bash
# Check all required variables are set
cat .env

# Required variables:
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/farmer_ai
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-xxx
# ... etc
```

4. **Test AI provider separately:**
```javascript
// test-ai-provider.js
const { aiClient } = require('./config/ai-client');

async function test() {
  try {
    const response = await aiClient.generateCompletion(
      'You are a test assistant',
      'Say hello',
      { temperature: 0.7 }
    );
    console.log('AI Provider Working:', response);
  } catch (error) {
    console.error('AI Provider Error:', error);
  }
}

test();
```

---

## AI Provider Issues

### Issue: Invalid API Key

**Symptoms:**
```
Error: Invalid API key provided
401 Authentication failed
```

**Solutions:**

1. **Verify API key format:**

```bash
# Anthropic keys start with: sk-ant-
ANTHROPIC_API_KEY=sk-ant-api03-xxx

# OpenAI keys start with: sk-
OPENAI_API_KEY=sk-xxx

# Gemini keys are 39 characters:
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

2. **Check API key is active:**
- Log into provider dashboard
- Verify key hasn't been revoked
- Check usage limits

3. **Test API key manually:**

```bash
# Anthropic
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-3-sonnet-20240229","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'

# OpenAI
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Hello"}]}'

# Gemini
curl "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

4. **Regenerate API key:**
- Create new key from provider dashboard
- Update .env file
- Restart application

---

### Issue: Rate limit exceeded for AI provider

**Symptoms:**
```
Error: Rate limit reached for requests
429 Too Many Requests
```

**Solutions:**

1. **Check provider rate limits:**
- Anthropic: 5 requests/min (free tier)
- OpenAI: 3 requests/min (free tier)
- Gemini: 60 requests/min (free tier)

2. **Implement provider rotation:**

```javascript
// config/ai-client.js
const providers = ['anthropic', 'openai', 'gemini'];
let currentProviderIndex = 0;

async function generateWithFallback(systemPrompt, userPrompt, options) {
  for (let i = 0; i < providers.length; i++) {
    try {
      const provider = providers[currentProviderIndex];
      const response = await generateCompletion(
        systemPrompt,
        userPrompt,
        { ...options, provider }
      );
      currentProviderIndex = (currentProviderIndex + 1) % providers.length;
      return response;
    } catch (error) {
      if (error.status === 429) {
        // Try next provider
        currentProviderIndex = (currentProviderIndex + 1) % providers.length;
        continue;
      }
      throw error;
    }
  }
  throw new Error('All providers rate limited');
}
```

3. **Upgrade provider plan:**
- Consider paid tier for higher limits
- Anthropic Pro: 50 requests/min
- OpenAI Plus: 3,500 requests/min

4. **Implement caching:**
```javascript
const cache = new Map();

async function cachedGenerate(systemPrompt, userPrompt) {
  const key = `${systemPrompt}:${userPrompt}`;
  if (cache.has(key)) {
    return cache.get(key);
  }
  const response = await generateCompletion(systemPrompt, userPrompt);
  cache.set(key, response);
  return response;
}
```

---

### Issue: AI provider timeout

**Symptoms:**
```
Error: Request timeout after 30000ms
```

**Solutions:**

1. **Increase timeout:**
```javascript
// config/ai-client.js
const anthropic = new Anthropic({
  apiKey: config.anthropicApiKey,
  timeout: 60000  // Increase to 60 seconds
});
```

2. **Reduce token limit:**
```javascript
// In agent files, reduce maxTokens:
const response = await this.aiClient.generateCompletion(
  systemPrompt,
  userPrompt,
  {
    temperature: 0.7,
    maxTokens: 2000  // Reduce from 4000
  }
);
```

3. **Switch to faster model:**
```bash
# In .env
ANTHROPIC_MODEL=claude-3-haiku-20240307  # Faster than sonnet
OPENAI_MODEL=gpt-3.5-turbo  # Faster than gpt-4
```

---

### Issue: Unexpected AI response format

**Symptoms:**
```
Error: Cannot parse AI response
Response is not valid JSON
```

**Solutions:**

1. **Enable debug logging:**
```javascript
// config/ai-client.js
console.log('Raw AI Response:', content);
console.log('Parsed JSON:', parsed);
```

2. **Improve parsing logic:**
```javascript
parseJSON(content) {
  // Try multiple parsing strategies
  try {
    // Strategy 1: Direct parse
    return JSON.parse(content);
  } catch {
    try {
      // Strategy 2: Extract JSON from markdown
      const match = content.match(/```json\n([\s\S]*?)\n```/);
      if (match) {
        return JSON.parse(match[1]);
      }
    } catch {
      try {
        // Strategy 3: Extract JSON from text
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch {
        // Strategy 4: Return as text
        return { content: content };
      }
    }
  }
}
```

3. **Update system prompts:**
```javascript
const systemPrompt = `You are an expert agricultural advisor.

IMPORTANT: Respond ONLY with valid JSON. No markdown, no explanation, just JSON.

Example response format:
{
  "crops": [...],
  "reasoning": "..."
}`;
```

---

## Database Issues

### Issue: MongoDB authentication failed

**Symptoms:**
```
MongoServerError: Authentication failed
```

**Solutions:**

1. **Check credentials:**
```bash
# In .env
MONGODB_URI=mongodb://username:password@localhost:27017/farmer_ai?authSource=admin
```

2. **Create MongoDB user:**
```bash
mongosh

use admin
db.createUser({
  user: "farmadmin",
  pwd: "securepassword",
  roles: [{ role: "readWrite", db: "farmer_ai" }]
})
```

3. **Disable authentication (development only):**
```bash
# Edit mongod.conf
security:
  authorization: disabled

# Restart MongoDB
sudo systemctl restart mongod
```

---

### Issue: Database connection pool exhausted

**Symptoms:**
```
MongoPoolTimeoutError: Timed out while checking out a connection
```

**Solutions:**

1. **Increase pool size:**
```javascript
// config/database.js
mongoose.connect(config.database.uri, {
  maxPoolSize: 20,  // Increase from 10
  minPoolSize: 5
});
```

2. **Check for connection leaks:**
```javascript
// Make sure cursors are closed
const cursor = Farmer.find({}).cursor();
await cursor.eachAsync(async (farmer) => {
  // Process farmer
});
await cursor.close();  // Important!
```

3. **Monitor connections:**
```bash
mongosh

db.serverStatus().connections
# Current: X
# Available: Y
# totalCreated: Z
```

---

### Issue: Data not persisting

**Symptoms:**
- Data saved successfully but not found later
- Queries return empty results

**Solutions:**

1. **Check database name:**
```javascript
// Ensure you're using the correct database
mongoose.connection.db.databaseName  // Should be 'farmer_ai'
```

2. **Verify model is correct:**
```javascript
// Check model name matches collection
const Farmer = mongoose.model('Farmer');  // Collection: 'farmers'
const Crop = mongoose.model('Crop');      // Collection: 'crops'
```

3. **Check for validation errors:**
```javascript
try {
  await farmer.save();
} catch (error) {
  console.error('Validation Error:', error.errors);
}
```

4. **Verify indexes:**
```bash
mongosh

use farmer_ai
db.farmers.getIndexes()
db.crops.getIndexes()
```

---

## N8N Issues

### Issue: Cannot import workflows

**Symptoms:**
- Import button doesn't work
- "Invalid workflow format" error

**Solutions:**

1. **Verify JSON format:**
```bash
# Validate JSON file
cat n8n/workflows/main_orchestrator.json | jq .

# Should not have errors
```

2. **Check N8N version compatibility:**
```bash
docker exec ai_farmer_n8n_1 n8n --version

# Workflows created in v0.200+ might not work in older versions
```

3. **Import via UI:**
- Click "Import from File"
- Select workflow JSON file
- Or paste JSON directly

4. **Import via CLI:**
```bash
docker exec ai_farmer_n8n_1 n8n import:workflow \
  --input=/data/workflows/main_orchestrator.json
```

---

### Issue: Workflow execution fails

**Symptoms:**
- Workflow shows red error node
- "Workflow execution failed" message

**Solutions:**

1. **Check node configuration:**
- Verify all required fields filled
- Check API URLs are correct
- Ensure credentials are set

2. **Test each node individually:**
- Click "Execute Node" button
- Check output data
- Verify expected format

3. **Check API connectivity:**
```bash
# From N8N container
docker exec ai_farmer_n8n_1 curl http://api:3000/health

# Should return: {"status": "ok"}
```

4. **Review execution logs:**
- Click on failed node
- View "Output" tab
- Check error message

5. **Common issues:**

**Issue: HTTP Request node timeout**
```json
// In HTTP Request node settings:
{
  "timeout": 30000,  // Increase from default 10000
  "retry": {
    "enabled": true,
    "maxRetries": 3
  }
}
```

**Issue: Invalid credentials**
- Go to Settings > Credentials
- Verify API keys are correct
- Test credential connection

---

### Issue: N8N webhook not receiving requests

**Symptoms:**
- Webhook URL returns 404
- No executions triggered

**Solutions:**

1. **Verify webhook URL:**
```bash
# Production webhook URL format:
https://your-domain.com/webhook/farmer-query

# Test webhook URL format:
https://your-domain.com/webhook-test/farmer-query
```

2. **Check webhook path:**
- In webhook node settings
- Path should not start with /
- Example: `farmer-query` not `/farmer-query`

3. **Test webhook:**
```bash
curl -X POST http://localhost:8080/webhook/farmer-query \
  -H "Content-Type: application/json" \
  -d '{"query": "test"}'
```

4. **Enable webhook execution:**
- Workflow must be activated
- Click toggle to activate workflow

---

## Performance Issues

### Issue: Slow API response times

**Symptoms:**
- Requests take > 10 seconds
- UI feels sluggish

**Solutions:**

1. **Profile API requests:**
```javascript
// Add request timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path}: ${duration}ms`);
  });
  next();
});
```

2. **Identify bottlenecks:**
```javascript
// Add timing to AI calls
const start = Date.now();
const response = await this.aiClient.generateCompletion(...);
console.log(`AI call took: ${Date.now() - start}ms`);
```

3. **Optimize database queries:**
```javascript
// Add indexes for frequently queried fields
farmerSchema.index({ 'location.country': 1, 'location.region': 1 });
cropSchema.index({ name: 1 });

// Use lean() for read-only queries
const crops = await Crop.find({}).lean();  // Faster, returns plain objects

// Select only needed fields
const farmers = await Farmer.find({}).select('name location farmSize');
```

4. **Implement caching:**
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 });  // 5 minutes

app.post('/api/crops/recommend', async (req, res) => {
  const cacheKey = JSON.stringify(req.body);
  const cached = cache.get(cacheKey);

  if (cached) {
    return res.json(cached);
  }

  const result = await cropAgent.recommendCrops(req.body);
  cache.set(cacheKey, result);
  res.json(result);
});
```

5. **Use faster AI models:**
```bash
# In .env
ANTHROPIC_MODEL=claude-3-haiku-20240307  # 3x faster than sonnet
OPENAI_MODEL=gpt-3.5-turbo  # 10x faster than gpt-4
```

---

### Issue: High memory usage

**Symptoms:**
```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

**Solutions:**

1. **Increase Node.js heap size:**
```bash
# In package.json
"scripts": {
  "start": "node --max-old-space-size=4096 api/server.js"
}

# Or set environment variable
export NODE_OPTIONS="--max-old-space-size=4096"
```

2. **Monitor memory usage:**
```javascript
setInterval(() => {
  const usage = process.memoryUsage();
  console.log({
    rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`
  });
}, 60000);  // Every minute
```

3. **Fix memory leaks:**
```javascript
// Close database cursors
const cursor = Collection.find({}).cursor();
try {
  await cursor.eachAsync(async (doc) => {
    // Process
  });
} finally {
  await cursor.close();  // Prevent leak
}

// Clear timers
const timerId = setInterval(() => {}, 1000);
clearInterval(timerId);  // When done

// Remove event listeners
emitter.on('event', handler);
emitter.off('event', handler);  // When done
```

4. **Implement pagination:**
```javascript
// Instead of loading all results:
const allFarmers = await Farmer.find({});  // ❌ Can cause memory issues

// Use pagination:
const page = 1;
const limit = 50;
const farmers = await Farmer.find({})
  .skip((page - 1) * limit)
  .limit(limit);  // ✅ Better
```

---

### Issue: Docker container uses too much CPU

**Symptoms:**
- Docker container CPU > 80%
- System becomes slow

**Solutions:**

1. **Limit container CPU:**
```yaml
# docker-compose.yml
services:
  api:
    cpus: "1.0"  # Limit to 1 CPU
    mem_limit: 1g  # Limit memory
```

2. **Check for infinite loops:**
```bash
# Get container stats
docker stats

# Check logs for repeated errors
docker logs ai_farmer_api_1 | tail -100
```

3. **Reduce AI request frequency:**
```javascript
// Implement request throttling
const throttle = require('lodash.throttle');

const throttledRecommend = throttle(
  async (params) => await agent.recommend(params),
  2000  // Max once per 2 seconds
);
```

---

## Common Error Messages

### Error: "ECONNRESET"

**Meaning:** Connection was forcefully closed

**Common Causes:**
- Network interruption
- Server restart
- Timeout

**Solutions:**
- Implement retry logic
- Increase timeout
- Check network stability

---

### Error: "ENOTFOUND"

**Meaning:** DNS lookup failed

**Common Causes:**
- Invalid hostname
- DNS server not responding
- No internet connection

**Solutions:**
```bash
# Check DNS resolution
nslookup api.anthropic.com
nslookup api.openai.com

# Try different DNS
# In /etc/resolv.conf:
nameserver 8.8.8.8
nameserver 8.8.4.4
```

---

### Error: "ERR_HTTP_HEADERS_SENT"

**Meaning:** Headers already sent to client

**Common Causes:**
- Calling res.send() or res.json() twice
- Calling next() after sending response

**Solutions:**
```javascript
// Wrong:
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok' });
  res.json({ status: 'ok' });  // ❌ Error!
});

// Correct:
app.get('/api/test', (req, res) => {
  return res.json({ status: 'ok' });  // ✅ Use return
});
```

---

### Error: "ValidationError"

**Meaning:** Mongoose schema validation failed

**Common Causes:**
- Required field missing
- Wrong data type
- Value doesn't match enum

**Solutions:**
```javascript
// Check exact error
try {
  await farmer.save();
} catch (error) {
  if (error.name === 'ValidationError') {
    console.log('Validation errors:', error.errors);
    // {
    //   name: { message: 'Path `name` is required.' },
    //   farmSize: { message: 'farmSize must be a number' }
    // }
  }
}
```

---

## Debugging Tips

### Enable Debug Logging

```bash
# Set environment variable
DEBUG=* npm start

# Or specific modules
DEBUG=express:*,mongoose:* npm start

# In Docker
docker-compose up -d
docker logs -f ai_farmer_api_1
```

### Use Node.js Debugger

```bash
# Start with inspector
node --inspect api/server.js

# In Chrome, go to:
chrome://inspect

# Click "inspect" on your Node process
```

### Monitor API Requests

```bash
# Use httpie for better formatting
http POST localhost:3000/api/crops/recommend \
  location:='{"country":"India","region":"Punjab"}' \
  soilType=loam \
  farmSize:=5

# Or use Postman
# Import collection from docs/postman/
```

### Check System Resources

```bash
# CPU and memory
htop
top

# Disk space
df -h

# Docker resources
docker stats

# Network connections
netstat -tuln
```

### Validate JSON

```bash
# Use jq to validate and format
cat request.json | jq .

# Check if file is valid JSON
jq empty request.json && echo "Valid" || echo "Invalid"
```

---

## Getting Help

### Before Asking for Help

1. **Check logs:**
```bash
# Application logs
docker logs ai_farmer_api_1

# MongoDB logs
docker logs ai_farmer_mongodb_1

# N8N logs
docker logs ai_farmer_n8n_1
```

2. **Verify environment:**
```bash
# Node version
node --version  # Should be 18+

# Docker version
docker --version  # Should be 20+

# Docker Compose version
docker-compose --version  # Should be 2+
```

3. **Test basic functionality:**
```bash
# Health check
curl http://localhost:3000/health

# Database connection
docker exec ai_farmer_mongodb_1 mongosh --eval "db.adminCommand('ping')"
```

### Information to Include

When asking for help, include:

1. **Environment details:**
   - Operating system and version
   - Node.js version
   - Docker version
   - MongoDB version

2. **Error messages:**
   - Full error message
   - Stack trace
   - Relevant log entries

3. **Steps to reproduce:**
   - What were you trying to do?
   - What commands did you run?
   - What was the expected result?
   - What actually happened?

4. **Configuration:**
   - .env file (remove sensitive keys!)
   - docker-compose.yml
   - Relevant code snippets

### Resources

- **Documentation:** [docs/](.)
- **API Reference:** [COMPLETE_API_REFERENCE.md](./COMPLETE_API_REFERENCE.md)
- **Setup Guide:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Developer Guide:** [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)

### Support Channels

1. **GitHub Issues:**
   - For bugs and feature requests
   - Include reproduction steps

2. **Community Forum:**
   - For questions and discussions
   - Share experiences and solutions

3. **Email Support:**
   - For private/sensitive issues

---

## Appendix: Diagnostic Scripts

### Script 1: System Check

```bash
#!/bin/bash
# check-system.sh

echo "=== System Diagnostic ==="
echo ""

echo "Node.js version:"
node --version

echo ""
echo "npm version:"
npm --version

echo ""
echo "Docker version:"
docker --version

echo ""
echo "Docker Compose version:"
docker-compose --version

echo ""
echo "MongoDB version (if installed locally):"
mongosh --version 2>/dev/null || echo "Not installed locally"

echo ""
echo "Running containers:"
docker ps

echo ""
echo "Container health:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "Disk space:"
df -h /

echo ""
echo "Memory usage:"
free -h

echo ""
echo "=== End Diagnostic ==="
```

### Script 2: Connection Test

```bash
#!/bin/bash
# test-connections.sh

echo "=== Connection Tests ==="
echo ""

echo "Testing API..."
curl -s http://localhost:3000/health && echo "✅ API OK" || echo "❌ API Failed"

echo ""
echo "Testing MongoDB..."
docker exec ai_farmer_mongodb_1 mongosh --quiet --eval "db.adminCommand('ping').ok" && echo "✅ MongoDB OK" || echo "❌ MongoDB Failed"

echo ""
echo "Testing N8N..."
curl -s http://localhost:8080 > /dev/null && echo "✅ N8N OK" || echo "❌ N8N Failed"

echo ""
echo "Testing AI Providers..."

if [ -n "$ANTHROPIC_API_KEY" ]; then
  curl -s -X POST https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{"model":"claude-3-haiku-20240307","max_tokens":10,"messages":[{"role":"user","content":"test"}]}' \
    > /dev/null && echo "✅ Anthropic OK" || echo "❌ Anthropic Failed"
fi

echo ""
echo "=== End Connection Tests ==="
```

Make these scripts executable:
```bash
chmod +x check-system.sh test-connections.sh
```

Run them:
```bash
./check-system.sh
./test-connections.sh
```

---

This troubleshooting guide should help you resolve most common issues. If you encounter a problem not covered here, please refer to the other documentation or seek support through the appropriate channels.
