/**
 * Storage Methods Knowledge Base
 *
 * Comprehensive data for produce storage including:
 * - Optimal storage conditions
 * - Storage methods and techniques
 * - Expected shelf life
 * - Common storage issues
 * - Post-harvest handling
 */

const storageMethodsDatabase = [
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'grain',
    aliases: ['wheat grain', 'wheat berries'],
    optimalConditions: {
      temperature: { min: 10, max: 15, unit: 'celsius', ideal: 12 },
      humidity: { min: 55, max: 65, unit: 'percent', ideal: 60 },
      ventilation: 'moderate, avoid condensation',
      lighting: 'dark storage preferred'
    },
    storageMethod: {
      primary: 'bulk storage in silos',
      alternatives: ['bagged storage in warehouse', 'hermetic bags'],
      container: 'ventilated metal or concrete silos',
      layering: 'up to 4-5 meters depth'
    },
    shelfLife: {
      optimal: '12-18 months',
      average: '6-12 months',
      factors: ['moisture content', 'temperature', 'pest control']
    },
    postHarvest: {
      drying: 'reduce moisture to 12-14%',
      cleaning: 'remove foreign matter and damaged grains',
      treatment: 'optional fumigation for long-term storage',
      timing: 'store within 24-48 hours of threshing'
    },
    commonIssues: {
      pests: ['weevils', 'grain borers', 'rodents'],
      diseases: ['mold', 'aflatoxin (if moisture high)'],
      physical: ['moisture migration', 'heating', 'caking'],
      prevention: ['moisture monitoring', 'fumigation', 'regular inspection']
    },
    lossRates: {
      optimal: '1-2%',
      average: '3-5%',
      poor: '10-20%'
    }
  },
  {
    id: 'rice',
    name: 'Rice',
    category: 'grain',
    aliases: ['rice grain', 'paddy'],
    optimalConditions: {
      temperature: { min: 12, max: 18, unit: 'celsius', ideal: 15 },
      humidity: { min: 60, max: 70, unit: 'percent', ideal: 65 },
      ventilation: 'good airflow to prevent heating',
      lighting: 'dark storage'
    },
    storageMethod: {
      primary: 'bulk storage in silos or warehouses',
      alternatives: ['hermetic storage', 'bagged storage'],
      container: 'moisture-proof containers',
      layering: 'stack bags up to 3 meters'
    },
    shelfLife: {
      optimal: '12-18 months (milled), 6-8 months (brown rice)',
      average: '6-12 months',
      factors: ['milling degree', 'moisture', 'temperature']
    },
    postHarvest: {
      drying: 'reduce moisture to 13-14%',
      cleaning: 'remove stones, chaff, and broken grains',
      treatment: 'consider diatomaceous earth for organic storage',
      timing: 'dry immediately after harvest'
    },
    commonIssues: {
      pests: ['rice weevil', 'lesser grain borer', 'moths'],
      diseases: ['mold', 'discoloration'],
      physical: ['rancidity (brown rice)', 'moisture gain', 'yellowing'],
      prevention: ['airtight storage', 'temperature control', 'periodic inspection']
    },
    lossRates: {
      optimal: '2-3%',
      average: '5-7%',
      poor: '15-25%'
    }
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'vegetable',
    aliases: ['tomatoes', 'fresh tomatoes'],
    optimalConditions: {
      temperature: { min: 12, max: 15, unit: 'celsius', ideal: 13 },
      humidity: { min: 85, max: 95, unit: 'percent', ideal: 90 },
      ventilation: 'good airflow to remove ethylene',
      lighting: 'avoid direct sunlight'
    },
    storageMethod: {
      primary: 'refrigerated storage',
      alternatives: ['cool shed storage', 'evaporative cooling'],
      container: 'ventilated plastic crates or boxes',
      layering: 'single layer or max 2-3 layers to avoid bruising'
    },
    shelfLife: {
      optimal: '2-3 weeks (mature green), 1 week (ripe)',
      average: '1-2 weeks',
      factors: ['maturity stage', 'temperature', 'handling']
    },
    postHarvest: {
      cooling: 'cool to 13°C within 4-6 hours',
      cleaning: 'gentle wash, dry completely',
      treatment: 'wax coating for extended shelf life',
      timing: 'harvest at proper maturity, handle gently',
      sorting: 'grade by size, color, and maturity'
    },
    commonIssues: {
      pests: ['fruit flies', 'storage mites'],
      diseases: ['alternaria', 'anthracnose', 'bacterial soft rot'],
      physical: ['chilling injury below 10°C', 'over-ripening', 'bruising'],
      prevention: ['proper temperature', 'humidity control', 'gentle handling', 'ethylene management']
    },
    lossRates: {
      optimal: '5-10%',
      average: '15-25%',
      poor: '40-60%'
    }
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'vegetable',
    aliases: ['potatoes', 'table potato', 'seed potato'],
    optimalConditions: {
      temperature: { min: 3, max: 5, unit: 'celsius', ideal: 4 },
      humidity: { min: 90, max: 95, unit: 'percent', ideal: 93 },
      ventilation: 'initial ventilation for curing, then minimal',
      lighting: 'complete darkness (prevents greening)'
    },
    storageMethod: {
      primary: 'bulk cold storage',
      alternatives: ['pit storage', 'clamp storage', 'ventilated storage'],
      container: 'bulk bins or sacks',
      layering: 'bulk piles up to 4-5 meters'
    },
    shelfLife: {
      optimal: '5-10 months',
      average: '3-6 months',
      factors: ['variety', 'temperature', 'disease presence', 'sprouting']
    },
    postHarvest: {
      curing: '10-14 days at 15-18°C and 85-95% RH',
      cleaning: 'brush off soil, avoid washing unless necessary',
      treatment: 'sprout inhibitors for long-term storage',
      timing: 'cure before storage, cool gradually',
      sorting: 'remove damaged, diseased, or cut tubers'
    },
    commonIssues: {
      pests: ['tuber moth', 'wireworms', 'rodents'],
      diseases: ['late blight', 'dry rot', 'soft rot', 'silver scurf'],
      physical: ['greening', 'sprouting', 'weight loss', 'shrinkage'],
      prevention: ['darkness', 'proper curing', 'disease-free seed', 'temperature control']
    },
    lossRates: {
      optimal: '3-6%',
      average: '10-15%',
      poor: '25-40%'
    }
  },
  {
    id: 'corn',
    name: 'Corn (Maize)',
    category: 'grain',
    aliases: ['maize', 'corn grain', 'field corn'],
    optimalConditions: {
      temperature: { min: 10, max: 15, unit: 'celsius', ideal: 12 },
      humidity: { min: 55, max: 65, unit: 'percent', ideal: 60 },
      ventilation: 'good airflow to prevent heating',
      lighting: 'dark storage'
    },
    storageMethod: {
      primary: 'bulk storage in silos',
      alternatives: ['crib storage', 'hermetic bags'],
      container: 'aerated bins or silos',
      layering: 'bulk storage up to 5-6 meters'
    },
    shelfLife: {
      optimal: '12-18 months',
      average: '6-12 months',
      factors: ['moisture content', 'temperature', 'pest presence']
    },
    postHarvest: {
      drying: 'reduce moisture to 13-14% for storage',
      cleaning: 'remove cobs, foreign matter, broken kernels',
      treatment: 'fumigation or approved grain protectants',
      timing: 'dry within days of harvest to prevent mold'
    },
    commonIssues: {
      pests: ['weevils', 'grain borers', 'larger grain borer'],
      diseases: ['aflatoxin', 'mold', 'kernel rot'],
      physical: ['moisture migration', 'caking', 'heating'],
      prevention: ['proper drying', 'aeration', 'fumigation', 'regular monitoring']
    },
    lossRates: {
      optimal: '2-4%',
      average: '5-8%',
      poor: '15-30%'
    }
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'fruit',
    aliases: ['mangoes', 'fresh mango'],
    optimalConditions: {
      temperature: { min: 10, max: 13, unit: 'celsius', ideal: 12 },
      humidity: { min: 85, max: 95, unit: 'percent', ideal: 90 },
      ventilation: 'moderate airflow',
      lighting: 'avoid direct light'
    },
    storageMethod: {
      primary: 'refrigerated storage',
      alternatives: ['evaporative cooling', 'controlled atmosphere'],
      container: 'single-layer boxes or trays',
      layering: 'single layer preferred, max 2 layers with padding'
    },
    shelfLife: {
      optimal: '2-3 weeks (mature green), 5-7 days (ripe)',
      average: '1-2 weeks',
      factors: ['maturity', 'variety', 'temperature', 'handling']
    },
    postHarvest: {
      cooling: 'pre-cool to 12°C within 6-12 hours',
      cleaning: 'wash with fungicide solution, dry completely',
      treatment: 'hot water treatment (52°C for 5 min) to reduce diseases',
      timing: 'harvest at proper maturity with 1 cm stem',
      ripening: 'ethylene treatment (100 ppm for 12-24 hrs) for uniform ripening'
    },
    commonIssues: {
      pests: ['fruit flies', 'mealybugs'],
      diseases: ['anthracnose', 'stem-end rot', 'soft rot'],
      physical: ['chilling injury below 10°C', 'mechanical damage', 'sap burn'],
      prevention: ['hot water treatment', 'proper temperature', 'gentle handling', 'sap removal']
    },
    lossRates: {
      optimal: '10-15%',
      average: '20-30%',
      poor: '40-60%'
    }
  },
  {
    id: 'date',
    name: 'Date (Fruit)',
    category: 'fruit',
    aliases: ['dates', 'date palm fruit'],
    optimalConditions: {
      temperature: { min: 0, max: 5, unit: 'celsius', ideal: 2 },
      humidity: { min: 70, max: 75, unit: 'percent', ideal: 72 },
      ventilation: 'minimal, sealed containers',
      lighting: 'dark storage'
    },
    storageMethod: {
      primary: 'cold storage in sealed containers',
      alternatives: ['frozen storage (-18°C)', 'modified atmosphere packaging'],
      container: 'airtight bags or sealed boxes',
      layering: 'can be stacked in containers'
    },
    shelfLife: {
      optimal: '12-18 months (refrigerated), 2+ years (frozen)',
      average: '6-12 months',
      factors: ['moisture content', 'temperature', 'packaging']
    },
    postHarvest: {
      drying: 'sun-dry or mechanical dry to reduce moisture',
      cleaning: 'sort and remove stems, clean surface',
      treatment: 'fumigation for stored product pests',
      timing: 'harvest at proper maturity stage',
      grading: 'sort by size, moisture, and quality'
    },
    commonIssues: {
      pests: ['dried fruit beetles', 'Indian meal moth', 'mites'],
      diseases: ['mold growth (if moist)', 'souring'],
      physical: ['sugar crystallization', 'hardening', 'darkening'],
      prevention: ['proper moisture control', 'fumigation', 'sealed packaging', 'temperature control']
    },
    lossRates: {
      optimal: '2-5%',
      average: '5-10%',
      poor: '15-25%'
    }
  },
  {
    id: 'onion',
    name: 'Onion',
    category: 'vegetable',
    aliases: ['onions', 'bulb onion'],
    optimalConditions: {
      temperature: { min: 0, max: 1, unit: 'celsius', ideal: 0 },
      humidity: { min: 65, max: 70, unit: 'percent', ideal: 68 },
      ventilation: 'good airflow essential',
      lighting: 'dark storage'
    },
    storageMethod: {
      primary: 'cold storage with ventilation',
      alternatives: ['ambient ventilated storage', 'field curing then storage'],
      container: 'mesh bags or ventilated crates',
      layering: 'bulk bins with slatted floors'
    },
    shelfLife: {
      optimal: '6-8 months',
      average: '3-5 months',
      factors: ['curing quality', 'variety', 'temperature', 'humidity']
    },
    postHarvest: {
      curing: '2-4 weeks at 25-30°C with good airflow until necks dry',
      cleaning: 'remove loose outer scales and roots',
      treatment: 'maleic hydrazide for sprout inhibition',
      timing: 'cure thoroughly before storage',
      sorting: 'remove thick necks, damaged, or diseased bulbs'
    },
    commonIssues: {
      pests: ['onion maggot', 'thrips', 'mites'],
      diseases: ['botrytis rot', 'bacterial soft rot', 'black mold'],
      physical: ['sprouting', 'rooting', 'translucent scale'],
      prevention: ['proper curing', 'low temperature', 'good ventilation', 'disease-free bulbs']
    },
    lossRates: {
      optimal: '5-10%',
      average: '15-25%',
      poor: '35-50%'
    }
  },
  {
    id: 'citrus',
    name: 'Citrus (Orange, Lemon, Lime)',
    category: 'fruit',
    aliases: ['oranges', 'lemons', 'limes', 'citrus fruit'],
    optimalConditions: {
      temperature: { min: 3, max: 8, unit: 'celsius', ideal: 5 },
      humidity: { min: 85, max: 95, unit: 'percent', ideal: 90 },
      ventilation: 'moderate airflow',
      lighting: 'avoid direct sunlight'
    },
    storageMethod: {
      primary: 'refrigerated storage',
      alternatives: ['evaporative cooling', 'wax coating'],
      container: 'ventilated boxes or bins',
      layering: 'layer with dividers or paper'
    },
    shelfLife: {
      optimal: '4-8 weeks (oranges), 1-2 months (lemons)',
      average: '2-4 weeks',
      factors: ['variety', 'maturity', 'temperature', 'waxing']
    },
    postHarvest: {
      cooling: 'cool to storage temperature within 24 hours',
      cleaning: 'wash and apply fungicide/wax',
      treatment: 'wax coating to reduce moisture loss',
      timing: 'harvest when fully colored',
      grading: 'sort by size and quality'
    },
    commonIssues: {
      pests: ['fruit flies', 'scale insects', 'mealybugs'],
      diseases: ['green mold', 'blue mold', 'alternaria', 'stem-end rot'],
      physical: ['chilling injury', 'water loss', 'pitting'],
      prevention: ['proper temperature', 'wax treatment', 'fungicides', 'careful handling']
    },
    lossRates: {
      optimal: '5-8%',
      average: '10-20%',
      poor: '30-50%'
    }
  },
  {
    id: 'apple',
    name: 'Apple',
    category: 'fruit',
    aliases: ['apples'],
    optimalConditions: {
      temperature: { min: -1, max: 4, unit: 'celsius', ideal: 0 },
      humidity: { min: 90, max: 95, unit: 'percent', ideal: 92 },
      ventilation: 'controlled atmosphere (CA) storage ideal',
      lighting: 'dark storage'
    },
    storageMethod: {
      primary: 'controlled atmosphere (CA) storage',
      alternatives: ['regular cold storage', 'modified atmosphere packaging'],
      container: 'bulk bins or boxes',
      layering: 'can be stacked with proper airflow'
    },
    shelfLife: {
      optimal: '3-12 months (CA storage)',
      average: '2-6 months (cold storage)',
      factors: ['variety', 'harvest maturity', 'storage type', 'pre-cooling']
    },
    postHarvest: {
      cooling: 'rapid cooling to 0°C within 24 hours',
      cleaning: 'minimal washing, dry storage',
      treatment: '1-MCP treatment to extend shelf life',
      timing: 'harvest at proper maturity based on variety',
      grading: 'sort by size, color, and defects'
    },
    commonIssues: {
      pests: ['codling moth', 'apple maggot'],
      diseases: ['blue mold', 'bitter rot', 'scald'],
      physical: ['soft scald', 'internal breakdown', 'CO2 injury in CA'],
      prevention: ['proper CA conditions', 'temperature control', '1-MCP treatment', 'proper maturity at harvest']
    },
    lossRates: {
      optimal: '3-5% (CA storage)',
      average: '8-15%',
      poor: '25-40%'
    }
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'fruit',
    aliases: ['bananas'],
    optimalConditions: {
      temperature: { min: 13, max: 15, unit: 'celsius', ideal: 14 },
      humidity: { min: 85, max: 95, unit: 'percent', ideal: 90 },
      ventilation: 'good airflow during ripening',
      lighting: 'avoid direct sunlight'
    },
    storageMethod: {
      primary: 'refrigerated storage (green), ambient (ripening)',
      alternatives: ['controlled ripening rooms'],
      container: 'hanging or cushioned boxes',
      layering: 'avoid stacking to prevent bruising'
    },
    shelfLife: {
      optimal: '2-4 weeks (green), 5-7 days (ripe)',
      average: '1-2 weeks',
      factors: ['maturity', 'temperature', 'ethylene exposure']
    },
    postHarvest: {
      cooling: 'cool to 14°C within 24 hours',
      cleaning: 'wash hands in alum water to remove latex',
      treatment: 'fungicide dip or spray',
      timing: 'harvest at 75-80% maturity',
      ripening: 'ethylene treatment (100-150 ppm) at 15-20°C for uniform ripening'
    },
    commonIssues: {
      pests: ['fruit flies', 'mealybugs'],
      diseases: ['crown rot', 'anthracnose', 'cigar-end rot'],
      physical: ['chilling injury below 13°C', 'finger drop', 'bruising'],
      prevention: ['proper temperature', 'fungicide treatment', 'careful handling', 'avoid cold injury']
    },
    lossRates: {
      optimal: '8-12%',
      average: '15-25%',
      poor: '35-50%'
    }
  },
  {
    id: 'carrot',
    name: 'Carrot',
    category: 'vegetable',
    aliases: ['carrots'],
    optimalConditions: {
      temperature: { min: 0, max: 1, unit: 'celsius', ideal: 0 },
      humidity: { min: 95, max: 100, unit: 'percent', ideal: 98 },
      ventilation: 'minimal to maintain humidity',
      lighting: 'dark storage'
    },
    storageMethod: {
      primary: 'cold storage with high humidity',
      alternatives: ['sand storage', 'field storage with mulch'],
      container: 'perforated plastic bags or bins',
      layering: 'bulk or bagged with moisture retention'
    },
    shelfLife: {
      optimal: '7-9 months',
      average: '4-6 months',
      factors: ['temperature', 'humidity', 'top removal', 'variety']
    },
    postHarvest: {
      cooling: 'hydro-cool or forced-air cool to 0°C rapidly',
      cleaning: 'wash and remove tops immediately',
      treatment: 'chlorinated water wash',
      timing: 'harvest at full maturity',
      grading: 'sort by size and remove damaged roots'
    },
    commonIssues: {
      pests: ['carrot fly', 'wireworms', 'rodents'],
      diseases: ['bacterial soft rot', 'sclerotinia', 'cavity spot'],
      physical: ['wilting', 'sprouting', 'bitterness'],
      prevention: ['high humidity', 'remove tops', 'proper cooling', 'disease-free harvest']
    },
    lossRates: {
      optimal: '3-5%',
      average: '8-15%',
      poor: '25-40%'
    }
  }
];

export default storageMethodsDatabase;
