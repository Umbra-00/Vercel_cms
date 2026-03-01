import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { createAuditLogHook, deleteAuditLogHook } from './src/hooks/auditLog'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  secret: process.env.PAYLOAD_SECRET || '',
  
  // Allow cross-origin requests from the static frontend (Hostinger)
  cors: '*',
  
  admin: {
    user: 'users',
  },
  
  editor: lexicalEditor({}),
  
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    idType: 'uuid',
    schemaName: 'payload',
  }),
  
  collections: [
    // ============================================
    // AUTHENTICATION & USERS
    // ============================================
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Viewer', value: 'viewer' },
          ],
          defaultValue: 'viewer',
          required: true,
        },
        { name: 'name', type: 'text' },
        { name: 'organization', type: 'text' },
        { name: 'phone', type: 'text' },
      ],
    },
    
    // ============================================
    // MEDIA & UPLOADS
    // ============================================
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(dirname, './media'),
        mimeTypes: ['image/*', 'application/pdf', 'video/*'],
      },
      fields: [
        { name: 'alt', type: 'text' },
        { name: 'caption', type: 'text' },
      ],
    },
    
    // ============================================
    // CATEGORIES (for Product Organization)
    // ============================================
    {
      slug: 'categories',
      admin: { 
        useAsTitle: 'name',
        group: 'Commerce',
        description: 'Product categories → Used in /commodities page for filtering'
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'specifications',
          type: 'array',
          fields: [
            { name: 'specName', type: 'text', required: true },
            { name: 'specUnit', type: 'text' },
          ],
        },
        { name: 'order', type: 'number', defaultValue: 0 },
      ],
    },
    
    // ============================================
    // PRODUCTS (Commodities Catalog)
    // ============================================
    {
      slug: 'products',
      admin: { 
        useAsTitle: 'name',
        group: 'Commerce',
        description: 'Commodity products → Displayed on /commodities page. Fields are organized into 3 sections for easier management.'
      },
      hooks: {
        afterChange: [createAuditLogHook('products')],
        afterDelete: [deleteAuditLogHook('products')],
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiContentPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
AUTO-GENERATE PRODUCT DESCRIPTIONS: Creates professional, SEO-friendly descriptions from commodity name, grade, and origin. Ensures consistent quality across 100+ products. Saves 15+ minutes per product.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        // ========== TABLE 1: BASIC INFORMATION ==========
        {
          type: 'collapsible',
          label: '📦 Basic Information',
          admin: {
            initCollapsed: false,
            description: 'Essential product identification details'
          },
          fields: [
            { 
              name: 'name', 
              type: 'text', 
              required: true,
              admin: { 
                description: 'Full product name (e.g., "Wheat Sharbati (FAQ)")',
                placeholder: 'Enter product name'
              }
            },
            {
              type: 'row',
              fields: [
                { 
                  name: 'commodity', 
                  type: 'text', 
                  required: true,
                  admin: { 
                    width: '50%',
                    description: 'Base commodity type (e.g., Wheat, Rice, Chana)',
                    placeholder: 'e.g., Wheat'
                  }
                },
                { 
                  name: 'category', 
                  type: 'relationship', 
                  relationTo: 'categories', 
                  required: true,
                  admin: { 
                    width: '50%',
                    description: 'Select product category'
                  }
                },
              ],
            },
            { 
              name: 'image', 
              type: 'upload', 
              relationTo: 'media',
              admin: {
                description: 'Product image (recommended: 800x600px)'
              }
            },
          ],
        },
        
        // ========== TABLE 2: PRODUCT SPECIFICATIONS ==========
        {
          type: 'collapsible',
          label: '📋 Product Specifications',
          admin: {
            initCollapsed: false,
            description: 'Detailed product specifications and quality parameters'
          },
          fields: [
            {
              type: 'row',
              fields: [
                { 
                  name: 'variety', 
                  type: 'text',
                  admin: { 
                    width: '50%',
                    description: 'Product variety (e.g., Sharbati, Basmati 1121)',
                    placeholder: 'e.g., Sharbati'
                  }
                },
                { 
                  name: 'grade', 
                  type: 'select', 
                  options: [
                    { label: 'FAQ (Fair Average Quality)', value: 'FAQ' },
                    { label: 'Grade A', value: 'Grade A' },
                    { label: 'Premium', value: 'Premium' },
                    { label: 'SQ (Standard Quality)', value: 'SQ' },
                    { label: 'Standard', value: 'Standard' },
                  ],
                  admin: { 
                    width: '50%',
                    description: 'Quality grade classification'
                  }
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { 
                  name: 'origin', 
                  type: 'text',
                  admin: { 
                    width: '50%',
                    description: 'State/Region of origin',
                    placeholder: 'e.g., Madhya Pradesh'
                  }
                },
                { 
                  name: 'cropYear', 
                  type: 'text',
                  admin: { 
                    width: '50%',
                    description: 'Harvest year',
                    placeholder: 'e.g., 2024-25'
                  }
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'purpose',
                  type: 'select',
                  options: [
                    { label: 'Domestic Use', value: 'Domestic Use' },
                    { label: 'Export Quality', value: 'Export Quality' },
                    { label: 'PDS/Welfare', value: 'PDS/Welfare' },
                    { label: 'Industrial', value: 'Industrial' },
                  ],
                  admin: { 
                    width: '50%',
                    description: 'Primary use case'
                  }
                },
                { 
                  name: 'packaging', 
                  type: 'text',
                  admin: { 
                    width: '50%',
                    description: 'Packaging type',
                    placeholder: 'e.g., 50kg Jute Bag'
                  }
                },
              ],
            },
            {
              name: 'specifications',
              type: 'array',
              admin: {
                description: 'Additional custom specifications (optional)'
              },
              fields: [
                { name: 'label', type: 'text', admin: { width: '40%' } },
                { name: 'value', type: 'text', admin: { width: '60%' } },
              ],
            },
          ],
        },
        
        // ========== TABLE 3: PRICING & AVAILABILITY ==========
        {
          type: 'collapsible',
          label: '💰 Pricing & Availability',
          admin: {
            initCollapsed: false,
            description: 'Pricing, stock status, and product description'
          },
          fields: [
            {
              type: 'row',
              fields: [
                { 
                  name: 'price', 
                  type: 'number', 
                  required: true,
                  admin: { 
                    width: '33%',
                    description: 'Price in INR',
                    placeholder: 'e.g., 2800'
                  }
                },
                { 
                  name: 'unit', 
                  type: 'text', 
                  defaultValue: 'per Quintal',
                  admin: { 
                    width: '33%',
                    description: 'Price unit'
                  }
                },
                {
                  name: 'stockStatus',
                  type: 'select',
                  options: [
                    { label: '✅ Available', value: 'Available' },
                    { label: '⚠️ Limited Stock', value: 'Limited Stock' },
                    { label: '❌ Sold Out', value: 'Sold Out' },
                  ],
                  defaultValue: 'Available',
                  admin: { 
                    width: '33%',
                    description: 'Current availability'
                  }
                },
              ],
            },
            { 
              name: 'description', 
              type: 'richText',
              admin: {
                description: 'Detailed product description for the product page'
              }
            },
          ],
        },
      ],
    },
    
    // ============================================
    // WAREHOUSES
    // ============================================
    {
      slug: 'warehouses',
      admin: { 
        useAsTitle: 'name',
        group: 'Operations',
        description: 'Warehouse network → Displayed on /warehouse page'
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiLocationPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
SMART STORAGE OPTIMIZATION: Suggests optimal stacking patterns based on commodity shelf-life and compatibility. Increases effective storage capacity by 20%. Reduces spoilage by First-In-First-Out auto-alerts.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'name', type: 'text', required: true },
        { name: 'code', type: 'text', unique: true },
        { name: 'state', type: 'text', required: true },
        { name: 'city', type: 'text' },
        { name: 'address', type: 'textarea' },
        { name: 'capacity', type: 'number' },
        { name: 'currentStock', type: 'number' },
        { name: 'utilizationPercent', type: 'number' },
        { name: 'latitude', type: 'number' },
        { name: 'longitude', type: 'number' },
        { name: 'contactPerson', type: 'text' },
        { name: 'contactPhone', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    
    // ============================================
    // MARKET PRICES
    // ============================================
    {
      slug: 'market-prices',
      admin: { 
        useAsTitle: 'commodity',
        group: 'Operations',
        description: 'Commodity prices → Displayed on /market-intelligence page'
      },
      hooks: {
        afterChange: [createAuditLogHook('market-prices')],
        afterDelete: [deleteAuditLogHook('market-prices')],
      },
      fields: [
        // AI FEATURE PREVIEW
        {
          type: 'collapsible',
          label: '✨ View AI Price Intelligence Story (Premium)',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'aiFeaturePreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 12,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `📖 THE STORY
------------------------------------------------
Every morning at 7 AM, your team opens AgMarkNet, state mandi portals, and commodity exchange websites. For the next 4 hours, they manually copy prices for 50+ commodities across 12 states. By the time they finish, some prices have already changed.

✨ WITH AI PRICE INTELLIGENCE
------------------------------------------------
Your team arrives at 9 AM to find all prices already updated. The AI fetched data from 15 sources at 6 AM, calculated trends, and flagged unusual price movements.

⏰ Saves 4+ hours daily  |  📊 Auto-updates from 15+ sources  |  🔔 Anomaly alerts

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'product', type: 'relationship', relationTo: 'products' },
        { name: 'commodity', type: 'text', required: true },
        { name: 'region', type: 'text', required: true },
        { name: 'currentPrice', type: 'number', required: true },
        { name: 'previousPrice', type: 'number' },
        { name: 'change', type: 'number' },
        { name: 'changePercent', type: 'number' },
        { name: 'volume', type: 'number' },
        { name: 'unit', type: 'text', defaultValue: 'INR/Quintal' },
        {
          name: 'trend',
          type: 'select',
          options: ['up', 'down', 'stable'],
        },
        { name: 'lastUpdated', type: 'date' },
      ],
    },

    
    // ============================================
    // TENDERS
    // ============================================
    {
      slug: 'tenders',
      admin: { 
        useAsTitle: 'title',
        group: 'Commerce',
        description: 'Active tenders → Displayed on /trade page'
      },
      hooks: {
        afterChange: [createAuditLogHook('tenders')],
        afterDelete: [deleteAuditLogHook('tenders')],
      },
      fields: [
        // AI FEATURE PREVIEW
        {
          type: 'collapsible',
          label: '✨ View AI Tender Analyzer Story (Premium)',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiTenderPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 12,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `📖 THE STORY
------------------------------------------------
A new tender document arrives—87 pages of legal text, specifications, timelines, and eligibility criteria. Vikram from the Tender team spends 3 hours reading it, highlighting key dates, extracting commodity quantities, and manually entering everything into the CMS. Last month, he missed a critical eligibility clause buried on page 54.

✨ WITH AI TENDER ANALYZER
------------------------------------------------
Vikram uploads the PDF. Within 30 seconds, the AI presents a summary: Opening Date, Closing Date, Commodities Required, EMD Amount, Eligibility Criteria, and Key Clauses flagged for legal review. All CMS fields are pre-filled.

⏰ Saves 1+ hour per tender  |  📄 PDF analysis  |  ⚠️ Flags legal clauses

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'referenceNo', type: 'text', required: true, unique: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'richText' },
        { name: 'openingDate', type: 'date' },
        { name: 'closingDate', type: 'date' },
        {
          name: 'status',
          type: 'select',
          options: ['draft', 'published', 'closed', 'awarded'],
          defaultValue: 'draft',
        },
        {
          name: 'documents',
          type: 'array',
          fields: [{ name: 'file', type: 'upload', relationTo: 'media' }],
        },
        { name: 'eligibilityCriteria', type: 'richText' },
        { name: 'category', type: 'relationship', relationTo: 'categories' },
      ],
    },
    
    // ============================================
    // MARKET NEWS
    // ============================================
    {
      slug: 'market-news',
      admin: { 
        useAsTitle: 'title',
        group: 'Content',
        description: 'Market analysis news → Displayed on /market-intelligence page'
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiMarketInsightsPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
AUTO-GENERATE MARKET ANALYSIS: Creates professional weekly market insights based on current prices and trends. Positions NCSCI as industry thought leader. Generates expert-level content without hiring analysts.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richText' },
        {
          name: 'sentiment',
          type: 'select',
          options: ['bullish', 'bearish', 'neutral'],
        },
        { name: 'tags', type: 'text' },
        { name: 'featuredImage', type: 'upload', relationTo: 'media' },
        { name: 'isAiGenerated', type: 'checkbox', defaultValue: false },
        { name: 'summaryShort', type: 'textarea' },
        { name: 'category', type: 'relationship', relationTo: 'categories' },
        { name: 'publishDate', type: 'date' },
      ],
    },
    
    // ============================================
    // NEWS ITEMS (Circulars, Notices)
    // ============================================
    {
      slug: 'news-items',
      admin: { 
        useAsTitle: 'title',
        group: 'Content',
        description: 'Circulars, Notices, Press Releases → Displayed on /news page'
      },
      hooks: {
        afterChange: [createAuditLogHook('news-items')],
        afterDelete: [deleteAuditLogHook('news-items')],
      },
      fields: [
        // AI FEATURE PREVIEW
        {
          type: 'collapsible',
          label: '✨ View AI News Aggregator Story (Premium)',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiNewsPreview',
              type: 'textarea',
              label: false, // Hides the inner field label
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 12, // Ensure enough height for the story
                style: {
                    fontFamily: 'monospace', // optional, makes it look more "data" like? No, clearer font is better. Defaults are fine.
                    backgroundColor: '#f8f9fa'
                }
              },
              defaultValue: `📖 THE STORY
------------------------------------------------
Every morning, Priya from the Market Intelligence team spends 4 hours manually scanning 50+ news sites, government circulars, and Twitter feeds. She copies links into a spreadsheet. By the time she's done, the market has already moved. Last week, she missed a critical export ban notification by 2 hours, costing the trading desk ₹20 Lakhs.

✨ WITH AI NEWS AGGREGATOR
------------------------------------------------
The system scans 500+ sources in real-time. It filters out noise, categorizes news by commodity (e.g., 'Wheat', 'Rice'), and alerts the trading desk within 60 seconds of a major announcement. Priya now spends her morning analyzing impacts, not copy-pasting links.

✅ Saves 4 hours daily  |  ⚡ Real-time alerts  |  🌍 500+ Sources

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'title', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          options: ['TENDER', 'CIRCULAR', 'NOTICE', 'PRESS_RELEASE', 'ANNOUNCEMENT'],
          required: true,
        },
        { name: 'referenceNo', type: 'text' },
        { name: 'content', type: 'richText' },
        { name: 'date', type: 'date', required: true },
        { name: 'attachment', type: 'upload', relationTo: 'media' },
        { name: 'relatedTender', type: 'relationship', relationTo: 'tenders' },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    
    // ============================================
    // GALLERY
    // ============================================
    {
      slug: 'gallery',
      admin: { 
        useAsTitle: 'caption',
        group: 'Content',
        description: 'Photo gallery → Displayed on /gallery page'
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', required: true },
        { name: 'warehouse', type: 'relationship', relationTo: 'warehouses' },
        {
          name: 'galleryCategory',
          type: 'select',
          options: ['Procurement Centers', 'Warehouses', 'Quality Labs', 'Events', 'Farmer Interactions', 'Other'],
        },
        { name: 'date', type: 'date' },
        { name: 'location', type: 'text' },
        { name: 'order', type: 'number', defaultValue: 0 },
      ],
    },
    
    // ============================================
    // PARTNERS
    // ============================================
    {
      slug: 'partners',
      admin: { 
        useAsTitle: 'name',
        group: 'People',
        description: 'Partner organizations → Displayed on homepage and /about page'
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        {
          name: 'partnerCategory',
          type: 'select',
          options: ['Logistics', 'Banking', 'Trading', 'Technology', 'Government', 'Other'],
        },
        { name: 'website', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'order', type: 'number', defaultValue: 0 },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    
    // ============================================
    // DOWNLOADS
    // ============================================
    {
      slug: 'downloads',
      admin: { 
        useAsTitle: 'title',
        group: 'Content',
        description: 'Downloadable documents → Displayed on /downloads page'
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiDocumentPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
SMART DOCUMENT ORGANIZER: Automatically tags and categorizes uploaded circulars. Makes 5-year-old notices searchable by keyword. Detects duplicate uploads automatically.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'file', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'downloadCategory',
          type: 'select',
          options: ['Forms', 'Guidelines', 'Reports', 'Policies', 'Tenders', 'Other'],
        },
        { name: 'description', type: 'textarea' },
        { name: 'order', type: 'number', defaultValue: 0 },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    
    // ============================================
    // HERO SLIDES (Homepage Carousel)
    // ============================================
    {
      slug: 'hero-slides',
      admin: { 
        useAsTitle: 'title',
        group: 'Content',
        description: 'Homepage carousel slides → Displayed on homepage hero section'
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'link', type: 'text' },
        { name: 'buttonText', type: 'text' },
        { name: 'order', type: 'number', defaultValue: 0 },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    
    // ============================================
    // STRATEGIES
    // ============================================
    {
      slug: 'strategies',
      admin: { 
        useAsTitle: 'title',
        group: 'Settings',
        description: 'Business strategies → Displayed on /strategies page'
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { name: 'description', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'icon', type: 'text' },
        { name: 'order', type: 'number', defaultValue: 0 },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    
    // ============================================
    // HISTORY EVENTS (Timeline)
    // ============================================
    {
      slug: 'history-events',
      admin: { 
        useAsTitle: 'title',
        group: 'Content',
        description: 'Company timeline events → Displayed on /history page'
      },
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'isMilestone', type: 'checkbox', defaultValue: false },
        { name: 'order', type: 'number', defaultValue: 0 },
      ],
    },
    
    // ============================================
    // TEAM MEMBERS
    // ============================================
    {
      slug: 'team-members',
      admin: { 
        useAsTitle: 'name',
        group: 'People',
        description: 'Leadership team → Displayed on /about page'
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'designation', type: 'text', required: true },
        { name: 'department', type: 'text' },
        { name: 'bio', type: 'richText' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'linkedIn', type: 'text' },
        { name: 'order', type: 'number', defaultValue: 0 },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    
    // ============================================
    // LEGAL DOCUMENTS
    // ============================================
    {
      slug: 'legal-documents',
      admin: { 
        useAsTitle: 'title',
        group: 'Legal & Compliance',
        description: 'Legal policies and compliance docs → Displayed on /legal page'
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiLegalPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
AUTO-DRAFT CONTRACTS: Generates lawyer-approved sale contracts from template library. Pre-fills buyer details and commodity specs. Flags deviations from standard terms.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'title', type: 'text', required: true },
        {
          name: 'documentType',
          type: 'select',
          options: ['Act', 'Policy', 'Regulation', 'Guideline', 'Compliance'],
        },
        { name: 'description', type: 'richText' },
        {
          name: 'sections',
          type: 'array',
          fields: [
            { name: 'sectionTitle', type: 'text' },
            { name: 'sectionContent', type: 'richText' },
          ],
        },
        { name: 'attachment', type: 'upload', relationTo: 'media' },
        { name: 'effectiveDate', type: 'date' },
        { name: 'order', type: 'number', defaultValue: 0 },
      ],
    },
    
    // ============================================
    // PAGES (Static Content)
    // ============================================
    {
      slug: 'pages',
      admin: { 
        useAsTitle: 'title',
        group: 'Settings',
        description: 'Static content pages → Used for /privacy, /terms, /citizen-charter'
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'content', type: 'richText' },
        { name: 'featuredImage', type: 'upload', relationTo: 'media' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
    
    // ============================================
    // FAQs
    // ============================================
    {
      slug: 'faqs',
      admin: { 
        useAsTitle: 'question',
        group: 'Settings',
        description: 'Frequently Asked Questions → Displayed on homepage and /faq page'
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiFaqPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
AUTO-GENERATE FAQs: Analyzes repeated trade inquiries to suggest new FAQ entries. Auto-drafts answers from existing content. Reduces repetitive email responses by 60%.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText' },
        { name: 'faqCategory', type: 'text' },
        { name: 'order', type: 'number', defaultValue: 0 },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    
    // ============================================
    // TRADE INQUIRIES (Inbox)
    // ============================================
    {
      slug: 'trade-inquiries',
      admin: { 
        useAsTitle: 'organization',
        group: 'People',
        description: 'Trade inquiry submissions → Received from /contact and /trade pages'
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiLeadScoringPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
SMART LEAD PRIORITIZATION: Ranks inquiries as Hot/Warm/Cold based on quantity, commodity type, and buyer history. Focus on high-value leads first. Achieve 40% faster deal closure.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'organization', type: 'text' },
        { name: 'contactName', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'requirement', type: 'textarea' },
        { name: 'commodity', type: 'text' },
        { name: 'quantity', type: 'text' },
        { name: 'product', type: 'relationship', relationTo: 'products' },
        {
          name: 'status',
          type: 'select',
          options: ['new', 'contacted', 'negotiating', 'closed', 'rejected'],
          defaultValue: 'new',
        },
        { name: 'notes', type: 'richText' },
      ],
    },
    
    // ============================================
    // WAREHOUSE STOCK (Junction: Products ↔ Warehouses)
    // ============================================
    {
      slug: 'warehouse-stock',
      admin: { 
        useAsTitle: 'id',
        group: 'Operations',
        description: 'Product stock levels per warehouse → Used in /warehouse, /logs, /analysis'
      },
      fields: [
        // AI FEATURE PREVIEW
        {
          type: 'collapsible',
          label: '✨ View Stock Predictor Story (Premium)',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiStockPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 12,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `📖 THE STORY
------------------------------------------------
The Indore warehouse has a problem. Last monsoon, they ran out of storage for the wheat arrival. Farmers waited for days. This year, they overcompensated—rented extra space that sat empty for 3 months, costing lakhs in unused rent.

✨ WITH STOCK LEVEL PREDICTOR
------------------------------------------------
The warehouse manager opens his dashboard every Monday. A 30-day forecast shows expected arrivals based on MSP announcements, historical patterns, and weather. A yellow alert suggests capacity will hit 90% in week 3.

📊 30-day demand forecast  |  🔔 Capacity alerts  |  📈 Historical trend analysis

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'warehouse', type: 'relationship', relationTo: 'warehouses', required: true },
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'quantity', type: 'number', required: true, defaultValue: 0 },
        { name: 'unit', type: 'text', defaultValue: 'MT' },
        { name: 'lastUpdated', type: 'date' },
        { name: 'notes', type: 'textarea' },
      ],
    },
    
    // ============================================
    // PROCUREMENT LOGS (Transaction Records)
    // ============================================
    {
      slug: 'procurement-logs',
      admin: { 
        useAsTitle: 'transactionId',
        group: 'Operations',
        description: 'Procurement transactions → Displayed on /logs page'
      },
      fields: [
        // AI FEATURE PREVIEW
        {
          type: 'collapsible',
          label: '✨ View Smart Procurement Story (Premium)',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiProcurementPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 12,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `📖 THE STORY
------------------------------------------------
At the Bhopal procurement center, Suresh completes transactions with 47 farmers today. He writes each receipt by hand. At the head office, Meera types these into the CMS until 9 PM, often mishearing numbers. accounts don't tally.

✨ WITH SMART PROCUREMENT ENTRY
------------------------------------------------
Suresh now photographs each receipt. The AI reads the handwriting, extracts farmer name, quantity, commodity, and MSP, and creates a draft entry within seconds. Meera just reviews and approves.

⏰ Saves 5+ hours daily  |  📸 OCR from receipt photos  |  ✅ 99% accuracy

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'transactionId', type: 'text', required: true, unique: true },
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'warehouse', type: 'relationship', relationTo: 'warehouses', required: true },
        { name: 'recordedBy', type: 'relationship', relationTo: 'users' },
        { name: 'quantity', type: 'number', required: true },
        { name: 'unit', type: 'text', defaultValue: 'MT' },
        { name: 'mspPrice', type: 'number' },
        { name: 'transactionDate', type: 'date', required: true },
        { 
          name: 'status', 
          type: 'select', 
          options: ['Pending', 'Processing', 'Completed', 'Rejected'],
          defaultValue: 'Pending'
        },
        { name: 'farmerName', type: 'text' },
        { name: 'farmerLocation', type: 'text' },
        { name: 'notes', type: 'textarea' },
      ],
    },
    
    // ============================================
    // FINANCIAL REPORTS (Budget & Accounts)
    // ============================================
    {
      slug: 'financial-reports',
      admin: { 
        useAsTitle: 'title',
        group: 'Legal & Compliance',
        description: 'Financial statements → Displayed on /accounts page'
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiReportPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
AUTO-GENERATE SUMMARIES: Creates executive summaries from uploaded annual/audit reports. Extracts key financial metrics instantly. Saves 2+ hours per report.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'title', type: 'text', required: true },
        { 
          name: 'reportType', 
          type: 'select', 
          options: ['Annual Report', 'Audit Report', 'Budget Allocation', 'RTI Disclosure', 'Quarter Statement'],
          required: true
        },
        { name: 'fiscalYear', type: 'text', required: true },
        { 
          name: 'category', 
          type: 'select',
          options: ['Procurement Operations', 'Storage & Logistics', 'Quality Assurance', 'Administration', 'Revenue', 'Expenditure']
        },
        { name: 'amount', type: 'number' },
        { name: 'percentageChange', type: 'number' },
        { name: 'document', type: 'upload', relationTo: 'media' },
        { name: 'publishDate', type: 'date' },
        { name: 'description', type: 'textarea' },
        { name: 'isPublic', type: 'checkbox', defaultValue: true },
      ],
    },
    
    // ============================================
    // QUALITY STANDARDS (Testing Parameters)
    // ============================================
    {
      slug: 'quality-standards',
      admin: { 
        useAsTitle: 'parameterName',
        group: 'Legal & Compliance',
        description: 'Quality parameters → Displayed on /quality-control page'
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiCompliancePreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
AUTO-GENERATE INSPECTION CHECKLISTS: Creates custom quality checklists for each commodity grade. Ensures compliance with latest FSSAI/Agmark standards. Reduces rejection rates by 15%.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
        { name: 'parameterName', type: 'text', required: true },
        { name: 'minValue', type: 'text' },
        { name: 'maxValue', type: 'text' },
        { name: 'unit', type: 'text' },
        { name: 'testMethod', type: 'text' },
        { 
          name: 'certification', 
          type: 'select',
          options: ['ISO 22000', 'FSSAI', 'BRC', 'HACCP', 'GMP', 'AGMARK']
        },
        { name: 'isMandatory', type: 'checkbox', defaultValue: true },
        { name: 'order', type: 'number', defaultValue: 0 },
      ],
    },
    
    // ============================================
    // ORDERS (Customer Orders)
    // ============================================
    {
      slug: 'orders',
      admin: { 
        useAsTitle: 'orderNo',
        group: 'Commerce',
        description: 'Customer orders → Used in /checkout, /profile'
      },
      fields: [
        // AI FEATURE PREVIEW (Medium Impact)
        {
          type: 'collapsible',
          label: '✨ View AI Feature Benefits',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'aiOrdersPreview',
              type: 'textarea',
              label: false,
              admin: {
                readOnly: true,
                disableListColumn: true,
                rows: 8,
                style: { backgroundColor: '#f8f9fa' }
              },
              defaultValue: `✨ AI FEATURE BENEFITS
------------------------------------------------
PREDICTIVE ORDER FULFILLMENT: Alerts logistics team 48 hours before shipment deadline. Suggests optimal courier partners based on past performance. Tracks delivery delays in real-time.

🔒 This is a premium feature. Contact sales@ncsci.gov.in to enable.`,
            },
          ],
        },
        { name: 'orderNo', type: 'text', required: true, unique: true },
        { name: 'user', type: 'relationship', relationTo: 'users', required: true },
        { name: 'totalAmount', type: 'number', required: true },
        { name: 'tax', type: 'number' },
        { 
          name: 'status', 
          type: 'select',
          options: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
          defaultValue: 'Pending'
        },
        { name: 'shippingAddress', type: 'textarea' },
        { name: 'paymentMethod', type: 'text' },
        { name: 'paymentStatus', type: 'select', options: ['Pending', 'Paid', 'Failed', 'Refunded'] },
        { name: 'orderDate', type: 'date' },
        { name: 'notes', type: 'textarea' },
      ],
    },
    
    // ============================================
    // ORDER ITEMS (Junction: Orders ↔ Products)
    // ============================================
    {
      slug: 'order-items',
      admin: { 
        useAsTitle: 'id',
        group: 'Commerce',
        description: 'Items in orders → Junction table for Orders ↔ Products'
      },
      fields: [
        { name: 'order', type: 'relationship', relationTo: 'orders', required: true },
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'quantity', type: 'number', required: true },
        { name: 'unitPrice', type: 'number', required: true },
        { name: 'totalPrice', type: 'number' },
      ],
    },
    
    // ============================================
    // TENDER ITEMS (Junction: Tenders ↔ Products)
    // ============================================
    {
      slug: 'tender-items',
      admin: { 
        useAsTitle: 'commodity',
        group: 'Commerce',
        description: 'Products in tenders → Junction table for Tenders ↔ Products'
      },
      fields: [
        { name: 'tender', type: 'relationship', relationTo: 'tenders', required: true },
        { name: 'product', type: 'relationship', relationTo: 'products' },
        { name: 'commodity', type: 'text', required: true },
        { name: 'quantity', type: 'number', required: true },
        { name: 'unit', type: 'text', defaultValue: 'MT' },
        { name: 'estimatedValue', type: 'number' },
      ],
    },
    
    // ============================================
    // AI FEATURES (Premium AI Capabilities)
    // ============================================
    {
      slug: 'ai-features',
      admin: { 
        useAsTitle: 'name',
        group: 'AI & Premium',
        description: '🤖 Premium AI Features → Configure AI-powered capabilities for market analysis, price prediction, and intelligent insights. Contact admin to enable AI features for your organization.'
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { 
          name: 'description', 
          type: 'textarea',
          admin: {
            description: 'Describe what this AI feature does and its benefits'
          }
        },
        { name: 'price', type: 'number', admin: { description: 'Price in INR' } },
        { name: 'currency', type: 'text', defaultValue: 'INR' },
        {
          name: 'billingCycle',
          type: 'select',
          options: ['monthly', 'yearly', 'one-time'],
        },
        { name: 'trialDays', type: 'number', defaultValue: 0 },
        { 
          name: 'purchaseMessage', 
          type: 'textarea', 
          defaultValue: '🔒 This is a premium AI feature. Please contact your administrator or purchase a subscription to unlock this capability. Our AI features include market prediction, price forecasting, supply chain optimization, and intelligent crop recommendations.'
        },
        { name: 'paymentLink', type: 'text' },
        { name: 'isActive', type: 'checkbox', defaultValue: false },
        { name: 'icon', type: 'text', admin: { description: 'Lucide icon name (e.g., Brain, Sparkles, TrendingUp)' } },
        {
          name: 'capabilities',
          type: 'array',
          admin: { description: 'List of capabilities this AI feature provides' },
          fields: [
            { name: 'capability', type: 'text' },
          ],
        },
      ],
    },
    
    // ============================================
    // AI SUBSCRIPTIONS (User Access)
    // ============================================
    {
      slug: 'ai-subscriptions',
      admin: { 
        useAsTitle: 'id',
        group: 'AI & Premium',
        description: '📊 AI Feature Subscriptions → Track which users have access to premium AI features'
      },
      fields: [
        { name: 'user', type: 'relationship', relationTo: 'users', required: true },
        { name: 'feature', type: 'relationship', relationTo: 'ai-features', required: true },
        { name: 'startDate', type: 'date', required: true },
        { name: 'endDate', type: 'date' },
        {
          name: 'status',
          type: 'select',
          options: ['active', 'expired', 'cancelled', 'trial'],
          defaultValue: 'active',
        },
        { name: 'paymentId', type: 'text' },
        { name: 'amountPaid', type: 'number' },
      ],
    },
    
    // ============================================
    // SITE SETTINGS (Global Configuration)
    // ============================================
    {
      slug: 'site-settings',
      admin: { 
        useAsTitle: 'settingKey',
        group: 'Settings',
        description: 'Global site configuration'
      },
      fields: [
        { name: 'settingKey', type: 'text', required: true, unique: true },
        { name: 'settingValue', type: 'text' },
        { name: 'settingType', type: 'select', options: ['string', 'number', 'boolean', 'json'] },
        { name: 'description', type: 'textarea' },
      ],
    },
    
    // ============================================
    // IMMUTABLE AUDIT LOGS (Compliance & Handover)
    // ============================================
    {
      slug: 'audit-logs',
      admin: { 
        hidden: true,
      },
      access: {
        create: () => false, 
        read: () => false,   
        update: () => false, 
        delete: () => false, 
      },
      fields: [
        { name: 'action', type: 'text', required: true },
        { name: 'collectionName', type: 'text' },
        { name: 'documentId', type: 'text' },
        { name: 'performedBy', type: 'text', required: true },
        { name: 'details', type: 'json' },
      ],
    },
  ],
  
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
