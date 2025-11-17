import { aiClient } from '../../config/ai-client.js';
import { logger } from '../../config/logger.js';

/**
 * Fertilizer Advisor AI Agent
 * Provides intelligent fertilizer recommendations including NPK ratios,
 * micronutrients, organic amendments, and application schedules
 * Supports multiple AI providers: OpenAI, Anthropic, Gemini, Kimi2, Grok
 */
class FertilizerAdvisorAgent {
  constructor() {
    this.aiClient = aiClient;

    // Standard NPK requirements for common crops (baseline)
    this.cropNutrientBaseline = {
      wheat: { N: 120, P: 60, K: 40 },
      rice: { N: 100, P: 50, K: 50 },
      corn: { N: 150, P: 60, K: 60 },
      tomato: { N: 140, P: 60, K: 180 },
      potato: { N: 120, P: 50, K: 200 },
      cotton: { N: 120, P: 60, K: 60 }
    };
  }

  /**
   * Get fertilizer recommendations
   */
  async getFertilizerRecommendation(params) {
    try {
      const {
        crop,
        soilAnalysis,
        growthStage = 'vegetative',
        farmSize,
        budget = 'moderate',
        preferredType = 'balanced', // organic, synthetic, balanced
        previousFertilization = null
      } = params;

      logger.info('Generating fertilizer recommendation', { crop, growthStage });

      // Calculate NPK requirements
      const npkRequirements = this.calculateNPKRequirements(crop, soilAnalysis, growthStage);

      // Build context for AI
      const context = this.buildFertilizerContext(params, npkRequirements);

      // Get AI recommendation
      const recommendation = await this.getAIResponse(context);

      return {
        success: true,
        crop,
        growthStage,
        npkRequirements,
        soilAnalysis,
        recommendation,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error generating fertilizer recommendation', { error: error.message });
      throw error;
    }
  }

  /**
   * Calculate NPK requirements
   */
  calculateNPKRequirements(crop, soilAnalysis, growthStage) {
    const baseline = this.cropNutrientBaseline[crop.toLowerCase()] || { N: 100, P: 50, K: 50 };

    // Adjust based on soil analysis
    const requirements = {
      nitrogen: this.adjustNitrogen(baseline.N, soilAnalysis?.nitrogen),
      phosphorus: this.adjustPhosphorus(baseline.P, soilAnalysis?.phosphorus),
      potassium: this.adjustPotassium(baseline.K, soilAnalysis?.potassium),
      pH: soilAnalysis?.ph || 6.5
    };

    // Adjust based on growth stage
    if (growthStage === 'flowering' || growthStage === 'fruiting') {
      requirements.phosphorus *= 1.2;
      requirements.potassium *= 1.3;
    } else if (growthStage === 'vegetative') {
      requirements.nitrogen *= 1.2;
    }

    return requirements;
  }

  adjustNitrogen(baseline, soilLevel) {
    if (!soilLevel) return baseline;
    const levelMap = { low: 1.3, medium: 1.0, high: 0.7, 'very high': 0.5 };
    return baseline * (levelMap[soilLevel.toLowerCase()] || 1.0);
  }

  adjustPhosphorus(baseline, soilLevel) {
    if (!soilLevel) return baseline;
    const levelMap = { low: 1.4, medium: 1.0, high: 0.6, 'very high': 0.3 };
    return baseline * (levelMap[soilLevel.toLowerCase()] || 1.0);
  }

  adjustPotassium(baseline, soilLevel) {
    if (!soilLevel) return baseline;
    const levelMap = { low: 1.3, medium: 1.0, high: 0.7, 'very high': 0.4 };
    return baseline * (levelMap[soilLevel.toLowerCase()] || 1.0);
  }

  /**
   * Build fertilizer context
   */
  buildFertilizerContext(params, npkRequirements) {
    const { crop, soilAnalysis, growthStage, farmSize, budget, preferredType, previousFertilization } = params;

    return `You are an expert soil scientist and fertilizer specialist.

CROP AND SOIL DETAILS:
- Crop: ${crop}
- Growth Stage: ${growthStage}
- Farm Size: ${farmSize}
- Soil Type: ${soilAnalysis?.soilType || 'Unknown'}
- Soil pH: ${soilAnalysis?.ph || 'Unknown'}
- Nitrogen Level: ${soilAnalysis?.nitrogen || 'Unknown'}
- Phosphorus Level: ${soilAnalysis?.phosphorus || 'Unknown'}
- Potassium Level: ${soilAnalysis?.potassium || 'Unknown'}
- Organic Matter: ${soilAnalysis?.organicMatter || 'Unknown'}

CALCULATED NPK REQUIREMENTS (kg/acre):
- Nitrogen (N): ${Math.round(npkRequirements.nitrogen)}
- Phosphorus (P2O5): ${Math.round(npkRequirements.phosphorus)}
- Potassium (K2O): ${Math.round(npkRequirements.potassium)}

PREFERENCES:
- Budget: ${budget}
- Preferred Type: ${preferredType}
${previousFertilization ? `- Previous Fertilization: ${JSON.stringify(previousFertilization)}` : ''}

TASK:
Provide a comprehensive fertilizer recommendation including:

1. PRIMARY NUTRIENTS (NPK)
   - Specific fertilizer formulations (e.g., 20-10-10, 15-15-15)
   - Application rates (kg/acre or kg/hectare)
   - Timing of applications
   - Split application schedule
   - Organic alternatives (compost, manure, etc.)

2. SECONDARY NUTRIENTS
   - Calcium (Ca)
   - Magnesium (Mg)
   - Sulfur (S)
   - When and how to apply

3. MICRONUTRIENTS
   - Iron (Fe)
   - Zinc (Zn)
   - Manganese (Mn)
   - Copper (Cu)
   - Boron (B)
   - Molybdenum (Mo)
   - Deficiency symptoms and solutions

4. SOIL AMENDMENTS
   - Lime (if pH adjustment needed)
   - Gypsum
   - Organic matter additions
   - Green manure options

5. APPLICATION METHODS
   - Broadcasting
   - Band placement
   - Foliar application
   - Fertigation
   - Best method for each nutrient

6. TIMING AND SCHEDULE
   - Pre-planting application
   - Split applications during growing season
   - Growth stage-specific applications
   - Calendar schedule

7. ORGANIC OPTIONS
   - Compost (composition and quantity)
   - Animal manures (types and amounts)
   - Green manures and cover crops
   - Biofertilizers
   - Organic certification compliance

8. COST ANALYSIS
   - Estimated costs per acre
   - Cost-benefit analysis
   - Budget-friendly alternatives
   - ROI expectations

9. DO'S AND DON'TS
   - Best practices
   - Common mistakes to avoid
   - Safety precautions
   - Environmental considerations

10. MONITORING
    - Signs of nutrient deficiency
    - Signs of over-fertilization
    - When to retest soil
    - Visual indicators

Format as detailed JSON with specific quantities, timing, and methods.`;
  }

  /**
   * Analyze soil deficiencies
   */
  async analyzeSoilDeficiencies(soilAnalysis) {
    try {
      logger.info('Analyzing soil deficiencies', { soilAnalysis });

      const context = `You are a soil health expert.

SOIL TEST RESULTS:
${JSON.stringify(soilAnalysis, null, 2)}

Analyze this soil test and provide:

1. DEFICIENCIES IDENTIFIED
   - List all nutrient deficiencies
   - Severity level (mild, moderate, severe)
   - Impact on crop growth

2. TOXICITIES OR IMBALANCES
   - Any nutrients at toxic levels
   - Nutrient imbalances
   - pH issues

3. PRIORITY CORRECTIONS
   - Most urgent corrections needed
   - Recommended sequence of amendments
   - Expected timeframe for improvement

4. DETAILED RECOMMENDATIONS
   - Specific amendments for each issue
   - Application rates
   - Application timing
   - Expected results

5. LONG-TERM SOIL HEALTH PLAN
   - Building organic matter
   - Maintaining nutrient balance
   - Preventing future deficiencies

Format as actionable JSON report.`;

      const analysis = await this.getAIResponse(context);

      return {
        success: true,
        soilAnalysis,
        deficiencyAnalysis: analysis,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error analyzing soil deficiencies', { error: error.message });
      throw error;
    }
  }

  /**
   * Get organic fertilizer alternatives
   */
  async getOrganicAlternatives(syntheticFertilizer) {
    try {
      logger.info('Finding organic alternatives', { syntheticFertilizer });

      const context = `You are an organic farming expert.

SYNTHETIC FERTILIZER:
${syntheticFertilizer}

Provide organic alternatives that deliver similar NPK and nutrients:

1. COMPOST-BASED OPTIONS
   - Types of compost
   - Required quantities
   - Preparation methods
   - Application timing

2. ANIMAL MANURES
   - Types (cow, chicken, sheep, etc.)
   - NPK content of each
   - Required quantities
   - Composting requirements
   - Application methods

3. GREEN MANURES
   - Suitable cover crops
   - Growing and incorporation
   - Nutrient contribution
   - Timing in rotation

4. ORGANIC AMENDMENTS
   - Bone meal (phosphorus)
   - Blood meal (nitrogen)
   - Kelp meal (potassium + micronutrients)
   - Rock phosphate
   - Greensand
   - Wood ash

5. BIOFERTILIZERS
   - Nitrogen-fixing bacteria
   - Phosphorus-solubilizing bacteria
   - Mycorrhizal fungi
   - Application methods

6. COMPARISON TABLE
   - Cost comparison
   - Nutrient release rate
   - Ease of application
   - Availability
   - Pros and cons

Format as comprehensive JSON guide.`;

      const alternatives = await this.getAIResponse(context);

      return {
        success: true,
        syntheticFertilizer,
        organicAlternatives: alternatives,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error finding organic alternatives', { error: error.message });
      throw error;
    }
  }

  /**
   * Create fertilization schedule
   */
  async createFertilizationSchedule(params) {
    try {
      const {
        crop,
        plantingDate,
        expectedHarvestDate,
        soilAnalysis,
        farmingType = 'conventional'
      } = params;

      logger.info('Creating fertilization schedule', { crop, plantingDate });

      const context = `You are a crop nutrition timing expert.

DETAILS:
- Crop: ${crop}
- Planting Date: ${plantingDate}
- Expected Harvest: ${expectedHarvestDate}
- Farming Type: ${farmingType}
- Soil Analysis: ${JSON.stringify(soilAnalysis)}

Create a detailed fertilization schedule:

1. WEEK-BY-WEEK SCHEDULE
   - Week number after planting
   - Growth stage
   - Fertilizer type and amount
   - Application method
   - What to observe

2. CRITICAL WINDOWS
   - Most important fertilization periods
   - Don't-miss applications
   - Flexibility windows

3. ADJUSTMENT TRIGGERS
   - Signs to increase/decrease fertilization
   - Weather-based adjustments
   - Visual plant indicators

4. RECORD KEEPING
   - What to record
   - How to track results
   - Decision points

Format as calendar-based JSON schedule.`;

      const schedule = await this.getAIResponse(context);

      return {
        success: true,
        crop,
        schedule,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error creating fertilization schedule', { error: error.message });
      throw error;
    }
  }

  /**
   * Get AI response
   */
  async getAIResponse(context) {
    try {
      const systemPrompt = 'You are an expert soil scientist and fertilizer specialist.';
      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        context,
        {
          temperature: 0.7,
          maxTokens: 4000
        }
      );

      logger.info(`Got fertilizer recommendation from ${response.provider} (${response.model})`);

      return response.parsed || { content: response.content, format: 'text' };
    } catch (error) {
      logger.error('Error getting AI response', { error: error.message });
      throw error;
    }
  }
}

export default FertilizerAdvisorAgent;
