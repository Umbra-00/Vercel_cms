export interface CommodityPrice {
    id: string;
    name: string;
    category: "grains" | "oilseeds" | "pulses" | "spices";
    currentPrice: number;
    previousPrice: number;
    change: number;
    changePercent: number;
    volume: number;
    unit: string;
    region: string;
    lastUpdated: string;
    trend: "up" | "down" | "stable";
    sparklineData: number[];
}

export interface MarketInsight {
    id: string;
    title: string;
    category: "bullish" | "bearish" | "neutral" | "alert";
    description: string;
    impact: "high" | "medium" | "low";
    commodities: string[];
    date: string;
}

export interface SupplyChainMetric {
    location: string;
    warehouse: string;
    stockLevel: number;
    capacity: number;
    inTransit: number;
    utilizationPercent: number;
    commodities: {
        name: string;
        quantity: number;
        unit: string;
    }[];
}

export interface RegionalPrice {
    region: string;
    city: string;
    coordinates: [number, number];
    prices: {
        commodity: string;
        price: number;
        change: number;
    }[];
}

// Live commodity prices
export const commodityPrices: CommodityPrice[] = [
    {
        id: "wheat-001",
        name: "Wheat",
        category: "grains",
        currentPrice: 2850,
        previousPrice: 2720,
        change: 130,
        changePercent: 4.78,
        volume: 12500,
        unit: "INR/Quintal",
        region: "Nagpur",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "up",
        sparklineData: [2650, 2680, 2720, 2750, 2800, 2850]
    },
    {
        id: "rice-001",
        name: "Basmati Rice",
        category: "grains",
        currentPrice: 4200,
        previousPrice: 4350,
        change: -150,
        changePercent: -3.45,
        volume: 8900,
        unit: "INR/Quintal",
        region: "Mumbai",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "down",
        sparklineData: [4500, 4450, 4400, 4350, 4280, 4200]
    },
    {
        id: "soybean-001",
        name: "Soybean",
        category: "oilseeds",
        currentPrice: 5650,
        previousPrice: 5640,
        change: 10,
        changePercent: 0.18,
        volume: 15200,
        unit: "INR/Quintal",
        region: "Delhi",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "stable",
        sparklineData: [5600, 5620, 5640, 5650, 5645, 5650]
    },
    {
        id: "mustard-001",
        name: "Mustard Seeds",
        category: "oilseeds",
        currentPrice: 6800,
        previousPrice: 6550,
        change: 250,
        changePercent: 3.82,
        volume: 6700,
        unit: "INR/Quintal",
        region: "Kolkata",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "up",
        sparklineData: [6400, 6500, 6550, 6650, 6750, 6800]
    },
    {
        id: "turmeric-001",
        name: "Turmeric",
        category: "spices",
        currentPrice: 14500,
        previousPrice: 14800,
        change: -300,
        changePercent: -2.03,
        volume: 3200,
        unit: "INR/Quintal",
        region: "Chennai",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "down",
        sparklineData: [15000, 14900, 14850, 14800, 14650, 14500]
    },
    {
        id: "chilli-001",
        name: "Red Chilli",
        category: "spices",
        currentPrice: 18200,
        previousPrice: 17500,
        change: 700,
        changePercent: 4.0,
        volume: 2800,
        unit: "INR/Quintal",
        region: "Nagpur",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "up",
        sparklineData: [17000, 17200, 17500, 17800, 18000, 18200]
    },
    {
        id: "maize-001",
        name: "Maize",
        category: "grains",
        currentPrice: 2100,
        previousPrice: 2080,
        change: 20,
        changePercent: 0.96,
        volume: 18500,
        unit: "INR/Quintal",
        region: "Mumbai",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "stable",
        sparklineData: [2050, 2060, 2080, 2090, 2095, 2100]
    },
    {
        id: "cotton-001",
        name: "Cotton",
        category: "grains",
        currentPrice: 7850,
        previousPrice: 7920,
        change: -70,
        changePercent: -0.88,
        volume: 9400,
        unit: "INR/Quintal",
        region: "Delhi",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "down",
        sparklineData: [8000, 7980, 7950, 7920, 7880, 7850]
    },
    {
        id: "groundnut-001",
        name: "Groundnut",
        category: "oilseeds",
        currentPrice: 6200,
        previousPrice: 5950,
        change: 250,
        changePercent: 4.20,
        volume: 7100,
        unit: "INR/Quintal",
        region: "Kolkata",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "up",
        sparklineData: [5800, 5900, 5950, 6050, 6150, 6200]
    },
    {
        id: "tur-001",
        name: "Tur Dal",
        category: "pulses",
        currentPrice: 11500,
        previousPrice: 11500,
        change: 0,
        changePercent: 0,
        volume: 5600,
        unit: "INR/Quintal",
        region: "Chennai",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "stable",
        sparklineData: [11450, 11480, 11500, 11500, 11500, 11500]
    },
    {
        id: "moong-001",
        name: "Moong Dal",
        category: "pulses",
        currentPrice: 9800,
        previousPrice: 10100,
        change: -300,
        changePercent: -2.97,
        volume: 4200,
        unit: "INR/Quintal",
        region: "Nagpur",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "down",
        sparklineData: [10300, 10250, 10150, 10100, 9950, 9800]
    },
    {
        id: "urad-001",
        name: "Urad Dal",
        category: "pulses",
        currentPrice: 8900,
        previousPrice: 8650,
        change: 250,
        changePercent: 2.89,
        volume: 3900,
        unit: "INR/Quintal",
        region: "Mumbai",
        lastUpdated: "2025-11-22T15:30:00",
        trend: "up",
        sparklineData: [8500, 8600, 8650, 8750, 8850, 8900]
    }
];

// Market insights and analysis
export const marketInsights: MarketInsight[] = [
    {
        id: "insight-001",
        title: "Wheat Prices Rally on Delayed Monsoon",
        category: "bullish",
        description: "Wheat prices are showing strong upward momentum due to delayed monsoons in key growing regions of Punjab and Haryana. Procurement targets are likely to be missed by 15-20%, driving spot prices higher across major mandis. Experts predict sustained bullish pressure through Q4 2025.",
        impact: "high",
        commodities: ["Wheat", "Maize"],
        date: "2025-11-22"
    },
    {
        id: "insight-002",
        title: "Global Soybean Demand Stabilizing",
        category: "neutral",
        description: "International markets are stabilizing after recent volatility, but domestic demand remains robust. The correlation between Chicago Board of Trade futures and local mandi prices has tightened to 0.87, suggesting increased global integration of Indian commodity markets.",
        impact: "medium",
        commodities: ["Soybean", "Groundnut", "Mustard Seeds"],
        date: "2025-11-21"
    },
    {
        id: "insight-003",
        title: "Supply Chain Bottlenecks in Northern Corridor",
        category: "alert",
        description: "Logistical bottlenecks in the northern corridor are creating temporary supply gaps for multiple commodities. Warehousing stocks in Delhi and Kolkata are being depleted faster than replenishment rates. Railway strike concerns adding to uncertainty.",
        impact: "high",
        commodities: ["Wheat", "Rice", "Cotton"],
        date: "2025-11-22"
    },
    {
        id: "insight-004",
        title: "Turmeric Exports Decline 8% YoY",
        category: "bearish",
        description: "Turmeric exports have declined 8% year-over-year due to increased competition from Vietnam and Myanmar. Domestic prices are under pressure as farmers look to offload inventory. Government considering minimum support price revision.",
        impact: "medium",
        commodities: ["Turmeric"],
        date: "2025-11-20"
    },
    {
        id: "insight-005",
        title: "Pulses Import Duty Revision Under Review",
        category: "neutral",
        description: "The government is reviewing import duty structures for pulses to balance domestic production incentives with consumer price stability. Tur and Moong dal prices may see moderate volatility in coming weeks pending policy announcement.",
        impact: "medium",
        commodities: ["Tur Dal", "Moong Dal", "Urad Dal"],
        date: "2025-11-21"
    }
];

// Supply chain metrics
export const supplyChainMetrics: SupplyChainMetric[] = [
    {
        location: "Nagpur",
        warehouse: "NCSCI Central Warehouse Alpha",
        stockLevel: 45000,
        capacity: 60000,
        inTransit: 8500,
        utilizationPercent: 75,
        commodities: [
            { name: "Wheat", quantity: 18000, unit: "MT" },
            { name: "Turmeric", quantity: 12000, unit: "MT" },
            { name: "Red Chilli", quantity: 8500, unit: "MT" },
            { name: "Cotton", quantity: 6500, unit: "MT" }
        ]
    },
    {
        location: "Mumbai",
        warehouse: "NCSCI Port Facility Beta",
        stockLevel: 82000,
        capacity: 100000,
        inTransit: 15000,
        utilizationPercent: 82,
        commodities: [
            { name: "Basmati Rice", quantity: 35000, unit: "MT" },
            { name: "Soybean", quantity: 22000, unit: "MT" },
            { name: "Maize", quantity: 15000, unit: "MT" },
            { name: "Groundnut", quantity: 10000, unit: "MT" }
        ]
    },
    {
        location: "Delhi",
        warehouse: "NCSCI North Hub Gamma",
        stockLevel: 58000,
        capacity: 75000,
        inTransit: 6500,
        utilizationPercent: 77,
        commodities: [
            { name: "Wheat", quantity: 25000, unit: "MT" },
            { name: "Mustard Seeds", quantity: 18000, unit: "MT" },
            { name: "Cotton", quantity: 15000, unit: "MT" }
        ]
    },
    {
        location: "Kolkata",
        warehouse: "NCSCI East Distribution Delta",
        stockLevel: 39000,
        capacity: 55000,
        inTransit: 9200,
        utilizationPercent: 71,
        commodities: [
            { name: "Rice", quantity: 20000, unit: "MT" },
            { name: "Tur Dal", quantity: 12000, unit: "MT" },
            { name: "Urad Dal", quantity: 7000, unit: "MT" }
        ]
    },
    {
        location: "Chennai",
        warehouse: "NCSCI South Logistics Epsilon",
        stockLevel: 31000,
        capacity: 45000,
        inTransit: 5800,
        utilizationPercent: 69,
        commodities: [
            { name: "Turmeric", quantity: 15000, unit: "MT" },
            { name: "Red Chilli", quantity: 9000, unit: "MT" },
            { name: "Moong Dal", quantity: 7000, unit: "MT" }
        ]
    }
];

// Regional price variations
export const regionalPrices: RegionalPrice[] = [
    {
        region: "West",
        city: "Mumbai",
        coordinates: [72.8777, 19.0760],
        prices: [
            { commodity: "Wheat", price: 2800, change: 3.2 },
            { commodity: "Rice", price: 4200, change: -3.5 },
            { commodity: "Soybean", price: 5600, change: 0.5 }
        ]
    },
    {
        region: "North",
        city: "Delhi",
        coordinates: [77.2090, 28.6139],
        prices: [
            { commodity: "Wheat", price: 2900, change: 5.1 },
            { commodity: "Mustard", price: 6900, change: 4.2 },
            { commodity: "Cotton", price: 7800, change: -1.2 }
        ]
    },
    {
        region: "East",
        city: "Kolkata",
        coordinates: [88.3639, 22.5726],
        prices: [
            { commodity: "Rice", price: 4150, change: -2.8 },
            { commodity: "Groundnut", price: 6250, change: 4.5 },
            { commodity: "Tur Dal", price: 11600, change: 0.2 }
        ]
    },
    {
        region: "South",
        city: "Chennai",
        coordinates: [80.2707, 13.0827],
        prices: [
            { commodity: "Turmeric", price: 14600, change: -1.9 },
            { commodity: "Chilli", price: 18100, change: 3.8 },
            { commodity: "Moong Dal", price: 9750, change: -3.2 }
        ]
    },
    {
        region: "Central",
        city: "Nagpur",
        coordinates: [79.0882, 21.1458],
        prices: [
            { commodity: "Wheat", price: 2850, change: 4.8 },
            { commodity: "Turmeric", price: 14500, change: -2.0 },
            { commodity: "Chilli", price: 18200, change: 4.0 }
        ]
    }
];

// Historical trend data for charts (last 30 days)
export const generateHistoricalData = (commodity: string): { date: string; price: number }[] => {
    const basePrice = commodityPrices.find(c => c.name === commodity)?.currentPrice || 5000;
    const data: { date: string; price: number }[] = [];

    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const randomVariation = (Math.random() - 0.5) * 200;
        const price = basePrice + randomVariation - (i * 5);
        data.push({
            date: date.toISOString().split('T')[0],
            price: Math.round(price)
        });
    }

    return data;
};

// Market news
export const marketNews = [
    {
        id: "news-001",
        headline: "NCDEX Trading Volume Surges 23% in November",
        summary: "Commodity futures trading activity reaches new highs amid increased farmer participation and institutional interest.",
        timestamp: "2 hours ago",
        category: "trading"
    },
    {
        id: "news-002",
        headline: "Government Announces ₹5000 Cr Agricultural Credit Package",
        summary: "New credit facility aims to support farmers and commodity traders with low-interest loans for procurement and storage.",
        timestamp: "5 hours ago",
        category: "policy"
    },
    {
        id: "news-003",
        headline: "Warehouse Capacity Expansion in Tier-2 Cities",
        summary: "NCSCI partners with state governments to develop 500,000 MT additional storage capacity across 15 locations.",
        timestamp: "1 day ago",
        category: "infrastructure"
    },
    {
        id: "news-004",
        headline: "Export Ban on Onions Lifted After Price Stabilization",
        summary: "Government removes export restrictions as domestic prices cool down to acceptable levels.",
        timestamp: "2 days ago",
        category: "policy"
    }
];
