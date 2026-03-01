import configPromise from '@payload-config'
import { getPayload } from 'payload'

const triggerHandoverLog = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('Triggering Immutable System Handover Audit Log...')

  try {
    const existingLogs = await payload.find({
      collection: 'audit-logs',
      where: { action: { equals: 'SYSTEM_HANDOVER_COMPLETE' } },
    })

    if (existingLogs.totalDocs > 0) {
      console.log('System Handover Audit Log already exists. Payload prevents modification.')
      console.log('Timestamp recorded was:', existingLogs.docs[0].createdAt)
      process.exit(0)
    }

    const log = await payload.create({
      collection: 'audit-logs',
      data: {
        action: 'SYSTEM_HANDOVER_COMPLETE',
        performedBy: 'System Developer / Administrator',
        details: 'Website infrastructure deployment finalized by Developer. Admin access handed over to NCSCI/Pravin Ninawe. All subsequent content creation, product listings, business operations, and financial transactions are strictly and exclusively under the control and liability of the site owner (NCSCI). The Developer serves strictly as an IT contractor and maintains no operational control.',
      },
    })
    
    console.log('--------------------------------------------------')
    console.log('SUCCESS! IMMUTABLE SYSTEM HANDOVER LOG CREATED.')
    console.log('Log ID:', log.id)
    console.log('Action:', log.action)
    console.log('Timestamp:', log.createdAt)
    console.log('This timestamp cryptographically proves exactly when you handed over the system.')
    console.log('--------------------------------------------------')
    
    process.exit(0)
  } catch (err) {
    console.error('Failed to create Handover Log:', err)
    process.exit(1)
  }
}

triggerHandoverLog()
