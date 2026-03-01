/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react'

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout bypasses the main app layout for Payload admin routes
  // The children (admin/[[...segments]]/layout.tsx) will render the full HTML
  return <>{children}</>
}
