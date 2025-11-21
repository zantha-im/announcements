import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HTML Canvas - Admin UI',
  description: 'Static HTML snippet generator for Shopify',
  icons: {
    icon: '/favicon.ico',
    apple: '/site-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
