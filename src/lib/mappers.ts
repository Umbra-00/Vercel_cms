import { CommodityPrice } from '@/data/market-data'

export function mapPayloadProductToFrontend(doc: any) {
  const imageUrl = doc.image && typeof doc.image === 'object' && doc.image.url
    ? doc.image.url
    : 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop' 

  const categoryName = doc.category && typeof doc.category === 'object' 
    ? doc.category.name 
    : 'General'

  let description = 'No description available.'
  if (doc.description && typeof doc.description === 'object' && doc.description.root) {
      try {
        description = doc.description.root.children
            .map((child: any) => {
                if (child.type === 'paragraph') {
                    return child.children.map((c: any) => c.text).join('')
                }
                return ''
            })
            .join(' ')
      } catch (e) {
          console.error('Error parsing rich text', e)
      }
  } else if (typeof doc.description === 'string') {
      description = doc.description
  }

  return {
    id: String(doc.id),
    name: doc.name,
    category: categoryName as any,
    commodity: doc.commodity,
    variety: doc.variety || '',
    grade: doc.grade || 'Standard',
    origin: doc.origin || 'India',
    cropYear: doc.cropYear || new Date().getFullYear().toString(),
    purpose: doc.purpose || 'Domestic Use',
    packaging: doc.packaging || 'Standard Packaging',
    price: doc.price || 0,
    unit: doc.unit || 'per Quintal',
    image: imageUrl,
    stockStatus: doc.stockStatus || 'Available',
    description: description,
  }
}

// Helper to extract text from RichText
function extractText(richText: any): string {
    if (!richText) return ''
    if (typeof richText === 'string') return richText
    if (richText.root && richText.root.children) {
        return richText.root.children.map((child: any) => {
            if (child.children) {
                return child.children.map((c: any) => c.text || '').join('')
            }
            return ''
        }).join(' ')
    }
    return ''
}

export function mapPayloadTenderToFrontend(doc: any) {
    const docUrl = doc.documents?.[0]?.file?.url || doc.documents?.[0]?.file?.data?.url || '#'
    
    return {
        id: String(doc.id),
        title: doc.title,
        referenceNo: doc.referenceNo,
        type: doc.type || 'Standard',
        openingDate: doc.openingDate,
        closingDate: doc.closingDate,
        status: doc.status,
        description: extractText(doc.description),
        eligibilityCriteria: extractText(doc.eligibilityCriteria),
        category: doc.category?.name || 'General',
        documentUrl: docUrl
    }
}

export function mapPayloadMarketPriceToFrontend(doc: any): CommodityPrice {
    // Generate sparkline data because CMS doesn't store history array in the same doc
    // We can simulate it based on trend
    const basePrice = doc.currentPrice
    const sparklineData = []
    for(let i=0; i<6; i++) {
        sparklineData.push(basePrice + (Math.random() - 0.5) * (basePrice * 0.05))
    }

    return {
        id: String(doc.id),
        name: doc.commodity,
        category: 'grains', // Default mapping if collection doesn't specific broad category or infer from name
        currentPrice: doc.currentPrice,
        previousPrice: doc.previousPrice || doc.currentPrice,
        change: doc.change || 0,
        changePercent: doc.changePercent || 0,
        volume: doc.volume || 0,
        unit: doc.unit || 'INR/Quintal',
        region: doc.region,
        lastUpdated: doc.lastUpdated || new Date().toISOString(),
        trend: doc.trend || 'stable',
        sparklineData: sparklineData
    }
}

export function mapPayloadMarketNewsToFrontend(doc: any) {
    const imageUrl = doc.featuredImage?.url || null
    
    // Calculate relative time or format date
    const date = new Date(doc.publishDate)
    const timestamp = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    return {
        id: String(doc.id),
        headline: doc.title,
        summary: doc.summaryShort || extractText(doc.content).substring(0, 150) + '...',
        timestamp: timestamp,
        category: doc.category?.name || 'Market',
        sentiment: doc.sentiment || 'neutral',
        image: imageUrl
    }
}

export function mapPayloadWarehouseToFrontend(doc: any) {
    const imageUrl = doc.image?.url || null
    return {
        id: String(doc.id),
        name: doc.name || 'Unknown Warehouse',
        code: doc.code || '',
        state: doc.state || 'Unknown',
        city: doc.city || '',
        capacity: Number(doc.capacity || 0),
        currentStock: Number(doc.currentStock || 0),
        utilization: Number(doc.utilizationPercent || 0),
        address: doc.address || '',
        contact: {
            person: doc.contactPerson || '',
            phone: doc.contactPhone || ''
        },
        image: imageUrl
    }
}

export function mapPayloadHistoryToFrontend(doc: any) {
    const imageUrl = doc.image?.url || null
    return {
        id: String(doc.id),
        year: String(doc.year || '0'),
        title: doc.title || 'Untitled Event',
        description: extractText(doc.description),
        image: imageUrl,
        isMilestone: !!doc.isMilestone
    }
}

export function mapPayloadLegalToFrontend(doc: any) {
    const attachmentUrl = doc.attachment?.url || '#'
    return {
        id: String(doc.id),
        title: doc.title || 'Untitled Document',
        type: doc.documentType || 'General',
        date: doc.effectiveDate || new Date().toISOString(),
        description: extractText(doc.description),
        url: attachmentUrl,
        sections: doc.sections?.map((s: any) => ({
            title: s.sectionTitle || '',
            content: extractText(s.sectionContent)
        })) || []
    }
}
