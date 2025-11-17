import express from 'express';
import TreeAdvisorAgent from '../../agents/tree_advisor/tree_agent.js';
import { logger } from '../../config/logger.js';

const router = express.Router();
const treeAgent = new TreeAdvisorAgent();

/**
 * Get tree crop recommendations
 * Specialized for fruit trees, palms, and other perennial crops
 */
router.post('/recommend', async (req, res) => {
  try {
    const {
      location,
      soilType,
      waterAvailability,
      farmSize,
      experience,
      budget,
      timeframe,
      purpose
    } = req.body;

    // Validation
    if (!location || !soilType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: location, soilType'
      });
    }

    logger.info('Tree crop recommendation request', { location, soilType });

    const recommendation = await treeAgent.recommendTreeCrops({
      location,
      soilType,
      waterAvailability,
      farmSize,
      experience,
      budget,
      timeframe,
      purpose
    });

    res.json(recommendation);
  } catch (error) {
    logger.error('Error in tree crop recommendation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate tree crop recommendations',
      message: error.message
    });
  }
});

/**
 * Get detailed cultivation guide for specific tree
 */
router.get('/:treeName/guide', async (req, res) => {
  try {
    const { treeName } = req.params;
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

    const guide = await treeAgent.getTreeCultivationGuide(treeName, location);
    res.json(guide);
  } catch (error) {
    logger.error('Error getting tree cultivation guide:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get cultivation guide',
      message: error.message
    });
  }
});

/**
 * Compare multiple tree crops
 */
router.post('/compare', async (req, res) => {
  try {
    const { trees, location, criteria } = req.body;

    if (!trees || !Array.isArray(trees) || trees.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least 2 trees to compare'
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        error: 'Location is required'
      });
    }

    const comparison = await treeAgent.compareTreeCrops(trees, location, criteria);
    res.json(comparison);
  } catch (error) {
    logger.error('Error comparing tree crops:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to compare tree crops',
      message: error.message
    });
  }
});

/**
 * Get intercropping recommendations for tree orchards
 */
router.post('/intercropping', async (req, res) => {
  try {
    const { mainTree, location, farmSize } = req.body;

    if (!mainTree || !location) {
      return res.status(400).json({
        success: false,
        error: 'Main tree and location are required'
      });
    }

    const advice = await treeAgent.getIntercroppingAdvice(mainTree, location, farmSize);
    res.json(advice);
  } catch (error) {
    logger.error('Error getting intercropping advice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get intercropping recommendations',
      message: error.message
    });
  }
});

/**
 * Get pruning guide for specific tree
 */
router.get('/:treeName/pruning', async (req, res) => {
  try {
    const { treeName } = req.params;
    const { age } = req.query;

    if (!age) {
      return res.status(400).json({
        success: false,
        error: 'Tree age (in years) is required'
      });
    }

    const guide = await treeAgent.getPruningGuide(treeName, age);
    res.json(guide);
  } catch (error) {
    logger.error('Error getting pruning guide:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get pruning guide',
      message: error.message
    });
  }
});

/**
 * Get list of tree crops by category
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;

    const validCategories = ['palm', 'fruit_tree', 'nut_tree', 'all'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: `Invalid category. Must be one of: ${validCategories.join(', ')}`
      });
    }

    let trees;
    if (category === 'all') {
      const treeCropsKnowledgeBase = await import('../../data/knowledge_base/tree_crops.js');
      trees = treeCropsKnowledgeBase.getAllTreeCrops();
    } else if (category === 'palm') {
      const treeCropsKnowledgeBase = await import('../../data/knowledge_base/tree_crops.js');
      trees = treeCropsKnowledgeBase.getPalmSpecies();
    } else {
      const treeCropsKnowledgeBase = await import('../../data/knowledge_base/tree_crops.js');
      trees = treeCropsKnowledgeBase.getTreeCropsByCategory(category);
    }

    res.json({
      success: true,
      category,
      count: trees.length,
      trees
    });
  } catch (error) {
    logger.error('Error fetching tree crops by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tree crops',
      message: error.message
    });
  }
});

/**
 * Get specific tree information from knowledge base
 */
router.get('/info/:treeName', async (req, res) => {
  try {
    const { treeName } = req.params;

    const treeCropsKnowledgeBase = await import('../../data/knowledge_base/tree_crops.js');
    const tree = treeCropsKnowledgeBase.findTreeCropByName(treeName);

    if (!tree) {
      return res.status(404).json({
        success: false,
        error: `Tree crop '${treeName}' not found in knowledge base`
      });
    }

    res.json({
      success: true,
      tree
    });
  } catch (error) {
    logger.error('Error fetching tree information:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tree information',
      message: error.message
    });
  }
});

export default router;
