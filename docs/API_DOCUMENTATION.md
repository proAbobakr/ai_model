# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Table of Contents
1. [Crop Recommendations](#crop-recommendations)
2. [Fertilizer Advice](#fertilizer-advice)
3. [Farming Techniques](#farming-techniques)
4. [Water Management](#water-management)
5. [Farmer Management](#farmer-management)

---

## Crop Recommendations

### Get Crop Recommendations

Get AI-powered crop recommendations based on location, soil, and other factors.

**Endpoint:** `POST /api/crops/recommend`

**Request Body:**
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

**Response:**
```json
{
  "success": true,
  "location": {
    "climateZone": "tropical",
    "region": "North India",
    "country": "India",
    "coordinates": { "latitude": 28.6139, "longitude": 77.2090 }
  },
  "recommendations": {
    "crops": [
      {
        "name": "Rice",
        "scientificName": "Oryza sativa",
        "suitabilityScore": 9,
        "reason": "...",
        "expectedYield": "4000 kg/hectare",
        "growingDuration": "90-120 days",
        "waterRequirement": "High (1200-2000mm)",
        "marketDemand": "Very high",
        "profitability": "...",
        "challenges": ["..."],
        "solutions": ["..."]
      }
    ],
    "generalAdvice": "...",
    "riskFactors": ["..."],
    "successTips": ["..."]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Get Crop Details

**Endpoint:** `GET /api/crops/:cropName`

**Query Parameters:**
- `latitude` (required): Location latitude
- `longitude` (required): Location longitude
- `region` (optional): Region name

**Example:**
```
GET /api/crops/wheat?latitude=28.6139&longitude=77.2090&region=Punjab
```

### Compare Crops

**Endpoint:** `POST /api/crops/compare`

**Request Body:**
```json
{
  "crops": ["wheat", "rice", "corn"],
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "region": "North India"
  },
  "criteria": {
    "profitability": true,
    "waterRequirement": true,
    "marketDemand": true
  }
}
```

---

## Fertilizer Advice

### Get Fertilizer Recommendations

**Endpoint:** `POST /api/fertilizer/recommend`

**Request Body:**
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
  "preferredType": "balanced"
}
```

**Response:**
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
  "recommendation": {
    "primaryFertilizers": [...],
    "secondaryNutrients": {...},
    "micronutrients": {...},
    "applicationSchedule": [...],
    "costEstimate": {...}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Analyze Soil Deficiencies

**Endpoint:** `POST /api/fertilizer/soil-analysis`

**Request Body:**
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

### Get Organic Alternatives

**Endpoint:** `POST /api/fertilizer/organic-alternatives`

**Request Body:**
```json
{
  "syntheticFertilizer": "NPK 20-10-10, 100 kg/acre"
}
```

### Create Fertilization Schedule

**Endpoint:** `POST /api/fertilizer/schedule`

**Request Body:**
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

## Farming Techniques

### Get Farming Techniques

**Endpoint:** `POST /api/farming/techniques`

**Request Body:**
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

### Get Pest Management

**Endpoint:** `POST /api/farming/pest-management`

**Request Body:**
```json
{
  "crop": "tomato",
  "pest": "tomato hornworm",
  "disease": null,
  "approach": "integrated",
  "severity": "moderate"
}
```

### Get Crop Rotation

**Endpoint:** `POST /api/farming/crop-rotation`

**Request Body:**
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

### Get Sustainable Practices

**Endpoint:** `POST /api/farming/sustainable-practices`

**Request Body:**
```json
{
  "farmType": "mixed",
  "size": "15 acres",
  "currentPractices": ["conventional"],
  "goals": ["reduce_chemical_use", "improve_soil_health"],
  "budget": "moderate"
}
```

### Get Organic Farming Guide

**Endpoint:** `GET /api/farming/organic-guide/:crop`

**Query Parameters:**
- `transitionStage` (optional): beginner, intermediate, advanced

**Example:**
```
GET /api/farming/organic-guide/tomato?transitionStage=beginner
```

---

## Water Management

### Generate Irrigation Schedule

**Endpoint:** `POST /api/water/irrigation-schedule`

**Request Body:**
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

**Response:**
```json
{
  "success": true,
  "crop": "wheat",
  "growthStage": "vegetative",
  "irrigationSystem": "drip",
  "waterRequirements": {
    "dailyRequirement": 4.58,
    "seasonalRequirement": {...},
    "criticalStages": [...]
  },
  "schedule": {
    "frequency": "...",
    "duration": "...",
    "weeklyVolume": "..."
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Analyze Water Quality

**Endpoint:** `POST /api/water/quality-analysis`

**Request Body:**
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

### Get Conservation Strategies

**Endpoint:** `POST /api/water/conservation-strategies`

**Request Body:**
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

### Create Drought Management Plan

**Endpoint:** `POST /api/water/drought-management`

**Request Body:**
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

## Farmer Management

### Register Farmer

**Endpoint:** `POST /api/farmers/register`

**Request Body:**
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

### Get Farmer Profile

**Endpoint:** `GET /api/farmers/:farmerId`

### Update Farmer Profile

**Endpoint:** `PUT /api/farmers/:farmerId`

### Get Query History

**Endpoint:** `GET /api/farmers/:farmerId/history`

**Query Parameters:**
- `limit` (optional): Number of records (default: 20)
- `skip` (optional): Number of records to skip (default: 0)

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per window
- **Response Header**: `X-RateLimit-Remaining`

---

## Authentication

Currently, the API does not require authentication. In production, implement JWT-based authentication.

---

## Best Practices

1. **Always validate input data** before sending requests
2. **Handle errors gracefully** on the client side
3. **Cache responses** when appropriate
4. **Respect rate limits** to avoid being blocked
5. **Use HTTPS** in production environments

---

## Support

For API issues or questions:
- GitHub Issues: [Repository URL]
- Email: support@farmerlearning.ai
