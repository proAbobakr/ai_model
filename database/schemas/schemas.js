import mongoose from 'mongoose';

// Farmer Profile Schema
const farmerSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    sparse: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    latitude: Number,
    longitude: Number,
    region: String,
    country: String,
    address: String
  },
  farmDetails: {
    farmSize: String,
    soilType: String,
    waterSource: String,
    irrigationSystem: String,
    currentCrops: [String],
    farmingExperience: String,
    farmingStyle: {
      type: String,
      enum: ['conventional', 'organic', 'sustainable', 'mixed']
    }
  },
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    notificationsEnabled: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Crop Information Schema
const cropSchema = new mongoose.Schema({
  cropId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    common: {
      type: String,
      required: true
    },
    scientific: String,
    local: [String]
  },
  category: {
    type: String,
    enum: ['cereal', 'vegetable', 'fruit', 'legume', 'oilseed', 'fiber', 'spice', 'other']
  },
  climateRequirements: {
    zones: [String],
    temperatureRange: {
      min: Number,
      max: Number,
      optimal: Number
    },
    rainfallRange: {
      min: Number,
      max: Number
    }
  },
  soilRequirements: {
    preferredTypes: [String],
    phRange: {
      min: Number,
      max: Number
    },
    drainageRequirement: String
  },
  waterRequirements: {
    totalSeasonal: Number,
    dailyAverage: Number,
    criticalStages: [String]
  },
  nutrients: {
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    micronutrients: [String]
  },
  growingInfo: {
    duration: {
      min: Number,
      max: Number,
      unit: String
    },
    plantingSeasons: [String],
    harvestSeasons: [String],
    spacing: {
      rowDistance: Number,
      plantDistance: Number
    }
  },
  yield: {
    average: Number,
    range: {
      min: Number,
      max: Number
    },
    unit: String
  },
  pests: [{
    name: String,
    severity: String,
    control: [String]
  }],
  diseases: [{
    name: String,
    symptoms: String,
    prevention: String
  }],
  companionPlants: [String],
  marketInfo: {
    averagePrice: Number,
    demand: String,
    storageLife: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Fertilizer Recommendation Schema
const fertilizerRecommendationSchema = new mongoose.Schema({
  recommendationId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  farmerId: {
    type: String,
    ref: 'Farmer',
    index: true
  },
  crop: {
    type: String,
    required: true
  },
  soilAnalysis: {
    soilType: String,
    ph: Number,
    nitrogen: String,
    phosphorus: String,
    potassium: String,
    organicMatter: Number,
    otherNutrients: mongoose.Schema.Types.Mixed
  },
  growthStage: String,
  recommendations: {
    npkRequirements: {
      nitrogen: Number,
      phosphorus: Number,
      potassium: Number
    },
    primaryFertilizers: [{
      name: String,
      formula: String,
      quantity: Number,
      unit: String,
      applicationMethod: String,
      timing: String
    }],
    secondaryNutrients: mongoose.Schema.Types.Mixed,
    micronutrients: mongoose.Schema.Types.Mixed,
    organicAlternatives: [{
      type: String,
      quantity: Number,
      applicationMethod: String
    }],
    applicationSchedule: [{
      stage: String,
      daysAfterPlanting: Number,
      fertilizers: [String],
      quantity: String,
      method: String
    }],
    costEstimate: {
      total: Number,
      breakdown: mongoose.Schema.Types.Mixed
    }
  },
  aiResponse: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Irrigation Schedule Schema
const irrigationScheduleSchema = new mongoose.Schema({
  scheduleId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  farmerId: {
    type: String,
    ref: 'Farmer',
    index: true
  },
  crop: String,
  soilType: String,
  climate: String,
  irrigationSystem: String,
  waterRequirements: {
    dailyRequirement: Number,
    seasonalRequirement: mongoose.Schema.Types.Mixed,
    criticalStages: [String]
  },
  schedule: {
    frequency: String,
    duration: Number,
    timeOfDay: String,
    weeklyVolume: Number,
    adjustments: mongoose.Schema.Types.Mixed
  },
  conservationTips: [String],
  monitoringIndicators: [String],
  aiResponse: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date
  }
});

// Farming Technique Record Schema
const farmingTechniqueSchema = new mongoose.Schema({
  techniqueId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  crop: String,
  category: {
    type: String,
    enum: ['planting', 'cultivation', 'pest_management', 'harvesting', 'post_harvest', 'general']
  },
  name: String,
  description: String,
  steps: [String],
  benefits: [String],
  challenges: [String],
  requirements: {
    tools: [String],
    materials: [String],
    skills: String,
    cost: String
  },
  applicableRegions: [String],
  season: [String],
  traditional: {
    type: Boolean,
    default: false
  },
  modern: {
    type: Boolean,
    default: true
  },
  organic: {
    type: Boolean,
    default: false
  },
  videoLinks: [String],
  imageLinks: [String],
  references: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Query Log Schema (for analytics and improvement)
const queryLogSchema = new mongoose.Schema({
  queryId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  farmerId: String,
  queryType: {
    type: String,
    enum: ['crop_recommendation', 'fertilizer_advice', 'farming_technique', 'water_management', 'general']
  },
  input: mongoose.Schema.Types.Mixed,
  response: mongoose.Schema.Types.Mixed,
  agentsUsed: [String],
  processingTime: Number,
  success: Boolean,
  errorMessage: String,
  userFeedback: {
    rating: Number,
    comment: String,
    helpful: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Soil Test Result Schema
const soilTestSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  farmerId: {
    type: String,
    ref: 'Farmer',
    index: true
  },
  location: {
    latitude: Number,
    longitude: Number,
    fieldName: String
  },
  testDate: {
    type: Date,
    required: true
  },
  results: {
    ph: Number,
    electricalConductivity: Number,
    organicMatter: Number,
    nitrogen: {
      level: String,
      value: Number
    },
    phosphorus: {
      level: String,
      value: Number
    },
    potassium: {
      level: String,
      value: Number
    },
    calcium: Number,
    magnesium: Number,
    sulfur: Number,
    micronutrients: {
      iron: Number,
      zinc: Number,
      manganese: Number,
      copper: Number,
      boron: Number
    },
    texture: String,
    cationExchangeCapacity: Number
  },
  recommendations: mongoose.Schema.Types.Mixed,
  labName: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Water Quality Test Schema
const waterQualitySchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  farmerId: {
    type: String,
    ref: 'Farmer',
    index: true
  },
  waterSource: String,
  testDate: {
    type: Date,
    required: true
  },
  results: {
    ph: Number,
    electricalConductivity: Number,
    totalDissolvedSolids: Number,
    hardness: Number,
    sodiumAdsorptionRatio: Number,
    chloride: Number,
    boron: Number,
    nitrate: Number,
    sulfate: Number,
    calcium: Number,
    magnesium: Number,
    sodium: Number,
    potassium: Number,
    bicarbonate: Number,
    heavyMetals: mongoose.Schema.Types.Mixed
  },
  qualityAssessment: {
    overallRating: String,
    suitabilityForCrops: [String],
    concerns: [String],
    treatmentNeeded: Boolean
  },
  recommendations: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better query performance
farmerSchema.index({ 'location.region': 1 });
farmerSchema.index({ 'farmDetails.farmingStyle': 1 });
cropSchema.index({ 'name.common': 'text', 'name.scientific': 'text' });
cropSchema.index({ 'category': 1 });
queryLogSchema.index({ 'createdAt': -1 });
queryLogSchema.index({ 'queryType': 1, 'success': 1 });

// Export models
export const Farmer = mongoose.model('Farmer', farmerSchema);
export const Crop = mongoose.model('Crop', cropSchema);
export const FertilizerRecommendation = mongoose.model('FertilizerRecommendation', fertilizerRecommendationSchema);
export const IrrigationSchedule = mongoose.model('IrrigationSchedule', irrigationScheduleSchema);
export const FarmingTechnique = mongoose.model('FarmingTechnique', farmingTechniqueSchema);
export const QueryLog = mongoose.model('QueryLog', queryLogSchema);
export const SoilTest = mongoose.model('SoilTest', soilTestSchema);
export const WaterQuality = mongoose.model('WaterQuality', waterQualitySchema);

export default {
  Farmer,
  Crop,
  FertilizerRecommendation,
  IrrigationSchedule,
  FarmingTechnique,
  QueryLog,
  SoilTest,
  WaterQuality
};
