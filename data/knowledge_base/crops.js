/**
 * Crop Knowledge Base
 * Contains detailed information about common crops
 */

const cropsDatabase = [
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'cereal',
    description: 'A cereal grain that is a worldwide staple food',
    climateZones: ['temperate', 'cold temperate'],
    optimalTemperature: { min: 15, max: 25, unit: 'celsius' },
    soilTypes: ['loamy', 'clay loam', 'silt loam'],
    phRange: { min: 6.0, max: 7.5 },
    waterRequirement: { min: 450, max: 650, unit: 'mm' },
    growingDuration: { min: 120, max: 150, unit: 'days' },
    plantingSeasons: ['autumn', 'spring'],
    companionPlants: ['clover', 'peas', 'chickpeas'],
    commonPests: [
      { name: 'Aphids', severity: 'medium', control: 'Natural predators, neem oil' },
      { name: 'Hessian fly', severity: 'high', control: 'Crop rotation, resistant varieties' }
    ],
    commonDiseases: [
      { name: 'Rust', symptoms: 'Orange-brown pustules', prevention: 'Use resistant varieties' },
      { name: 'Smut', symptoms: 'Black powder in grain', prevention: 'Seed treatment' }
    ],
    yieldPotential: { average: 3000, range: [2000, 5000], unit: 'kg/hectare' },
    marketDemand: 'high',
    storageLife: 365
  },
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    category: 'cereal',
    description: 'A cereal grain and staple food for over half the world population',
    climateZones: ['tropical', 'subtropical'],
    optimalTemperature: { min: 20, max: 35, unit: 'celsius' },
    soilTypes: ['clay', 'clay loam'],
    phRange: { min: 5.5, max: 7.0 },
    waterRequirement: { min: 1200, max: 2000, unit: 'mm' },
    growingDuration: { min: 95, max: 150, unit: 'days' },
    plantingSeasons: ['monsoon', 'summer'],
    companionPlants: ['azolla', 'duck weed'],
    commonPests: [
      { name: 'Stem borer', severity: 'high', control: 'Pheromone traps, biocontrol' },
      { name: 'Brown plant hopper', severity: 'high', control: 'Resistant varieties' }
    ],
    commonDiseases: [
      { name: 'Blast', symptoms: 'Lesions on leaves', prevention: 'Water management, resistant varieties' },
      { name: 'Bacterial blight', symptoms: 'Water-soaked lesions', prevention: 'Clean seeds, resistant varieties' }
    ],
    yieldPotential: { average: 4000, range: [2500, 6000], unit: 'kg/hectare' },
    marketDemand: 'very high',
    storageLife: 180
  },
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    description: 'A popular fruit vegetable used in cuisines worldwide',
    climateZones: ['temperate', 'tropical', 'subtropical'],
    optimalTemperature: { min: 18, max: 27, unit: 'celsius' },
    soilTypes: ['loamy', 'sandy loam', 'clay loam'],
    phRange: { min: 6.0, max: 7.0 },
    waterRequirement: { min: 400, max: 600, unit: 'mm' },
    growingDuration: { min: 60, max: 90, unit: 'days' },
    plantingSeasons: ['spring', 'summer'],
    companionPlants: ['basil', 'marigold', 'carrots', 'onions'],
    commonPests: [
      { name: 'Tomato hornworm', severity: 'high', control: 'Hand picking, Bt spray' },
      { name: 'Whiteflies', severity: 'medium', control: 'Yellow sticky traps, neem oil' },
      { name: 'Aphids', severity: 'medium', control: 'Ladybugs, neem spray' }
    ],
    commonDiseases: [
      { name: 'Early blight', symptoms: 'Brown spots with concentric rings', prevention: 'Crop rotation, mulching' },
      { name: 'Late blight', symptoms: 'Water-soaked spots', prevention: 'Copper fungicides, resistant varieties' },
      { name: 'Fusarium wilt', symptoms: 'Yellowing and wilting', prevention: 'Resistant varieties, soil solarization' }
    ],
    yieldPotential: { average: 40000, range: [25000, 70000], unit: 'kg/hectare' },
    marketDemand: 'very high',
    storageLife: 14
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'vegetable',
    description: 'A starchy tuber vegetable that is the world\'s fourth-largest food crop',
    climateZones: ['temperate', 'cold temperate'],
    optimalTemperature: { min: 15, max: 20, unit: 'celsius' },
    soilTypes: ['sandy loam', 'loamy'],
    phRange: { min: 5.0, max: 6.5 },
    waterRequirement: { min: 500, max: 700, unit: 'mm' },
    growingDuration: { min: 90, max: 120, unit: 'days' },
    plantingSeasons: ['spring', 'autumn'],
    companionPlants: ['beans', 'corn', 'cabbage'],
    commonPests: [
      { name: 'Colorado potato beetle', severity: 'high', control: 'Hand picking, row covers' },
      { name: 'Aphids', severity: 'medium', control: 'Neem oil, beneficial insects' }
    ],
    commonDiseases: [
      { name: 'Late blight', symptoms: 'Brown lesions on leaves', prevention: 'Resistant varieties, proper spacing' },
      { name: 'Scab', symptoms: 'Rough patches on tubers', prevention: 'Maintain acidic soil, crop rotation' }
    ],
    yieldPotential: { average: 25000, range: [15000, 40000], unit: 'kg/hectare' },
    marketDemand: 'high',
    storageLife: 180
  },
  {
    id: 'corn',
    name: 'Corn (Maize)',
    scientificName: 'Zea mays',
    category: 'cereal',
    description: 'A versatile grain crop used for food, animal feed, and industrial purposes',
    climateZones: ['temperate', 'tropical', 'subtropical'],
    optimalTemperature: { min: 20, max: 30, unit: 'celsius' },
    soilTypes: ['loamy', 'clay loam', 'sandy loam'],
    phRange: { min: 5.8, max: 7.0 },
    waterRequirement: { min: 500, max: 800, unit: 'mm' },
    growingDuration: { min: 80, max: 120, unit: 'days' },
    plantingSeasons: ['spring', 'summer'],
    companionPlants: ['beans', 'squash', 'pumpkin'],
    commonPests: [
      { name: 'Corn borer', severity: 'high', control: 'Bt corn, crop rotation' },
      { name: 'Fall armyworm', severity: 'high', control: 'Early detection, biological control' }
    ],
    commonDiseases: [
      { name: 'Corn smut', symptoms: 'Large galls on ears', prevention: 'Remove infected plants' },
      { name: 'Northern corn leaf blight', symptoms: 'Gray-green lesions', prevention: 'Resistant varieties' }
    ],
    yieldPotential: { average: 6000, range: [4000, 10000], unit: 'kg/hectare' },
    marketDemand: 'very high',
    storageLife: 365
  }
];

// Helper functions
export function findCropByName(cropName) {
  const searchName = cropName.toLowerCase();
  return cropsDatabase.find(crop =>
    crop.name.toLowerCase() === searchName ||
    crop.id === searchName ||
    crop.scientificName.toLowerCase() === searchName
  );
}

export function getCropsByCategory(category) {
  return cropsDatabase.filter(crop => crop.category === category);
}

export function getCropsByClimateZone(zone) {
  return cropsDatabase.filter(crop => crop.climateZones.includes(zone));
}

export function searchCrops(query) {
  const searchQuery = query.toLowerCase();
  return cropsDatabase.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery) ||
    crop.description.toLowerCase().includes(searchQuery) ||
    crop.category.toLowerCase().includes(searchQuery)
  );
}

export default {
  cropsDatabase,
  findCropByName,
  getCropsByCategory,
  getCropsByClimateZone,
  searchCrops
};
