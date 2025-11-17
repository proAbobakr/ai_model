/**
 * Transportation Knowledge Base
 *
 * Comprehensive transportation requirements including:
 * - Vehicle specifications
 * - Packaging requirements
 * - Quality preservation during transport
 * - Typical transportation costs
 */

const transportationDatabase = [
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'grain',
    aliases: ['wheat grain'],
    requirements: {
      vehicleType: 'covered truck or trailer',
      temperatureControl: 'not required (ambient)',
      ventilation: 'good ventilation to prevent moisture buildup',
      cleanliness: 'clean, dry, pest-free'
    },
    packaging: {
      containers: 'bulk or jute/PP bags (50kg)',
      stacking: 'up to 10-12 bags high',
      palletization: 'optional, recommended for long distance',
      protection: 'tarpaulin cover for open vehicles'
    },
    loading: {
      maxLoad: '20-25 tons per truck',
      distribution: 'even weight distribution',
      securing: 'ropes or nets to prevent shifting'
    },
    quality: {
      moistureProtection: 'critical - cover during rain',
      handlingCare: 'avoid rough handling to prevent grain damage',
      expectedLoss: '0.5-1% for short distance, 1-2% for long distance'
    },
    costs: {
      shortDistance: { perKm: 0.15, unit: 'USD/ton/km', range: '0-100 km' },
      mediumDistance: { perKm: 0.10, unit: 'USD/ton/km', range: '100-500 km' },
      longDistance: { perKm: 0.08, unit: 'USD/ton/km', range: '500+ km' }
    }
  },
  {
    id: 'rice',
    name: 'Rice',
    category: 'grain',
    aliases: ['paddy', 'rice grain'],
    requirements: {
      vehicleType: 'covered truck or container',
      temperatureControl: 'not required (ambient)',
      ventilation: 'moderate ventilation',
      cleanliness: 'clean, dry, odor-free'
    },
    packaging: {
      containers: 'PP bags (25-50kg) or bulk',
      stacking: 'up to 10 bags high',
      palletization: 'recommended for milled rice',
      protection: 'moisture-proof packaging for milled rice'
    },
    loading: {
      maxLoad: '20-25 tons per truck',
      distribution: 'even weight distribution',
      securing: 'prevent bag tears and spillage'
    },
    quality: {
      moistureProtection: 'essential, especially for milled rice',
      handlingCare: 'gentle handling to avoid bag damage',
      expectedLoss: '0.5-1.5%'
    },
    costs: {
      shortDistance: { perKm: 0.15, unit: 'USD/ton/km', range: '0-100 km' },
      mediumDistance: { perKm: 0.12, unit: 'USD/ton/km', range: '100-500 km' },
      longDistance: { perKm: 0.10, unit: 'USD/ton/km', range: '500+ km' }
    }
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'vegetable',
    aliases: ['tomatoes', 'fresh tomatoes'],
    requirements: {
      vehicleType: 'refrigerated truck or insulated van',
      temperatureControl: '12-15°C for ripe, 10-12°C for mature green',
      ventilation: 'adequate airflow, avoid ethylene buildup',
      cleanliness: 'sanitized, odor-free'
    },
    packaging: {
      containers: 'plastic crates (10-15 kg) or cartons',
      stacking: 'max 5-6 crates high to avoid crushing',
      palletization: 'recommended for organized loading',
      protection: 'cushioning between layers, ventilated packaging'
    },
    loading: {
      maxLoad: '5-8 tons per small truck',
      distribution: 'avoid overloading bottom crates',
      securing: 'secure but avoid compression'
    },
    quality: {
      temperatureMonitoring: 'continuous monitoring required',
      handlingCare: 'extremely gentle - highly perishable',
      transitTime: 'minimize to 8-12 hours',
      expectedLoss: '5-10% optimal, 15-25% average'
    },
    costs: {
      shortDistance: { perKm: 0.80, unit: 'USD/ton/km', range: '0-100 km' },
      mediumDistance: { perKm: 0.60, unit: 'USD/ton/km', range: '100-300 km' },
      longDistance: { perKm: 0.50, unit: 'USD/ton/km', range: '300+ km' }
    }
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'vegetable',
    aliases: ['potatoes'],
    requirements: {
      vehicleType: 'covered truck or ventilated van',
      temperatureControl: 'cool (7-10°C ideal), avoid refrigeration for table stock',
      ventilation: 'excellent ventilation essential',
      cleanliness: 'clean, dry'
    },
    packaging: {
      containers: 'mesh bags (25-50 kg), jute bags, or bulk bins',
      stacking: 'up to 8-10 bags or 2m bulk height',
      palletization: 'optional',
      protection: 'avoid direct sunlight and rain'
    },
    loading: {
      maxLoad: '15-20 tons per truck',
      distribution: 'even distribution, avoid crushing',
      securing: 'prevent rolling and shifting'
    },
    quality: {
      temperatureProtection: 'avoid heat (sprouting) and cold (sweetening)',
      handlingCare: 'prevent bruising and cuts',
      transitTime: 'flexible, but avoid extended periods in heat',
      expectedLoss: '2-5%'
    },
    costs: {
      shortDistance: { perKm: 0.25, unit: 'USD/ton/km', range: '0-100 km' },
      mediumDistance: { perKm: 0.18, unit: 'USD/ton/km', range: '100-500 km' },
      longDistance: { perKm: 0.15, unit: 'USD/ton/km', range: '500+ km' }
    }
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'fruit',
    aliases: ['mangoes'],
    requirements: {
      vehicleType: 'refrigerated truck',
      temperatureControl: '10-13°C',
      ventilation: 'moderate airflow, ethylene control',
      cleanliness: 'sanitized, temperature-stable'
    },
    packaging: {
      containers: 'single-layer cartons (4-5 kg) with padding',
      stacking: 'max 5-6 cartons high',
      palletization: 'highly recommended',
      protection: 'tissue wrapping, cushioning materials'
    },
    loading: {
      maxLoad: '5-7 tons per truck (limited by volume)',
      distribution: 'careful stacking, no overloading',
      securing: 'stable pallets, avoid movement'
    },
    quality: {
      temperatureMonitoring: 'strict temperature control',
      handlingCare: 'extremely gentle to avoid bruising',
      transitTime: 'minimize to 12-24 hours',
      preTransit: 'pre-cooling recommended',
      expectedLoss: '8-15%'
    },
    costs: {
      shortDistance: { perKm: 1.20, unit: 'USD/ton/km', range: '0-100 km' },
      mediumDistance: { perKm: 0.90, unit: 'USD/ton/km', range: '100-500 km' },
      longDistance: { perKm: 0.70, unit: 'USD/ton/km', range: '500+ km' }
    }
  },
  {
    id: 'date',
    name: 'Date (Fruit)',
    category: 'fruit',
    aliases: ['dates', 'date palm fruit'],
    requirements: {
      vehicleType: 'insulated or refrigerated truck for soft dates',
      temperatureControl: '0-5°C for fresh dates, ambient for dried',
      ventilation: 'minimal for packaged dates',
      cleanliness: 'clean, dry, pest-free'
    },
    packaging: {
      containers: 'sealed boxes or bags (5-25 kg)',
      stacking: 'up to 2m height for boxes',
      palletization: 'recommended',
      protection: 'moisture-proof packaging'
    },
    loading: {
      maxLoad: '10-15 tons per truck',
      distribution: 'avoid crushing bottom layers',
      securing: 'stable stacking'
    },
    quality: {
      moistureProtection: 'critical for quality maintenance',
      handlingCare: 'moderate care needed',
      transitTime: 'flexible for dried dates',
      expectedLoss: '1-3%'
    },
    costs: {
      shortDistance: { perKm: 0.40, unit: 'USD/ton/km', range: '0-200 km' },
      mediumDistance: { perKm: 0.30, unit: 'USD/ton/km', range: '200-1000 km' },
      longDistance: { perKm: 0.25, unit: 'USD/ton/km', range: '1000+ km' }
    }
  },
  {
    id: 'onion',
    name: 'Onion',
    category: 'vegetable',
    aliases: ['onions'],
    requirements: {
      vehicleType: 'well-ventilated truck',
      temperatureControl: 'cool (0-5°C for long storage), ambient acceptable for short',
      ventilation: 'excellent ventilation critical',
      cleanliness: 'clean, dry'
    },
    packaging: {
      containers: 'mesh bags (25-50 kg) or crates',
      stacking: 'up to 10 bags or 2m height',
      palletization: 'optional',
      protection: 'allow air circulation'
    },
    loading: {
      maxLoad: '15-20 tons per truck',
      distribution: 'ensure airflow between stacks',
      securing: 'prevent crushing'
    },
    quality: {
      ventilationRequired: 'essential to prevent sprouting and rotting',
      handlingCare: 'avoid bruising outer scales',
      transitTime: 'flexible for well-cured onions',
      expectedLoss: '3-8%'
    },
    costs: {
      shortDistance: { perKm: 0.20, unit: 'USD/ton/km', range: '0-100 km' },
      mediumDistance: { perKm: 0.15, unit: 'USD/ton/km', range: '100-500 km' },
      longDistance: { perKm: 0.12, unit: 'USD/ton/km', range: '500+ km' }
    }
  },
  {
    id: 'citrus',
    name: 'Citrus (Orange, Lemon, Lime)',
    category: 'fruit',
    aliases: ['oranges', 'lemons', 'limes'],
    requirements: {
      vehicleType: 'refrigerated truck',
      temperatureControl: '3-8°C depending on variety',
      ventilation: 'moderate airflow',
      cleanliness: 'sanitized, temperature-stable'
    },
    packaging: {
      containers: 'cardboard cartons (15-20 kg) with dividers',
      stacking: 'max 6-8 cartons high',
      palletization: 'recommended',
      protection: 'individual wrapping for export quality'
    },
    loading: {
      maxLoad: '8-12 tons per truck',
      distribution: 'avoid overloading',
      securing: 'stable pallets'
    },
    quality: {
      temperatureMonitoring: 'maintain consistent temperature',
      handlingCare: 'gentle to prevent peel damage',
      transitTime: 'can tolerate 24-48 hours',
      expectedLoss: '3-8%'
    },
    costs: {
      shortDistance: { perKm: 0.60, unit: 'USD/ton/km', range: '0-200 km' },
      mediumDistance: { perKm: 0.45, unit: 'USD/ton/km', range: '200-500 km' },
      longDistance: { perKm: 0.35, unit: 'USD/ton/km', range: '500+ km' }
    }
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'fruit',
    aliases: ['bananas'],
    requirements: {
      vehicleType: 'refrigerated truck with ethylene control',
      temperatureControl: '13-15°C',
      ventilation: 'controlled ventilation',
      cleanliness: 'sanitized, odor-free'
    },
    packaging: {
      containers: 'cushioned cartons or hanging racks',
      stacking: 'minimal stacking to prevent bruising',
      palletization: 'recommended with hanging option',
      protection: 'cushioning, avoid pressure points'
    },
    loading: {
      maxLoad: '6-10 tons per truck (limited by volume)',
      distribution: 'hanging or single-layer preferred',
      securing: 'prevent movement and contact'
    },
    quality: {
      temperatureMonitoring: 'strict - chilling injury below 13°C',
      handlingCare: 'extremely gentle',
      ethyleneControl: 'avoid premature ripening',
      transitTime: 'minimize to 12-18 hours',
      expectedLoss: '5-12%'
    },
    costs: {
      shortDistance: { perKm: 1.00, unit: 'USD/ton/km', range: '0-100 km' },
      mediumDistance: { perKm: 0.75, unit: 'USD/ton/km', range: '100-300 km' },
      longDistance: { perKm: 0.60, unit: 'USD/ton/km', range: '300+ km' }
    }
  },
  {
    id: 'carrot',
    name: 'Carrot',
    category: 'vegetable',
    aliases: ['carrots'],
    requirements: {
      vehicleType: 'refrigerated truck',
      temperatureControl: '0-2°C',
      ventilation: 'minimal (maintain humidity)',
      cleanliness: 'sanitized, moisture-retaining'
    },
    packaging: {
      containers: 'perforated plastic bags in cartons (10-20 kg)',
      stacking: 'up to 8-10 cartons',
      palletization: 'recommended',
      protection: 'moisture retention critical'
    },
    loading: {
      maxLoad: '10-15 tons per truck',
      distribution: 'even distribution',
      securing: 'prevent shifting'
    },
    quality: {
      temperatureMonitoring: 'maintain near 0°C',
      moistureControl: 'high humidity (95-100%) required',
      handlingCare: 'moderate care',
      transitTime: 'can tolerate 24-48 hours with proper cooling',
      expectedLoss: '2-5%'
    },
    costs: {
      shortDistance: { perKm: 0.50, unit: 'USD/ton/km', range: '0-100 km' },
      mediumDistance: { perKm: 0.40, unit: 'USD/ton/km', range: '100-500 km' },
      longDistance: { perKm: 0.32, unit: 'USD/ton/km', range: '500+ km' }
    }
  },
  {
    id: 'corn',
    name: 'Corn (Maize)',
    category: 'grain',
    aliases: ['maize', 'corn grain'],
    requirements: {
      vehicleType: 'covered truck or trailer',
      temperatureControl: 'not required (ambient)',
      ventilation: 'good ventilation',
      cleanliness: 'clean, dry, pest-free'
    },
    packaging: {
      containers: 'bulk or PP bags (50 kg)',
      stacking: 'up to 10-12 bags high',
      palletization: 'optional',
      protection: 'moisture protection'
    },
    loading: {
      maxLoad: '20-25 tons per truck',
      distribution: 'even weight distribution',
      securing: 'prevent spillage'
    },
    quality: {
      moistureProtection: 'important to prevent mold',
      handlingCare: 'avoid contamination',
      expectedLoss: '0.5-1.5%'
    },
    costs: {
      shortDistance: { perKm: 0.15, unit: 'USD/ton/km', range: '0-100 km' },
      mediumDistance: { perKm: 0.10, unit: 'USD/ton/km', range: '100-500 km' },
      longDistance: { perKm: 0.08, unit: 'USD/ton/km', range: '500+ km' }
    }
  }
];

export default transportationDatabase;
