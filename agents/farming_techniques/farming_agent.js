import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { config } from '../../config/config.js';
import { logger } from '../../config/logger.js';

/**
 * Farming Techniques AI Agent
 * Educates farmers on modern and traditional farming methods, best practices,
 * pest management, crop rotation, and sustainable agriculture
 */
class FarmingTechniquesAgent {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: config.anthropicApiKey,
    });
    this.openai = new OpenAI({
      apiKey: config.openaiApiKey,
    });
    this.model = config.aiProvider === 'anthropic' ? config.anthropicModel : config.openaiModel;
  }

  /**
   * Get farming techniques for a specific crop
   */
  async getTechniquesForCrop(cropName, params = {}) {
    try {
      const {
        farmSize = 'small',
        experience = 'intermediate',
        farmingStyle = 'conventional', // conventional, organic, sustainable
        location = {},
        specificInterest = null
      } = params;

      logger.info('Fetching farming techniques', { cropName, farmingStyle });

      const context = this.buildTechniquesContext(cropName, params);
      const techniques = await this.getAIResponse(context);

      return {
        success: true,
        crop: cropName,
        farmingStyle,
        techniques,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error fetching farming techniques', { error: error.message });
      throw error;
    }
  }

  /**
   * Build context for farming techniques
   */
  buildTechniquesContext(cropName, params) {
    const { farmSize, experience, farmingStyle, location, specificInterest } = params;

    return `You are an expert agricultural educator specializing in farming techniques and best practices.

CONTEXT:
- Crop: ${cropName}
- Farm Size: ${farmSize}
- Farmer Experience: ${experience}
- Farming Style: ${farmingStyle}
- Location: ${location.region || 'General'}
${specificInterest ? `- Specific Interest: ${specificInterest}` : ''}

TASK:
Provide comprehensive farming techniques and best practices for growing ${cropName}. Include:

1. LAND PREPARATION
   - Soil preparation methods
   - Tillage techniques
   - Bed/row preparation
   - Drainage setup

2. PLANTING TECHNIQUES
   - Seed selection and treatment
   - Spacing and depth
   - Direct seeding vs transplanting
   - Optimal planting methods

3. CROP MANAGEMENT
   - Weed control (mechanical, organic, chemical)
   - Mulching techniques
   - Staking and support systems
   - Pruning and training

4. PEST AND DISEASE MANAGEMENT
   - Integrated Pest Management (IPM)
   - Organic pest control methods
   - Disease prevention strategies
   - Natural predators and biological control
   - When and how to use pesticides (if necessary)

5. HARVESTING TECHNIQUES
   - Signs of maturity
   - Harvesting methods
   - Timing considerations
   - Tools and equipment

6. POST-HARVEST HANDLING
   - Cleaning and sorting
   - Storage methods
   - Packaging for market
   - Reducing post-harvest losses

7. SUSTAINABLE PRACTICES
   - Crop rotation strategies
   - Companion planting
   - Cover cropping
   - Soil conservation
   - Water conservation

8. MODERN TECHNIQUES
   - Precision farming
   - Drip irrigation
   - Greenhouse cultivation
   - Vertical farming (if applicable)
   - Technology integration

9. TRADITIONAL WISDOM
   - Time-tested methods
   - Indigenous practices
   - Lunar calendar considerations

10. COMMON MISTAKES AND SOLUTIONS
    - Frequent errors farmers make
    - How to avoid them
    - Troubleshooting guide

Format as detailed JSON with sections, subsections, and step-by-step instructions where applicable.`;
  }

  /**
   * Get pest management strategies
   */
  async getPestManagement(params) {
    try {
      const {
        crop,
        pest = null,
        disease = null,
        approach = 'integrated', // organic, chemical, integrated
        severity = 'moderate'
      } = params;

      logger.info('Fetching pest management strategies', { crop, pest, disease });

      const context = `You are a pest management expert.

SITUATION:
- Crop: ${crop}
${pest ? `- Pest: ${pest}` : ''}
${disease ? `- Disease: ${disease}` : ''}
- Management Approach: ${approach}
- Severity: ${severity}

Provide:
1. Identification guide (if pest/disease not specified, list common ones)
2. Prevention strategies
3. Early detection methods
4. Treatment options (organic and conventional)
5. Biological control methods
6. Chemical control (as last resort)
7. Monitoring and follow-up
8. Long-term management strategies

Include detailed, practical steps that farmers can implement immediately.

Format as JSON with clear sections and action items.`;

      const strategies = await this.getAIResponse(context);

      return {
        success: true,
        crop,
        pest,
        disease,
        approach,
        strategies,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error fetching pest management', { error: error.message });
      throw error;
    }
  }

  /**
   * Get crop rotation recommendations
   */
  async getCropRotation(params) {
    try {
      const {
        currentCrop,
        previousCrops = [],
        location,
        farmSize,
        soilType,
        objectives = ['soil_health', 'pest_control', 'profitability']
      } = params;

      logger.info('Generating crop rotation plan', { currentCrop, previousCrops });

      const context = `You are a crop rotation expert.

FARM DETAILS:
- Current Crop: ${currentCrop}
- Previous Crops: ${previousCrops.join(', ') || 'None specified'}
- Soil Type: ${soilType}
- Farm Size: ${farmSize}
- Location: ${location.region || 'General'}
- Objectives: ${objectives.join(', ')}

Provide:
1. Recommended rotation sequence (3-5 years)
2. Rationale for each rotation
3. Benefits (soil health, pest control, economics)
4. Nutrient cycling considerations
5. Cover crops recommendations
6. Fallow periods (if needed)
7. Expected improvements over time
8. Economic analysis of rotation
9. Implementation timeline
10. Monitoring indicators

Format as detailed JSON with year-by-year breakdown.`;

      const rotationPlan = await this.getAIResponse(context);

      return {
        success: true,
        currentCrop,
        rotationPlan,
        objectives,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error generating crop rotation', { error: error.message });
      throw error;
    }
  }

  /**
   * Get sustainable farming practices
   */
  async getSustainablePractices(params) {
    try {
      const {
        farmType = 'mixed',
        size,
        currentPractices = [],
        goals = [],
        budget = 'moderate'
      } = params;

      logger.info('Fetching sustainable practices', { farmType, goals });

      const context = `You are a sustainable agriculture expert.

FARM PROFILE:
- Farm Type: ${farmType}
- Size: ${size}
- Current Practices: ${currentPractices.join(', ') || 'Conventional'}
- Goals: ${goals.join(', ') || 'General sustainability'}
- Budget: ${budget}

Provide comprehensive sustainable farming recommendations:

1. SOIL HEALTH
   - Composting techniques
   - Organic matter management
   - Minimal tillage methods
   - Soil testing and amendments

2. WATER CONSERVATION
   - Rainwater harvesting
   - Efficient irrigation
   - Drought-resistant practices
   - Water quality management

3. BIODIVERSITY
   - Agroforestry
   - Hedgerows and windbreaks
   - Pollinator support
   - Wildlife corridors

4. ENERGY EFFICIENCY
   - Renewable energy options
   - Fuel conservation
   - Manual vs mechanized balance

5. WASTE REDUCTION
   - Composting farm waste
   - Recycling agricultural inputs
   - Reducing chemical use

6. ECONOMIC SUSTAINABILITY
   - Cost-benefit analysis
   - Market diversification
   - Value-added products
   - Direct marketing

7. IMPLEMENTATION ROADMAP
   - Priority actions
   - Timeline
   - Expected costs and returns
   - Certification options (if applicable)

Format as actionable JSON with step-by-step guides.`;

      const practices = await this.getAIResponse(context);

      return {
        success: true,
        farmType,
        practices,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error fetching sustainable practices', { error: error.message });
      throw error;
    }
  }

  /**
   * Get organic farming guide
   */
  async getOrganicFarmingGuide(crop, transitionStage = 'beginner') {
    try {
      logger.info('Generating organic farming guide', { crop, transitionStage });

      const context = `You are an organic farming expert.

Provide a complete guide for organic ${crop} cultivation:

TRANSITION STAGE: ${transitionStage}

Include:
1. Organic certification requirements
2. Transitioning from conventional to organic
3. Organic inputs and their sources
4. Natural fertilizers and soil amendments
5. Organic pest and disease control
6. Weed management without chemicals
7. Record keeping requirements
8. Marketing organic produce
9. Challenges and solutions
10. Cost comparison with conventional farming

Provide practical, actionable advice.

Format as comprehensive JSON guide.`;

      const guide = await this.getAIResponse(context);

      return {
        success: true,
        crop,
        transitionStage,
        guide,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error generating organic guide', { error: error.message });
      throw error;
    }
  }

  /**
   * Get AI response
   */
  async getAIResponse(context) {
    try {
      if (config.aiProvider === 'anthropic') {
        const response = await this.anthropic.messages.create({
          model: this.model,
          max_tokens: 4000,
          temperature: 0.7,
          messages: [{
            role: 'user',
            content: context
          }]
        });

        return this.parseResponse(response.content[0].text);
      } else {
        const response = await this.openai.chat.completions.create({
          model: this.model,
          messages: [{
            role: 'system',
            content: 'You are an expert agricultural educator.'
          }, {
            role: 'user',
            content: context
          }],
          temperature: 0.7,
          max_tokens: 4000,
          response_format: { type: 'json_object' }
        });

        return JSON.parse(response.choices[0].message.content);
      }
    } catch (error) {
      logger.error('Error getting AI response', { error: error.message });
      throw error;
    }
  }

  /**
   * Parse response
   */
  parseResponse(content) {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { content, format: 'text' };
    } catch (error) {
      return { content, format: 'text' };
    }
  }
}

export default FarmingTechniquesAgent;
