'use client'

import AppLayout, { navSections } from '@/components/AppLayout'
import SnippetViewer from '@/components/SnippetViewer'
import { useState } from 'react'

const contentDescriptions: Record<string, { title: string; description: string }> = {
  'announcements-main': {
    title: 'Announcements Main Page',
    description: 'Dynamic announcement pages with color-coded banners, responsive design, and anchor navigation.',
  },
  'announcements-standard': {
    title: 'Standard Announcement Template',
    description: 'Basic announcement template for quick additions to your announcements page.',
  },
  'announcements-product-update': {
    title: 'Product Update Template',
    description: 'Specialized announcement template for product-focused updates and releases.',
  },
  'announcements-shipping-alert': {
    title: 'Shipping Alert Template',
    description: 'Template for shipping, logistics, and service-related announcements.',
  },
  'extended-product-main': {
    title: 'Extended Product Main Page',
    description: 'Rich product showcase with gallery, specifications, features, and customer testimonials.',
  },
  'extended-product-gallery': {
    title: 'Product Gallery Component',
    description: 'Multi-image gallery with thumbnail navigation for product showcase.',
  },
  'extended-product-specs': {
    title: 'Product Specifications Component',
    description: 'Responsive specifications grid for displaying product details.',
  },
  'extended-product-testimonials': {
    title: 'Product Testimonials Component',
    description: 'Customer review cards with ratings and testimonial text.',
  },
}

export default function Home() {
  const [activeItem, setActiveItem] = useState<string>('announcements-main')

  // Find the nav item from navSections
  let navItem = null
  for (const section of navSections) {
    const found = section.items.find((item) => item.id === activeItem)
    if (found) {
      navItem = {
        type: found.type,
        view: found.view,
        template: found.template,
      }
      break
    }
  }

  const desc = contentDescriptions[activeItem]

  if (!navItem || !desc) {
    return null
  }

  return (
    <AppLayout activeItem={activeItem} onNavClick={setActiveItem}>
      <SnippetViewer
        contentType={navItem.type}
        view={navItem.view}
        template={navItem.template}
        title={desc.title}
        description={desc.description}
      />
    </AppLayout>
  )
}
