import { aiClient } from '../../config/ai-client.js';
import { logger } from '../../config/logger.js';
import cropKnowledgeBase from '../../data/knowledge_base/crops.js';

/**
 * Crop Advisor AI Agent
 * Provides intelligent crop recommendations based on location, climate, soil, and other factors
 * Supports multiple AI providers: OpenAI, Anthropic, Gemini, Kimi2, Grok
 */
class CropAdvisorAgent {
  constructor() {
    this.aiClient = aiClient;
  }

  /**
   * Analyze location and climate data
   */
  async analyzeLocation(locationData) {
    const { latitude, longitude, region, country } = locationData;

    // Determine climate zone based on latitude
    let climateZone = 'temperate';
    if (Math.abs(latitude) < 23.5) climateZone = 'tropical';
    else if (Math.abs(latitude) > 66.5) climateZone = 'polar';
    else if (Math.abs(latitude) > 40) climateZone = 'cold temperate';

    return {
      climateZone,
      region: region || 'Unknown',
      country: country || 'Unknown',
      coordinates: { latitude, longitude }
    };
  }

  /**
   * Get suitable crops based on parameters
   */
  async recommendCrops(params) {
    try {
      const {
        location,
        soilType,
        season,
        farmSize,
        waterAvailability = 'moderate',
        experience = 'intermediate',
        budget = 'moderate',
        marketAccess = true
      } = params;

      logger.info('Processing crop recommendation request', { location, soilType, season });

      // Analyze location
      const locationAnalysis = await this.analyzeLocation(location);

      // Build context for AI
      const context = this.buildCropContext(params, locationAnalysis);

      // Get AI recommendation
      const recommendation = await this.getAIRecommendation(context);

      // Enrich with knowledge base data
      const enrichedRecommendation = this.enrichWithKnowledgeBase(recommendation);

      return {
        success: true,
        location: locationAnalysis,
        recommendations: enrichedRecommendation,
        timestamp: new Date().toISOString(),
        metadata: {
          soilType,
          season,
          farmSize,
          waterAvailability,
          experience
        }
      };
    } catch (error) {
      logger.error('Error in crop recommendation', { error: error.message });
      throw error;
    }
  }

  /**
   * Build context for AI model
   */
  buildCropContext(params, locationAnalysis) {
    const { soilType, season, farmSize, waterAvailability, experience, budget, marketAccess } = params;

    return `You are an expert agricultural advisor specializing in crop selection and farming recommendations.

FARMER CONTEXT:
- Location: ${locationAnalysis.region}, ${locationAnalysis.country}
- Climate Zone: ${locationAnalysis.climateZone}
- Coordinates: ${locationAnalysis.coordinates.latitude}, ${locationAnalysis.coordinates.longitude}
- Soil Type: ${soilType}
- Current Season: ${season}
- Farm Size: ${farmSize}
- Water Availability: ${waterAvailability}
- Farmer Experience: ${experience}
- Budget: ${budget}
- Market Access: ${marketAccess ? 'Yes' : 'Limited'}

TASK:
Recommend the top 5 most suitable crops for this farmer. For each crop, provide:
1. Crop name (common and scientific)
2. Suitability score (1-10)
3. Reason for recommendation
4. Expected yield per acre
5. Growing duration (days)
6. Water requirements
7. Soil requirements
8. Market demand and profitability
9. Key challenges and solutions
10. Best planting time

Consider:
- Climate compatibility
- Soil suitability
- Water requirements vs availability
- Farmer's experience level
- Economic viability
- Market demand
- Seasonal appropriateness
- Risk factors

Format your response as JSON with the following structure:
{
  "crops": [
    {
      "name": "Crop Name",
      "scientificName": "Scientific name",
      "suitabilityScore": 9,
      "reason": "Why this crop is recommended",
      "expectedYield": "Yield amount per acre",
      "growingDuration": "90-120 days",
      "waterRequirement": "Medium (500-700mm)",
      "soilRequirement": "Description",
      "marketDemand": "High/Medium/Low with explanation",
      "profitability": "Expected profit analysis",
      "challenges": ["Challenge 1", "Challenge 2"],
      "solutions": ["Solution 1", "Solution 2"],
      "plantingTime": "Best months to plant",
      "harvestTime": "Expected harvest period"
    }
  ],
  "generalAdvice": "Overall farming advice for this location and season",
  "riskFactors": ["Risk 1", "Risk 2"],
  "successTips": ["Tip 1", "Tip 2"]
}`;
  }

  /**
   * Get recommendation from AI model
   * Now supports all configured AI providers
   */
  async getAIRecommendation(context) {
    try {
      const systemPrompt = 'You are an expert agricultural advisor specializing in crop selection and farming recommendations.';
      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        context,
        {
          temperature: 0.7,
          maxTokens: 4000
        }
      );

      logger.info(`Got recommendation from ${response.provider} (${response.model})`);

      return response.parsed || {
        crops: [],
        generalAdvice: response.content,
        riskFactors: [],
        successTips: []
      };
    } catch (error) {
      logger.error('Error getting AI recommendation', { error: error.message });
      throw error;
    }
  }

  /**
   * Enrich recommendation with knowledge base data
   */
  enrichWithKnowledgeBase(recommendation) {
    if (!recommendation.crops) return recommendation;

    recommendation.crops = recommendation.crops.map(crop => {
      const kbCrop = cropKnowledgeBase.findCropByName(crop.name);
      if (kbCrop) {
        return {
          ...crop,
          additionalInfo: kbCrop,
          companions: kbCrop.companionPlants || [],
          pests: kbCrop.commonPests || [],
          diseases: kbCrop.commonDiseases || []
        };
      }
      return crop;
    });

    return recommendation;
  }

  /**
   * Get detailed information about a specific crop
   */
  async getCropDetails(cropName, location) {
    try {
      const kbCrop = cropKnowledgeBase.findCropByName(cropName);
      const locationAnalysis = await this.analyzeLocation(location);

      const context = `Provide detailed growing information for ${cropName} in ${locationAnalysis.region}, ${locationAnalysis.climateZone} climate.

Include:
1. Complete growing guide
2. Month-by-month care calendar
3. Pest and disease management
4. Fertilizer schedule
5. Irrigation schedule
6. Harvesting guidelines
7. Post-harvest handling
8. Common mistakes to avoid

Format as detailed JSON.`;

      const details = await this.getAIRecommendation(context);

      return {
        success: true,
        crop: cropName,
        location: locationAnalysis,
        knowledgeBase: kbCrop,
        detailedGuide: details,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error getting crop details', { error: error.message });
      throw error;
    }
  }

  /**
   * Compare multiple crops
   */
  async compareCrops(cropNames, location, criteria = {}) {
    try {
      const context = `Compare these crops: ${cropNames.join(', ')} for growing in ${location.region}.

Compare based on:
- Profitability
- Water requirements
- Labor requirements
- Growing duration
- Market demand
- Risk factors
- Input costs
- Suitability for the region

Provide a detailed comparison table and recommendation.`;

      const comparison = await this.getAIRecommendation(context);

      return {
        success: true,
        crops: cropNames,
        location,
        comparison,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error comparing crops', { error: error.message });
      throw error;
    }
  }
}

export default CropAdvisorAgent;
