import express from 'express';
import storageAgent from '../../agents/storage_advisor/storage_agent.js';
import { logger } from '../../config/logger.js';

const router = express.Router();

/**
 * POST /api/storage/recommend
 * Get storage recommendations for produce
 */
router.post('/recommend', async (req, res) => {
  try {
    const { produce, quantity, storageType, climate, duration, facilities } = req.body;

    if (!produce || !quantity) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce and quantity are required'
      });
    }

    const recommendations = await storageAgent.getStorageRecommendations({
      produce,
      quantity,
      storageType,
      climate,
      duration,
      facilities
    });

    res.json({
      status: 'success',
      data: recommendations
    });

  } catch (error) {
    logger.error(`Error in storage recommendations: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate storage recommendations',
      error: error.message
    });
  }
});

/**
 * POST /api/storage/post-harvest
 * Get post-harvest handling guidelines
 */
router.post('/post-harvest', async (req, res) => {
  try {
    const { produce, harvestMethod } = req.body;

    if (!produce) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce is required'
      });
    }

    const handling = await storageAgent.getPostHarvestHandling(produce, harvestMethod);

    res.json({
      status: 'success',
      data: handling
    });

  } catch (error) {
    logger.error(`Error in post-harvest handling: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get post-harvest handling guidelines',
      error: error.message
    });
  }
});

/**
 * POST /api/storage/facility-design
 * Get storage facility design recommendations
 */
router.post('/facility-design', async (req, res) => {
  try {
    const { produces, capacity, budget, climate, storageDuration } = req.body;

    if (!produces || !capacity) {
      return res.status(400).json({
        status: 'error',
        message: 'Produces and capacity are required'
      });
    }

    const recommendations = await storageAgent.getFacilityRecommendations({
      produces,
      capacity,
      budget,
      climate,
      storageDuration
    });

    res.json({
      status: 'success',
      data: recommendations
    });

  } catch (error) {
    logger.error(`Error in facility recommendations: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get facility recommendations',
      error: error.message
    });
  }
});

/**
 * POST /api/storage/quality-monitoring
 * Get quality monitoring plan
 */
router.post('/quality-monitoring', async (req, res) => {
  try {
    const { produce, storageMethod, duration } = req.body;

    if (!produce || !storageMethod) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce and storage method are required'
      });
    }

    const monitoringPlan = await storageAgent.getQualityMonitoring(
      produce,
      storageMethod,
      duration
    );

    res.json({
      status: 'success',
      data: monitoringPlan
    });

  } catch (error) {
    logger.error(`Error in quality monitoring plan: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create quality monitoring plan',
      error: error.message
    });
  }
});

/**
 * POST /api/storage/loss-prevention
 * Get loss prevention strategies
 */
router.post('/loss-prevention', async (req, res) => {
  try {
    const { produce, storageType, commonIssues } = req.body;

    if (!produce || !storageType) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce and storage type are required'
      });
    }

    const lossPrevention = await storageAgent.getLossPrevention(
      produce,
      storageType,
      commonIssues
    });

    res.json({
      status: 'success',
      data: lossPrevention
    });

  } catch (error) {
    logger.error(`Error in loss prevention strategies: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get loss prevention strategies',
      error: error.message
    });
  }
});

/**
 * POST /api/storage/compare-methods
 * Compare different storage methods
 */
router.post('/compare-methods', async (req, res) => {
  try {
    const { produce, quantity, methods } = req.body;

    if (!produce || !quantity || !methods) {
      return res.status(400).json({
        status: 'error',
        message: 'Produce, quantity, and methods are required'
      });
    }

    const comparison = await storageAgent.compareStorageMethods(
      produce,
      quantity,
      methods
    );

    res.json({
      status: 'success',
      data: comparison
    });

  } catch (error) {
    logger.error(`Error comparing storage methods: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to compare storage methods',
      error: error.message
    });
  }
});

export default router;
