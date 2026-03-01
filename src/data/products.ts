export type Category =
    | 'Foodgrains & Cereals'
    | 'Pulses'
    | 'Oilseeds & Edible Oils'
    | 'Spices'
    | 'Horticulture'
    | 'Commercial & Industrial'
    | 'Essentials & Processed';

export interface Product {
    id: string;
    name: string;
    category: Category;
    commodity: string; // e.g., Wheat, Chana
    variety?: string; // e.g., Sharbati, Desi
    grade: string; // e.g., FAQ, SQ, Grade A
    origin: string; // State
    cropYear: string; // e.g., 2023-24
    purpose: 'Domestic Use' | 'Export Quality' | 'PDS/Welfare' | 'Industrial';
    packaging: string; // e.g., 50kg Jute Bag
    price: number; // Price per Quintal
    image: string;
    stockStatus: 'Available' | 'Limited Stock' | 'Sold Out';
    description: string;
}

const generateProducts = (): Product[] => {
    const products: Product[] = [];
    let idCounter = 1001;

    const addProduct = (
        category: Category,
        commodity: string,
        varieties: string[],
        grades: string[],
        origins: string[],
        purposes: Product['purpose'][],
        basePrice: number
    ) => {
        varieties.forEach((variety) => {
            grades.forEach((grade) => {
                origins.forEach((origin) => {
                    // Generate 1-2 crop years per combination
                    ['2023-24', '2024-25'].forEach((year) => {
                        // Randomly select a purpose
                        const purpose = purposes[Math.floor(Math.random() * purposes.length)];

                        products.push({
                            id: `NCSCI-${idCounter++}`,
                            name: `${commodity} ${variety} (${grade})`,
                            category,
                            commodity,
                            variety,
                            grade,
                            origin,
                            cropYear: year,
                            purpose,
                            packaging: purpose === 'Export Quality' ? '50kg PP Bag' : '50kg Jute Bag',
                            price: basePrice + Math.floor(Math.random() * 1500) - 500,
                            image: getCommodityImage(commodity),
                            stockStatus: Math.random() > 0.1 ? 'Available' : 'Limited Stock',
                            description: `High-quality ${grade} ${variety} ${commodity} sourced from ${origin}. Harvested in ${year}, suitable for ${purpose}.`
                        });
                    });
                });
            });
        });
    };

    const getCommodityImage = (commodity: string) => {
        const images: Record<string, string> = {
            'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
            'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
            'Maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop',
            'Millet': 'https://images.unsplash.com/photo-1661163450989-121652750695?q=80&w=800&auto=format&fit=crop',
            'Chana': 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?q=80&w=800&auto=format&fit=crop', // Chickpeas
            'Tur': 'https://images.unsplash.com/photo-1599579112520-43e52f0f0386?q=80&w=800&auto=format&fit=crop', // Pigeon peas (generic pulse)
            'Moong': 'https://images.unsplash.com/photo-1622624282869-427796530669?q=80&w=800&auto=format&fit=crop', // Green gram
            'Urad': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=800&auto=format&fit=crop', // Black gram
            'Soybean': 'https://images.unsplash.com/photo-1620052087057-bfd8231f5847?q=80&w=800&auto=format&fit=crop',
            'Groundnut': 'https://images.unsplash.com/photo-1567497800726-80f68884d638?q=80&w=800&auto=format&fit=crop',
            'Mustard': 'https://images.unsplash.com/photo-1508445100780-2a6230327f2c?q=80&w=800&auto=format&fit=crop', // Mustard field/seeds
            'Red Chilli': 'https://images.unsplash.com/photo-1563769972327-088827732d82?q=80&w=800&auto=format&fit=crop',
            'Turmeric': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop',
            'Cumin': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
            'Onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=800&auto=format&fit=crop',
            'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop',
            'Cotton': 'https://images.unsplash.com/photo-1594315590298-3296052b32a1?q=80&w=800&auto=format&fit=crop',
            'Sugar': 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?q=80&w=800&auto=format&fit=crop',
        };
        return images[commodity] || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop';
    };

    // 1. Foodgrains & Cereals
    addProduct(
        'Foodgrains & Cereals',
        'Wheat',
        ['Sharbati', 'Lokwan', 'MP Durum', 'Mill Quality'],
        ['FAQ', 'Grade A', 'Premium'],
        ['Madhya Pradesh', 'Punjab', 'Haryana'],
        ['Domestic Use', 'PDS/Welfare', 'Industrial'],
        2800
    );
    addProduct(
        'Foodgrains & Cereals',
        'Rice',
        ['Basmati 1121', 'Basmati 1509', 'Sona Masoori', 'IR 64', 'Swarna'],
        ['Raw', 'Parboiled', 'Steam'],
        ['Haryana', 'Punjab', 'Andhra Pradesh', 'West Bengal'],
        ['Export Quality', 'Domestic Use', 'PDS/Welfare'],
        4500
    );
    addProduct(
        'Foodgrains & Cereals',
        'Maize',
        ['Yellow Maize', 'White Maize'],
        ['Feed Grade', 'Food Grade'],
        ['Bihar', 'Karnataka', 'Maharashtra'],
        ['Industrial', 'Domestic Use'],
        2300
    );
    addProduct(
        'Foodgrains & Cereals',
        'Millet',
        ['Bajra', 'Jowar', 'Ragi'],
        ['FAQ', 'SQ'],
        ['Rajasthan', 'Maharashtra', 'Karnataka'],
        ['Domestic Use', 'PDS/Welfare'],
        3200
    );

    // 2. Pulses
    addProduct(
        'Pulses',
        'Chana',
        ['Desi', 'Kabuli'],
        ['Bold', 'Medium'],
        ['Madhya Pradesh', 'Rajasthan', 'Maharashtra'],
        ['Domestic Use', 'PDS/Welfare'],
        5800
    );
    addProduct(
        'Pulses',
        'Tur',
        ['Lemon', 'Red'],
        ['Whole', 'Split'],
        ['Maharashtra', 'Karnataka', 'Burma Origin'],
        ['Domestic Use'],
        9500
    );
    addProduct(
        'Pulses',
        'Moong',
        ['Green', 'Yellow'],
        ['Polished', 'Unpolished'],
        ['Rajasthan', 'Madhya Pradesh'],
        ['Domestic Use'],
        8200
    );
    addProduct(
        'Pulses',
        'Urad',
        ['Black Matpe', 'Gota'],
        ['FAQ', 'SQ'],
        ['Andhra Pradesh', 'Madhya Pradesh'],
        ['Domestic Use'],
        7800
    );

    // 3. Oilseeds & Edible Oils
    addProduct(
        'Oilseeds & Edible Oils',
        'Soybean',
        ['Yellow'],
        ['FAQ', 'Plant Grade'],
        ['Madhya Pradesh', 'Maharashtra'],
        ['Industrial', 'Domestic Use'],
        4800
    );
    addProduct(
        'Oilseeds & Edible Oils',
        'Groundnut',
        ['Bold', 'Java'],
        ['HPS', 'FAQ'],
        ['Gujarat', 'Rajasthan'],
        ['Export Quality', 'Domestic Use'],
        7200
    );
    addProduct(
        'Oilseeds & Edible Oils',
        'Mustard',
        ['Black', 'Yellow'],
        ['Bold', 'Small'],
        ['Rajasthan', 'Haryana'],
        ['Domestic Use'],
        6100
    );

    // 4. Spices
    addProduct(
        'Spices',
        'Red Chilli',
        ['Teja S17', 'Byadgi', 'Guntur 334'],
        ['Stemless', 'With Stem'],
        ['Andhra Pradesh', 'Karnataka'],
        ['Export Quality', 'Domestic Use'],
        22000
    );
    addProduct(
        'Spices',
        'Turmeric',
        ['Nizamabad Finger', 'Salem Finger'],
        ['Polished', 'Unpolished'],
        ['Telangana', 'Tamil Nadu'],
        ['Export Quality', 'Domestic Use'],
        11000
    );
    addProduct(
        'Spices',
        'Cumin',
        ['Singapore Quality', 'Europe Quality'],
        ['99% Pure', '98% Pure'],
        ['Gujarat', 'Rajasthan'],
        ['Export Quality'],
        32000
    );

    // 5. Horticulture
    addProduct(
        'Horticulture',
        'Onion',
        ['Red', 'Pink'],
        ['A Grade', 'Golta'],
        ['Maharashtra', 'Madhya Pradesh'],
        ['Domestic Use', 'Export Quality'],
        1800
    );
    addProduct(
        'Horticulture',
        'Potato',
        ['Jyoti', 'Chandramukhi', 'LR'],
        ['A Grade', 'B Grade'],
        ['Uttar Pradesh', 'West Bengal'],
        ['Domestic Use', 'Industrial'],
        1200
    );

    // 6. Commercial & Industrial
    addProduct(
        'Commercial & Industrial',
        'Cotton',
        ['Shankar-6', 'MCU-5'],
        ['29mm', '28mm'],
        ['Gujarat', 'Maharashtra'],
        ['Industrial', 'Export Quality'],
        62000 // Per Candy (adjusted logic needed for display, but keeping number high)
    );
    addProduct(
        'Commercial & Industrial',
        'Sugar',
        ['S-30', 'M-30'],
        ['ICUMSA 45', 'ICUMSA 100'],
        ['Maharashtra', 'Uttar Pradesh'],
        ['Domestic Use', 'Industrial'],
        3800
    );

    return products;
};

export const products = generateProducts();
