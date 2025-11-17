import express from 'express';
import FarmingTechniquesAgent from '../../agents/farming_techniques/farming_agent.js';
import { logger } from '../../config/logger.js';

const router = express.Router();
const farmingAgent = new FarmingTechniquesAgent();

// Get farming techniques for a crop
router.post('/techniques', async (req, res) => {
  try {
    const {
      crop,
      farmSize,
      experience,
      farmingStyle,
      location,
      specificInterest
    } = req.body;

    if (!crop) {
      return res.status(400).json({
        success: false,
        error: 'Crop name is required'
      });
    }

    logger.info('Farming techniques request', { crop, farmingStyle });

    const techniques = await farmingAgent.getTechniquesForCrop(crop, {
      farmSize,
      experience,
      farmingStyle,
      location,
      specificInterest
    });

    res.json(techniques);
  } catch (error) {
    logger.error('Error getting farming techniques:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get farming techniques',
      message: error.message
    });
  }
});

// Get pest management strategies
router.post('/pest-management', async (req, res) => {
  try {
    const { crop, pest, disease, approach, severity } = req.body;

    if (!crop) {
      return res.status(400).json({
        success: false,
        error: 'Crop name is required'
      });
    }

    const strategies = await farmingAgent.getPestManagement({
      crop,
      pest,
      disease,
      approach,
      severity
    });

    res.json(strategies);
  } catch (error) {
    logger.error('Error getting pest management:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get pest management strategies',
      message: error.message
    });
  }
});

// Get crop rotation recommendations
router.post('/crop-rotation', async (req, res) => {
  try {
    const {
      currentCrop,
      previousCrops,
      location,
      farmSize,
      soilType,
      objectives
    } = req.body;

    if (!currentCrop || !soilType) {
      return res.status(400).json({
        success: false,
        error: 'Current crop and soil type are required'
      });
    }

    const rotation = await farmingAgent.getCropRotation({
      currentCrop,
      previousCrops,
      location,
      farmSize,
      soilType,
      objectives
    });

    res.json(rotation);
  } catch (error) {
    logger.error('Error getting crop rotation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get crop rotation recommendations',
      message: error.message
    });
  }
});

// Get sustainable farming practices
router.post('/sustainable-practices', async (req, res) => {
  try {
    const { farmType, size, currentPractices, goals, budget } = req.body;

    const practices = await farmingAgent.getSustainablePractices({
      farmType,
      size,
      currentPractices,
      goals,
      budget
    });

    res.json(practices);
  } catch (error) {
    logger.error('Error getting sustainable practices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get sustainable practices',
      message: error.message
    });
  }
});

// Get organic farming guide
router.get('/organic-guide/:crop', async (req, res) => {
  try {
    const { crop } = req.params;
    const { transitionStage } = req.query;

    const guide = await farmingAgent.getOrganicFarmingGuide(
      crop,
      transitionStage || 'beginner'
    );

    res.json(guide);
  } catch (error) {
    logger.error('Error getting organic guide:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get organic farming guide',
      message: error.message
    });
  }
});

// Get best practices for a region
router.get('/best-practices/:region', async (req, res) => {
  try {
    const { region } = req.params;
    const { crop } = req.query;

    // This could be enhanced with regional knowledge base
    res.json({
      success: true,
      region,
      crop,
      message: 'Regional best practices endpoint - to be implemented with regional knowledge base',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error getting regional practices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get regional practices',
      message: error.message
    });
  }
});

export default router;
