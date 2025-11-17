/**
 * Tree Crops and Palms Knowledge Base
 * Contains detailed information about fruit trees, nut trees, and palm species
 */

const treeCropsDatabase = [
  {
    id: 'date_palm',
    name: 'Date Palm',
    scientificName: 'Phoenix dactylifera',
    category: 'palm',
    type: 'perennial',
    description: 'A palm tree cultivated for its edible sweet fruit, highly drought-tolerant',
    climateZones: ['arid', 'semi-arid', 'subtropical', 'tropical'],
    optimalTemperature: { min: 20, max: 50, optimal: 32, unit: 'celsius' },
    soilTypes: ['sandy', 'loamy', 'sandy loam'],
    phRange: { min: 7.0, max: 8.5 },
    waterRequirements: {
      establishment: { amount: 100, frequency: 'weekly', duration: '2 years' },
      mature: { amount: 200, frequency: 'bi-weekly', unit: 'liters/tree' },
      critical_stages: ['flowering', 'fruit_development', 'ripening']
    },
    spacing: {
      rowDistance: 8,
      treeDistance: 8,
      treesPerAcre: 68,
      unit: 'meters'
    },
    lifecycle: {
      plantingAge: '1-2 years (offshoots)',
      firstFruit: '4-5 years',
      fullProduction: '8-10 years',
      productiveLife: '60-100 years'
    },
    propagation: {
      method: 'offshoots (suckers)',
      alternative: 'tissue culture',
      bestSeason: 'spring'
    },
    varieties: [
      { name: 'Medjool', quality: 'premium', yield: 'medium', market: 'high value' },
      { name: 'Deglet Noor', quality: 'good', yield: 'high', market: 'commercial' },
      { name: 'Barhi', quality: 'excellent', yield: 'medium', market: 'fresh/dried' },
      { name: 'Zahidi', quality: 'good', yield: 'high', market: 'commercial' }
    ],
    nutrients: {
      nitrogen: 'Medium (150-200 g/tree/year)',
      phosphorus: 'Low (50-75 g/tree/year)',
      potassium: 'High (200-300 g/tree/year)',
      micronutrients: ['iron', 'manganese', 'zinc'],
      fertilizationSchedule: 'Split application 3-4 times per year'
    },
    yield: {
      youngTree: { amount: '10-20', unit: 'kg/tree', age: '5-7 years' },
      mature: { amount: '50-100', unit: 'kg/tree', age: '10+ years' },
      premium: { amount: '150-200', unit: 'kg/tree', conditions: 'optimal management' }
    },
    commonPests: [
      { name: 'Red palm weevil', severity: 'very high', control: 'Pheromone traps, systemic insecticides' },
      { name: 'Dubas bug', severity: 'high', control: 'Natural predators, neem oil' },
      { name: 'Termites', severity: 'medium', control: 'Soil treatment, trunk injection' }
    ],
    commonDiseases: [
      { name: 'Bayoud disease', symptoms: 'Leaf yellowing, wilting', prevention: 'Resistant varieties, avoid infected areas' },
      { name: 'Black scorch', symptoms: 'Black spots on leaves', prevention: 'Copper fungicides, sanitation' }
    ],
    pruning: {
      frequency: 'Annual',
      timing: 'After harvest',
      purpose: 'Remove old fronds, thin fruit bunches',
      technique: 'Leave 8-12 green fronds'
    },
    pollination: {
      method: 'Manual or mechanical',
      timing: 'During female flower opening',
      ratio: '1 male to 50 females',
      success: 'Critical for fruit set'
    },
    harvest: {
      seasons: ['summer', 'fall'],
      stages: ['khalal (unripe)', 'rutab (semi-ripe)', 'tamr (fully ripe)'],
      timing: 'Based on variety and market',
      method: 'Manual climbing or mechanical lift'
    },
    marketInfo: {
      averagePrice: 'High ($3-10/kg depending on variety)',
      demand: 'Very high, growing internationally',
      storageLife: 365,
      export: 'Excellent export crop'
    },
    specialRequirements: [
      'Requires hot, dry climate for fruit ripening',
      'Sensitive to humidity during fruit development',
      'Needs good drainage',
      'Benefits from wind protection when young',
      'Male trees needed for pollination (1:50 ratio)'
    ]
  },
  {
    id: 'mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'fruit_tree',
    type: 'perennial',
    description: 'A tropical fruit tree producing sweet, fleshy stone fruit',
    climateZones: ['tropical', 'subtropical'],
    optimalTemperature: { min: 24, max: 35, optimal: 27, unit: 'celsius' },
    soilTypes: ['loamy', 'sandy loam', 'well-drained'],
    phRange: { min: 5.5, max: 7.5 },
    waterRequirements: {
      establishment: { amount: 50, frequency: 'twice weekly', duration: '2-3 years' },
      mature: { amount: 100, frequency: 'weekly during dry season', unit: 'liters/tree' },
      critical_stages: ['flowering', 'fruit_set', 'fruit_development']
    },
    spacing: {
      rowDistance: 10,
      treeDistance: 10,
      treesPerAcre: 43,
      unit: 'meters',
      highDensity: { rowDistance: 5, treeDistance: 5, treesPerAcre: 173 }
    },
    lifecycle: {
      plantingAge: '1-2 years (grafted)',
      firstFruit: '3-4 years',
      fullProduction: '6-8 years',
      productiveLife: '40-100 years'
    },
    propagation: {
      method: 'grafting',
      rootstock: 'Seedling rootstock',
      alternative: 'veneer grafting, inarching',
      bestSeason: 'spring or monsoon'
    },
    varieties: [
      { name: 'Alphonso', quality: 'premium', yield: 'medium', region: 'India', market: 'export' },
      { name: 'Tommy Atkins', quality: 'good', yield: 'high', region: 'Americas', market: 'commercial' },
      { name: 'Kent', quality: 'excellent', yield: 'high', region: 'Global', market: 'fresh' },
      { name: 'Keitt', quality: 'very good', yield: 'high', region: 'Global', market: 'late season' },
      { name: 'Haden', quality: 'good', yield: 'medium', region: 'Americas', market: 'commercial' }
    ],
    nutrients: {
      nitrogen: 'High (500-1000 g/tree/year)',
      phosphorus: 'Medium (200-400 g/tree/year)',
      potassium: 'High (500-800 g/tree/year)',
      micronutrients: ['zinc', 'boron', 'iron', 'manganese'],
      fertilizationSchedule: 'Split into 3 applications: pre-flowering, fruit set, fruit development'
    },
    yield: {
      youngTree: { amount: '10-30', unit: 'kg/tree', age: '3-5 years' },
      mature: { amount: '100-200', unit: 'kg/tree', age: '8-15 years' },
      premium: { amount: '200-400', unit: 'kg/tree', conditions: 'optimal management, good variety' }
    },
    commonPests: [
      { name: 'Mango fruit fly', severity: 'very high', control: 'Pheromone traps, bait sprays, fruit bagging' },
      { name: 'Mango hopper', severity: 'high', control: 'Insecticide spray during flowering' },
      { name: 'Mango stem borer', severity: 'medium', control: 'Trunk injection, mechanical removal' },
      { name: 'Mango mealy bug', severity: 'medium', control: 'Natural predators, neem oil' }
    ],
    commonDiseases: [
      { name: 'Anthracnose', symptoms: 'Black spots on fruit and leaves', prevention: 'Copper fungicides, sanitation' },
      { name: 'Powdery mildew', symptoms: 'White powder on flowers and young fruit', prevention: 'Sulfur spray, resistant varieties' },
      { name: 'Bacterial black spot', symptoms: 'Black angular spots', prevention: 'Copper spray, avoid overhead irrigation' }
    ],
    pruning: {
      frequency: 'Annual',
      timing: 'After harvest',
      purpose: 'Shape tree, improve light penetration, remove diseased wood',
      technique: 'Open center, maintain manageable height'
    },
    flowerInduction: {
      method: 'Potassium nitrate spray or stress',
      timing: 'October-November (Northern hemisphere)',
      conditions: 'Cool nights (below 15°C) for 6-8 weeks'
    },
    harvest: {
      seasons: ['summer'],
      timing: 'Based on color change and shoulder development',
      method: 'Manual with stem intact',
      maturityTest: 'Float test, specific gravity'
    },
    marketInfo: {
      averagePrice: 'Medium to high ($1-5/kg depending on variety)',
      demand: 'Very high globally',
      storageLife: 21,
      export: 'Major export fruit'
    },
    specialRequirements: [
      'Requires dry period for flowering',
      'Avoid irrigation during flowering',
      'Sensitive to frost',
      'Benefits from mulching',
      'Regular pruning for size control'
    ]
  },
  {
    id: 'coconut',
    name: 'Coconut Palm',
    scientificName: 'Cocos nucifera',
    category: 'palm',
    type: 'perennial',
    description: 'A tropical palm tree valued for its fruit, oil, and fiber',
    climateZones: ['tropical', 'coastal tropical'],
    optimalTemperature: { min: 20, max: 32, optimal: 27, unit: 'celsius' },
    soilTypes: ['sandy', 'loamy', 'coastal sandy loam'],
    phRange: { min: 5.5, max: 8.0 },
    waterRequirements: {
      annual: { amount: 1500, unit: 'mm' },
      critical: 'Year-round moisture',
      critical_stages: ['flowering', 'nut_development']
    },
    spacing: {
      rowDistance: 7.5,
      treeDistance: 7.5,
      treesPerAcre: 77,
      unit: 'meters',
      triangular: { spacing: 7.5, treesPerAcre: 89 }
    },
    lifecycle: {
      plantingAge: '6-12 months (seedlings)',
      firstFruit: '5-6 years',
      fullProduction: '12-15 years',
      productiveLife: '60-80 years'
    },
    varieties: [
      { name: 'Tall variety', height: '20-30m', yield: 'medium', life: 'long' },
      { name: 'Dwarf variety', height: '10-12m', yield: 'high early', life: 'shorter' },
      { name: 'Hybrid (Tall × Dwarf)', height: '15-18m', yield: 'very high', life: 'medium' }
    ],
    yield: {
      mature: { amount: '60-80', unit: 'nuts/tree/year', variety: 'tall' },
      dwarf: { amount: '80-120', unit: 'nuts/tree/year', variety: 'dwarf' },
      hybrid: { amount: '120-180', unit: 'nuts/tree/year', variety: 'hybrid' }
    },
    marketInfo: {
      demand: 'Very high',
      products: ['coconut water', 'copra', 'coconut oil', 'coir fiber', 'shell charcoal'],
      storageLife: 90,
      multiUse: 'Every part is valuable'
    }
  },
  {
    id: 'olive',
    name: 'Olive',
    scientificName: 'Olea europaea',
    category: 'fruit_tree',
    type: 'perennial',
    description: 'Mediterranean tree cultivated for fruit and oil production',
    climateZones: ['mediterranean', 'temperate', 'semi-arid'],
    optimalTemperature: { min: 15, max: 30, optimal: 20, unit: 'celsius' },
    soilTypes: ['well-drained', 'limestone', 'sandy loam'],
    phRange: { min: 6.0, max: 8.5 },
    lifecycle: {
      firstFruit: '3-4 years',
      fullProduction: '8-12 years',
      productiveLife: '300-600 years'
    },
    specialRequirements: [
      'Requires winter chill for flowering',
      'Drought tolerant once established',
      'Can tolerate poor soils'
    ]
  },
  {
    id: 'avocado',
    name: 'Avocado',
    scientificName: 'Persea americana',
    category: 'fruit_tree',
    type: 'perennial',
    description: 'Subtropical tree producing nutrient-rich fruit',
    climateZones: ['subtropical', 'tropical'],
    optimalTemperature: { min: 15, max: 28, optimal: 22, unit: 'celsius' },
    soilTypes: ['well-drained', 'sandy loam', 'volcanic'],
    phRange: { min: 6.0, max: 7.0 },
    lifecycle: {
      firstFruit: '3-4 years (grafted)',
      fullProduction: '6-8 years',
      productiveLife: '50-100 years'
    },
    waterRequirements: {
      high: true,
      critical: 'Shallow root system needs frequent irrigation',
      sensitive: 'Very sensitive to waterlogging'
    },
    specialRequirements: [
      'Requires excellent drainage',
      'Sensitive to salt',
      'Wind protection needed',
      'Some varieties need cross-pollination'
    ]
  },
  {
    id: 'citrus',
    name: 'Citrus (Orange/Lemon/Lime)',
    scientificName: 'Citrus spp.',
    category: 'fruit_tree',
    type: 'perennial',
    description: 'Diverse genus of fruit trees producing acidic fruits',
    climateZones: ['subtropical', 'tropical', 'mediterranean'],
    optimalTemperature: { min: 13, max: 35, optimal: 25, unit: 'celsius' },
    soilTypes: ['sandy loam', 'loamy', 'well-drained'],
    phRange: { min: 6.0, max: 7.5 },
    lifecycle: {
      firstFruit: '2-3 years',
      fullProduction: '5-7 years',
      productiveLife: '50-80 years'
    },
    varieties: [
      { type: 'Orange', name: 'Valencia', use: 'juice' },
      { type: 'Orange', name: 'Navel', use: 'fresh eating' },
      { type: 'Lemon', name: 'Eureka', use: 'all-purpose' },
      { type: 'Lime', name: 'Persian', use: 'culinary' },
      { type: 'Mandarin', name: 'Clementine', use: 'fresh eating' }
    ],
    specialRequirements: [
      'Sensitive to frost',
      'Regular irrigation needed',
      'Prone to citrus greening disease',
      'Benefits from windbreaks'
    ]
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate',
    scientificName: 'Punica granatum',
    category: 'fruit_tree',
    type: 'perennial',
    description: 'Drought-tolerant shrub/small tree with antioxidant-rich fruit',
    climateZones: ['semi-arid', 'mediterranean', 'subtropical'],
    optimalTemperature: { min: 18, max: 38, optimal: 28, unit: 'celsius' },
    soilTypes: ['loamy', 'sandy loam', 'well-drained'],
    phRange: { min: 6.5, max: 7.5 },
    lifecycle: {
      firstFruit: '2-3 years',
      fullProduction: '5-6 years',
      productiveLife: '50-100 years'
    },
    specialRequirements: [
      'Very drought tolerant',
      'Tolerates alkaline soils',
      'Can handle temperature extremes',
      'Requires hot, dry period for ripening'
    ]
  }
];

// Helper functions
export function findTreeCropByName(cropName) {
  const searchName = cropName.toLowerCase();
  return treeCropsDatabase.find(crop =>
    crop.name.toLowerCase() === searchName ||
    crop.id === searchName ||
    crop.scientificName.toLowerCase() === searchName
  );
}

export function getTreeCropsByCategory(category) {
  return treeCropsDatabase.filter(crop => crop.category === category);
}

export function getTreeCropsByClimateZone(zone) {
  return treeCropsDatabase.filter(crop => crop.climateZones.includes(zone));
}

export function getAllTreeCrops() {
  return treeCropsDatabase;
}

export function getPalmSpecies() {
  return treeCropsDatabase.filter(crop => crop.category === 'palm');
}

export function getFruitTrees() {
  return treeCropsDatabase.filter(crop => crop.category === 'fruit_tree');
}

export function searchTreeCrops(query) {
  const searchQuery = query.toLowerCase();
  return treeCropsDatabase.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery) ||
    crop.description.toLowerCase().includes(searchQuery) ||
    crop.category.toLowerCase().includes(searchQuery)
  );
}

export default {
  treeCropsDatabase,
  findTreeCropByName,
  getTreeCropsByCategory,
  getTreeCropsByClimateZone,
  getAllTreeCrops,
  getPalmSpecies,
  getFruitTrees,
  searchTreeCrops
};
