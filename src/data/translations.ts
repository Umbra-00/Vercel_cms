export const translations = {
    en: {
        // Navigation
        "nav.organization": "Organization",
        "nav.commodities": "Commodities",
        "nav.operations": "Operations",
        "nav.resources": "Resources",
        "nav.quick_links": "Quick Links",
        "nav.contact": "Contact",
        
        // Common
        "common.read_more": "Read More",
        "common.learn_more": "Learn More",
        "common.view_all": "View All",
        "common.search": "Search",
        
        // Hero
        "hero.title": "National Commodity Supply Corporation",
        "hero.subtitle": "Of India",
        "hero.tagline": "Securing India's Food Future",
        
        // Strategies Page
        "strategies.title": "Strategic Interventions",
        "strategies.subtitle": "NCSCI Strategic Initiatives",
        "strategies.desc": "Pioneering robust mechanisms to strengthen India's agricultural backbone through technology, infrastructure, and policy.",
        "strategies.ready": "Ready to Partner?",
        "strategies.contact_team": "Contact Our Team",

        // Commodities
        "commodity.wheat": "Wheat",
        "commodity.rice": "Rice",
        "commodity.pulses": "Pulses",
        "commodity.sugar": "Sugar",

        // Sub-navigation
        "nav.about": "About Us",
        "nav.strategies": "Strategies",
        "nav.partners": "Partners",
        "nav.sustainability": "Sustainability",
        "nav.legal": "Legal",
        "nav.trade": "Trade",
        "nav.warehouse": "Warehouse",
        "nav.quality": "Quality Control",
        "nav.market_intel": "Market Intel",
        "nav.analysis": "Analysis",
        "nav.news": "News & Updates",
        "nav.gallery": "Gallery",
        "nav.logs": "Logs",
        "nav.accounts": "Accounts",
        "nav.citizen_charter": "Citizen Charter",
        "nav.eprocurement": "e-Procurement",
        "nav.faqs": "FAQs & Support",
        "nav.downloads": "Downloads",
    },
    hi: {
        // Navigation
        "nav.organization": "संगठन",
        "nav.commodities": "वस्तुएं",
        "nav.operations": "संचालन",
        "nav.resources": "संसाधन",
        "nav.quick_links": "त्वरित लिंक",
        "nav.contact": "संपर्क करें",
        
        // Common
        "common.read_more": "और पढ़ें",
        "common.learn_more": "और जानें",
        "common.view_all": "सभी देखें",
        "common.search": "खोजें",
        
        // Hero
        "hero.title": "राष्ट्रीय वस्तु आपूर्ति निगम",
        "hero.subtitle": "भारत का",
        "hero.tagline": "भारत के खाद्य भविष्य को सुरक्षित करना",
        
        // Strategies Page
        "strategies.title": "रणनीतिक हस्तक्षेप",
        "strategies.subtitle": "NCSCI रणनीतिक पहल",
        "strategies.desc": "प्रौद्योगिकी, बुनियादी ढांचे और नीति के माध्यम से भारत की कृषि रीढ़ को मजबूत करने के लिए मजबूत तंत्र की शुरुआत।",
        "strategies.ready": "भागीदारी के लिए तैयार हैं?",
        "strategies.contact_team": "हमारी टीम से संपर्क करें",

        // Commodities
        "commodity.wheat": "गेहूं",
        "commodity.rice": "चावल",
        "commodity.pulses": "दालें",
        "commodity.sugar": "चीनी",

        // Sub-navigation
        "nav.about": "हमारे बारे में",
        "nav.strategies": "रणनीतियाँ",
        "nav.partners": "साझेदार",
        "nav.sustainability": "स्थिरता",
        "nav.legal": "कानूनी",
        "nav.trade": "व्यापार",
        "nav.warehouse": "गोदाम",
        "nav.quality": "गुणवत्ता नियंत्रण",
        "nav.market_intel": "बाजार खुफिया",
        "nav.analysis": "विश्लेषण",
        "nav.news": "समाचार और अपडेट",
        "nav.gallery": "गेलरी",
        "nav.logs": "लॉग्स",
        "nav.accounts": "खाते",
        "nav.citizen_charter": "नागरिक चार्टर",
        "nav.eprocurement": "ई-खरीद",
        "nav.faqs": "सामान्य प्रश्न और सहायता",
        "nav.downloads": "डाउनलोड",
    }
};

export type Language = 'en' | 'hi';
export type TranslationKey = keyof typeof translations.en;
