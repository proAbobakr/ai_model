import express from 'express';
import WaterManagementAgent from '../../agents/water_management/water_agent.js';
import { logger } from '../../config/logger.js';

const router = express.Router();
const waterAgent = new WaterManagementAgent();

// Generate irrigation schedule
router.post('/irrigation-schedule', async (req, res) => {
  try {
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
    } = req.body;

    if (!crop || !soilType || !climate) {
      return res.status(400).json({
        success: false,
        error: 'Crop, soil type, and climate are required'
      });
    }

    logger.info('Irrigation schedule request', { crop, irrigationSystem });

    const schedule = await waterAgent.generateIrrigationSchedule({
      crop,
      soilType,
      climate,
      farmSize,
      irrigationSystem,
      waterSource,
      growthStage,
      rainfall,
      temperature
    });

    res.json(schedule);
  } catch (error) {
    logger.error('Error generating irrigation schedule:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate irrigation schedule',
      message: error.message
    });
  }
});

// Analyze water quality
router.post('/quality-analysis', async (req, res) => {
  try {
    const { waterTestResults } = req.body;

    if (!waterTestResults) {
      return res.status(400).json({
        success: false,
        error: 'Water test results are required'
      });
    }

    const analysis = await waterAgent.analyzeWaterQuality(waterTestResults);
    res.json(analysis);
  } catch (error) {
    logger.error('Error analyzing water quality:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze water quality',
      message: error.message
    });
  }
});

// Get water conservation strategies
router.post('/conservation-strategies', async (req, res) => {
  try {
    const {
      farmType,
      currentWaterUsage,
      waterAvailability,
      budget,
      climate,
      crops
    } = req.body;

    const strategies = await waterAgent.getWaterConservationStrategies({
      farmType,
      currentWaterUsage,
      waterAvailability,
      budget,
      climate,
      crops
    });

    res.json(strategies);
  } catch (error) {
    logger.error('Error getting conservation strategies:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get conservation strategies',
      message: error.message
    });
  }
});

// Create drought management plan
router.post('/drought-management', async (req, res) => {
  try {
    const {
      severityLevel,
      crop,
      growthStage,
      waterAvailable,
      farmSize,
      priorityCrops
    } = req.body;

    if (!severityLevel || !crop) {
      return res.status(400).json({
        success: false,
        error: 'Severity level and crop are required'
      });
    }

    const plan = await waterAgent.createDroughtManagementPlan({
      severityLevel,
      crop,
      growthStage,
      waterAvailable,
      farmSize,
      priorityCrops
    });

    res.json(plan);
  } catch (error) {
    logger.error('Error creating drought plan:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create drought management plan',
      message: error.message
    });
  }
});

export default router;
