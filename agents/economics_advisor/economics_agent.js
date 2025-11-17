import { aiClient } from '../../config/ai-client.js';
import { logger } from '../../config/logger.js';
import marketDataDB from '../../data/knowledge_base/market_data.js';

/**
 * Economics Advisor Agent
 *
 * Provides intelligent economic strategies for:
 * - Market price analysis and trends
 * - Optimal selling timing
 * - Cost-benefit analysis
 * - Profit maximization strategies
 * - Market demand forecasting
 * - Pricing strategies
 * - Export opportunities
 * - Value-added processing options
 */
class EconomicsAdvisorAgent {
  constructor() {
    this.aiClient = aiClient;
    this.marketDatabase = marketDataDB;
  }

  /**
   * Get market strategy recommendations
   */
  async getMarketStrategy(params) {
    const { produce, quantity, location, currentPrice, harvestDate, quality } = params;

    try {
      logger.info(`Getting market strategy for ${produce}`);

      // Get market data from knowledge base
      const marketData = this.getMarketData(produce);

      // Build context
      const context = this.buildMarketContext({
        produce,
        quantity,
        location,
        currentPrice,
        harvestDate,
        quality,
        marketData
      });

      // Get AI recommendations
      const strategy = await this.getAIStrategy(context);

      logger.info(`Market strategy generated for ${produce}`);
      return {
        produce,
        quantity,
        location,
        strategy,
        marketInsights: marketData,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error in market strategy: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get optimal selling timing
   */
  async getOptimalTiming(params) {
    const { produce, quantity, harvestDate, location, storageCapacity } = params;

    try {
      logger.info(`Getting optimal selling timing for ${produce}`);

      const marketData = this.getMarketData(produce);

      const systemPrompt = `You are an expert agricultural economist specializing in market timing and price optimization.
Analyze market trends and recommend optimal selling timing.

Consider:
- Seasonal price patterns
- Supply and demand dynamics
- Storage costs vs price appreciation
- Market competition
- Quality degradation over time
- Storage capacity constraints

Respond with valid JSON only:
{
  "recommendation": {
    "timing": "immediate/1-month/2-months/3-months/seasonal",
    "reasoning": "...",
    "expectedPrice": "...",
    "confidence": "high/medium/low"
  },
  "scenarios": [
    {
      "timing": "...",
      "expectedPrice": "...",
      "storageCost": "...",
      "qualityFactor": "...",
      "netReturn": "...",
      "risk": "low/medium/high"
    }
  ],
  "marketTrends": {
    "currentTrend": "increasing/stable/decreasing",
    "seasonalPattern": "...",
    "demandOutlook": "..."
  },
  "recommendations": [
    {
      "action": "...",
      "timing": "...",
      "quantity": "...",
      "reason": "..."
    }
  ],
  "risks": ["..."],
  "opportunities": ["..."]
}`;

      const userPrompt = `Produce: ${produce}
Quantity: ${quantity}
Harvest date: ${harvestDate}
Location: ${JSON.stringify(location)}
Storage capacity: ${storageCapacity || 'limited'}
${marketData ? `\nMarket data: ${JSON.stringify(marketData.pricing)}` : ''}

Recommend optimal selling timing.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produce,
        quantity,
        harvestDate,
        timingRecommendation: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting optimal timing: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get pricing strategy recommendations
   */
  async getPricingStrategy(params) {
    const { produce, costs, targetMarket, competition, quality } = params;

    try {
      logger.info(`Getting pricing strategy for ${produce}`);

      const systemPrompt = `You are an expert in agricultural pricing strategies and market economics.
Develop a comprehensive pricing strategy that maximizes profitability while remaining competitive.

Consider:
- Production costs and breakeven analysis
- Market competition and positioning
- Quality differentiation
- Target market willingness to pay
- Volume discounts and bulk pricing
- Seasonal pricing variations

Respond with valid JSON only:
{
  "pricingStrategy": {
    "recommended": "...",
    "type": "cost-plus/market-based/value-based/dynamic",
    "reasoning": "..."
  },
  "pricePoints": {
    "minimum": "...",
    "optimal": "...",
    "premium": "...",
    "bulk": "..."
  },
  "breakeven": {
    "quantity": "...",
    "price": "...",
    "margin": "..."
  },
  "competitiveAnalysis": {
    "position": "premium/mid-range/budget",
    "differentiation": ["..."],
    "advantages": ["..."]
  },
  "volumeStrategy": [
    {
      "range": "...",
      "price": "...",
      "margin": "..."
    }
  ],
  "seasonalAdjustments": [
    {
      "period": "...",
      "adjustment": "...",
      "reason": "..."
    }
  ],
  "recommendations": ["..."]
}`;

      const userPrompt = `Produce: ${produce}
Production costs: ${JSON.stringify(costs)}
Target market: ${targetMarket}
Competition: ${competition}
Quality grade: ${quality}

Develop comprehensive pricing strategy.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produce,
        targetMarket,
        pricingStrategy: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting pricing strategy: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get profit maximization analysis
   */
  async getProfitAnalysis(params) {
    const { produce, productionCosts, expectedYield, marketPrice, alternatives } = params;

    try {
      logger.info(`Getting profit analysis for ${produce}`);

      const systemPrompt = `You are an expert in agricultural economics and farm profitability analysis.
Analyze profit potential and recommend strategies for maximization.

Calculate:
- Gross revenue
- Net profit
- Profit margin
- Return on investment (ROI)
- Break-even analysis
- Risk-adjusted returns

Respond with valid JSON only:
{
  "financialMetrics": {
    "grossRevenue": "...",
    "totalCosts": "...",
    "netProfit": "...",
    "profitMargin": "...",
    "roi": "..."
  },
  "costBreakdown": [
    {
      "category": "...",
      "amount": "...",
      "percentage": "..."
    }
  ],
  "revenueStreams": [
    {
      "source": "...",
      "amount": "...",
      "percentage": "..."
    }
  ],
  "optimizationOpportunities": [
    {
      "area": "...",
      "currentCost": "...",
      "potentialSaving": "...",
      "implementation": "..."
    }
  ],
  "comparison": {
    "industryAverage": "...",
    "topPerformers": "...",
    "yourPosition": "..."
  },
  "recommendations": [
    {
      "action": "...",
      "impact": "...",
      "priority": "high/medium/low"
    }
  ],
  "riskAssessment": {
    "level": "low/medium/high",
    "factors": ["..."],
    "mitigation": ["..."]
  }
}`;

      const userPrompt = `Produce: ${produce}
Production costs: ${JSON.stringify(productionCosts)}
Expected yield: ${expectedYield}
Current market price: ${marketPrice}
Alternatives considered: ${alternatives || 'none'}

Analyze profit potential and optimization opportunities.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3500 }
      );

      return {
        produce,
        analysis: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error in profit analysis: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get value-added opportunities
   */
  async getValueAddedOptions(produce, currentPrice, facilities) {
    try {
      logger.info(`Getting value-added options for ${produce}`);

      const marketData = this.getMarketData(produce);

      const systemPrompt = `You are an expert in agricultural value-added processing and product development.
Identify opportunities to increase product value through processing, packaging, or branding.

Explore:
- Processing options (drying, freezing, canning, etc.)
- Packaging improvements
- Organic/premium certification
- Branding and marketing
- Direct-to-consumer sales
- Export opportunities

Respond with valid JSON only:
{
  "opportunities": [
    {
      "type": "...",
      "description": "...",
      "investment": "...",
      "valueIncrease": "...",
      "marketDemand": "high/medium/low",
      "feasibility": "high/medium/low",
      "timeframe": "..."
    }
  ],
  "processing": [
    {
      "method": "...",
      "equipment": ["..."],
      "cost": "...",
      "priceMultiplier": "...",
      "shelfLife": "...",
      "marketSize": "..."
    }
  ],
  "certification": [
    {
      "type": "organic/fair-trade/GAP/other",
      "requirements": ["..."],
      "cost": "...",
      "premiumPrice": "...",
      "marketAccess": ["..."]
    }
  ],
  "marketing": [
    {
      "channel": "...",
      "investment": "...",
      "reachable": "...",
      "margins": "..."
    }
  ],
  "recommendations": {
    "shortTerm": ["..."],
    "mediumTerm": ["..."],
    "longTerm": ["..."]
  },
  "successStories": ["..."]
}`;

      const userPrompt = `Produce: ${produce}
Current selling price: ${currentPrice}
Available facilities: ${JSON.stringify(facilities)}
${marketData ? `\nValue-added products: ${JSON.stringify(marketData.valueAdded)}` : ''}

Identify value-added opportunities.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produce,
        currentPrice,
        valueAddedOptions: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting value-added options: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get market demand forecast
   */
  async getDemandForecast(produce, location, timeframe) {
    try {
      logger.info(`Getting demand forecast for ${produce}`);

      const marketData = this.getMarketData(produce);

      const systemPrompt = `You are an expert in agricultural market analysis and demand forecasting.
Forecast market demand and price trends.

Analyze:
- Historical trends
- Seasonal patterns
- Economic indicators
- Population growth
- Dietary trends
- Competition
- Supply factors

Respond with valid JSON only:
{
  "forecast": [
    {
      "period": "...",
      "demand": "increasing/stable/decreasing",
      "expectedPrice": "...",
      "confidence": "high/medium/low",
      "factors": ["..."]
    }
  ],
  "trends": {
    "shortTerm": "...",
    "mediumTerm": "...",
    "longTerm": "..."
  },
  "opportunities": [
    {
      "window": "...",
      "demand": "...",
      "reason": "...",
      "action": "..."
    }
  ],
  "threats": [
    {
      "risk": "...",
      "probability": "high/medium/low",
      "impact": "...",
      "mitigation": "..."
    }
  ],
  "marketSegments": [
    {
      "segment": "...",
      "growth": "...",
      "opportunity": "..."
    }
  ],
  "recommendations": ["..."]
}`;

      const userPrompt = `Produce: ${produce}
Location: ${JSON.stringify(location)}
Forecast timeframe: ${timeframe}
${marketData ? `\nHistorical data: ${JSON.stringify(marketData.trends)}` : ''}

Forecast market demand.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produce,
        location,
        timeframe,
        forecast: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error in demand forecast: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get export opportunities
   */
  async getExportOpportunities(produce, quantity, quality, location) {
    try {
      logger.info(`Getting export opportunities for ${produce}`);

      const systemPrompt = `You are an expert in agricultural export markets and international trade.
Identify export opportunities and provide guidance on export procedures.

Consider:
- Target markets and demand
- Quality requirements and standards
- Certification needs
- Logistics and transportation
- Pricing and competitiveness
- Trade regulations
- Payment terms

Respond with valid JSON only:
{
  "markets": [
    {
      "country": "...",
      "demand": "high/medium/low",
      "pricePoint": "...",
      "requirements": ["..."],
      "competition": "low/medium/high",
      "potential": "..."
    }
  ],
  "certifications": [
    {
      "type": "...",
      "requiredBy": ["..."],
      "cost": "...",
      "timeline": "...",
      "benefits": ["..."]
    }
  ],
  "logistics": {
    "transportation": "...",
    "packaging": "...",
    "documentation": ["..."],
    "timeline": "..."
  },
  "financials": {
    "exportPrice": "...",
    "costs": "...",
    "netMargin": "...",
    "paymentTerms": "..."
  },
  "risks": [
    {
      "risk": "...",
      "mitigation": "..."
    }
  ],
  "nextSteps": ["..."],
  "resources": ["..."]
}`;

      const userPrompt = `Produce: ${produce}
Quantity available: ${quantity}
Quality grade: ${quality}
Current location: ${JSON.stringify(location)}

Identify export opportunities and requirements.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3000 }
      );

      return {
        produce,
        quantity,
        quality,
        exportOpportunities: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error getting export opportunities: ${error.message}`);
      throw error;
    }
  }

  /**
   * Compare economic returns of different crops
   */
  async compareCropEconomics(crops, farmSize, resources, location) {
    try {
      logger.info('Comparing crop economics');

      const systemPrompt = `You are an expert agricultural economist specializing in crop profitability analysis.
Compare the economic returns of different crops.

Analyze:
- Revenue potential
- Production costs
- Profit margins
- ROI and payback period
- Risk levels
- Resource requirements
- Market stability

Respond with valid JSON only:
{
  "comparison": [
    {
      "crop": "...",
      "grossRevenue": "...",
      "costs": "...",
      "netProfit": "...",
      "profitPerHectare": "...",
      "roi": "...",
      "risk": "low/medium/high",
      "laborRequirement": "...",
      "waterRequirement": "..."
    }
  ],
  "ranking": [
    {
      "rank": 1,
      "crop": "...",
      "score": "...",
      "reason": "..."
    }
  ],
  "analysis": {
    "mostProfitable": "...",
    "lowestRisk": "...",
    "bestForBeginner": "...",
    "bestLongTerm": "..."
  },
  "recommendations": {
    "singleCrop": "...",
    "diversified": ["..."],
    "reasoning": "..."
  },
  "marketOutlook": {
    "strongDemand": ["..."],
    "saturated": ["..."],
    "emerging": ["..."]
  }
}`;

      const userPrompt = `Crops to compare: ${Array.isArray(crops) ? crops.join(', ') : crops}
Farm size: ${farmSize}
Available resources: ${JSON.stringify(resources)}
Location: ${JSON.stringify(location)}

Compare economic returns comprehensively.`;

      const response = await this.aiClient.generateCompletion(
        systemPrompt,
        userPrompt,
        { temperature: 0.7, maxTokens: 3500 }
      );

      return {
        crops,
        farmSize,
        location,
        comparison: response.parsed || response.content,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error comparing crop economics: ${error.message}`);
      throw error;
    }
  }

  /**
   * Build context for market strategy
   */
  buildMarketContext(params) {
    const { produce, quantity, location, currentPrice, harvestDate, quality, marketData } = params;

    return `Produce: ${produce}
Quantity: ${quantity}
Location: ${JSON.stringify(location)}
Current market price: ${currentPrice}
Harvest date: ${harvestDate}
Quality grade: ${quality}
${marketData ? `\nMarket data:\n${JSON.stringify(marketData, null, 2)}` : ''}

Provide comprehensive market strategy recommendations.`;
  }

  /**
   * Get AI strategy recommendations
   */
  async getAIStrategy(context) {
    const systemPrompt = `You are an expert agricultural market strategist and economist.
Provide comprehensive market strategy covering pricing, timing, channels, and risk management.

Consider:
- Current market conditions
- Price trends and forecasts
- Optimal selling timing
- Target markets and channels
- Competition and differentiation
- Risk mitigation

Respond with valid JSON only:
{
  "sellingStrategy": {
    "timing": "...",
    "channels": ["..."],
    "targetMarket": "...",
    "reasoning": "..."
  },
  "pricing": {
    "recommended": "...",
    "range": {"min": "...", "max": "..."},
    "strategy": "..."
  },
  "marketChannels": [
    {
      "channel": "...",
      "advantages": ["..."],
      "price": "...",
      "volume": "..."
    }
  ],
  "timing": {
    "immediate": {"price": "...", "reasoning": "..."},
    "oneMonth": {"price": "...", "reasoning": "..."},
    "threeMonths": {"price": "...", "reasoning": "..."}
  },
  "differentiation": {
    "quality": "...",
    "packaging": "...",
    "branding": "...",
    "certification": "..."
  },
  "riskManagement": [
    {
      "risk": "...",
      "probability": "high/medium/low",
      "mitigation": "..."
    }
  ],
  "actionPlan": [
    {
      "step": "...",
      "timing": "...",
      "priority": "high/medium/low"
    }
  ]
}`;

    const response = await this.aiClient.generateCompletion(
      systemPrompt,
      context,
      { temperature: 0.7, maxTokens: 3000 }
    );

    return response.parsed || response.content;
  }

  /**
   * Get market data from knowledge base
   */
  getMarketData(produce) {
    const produceLower = produce.toLowerCase();
    const data = this.marketDatabase.find(
      item => item.name.toLowerCase() === produceLower ||
              item.id === produceLower ||
              (item.aliases && item.aliases.some(alias => alias.toLowerCase() === produceLower))
    );
    return data;
  }
}

export default new EconomicsAdvisorAgent();
