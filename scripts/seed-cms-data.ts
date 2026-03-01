import configPromise from '@payload-config'
import { getPayload } from 'payload'
const seed = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding CMS...')

  // Shared dummy buffer
  const dummyBuffer = Buffer.from('Dummy Content', 'utf-8')

  try {
    // 1. FAQs
    const faqs = [
      {
        question: 'How can farmers register for MSP procurement?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Farmers can register at their nearest procurement center or online through the NCSCI farmer portal using their Aadhaar card and land records.',
                    version: 1,
                  },
                ],
                version: 1,
              },
            ],
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
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'We procure a wide range of commodities including Wheat, Paddy, Pulses, Oilseeds, and Cotton under various government schemes.',
                    version: 1,
                  },
                ],
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        faqCategory: 'Commodities',
      },
      {
        question: 'How is the payment made to farmers?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Payments are made directly to the farmers\' bank accounts via DBT (Direct Benefit Transfer) within the stipulated time frame.',
                    version: 1,
                  },
                ],
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        faqCategory: 'Payments',
      },
      {
        question: 'Where can I find tender information?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Tender notices are published on our website under the "Tenders" section and in leading newspapers.',
                    version: 1,
                  },
                ],
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        faqCategory: 'Tenders',
      },
    ]

    for (const faq of faqs) {
      const existing = await payload.find({
        collection: 'faqs',
        where: { question: { equals: faq.question } },
      })
      if (existing.totalDocs === 0) {
        await payload.create({ collection: 'faqs', data: faq })
        console.log(`✓ FAQ: ${faq.question.substring(0, 30)}...`)
      } else {
         console.log(`⚠ FAQ exists: ${faq.question.substring(0, 30)}...`)
      }
    }

    // 2. News Items
    const newsItems = [
      {
        title: '[DEMO] Global Tender for import of 50,000 MT of Wheat',
        date: '2024-11-28T00:00:00.000Z',
        type: 'TENDER',
        referenceNo: 'IMP/WHEAT/2024/01',
      },
      {
        title: '[DEMO] Revised FAQ specifications for Wheat procurement For RMS 2024-25',
        date: '2024-11-25T00:00:00.000Z',
        type: 'CIRCULAR',
        referenceNo: 'QC/WHEAT/2024-25',
      },
      {
        title: '[DEMO] NCSCI achieves highest ever procurement of Mustard Seeds',
        date: '2024-11-20T00:00:00.000Z',
        type: 'PRESS_RELEASE',
      },
      {
        title: 'RFP for appointment of Transport Contractors',
        date: '2024-11-15T00:00:00.000Z',
        type: 'TENDER',
        referenceNo: 'LOG/RFP/2024/05',
      },
      {
        title: 'Empanelment of Assayers for Quality Testing',
        date: '2024-11-10T00:00:00.000Z',
        type: 'NOTICE',
        referenceNo: 'QC/EMP/2024',
      },
      {
        title: 'Extension of date for E-KYC of farmers on portal',
        date: '2024-11-05T00:00:00.000Z',
        type: 'ANNOUNCEMENT',
      },
    ]

    for (const news of newsItems) {
      const existing = await payload.find({
        collection: 'news-items',
        where: { title: { equals: news.title } },
      })
      if (existing.totalDocs === 0) {
        await payload.create({ collection: 'news-items', data: news })
        console.log(`✓ News: ${news.title.substring(0, 30)}...`)
      } else {
        console.log(`⚠ News exists: ${news.title.substring(0, 30)}...`)
      }
    }

    // 3. Downloads
    const downloads = [
      { title: 'Farmer Registration Form (Form A)', downloadCategory: 'Forms' },
      { title: 'Procurement Guidelines 2024-25', downloadCategory: 'Guidelines' },
      { title: 'Warehouse Accreditation Application', downloadCategory: 'Forms' },
      { title: 'Annual Report 2023-24', downloadCategory: 'Reports' },
      { title: 'Quality Specifications for Wheat', downloadCategory: 'Policies' },
      { title: 'Quality Specifications for Paddy', downloadCategory: 'Policies' },
    ]

    for (const download of downloads) {
      const existing = await payload.find({
        collection: 'downloads',
        where: { title: { equals: download.title } },
      })
      
      if (existing.totalDocs === 0) {
        const file = await payload.create({
            collection: 'media',
            data: { alt: `File for ${download.title}` },
            file: {
                data: dummyBuffer,
                name: `${download.title.replace(/\s+/g, '_')}.txt`,
                mimetype: 'text/plain',
                size: dummyBuffer.length
            }
        })

        await payload.create({
          collection: 'downloads',
          data: {
            ...download,
            file: file.id,
          },
        })
        console.log(`✓ Download: ${download.title}`)
      } else {
        console.log(`⚠ Download exists: ${download.title}`)
      }
    }

    // 4. Gallery
    const galleryImages = [
        { caption: 'Wheat procurement at Madhya Pradesh center', category: 'Procurement Centers' },
        { caption: 'Modern silo storage facility', category: 'Warehouses' },
        { caption: 'Direct farmer registration drive', category: 'Farmer Interactions' },
        { caption: 'Rice procurement - Kharif season', category: 'Procurement Centers' },
        { caption: 'Grain quality testing facility', category: 'Quality Labs' },
        { caption: 'Annual stakeholder conference 2024', category: 'Events' },
        { caption: 'Covered godown complex - Uttar Pradesh', category: 'Warehouses' },
        { caption: 'MSP awareness program', category: 'Farmer Interactions' },
        { caption: 'Mustard procurement - Rajasthan', category: 'Procurement Centers' },
        { caption: 'Wheat procurement at MP center 2', category: 'Procurement Centers' },
    ]

    for (const img of galleryImages) {
       const existing = await payload.find({
        collection: 'gallery',
        where: { caption: { equals: img.caption } },
      })

      if (existing.totalDocs === 0) {
        const file = await payload.create({
            collection: 'media',
            data: { alt: img.caption },
            file: {
                data: dummyBuffer,
                name: `image_${img.caption.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 15)}.jpg`,
                mimetype: 'image/jpeg',
                size: dummyBuffer.length
            }
        })

        await payload.create({
            collection: 'gallery',
            data: {
                caption: img.caption,
                galleryCategory: img.category,
                image: file.id
            }
        })
         console.log(`✓ Gallery: ${img.caption}`)
      } else {
         console.log(`⚠ Gallery exists: ${img.caption}`)
      }
    }

    // 5. Partners
    const partners = [
        // Logistics
        { name: 'Adani Logistics', category: 'Logistics' },
        { name: 'DP World', category: 'Logistics' },
        { name: 'Container Corp', category: 'Logistics' },
        { name: 'Maersk', category: 'Logistics' },
        { name: 'Blue Dart', category: 'Logistics' },
        { name: 'Safexpress', category: 'Logistics' },
        { name: 'Gati', category: 'Logistics' },
        { name: 'VRL Logistics', category: 'Logistics' },
        { name: 'TCI', category: 'Logistics' },
        { name: 'Mahindra Logistics', category: 'Logistics' },
        // Banking
        { name: 'HDFC Bank', category: 'Banking' },
        { name: 'ICICI Bank', category: 'Banking' },
        { name: 'SBI', category: 'Banking' },
        { name: 'Axis Bank', category: 'Banking' },
        { name: 'Kotak Mahindra', category: 'Banking' },
        { name: 'Yes Bank', category: 'Banking' },
        { name: 'IndusInd Bank', category: 'Banking' },
        { name: 'Bank of Baroda', category: 'Banking' },
        { name: 'Punjab National Bank', category: 'Banking' },
        { name: 'Union Bank', category: 'Banking' },
        // Trading
        { name: 'ITC Limited', category: 'Trading' },
        { name: 'Cargill', category: 'Trading' },
        { name: 'Olam', category: 'Trading' },
        { name: 'Louis Dreyfus', category: 'Trading' },
        { name: 'Bunge', category: 'Trading' },
        { name: 'ADM', category: 'Trading' },
        { name: 'Wilmar', category: 'Trading' },
        { name: 'Glencore', category: 'Trading' },
        { name: 'Trafigura', category: 'Trading' },
        { name: 'Viterra', category: 'Trading' },
    ]

    for (const p of partners) {
       const existing = await payload.find({
        collection: 'partners',
        where: { name: { equals: p.name } },
      })
      if (existing.totalDocs === 0) {
         const file = await payload.create({
            collection: 'media',
            data: { alt: `${p.name} Logo` },
            file: {
                data: dummyBuffer,
                name: `${p.name.replace(/[^a-zA-Z0-9]/g, '_')}_logo.png`,
                mimetype: 'image/png',
                size: dummyBuffer.length
            }
        })

        await payload.create({
            collection: 'partners',
            data: {
                name: p.name,
                partnerCategory: p.category,
                logo: file.id
            }
        })
        console.log(`✓ Partner: ${p.name}`)
      } else {
        console.log(`⚠ Partner exists: ${p.name}`)
      }
    }

    // 6. Strategies
    const strategies = [
        {
            title: 'Price Support Operations (PSS)',
            icon: 'Scale',
            desc: 'Intervention to protect farmers from distress sales during bumper harvests by procuring at MSP.'
        },
        {
            title: 'Logistics & Warehousing',
            icon: 'Truck',
            desc: 'Seamless movement and scientific storage of commodities ensuring minimal loss and quality preservation.'
        },
        {
            title: 'International Trade',
            icon: 'Globe',
            desc: 'Export of surplus commodities and import of essential items to maintain domestic price stability.'
        },
        {
            title: 'Organic Farming Promotion',
            icon: 'Leaf',
            desc: 'Supporting sustainable agriculture by certifying and marketing organic produce.'
        }
    ]

    for (const s of strategies) {
        const existing = await payload.find({
            collection: 'strategies',
            where: { title: { equals: s.title } },
        })

        if (existing.totalDocs === 0) {
             await payload.create({
                collection: 'strategies',
                data: {
                    title: s.title,
                    icon: s.icon,
                    description: {
                        root: {
                            type: 'root',
                            children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: s.desc }], version: 1 }],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            version: 1
                        }
                    }
                }
            })
            console.log(`✓ Strategy: ${s.title}`)
        } else {
             console.log(`⚠ Strategy exists: ${s.title}`)
        }
    }

    // 7. Team Members
    const teamMembers = [
        {
            name: 'Dr. Rajesh Kumar, IAS',
            designation: 'Chairman & Managing Director',
            department: 'Administration',
        },
         {
            name: 'Smt. Priya Sharma',
            designation: 'Director (Finance)',
            department: 'Finance',
        },
         {
            name: 'Shri. Amit Verma',
            designation: 'Director (Operations)',
            department: 'Operations',
        }
    ]

    for (const t of teamMembers) {
         const existing = await payload.find({
            collection: 'team-members',
            where: { name: { equals: t.name } },
        })

        if(existing.totalDocs === 0) {
             const file = await payload.create({
                collection: 'media',
                data: { alt: `${t.name} Photo` },
                file: {
                    data: dummyBuffer,
                    name: `${t.name.replace(/[^a-zA-Z0-9]/g, '_')}_photo.jpg`,
                    mimetype: 'image/jpeg',
                    size: dummyBuffer.length
                }
            })

            await payload.create({
                collection: 'team-members',
                data: {
                    name: t.name,
                    designation: t.designation,
                    department: t.department,
                    photo: file.id
                }
            })
            console.log(`✓ Team Member: ${t.name}`)
        } else {
            console.log(`⚠ Team Member exists: ${t.name}`)
        }
    }

    // 8. Categories
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
        const existing = await payload.find({
            collection: 'categories',
            where: { name: { equals: catName } },
        })

        if (existing.totalDocs === 0) {
            const cat = await payload.create({
                collection: 'categories',
                data: {
                    name: catName,
                    slug: slug,
                    description: `All commodities under ${catName}`,
                }
            })
            categoryMap[catName] = cat.id
            console.log(`✓ Category: ${catName}`)
        } else {
            // Check if existing.docs[0] is defined
            if (existing.docs[0]) {
                categoryMap[catName] = existing.docs[0].id
                console.log(`⚠ Category exists: ${catName}`)
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productsToSeed: any[] = []

    const addProduct = (
        category: string,
        commodity: string,
        varieties: string[],
        grades: string[],
        origins: string[],
        purposes: string[],
        basePrice: number
    ) => {
        varieties.forEach((variety) => {
            grades.forEach((grade) => {
                origins.forEach((origin) => {
                    ['2023-24', '2024-25'].forEach((year) => {
                        const purpose = purposes[Math.floor(Math.random() * purposes.length)];
                        const name = `[SAMPLE] ${commodity} ${variety} (${grade})`
                        const packaging = purpose === 'Export Quality' ? '50kg PP Bag' : '50kg Jute Bag'
                        const price = basePrice + Math.floor(Math.random() * 1500) - 500
                        const stockStatus = Math.random() > 0.1 ? 'Available' : 'Limited Stock'
                        
                        // Image map
                        const images: Record<string, string> = {
                             'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
                            'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
                        }
                        const imageUrl = images[commodity] || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop'
                        
                        productsToSeed.push({
                            name,
                            category: categoryMap[category],
                            commodity,
                            variety,
                            grade,
                            origin,
                            cropYear: year,
                            purpose,
                            packaging,
                            price,
                            stockStatus,
                            imageUrl,
                            description: `High-quality ${grade} ${variety} ${commodity} sourced from ${origin}. Harvested in ${year}.`
                        })
                    })
                })
            })
        })
    }

    // Seed Sample Products
    if (Object.keys(categoryMap).length > 0) {
        addProduct('Foodgrains & Cereals', 'Wheat', ['Sharbati'], ['FAQ'], ['Madhya Pradesh'], ['Domestic Use'], 2800)
        addProduct('Foodgrains & Cereals', 'Rice', ['Basmati 1121'], ['Raw'], ['Punjab'], ['Export Quality'], 4500)
        addProduct('Pulses', 'Chana', ['Desi'], ['Bold'], ['Rajasthan'], ['Domestic Use'], 5800)
        addProduct('Oilseeds & Edible Oils', 'Soybean', ['Yellow'], ['FAQ'], ['Maharashtra'], ['Industrial'], 4800)
    }

    for (const p of productsToSeed) {
        const existing = await payload.find({
            collection: 'products',
            where: { name: { equals: p.name } },
        })

        if (existing.totalDocs === 0) {
             const file = await payload.create({
                collection: 'media',
                data: { alt: p.name },
                file: {
                    data: dummyBuffer,
                    name: `${p.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 15)}.jpg`,
                    mimetype: 'image/jpeg',
                    size: dummyBuffer.length
                }
            })

            await payload.create({
                collection: 'products',
                data: {
                    name: p.name,
                    category: p.category, // ID
                    commodity: p.commodity,
                    variety: p.variety,
                    grade: p.grade,
                    origin: p.origin,
                    cropYear: p.cropYear,
                    purpose: p.purpose,
                    packaging: p.packaging,
                    price: p.price,
                    stockStatus: p.stockStatus,
                    image: file.id,
                    description: {
                        root: {
                            type: 'root',
                            children: [{ type: 'paragraph', children: [{ type: 'text', version: 1, text: p.description }], version: 1 }],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            version: 1
                        }
                    }
                }
            })
            console.log(`✓ Product: ${p.name}`)
        } else {
            console.log(`⚠ Product exists: ${p.name}`)
        }
    }

    console.log('Done!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seed()
