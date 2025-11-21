'use client'

import * as Icons from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './ProductPreviewInline.module.css'

// Preload specifications on mount - moved outside to avoid dependency issues
let preloadedProduct = ''

interface ProductPreviewInlineProps {
  product: string
  title: string
  description: string
}

interface Component {
  id: string
  label: string
  path: string
}

const productComponents: Record<string, Component[]> = {
  braaid: [
    { id: 'specifications', label: 'Specifications', path: '/content-types/extended-product/skeld/braaid/specifications.html' },
    { id: 'tasting-notes', label: 'Tasting Notes', path: '/content-types/extended-product/skeld/braaid/tasting-notes.html' },
    { id: 'maker-comments', label: 'Maker Comments', path: '/content-types/extended-product/skeld/braaid/maker-comments.html' },
    { id: 'origin-story', label: 'Origin Story', path: '/content-types/extended-product/skeld/braaid/origin-story.html' },
  ],
  tholtan: [
    { id: 'specifications', label: 'Specifications', path: '/content-types/extended-product/skeld/tholtan/specifications.html' },
    { id: 'tasting-notes', label: 'Tasting Notes', path: '/content-types/extended-product/skeld/tholtan/tasting-notes.html' },
    { id: 'maker-comments', label: 'Maker Comments', path: '/content-types/extended-product/skeld/tholtan/maker-comments.html' },
    { id: 'origin-story', label: 'Origin Story', path: '/content-types/extended-product/skeld/tholtan/origin-story.html' },
  ],
  cashtal: [
    { id: 'specifications', label: 'Specifications', path: '/content-types/extended-product/skeld/cashtal/specifications.html' },
    { id: 'tasting-notes', label: 'Tasting Notes', path: '/content-types/extended-product/skeld/cashtal/tasting-notes.html' },
    { id: 'maker-comments', label: 'Maker Comments', path: '/content-types/extended-product/skeld/cashtal/maker-comments.html' },
    { id: 'origin-story', label: 'Origin Story', path: '/content-types/extended-product/skeld/cashtal/origin-story.html' },
  ],
}

export default function ProductPreviewInline({ product, title, description }: ProductPreviewInlineProps) {
  const [componentContent, setComponentContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<Record<string, boolean>>({})
  const [viewMode, setViewMode] = useState<Record<string, 'rendered' | 'html'>>({})
  const [expandedComponents, setExpandedComponents] = useState<Record<string, boolean>>({
    specifications: true,
    'tasting-notes': false,
    'maker-comments': false,
    'origin-story': false,
  })

  const components = productComponents[product] || []

  const loadComponent = async (componentId: string, path: string) => {
    if (componentContent[componentId]) return

    setLoading((prev) => ({ ...prev, [componentId]: true }))
    try {
      const response = await fetch(path)
      if (!response.ok) throw new Error(`Failed to load ${componentId}`)
      const html = await response.text()
      setComponentContent((prev) => ({ ...prev, [componentId]: html }))
    } catch (err) {
      console.error(`Error loading ${componentId}:`, err)
    } finally {
      setLoading((prev) => ({ ...prev, [componentId]: false }))
    }
  }

  // Preload specifications on mount
  useEffect(() => {
    if (components.length > 0) {
      const specComponent = components.find((c) => c.id === 'specifications')
      if (specComponent && !componentContent[specComponent.id]) {
        loadComponent(specComponent.id, specComponent.path)
      }
    }
  }, [product, componentContent])

  const handleCopy = async (componentId: string) => {
    const html = componentContent[componentId]
    if (!html) return

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const contentDiv = doc.querySelector('div')
      let contentToCopy = html

      if (contentDiv) {
        contentToCopy = contentDiv.innerHTML
      }

      await navigator.clipboard.writeText(contentToCopy)
      setCopied((prev) => ({ ...prev, [componentId]: true }))
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [componentId]: false }))
      }, 2000)
    } catch (err) {
      console.error(`Error copying ${componentId}:`, err)
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700 }}>{title}</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>{description}</p>
        </div>
      </div>

      <div className={styles.preview}>
        {components.map((component) => (
          <div
            key={component.id}
            className={`${styles.componentWrapper} ${expandedComponents[component.id] ? styles.expanded : styles.collapsed}`}
            onMouseEnter={() => loadComponent(component.id, component.path)}
          >
            <div className={styles.componentHeader}>
              <button
                className={styles.headerButton}
                onClick={() => {
                  // If clicking an already open component, close it
                  // Otherwise, close all and open this one
                  if (expandedComponents[component.id]) {
                    setExpandedComponents((prev) => ({
                      ...prev,
                      [component.id]: false,
                    }))
                  } else {
                    // Close all components
                    const newState: Record<string, boolean> = {}
                    components.forEach((c) => {
                      newState[c.id] = false
                    })
                    // Open only this component
                    newState[component.id] = true
                    setExpandedComponents(newState)
                  }
                }}
              >
                <div className={styles.headerContent}>
                  <Icons.ChevronDown
                    size={20}
                    className={styles.chevron}
                    style={{
                      transform: expandedComponents[component.id] ? 'rotate(0deg)' : 'rotate(-90deg)',
                    }}
                  />
                  <span className={styles.componentLabel}>{component.label}</span>
                </div>
              </button>
              <div className={styles.headerActions}>
                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.viewBtn} ${(viewMode[component.id] || 'rendered') === 'rendered' ? styles.active : ''}`}
                    onClick={() => setViewMode((prev) => ({ ...prev, [component.id]: 'rendered' }))}
                    title="Show rendered view"
                  >
                    <Icons.Eye size={16} />
                  </button>
                  <button
                    className={`${styles.viewBtn} ${(viewMode[component.id] || 'rendered') === 'html' ? styles.active : ''}`}
                    onClick={() => setViewMode((prev) => ({ ...prev, [component.id]: 'html' }))}
                    title="Show HTML source"
                  >
                    <Icons.Code size={16} />
                  </button>
                </div>
                <button
                  className={`${styles.copyIconBtn} ${copied[component.id] ? styles.copiedSuccess : ''}`}
                  onClick={() => handleCopy(component.id)}
                  disabled={loading[component.id] || !componentContent[component.id]}
                  title="Copy component HTML"
                >
                  {copied[component.id] ? (
                    <Icons.Check size={18} />
                  ) : (
                    <Icons.Copy size={18} />
                  )}
                </button>
              </div>
            </div>
            {expandedComponents[component.id] && (
              <>
                {loading[component.id] ? (
                  <div className={styles.loading}>Loading {component.label}...</div>
                ) : componentContent[component.id] ? (
                  (viewMode[component.id] || 'rendered') === 'rendered' ? (
                    <div
                      className={styles.componentContent}
                      dangerouslySetInnerHTML={{ __html: componentContent[component.id] }}
                    />
                  ) : (
                    <pre className={styles.htmlView}>
                      <code>{componentContent[component.id]}</code>
                    </pre>
                  )
                ) : (
                  <div className={styles.placeholder} onClick={() => loadComponent(component.id, component.path)}>
                    <div className={styles.placeholderText}>{component.label}</div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
