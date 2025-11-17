import { aiClient } from '../../config/ai-client.js';
import { logger } from '../../config/logger.js';

/**
 * Water Management AI Agent
 * Provides intelligent irrigation scheduling, water conservation strategies,
 * water quality analysis, and drought management recommendations
 * Supports multiple AI providers: OpenAI, Anthropic, Gemini, Kimi2, Grok
 */
class WaterManagementAgent {
  constructor() {
    this.aiClient = aiClient;

    // Water requirements for crops (mm per growing season)
    this.cropWaterRequirements = {
      wheat: { min: 450, max: 650, critical_stages: ['tillering', 'flowering', 'grain_filling'] },
      rice: { min: 1200, max: 2000, critical_stages: ['transplanting', 'tillering', 'flowering'] },
      corn: { min: 500, max: 800, critical_stages: ['knee_high', 'tasseling', 'grain_filling'] },
      tomato: { min: 400, max: 600, critical_stages: ['flowering', 'fruit_setting', 'fruit_development'] },
      potato: { min: 500, max: 700, critical_stages: ['tuber_initiation', 'tuber_bulking'] },
      cotton: { min: 700, max: 1300, critical_stages: ['flowering', 'boll_development'] }
    };
  }

  /**
   * Generate irrigation schedule
   */
  async generateIrrigationSchedule(params) {
    try {
      const {
        crop,
        soilType,
        climate,
        farmSize,
        irrigationSystem = 'traditional', // traditional, drip, sprinkler, surface
        waterSource = 'well', // well, river, canal, rainwater
        growthStage,
        rainfall = null,
        temperature = null
      } = params;

      logger.info('Generating irrigation schedule', { crop, irrigationSystem });

      // Calculate water requirements
      const waterRequirements = this.calculateWaterRequirements(crop, soilType, climate, growthStage);

      // Build context
      const context = this.buildIrrigationContext(params, waterRequirements);

      // Get AI recommendation
      const schedule = await this.getAIResponse(context);

      return {
        success: true,
        crop,
        growthStage,
        irrigationSystem,
        waterRequirements,
        schedule,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error generating irrigation schedule', { error: error.message });
      throw error;
    }
  }

  /**
   * Calculate water requirements
   */
  calculateWaterRequirements(crop, soilType, climate, growthStage) {
    const baseRequirement = this.cropWaterRequirements[crop.toLowerCase()] || {
      min: 400,
      max: 700,
      critical_stages: ['vegetative', 'flowering', 'fruiting']
    };

    // Adjust for soil type
    let soilFactor = 1.0;
    if (soilType === 'sandy') soilFactor = 1.3;
    else if (soilType === 'clay') soilFactor = 0.9;
    else if (soilType === 'loamy') soilFactor = 1.0;

    // Adjust for climate
    let climateFactor = 1.0;
    if (climate === 'arid' || climate === 'hot') climateFactor = 1.4;
    else if (climate === 'humid') climateFactor = 0.8;
    else if (climate === 'temperate') climateFactor = 1.0;

    return {
      dailyRequirement: ((baseRequirement.min + baseRequirement.max) / 2 / 120) * soilFactor * climateFactor,
      seasonalRequirement: baseRequirement,
      criticalStages: baseRequirement.critical_stages,
      adjustedForSoil: soilFactor,
      adjustedForClimate: climateFactor
    };
  }

  /**
   * Build irrigation context
   */
  buildIrrigationContext(params, waterRequirements) {
    const {
      crop,
      soilType,
      climate,
      farmSize,
      irrigationSystem,
      waterSource,
      growthStage,
      rainfall,
      temperature
    } = params;

    return `You are an irrigation and water management expert.

FARM DETAILS:
- Crop: ${crop}
- Current Growth Stage: ${growthStage}
- Soil Type: ${soilType}
- Climate: ${climate}
- Farm Size: ${farmSize}
- Irrigation System: ${irrigationSystem}
- Water Source: ${waterSource}
${rainfall ? `- Recent Rainfall: ${rainfall}` : ''}
${temperature ? `- Temperature: ${temperature}` : ''}

CALCULATED WATER REQUIREMENTS:
- Daily Water Requirement: ${Math.round(waterRequirements.dailyRequirement)} mm/day
- Seasonal Range: ${waterRequirements.seasonalRequirement.min}-${waterRequirements.seasonalRequirement.max} mm
- Critical Stages: ${waterRequirements.criticalStages.join(', ')}

TASK:
Create a comprehensive irrigation schedule and water management plan:

1. IRRIGATION SCHEDULE
   - Frequency (daily, alternate days, weekly)
   - Duration per session
   - Time of day for irrigation
   - Adjustments for weather
   - Weekly water volume

2. GROWTH STAGE SPECIFIC REQUIREMENTS
   - Water needs for each growth stage
   - Critical irrigation periods
   - Stress-sensitive periods
   - When to reduce/increase water

3. IRRIGATION METHOD OPTIMIZATION
   - Best practices for ${irrigationSystem} system
   - Efficiency improvements
   - Water distribution uniformity
   - Maintenance requirements

4. WATER CONSERVATION
   - Mulching recommendations
   - Soil moisture retention
   - Reducing evaporation
   - Rainwater harvesting opportunities

5. MONITORING INDICATORS
   - Soil moisture checking methods
   - Visual plant indicators
   - When to adjust schedule
   - Signs of over/under watering

6. DROUGHT MANAGEMENT
   - Deficit irrigation strategies
   - Priority irrigation areas
   - Drought-tolerant practices
   - Emergency water saving

7. WATER QUALITY CONSIDERATIONS
   - Salinity management
   - pH requirements
   - Filtration needs
   - Water treatment (if needed)

8. COST AND EFFICIENCY
   - Water usage estimate
   - Cost per irrigation
   - System efficiency rating
   - Improvement opportunities

9. SEASONAL ADJUSTMENTS
   - Summer vs winter irrigation
   - Monsoon period management
   - Temperature-based adjustments

10. TROUBLESHOOTING
    - Uneven water distribution
    - System failures
    - Water shortage scenarios
    - Excess water drainage

Format as detailed JSON with daily/weekly schedules and specific instructions.`;
  }

  /**
   * Analyze water quality
   */
  async analyzeWaterQuality(waterTestResults) {
    try {
      logger.info('Analyzing water quality', { waterTestResults });

      const context = `You are a water quality specialist for agriculture.

WATER TEST RESULTS:
${JSON.stringify(waterTestResults, null, 2)}

Analyze this water quality report and provide:

1. OVERALL WATER QUALITY ASSESSMENT
   - Suitability for irrigation (excellent, good, fair, poor, unsuitable)
   - Main concerns
   - Immediate actions needed

2. PARAMETER ANALYSIS
   - pH level impact
   - Salinity/EC (Electrical Conductivity)
   - Sodium Adsorption Ratio (SAR)
   - Specific ion toxicity (Chloride, Boron, etc.)
   - Heavy metals (if present)
   - Biological indicators

3. CROP-SPECIFIC IMPACTS
   - Which crops can tolerate this water
   - Which crops to avoid
   - Sensitive growth stages

4. SOIL IMPACT
   - Long-term soil health effects
   - Sodicity/salinity buildup risk
   - Soil structure impacts
   - Remediation needs

5. TREATMENT RECOMMENDATIONS
   - Filtration needs
   - pH adjustment methods
   - Salinity management
   - Ion-specific treatments
   - Cost-effective solutions

6. IRRIGATION MANAGEMENT
   - Leaching requirements
   - Application modifications
   - Drainage needs
   - Blending with other water sources

7. MONITORING PLAN
   - Parameters to monitor regularly
   - Testing frequency
   - Warning thresholds
   - Response actions

8. ALTERNATIVE SOURCES
   - Rainwater harvesting
   - Water blending strategies
   - Treatment cost vs source change

Format as comprehensive JSON report with actionable recommendations.`;

      const analysis = await this.getAIResponse(context);

      return {
        success: true,
        waterTestResults,
        qualityAnalysis: analysis,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error analyzing water quality', { error: error.message });
      throw error;
    }
  }

  /**
   * Get water conservation strategies
   */
  async getWaterConservationStrategies(params) {
    try {
      const {
        farmType,
        currentWaterUsage,
        waterAvailability,
        budget,
        climate,
        crops
      } = params;

      logger.info('Generating water conservation strategies', { farmType, climate });

      const context = `You are a water conservation expert for agriculture.

FARM PROFILE:
- Farm Type: ${farmType}
- Current Water Usage: ${currentWaterUsage}
- Water Availability: ${waterAvailability}
- Budget: ${budget}
- Climate: ${climate}
- Crops: ${Array.isArray(crops) ? crops.join(', ') : crops}

Provide comprehensive water conservation strategies:

1. IMMEDIATE ACTIONS (0-1 month)
   - Quick wins
   - Low-cost improvements
   - Leak detection and repair
   - Scheduling optimization

2. SHORT-TERM STRATEGIES (1-6 months)
   - System upgrades
   - Mulching implementation
   - Soil amendments for retention
   - Crop selection changes

3. LONG-TERM INVESTMENTS (6+ months)
   - Drip irrigation installation
   - Rainwater harvesting systems
   - Water storage infrastructure
   - Drought-resistant crop varieties

4. IRRIGATION EFFICIENCY
   - System efficiency improvements
   - Switching irrigation methods
   - Precision irrigation
   - Automation opportunities

5. SOIL MANAGEMENT
   - Organic matter addition
   - Cover cropping
   - Reduced tillage
   - Soil moisture retention

6. CROP MANAGEMENT
   - Drought-tolerant varieties
   - Crop rotation for water efficiency
   - Timing and scheduling
   - Stress management

7. INFRASTRUCTURE
   - Pond construction
   - Drip vs sprinkler systems
   - Water storage solutions
   - Distribution network optimization

8. TECHNOLOGY INTEGRATION
   - Soil moisture sensors
   - Weather-based irrigation controllers
   - Mobile apps for management
   - Remote monitoring

9. ECONOMIC ANALYSIS
   - Cost of each strategy
   - Water savings potential
   - ROI calculation
   - Payback period
   - Government subsidies available

10. IMPLEMENTATION ROADMAP
    - Prioritized action plan
    - Timeline
    - Required resources
    - Success metrics

Format as detailed JSON with cost-benefit analysis for each strategy.`;

      const strategies = await this.getAIResponse(context);

      return {
        success: true,
        conservationStrategies: strategies,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error generating conservation strategies', { error: error.message });
      throw error;
    }
  }

  /**
   * Drought management plan
   */
  async createDroughtManagementPlan(params) {
    try {
      const {
        severityLevel, // mild, moderate, severe
        crop,
        growthStage,
        waterAvailable,
        farmSize,
        priorityCrops = []
      } = params;

      logger.info('Creating drought management plan', { severityLevel, crop });

      const context = `You are a drought management expert.

DROUGHT SITUATION:
- Severity: ${severityLevel}
- Crop: ${crop}
- Growth Stage: ${growthStage}
- Water Available: ${waterAvailable}
- Farm Size: ${farmSize}
- Priority Crops: ${priorityCrops.join(', ') || 'None specified'}

Create an emergency drought management plan:

1. IMMEDIATE TRIAGE
   - Which areas to prioritize
   - Which areas to abandon (if severe)
   - Resource allocation strategy

2. DEFICIT IRRIGATION STRATEGY
   - Critical growth stages to protect
   - When to reduce irrigation
   - How much to reduce
   - Expected yield impact

3. WATER RATIONING PLAN
   - Daily water budget
   - Distribution schedule
   - Priority allocation
   - Rotation strategy

4. CROP PROTECTION
   - Anti-transpirant application
   - Shade provision
   - Windbreak usage
   - Mulching emergency application

5. SOIL MANAGEMENT
   - Reducing soil evaporation
   - Cracking prevention
   - Moisture retention methods

6. SALVAGE STRATEGIES
   - Early harvest options
   - Crop insurance claims
   - Alternative uses for stressed crops

7. RECOVERY PLAN
   - Post-drought soil recovery
   - Replanting strategies
   - Restoring soil health
   - Financial recovery

8. FUTURE PREPAREDNESS
   - Water storage for next season
   - Drought-resistant varieties
   - System improvements
   - Insurance options

Format as actionable crisis management JSON.`;

      const plan = await this.getAIResponse(context);

      return {
        success: true,
        severityLevel,
        droughtPlan: plan,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error creating drought plan', { error: error.message });
      throw error;
    }
  }

  /**
   * Get AI response
   */
  async getAIResponse(context) {
    try {
      const systemPrompt = 'You are an irrigation and water management expert.';
      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        context,
        {
          temperature: 0.7,
          maxTokens: 4000
        }
      );

      logger.info(`Got water management advice from ${response.provider} (${response.model})`);

      return response.parsed || { content: response.content, format: 'text' };
    } catch (error) {
      logger.error('Error getting AI response', { error: error.message });
      throw error;
    }
  }
}

export default WaterManagementAgent;
