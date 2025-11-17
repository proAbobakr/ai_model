import express from 'express';
import haulingAgent from '../../agents/hauling_advisor/hauling_agent.js';
import { logger } from '../../config/logger.js';

const router = express.Router();

/**
 * POST /api/hauling/transportation-plan
 * Get comprehensive transportation plan
 */
router.post('/transportation-plan', async (req, res) => {
  try {
    const { produce, quantity, origin, destination, timeframe, budget } = req.body;

    if (!produce || !quantity || !origin || !destination) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, quantity, origin, and destination are required'
      });
    }

    const plan = await haulingAgent.getTransportationPlan({
      produce,
      quantity,
      origin,
      destination,
      timeframe,
      budget
    });

    res.json({
      status: 'success',
      data: plan
    });

  } catch (error) {
    logger.error(`Error in transportation plan: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create transportation plan',
      error: error.message
    });
  }
});

/**
 * POST /api/hauling/vehicle-requirements
 * Get vehicle specifications and requirements
 */
router.post('/vehicle-requirements', async (req, res) => {
  try {
    const { produce, quantity, distance } = req.body;

    if (!produce || !quantity || !distance) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, quantity, and distance are required'
      });
    }

    const requirements = await haulingAgent.getVehicleRequirements(
      produce,
      quantity,
      distance
    );

    res.json({
      status: 'success',
      data: requirements
    });

  } catch (error) {
    logger.error(`Error in vehicle requirements: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to determine vehicle requirements',
      error: error.message
    });
  }
});

/**
 * POST /api/hauling/packaging-guidelines
 * Get packaging and loading guidelines
 */
router.post('/packaging-guidelines', async (req, res) => {
  try {
    const { produce, quantity, transportMode } = req.body;

    if (!produce || !quantity) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce and quantity are required'
      });
    }

    const guidelines = await haulingAgent.getPackagingGuidelines(
      produce,
      quantity,
      transportMode
    );

    res.json({
      status: 'success',
      data: guidelines
    });

  } catch (error) {
    logger.error(`Error in packaging guidelines: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get packaging guidelines',
      error: error.message
    });
  }
});

/**
 * POST /api/hauling/route-optimization
 * Get route optimization recommendations
 */
router.post('/route-optimization', async (req, res) => {
  try {
    const { origin, destination, produce, quantity, constraints } = req.body;

    if (!origin || !destination || !produce) {
      return res.status(400).json({
        status: 'error',
        message: 'Origin, destination, and produce are required'
      });
    }

    const optimization = await haulingAgent.getRouteOptimization({
      origin,
      destination,
      produce,
      quantity,
      constraints
    });

    res.json({
      status: 'success',
      data: optimization
    });

  } catch (error) {
    logger.error(`Error in route optimization: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to optimize route',
      error: error.message
    });
  }
});

/**
 * POST /api/hauling/cost-optimization
 * Get cost optimization strategies
 */
router.post('/cost-optimization', async (req, res) => {
  try {
    const { produce, quantity, distance, currentCosts } = req.body;

    if (!produce || !quantity || !distance) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, quantity, and distance are required'
      });
    }

    const optimization = await haulingAgent.getCostOptimization({
      produce,
      quantity,
      distance,
      currentCosts
    });

    res.json({
      status: 'success',
      data: optimization
    });

  } catch (error) {
    logger.error(`Error in cost optimization: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to optimize costs',
      error: error.message
    });
  }
});

/**
 * POST /api/hauling/quality-preservation
 * Get quality preservation during transport
 */
router.post('/quality-preservation', async (req, res) => {
  try {
    const { produce, duration, conditions } = req.body;

    if (!produce || !duration) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce and duration are required'
      });
    }

    const preservation = await haulingAgent.getQualityPreservation(
      produce,
      duration,
      conditions
    );

    res.json({
      status: 'success',
      data: preservation
    });

  } catch (error) {
    logger.error(`Error in quality preservation: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get quality preservation plan',
      error: error.message
    });
  }
});

/**
 * POST /api/hauling/compliance-requirements
 * Get documentation and compliance requirements
 */
router.post('/compliance-requirements', async (req, res) => {
  try {
    const { produce, origin, destination, quantity, international } = req.body;

    if (!produce || !origin || !destination) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, origin, and destination are required'
      });
    }

    const compliance = await haulingAgent.getComplianceRequirements({
      produce,
      origin,
      destination,
      quantity,
      international
    });

    res.json({
      status: 'success',
      data: compliance
    });

  } catch (error) {
    logger.error(`Error in compliance requirements: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get compliance requirements',
      error: error.message
    });
  }
});

/**
 * POST /api/hauling/compare-modes
 * Compare different transportation modes
 */
router.post('/compare-modes', async (req, res) => {
  try {
    const { produce, quantity, distance } = req.body;

    if (!produce || !quantity || !distance) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, quantity, and distance are required'
      });
    }

    const comparison = await haulingAgent.compareTransportModes(
      produce,
      quantity,
      distance
    );

    res.json({
      status: 'success',
      data: comparison
    });

  } catch (error) {
    logger.error(`Error comparing transport modes: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to compare transport modes',
      error: error.message
    });
  }
});

export default router;
