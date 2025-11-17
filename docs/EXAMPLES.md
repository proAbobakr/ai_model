# Examples and Tutorials

This guide provides practical examples and step-by-step tutorials for using the AI-Powered Farmer Learning Platform.

## Table of Contents

1. [Quick Start Examples](#quick-start-examples)
2. [Complete Use Case Tutorials](#complete-use-case-tutorials)
3. [Integration Examples](#integration-examples)
4. [Advanced Scenarios](#advanced-scenarios)
5. [N8N Workflow Examples](#n8n-workflow-examples)

---

## Quick Start Examples

### Example 1: Get Crop Recommendations

**Scenario:** A farmer in Punjab, India wants to know what crops to grow.

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

**Response:**
```json
{
  "status": "success",
  "data": {
    "recommendations": [
      {
        "crop": "Rice",
        "suitability": 95,
        "expectedYield": "4-5 tons/hectare",
        "seasonalTimeline": {
          "planting": "June-July",
          "harvest": "October-November"
        },
        "reasoning": "Punjab's clay loam soil and canal irrigation are ideal for rice cultivation during kharif season."
      }
    ]
  }
}
```

### Example 2: Get Fertilizer Recommendations

**Scenario:** Fertilizer plan for wheat crop with moderate nitrogen soil.

```javascript
const axios = require('axios');

async function getFertilizerPlan() {
  const response = await axios.post('http://localhost:3000/api/fertilizer/recommend', {
    crop: 'wheat',
    farmSize: 10,
    unit: 'hectares',
    soilAnalysis: {
      nitrogen: 'medium',
      phosphorus: 'low',
      potassium: 'medium',
      pH: 6.8
    },
    growthStage: 'pre-planting'
  });

  console.log('Fertilizer Plan:', JSON.stringify(response.data, null, 2));
}

getFertilizerPlan();
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "npkRequirements": {
      "nitrogen": 120,
      "phosphorus": 80,
      "potassium": 60,
      "unit": "kg/hectare"
    },
    "recommendations": [
      {
        "type": "Urea (46-0-0)",
        "quantity": 260.87,
        "unit": "kg/hectare",
        "timing": "Split application: 50% at sowing, 25% at tillering, 25% at flowering"
      },
      {
        "type": "Single Super Phosphate (0-16-0)",
        "quantity": 500,
        "unit": "kg/hectare",
        "timing": "Full dose at sowing"
      }
    ]
  }
}
```

### Example 3: Get Tree Crop Recommendations

**Scenario:** A farmer wants to invest in tree crops for long-term income.

```python
import requests

url = "http://localhost:3000/api/trees/recommend"
data = {
    "location": {
        "country": "Saudi Arabia",
        "region": "Al-Ahsa",
        "latitude": 25.3547,
        "longitude": 49.5860
    },
    "soilType": "sandy loam",
    "waterAvailability": "well irrigation",
    "farmSize": 2,
    "timeframe": "long-term",
    "purpose": "commercial"
}

response = requests.post(url, json=data)
print(response.json())
```

---

## Complete Use Case Tutorials

### Tutorial 1: Complete Crop Planning Workflow

**Scenario:** Plan a complete farming season from crop selection to harvest.

#### Step 1: Register as a Farmer

```bash
curl -X POST http://localhost:3000/api/farmers/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Khan",
    "location": {
      "country": "Pakistan",
      "region": "Sindh",
      "district": "Hyderabad"
    },
    "farmSize": 8,
    "contactInfo": {
      "phone": "+92-300-1234567",
      "email": "ahmed@example.com"
    }
  }'
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "farmerId": "farmer_abc123xyz",
    "message": "Farmer registered successfully"
  }
}
```

#### Step 2: Get Crop Recommendations

```bash
curl -X POST http://localhost:3000/api/crops/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "location": {
      "country": "Pakistan",
      "region": "Sindh",
      "district": "Hyderabad"
    },
    "soilType": "clay",
    "season": "rabi",
    "farmSize": 8,
    "waterAvailability": "tube well"
  }'
```

#### Step 3: Compare Multiple Crops

```bash
curl -X POST http://localhost:3000/api/crops/compare \
  -H "Content-Type: application/json" \
  -d '{
    "crops": ["wheat", "potato", "tomato"],
    "location": {
      "country": "Pakistan",
      "region": "Sindh"
    },
    "comparisonFactors": ["yield", "waterRequirement", "marketDemand"]
  }'
```

#### Step 4: Get Fertilizer Plan

```bash
curl -X POST http://localhost:3000/api/fertilizer/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "crop": "wheat",
    "farmSize": 8,
    "unit": "hectares",
    "soilAnalysis": {
      "nitrogen": "low",
      "phosphorus": "medium",
      "potassium": "medium",
      "pH": 7.2
    }
  }'
```

#### Step 5: Create Irrigation Schedule

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

#### Step 6: Get Pest Management Guide

```bash
curl -X POST http://localhost:3000/api/farming/pest-management \
  -H "Content-Type: application/json" \
  -d '{
    "crop": "wheat",
    "pestType": "aphids",
    "severity": "moderate",
    "preferences": {
      "organic": true
    }
  }'
```

---

### Tutorial 2: Setting Up Date Palm Orchard

**Scenario:** A Saudi farmer wants to establish a date palm orchard for commercial production.

#### Step 1: Get Tree Recommendations

```javascript
const axios = require('axios');

async function planDatePalmOrchard() {
  // Step 1: Get recommendations
  const recommendations = await axios.post('http://localhost:3000/api/trees/recommend', {
    location: {
      country: 'Saudi Arabia',
      region: 'Al-Qassim',
      latitude: 26.3260,
      longitude: 43.9750
    },
    soilType: 'sandy loam',
    waterAvailability: 'drip irrigation',
    farmSize: 5,
    timeframe: 'long-term',
    purpose: 'commercial'
  });

  console.log('Recommendations:', recommendations.data);

  // Step 2: Get detailed cultivation guide
  const guide = await axios.get('http://localhost:3000/api/trees/date_palm/guide', {
    params: {
      farmSize: 5,
      soilType: 'sandy loam'
    }
  });

  console.log('\nCultivation Guide:', guide.data);

  // Step 3: Get intercropping advice
  const intercropping = await axios.post('http://localhost:3000/api/trees/intercropping', {
    mainTree: 'date_palm',
    location: {
      country: 'Saudi Arabia',
      region: 'Al-Qassim'
    },
    farmSize: 5
  });

  console.log('\nIntercropping Advice:', intercropping.data);

  // Step 4: Compare with other tree crops
  const comparison = await axios.post('http://localhost:3000/api/trees/compare', {
    trees: ['date_palm', 'olive', 'pomegranate'],
    location: {
      country: 'Saudi Arabia',
      region: 'Al-Qassim'
    },
    comparisonFactors: ['roi', 'waterRequirement', 'maintenanceLevel']
  });

  console.log('\nComparison:', comparison.data);
}

planDatePalmOrchard();
```

#### Step 2: Understanding the Timeline

**Year 1-2: Establishment Phase**
- Plant 1-2 year old offshoots
- 50 trees per hectare (5 hectares = 250 trees)
- Spacing: 7m × 7m
- Investment: ~$25,000 ($100/tree)
- Intercrop with vegetables for income

**Year 3-5: Early Production**
- Some trees start flowering
- Begin manual pollination (1 male per 50 females)
- Minimal fruit production
- Continue intercropping

**Year 6-10: Increasing Production**
- Production increases yearly
- Harvest timing: September-November
- Expected yield: 30-70 kg/tree
- Gross income: $15,000-35,000/year

**Year 10+: Full Production**
- Mature production: 80-200 kg/tree
- Gross income: $40,000-100,000/year
- Productive life: 60-100 years

---

### Tutorial 3: Organic Farming Transition

**Scenario:** Convert conventional farm to organic farming.

#### Step 1: Get Organic Farming Guide

```bash
curl -X GET http://localhost:3000/api/farming/organic-guide/tomato
```

#### Step 2: Get Organic Fertilizer Alternatives

```bash
curl -X POST http://localhost:3000/api/fertilizer/organic-alternatives \
  -H "Content-Type: application/json" \
  -d '{
    "crop": "tomato",
    "farmSize": 2,
    "currentFertilizer": {
      "type": "NPK 20-20-20",
      "quantity": 200
    },
    "availableResources": ["animal manure", "crop residues"]
  }'
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "organicAlternatives": [
      {
        "name": "Composted Cow Manure",
        "npkContent": "0.5-0.3-0.5",
        "quantity": "8 tons/hectare",
        "application": "Apply 2-3 weeks before planting, incorporate into soil",
        "benefits": ["Improves soil structure", "Increases water retention", "Provides slow-release nutrients"]
      },
      {
        "name": "Vermicompost",
        "npkContent": "1.5-1.0-1.0",
        "quantity": "3 tons/hectare",
        "application": "Mix with soil or use as top dressing",
        "benefits": ["Rich in beneficial microorganisms", "Improves nutrient availability"]
      }
    ],
    "transitionPlan": {
      "year1": "Reduce synthetic fertilizer by 50%, add compost",
      "year2": "Reduce to 25%, increase organic inputs",
      "year3": "100% organic certification eligible"
    }
  }
}
```

#### Step 3: Implement Crop Rotation

```bash
curl -X POST http://localhost:3000/api/farming/crop-rotation \
  -H "Content-Type: application/json" \
  -d '{
    "currentCrop": "tomato",
    "farmSize": 2,
    "previousCrops": ["wheat"],
    "objectives": ["pest control", "soil health"]
  }'
```

---

## Integration Examples

### Example 1: Node.js Integration

Complete Node.js application integrating all APIs:

```javascript
// farmer-advisor.js
const axios = require('axios');

class FarmerAdvisor {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.client = axios.create({ baseURL });
  }

  async registerFarmer(farmerData) {
    const response = await this.client.post('/farmers/register', farmerData);
    return response.data;
  }

  async getCropRecommendations(location, farmDetails) {
    const response = await this.client.post('/crops/recommend', {
      location,
      ...farmDetails
    });
    return response.data;
  }

  async getFertilizerPlan(crop, farmSize, soilAnalysis) {
    const response = await this.client.post('/fertilizer/recommend', {
      crop,
      farmSize,
      soilAnalysis
    });
    return response.data;
  }

  async getIrrigationSchedule(crop, soilType, climate) {
    const response = await this.client.post('/water/irrigation-schedule', {
      crop,
      soilType,
      climate
    });
    return response.data;
  }

  async getCompleteFarmPlan(farmerData, farmDetails) {
    // Register farmer
    const farmer = await this.registerFarmer(farmerData);

    // Get crop recommendations
    const crops = await this.getCropRecommendations(
      farmerData.location,
      farmDetails
    );

    // Get fertilizer plan for recommended crop
    const topCrop = crops.data.recommendations[0].crop;
    const fertilizer = await this.getFertilizerPlan(
      topCrop.toLowerCase(),
      farmDetails.farmSize,
      farmDetails.soilAnalysis
    );

    // Get irrigation schedule
    const irrigation = await this.getIrrigationSchedule(
      topCrop.toLowerCase(),
      farmDetails.soilType,
      farmDetails.climate
    );

    return {
      farmer,
      crops,
      fertilizer,
      irrigation
    };
  }
}

// Usage
async function main() {
  const advisor = new FarmerAdvisor();

  const plan = await advisor.getCompleteFarmPlan(
    {
      name: 'Ahmed Hassan',
      location: {
        country: 'Egypt',
        region: 'Nile Delta'
      },
      farmSize: 3,
      contactInfo: {
        phone: '+20-100-1234567',
        email: 'ahmed@example.com'
      }
    },
    {
      soilType: 'clay loam',
      season: 'winter',
      farmSize: 3,
      waterAvailability: 'nile irrigation',
      soilAnalysis: {
        nitrogen: 'medium',
        phosphorus: 'low',
        potassium: 'medium',
        pH: 7.5
      },
      climate: {
        temperature: 18,
        humidity: 65,
        rainfall: 20
      }
    }
  );

  console.log('Complete Farm Plan:', JSON.stringify(plan, null, 2));
}

main().catch(console.error);
```

### Example 2: Python Integration

```python
# farmer_advisor.py
import requests
from typing import Dict, List, Optional

class FarmerAdvisor:
    def __init__(self, base_url: str = "http://localhost:3000/api"):
        self.base_url = base_url
        self.session = requests.Session()

    def register_farmer(self, farmer_data: Dict) -> Dict:
        response = self.session.post(
            f"{self.base_url}/farmers/register",
            json=farmer_data
        )
        response.raise_for_status()
        return response.json()

    def get_crop_recommendations(self, location: Dict, farm_details: Dict) -> Dict:
        response = self.session.post(
            f"{self.base_url}/crops/recommend",
            json={**location, **farm_details}
        )
        response.raise_for_status()
        return response.json()

    def get_tree_recommendations(self, location: Dict, farm_details: Dict) -> Dict:
        response = self.session.post(
            f"{self.base_url}/trees/recommend",
            json={"location": location, **farm_details}
        )
        response.raise_for_status()
        return response.json()

    def compare_investments(self, annual_crop: str, tree_crop: str,
                          location: Dict, farm_size: float) -> Dict:
        # Get annual crop details
        annual = self.session.get(
            f"{self.base_url}/crops/{annual_crop}"
        ).json()

        # Get tree crop details
        tree = self.session.get(
            f"{self.base_url}/trees/info/{tree_crop}"
        ).json()

        return {
            "annual_crop": {
                "name": annual_crop,
                "yearly_income": self._calculate_annual_income(annual, farm_size),
                "investment": "Low initial, yearly inputs"
            },
            "tree_crop": {
                "name": tree_crop,
                "lifetime_income": self._calculate_tree_income(tree, farm_size),
                "investment": "High initial, lower maintenance"
            }
        }

    def _calculate_annual_income(self, crop_data: Dict, farm_size: float) -> float:
        # Simplified calculation
        return farm_size * 1000  # Placeholder

    def _calculate_tree_income(self, tree_data: Dict, farm_size: float) -> Dict:
        # Simplified calculation
        return {
            "year_1_5": farm_size * 500,
            "year_6_10": farm_size * 3000,
            "year_10_plus": farm_size * 8000
        }

# Usage
if __name__ == "__main__":
    advisor = FarmerAdvisor()

    # Compare annual vs tree crop investment
    comparison = advisor.compare_investments(
        annual_crop="wheat",
        tree_crop="date_palm",
        location={"country": "UAE", "region": "Al Ain"},
        farm_size=5
    )

    print("Investment Comparison:")
    print(comparison)
```

### Example 3: Frontend Integration (React)

```javascript
// FarmingAdvisor.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FarmingAdvisor = () => {
  const [location, setLocation] = useState({
    country: '',
    region: ''
  });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/crops/recommend', {
        location,
        soilType: 'loam',
        season: 'spring',
        farmSize: 2,
        waterAvailability: 'moderate'
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="farming-advisor">
      <h1>AI Farming Advisor</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Country"
          value={location.country}
          onChange={(e) => setLocation({...location, country: e.target.value})}
        />
        <input
          type="text"
          placeholder="Region"
          value={location.region}
          onChange={(e) => setLocation({...location, region: e.target.value})}
        />
        <button onClick={getRecommendations} disabled={loading}>
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      {recommendations && (
        <div className="results">
          <h2>Recommended Crops:</h2>
          {recommendations.data.recommendations.map((rec, index) => (
            <div key={index} className="crop-card">
              <h3>{rec.crop}</h3>
              <p>Suitability: {rec.suitability}%</p>
              <p>Expected Yield: {rec.expectedYield}</p>
              <p>{rec.reasoning}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmingAdvisor;
```

---

## Advanced Scenarios

### Scenario 1: Multi-AI Provider Testing

Test the same query across all AI providers:

```javascript
const axios = require('axios');

async function compareAIProviders(query) {
  const providers = ['openai', 'anthropic', 'gemini', 'kimi2', 'grok'];
  const results = {};

  for (const provider of providers) {
    try {
      // Note: You'll need to modify server to accept provider parameter
      const response = await axios.post('http://localhost:3000/api/crops/recommend', {
        ...query,
        aiProvider: provider  // Custom parameter
      });

      results[provider] = {
        success: true,
        response: response.data,
        responseTime: response.headers['x-response-time']
      };
    } catch (error) {
      results[provider] = {
        success: false,
        error: error.message
      };
    }
  }

  return results;
}

// Usage
const query = {
  location: { country: 'India', region: 'Maharashtra' },
  soilType: 'black soil',
  season: 'kharif',
  farmSize: 4,
  waterAvailability: 'rainfed'
};

compareAIProviders(query).then(results => {
  console.log('Provider Comparison:', JSON.stringify(results, null, 2));
});
```

### Scenario 2: Batch Processing for Multiple Farms

Process recommendations for multiple farms:

```javascript
const axios = require('axios');

async function batchProcessFarms(farms) {
  const results = await Promise.all(
    farms.map(async (farm) => {
      try {
        const [crops, fertilizer, water] = await Promise.all([
          axios.post('http://localhost:3000/api/crops/recommend', farm.details),
          axios.post('http://localhost:3000/api/fertilizer/recommend', {
            crop: farm.preferredCrop,
            farmSize: farm.details.farmSize,
            soilAnalysis: farm.soilAnalysis
          }),
          axios.post('http://localhost:3000/api/water/irrigation-schedule', {
            crop: farm.preferredCrop,
            soilType: farm.details.soilType,
            climate: farm.climate
          })
        ]);

        return {
          farmId: farm.id,
          success: true,
          crops: crops.data,
          fertilizer: fertilizer.data,
          water: water.data
        };
      } catch (error) {
        return {
          farmId: farm.id,
          success: false,
          error: error.message
        };
      }
    })
  );

  return results;
}

// Usage
const farms = [
  {
    id: 'farm_001',
    details: {
      location: { country: 'India', region: 'Punjab' },
      soilType: 'loam',
      farmSize: 5,
      waterAvailability: 'canal'
    },
    preferredCrop: 'wheat',
    soilAnalysis: { nitrogen: 'medium', phosphorus: 'low', potassium: 'medium', pH: 7.0 },
    climate: { temperature: 20, humidity: 60, rainfall: 50 }
  },
  {
    id: 'farm_002',
    details: {
      location: { country: 'India', region: 'Tamil Nadu' },
      soilType: 'clay',
      farmSize: 3,
      waterAvailability: 'well'
    },
    preferredCrop: 'rice',
    soilAnalysis: { nitrogen: 'low', phosphorus: 'medium', potassium: 'medium', pH: 6.5 },
    climate: { temperature: 28, humidity: 75, rainfall: 100 }
  }
];

batchProcessFarms(farms).then(results => {
  console.log('Batch Processing Results:', JSON.stringify(results, null, 2));
});
```

### Scenario 3: Farm Planning with Investment Analysis

Complete 10-year farm plan with financial projections:

```javascript
async function create10YearFarmPlan(farmerData) {
  const advisor = new FarmerAdvisor();

  // Get both annual and tree crop recommendations
  const [annualCrops, treeCrops] = await Promise.all([
    advisor.getCropRecommendations(farmerData.location, {
      soilType: farmerData.soilType,
      farmSize: farmerData.farmSize,
      waterAvailability: farmerData.waterAvailability
    }),
    advisor.getTreeRecommendations(farmerData.location, {
      soilType: farmerData.soilType,
      farmSize: farmerData.farmSize,
      waterAvailability: farmerData.waterAvailability,
      timeframe: 'long-term',
      purpose: 'commercial'
    })
  ]);

  // Create hybrid plan: 70% trees, 30% annual crops
  const plan = {
    strategy: 'hybrid',
    year_1_5: {
      trees: {
        crop: treeCrops.data.recommendations[0].tree,
        area: farmerData.farmSize * 0.7,
        investment: calculateTreeInvestment(treeCrops.data.recommendations[0], farmerData.farmSize * 0.7),
        income: 'Minimal (establishment phase)'
      },
      annualCrops: {
        crop: annualCrops.data.recommendations[0].crop,
        area: farmerData.farmSize * 0.3,
        income: calculateAnnualIncome(annualCrops.data.recommendations[0], farmerData.farmSize * 0.3)
      },
      netIncome: '$5,000 - $8,000/year'
    },
    year_6_10: {
      trees: {
        status: 'Early production',
        income: '$15,000 - $25,000/year'
      },
      annualCrops: {
        income: '$3,000 - $5,000/year'
      },
      netIncome: '$18,000 - $30,000/year'
    },
    year_10_plus: {
      trees: {
        status: 'Full production',
        income: '$40,000 - $70,000/year'
      },
      annualCrops: {
        income: '$3,000 - $5,000/year'
      },
      netIncome: '$43,000 - $75,000/year'
    },
    roi: {
      breakEven: 'Year 6-7',
      totalInvestment: '$25,000 - $35,000',
      lifetimeReturn: '$2,000,000+ (over 50 years)'
    }
  };

  return plan;
}

function calculateTreeInvestment(treeRec, area) {
  // Placeholder calculation
  return area * 5000;  // $5000 per hectare
}

function calculateAnnualIncome(cropRec, area) {
  // Placeholder calculation
  return area * 1500;  // $1500 per hectare
}
```

---

## N8N Workflow Examples

### Example 1: Automated Daily Recommendations

Create an n8n workflow that sends daily crop recommendations via email:

```json
{
  "name": "Daily Crop Recommendations",
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "triggerTimes": {
          "item": [
            {
              "hour": 6,
              "minute": 0
            }
          ]
        }
      }
    },
    {
      "name": "Get Farmers",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "http://api:3000/api/farmers",
        "method": "GET"
      }
    },
    {
      "name": "Loop Farmers",
      "type": "n8n-nodes-base.splitInBatches",
      "parameters": {
        "batchSize": 10
      }
    },
    {
      "name": "Get Recommendations",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "http://api:3000/api/crops/recommend",
        "method": "POST",
        "body": {
          "location": "={{$json.location}}",
          "soilType": "={{$json.soilType}}",
          "farmSize": "={{$json.farmSize}}"
        }
      }
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "={{$json.contactInfo.email}}",
        "subject": "Daily Farming Recommendations",
        "text": "={{$json.recommendations}}"
      }
    }
  ]
}
```

### Example 2: Weather-Based Alerts

Workflow that checks weather and sends irrigation alerts:

**Workflow Description:**
1. Trigger: Every 6 hours
2. Check weather forecast
3. If rain expected < 5mm and temperature > 30°C
4. Get farmers with crops needing water
5. Send irrigation alerts

### Example 3: Price Alert System

Workflow that monitors crop prices and alerts farmers:

**Workflow Description:**
1. Trigger: Daily at 9 AM
2. Fetch current market prices
3. Compare with historical prices
4. If price increase > 10%
5. Send alert to farmers growing that crop

---

## Code Snippets

### Snippet 1: Error Handling Wrapper

```javascript
class APIClient {
  async makeRequest(endpoint, method = 'GET', data = null) {
    try {
      const config = {
        method,
        url: `http://localhost:3000/api${endpoint}`,
        headers: { 'Content-Type': 'application/json' }
      };

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response) {
        // Server responded with error
        return {
          success: false,
          error: error.response.data.message,
          statusCode: error.response.status
        };
      } else if (error.request) {
        // No response received
        return {
          success: false,
          error: 'No response from server. Please check your connection.'
        };
      } else {
        // Request setup error
        return {
          success: false,
          error: error.message
        };
      }
    }
  }
}
```

### Snippet 2: Retry Logic for Network Failures

```javascript
async function retryRequest(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
}

// Usage
const recommendations = await retryRequest(
  () => axios.post('http://localhost:3000/api/crops/recommend', data),
  3,  // Max 3 retries
  1000  // Initial delay 1 second
);
```

### Snippet 3: Caching for Frequent Requests

```javascript
class CachedAPIClient {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  getCacheKey(endpoint, data) {
    return `${endpoint}:${JSON.stringify(data)}`;
  }

  async request(endpoint, data) {
    const cacheKey = this.getCacheKey(endpoint, data);
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('Returning cached response');
      return cached.data;
    }

    const response = await axios.post(`http://localhost:3000/api${endpoint}`, data);

    this.cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });

    return response.data;
  }
}
```

---

## Testing Examples

### Integration Test Example

```javascript
const { expect } = require('chai');
const axios = require('axios');

describe('Farming Platform Integration Tests', () => {
  const baseURL = 'http://localhost:3000/api';

  it('should complete full farming workflow', async () => {
    // Register farmer
    const farmerResponse = await axios.post(`${baseURL}/farmers/register`, {
      name: 'Test Farmer',
      location: { country: 'India', region: 'Punjab' },
      farmSize: 5
    });
    expect(farmerResponse.status).to.equal(200);
    const farmerId = farmerResponse.data.data.farmerId;

    // Get crop recommendations
    const cropResponse = await axios.post(`${baseURL}/crops/recommend`, {
      location: { country: 'India', region: 'Punjab' },
      soilType: 'loam',
      farmSize: 5
    });
    expect(cropResponse.status).to.equal(200);
    expect(cropResponse.data.data.recommendations).to.be.an('array');

    // Get fertilizer plan
    const fertResponse = await axios.post(`${baseURL}/fertilizer/recommend`, {
      crop: 'wheat',
      farmSize: 5,
      soilAnalysis: { nitrogen: 'medium', phosphorus: 'low', potassium: 'medium' }
    });
    expect(fertResponse.status).to.equal(200);
    expect(fertResponse.data.data.npkRequirements).to.exist;
  });
});
```

---

## Summary

This examples guide covers:
- ✅ Quick start examples for all major features
- ✅ Complete step-by-step tutorials
- ✅ Integration examples for Node.js, Python, and React
- ✅ Advanced scenarios including batch processing and investment analysis
- ✅ N8N workflow examples
- ✅ Reusable code snippets
- ✅ Testing examples

For more details, see:
- [Setup Guide](./SETUP_GUIDE.md)
- [API Reference](./COMPLETE_API_REFERENCE.md)
- [User Guide](./USER_GUIDE.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)
