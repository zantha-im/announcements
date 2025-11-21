'use client'

import * as Icons from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './SnippetViewer.module.css'

interface SnippetViewerProps {
  contentType: 'announcements' | 'extended-product'
  view: 'main' | 'template'
  template?: string
  title: string
  description: string
}

export default function SnippetViewer({
  contentType,
  view,
  template,
  title,
  description,
}: SnippetViewerProps) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadSnippet = async () => {
      try {
        setLoading(true)
        setError(null)

        let filePath: string
        if (view === 'main') {
          filePath = `/content-types/${contentType}/page.html`
        } else {
          filePath = `/content-types/${contentType}/templates/${template}.html`
        }

        const response = await fetch(filePath)
        if (!response.ok) {
          throw new Error(`Failed to load snippet: ${response.statusText}`)
        }

        const html = await response.text()
        setCode(html)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load snippet')
      } finally {
        setLoading(false)
      }
    }

    loadSnippet()
  }, [contentType, view, template])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
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

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>HTML Snippet</h3>
          <button
            className={`${styles.copyBtn} ${copied ? styles.success : ''}`}
            onClick={handleCopy}
            disabled={loading || !!error}
          >
            {copied ? (
              <>
                <Icons.Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Icons.Copy size={16} />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>

        <div className={styles.container}>
          {loading && <div className={styles.loading}>Loading snippet...</div>}
          {error && <div className={styles.error}>{error}</div>}
          {!loading && !error && (
            <div className={styles.codeBlock}>
              <pre>
                <code>{code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
