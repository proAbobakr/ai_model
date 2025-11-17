import { aiClient } from '../../config/ai-client.js';
import { logger } from '../../config/logger.js';
import treeCropsKnowledgeBase from '../../data/knowledge_base/tree_crops.js';

/**
 * Tree Crop Advisor AI Agent
 * Specialized agent for fruit trees, nut trees, and palm species
 * Handles perennial crop recommendations and long-term management strategies
 * Supports multiple AI providers: OpenAI, Anthropic, Gemini, Kimi2, Grok
 */
class TreeAdvisorAgent {
  constructor() {
    this.aiClient = aiClient;
  }

  /**
   * Analyze location for tree crop suitability
   */
  async analyzeLocationForTrees(locationData) {
    const { latitude, longitude, region, country } = locationData;

    let climateZone = 'temperate';
    if (Math.abs(latitude) < 23.5) climateZone = 'tropical';
    else if (Math.abs(latitude) > 40) climateZone = 'cold temperate';
    else if (Math.abs(latitude) >= 23.5 && Math.abs(latitude) <= 35) climateZone = 'subtropical';

    // Additional climate considerations for trees
    const nearCoast = this.isNearCoast(longitude, latitude);
    const isArid = this.isAridRegion(region);

    return {
      climateZone,
      region: region || 'Unknown',
      country: country || 'Unknown',
      coordinates: { latitude, longitude },
      nearCoast,
      isArid,
      suitableFor: this.determineSuitableTreeTypes(climateZone, nearCoast, isArid)
    };
  }

  /**
   * Determine suitable tree types based on climate
   */
  determineSuitableTreeTypes(climateZone, nearCoast, isArid) {
    const suitability = [];

    if (climateZone === 'tropical') {
      suitability.push('coconut', 'mango', 'banana', 'papaya', 'tropical fruit trees');
    }

    if (climateZone === 'subtropical') {
      suitability.push('citrus', 'mango', 'avocado', 'pomegranate');
    }

    if (isArid || climateZone === 'arid') {
      suitability.push('date palm', 'olive', 'pomegranate', 'fig');
    }

    if (nearCoast && climateZone === 'tropical') {
      suitability.push('coconut', 'salt-tolerant palms');
    }

    return suitability;
  }

  /**
   * Check if location is near coast (simplified)
   */
  isNearCoast(longitude, latitude) {
    // This is a simplified check - would need actual coastal data
    return false; // Placeholder
  }

  /**
   * Check if region is arid
   */
  isAridRegion(region) {
    const aridKeywords = ['desert', 'arid', 'sahara', 'middle east', 'dry'];
    return aridKeywords.some(keyword =>
      region?.toLowerCase().includes(keyword)
    );
  }

  /**
   * Recommend tree crops based on parameters
   */
  async recommendTreeCrops(params) {
    try {
      const {
        location,
        soilType,
        waterAvailability = 'moderate',
        farmSize,
        experience = 'intermediate',
        budget = 'moderate',
        timeframe = 'long-term', // long-term vs quick-return
        purpose = 'commercial' // commercial, subsistence, mixed
      } = params;

      logger.info('Processing tree crop recommendation', { location, soilType, purpose });

      const locationAnalysis = await this.analyzeLocationForTrees(location);
      const context = this.buildTreeCropContext(params, locationAnalysis);
      const recommendation = await this.getAIRecommendation(context);
      const enrichedRecommendation = this.enrichWithTreeKnowledge(recommendation);

      return {
        success: true,
        location: locationAnalysis,
        recommendations: enrichedRecommendation,
        cropType: 'perennial',
        timeframe: 'Multi-year investment',
        timestamp: new Date().toISOString(),
        metadata: {
          soilType,
          waterAvailability,
          farmSize,
          experience,
          purpose
        }
      };
    } catch (error) {
      logger.error('Error in tree crop recommendation', { error: error.message });
      throw error;
    }
  }

  /**
   * Build context for tree crop recommendations
   */
  buildTreeCropContext(params, locationAnalysis) {
    const { soilType, waterAvailability, farmSize, experience, budget, timeframe, purpose } = params;

    return `You are an expert agricultural advisor specializing in TREE CROPS, FRUIT TREES, and PALM SPECIES.

FARMER CONTEXT:
- Location: ${locationAnalysis.region}, ${locationAnalysis.country}
- Climate Zone: ${locationAnalysis.climateZone}
- Coordinates: ${locationAnalysis.coordinates.latitude}, ${locationAnalysis.coordinates.longitude}
- Near Coast: ${locationAnalysis.nearCoast ? 'Yes' : 'No'}
- Arid Region: ${locationAnalysis.isArid ? 'Yes' : 'No'}
- Soil Type: ${soilType}
- Water Availability: ${waterAvailability}
- Farm Size: ${farmSize}
- Farmer Experience: ${experience}
- Budget: ${budget}
- Investment Timeframe: ${timeframe}
- Purpose: ${purpose}
- Naturally Suitable For: ${locationAnalysis.suitableFor.join(', ')}

TASK:
Recommend the top 5 most suitable TREE CROPS or PALMS for this farmer. Focus on perennial crops including:
- Fruit trees (mango, citrus, avocado, etc.)
- Date palms and other palm species
- Nut trees
- Olive trees
- Other commercial tree crops

For each tree/palm, provide:
1. Tree/Palm name (common and scientific)
2. Suitability score (1-10)
3. Reason for recommendation (climate fit, economic potential)
4. Expected timeline:
   - Years to first harvest
   - Years to full production
   - Productive lifespan
5. Expected yield (per tree and per acre)
6. Spacing requirements (trees per acre)
7. Water requirements (establishment vs mature)
8. Soil requirements
9. Initial investment costs
10. Long-term profitability
11. Market demand and value
12. Key management requirements (pruning, pollination, etc.)
13. Challenges specific to tree crops
14. Success factors

IMPORTANT CONSIDERATIONS FOR TREE CROPS:
- Long-term investment (3-10 years to full production)
- High initial investment but long productive life
- Requires patience and consistent management
- Spacing and land preparation critical
- Water management differs from annual crops
- Pruning and training essential
- Pest/disease prevention more critical
- Market access important for fresh fruit

Format your response as JSON with the following structure:
{
  "trees": [
    {
      "name": "Tree/Palm Name",
      "scientificName": "Scientific name",
      "category": "fruit_tree/palm/nut_tree",
      "suitabilityScore": 9,
      "reason": "Why this tree is recommended",
      "timeline": {
        "firstHarvest": "3-4 years",
        "fullProduction": "8-10 years",
        "productiveLife": "50-100 years"
      },
      "yield": {
        "perTree": "100-200 kg/tree",
        "perAcre": "Expected tonnage per acre"
      },
      "spacing": {
        "distance": "10x10 meters",
        "treesPerAcre": 43
      },
      "waterRequirement": "Description for establishment and mature trees",
      "soilRequirement": "Specific requirements",
      "investment": {
        "initial": "Per acre establishment cost",
        "annual": "Annual maintenance cost",
        "breakEven": "Years to break even"
      },
      "profitability": "Long-term profit analysis",
      "marketDemand": "High/Medium/Low with explanation",
      "management": ["Key management task 1", "Task 2"],
      "challenges": ["Challenge 1", "Challenge 2"],
      "successFactors": ["Factor 1", "Factor 2"]
    }
  ],
  "generalAdvice": "Overall tree farming advice for this location",
  "riskFactors": ["Risk 1", "Risk 2"],
  "successTips": ["Tip 1", "Tip 2"],
  "financialPlanning": "Important financial considerations for tree crops"
}`;
  }

  /**
   * Get recommendation from AI
   */
  async getAIRecommendation(context) {
    try {
      const systemPrompt = 'You are an expert in tree crop cultivation, fruit tree farming, and palm species management with deep knowledge of perennial agriculture.';
      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        context,
        {
          temperature: 0.7,
          maxTokens: 4000
        }
      );

      logger.info(`Got tree crop recommendation from ${response.provider} (${response.model})`);

      return response.parsed || {
        trees: [],
        generalAdvice: response.content,
        riskFactors: [],
        successTips: []
      };
    } catch (error) {
      logger.error('Error getting tree crop recommendation', { error: error.message });
      throw error;
    }
  }

  /**
   * Enrich with tree knowledge base
   */
  enrichWithTreeKnowledge(recommendation) {
    if (!recommendation.trees) return recommendation;

    recommendation.trees = recommendation.trees.map(tree => {
      const kbTree = treeCropsKnowledgeBase.findTreeCropByName(tree.name);
      if (kbTree) {
        return {
          ...tree,
          knowledgeBase: kbTree,
          varieties: kbTree.varieties || [],
          commonPests: kbTree.commonPests || [],
          commonDiseases: kbTree.commonDiseases || [],
          pruningGuide: kbTree.pruning || {},
          propagation: kbTree.propagation || {}
        };
      }
      return tree;
    });

    return recommendation;
  }

  /**
   * Get detailed tree cultivation guide
   */
  async getTreeCultivationGuide(treeName, location) {
    try {
      const kbTree = treeCropsKnowledgeBase.findTreeCropByName(treeName);
      const locationAnalysis = await this.analyzeLocationForTrees(location);

      const context = `Provide a complete cultivation guide for ${treeName} in ${locationAnalysis.region}, ${locationAnalysis.climateZone} climate.

Include:
1. SITE SELECTION AND PREPARATION
   - Ideal location criteria
   - Land preparation steps
   - Drainage requirements
   - Windbreak considerations

2. PLANTING
   - Best planting season
   - Hole preparation
   - Spacing and layout
   - Planting technique
   - Initial care (first 2 years)

3. YEAR-BY-YEAR CARE CALENDAR
   - Year 1-3: Establishment phase
   - Year 4-7: Development phase
   - Year 8+: Production phase
   - Monthly care tasks

4. IRRIGATION MANAGEMENT
   - Establishment phase needs
   - Mature tree needs
   - Critical growth stages
   - Irrigation systems comparison

5. FERTILIZATION PROGRAM
   - NPK requirements by age
   - Micronutrients
   - Application schedule
   - Organic vs synthetic options

6. PRUNING AND TRAINING
   - Formative pruning (young trees)
   - Production pruning (mature trees)
   - Training systems
   - Timing and techniques

7. POLLINATION (if applicable)
   - Pollination requirements
   - Pollinizer varieties needed
   - Manual pollination techniques

8. PEST AND DISEASE MANAGEMENT
   - Common pests for this region
   - Disease prevention
   - IPM strategies
   - Organic control methods

9. HARVESTING
   - Signs of maturity
   - Harvesting techniques
   - Timing considerations
   - Post-harvest handling

10. ECONOMIC ANALYSIS
    - Establishment costs breakdown
    - Annual maintenance costs
    - Expected returns by year
    - Break-even analysis
    - Market considerations

Format as detailed JSON with practical, actionable information.`;

      const guide = await this.getAIRecommendation(context);

      return {
        success: true,
        tree: treeName,
        location: locationAnalysis,
        knowledgeBase: kbTree,
        cultivationGuide: guide,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error getting tree cultivation guide', { error: error.message });
      throw error;
    }
  }

  /**
   * Compare multiple tree crops
   */
  async compareTreeCrops(treeNames, location, criteria = {}) {
    try {
      const context = `Compare these tree crops: ${treeNames.join(', ')} for cultivation in ${location.region}.

Compare based on:
- Time to first harvest vs full production
- Initial investment required
- Long-term profitability (20-year projection)
- Water requirements
- Labor requirements
- Land utilization efficiency
- Market demand and price stability
- Climate suitability for this region
- Risk factors and challenges
- Ease of management

Consider that these are perennial crops requiring long-term commitment.

Provide detailed comparison table and recommendation for this farmer's situation.`;

      const comparison = await this.getAIRecommendation(context);

      return {
        success: true,
        trees: treeNames,
        location,
        comparison,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error comparing tree crops', { error: error.message });
      throw error;
    }
  }

  /**
   * Get intercropping recommendations for tree orchards
   */
  async getIntercroppingAdvice(mainTree, location, farmSize) {
    try {
      const context = `The farmer is growing ${mainTree} trees. Recommend suitable intercropping options.

CONTEXT:
- Main crop: ${mainTree}
- Location: ${location.region}
- Farm size: ${farmSize}

Provide recommendations for:
1. ANNUAL CROPS FOR INTER-ROWS
   - Suitable during establishment phase (years 1-5)
   - Suitable during production phase
   - Spacing considerations

2. COVER CROPS
   - Nitrogen-fixing options
   - Mulch-producing options
   - Living mulches

3. COMPANION TREES/SHRUBS
   - Compatible species
   - Multi-story farming options

4. LIVESTOCK INTEGRATION
   - Silvopasture options
   - Poultry integration

5. ECONOMIC BENEFITS
   - Income during establishment phase
   - Risk diversification
   - Soil improvement benefits

Format as JSON with detailed intercropping strategies.`;

      const advice = await this.getAIRecommendation(context);

      return {
        success: true,
        mainTree,
        intercroppingAdvice: advice,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error getting intercropping advice', { error: error.message });
      throw error;
    }
  }

  /**
   * Get pruning schedule and techniques
   */
  async getPruningGuide(treeName, treeAge) {
    try {
      const kbTree = treeCropsKnowledgeBase.findTreeCropByName(treeName);

      const context = `Provide detailed pruning guide for ${treeName} trees that are ${treeAge} years old.

Include:
1. PRUNING OBJECTIVES
   - What to achieve at this age
   - Tree shape goals

2. TIMING
   - Best season for pruning
   - Frequency
   - Avoid pruning during...

3. TECHNIQUES
   - Which branches to remove
   - How much to remove
   - Cutting techniques
   - Tools needed

4. STEP-BY-STEP PROCESS
   - Detailed pruning sequence
   - Before/after guidelines

5. SPECIAL CONSIDERATIONS
   - Flowering and fruiting impact
   - Wound treatment
   - Post-pruning care

6. COMMON MISTAKES
   - What to avoid
   - How to correct over-pruning

Format as practical JSON guide with visual descriptions.`;

      const guide = await this.getAIRecommendation(context);

      return {
        success: true,
        tree: treeName,
        age: treeAge,
        knowledgeBase: kbTree?.pruning,
        detailedGuide: guide,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error getting pruning guide', { error: error.message });
      throw error;
    }
  }
}

export default TreeAdvisorAgent;
