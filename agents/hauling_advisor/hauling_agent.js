import { aiClient } from '../../config/ai-client.js';
import { logger } from '../../config/logger.js';
import transportationDB from '../../data/knowledge_base/transportation.js';

/**
 * Hauling Advisor Agent
 *
 * Provides intelligent recommendations for:
 * - Transportation method selection
 * - Vehicle requirements and specifications
 * - Packaging and loading guidelines
 * - Route optimization
 * - Cost optimization
 * - Temperature control during transport
 * - Damage prevention
 * - Regulatory compliance
 */
class HaulingAdvisorAgent {
  constructor() {
    this.aiClient = aiClient;
    this.transportDatabase = transportationDB;
  }

  /**
   * Get transportation recommendations
   */
  async getTransportationPlan(params) {
    const { produce, quantity, origin, destination, timeframe, budget } = params;

    try {
      logger.info(`Getting transportation plan for ${produce}`);

      // Get transportation data from knowledge base
      const transportData = this.getTransportData(produce);

      // Build context
      const context = this.buildTransportContext({
        produce,
        quantity,
        origin,
        destination,
        timeframe,
        budget,
        transportData
      });

      // Get AI recommendations
      const plan = await this.getAITransportPlan(context);

      logger.info(`Transportation plan generated for ${produce}`);
      return {
        produce,
        quantity,
        route: { origin, destination },
        plan,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error in transportation planning: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get vehicle specifications and requirements
   */
  async getVehicleRequirements(produce, quantity, distance) {
    try {
      logger.info(`Getting vehicle requirements for ${produce}`);

      const transportData = this.getTransportData(produce);

      const systemPrompt = `You are an expert in agricultural logistics and produce transportation.
Provide detailed vehicle specifications and requirements.

Consider:
- Produce characteristics (perishability, fragility)
- Quantity and volume
- Temperature control needs
- Ventilation requirements
- Loading/unloading equipment
- Regulatory requirements

Respond with valid JSON only:
{
  "vehicleType": "...",
  "specifications": {
    "capacity": "...",
    "temperatureControl": "refrigerated/insulated/ambient",
    "targetTemperature": "...",
    "ventilation": "...",
    "suspension": "...",
    "floorType": "..."
  },
  "features": {
    "required": ["..."],
    "recommended": ["..."],
    "optional": ["..."]
  },
  "loadingEquipment": ["..."],
  "certification": ["..."],
  "alternatives": [
    {
      "type": "...",
      "suitability": "excellent/good/fair",
      "pros": ["..."],
      "cons": ["..."]
    }
  ],
  "costEstimate": {
    "rental": "...",
    "fuel": "...",
    "driver": "...",
    "total": "..."
  }
}`;

      const userPrompt = `Produce: ${produce}
Quantity: ${quantity}
Distance: ${distance}
${transportData ? `\nTransport requirements: ${JSON.stringify(transportData.requirements)}` : ''}

Specify vehicle requirements.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 2500 }
      );

      return {
        produce,
        quantity,
        distance,
        vehicleRequirements: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting vehicle requirements: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get packaging and loading guidelines
   */
  async getPackagingGuidelines(produce, quantity, transportMode) {
    try {
      logger.info(`Getting packaging guidelines for ${produce}`);

      const transportData = this.getTransportData(produce);

      const systemPrompt = `You are an expert in post-harvest handling and produce packaging.
Provide comprehensive packaging and loading guidelines to minimize damage and maintain quality.

Cover:
- Container types and materials
- Packing methods
- Stacking patterns
- Cushioning and protection
- Ventilation requirements
- Loading sequence
- Weight distribution
- Securing cargo

Respond with valid JSON only:
{
  "packaging": {
    "containerType": "...",
    "material": "...",
    "size": "...",
    "ventilation": "...",
    "lining": "..."
  },
  "packing": {
    "layering": "...",
    "orientation": "...",
    "cushioning": "...",
    "filling": "...",
    "maxWeight": "..."
  },
  "stacking": {
    "pattern": "...",
    "maxHeight": "...",
    "stability": "...",
    "spacing": "..."
  },
  "loading": {
    "sequence": ["..."],
    "distribution": "...",
    "securing": ["..."],
    "separation": "..."
  },
  "precautions": ["..."],
  "damagePrevent": ["..."],
  "qualityMaintenance": ["..."],
  "estimatedCost": "..."
}`;

      const userPrompt = `Produce: ${produce}
Quantity: ${quantity}
Transport mode: ${transportMode}
${transportData ? `\nPackaging requirements: ${JSON.stringify(transportData.packaging)}` : ''}

Provide packaging and loading guidelines.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 2500 }
      );

      return {
        produce,
        quantity,
        transportMode,
        packagingGuidelines: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting packaging guidelines: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get route optimization recommendations
   */
  async getRouteOptimization(params) {
    const { origin, destination, produce, quantity, constraints } = params;

    try {
      logger.info('Getting route optimization');

      const systemPrompt = `You are an expert in logistics and route optimization for perishable goods.
Recommend optimal routes considering distance, time, road quality, and checkpoints.

Analyze:
- Multiple route options
- Travel time and distance
- Road conditions
- Checkpoints and tolls
- Refueling points
- Rest stops
- Weather considerations
- Traffic patterns

Respond with valid JSON only:
{
  "recommendedRoute": {
    "description": "...",
    "distance": "...",
    "estimatedTime": "...",
    "roadQuality": "excellent/good/fair/poor",
    "reasoning": "..."
  },
  "routes": [
    {
      "route": "...",
      "distance": "...",
      "time": "...",
      "fuel": "...",
      "tolls": "...",
      "pros": ["..."],
      "cons": ["..."]
    }
  ],
  "waypoints": [
    {
      "location": "...",
      "purpose": "fuel/rest/inspection/cold storage",
      "facilities": "..."
    }
  ],
  "schedule": {
    "departure": "...",
    "arrival": "...",
    "restStops": ["..."],
    "totalTime": "..."
  },
  "considerations": {
    "weather": "...",
    "traffic": "...",
    "checkpoints": "...",
    "restrictions": "..."
  },
  "contingency": ["..."]
}`;

      const userPrompt = `Origin: ${JSON.stringify(origin)}
Destination: ${JSON.stringify(destination)}
Produce: ${produce} (${quantity})
Constraints: ${JSON.stringify(constraints)}

Optimize transportation route.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        origin,
        destination,
        produce,
        routeOptimization: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error in route optimization: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get cost optimization strategies
   */
  async getCostOptimization(params) {
    const { produce, quantity, distance, currentCosts } = params;

    try {
      logger.info('Getting cost optimization for transportation');

      const systemPrompt = `You are an expert in logistics cost management for agricultural products.
Provide strategies to reduce transportation costs while maintaining quality.

Analyze:
- Vehicle utilization
- Fuel efficiency
- Shared transportation
- Bulk shipping
- Timing optimization
- Return loads
- Route efficiency

Respond with valid JSON only:
{
  "currentAnalysis": {
    "costPerUnit": "...",
    "costPerKm": "...",
    "utilization": "...",
    "efficiency": "good/average/poor"
  },
  "optimizations": [
    {
      "strategy": "...",
      "description": "...",
      "savingsPotential": "...",
      "implementation": "...",
      "difficulty": "easy/medium/hard"
    }
  ],
  "recommendations": {
    "immediate": ["..."],
    "shortTerm": ["..."],
    "longTerm": ["..."]
  },
  "consolidation": {
    "opportunities": ["..."],
    "benefits": "...",
    "partners": "..."
  },
  "alternativeModes": [
    {
      "mode": "...",
      "cost": "...",
      "suitability": "...",
      "pros": ["..."],
      "cons": ["..."]
    }
  ],
  "expectedSavings": {
    "percentage": "...",
    "amount": "...",
    "timeline": "..."
  }
}`;

      const userPrompt = `Produce: ${produce}
Quantity: ${quantity}
Distance: ${distance}
Current costs: ${JSON.stringify(currentCosts)}

Provide cost optimization strategies.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produce,
        quantity,
        distance,
        costOptimization: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error in cost optimization: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get quality preservation during transport
   */
  async getQualityPreservation(produce, duration, conditions) {
    try {
      logger.info(`Getting quality preservation plan for ${produce}`);

      const transportData = this.getTransportData(produce);

      const systemPrompt = `You are an expert in maintaining produce quality during transportation.
Provide detailed guidelines to preserve quality and minimize losses.

Focus on:
- Temperature management
- Humidity control
- Ventilation
- Handling procedures
- Monitoring protocols
- Emergency procedures

Respond with valid JSON only:
{
  "temperatureControl": {
    "target": "...",
    "acceptable": "...",
    "monitoring": "...",
    "equipment": ["..."]
  },
  "humidityControl": {
    "target": "...",
    "method": "...",
    "monitoring": "..."
  },
  "ventilation": {
    "requirement": "...",
    "method": "...",
    "airflow": "..."
  },
  "handling": {
    "loading": ["..."],
    "transit": ["..."],
    "unloading": ["..."]
  },
  "monitoring": {
    "frequency": "...",
    "parameters": ["..."],
    "documentation": "...",
    "alerts": ["..."]
  },
  "emergencyProtocols": [
    {
      "scenario": "...",
      "response": ["..."],
      "contacts": "..."
    }
  ],
  "qualityChecks": {
    "preLoad": ["..."],
    "inTransit": ["..."],
    "delivery": ["..."]
  },
  "expectedLoss": {
    "optimal": "...",
    "average": "...",
    "poor": "..."
  }
}`;

      const userPrompt = `Produce: ${produce}
Transport duration: ${duration}
Conditions: ${JSON.stringify(conditions)}
${transportData ? `\nQuality requirements: ${JSON.stringify(transportData.quality)}` : ''}

Provide quality preservation guidelines.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 2500 }
      );

      return {
        produce,
        duration,
        qualityPreservation: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting quality preservation plan: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get documentation and compliance requirements
   */
  async getComplianceRequirements(params) {
    const { produce, origin, destination, quantity, international } = params;

    try {
      logger.info('Getting compliance requirements for transportation');

      const systemPrompt = `You are an expert in agricultural logistics regulations and compliance.
Provide comprehensive documentation and compliance requirements.

Cover:
- Transportation permits
- Quality certificates
- Phytosanitary requirements
- Interstate/international regulations
- Vehicle registration
- Driver requirements
- Insurance requirements

Respond with valid JSON only:
{
  "documentation": [
    {
      "document": "...",
      "issuedBy": "...",
      "validity": "...",
      "cost": "...",
      "processingTime": "..."
    }
  ],
  "permits": [
    {
      "type": "...",
      "requirement": "...",
      "authority": "...",
      "cost": "..."
    }
  ],
  "certificates": [
    {
      "certificate": "...",
      "purpose": "...",
      "validity": "...",
      "requirements": ["..."]
    }
  ],
  "vehicleCompliance": {
    "registration": "...",
    "fitness": "...",
    "insurance": "...",
    "pollution": "..."
  },
  "driverRequirements": {
    "license": "...",
    "training": "...",
    "documentation": ["..."]
  },
  "checkpoints": [
    {
      "location": "...",
      "documents": ["..."],
      "procedures": "..."
    }
  ],
  "timeline": {
    "documentation": "...",
    "totalPreparation": "..."
  },
  "costs": {
    "documents": "...",
    "permits": "...",
    "total": "..."
  }
}`;

      const userPrompt = `Produce: ${produce}
Origin: ${JSON.stringify(origin)}
Destination: ${JSON.stringify(destination)}
Quantity: ${quantity}
International: ${international ? 'Yes' : 'No'}

Provide compliance requirements.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produce,
        route: { origin, destination },
        international,
        complianceRequirements: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting compliance requirements: ${error.message}`);
      throw error;
    }
  }

  /**
   * Compare transportation modes
   */
  async compareTransportModes(produce, quantity, distance) {
    try {
      logger.info('Comparing transportation modes');

      const systemPrompt = `You are an expert in multimodal agricultural logistics.
Compare different transportation modes for the given produce and distance.

Evaluate:
- Road transport
- Rail transport
- Air freight (if applicable)
- Combination (multimodal)

Criteria:
- Cost
- Speed
- Quality preservation
- Flexibility
- Reliability

Respond with valid JSON only:
{
  "comparison": [
    {
      "mode": "...",
      "suitability": "excellent/good/fair/poor",
      "cost": "...",
      "time": "...",
      "qualityPreservation": "excellent/good/fair/poor",
      "flexibility": "high/medium/low",
      "pros": ["..."],
      "cons": ["..."]
    }
  ],
  "recommendation": {
    "primary": "...",
    "reasoning": "...",
    "conditions": ["..."]
  },
  "multimodal": {
    "option": "...",
    "benefits": "...",
    "complexity": "...",
    "cost": "..."
  },
  "decisionMatrix": {
    "if": "...",
    "then": "...",
    "examples": ["..."]
  }
}`;

      const userPrompt = `Produce: ${produce}
Quantity: ${quantity}
Distance: ${distance}

Compare transportation modes comprehensively.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 2500 }
      );

      return {
        produce,
        quantity,
        distance,
        modeComparison: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error comparing transport modes: ${error.message}`);
      throw error;
    }
  }

  /**
   * Build context for transportation plan
   */
  buildTransportContext(params) {
    const { produce, quantity, origin, destination, timeframe, budget, transportData } = params;

    return `Produce: ${produce}
Quantity: ${quantity}
Origin: ${JSON.stringify(origin)}
Destination: ${JSON.stringify(destination)}
Timeframe: ${timeframe}
Budget: ${budget || 'flexible'}
${transportData ? `\nTransportation data:\n${JSON.stringify(transportData, null, 2)}` : ''}

Provide comprehensive transportation plan.`;
  }

  /**
   * Get AI transportation plan
   */
  async getAITransportPlan(context) {
    const systemPrompt = `You are an expert agricultural logistics consultant.
Create a comprehensive transportation plan covering all aspects from farm to market.

Include:
- Vehicle selection and specifications
- Packaging and loading procedures
- Route optimization
- Cost breakdown
- Timeline and scheduling
- Quality preservation measures
- Risk mitigation
- Documentation requirements

Respond with valid JSON only:
{
  "vehicle": {
    "type": "...",
    "specifications": "...",
    "quantity": "...",
    "cost": "..."
  },
  "packaging": {
    "containers": "...",
    "materials": "...",
    "method": "...",
    "cost": "..."
  },
  "route": {
    "description": "...",
    "distance": "...",
    "estimatedTime": "...",
    "waypoints": ["..."]
  },
  "schedule": {
    "loading": "...",
    "departure": "...",
    "arrival": "...",
    "totalTime": "..."
  },
  "costs": {
    "vehicle": "...",
    "fuel": "...",
    "driver": "...",
    "packaging": "...",
    "tolls": "...",
    "documentation": "...",
    "total": "...",
    "perUnit": "..."
  },
  "qualityMeasures": {
    "temperature": "...",
    "ventilation": "...",
    "handling": ["..."],
    "monitoring": "..."
  },
  "risks": [
    {
      "risk": "...",
      "probability": "high/medium/low",
      "mitigation": "..."
    }
  ],
  "documentation": ["..."],
  "recommendations": ["..."]
}`;

    const response = await this.aiClient.generateCompletion(
      systemPrompt,
      context,
      { temperature: 0.7, maxTokens: 3500 }
    );

    return response.parsed || response.content;
  }

  /**
   * Get transportation data from knowledge base
   */
  getTransportData(produce) {
    const produceLower = produce.toLowerCase();
    const data = this.transportDatabase.find(
      item => item.name.toLowerCase() === produceLower ||
              item.id === produceLower ||
              (item.aliases && item.aliases.some(alias => alias.toLowerCase() === produceLower))
    );
    return data;
  }
}

export default new HaulingAdvisorAgent();
