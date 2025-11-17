import { aiClient } from '../../config/ai-client.js';
import { logger } from '../../config/logger.js';
import storageMethodsDB from '../../data/knowledge_base/storage_methods.js';

/**
 * Storage Advisor Agent
 *
 * Provides intelligent recommendations for:
 * - Optimal storage conditions (temperature, humidity)
 * - Storage duration and shelf life
 * - Storage facility requirements
 * - Preservation methods (cooling, drying, curing)
 * - Quality maintenance during storage
 * - Loss prevention strategies
 * - Post-harvest handling
 */
class StorageAdvisorAgent {
  constructor() {
    this.aiClient = aiClient;
    this.storageDatabase = storageMethodsDB;
  }

  /**
   * Get storage recommendations for a specific produce
   */
  async getStorageRecommendations(params) {
    const { produce, quantity, storageType, climate, duration, facilities } = params;

    try {
      logger.info(`Getting storage recommendations for ${produce}`);

      // Get storage data from knowledge base
      const storageData = this.getStorageData(produce);

      // Build context for AI
      const context = this.buildStorageContext({
        produce,
        quantity,
        storageType,
        climate,
        duration,
        facilities,
        storageData
      });

      // Get AI recommendations
      const aiRecommendations = await this.getAIRecommendation(context);

      // Combine with storage data
      const recommendations = {
        produce,
        quantity,
        optimalConditions: storageData?.optimalConditions || aiRecommendations.optimalConditions,
        storageMethod: aiRecommendations.storageMethod,
        facilityRequirements: aiRecommendations.facilityRequirements,
        expectedShelfLife: aiRecommendations.expectedShelfLife,
        qualityMaintenance: aiRecommendations.qualityMaintenance,
        lossPrevention: aiRecommendations.lossPrevention,
        estimatedLoss: aiRecommendations.estimatedLoss,
        costEstimate: aiRecommendations.costEstimate,
        timestamp: new Date().toISOString()
      };

      logger.info(`Storage recommendations generated for ${produce}`);
      return recommendations;

    } catch (error) {
      logger.error(`Error in storage recommendations: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get post-harvest handling guide
   */
  async getPostHarvestHandling(produce, harvestMethod) {
    try {
      logger.info(`Getting post-harvest handling for ${produce}`);

      const storageData = this.getStorageData(produce);

      const systemPrompt = `You are an expert in post-harvest handling and produce storage.
Provide detailed post-harvest handling instructions for ${produce}.

Consider:
- Harvesting method and timing
- Initial cleaning and sorting
- Cooling requirements
- Pre-storage treatments
- Packaging requirements
- Quality inspection points

Respond with valid JSON only:
{
  "immediateSteps": [{"step": "...", "timing": "...", "importance": "critical/high/medium"}],
  "cooling": {"method": "...", "targetTemp": "...", "timeframe": "..."},
  "cleaning": {"method": "...", "precautions": ["..."]},
  "sorting": {"criteria": ["..."], "grading": "..."},
  "pretreatment": [{"treatment": "...", "purpose": "...", "method": "..."}],
  "packaging": {"type": "...", "materials": ["..."], "ventilation": "..."},
  "qualityChecks": [{"checkpoint": "...", "criteria": "..."}],
  "commonMistakes": ["..."]
}`;

      const userPrompt = `Produce: ${produce}
Harvest method: ${harvestMethod || 'standard'}
${storageData ? `Known data: ${JSON.stringify(storageData.postHarvest)}` : ''}

Provide comprehensive post-harvest handling instructions.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produce,
        harvestMethod,
        handling: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting post-harvest handling: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get storage facility design recommendations
   */
  async getFacilityRecommendations(params) {
    const { produces, capacity, budget, climate, storageDuration } = params;

    try {
      logger.info('Getting storage facility recommendations');

      const systemPrompt = `You are an expert in agricultural storage facility design.
Provide detailed recommendations for building or upgrading storage facilities.

Consider:
- Climate control requirements
- Capacity and space utilization
- Cost-effectiveness
- Energy efficiency
- Ventilation systems
- Humidity control
- Temperature control
- Pest prevention
- Safety and accessibility

Respond with valid JSON only:
{
  "facilityType": "cold storage/ambient/controlled atmosphere/mixed",
  "specifications": {
    "dimensions": "...",
    "capacity": "...",
    "insulation": "...",
    "ventilation": "...",
    "cooling": "...",
    "humidity": "..."
  },
  "equipment": [{"item": "...", "quantity": "...", "cost": "..."}],
  "construction": {
    "materials": ["..."],
    "estimatedCost": "...",
    "timeframe": "..."
  },
  "operations": {
    "energyCost": "...",
    "maintenance": ["..."],
    "staffing": "..."
  },
  "roi": {
    "initialInvestment": "...",
    "annualSavings": "...",
    "breakEven": "...",
    "benefits": ["..."]
  },
  "alternatives": [{"type": "...", "pros": ["..."], "cons": ["..."]}]
}`;

      const userPrompt = `Produces to store: ${Array.isArray(produces) ? produces.join(', ') : produces}
Required capacity: ${capacity}
Budget: ${budget || 'flexible'}
Climate zone: ${climate}
Average storage duration: ${storageDuration}

Design an optimal storage facility.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produces,
        capacity,
        recommendations: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting facility recommendations: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get quality monitoring plan
   */
  async getQualityMonitoring(produce, storageMethod, duration) {
    try {
      logger.info(`Getting quality monitoring plan for ${produce}`);

      const systemPrompt = `You are an expert in produce quality management and storage monitoring.
Create a comprehensive quality monitoring plan.

Include:
- Monitoring schedule
- Quality parameters to check
- Acceptable ranges
- Action triggers
- Documentation requirements

Respond with valid JSON only:
{
  "monitoringSchedule": {
    "daily": ["..."],
    "weekly": ["..."],
    "biweekly": ["..."]
  },
  "parameters": [
    {
      "parameter": "...",
      "method": "...",
      "frequency": "...",
      "acceptableRange": "...",
      "actionThreshold": "..."
    }
  ],
  "equipment": [{"item": "...", "purpose": "...", "cost": "..."}],
  "recordKeeping": {
    "logbook": "...",
    "data": ["..."],
    "analysis": "..."
  },
  "alerts": [
    {
      "condition": "...",
      "action": "...",
      "urgency": "immediate/high/medium"
    }
  ],
  "bestPractices": ["..."]
}`;

      const userPrompt = `Produce: ${produce}
Storage method: ${storageMethod}
Storage duration: ${duration}

Create a quality monitoring plan.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 2500 }
      );

      return {
        produce,
        storageMethod,
        duration,
        monitoringPlan: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting quality monitoring plan: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get loss prevention strategies
   */
  async getLossPrevention(produce, storageType, commonIssues) {
    try {
      logger.info(`Getting loss prevention strategies for ${produce}`);

      const storageData = this.getStorageData(produce);

      const systemPrompt = `You are an expert in post-harvest loss prevention and storage optimization.
Provide comprehensive strategies to minimize storage losses.

Focus on:
- Common causes of loss
- Prevention methods
- Early detection
- Remedial actions
- Cost-benefit analysis

Respond with valid JSON only:
{
  "lossFactors": [
    {
      "factor": "...",
      "impact": "high/medium/low",
      "prevention": ["..."],
      "detection": "...",
      "remedy": "..."
    }
  ],
  "preventiveMeasures": [
    {
      "measure": "...",
      "implementation": "...",
      "cost": "...",
      "effectiveness": "..."
    }
  ],
  "monitoringPoints": ["..."],
  "emergencyProtocols": [
    {
      "scenario": "...",
      "response": ["..."],
      "timeframe": "..."
    }
  ],
  "expectedLossReduction": "...",
  "roi": "...",
  "bestPractices": ["..."]
}`;

      const userPrompt = `Produce: ${produce}
Storage type: ${storageType}
Common issues: ${commonIssues || 'general'}
${storageData ? `Known issues: ${JSON.stringify(storageData.commonIssues)}` : ''}

Provide loss prevention strategies.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 2500 }
      );

      return {
        produce,
        storageType,
        lossPreventionPlan: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting loss prevention strategies: ${error.message}`);
      throw error;
    }
  }

  /**
   * Compare storage methods
   */
  async compareStorageMethods(produce, quantity, methods) {
    try {
      logger.info(`Comparing storage methods for ${produce}`);

      const systemPrompt = `You are an expert in agricultural storage systems.
Compare different storage methods for the given produce and provide detailed analysis.

Evaluate on:
- Initial investment
- Operating costs
- Storage capacity
- Quality preservation
- Loss rates
- Flexibility
- Scalability

Respond with valid JSON only:
{
  "comparison": [
    {
      "method": "...",
      "suitability": "excellent/good/fair/poor",
      "pros": ["..."],
      "cons": ["..."],
      "initialCost": "...",
      "operatingCost": "...",
      "shelfLife": "...",
      "lossRate": "...",
      "qualityMaintained": "..."
    }
  ],
  "recommendation": {
    "bestFor": "...",
    "method": "...",
    "reasoning": "...",
    "expectedOutcome": "..."
  },
  "hybridOptions": [
    {
      "combination": ["..."],
      "benefits": "...",
      "implementation": "..."
    }
  ]
}`;

      const userPrompt = `Produce: ${produce}
Quantity: ${quantity}
Methods to compare: ${Array.isArray(methods) ? methods.join(', ') : methods}

Compare these storage methods comprehensively.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produce,
        quantity,
        comparison: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error comparing storage methods: ${error.message}`);
      throw error;
    }
  }

  /**
   * Build context for storage recommendations
   */
  buildStorageContext(params) {
    const { produce, quantity, storageType, climate, duration, facilities, storageData } = params;

    return `Produce: ${produce}
Quantity: ${quantity}
Preferred storage type: ${storageType || 'optimal recommendation needed'}
Climate: ${JSON.stringify(climate)}
Storage duration: ${duration}
Available facilities: ${JSON.stringify(facilities)}
${storageData ? `\nKnown storage data:\n${JSON.stringify(storageData, null, 2)}` : ''}

Provide comprehensive storage recommendations.`;
  }

  /**
   * Get AI recommendation for storage
   */
  async getAIRecommendation(context) {
    const systemPrompt = `You are an expert agricultural storage consultant specializing in post-harvest management.
Provide detailed storage recommendations considering climate, quantity, and available resources.

Important factors:
- Temperature and humidity control
- Ventilation requirements
- Storage duration and shelf life
- Quality preservation
- Loss prevention (spoilage, pests, diseases)
- Cost-effectiveness
- Local climate considerations

Respond with valid JSON only:
{
  "optimalConditions": {
    "temperature": {"min": 0, "max": 0, "unit": "celsius"},
    "humidity": {"min": 0, "max": 0, "unit": "percent"},
    "ventilation": "...",
    "lighting": "..."
  },
  "storageMethod": {
    "recommended": "...",
    "alternatives": ["..."],
    "reasoning": "..."
  },
  "facilityRequirements": {
    "type": "cold storage/ambient/controlled atmosphere",
    "features": ["..."],
    "equipment": ["..."]
  },
  "expectedShelfLife": {
    "optimal": "...",
    "average": "...",
    "factors": ["..."]
  },
  "qualityMaintenance": [
    {
      "aspect": "...",
      "method": "...",
      "frequency": "..."
    }
  ],
  "lossPrevention": {
    "spoilage": ["..."],
    "pests": ["..."],
    "diseases": ["..."],
    "mechanical": ["..."]
  },
  "estimatedLoss": {
    "optimal": "...",
    "average": "...",
    "poor": "..."
  },
  "costEstimate": {
    "setup": "...",
    "monthly": "...",
    "perUnit": "..."
  }
}`;

    const response = await this.aiClient.generateCompletion(
      systemPrompt,
      context,
      { temperature: 0.7, maxTokens: 3000 }
    );

    return response.parsed || {
      optimalConditions: { temperature: {}, humidity: {} },
      storageMethod: { recommended: response.content },
      facilityRequirements: {},
      expectedShelfLife: {},
      qualityMaintenance: [],
      lossPrevention: {},
      estimatedLoss: {},
      costEstimate: {}
    };
  }

  /**
   * Get storage data from knowledge base
   */
  getStorageData(produce) {
    const produceLower = produce.toLowerCase();
    const data = this.storageDatabase.find(
      item => item.name.toLowerCase() === produceLower ||
              item.id === produceLower ||
              (item.aliases && item.aliases.some(alias => alias.toLowerCase() === produceLower))
    );
    return data;
  }
}

export default new StorageAdvisorAgent();
