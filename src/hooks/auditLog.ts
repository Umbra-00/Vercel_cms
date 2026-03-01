import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const createAuditLogHook = (collectionName: string): CollectionAfterChangeHook => {
  return async ({ doc, previousDoc, operation, req }) => {
    try {
      if (req.payload) {
        // Only log if the operation was performed by an actual user (not system seeds)
        if (req.user) {
          await req.payload.create({
            collection: 'audit-logs',
            data: {
               action: operation.toUpperCase(),
               collectionName,
               documentId: String(doc.id || doc._id || 'unknown'),
               performedBy: `${req.user.email} (ID: ${req.user.id})`,
               details: JSON.stringify({
                 newData: doc,
                 previousData: previousDoc,
               })
            },
            overrideAccess: true,
          })
        }
      }
    } catch (e) {
      console.error('Audit Log Error (Silent):', e)
    }
    return doc
  }
}

export const deleteAuditLogHook = (collectionName: string): CollectionAfterDeleteHook => {
  return async ({ req, id, doc }) => {
    try {
      if (req.payload) {
        if (req.user) {
          await req.payload.create({
            collection: 'audit-logs',
            data: {
               action: 'DELETE',
               collectionName,
               documentId: String(id),
               performedBy: `${req.user.email} (ID: ${req.user.id})`,
               details: JSON.stringify({
                 deletedData: doc,
               })
            },
            overrideAccess: true,
          })
        }
      }
    } catch (e) {
      console.error('Audit Log Error (Silent):', e)
    }
    return doc
  }
}
