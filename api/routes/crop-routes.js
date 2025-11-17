import express from 'express';
import CropAdvisorAgent from '../../agents/crop_advisor/crop_agent.js';
import { logger } from '../../config/logger.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const cropAgent = new CropAdvisorAgent();

// Get crop recommendations
router.post('/recommend', async (req, res) => {
  try {
    const {
      location,
      soilType,
      season,
      farmSize,
      waterAvailability,
      experience,
      budget,
      marketAccess
    } = req.body;

    // Validation
    if (!location || !soilType || !season) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: location, soilType, season'
      });
    }

    logger.info('Crop recommendation request received', { location, soilType, season });

    const recommendation = await cropAgent.recommendCrops({
      location,
      soilType,
      season,
      farmSize,
      waterAvailability,
      experience,
      budget,
      marketAccess
    });

    res.json(recommendation);
  } catch (error) {
    logger.error('Error in crop recommendation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate crop recommendations',
      message: error.message
    });
  }
});

// Get detailed crop information
router.get('/:cropName', async (req, res) => {
  try {
    const { cropName } = req.params;
    const { latitude, longitude, region } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query parameters: latitude, longitude'
      });
    }

    const location = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      region: region || 'Unknown'
    };

    const details = await cropAgent.getCropDetails(cropName, location);
    res.json(details);
  } catch (error) {
    logger.error('Error getting crop details:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get crop details',
      message: error.message
    });
  }
});

// Compare multiple crops
router.post('/compare', async (req, res) => {
  try {
    const { crops, location, criteria } = req.body;

    if (!crops || !Array.isArray(crops) || crops.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least 2 crops to compare'
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        error: 'Location is required'
      });
    }

    const comparison = await cropAgent.compareCrops(crops, location, criteria);
    res.json(comparison);
  } catch (error) {
    logger.error('Error comparing crops:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to compare crops',
      message: error.message
    });
  }
});

export default router;
