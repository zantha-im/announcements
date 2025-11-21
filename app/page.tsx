'use client'

import AppLayout from '@/components/AppLayout'
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

interface NavItem {
  id: string
  type: 'announcements' | 'extended-product'
  view: 'main' | 'template'
  template?: string
}

export default function Home() {
  const [activeItem, setActiveItem] = useState<string>('announcements-main')

  const getNavItem = (itemId: string): NavItem | null => {
    if (itemId === 'announcements-main') {
      return { id: itemId, type: 'announcements', view: 'main' }
    }
    if (itemId === 'announcements-standard') {
      return { id: itemId, type: 'announcements', view: 'template', template: 'standard' }
    }
    if (itemId === 'announcements-product-update') {
      return { id: itemId, type: 'announcements', view: 'template', template: 'product-update' }
    }
    if (itemId === 'announcements-shipping-alert') {
      return { id: itemId, type: 'announcements', view: 'template', template: 'shipping-alert' }
    }
    if (itemId === 'extended-product-main') {
      return { id: itemId, type: 'extended-product', view: 'main' }
    }
    if (itemId === 'extended-product-gallery') {
      return { id: itemId, type: 'extended-product', view: 'template', template: 'product-gallery' }
    }
    if (itemId === 'extended-product-specs') {
      return { id: itemId, type: 'extended-product', view: 'template', template: 'product-specs' }
    }
    if (itemId === 'extended-product-testimonials') {
      return { id: itemId, type: 'extended-product', view: 'template', template: 'product-testimonials' }
    }
    return null
  }

  const navItem = getNavItem(activeItem)
  const desc = contentDescriptions[activeItem]

  if (!navItem || !desc) {
    return null
  }

  return (
    <AppLayout>
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
