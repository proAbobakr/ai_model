import express from 'express';
import { Farmer, QueryLog } from '../../database/schemas/schemas.js';
import { logger } from '../../config/logger.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create farmer profile
router.post('/register', async (req, res) => {
  try {
    const farmerData = {
      ...req.body,
      farmerId: uuidv4()
    };

    const farmer = new Farmer(farmerData);
    await farmer.save();

    logger.info('New farmer registered', { farmerId: farmer.farmerId });

    res.status(201).json({
      success: true,
      farmer,
      message: 'Farmer registered successfully'
    });
  } catch (error) {
    logger.error('Error registering farmer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register farmer',
      message: error.message
    });
  }
});

// Get farmer profile
router.get('/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const farmer = await Farmer.findOne({ farmerId });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        error: 'Farmer not found'
      });
    }

    res.json({
      success: true,
      farmer
    });
  } catch (error) {
    logger.error('Error fetching farmer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch farmer',
      message: error.message
    });
  }
});

// Update farmer profile
router.put('/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const updates = {
      ...req.body,
      updatedAt: new Date()
    };

    const farmer = await Farmer.findOneAndUpdate(
      { farmerId },
      updates,
      { new: true }
    );

    if (!farmer) {
      return res.status(404).json({
        success: false,
        error: 'Farmer not found'
      });
    }

    res.json({
      success: true,
      farmer,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    logger.error('Error updating farmer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update farmer',
      message: error.message
    });
  }
});

// Get farmer's query history
router.get('/:farmerId/history', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const { limit = 20, skip = 0 } = req.query;

    const queries = await QueryLog.find({ farmerId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    res.json({
      success: true,
      queries,
      count: queries.length
    });
  } catch (error) {
    logger.error('Error fetching query history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch query history',
      message: error.message
    });
  }
});

export default router;
