# N8N Workflows for Farmer Learning Platform

This directory contains n8n workflow configurations that orchestrate the AI agents and manage data flow.

## Workflows

### 1. Main Orchestrator (`main_orchestrator.json`)
- **Purpose**: Routes incoming farmer queries to appropriate AI agents
- **Endpoints**: `/webhook/farmer-query`
- **Features**:
  - Query type routing (crops, fertilizer, farming, water)
  - Multi-agent coordination
  - Response aggregation
  - Database logging

### 2. Crop Analysis Pipeline (`crop_analysis_pipeline.json`)
- **Purpose**: Comprehensive crop analysis workflow
- **Endpoints**: `/webhook/crop-analysis`
- **Features**:
  - Input validation
  - Multi-step crop recommendations
  - Fertilizer planning for top crops
  - Irrigation scheduling
  - Complete analysis storage

## Importing Workflows

1. Access n8n UI at `http://localhost:5678`
2. Login with credentials (from docker-compose.yml)
3. Click "Workflows" → "Import from File"
4. Select workflow JSON files from this directory
5. Activate each workflow

## Workflow Architecture

```
Farmer Request
      ↓
   Webhook
      ↓
  Validation
      ↓
   Routing
      ↓
  ┌────┴────┬─────────┬──────────┐
  ↓         ↓         ↓          ↓
Crop    Fertilizer  Farming   Water
Agent     Agent      Agent    Agent
  │         │         │          │
  └────┬────┴─────┬───┴──────────┘
       ↓          ↓
   Aggregate  Database
       ↓
    Response
```

## Webhook URLs

After importing and activating workflows:

- **Main Orchestrator**: `http://localhost:5678/webhook/farmer-query`
- **Crop Analysis**: `http://localhost:5678/webhook/crop-analysis`

## Testing Workflows

### Test Main Orchestrator

```bash
curl -X POST http://localhost:5678/webhook/farmer-query \
  -H "Content-Type: application/json" \
  -d '{
    "queryType": "crop_recommendation",
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090,
      "region": "North India"
    },
    "soilType": "loamy",
    "season": "monsoon",
    "farmSize": "5 acres"
  }'
```

### Test Crop Analysis Pipeline

```bash
curl -X POST http://localhost:5678/webhook/crop-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090,
      "region": "North India"
    },
    "soilType": "loamy",
    "season": "spring",
    "farmSize": "10 acres",
    "waterAvailability": "high",
    "budget": "moderate"
  }'
```

## Customizing Workflows

### Adding New Agents

1. Open workflow in n8n editor
2. Add new "HTTP Request" node
3. Configure endpoint URL
4. Connect to routing logic
5. Update aggregation function
6. Save and activate

### Modifying Logic

1. Edit "Function" nodes for custom JavaScript logic
2. Modify "Switch" nodes for routing conditions
3. Update "Set" nodes for data transformation

## Monitoring

N8N provides built-in monitoring:

1. **Execution History**: View all workflow runs
2. **Error Tracking**: See failed executions
3. **Performance**: Monitor execution times
4. **Logs**: Detailed execution logs

## Best Practices

1. **Error Handling**: All workflows include error branches
2. **Logging**: Important data is logged to MongoDB
3. **Validation**: Input validation prevents bad data
4. **Idempotency**: Workflows can be safely retried
5. **Timeouts**: Long-running operations have timeouts

## Troubleshooting

### Workflow Not Triggering
- Check webhook is active
- Verify URL is correct
- Check n8n logs

### Agent Not Responding
- Verify API server is running
- Check agent endpoints
- Review error logs

### Database Issues
- Confirm MongoDB connection
- Check credentials
- Verify collection names

## Advanced Configuration

### Environment Variables in N8N

Configure in n8n settings or environment:

```env
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password
WEBHOOK_URL=http://localhost:5678/
```

### Credentials Setup

1. Go to n8n → Credentials
2. Add MongoDB credentials
3. Add HTTP credentials (if needed)
4. Reference in workflow nodes

## Integration with API

The workflows call the REST API endpoints:

- `POST /api/crops/recommend`
- `POST /api/fertilizer/recommend`
- `POST /api/farming/techniques`
- `POST /api/water/irrigation-schedule`

Ensure the API server is running before activating workflows.
