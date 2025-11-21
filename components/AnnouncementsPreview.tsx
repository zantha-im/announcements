'use client'

import * as Icons from 'lucide-react'
import React, { useState } from 'react'
import styles from './AnnouncementsPreview.module.css'

interface AnnouncementsPreviewProps {
  title: string
  description: string
}

export default function AnnouncementsPreview({ title, description }: AnnouncementsPreviewProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [viewMode, setViewMode] = useState<'rendered' | 'html'>('rendered')

  // Load content on mount
  React.useEffect(() => {
    const loadContent = async () => {
      setLoading(true)
      try {
        const response = await fetch('/content-types/announcements/page.html')
        if (!response.ok) throw new Error('Failed to load announcements')
        const html = await response.text()
        setContent(html)
      } catch (err) {
        console.error('Error loading announcements:', err)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  const handleCopy = async () => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, 'text/html')
      const contentDiv = doc.querySelector('div')
      let contentToCopy = content

      if (contentDiv) {
        contentToCopy = contentDiv.innerHTML
      }

      await navigator.clipboard.writeText(contentToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying:', err)
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

      <div className={styles.container}>
        <div className={styles.headerBar}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'rendered' ? styles.active : ''}`}
              onClick={() => setViewMode('rendered')}
              title="Show rendered view"
            >
              <Icons.Eye size={16} />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'html' ? styles.active : ''}`}
              onClick={() => setViewMode('html')}
              title="Show HTML source"
            >
              <Icons.Code size={16} />
            </button>
          </div>
          <button
            className={`${styles.copyBtn} ${copied ? styles.copiedSuccess : ''}`}
            onClick={handleCopy}
            disabled={loading || !content}
            title="Copy content"
          >
            {copied ? <Icons.Check size={18} /> : <Icons.Copy size={18} />}
          </button>
        </div>

        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>Loading announcements...</div>
          ) : content ? (
            viewMode === 'rendered' ? (
              <div
                className={styles.renderedContent}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <pre className={styles.htmlView}>
                <code>{content}</code>
              </pre>
            )
          ) : (
            <div className={styles.placeholder}>No content available</div>
          )}
        </div>
      </div>
    </div>
  )
}
