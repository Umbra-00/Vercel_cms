import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const getPayloadClient = async () => {
    return await getPayload({ config: configPromise })
}

/**
 * DATA FETCHING UTILITIES
 * Direct Payload CMS queries without unstable_cache to avoid serialization issues.
 */

export const getFAQs = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'faqs',
        sort: 'order',
        where: { isActive: { equals: true } },
        limit: 100,
    })
    return docs
}

export const getNewsItems = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'news-items',
        sort: '-date',
        where: { isActive: { equals: true } },
    })
    return docs
}

export const getDownloads = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'downloads',
        sort: 'order',
        where: { isActive: { equals: true } },
    })
    return docs
}

export const getGalleryImages = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'gallery',
        sort: 'order',
        limit: 100,
    })
    return docs
}

export const getPartners = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'partners',
        sort: 'order',
        where: { isActive: { equals: true } },
    })
    return docs
}

export const getStrategies = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'strategies',
        sort: 'order',
        where: { isActive: { equals: true } },
    })
    return docs
}

export const getTeamMembers = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'team-members',
        sort: 'order',
        limit: 100,
    })
    return docs
}

export const getProducts = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'products',
        depth: 1, 
        limit: 100,
    })
    return docs
}

export const getCategories = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'categories',
        limit: 100,
    })
    return docs
}

export const getProductById = async (id: string) => {
    const payload = await getPayloadClient()
    try {
        const product = await payload.findByID({
            collection: 'products',
            id: id,
            depth: 1, // Include related category
        })
        return product
    } catch {
        // Product not found or invalid ID
        return null
    }
}

// ==========================================
// NEW FETCHERS FOR REMAINING PAGES
// ==========================================

export const getWarehouses = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'warehouses', limit: 100 })
    return docs
}

export const getMarketPrices = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'market-prices', sort: '-lastUpdated', limit: 100 })
    return docs
}

export const getTenders = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'tenders', sort: '-openingDate', limit: 100 })
    return docs
}

export const getMarketNews = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'market-news', sort: '-publishDate', limit: 100 })
    return docs
}

export const getHistoryEvents = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'history-events', sort: 'year', limit: 100 })
    return docs
}

export const getLegalDocuments = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'legal-documents', sort: '-effectiveDate', limit: 100 })
    return docs
}

export const getHeroSlides = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'hero-slides', sort: 'order', limit: 100 })
    return docs
}

export const getPage = async (slug: string) => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ 
        collection: 'pages',
        where: { slug: { equals: slug } },
        limit: 1
    })
    return docs[0] || null
}

// ==========================================
// DATA INTEGRITY FETCHERS (with relationships)
// ==========================================

export const getProcurementLogs = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ 
        collection: 'procurement-logs', 
        depth: 2, // Populate product, warehouse, and user
        sort: '-transactionDate', 
        limit: 100 
    })
    return docs
}

export const getFinancialReports = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ 
        collection: 'financial-reports', 
        depth: 1,
        sort: '-fiscalYear', 
        where: { isPublic: { equals: true } },
        limit: 50 
    })
    return docs
}

export const getWarehouseStock = async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ 
        collection: 'warehouse-stock', 
        depth: 2, // Populate product and warehouse
        limit: 200 
    })
    return docs
}

export const getOrders = async (userId?: string) => {
    const payload = await getPayloadClient()
    const query: any = { 
        collection: 'orders', 
        depth: 1,
        sort: '-orderDate', 
        limit: 50 
    }
    if (userId) {
        query.where = { user: { equals: userId } }
    }
    const { docs } = await payload.find(query)
    return docs
}

