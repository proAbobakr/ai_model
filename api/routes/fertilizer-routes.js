import express from 'express';
import FertilizerAdvisorAgent from '../../agents/fertilizer_advisor/fertilizer_agent.js';
import { logger } from '../../config/logger.js';

const router = express.Router();
const fertilizerAgent = new FertilizerAdvisorAgent();

// Get fertilizer recommendations
router.post('/recommend', async (req, res) => {
  try {
    const {
      crop,
      soilAnalysis,
      growthStage,
      farmSize,
      budget,
      preferredType,
      previousFertilization
    } = req.body;

    // Validation
    if (!crop) {
      return res.status(400).json({
        success: false,
        error: 'Crop name is required'
      });
    }

    logger.info('Fertilizer recommendation request', { crop, growthStage });

    const recommendation = await fertilizerAgent.getFertilizerRecommendation({
      crop,
      soilAnalysis: soilAnalysis || {},
      growthStage,
      farmSize,
      budget,
      preferredType,
      previousFertilization
    });

    res.json(recommendation);
  } catch (error) {
    logger.error('Error in fertilizer recommendation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate fertilizer recommendations',
      message: error.message
    });
  }
});

// Analyze soil deficiencies
router.post('/soil-analysis', async (req, res) => {
  try {
    const { soilAnalysis } = req.body;

    if (!soilAnalysis) {
      return res.status(400).json({
        success: false,
        error: 'Soil analysis data is required'
      });
    }

    const analysis = await fertilizerAgent.analyzeSoilDeficiencies(soilAnalysis);
    res.json(analysis);
  } catch (error) {
    logger.error('Error analyzing soil:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze soil',
      message: error.message
    });
  }
});

// Get organic alternatives
router.post('/organic-alternatives', async (req, res) => {
  try {
    const { syntheticFertilizer } = req.body;

    if (!syntheticFertilizer) {
      return res.status(400).json({
        success: false,
        error: 'Synthetic fertilizer description is required'
      });
    }

    const alternatives = await fertilizerAgent.getOrganicAlternatives(syntheticFertilizer);
    res.json(alternatives);
  } catch (error) {
    logger.error('Error getting organic alternatives:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get organic alternatives',
      message: error.message
    });
  }
});

// Create fertilization schedule
router.post('/schedule', async (req, res) => {
  try {
    const {
      crop,
      plantingDate,
      expectedHarvestDate,
      soilAnalysis,
      farmingType
    } = req.body;

    if (!crop || !plantingDate) {
      return res.status(400).json({
        success: false,
        error: 'Crop and planting date are required'
      });
    }

    const schedule = await fertilizerAgent.createFertilizationSchedule({
      crop,
      plantingDate,
      expectedHarvestDate,
      soilAnalysis,
      farmingType
    });

    res.json(schedule);
  } catch (error) {
    logger.error('Error creating fertilization schedule:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create fertilization schedule',
      message: error.message
    });
  }
});

export default router;
