import express from 'express';
import economicsAgent from '../../agents/economics_advisor/economics_agent.js';
import { logger } from '../../config/logger.js';

const router = express.Router();

/**
 * POST /api/economics/market-strategy
 * Get market strategy recommendations
 */
router.post('/market-strategy', async (req, res) => {
  try {
    const { produce, quantity, location, currentPrice, harvestDate, quality } = req.body;

    if (!produce || !quantity || !location) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, quantity, and location are required'
      });
    }

    const strategy = await economicsAgent.getMarketStrategy({
      produce,
      quantity,
      location,
      currentPrice,
      harvestDate,
      quality
    });

    res.json({
      status: 'success',
      data: strategy
    });

  } catch (error) {
    logger.error(`Error in market strategy: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate market strategy',
      error: error.message
    });
  }
});

/**
 * POST /api/economics/optimal-timing
 * Get optimal selling timing
 */
router.post('/optimal-timing', async (req, res) => {
  try {
    const { produce, quantity, harvestDate, location, storageCapacity } = req.body;

    if (!produce || !quantity || !harvestDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, quantity, and harvest date are required'
      });
    }

    const timing = await economicsAgent.getOptimalTiming({
      produce,
      quantity,
      harvestDate,
      location,
      storageCapacity
    });

    res.json({
      status: 'success',
      data: timing
    });

  } catch (error) {
    logger.error(`Error in optimal timing: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to determine optimal timing',
      error: error.message
    });
  }
});

/**
 * POST /api/economics/pricing-strategy
 * Get pricing strategy recommendations
 */
router.post('/pricing-strategy', async (req, res) => {
  try {
    const { produce, costs, targetMarket, competition, quality } = req.body;

    if (!produce || !costs) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce and costs are required'
      });
    }

    const pricingStrategy = await economicsAgent.getPricingStrategy({
      produce,
      costs,
      targetMarket,
      competition,
      quality
    });

    res.json({
      status: 'success',
      data: pricingStrategy
    });

  } catch (error) {
    logger.error(`Error in pricing strategy: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create pricing strategy',
      error: error.message
    });
  }
});

/**
 * POST /api/economics/profit-analysis
 * Get profit maximization analysis
 */
router.post('/profit-analysis', async (req, res) => {
  try {
    const { produce, productionCosts, expectedYield, marketPrice, alternatives } = req.body;

    if (!produce || !productionCosts || !expectedYield || !marketPrice) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, production costs, expected yield, and market price are required'
      });
    }

    const analysis = await economicsAgent.getProfitAnalysis({
      produce,
      productionCosts,
      expectedYield,
      marketPrice,
      alternatives
    });

    res.json({
      status: 'success',
      data: analysis
    });

  } catch (error) {
    logger.error(`Error in profit analysis: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to perform profit analysis',
      error: error.message
    });
  }
});

/**
 * POST /api/economics/value-added
 * Get value-added opportunities
 */
router.post('/value-added', async (req, res) => {
  try {
    const { produce, currentPrice, facilities } = req.body;

    if (!produce || !currentPrice) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce and current price are required'
      });
    }

    const valueAdded = await economicsAgent.getValueAddedOptions(
      produce,
      currentPrice,
      facilities
    );

    res.json({
      status: 'success',
      data: valueAdded
    });

  } catch (error) {
    logger.error(`Error in value-added analysis: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to identify value-added opportunities',
      error: error.message
    });
  }
});

/**
 * POST /api/economics/demand-forecast
 * Get market demand forecast
 */
router.post('/demand-forecast', async (req, res) => {
  try {
    const { produce, location, timeframe } = req.body;

    if (!produce || !location || !timeframe) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, location, and timeframe are required'
      });
    }

    const forecast = await economicsAgent.getDemandForecast(
      produce,
      location,
      timeframe
    );

    res.json({
      status: 'success',
      data: forecast
    });

  } catch (error) {
    logger.error(`Error in demand forecast: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate demand forecast',
      error: error.message
    });
  }
});

/**
 * POST /api/economics/export-opportunities
 * Get export market opportunities
 */
router.post('/export-opportunities', async (req, res) => {
  try {
    const { produce, quantity, quality, location } = req.body;

    if (!produce || !quantity || !location) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, quantity, and location are required'
      });
    }

    const exportOps = await economicsAgent.getExportOpportunities(
      produce,
      quantity,
      quality,
      location
    );

    res.json({
      status: 'success',
      data: exportOps
    });

  } catch (error) {
    logger.error(`Error in export opportunities: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to identify export opportunities',
      error: error.message
    });
  }
});

/**
 * POST /api/economics/compare-crops
 * Compare economic returns of different crops
 */
router.post('/compare-crops', async (req, res) => {
  try {
    const { crops, farmSize, resources, location } = req.body;

    if (!crops || !farmSize || !location) {
      return res.status(400).json({
        status: 'error',
        message: 'Crops, farm size, and location are required'
      });
    }

    const comparison = await economicsAgent.compareCropEconomics(
      crops,
      farmSize,
      resources,
      location
    );

    res.json({
      status: 'success',
      data: comparison
    });

  } catch (error) {
    logger.error(`Error comparing crop economics: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to compare crop economics',
      error: error.message
    });
  }
});

export default router;
