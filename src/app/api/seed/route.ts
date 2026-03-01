import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

// GET /api/seed - Seed the CMS with current frontend data
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const results: string[] = []

    console.log('Seeding CMS via API...')

    // Valid Minimal Buffers to pass Payload Validation
    // 1x1 Pixel PNG
    const minimalPngBuffer = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082', 'hex')
    
    // Minimal PDF
    const minimalPdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n', 'utf-8')

    // ============================================
    // SEED FAQs
    // ============================================
    const faqs = [
      {
        question: 'How can farmers register for MSP procurement?',
        answer: {
          root: {
            type: 'root',
            children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Farmers can register at their nearest procurement center or online through the NCSCI farmer portal using their Aadhaar card and land records.', version: 1 }], version: 1 }],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        faqCategory: 'Procurement',
      },
      {
        question: 'What commodities does NCSCI procure?',
        answer: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'We procure a wide range of commodities including Wheat, Paddy, Pulses, Oilseeds, and Cotton.', version: 1 }] }] } },
        faqCategory: 'Commodities',
      },
       {
        question: 'How is the payment made to farmers?',
        answer: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: "Payments are made directly to the farmer's bank account via DBT (Direct Benefit Transfer).", version: 1 }] }] } },
        faqCategory: 'Payment',
      }
    ]

    for (const faq of faqs) {
      const existing = await payload.find({ collection: 'faqs', where: { question: { equals: faq.question } } })
      if (existing.totalDocs === 0) {
        await payload.create({ collection: 'faqs', data: faq })
        results.push(`✓ FAQ: ${faq.question}`)
      } else {
        results.push(`⚠ FAQ exists: ${faq.question}`)
      }
    }

    // ============================================
    // SEED News Items
    // ============================================
    const newsItems = [
      { title: 'Global Tender for import of 50,000 MT of Wheat', date: '2024-11-28T00:00:00.000Z', type: 'TENDER', referenceNo: 'IMP/WHEAT/2024/01', isActive: true },
      { title: 'Tender for Supply of Jute Bags', date: '2024-11-26T00:00:00.000Z', type: 'TENDER', referenceNo: 'JUTE/BAG/2024/02', isActive: true },
      { title: 'Revised FAQ specifications for Wheat procurement For RMS 2024-25', date: '2024-11-25T00:00:00.000Z', type: 'CIRCULAR', referenceNo: 'QC/WHEAT/2024-25', isActive: true },
      { title: 'Circular on New Quality Parameters for Rice', date: '2024-11-22T00:00:00.000Z', type: 'CIRCULAR', referenceNo: 'QC/RICE/2024-15', isActive: true },
      { title: 'NCSCI achieves highest ever procurement of Mustard Seeds', date: '2024-11-20T00:00:00.000Z', type: 'PRESS_RELEASE', isActive: true },
      { title: 'Press Release: New Warehouse Inauguration in Bihar', date: '2024-11-18T00:00:00.000Z', type: 'PRESS_RELEASE', isActive: true },
      { title: 'Notice: Office closure for Diwali holidays', date: '2024-11-10T00:00:00.000Z', type: 'NOTICE', referenceNo: 'ADMIN/2024/101', isActive: true },
      { title: 'Notice: Revised working hours for procurement centers', date: '2024-11-08T00:00:00.000Z', type: 'NOTICE', referenceNo: 'ADMIN/2024/100', isActive: true },
      { title: 'Announcement: Launch of New Farmer Portal', date: '2024-11-05T00:00:00.000Z', type: 'ANNOUNCEMENT', isActive: true },
      { title: 'Announcement: Partnership with HDFC Bank for DBT', date: '2024-11-01T00:00:00.000Z', type: 'ANNOUNCEMENT', isActive: true },
    ]

    for (const news of newsItems) {
      const existing = await payload.find({ collection: 'news-items', where: { title: { equals: news.title } } })
      if (existing.totalDocs === 0) {
        await payload.create({ collection: 'news-items', data: news })
        results.push(`✓ News: ${news.title}`)
      } else {
        results.push(`⚠ News exists: ${news.title}`)
      }
    }

    // ============================================
    // SEED Downloads
    // ============================================
    const downloads = [
      { title: 'Farmer Registration Form (Form A)', downloadCategory: 'Forms' },
      { title: 'Procurement Guidelines 2024-25', downloadCategory: 'Guidelines' },
      { title: 'Quality Specifications for Wheat', downloadCategory: 'Policies' },
    ]

    for (const download of downloads) {
      const existing = await payload.find({ collection: 'downloads', where: { title: { equals: download.title } } })
      if (existing.totalDocs === 0) {
        const file = await payload.create({
            collection: 'media',
            data: { alt: `File for ${download.title}` },
            file: {
                data: minimalPdfBuffer,
                name: `${download.title.replace(/\s+/g, '_')}.pdf`,
                mimetype: 'application/pdf',
                size: minimalPdfBuffer.length
            }
        })
        await payload.create({ collection: 'downloads', data: { ...download, file: file.id } })
        results.push(`✓ Download: ${download.title}`)
      } else {
        results.push(`⚠ Download exists: ${download.title}`)
      }
    }

    // ============================================
    // SEED Gallery
    // ============================================
    const galleryImages = [
        { caption: 'Wheat procurement at Madhya Pradesh center', category: 'Procurement Centers' },
        { caption: 'Modern silo storage facility', category: 'Warehouses' },
    ]

    for (const img of galleryImages) {
       const existing = await payload.find({ collection: 'gallery', where: { caption: { equals: img.caption } } })
       if (existing.totalDocs === 0) {
        const file = await payload.create({
            collection: 'media',
            data: { alt: img.caption },
            file: {
                data: minimalPngBuffer,
                name: `image_${img.caption.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 15)}.png`,
                mimetype: 'image/png',
                size: minimalPngBuffer.length
            }
        })
        await payload.create({ collection: 'gallery', data: { caption: img.caption, galleryCategory: img.category, image: file.id } })
        results.push(`✓ Gallery: ${img.caption}`)
      } else {
         results.push(`⚠ Gallery exists: ${img.caption}`)
      }
    }

    // ============================================
    // SEED Partners
    // ============================================
    const partners = [
        { name: 'Adani Logistics', category: 'Logistics' },
        { name: 'HDFC Bank', category: 'Banking' },
        { name: 'ITC Limited', category: 'Trading' },
    ]
    for (const p of partners) {
       const existing = await payload.find({ collection: 'partners', where: { name: { equals: p.name } } })
       if (existing.totalDocs === 0) {
         const file = await payload.create({
            collection: 'media',
            data: { alt: `${p.name} Logo` },
            file: { data: minimalPngBuffer, name: `${p.name.replace(/[^a-zA-Z0-9]/g, '_')}_logo.png`, mimetype: 'image/png', size: minimalPngBuffer.length }
        })
        await payload.create({ collection: 'partners', data: { name: p.name, partnerCategory: p.category, logo: file.id } })
        results.push(`✓ Partner: ${p.name}`)
      } else {
        results.push(`⚠ Partner exists: ${p.name}`)
      }
    }

    // ============================================
    // SEED Strategies
    // ============================================
    const strategies = [
        { title: 'Price Support Operations (PSS)', icon: 'Scale', desc: 'Intervention to protect farmers from distress sales.' },
    ]
    for (const s of strategies) {
        const existing = await payload.find({ collection: 'strategies', where: { title: { equals: s.title } } })
        if (existing.totalDocs === 0) {
             await payload.create({
                collection: 'strategies',
                data: {
                    title: s.title,
                    icon: s.icon,
                    description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: s.desc }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } }
                }
            })
            results.push(`✓ Strategy: ${s.title}`)
        } else {
             results.push(`⚠ Strategy exists: ${s.title}`)
        }
    }

    // ============================================
    // SEED Team Members
    // ============================================
    const teamMembers = [
        { name: 'Dr. Rajesh Kumar, IAS', designation: 'Chairman & Managing Director', department: 'Administration' },
    ]
    for (const t of teamMembers) {
         const existing = await payload.find({ collection: 'team-members', where: { name: { equals: t.name } } })
        if(existing.totalDocs === 0) {
             const file = await payload.create({
                collection: 'media',
                data: { alt: `${t.name} Photo` },
                file: { data: minimalPngBuffer, name: `${t.name.replace(/[^a-zA-Z0-9]/g, '_')}_photo.png`, mimetype: 'image/png', size: minimalPngBuffer.length }
            })
            await payload.create({ collection: 'team-members', data: { name: t.name, designation: t.designation, department: t.department, photo: file.id } })
            results.push(`✓ Team Member: ${t.name}`)
        } else {
            results.push(`⚠ Team Member exists: ${t.name}`)
        }
    }

    // ============================================
    // SEED Categories (Preserved for Tenders/Structure)
    // ============================================
    const categories = [
        'Foodgrains & Cereals',
        'Pulses',
        'Oilseeds & Edible Oils',
        'Spices',
        'Horticulture',
        'Commercial & Industrial',
        'Essentials & Processed'
    ]
    
    const categoryMap: Record<string, string | number> = {}

    for (const catName of categories) {
        const slug = catName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
        const existing = await payload.find({ collection: 'categories', where: { name: { equals: catName } } })

        if (existing.totalDocs === 0) {
            const cat = await payload.create({
                collection: 'categories',
                data: { name: catName, slug: slug, description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: `All commodities under ${catName}` }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } } }
            })
            categoryMap[catName] = cat.id
            results.push(`✓ Category: ${catName}`)
        } else {
            if (existing.docs[0]) {
                categoryMap[catName] = existing.docs[0].id
                results.push(`⚠ Category exists: ${catName}`)
            }
        }
    }

    // ============================================
    // SEED Tenders
    // ============================================
    const tenders = [
        {
            title: 'Procurement of 50000 MT Milling Wheat',
            type: 'Global Tender',
            referenceNo: 'TND-2024-WHEAT-001',
            openingDate: '2024-12-01T09:00:00.000Z',
            closingDate: '2024-12-15T17:00:00.000Z',
            status: 'published',
            category: 'Foodgrains & Cereals'
        },
        {
            title: 'Transport Contractor for Punjab Region',
            type: 'Domestic Tender',
            referenceNo: 'TND-2024-LOG-PB-02',
            openingDate: '2024-11-20T09:00:00.000Z',
            closingDate: '2024-12-05T17:00:00.000Z',
            status: 'closed',
            category: 'Commercial & Industrial'
        }
    ]

    for (const t of tenders) {
        try {
            const existing = await payload.find({ collection: 'tenders', where: { referenceNo: { equals: t.referenceNo } } })
            if (existing.totalDocs === 0) {
                // Skipping document upload for now to bypass error
                /*
                const docFile = await payload.create({
                    collection: 'media',
                    data: { alt: `${t.referenceNo} Document` },
                    file: { data: minimalPdfBuffer, name: `${t.referenceNo}.pdf`, mimetype: 'application/pdf', size: minimalPdfBuffer.length }
                })
                */
                
                await payload.create({
                    collection: 'tenders',
                    data: {
                        title: t.title,
                        referenceNo: t.referenceNo,
                        openingDate: t.openingDate,
                        closingDate: t.closingDate,
                        status: t.status as any,
                        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: `Tender for ${t.title}` }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
                        eligibilityCriteria: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: 'Standard eligibility criteria apply.' }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
                        // documents: [{ file: docFile.id }], 
                        category: categoryMap[t.category] || undefined
                    }
                })
                results.push(`✓ Tender: ${t.referenceNo}`)
            } else {
                 results.push(`⚠ Tender exists: ${t.referenceNo}`)
            }
        } catch (e: any) {
            results.push(`❌ Error seeding Tender ${t.referenceNo}: ${e.message}`)
        }
    }

    // ============================================
    // SEED Market Prices
    // ============================================
    const marketPrices = [
        { commodity: 'Wheat', region: 'Madhya Pradesh', price: 2275, change: 15, trend: 'up' },
        { commodity: 'Paddy', region: 'Punjab', price: 2183, change: 0, trend: 'stable' },
        { commodity: 'Chana', region: 'Rajasthan', price: 5400, change: -25, trend: 'down' },
    ]

    for (const mp of marketPrices) {
        try {
            const existing = await payload.find({ collection: 'market-prices', where: { and: [{ commodity: { equals: mp.commodity } }, { region: { equals: mp.region } }] } })
            
            if (existing.totalDocs === 0) {
                await payload.create({
                    collection: 'market-prices',
                    data: {
                        commodity: mp.commodity,
                        region: mp.region,
                        currentPrice: mp.price,
                        change: mp.change,
                        changePercent: Number((mp.change / mp.price * 100).toFixed(2)),
                        trend: mp.trend as any,
                        previousPrice: mp.price - mp.change,
                        volume: 1500,
                        lastUpdated: new Date().toISOString()
                    }
                })
                results.push(`✓ Market Price: ${mp.commodity} (${mp.region})`)
            } else {
                results.push(`⚠ Market Price exists: ${mp.commodity} (${mp.region})`)
            }
        } catch (e: any) {
             results.push(`❌ Error seeding Market Price ${mp.commodity}: ${e.message}`)
        }
    }

    // ============================================
    // SEED Warehouses
    // ============================================
    const warehouses = [
        { name: 'Central Warehouse Bhopal', code: 'MP-BPL-01', state: 'Madhya Pradesh', city: 'Bhopal', capacity: 50000 },
        { name: 'Regional Warehouse Ludhiana', code: 'PB-LDH-01', state: 'Punjab', city: 'Ludhiana', capacity: 75000 },
    ]

    for (const w of warehouses) {
        try {
            const existing = await payload.find({ collection: 'warehouses', where: { code: { equals: w.code } } })
            if (existing.totalDocs === 0) {
                const imgFile = await payload.create({
                    collection: 'media',
                    data: { alt: w.name },
                    file: { data: minimalPngBuffer, name: `${w.code}.png`, mimetype: 'image/png', size: minimalPngBuffer.length }
                })
                await payload.create({
                    collection: 'warehouses',
                    data: {
                        name: w.name,
                        code: w.code,
                        state: w.state,
                        city: w.city,
                        capacity: w.capacity,
                        address: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: `${w.name}, ${w.city}, ${w.state}` }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
                        image: imgFile.id,
                        currentStock: Math.floor(w.capacity * 0.6),
                        utilizationPercent: 60,
                        contactPerson: 'Depot Manager',
                        contactPhone: '+91 9999999999'
                    }
                })
                 const lastID = (await payload.find({ collection: 'warehouses', where: { code: { equals: w.code } } })).docs[0].id
                 await payload.update({ collection: 'warehouses', id: lastID, data: { address: `${w.name}, ${w.city}, ${w.state}` }})
                 
                results.push(`✓ Warehouse: ${w.name}`)
            } else {
                 results.push(`⚠ Warehouse exists: ${w.name}`)
            }
        } catch (e: any) {
            results.push(`❌ Error seeding Warehouse ${w.name}: ${e.message}`)
        }
    }

    // ============================================
    // SEED Market News
    // ============================================
    const marketNews = [
        { title: 'Wheat Prices Stable Amid High Arrivals in MP', sentiment: 'neutral', summary: 'Market analysis shows stability in wheat prices.' },
        { title: 'Soybean Prices Surge on Global Cues', sentiment: 'bullish', summary: 'International demand pushes soybean prices up.' },
    ]
    
    for (const mn of marketNews) {
        try {
            const existing = await payload.find({ collection: 'market-news', where: { title: { equals: mn.title } } })
             if (existing.totalDocs === 0) {
                const imgFile = await payload.create({
                    collection: 'media',
                    data: { alt: mn.title },
                    file: { data: minimalPngBuffer, name: `news_${mn.title.substring(0,5)}.png`, mimetype: 'image/png', size: minimalPngBuffer.length }
                })
                await payload.create({
                    collection: 'market-news',
                    data: {
                        title: mn.title,
                        sentiment: mn.sentiment as any,
                        summaryShort: mn.summary,
                        content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: mn.summary }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
                        featuredImage: imgFile.id,
                        publishDate: new Date().toISOString(),
                        tags: 'Market, Analysis'
                    }
                })
                results.push(`✓ Market News: ${mn.title}`)
             } else {
                 results.push(`⚠ Market News exists: ${mn.title}`)
             }
        } catch (e: any) {
            results.push(`❌ Error seeding Market News ${mn.title}: ${e.message}`)
        }
    }

    // ============================================
    // SEED History Events
    // ============================================
    const historyEvents = [
        { year: '2015', title: 'Foundation', desc: 'NCSCI was established.' },
        { year: '2020', title: 'Digital Transformation', desc: 'Launched e-Procurement portal.' },
    ]
    for (const evt of historyEvents) {
        try {
            const existing = await payload.find({ collection: 'history-events', where: { title: { equals: evt.title } } })
            if (existing.totalDocs === 0) {
                const imgFile = await payload.create({
                    collection: 'media',
                    data: { alt: evt.title },
                    file: { data: minimalPngBuffer, name: `history_${evt.year}.png`, mimetype: 'image/png', size: minimalPngBuffer.length }
                })
                 await payload.create({
                    collection: 'history-events',
                    data: {
                        year: evt.year,
                        title: evt.title,
                        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: evt.desc }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
                        image: imgFile.id,
                        isMilestone: true,
                        order: Number(evt.year)
                    }
                })
                 results.push(`✓ History: ${evt.year}`)
            } else {
                 results.push(`⚠ History exists: ${evt.year}`)
            }
        } catch (e: any) {
            results.push(`❌ Error seeding History ${evt.year}: ${e.message}`)
        }
    }

     // ============================================
    // SEED Legal Documents
    // ============================================
    const legalDocs = [
        { title: 'Privacy Policy', type: 'Policy' },
        { title: 'Terms of Service', type: 'Regulation' },
    ]
    for (const ld of legalDocs) {
        try {
            const existing = await payload.find({ collection: 'legal-documents', where: { title: { equals: ld.title } } })
             if (existing.totalDocs === 0) {
                 await payload.create({
                    collection: 'legal-documents',
                    data: {
                        title: ld.title,
                        documentType: ld.type as any,
                        effectiveDate: new Date().toISOString(),
                        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: `Detailed ${ld.title}` }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
                        sections: [
                            { sectionTitle: 'Overview', sectionContent: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: 'This is the overview section.' }], version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } } }
                        ]
                    }
                })
                results.push(`✓ Legal Doc: ${ld.title}`)
             } else {
                 results.push(`⚠ Legal Doc exists: ${ld.title}`)
             }
        } catch (e: any) {
             results.push(`❌ Error seeding Legal Doc ${ld.title}: ${e.message}`)
        }
    }

    return NextResponse.json({ success: true, message: 'CMS seeded successfully!', results })
  } catch (error: any) {
    console.error('Seed Error:', error)
    return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 })
  }
}
