/**
 * Market Data Knowledge Base
 *
 * Comprehensive market information including:
 * - Price ranges and trends
 * - Market channels
 * - Seasonal demand patterns
 * - Value-added opportunities
 * - Export markets
 */

const marketDataDatabase = [
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'grain',
    aliases: ['wheat grain'],
    pricing: {
      farmGate: { min: 200, max: 300, unit: 'USD/ton', average: 250 },
      wholesale: { min: 250, max: 350, unit: 'USD/ton', average: 300 },
      retail: { min: 400, max: 600, unit: 'USD/ton', average: 500 },
      factors: ['quality', 'moisture content', 'protein level', 'season']
    },
    marketChannels: [
      { channel: 'grain traders', margin: '10-15%', volume: 'high', payment: 'immediate to 30 days' },
      { channel: 'flour mills', margin: '5-10%', volume: 'high', payment: '15-30 days' },
      { channel: 'cooperatives', margin: '15-20%', volume: 'medium', payment: 'after sale' },
      { channel: 'government procurement', margin: '8-12%', volume: 'high', payment: '30-60 days' }
    ],
    seasonalDemand: {
      peak: ['October-December', 'March-May'],
      low: ['June-August'],
      pattern: 'Prices higher during low harvest periods'
    },
    trends: {
      shortTerm: 'stable',
      mediumTerm: 'slight increase due to population growth',
      longTerm: 'increasing demand globally'
    },
    valueAdded: [
      { product: 'flour', valueIncrease: '80-100%', market: 'large', investment: 'high' },
      { product: 'bran', valueIncrease: '30-40%', market: 'medium (animal feed)', investment: 'low' },
      { product: 'organic certification', valueIncrease: '20-30%', market: 'growing', investment: 'medium' }
    ],
    exportMarkets: [
      { country: 'Middle East', demand: 'high', price: 'premium', requirements: ['quality certificate', 'phytosanitary'] },
      { country: 'Africa', demand: 'high', price: 'competitive', requirements: ['standard grade'] },
      { country: 'Asia', demand: 'medium', price: 'variable', requirements: ['quality specs'] }
    ]
  },
  {
    id: 'rice',
    name: 'Rice',
    category: 'grain',
    aliases: ['paddy', 'rice grain'],
    pricing: {
      farmGate: { min: 300, max: 500, unit: 'USD/ton', average: 400 },
      wholesale: { min: 400, max: 650, unit: 'USD/ton', average: 525 },
      retail: { min: 700, max: 1200, unit: 'USD/ton', average: 950 },
      factors: ['variety', 'grain length', 'aroma', 'broken percentage']
    },
    marketChannels: [
      { channel: 'rice mills', margin: '15-25%', volume: 'high', payment: 'immediate to 15 days' },
      { channel: 'traders', margin: '10-15%', volume: 'high', payment: 'immediate' },
      { channel: 'direct to retailers', margin: '30-40%', volume: 'medium', payment: 'cash' },
      { channel: 'export agents', margin: '20-30%', volume: 'high', payment: '30-45 days' }
    ],
    seasonalDemand: {
      peak: ['November-January (post-harvest)', 'April-June (pre-new harvest)'],
      low: ['July-September'],
      pattern: 'Prices rise 3-4 months after main harvest'
    },
    trends: {
      shortTerm: 'stable with seasonal variation',
      mediumTerm: 'premium varieties gaining market share',
      longTerm: 'sustainable increase in demand'
    },
    valueAdded: [
      { product: 'parboiled rice', valueIncrease: '15-25%', market: 'large', investment: 'medium' },
      { product: 'basmati/aromatic', valueIncrease: '100-200%', market: 'growing', investment: 'low (varietal)' },
      { product: 'organic rice', valueIncrease: '40-60%', market: 'niche but growing', investment: 'medium' },
      { product: 'ready-to-eat rice', valueIncrease: '200-300%', market: 'urban/export', investment: 'high' }
    ],
    exportMarkets: [
      { country: 'Middle East', demand: 'very high', price: 'premium for basmati', requirements: ['quality certificate', 'specific varieties'] },
      { country: 'Africa', demand: 'high', price: 'competitive', requirements: ['broken percentage limits'] },
      { country: 'Europe', demand: 'medium', price: 'premium', requirements: ['organic/food safety standards'] }
    ]
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'vegetable',
    aliases: ['tomatoes', 'fresh tomato'],
    pricing: {
      farmGate: { min: 200, max: 800, unit: 'USD/ton', average: 400 },
      wholesale: { min: 300, max: 1000, unit: 'USD/ton', average: 550 },
      retail: { min: 600, max: 1800, unit: 'USD/ton', average: 1000 },
      factors: ['season', 'quality', 'size', 'variety', 'supply glut']
    },
    marketChannels: [
      { channel: 'wholesale markets', margin: '20-30%', volume: 'high', payment: 'cash/1-2 days' },
      { channel: 'supermarkets', margin: '40-60%', volume: 'medium', payment: '15-30 days' },
      { channel: 'processors', margin: '10-15%', volume: 'high', payment: '30 days' },
      { channel: 'farmers markets', margin: '50-80%', volume: 'low', payment: 'immediate' }
    ],
    seasonalDemand: {
      peak: ['Winter months (Nov-Feb) - lower supply, higher prices'],
      low: ['Summer months (Jun-Aug) - peak production, lower prices'],
      pattern: 'Highly seasonal with 2-3x price variation'
    },
    trends: {
      shortTerm: 'volatile, weather dependent',
      mediumTerm: 'shift towards cherry/specialty varieties',
      longTerm: 'greenhouse production increasing, stabilizing prices'
    },
    valueAdded: [
      { product: 'tomato paste', valueIncrease: '60-100%', market: 'large', investment: 'high' },
      { product: 'dried tomatoes', valueIncrease: '200-400%', market: 'niche', investment: 'medium' },
      { product: 'cherry tomatoes', valueIncrease: '50-100%', market: 'growing', investment: 'low (varietal)' },
      { product: 'organic tomatoes', valueIncrease: '30-50%', market: 'urban/export', investment: 'medium' }
    ],
    exportMarkets: [
      { country: 'Gulf countries', demand: 'high', price: 'premium', requirements: ['quality grading', 'packaging'] },
      { country: 'Europe', demand: 'medium', price: 'very premium', requirements: ['GlobalGAP', 'food safety'] }
    ]
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'vegetable',
    aliases: ['potatoes'],
    pricing: {
      farmGate: { min: 150, max: 400, unit: 'USD/ton', average: 250 },
      wholesale: { min: 200, max: 500, unit: 'USD/ton', average: 320 },
      retail: { min: 400, max: 800, unit: 'USD/ton', average: 550 },
      factors: ['season', 'size', 'variety', 'storage quality']
    },
    marketChannels: [
      { channel: 'wholesale markets', margin: '15-25%', volume: 'high', payment: 'cash/3 days' },
      { channel: 'processors (chips/fries)', margin: '10-20%', volume: 'very high', payment: '30 days' },
      { channel: 'supermarkets', margin: '40-60%', volume: 'medium', payment: '15-30 days' },
      { channel: 'cold storage', margin: '30-50% (seasonal)', volume: 'high', payment: 'after storage period' }
    ],
    seasonalDemand: {
      peak: ['Monsoon season (Jul-Sep) - lower supply', 'Winter (Dec-Feb) - higher consumption'],
      low: ['Post-harvest (Mar-May)'],
      pattern: 'Good storage allows 40-60% price appreciation over 4-6 months'
    },
    trends: {
      shortTerm: 'stable with storage-driven price variations',
      mediumTerm: 'processing demand growing',
      longTerm: 'increasing consumption due to fast food growth'
    },
    valueAdded: [
      { product: 'frozen french fries', valueIncrease: '150-250%', market: 'large and growing', investment: 'very high' },
      { product: 'potato chips', valueIncrease: '300-500%', market: 'large', investment: 'high' },
      { product: 'dehydrated potato', valueIncrease: '100-150%', market: 'medium', investment: 'high' },
      { product: 'seed potato', valueIncrease: '100-200%', market: 'specialized', investment: 'medium' }
    ],
    exportMarkets: [
      { country: 'Nepal/Bhutan', demand: 'medium', price: 'standard', requirements: ['phytosanitary certificate'] },
      { country: 'Bangladesh', demand: 'seasonal high', price: 'competitive', requirements: ['quality grade'] }
    ]
  },
  {
    id: 'corn',
    name: 'Corn (Maize)',
    category: 'grain',
    aliases: ['maize', 'corn grain'],
    pricing: {
      farmGate: { min: 180, max: 280, unit: 'USD/ton', average: 220 },
      wholesale: { min: 220, max: 320, unit: 'USD/ton', average: 270 },
      retail: { min: 350, max: 500, unit: 'USD/ton', average: 425 },
      factors: ['moisture', 'type (feed/food)', 'season', 'quality']
    },
    marketChannels: [
      { channel: 'feed mills', margin: '10-15%', volume: 'very high', payment: '15-30 days' },
      { channel: 'food processors', margin: '15-25%', volume: 'high', payment: '30 days' },
      { channel: 'starch industry', margin: '12-18%', volume: 'high', payment: '30-45 days' },
      { channel: 'poultry farms', margin: '8-12%', volume: 'high', payment: '15 days' }
    ],
    seasonalDemand: {
      peak: ['January-March (lean period)', 'July-September (pre-harvest)'],
      low: ['October-December (post-harvest)'],
      pattern: 'Poultry demand stable, food industry seasonal'
    },
    trends: {
      shortTerm: 'linked to livestock feed demand',
      mediumTerm: 'biofuel demand providing price floor',
      longTerm: 'poultry industry growth driving demand'
    },
    valueAdded: [
      { product: 'corn flour/starch', valueIncrease: '80-120%', market: 'large', investment: 'high' },
      { product: 'popcorn', valueIncrease: '200-400%', market: 'medium', investment: 'medium' },
      { product: 'sweet corn (fresh)', valueIncrease: '150-250%', market: 'urban/growing', investment: 'low (varietal)' },
      { product: 'corn silage', valueIncrease: '20-40%', market: 'dairy farms', investment: 'low' }
    ],
    exportMarkets: [
      { country: 'Southeast Asia', demand: 'medium', price: 'competitive', requirements: ['moisture standards'] },
      { country: 'Japan/Korea', demand: 'medium', price: 'premium for food grade', requirements: ['non-GMO certification'] }
    ]
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'fruit',
    aliases: ['mangoes'],
    pricing: {
      farmGate: { min: 300, max: 1500, unit: 'USD/ton', average: 700 },
      wholesale: { min: 500, max: 2000, unit: 'USD/ton', average: 1000 },
      retail: { min: 1000, max: 4000, unit: 'USD/ton', average: 2000 },
      factors: ['variety', 'size', 'ripeness', 'season', 'export quality']
    },
    marketChannels: [
      { channel: 'wholesale markets', margin: '30-50%', volume: 'high', payment: 'cash/2 days' },
      { channel: 'export agents', margin: '40-80%', volume: 'medium', payment: '30-45 days' },
      { channel: 'processors (pulp)', margin: '20-30%', volume: 'high', payment: '30 days' },
      { channel: 'supermarkets', margin: '60-100%', volume: 'low-medium', payment: '15-30 days' }
    ],
    seasonalDemand: {
      peak: ['March-June (mango season) - supply high, prices moderate'],
      low: ['July-February (off-season)'],
      pattern: 'Very seasonal, export varieties command premium'
    },
    trends: {
      shortTerm: 'highly seasonal, weather dependent',
      mediumTerm: 'export demand growing strongly',
      longTerm: 'processing and export driving orchard expansion'
    },
    valueAdded: [
      { product: 'mango pulp', valueIncrease: '50-80%', market: 'large (domestic and export)', investment: 'high' },
      { product: 'dried mango', valueIncrease: '200-400%', market: 'export and urban', investment: 'medium' },
      { product: 'mango juice', valueIncrease: '150-250%', market: 'medium', investment: 'high' },
      { product: 'pickles/chutney', valueIncrease: '100-200%', market: 'traditional', investment: 'low' }
    ],
    exportMarkets: [
      { country: 'UAE/Gulf', demand: 'very high', price: 'premium', requirements: ['phytosanitary', 'VHT treatment'] },
      { country: 'Europe', demand: 'high', price: 'very premium', requirements: ['GlobalGAP', 'VHT', 'organic preferred'] },
      { country: 'USA', demand: 'high', price: 'premium', requirements: ['IRRADIATION or VHT', 'USDA certification'] }
    ]
  },
  {
    id: 'date',
    name: 'Date (Fruit)',
    category: 'fruit',
    aliases: ['dates', 'date palm fruit'],
    pricing: {
      farmGate: { min: 1000, max: 4000, unit: 'USD/ton', average: 2000 },
      wholesale: { min: 1500, max: 5000, unit: 'USD/ton', average: 2800 },
      retail: { min: 3000, max: 10000, unit: 'USD/ton', average: 5500 },
      factors: ['variety', 'moisture content', 'size', 'season', 'organic status']
    },
    marketChannels: [
      { channel: 'traditional traders', margin: '20-40%', volume: 'high', payment: 'cash/15 days' },
      { channel: 'export markets', margin: '50-100%', volume: 'medium', payment: '30-60 days' },
      { channel: 'supermarkets', margin: '60-120%', volume: 'medium', payment: '30 days' },
      { channel: 'direct online', margin: '80-150%', volume: 'low', payment: 'immediate' }
    ],
    seasonalDemand: {
      peak: ['Ramadan (1-2 months before)', 'September-November (harvest season)'],
      low: ['February-May'],
      pattern: 'Ramadan creates 40-60% price spike'
    },
    trends: {
      shortTerm: 'stable with Ramadan spike',
      mediumTerm: 'health food trend boosting demand',
      longTerm: 'organic and premium varieties gaining market share'
    },
    valueAdded: [
      { product: 'organic certification', valueIncrease: '30-60%', market: 'export and urban', investment: 'medium' },
      { product: 'date paste', valueIncrease: '40-70%', market: 'food industry', investment: 'medium' },
      { product: 'stuffed dates', valueIncrease: '100-200%', market: 'premium retail', investment: 'low' },
      { product: 'date syrup', valueIncrease: '150-250%', market: 'health food', investment: 'medium' }
    ],
    exportMarkets: [
      { country: 'Europe', demand: 'high', price: 'very premium', requirements: ['organic preferred', 'food safety'] },
      { country: 'USA/Canada', demand: 'growing', price: 'premium', requirements: ['food safety standards'] },
      { country: 'Asia (India/Pakistan)', demand: 'high', price: 'competitive', requirements: ['quality grading'] }
    ]
  },
  {
    id: 'onion',
    name: 'Onion',
    category: 'vegetable',
    aliases: ['onions'],
    pricing: {
      farmGate: { min: 100, max: 600, unit: 'USD/ton', average: 250 },
      wholesale: { min: 150, max: 800, unit: 'USD/ton', average: 350 },
      retail: { min: 300, max: 1200, unit: 'USD/ton', average: 600 },
      factors: ['season', 'storage quality', 'size', 'variety', 'government intervention']
    },
    marketChannels: [
      { channel: 'wholesale markets', margin: '30-60%', volume: 'very high', payment: 'cash/1-2 days' },
      { channel: 'cold storage', margin: '50-200% (seasonal)', volume: 'high', payment: 'after storage' },
      { channel: 'export agents', margin: '25-50%', volume: 'medium', payment: '30 days' },
      { channel: 'processors (dehydrated)', margin: '20-30%', volume: 'low', payment: '30 days' }
    ],
    seasonalDemand: {
      peak: ['August-November (lean period) - prices can triple'],
      low: ['December-March (post-harvest)'],
      pattern: 'Extreme price volatility, storage crucial for profits'
    },
    trends: {
      shortTerm: 'highly volatile, government intervention common',
      mediumTerm: 'cold storage capacity increasing, reducing volatility',
      longTerm: 'export potential growing'
    },
    valueAdded: [
      { product: 'dehydrated onion', valueIncrease: '200-400%', market: 'export and food industry', investment: 'high' },
      { product: 'onion powder', valueIncrease: '300-600%', market: 'export', investment: 'high' },
      { product: 'pickled onion', valueIncrease: '100-200%', market: 'niche', investment: 'medium' },
      { product: 'fresh peeled onion', valueIncrease: '50-80%', market: 'food service', investment: 'low' }
    ],
    exportMarkets: [
      { country: 'Bangladesh', demand: 'very high', price: 'competitive', requirements: ['phytosanitary certificate'] },
      { country: 'Malaysia/Singapore', demand: 'high', price: 'premium', requirements: ['quality grading'] },
      { country: 'Middle East', demand: 'medium', price: 'standard', requirements: ['quality certificate'] }
    ]
  }
];

export default marketDataDatabase;
