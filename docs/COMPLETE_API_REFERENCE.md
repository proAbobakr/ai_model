# Complete API Reference

## Base URL
```
http://localhost:3000/api
```

## Table of Contents
1. [Authentication](#authentication)
2. [Annual Crops API](#annual-crops-api)
3. [Tree Crops & Palms API](#tree-crops--palms-api)
4. [Fertilizer API](#fertilizer-api)
5. [Farming Techniques API](#farming-techniques-api)
6. [Water Management API](#water-management-api)
7. [Farmer Management API](#farmer-management-api)
8. [Error Responses](#error-responses)
9. [Rate Limiting](#rate-limiting)

---

## Authentication

Currently, the API does not require authentication for development. In production, implement JWT-based authentication.

**Future Headers**:
```
Authorization: Bearer <token>
```

---

## Annual Crops API

### Get Crop Recommendations

Get AI-powered recommendations for annual crops based on location and conditions.

**Endpoint**: `POST /api/crops/recommend`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "region": "North India",
    "country": "India"
  },
  "soilType": "loamy",
  "season": "monsoon",
  "farmSize": "5 acres",
  "waterAvailability": "moderate",
  "experience": "intermediate",
  "budget": "moderate",
  "marketAccess": true
}
```

**Parameters**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| location.latitude | number | Yes | Geographic latitude |
| location.longitude | number | Yes | Geographic longitude |
| location.region | string | No | Region name |
| location.country | string | No | Country name |
| soilType | string | Yes | Soil type (sandy, loamy, clay, etc.) |
| season | string | Yes | Current season |
| farmSize | string | Yes | Farm size with unit |
| waterAvailability | string | No | Water availability level |
| experience | string | No | Farmer experience level |
| budget | string | No | Budget level |
| marketAccess | boolean | No | Market access availability |

**Success Response (200)**:
```json
{
  "success": true,
  "location": {
    "climateZone": "tropical",
    "region": "North India",
    "country": "India",
    "coordinates": {
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  },
  "recommendations": {
    "crops": [
      {
        "name": "Rice",
        "scientificName": "Oryza sativa",
        "suitabilityScore": 9,
        "reason": "Excellent climate match...",
        "expectedYield": "4000 kg/hectare",
        "growingDuration": "90-120 days",
        "waterRequirement": "High (1200-2000mm)",
        "soilRequirement": "Clay or clay loam",
        "marketDemand": "Very high",
        "profitability": "High with good management",
        "challenges": ["Stem borer", "Blast disease"],
        "solutions": ["Use resistant varieties", "Proper water management"],
        "plantingTime": "June-July",
        "harvestTime": "October-November"
      }
    ],
    "generalAdvice": "Focus on water management...",
    "riskFactors": ["Flooding risk during monsoon"],
    "successTips": ["Use certified seeds", "Monitor pests weekly"]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "metadata": {
    "soilType": "loamy",
    "season": "monsoon"
  }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "error": "Missing required fields: location, soilType, season"
}
```

**Example cURL**:
```bash
curl -X POST http://localhost:3000/api/crops/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090,
      "region": "Delhi"
    },
    "soilType": "loamy",
    "season": "winter",
    "farmSize": "10 acres"
  }'
```

**Example JavaScript**:
```javascript
const response = await fetch('http://localhost:3000/api/crops/recommend', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      region: 'Delhi'
    },
    soilType: 'loamy',
    season: 'winter',
    farmSize: '10 acres'
  })
});

const data = await response.json();
console.log(data);
```

---

### Get Crop Details

Get detailed information about a specific crop for a location.

**Endpoint**: `GET /api/crops/:cropName`

**URL Parameters**:
- `cropName`: Name of the crop (e.g., wheat, rice, tomato)

**Query Parameters**:
- `latitude` (required): Location latitude
- `longitude` (required): Location longitude
- `region` (optional): Region name

**Example Request**:
```
GET /api/crops/wheat?latitude=28.6&longitude=77.2&region=Punjab
```

**Success Response (200)**:
```json
{
  "success": true,
  "crop": "wheat",
  "location": {
    "climateZone": "temperate",
    "region": "Punjab"
  },
  "knowledgeBase": {
    "name": "Wheat",
    "scientificName": "Triticum aestivum",
    "category": "cereal",
    "climateZones": ["temperate"],
    "optimalTemperature": {"min": 15, "max": 25},
    "soilTypes": ["loamy", "clay loam"],
    "phRange": {"min": 6.0, "max": 7.5}
  },
  "detailedGuide": {
    "monthByMonth": {...},
    "pestManagement": {...},
    "fertilizerSchedule": {...}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Compare Crops

Compare multiple crops for a specific location.

**Endpoint**: `POST /api/crops/compare`

**Request Body**:
```json
{
  "crops": ["wheat", "rice", "corn"],
  "location": {
    "latitude": 28.6,
    "longitude": 77.2,
    "region": "North India"
  },
  "criteria": {
    "profitability": true,
    "waterRequirement": true,
    "laborRequirement": true,
    "marketDemand": true
  }
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "crops": ["wheat", "rice", "corn"],
  "location": {...},
  "comparison": {
    "table": [...],
    "recommendation": "Based on your criteria, wheat is the best choice...",
    "analysis": {...}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Tree Crops & Palms API

### Get Tree Crop Recommendations

Get recommendations for perennial tree crops and palms.

**Endpoint**: `POST /api/trees/recommend`

**Request Body**:
```json
{
  "location": {
    "latitude": 25.2048,
    "longitude": 55.2708,
    "region": "UAE"
  },
  "soilType": "sandy",
  "waterAvailability": "limited",
  "farmSize": "20 acres",
  "experience": "intermediate",
  "budget": "high",
  "timeframe": "long-term",
  "purpose": "commercial"
}
```

**Parameters**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| location | object | Yes | Location details |
| soilType | string | Yes | Soil type |
| waterAvailability | string | No | Water availability |
| farmSize | string | Yes | Farm size |
| experience | string | No | Farmer experience |
| budget | string | No | Budget level |
| timeframe | string | No | Investment timeframe |
| purpose | string | No | Farming purpose |

**Success Response (200)**:
```json
{
  "success": true,
  "location": {
    "climateZone": "arid",
    "region": "UAE",
    "nearCoast": false,
    "isArid": true,
    "suitableFor": ["date palm", "olive", "pomegranate"]
  },
  "recommendations": {
    "trees": [
      {
        "name": "Date Palm",
        "scientificName": "Phoenix dactylifera",
        "category": "palm",
        "suitabilityScore": 10,
        "reason": "Perfect climate match for date palm...",
        "timeline": {
          "firstHarvest": "4-5 years",
          "fullProduction": "8-10 years",
          "productiveLife": "60-100 years"
        },
        "yield": {
          "perTree": "50-200 kg/tree",
          "perAcre": "3,400-13,600 kg/acre"
        },
        "spacing": {
          "distance": "8x8 meters",
          "treesPerAcre": 68
        },
        "waterRequirement": "Moderate once established...",
        "soilRequirement": "Well-drained sandy soil",
        "investment": {
          "initial": "$5,000-10,000 per acre",
          "annual": "$1,000-2,000 per acre",
          "breakEven": "8-12 years"
        },
        "profitability": "Very high for premium varieties...",
        "marketDemand": "Very high, growing internationally",
        "management": ["Annual pruning", "Manual pollination", "Pest monitoring"],
        "challenges": ["Red palm weevil", "Initial high investment"],
        "successFactors": ["Quality offshoots", "Proper pollination", "Pest prevention"]
      }
    ],
    "generalAdvice": "Date palms are ideal for your climate...",
    "riskFactors": ["Red palm weevil infestation"],
    "successTips": ["Source certified offshoots", "Install pheromone traps"],
    "financialPlanning": "Plan for 5-year zero income period..."
  },
  "cropType": "perennial",
  "timeframe": "Multi-year investment",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Get Tree Cultivation Guide

Get complete cultivation guide for a specific tree crop.

**Endpoint**: `GET /api/trees/:treeName/guide`

**URL Parameters**:
- `treeName`: Name of tree (e.g., date_palm, mango, citrus)

**Query Parameters**:
- `latitude` (required)
- `longitude` (required)
- `region` (optional)

**Example Request**:
```
GET /api/trees/mango/guide?latitude=19.0&longitude=72.8&region=Maharashtra
```

**Success Response (200)**:
```json
{
  "success": true,
  "tree": "mango",
  "location": {...},
  "knowledgeBase": {
    "name": "Mango",
    "varieties": [...],
    "lifecycle": {...}
  },
  "cultivationGuide": {
    "siteSelection": {...},
    "planting": {...},
    "yearByYear": [...],
    "irrigationManagement": {...},
    "fertilizationProgram": {...},
    "pruning": {...},
    "pestManagement": {...},
    "harvesting": {...},
    "economicAnalysis": {...}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Compare Tree Crops

Compare multiple tree crops for investment decision.

**Endpoint**: `POST /api/trees/compare`

**Request Body**:
```json
{
  "trees": ["date_palm", "mango", "citrus"],
  "location": {
    "region": "Rajasthan",
    "latitude": 27,
    "longitude": 74
  },
  "criteria": {
    "timeToProduction": true,
    "profitability": true,
    "waterRequirement": true
  }
}
```

---

### Get Intercropping Recommendations

Get intercropping recommendations for tree orchards.

**Endpoint**: `POST /api/trees/intercropping`

**Request Body**:
```json
{
  "mainTree": "mango",
  "location": {
    "region": "Maharashtra"
  },
  "farmSize": "10 acres"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "mainTree": "mango",
  "intercroppingAdvice": {
    "annualCrops": [...],
    "coverCrops": [...],
    "companionTrees": [...],
    "livestockIntegration": [...],
    "economicBenefits": {...}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Get Pruning Guide

Get age-specific pruning guide for tree crops.

**Endpoint**: `GET /api/trees/:treeName/pruning`

**URL Parameters**:
- `treeName`: Name of tree

**Query Parameters**:
- `age` (required): Tree age in years

**Example Request**:
```
GET /api/trees/mango/pruning?age=5
```

**Success Response (200)**:
```json
{
  "success": true,
  "tree": "mango",
  "age": "5",
  "knowledgeBase": {...},
  "detailedGuide": {
    "objectives": [...],
    "timing": {...},
    "techniques": {...},
    "stepByStep": [...],
    "specialConsiderations": [...],
    "commonMistakes": [...]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Browse Trees by Category

Get list of trees by category.

**Endpoint**: `GET /api/trees/category/:category`

**URL Parameters**:
- `category`: Category name (palm, fruit_tree, nut_tree, all)

**Example Request**:
```
GET /api/trees/category/palm
```

**Success Response (200)**:
```json
{
  "success": true,
  "category": "palm",
  "count": 2,
  "trees": [
    {
      "id": "date_palm",
      "name": "Date Palm",
      "scientificName": "Phoenix dactylifera",
      "category": "palm",
      "description": "..."
    },
    {
      "id": "coconut",
      "name": "Coconut Palm",
      "scientificName": "Cocos nucifera",
      "category": "palm",
      "description": "..."
    }
  ]
}
```

---

### Get Tree Information

Get complete information about a specific tree from knowledge base.

**Endpoint**: `GET /api/trees/info/:treeName`

**Example Request**:
```
GET /api/trees/info/date_palm
```

**Success Response (200)**:
```json
{
  "success": true,
  "tree": {
    "id": "date_palm",
    "name": "Date Palm",
    "scientificName": "Phoenix dactylifera",
    "category": "palm",
    "type": "perennial",
    "description": "...",
    "climateZones": ["arid", "semi-arid"],
    "optimalTemperature": {...},
    "soilTypes": [...],
    "waterRequirements": {...},
    "spacing": {...},
    "lifecycle": {...},
    "varieties": [...],
    "nutrients": {...},
    "yield": {...},
    "commonPests": [...],
    "commonDiseases": [...],
    "pruning": {...},
    "pollination": {...},
    "harvest": {...},
    "marketInfo": {...},
    "specialRequirements": [...]
  }
}
```

---

## Fertilizer API

### Get Fertilizer Recommendations

Get customized fertilizer recommendations based on crop and soil analysis.

**Endpoint**: `POST /api/fertilizer/recommend`

**Request Body**:
```json
{
  "crop": "wheat",
  "soilAnalysis": {
    "soilType": "loamy",
    "ph": 6.5,
    "nitrogen": "low",
    "phosphorus": "medium",
    "potassium": "high",
    "organicMatter": 2.5
  },
  "growthStage": "vegetative",
  "farmSize": "10 acres",
  "budget": "moderate",
  "preferredType": "balanced",
  "previousFertilization": null
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "crop": "wheat",
  "growthStage": "vegetative",
  "npkRequirements": {
    "nitrogen": 156,
    "phosphorus": 60,
    "potassium": 28,
    "pH": 6.5
  },
  "soilAnalysis": {...},
  "recommendation": {
    "primaryFertilizers": [
      {
        "name": "Urea",
        "formula": "46-0-0",
        "quantity": 340,
        "unit": "kg/acre",
        "applicationMethod": "Broadcasting",
        "timing": "Split application"
      }
    ],
    "secondaryNutrients": {...},
    "micronutrients": {...},
    "applicationSchedule": [...],
    "costEstimate": {...}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Analyze Soil Deficiencies

Analyze soil test results and identify deficiencies.

**Endpoint**: `POST /api/fertilizer/soil-analysis`

**Request Body**:
```json
{
  "soilAnalysis": {
    "ph": 5.5,
    "nitrogen": "very low",
    "phosphorus": "low",
    "potassium": "medium",
    "organicMatter": 1.2,
    "calcium": "low"
  }
}
```

---

### Get Organic Alternatives

Get organic alternatives to synthetic fertilizers.

**Endpoint**: `POST /api/fertilizer/organic-alternatives`

**Request Body**:
```json
{
  "syntheticFertilizer": "NPK 20-10-10, 100 kg/acre"
}
```

---

### Create Fertilization Schedule

Create detailed fertilization schedule for crop lifecycle.

**Endpoint**: `POST /api/fertilizer/schedule`

**Request Body**:
```json
{
  "crop": "tomato",
  "plantingDate": "2024-03-01",
  "expectedHarvestDate": "2024-06-15",
  "soilAnalysis": {...},
  "farmingType": "organic"
}
```

---

## Farming Techniques API

### Get Farming Techniques

Get comprehensive farming techniques for a crop.

**Endpoint**: `POST /api/farming/techniques`

**Request Body**:
```json
{
  "crop": "tomato",
  "farmSize": "2 acres",
  "experience": "beginner",
  "farmingStyle": "organic",
  "location": {
    "region": "Maharashtra"
  },
  "specificInterest": "pest management"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "crop": "tomato",
  "farmingStyle": "organic",
  "techniques": {
    "landPreparation": {...},
    "plantingTechniques": {...},
    "cropManagement": {...},
    "pestDiseaseManagement": {...},
    "harvesting": {...},
    "postHarvest": {...},
    "sustainablePractices": {...},
    "modernTechniques": {...},
    "traditionalWisdom": {...},
    "commonMistakes": [...]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Get Pest Management Strategies

Get detailed pest and disease management strategies.

**Endpoint**: `POST /api/farming/pest-management`

**Request Body**:
```json
{
  "crop": "tomato",
  "pest": "tomato hornworm",
  "disease": null,
  "approach": "integrated",
  "severity": "moderate"
}
```

---

### Get Crop Rotation Recommendations

Get crop rotation plan for soil health and pest control.

**Endpoint**: `POST /api/farming/crop-rotation`

**Request Body**:
```json
{
  "currentCrop": "wheat",
  "previousCrops": ["rice", "corn"],
  "location": {
    "region": "Punjab"
  },
  "farmSize": "20 acres",
  "soilType": "loamy",
  "objectives": ["soil_health", "pest_control", "profitability"]
}
```

---

### Get Sustainable Practices

Get sustainable farming practices recommendations.

**Endpoint**: `POST /api/farming/sustainable-practices`

**Request Body**:
```json
{
  "farmType": "mixed",
  "size": "15 acres",
  "currentPractices": ["conventional"],
  "goals": ["reduce_chemical_use", "improve_soil_health"],
  "budget": "moderate"
}
```

---

### Get Organic Farming Guide

Get complete organic farming guide for a crop.

**Endpoint**: `GET /api/farming/organic-guide/:crop`

**Query Parameters**:
- `transitionStage`: beginner, intermediate, advanced

**Example Request**:
```
GET /api/farming/organic-guide/tomato?transitionStage=beginner
```

---

## Water Management API

### Generate Irrigation Schedule

Get customized irrigation schedule.

**Endpoint**: `POST /api/water/irrigation-schedule`

**Request Body**:
```json
{
  "crop": "wheat",
  "soilType": "loamy",
  "climate": "temperate",
  "farmSize": "10 acres",
  "irrigationSystem": "drip",
  "waterSource": "well",
  "growthStage": "vegetative",
  "rainfall": "low",
  "temperature": "25°C"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "crop": "wheat",
  "growthStage": "vegetative",
  "irrigationSystem": "drip",
  "waterRequirements": {
    "dailyRequirement": 4.58,
    "seasonalRequirement": {...},
    "criticalStages": ["tillering", "flowering", "grain filling"]
  },
  "schedule": {
    "frequency": "Every 3-4 days",
    "duration": "2-3 hours",
    "timeOfDay": "Early morning",
    "weeklyVolume": "150 mm",
    "adjustments": {...}
  },
  "conservationTips": [...],
  "monitoringIndicators": [...],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Analyze Water Quality

Analyze water quality test results.

**Endpoint**: `POST /api/water/quality-analysis`

**Request Body**:
```json
{
  "waterTestResults": {
    "ph": 7.2,
    "electricalConductivity": 1.5,
    "totalDissolvedSolids": 950,
    "chloride": 150,
    "sodium": 200,
    "calcium": 80,
    "magnesium": 30
  }
}
```

---

### Get Water Conservation Strategies

Get water conservation recommendations.

**Endpoint**: `POST /api/water/conservation-strategies`

**Request Body**:
```json
{
  "farmType": "crop",
  "currentWaterUsage": "high",
  "waterAvailability": "limited",
  "budget": "moderate",
  "climate": "arid",
  "crops": ["wheat", "corn"]
}
```

---

### Create Drought Management Plan

Create emergency drought management plan.

**Endpoint**: `POST /api/water/drought-management`

**Request Body**:
```json
{
  "severityLevel": "severe",
  "crop": "wheat",
  "growthStage": "flowering",
  "waterAvailable": "30% of normal",
  "farmSize": "20 acres",
  "priorityCrops": ["wheat"]
}
```

---

## Farmer Management API

### Register Farmer

Create new farmer profile.

**Endpoint**: `POST /api/farmers/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "region": "Punjab",
    "country": "India",
    "address": "Village ABC, District XYZ"
  },
  "farmDetails": {
    "farmSize": "10 acres",
    "soilType": "loamy",
    "waterSource": "well",
    "irrigationSystem": "drip",
    "currentCrops": ["wheat", "rice"],
    "farmingExperience": "5 years",
    "farmingStyle": "conventional"
  },
  "preferences": {
    "language": "en",
    "notificationsEnabled": true
  }
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "farmer": {
    "farmerId": "uuid-here",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Farmer registered successfully"
}
```

---

### Get Farmer Profile

Get farmer profile by ID.

**Endpoint**: `GET /api/farmers/:farmerId`

---

### Update Farmer Profile

Update farmer profile.

**Endpoint**: `PUT /api/farmers/:farmerId`

---

### Get Query History

Get farmer's query history.

**Endpoint**: `GET /api/farmers/:farmerId/history`

**Query Parameters**:
- `limit`: Number of records (default: 20)
- `skip`: Number of records to skip (default: 0)

---

## Error Responses

### Standard Error Format

All errors follow this format:

```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

### Common Errors

**Missing Required Fields**:
```json
{
  "success": false,
  "error": "Missing required fields: location, soilType"
}
```

**Invalid Parameters**:
```json
{
  "success": false,
  "error": "Invalid soilType. Must be one of: sandy, loamy, clay, silt"
}
```

**AI Provider Error**:
```json
{
  "success": false,
  "error": "Failed to generate recommendations",
  "message": "AI provider API key is invalid or rate limit exceeded"
}
```

---

## Rate Limiting

**Default Limits**:
- Window: 15 minutes
- Max Requests: 100 per window

**Response Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642251600
```

**Rate Limit Exceeded Response (429)**:
```json
{
  "success": false,
  "error": "Too many requests from this IP, please try again later.",
  "retryAfter": 900
}
```

---

## Best Practices

### 1. Always Include Location Data

Location is critical for accurate recommendations:
```json
{
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "region": "Delhi",
    "country": "India"
  }
}
```

### 2. Provide Soil Analysis When Available

More data = better recommendations:
```json
{
  "soilAnalysis": {
    "soilType": "loamy",
    "ph": 6.5,
    "nitrogen": "low",
    "phosphorus": "medium",
    "potassium": "high"
  }
}
```

### 3. Specify Growth Stage

Different stages need different care:
```json
{
  "growthStage": "flowering"  // vegetative, flowering, fruiting
}
```

### 4. Handle Errors Gracefully

Always check `success` field:
```javascript
if (data.success) {
  // Process recommendations
} else {
  // Handle error
  console.error(data.error);
}
```

### 5. Cache Responses

Cache static data like knowledge base entries:
```javascript
// Cache tree information
const cacheKey = `tree_${treeName}`;
if (cache.has(cacheKey)) {
  return cache.get(cacheKey);
}
```

---

## Testing with Different Tools

### cURL

```bash
curl -X POST http://localhost:3000/api/crops/recommend \
  -H "Content-Type: application/json" \
  -d @request.json
```

### Postman

1. Import collection from `docs/postman_collection.json`
2. Set environment variables
3. Run requests

### HTTPie

```bash
http POST localhost:3000/api/crops/recommend \
  location:='{"latitude":28.6,"longitude":77.2}' \
  soilType=loamy \
  season=monsoon \
  farmSize="5 acres"
```

### Python

```python
import requests

response = requests.post(
    'http://localhost:3000/api/crops/recommend',
    json={
        'location': {'latitude': 28.6, 'longitude': 77.2},
        'soilType': 'loamy',
        'season': 'monsoon',
        'farmSize': '5 acres'
    }
)

data = response.json()
print(data)
```

---

## Support

For API issues or questions:
- Check logs: `logs/combined.log`
- API status: `GET /health`
- GitHub Issues: [Create Issue]
- Documentation: `docs/`
