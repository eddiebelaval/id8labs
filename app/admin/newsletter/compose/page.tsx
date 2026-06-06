'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface AvailableIssue {
  issueNumber: number
  date: string
  subject: string
}

export default function ComposePage() {
  const [issues, setIssues] = useState<AvailableIssue[]>([])
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)
  const [audienceFilter, setAudienceFilter] = useState<'all' | 'academy' | 'free'>('all')
  const [sending, setSending] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch('/api/newsletter/send')
        if (response.ok) {
          const data = await response.json()
          setIssues(data.availableIssues)
          if (data.availableIssues.length > 0) {
            setSelectedIssue(data.availableIssues[0].issueNumber)
          }
        }
      } catch (error) {
        console.error('Failed to fetch issues:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchIssues()
  }, [])

  const handleTestSend = async () => {
    if (!testEmail || !selectedIssue) {
      setMessage({ type: 'error', text: 'Please select an issue and enter a test email' })
      return
    }

    setSending(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Request': 'true',
        },
        body: JSON.stringify({
          issueNumber: selectedIssue,
          testEmail,
          audienceFilter,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send test email')
      }

      setMessage({ type: 'success', text: `Test email sent to ${testEmail}` })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to send test email',
      })
    } finally {
      setSending(false)
    }
  }

  const handleSendToAll = async () => {
    if (!selectedIssue) {
      setMessage({ type: 'error', text: 'Please select an issue to send' })
      return
    }

    const selectedIssueData = issues.find(i => i.issueNumber === selectedIssue)
    const confirmed = window.confirm(
      `Are you sure you want to send Issue #${selectedIssue} "${selectedIssueData?.subject}" to ${audienceFilter === 'all' ? 'ALL' : audienceFilter} subscribers? This cannot be undone.`
    )

    if (!confirmed) return

    setSending(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Request': 'true',
        },
        body: JSON.stringify({
          issueNumber: selectedIssue,
          audienceFilter,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send newsletter')
      }

      setMessage({
        type: 'success',
        text: data.message || `Newsletter sent successfully!`,
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to send newsletter',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/newsletter"
          className="p-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.02em] text-[var(--ink)]">Compose Newsletter</h1>
          <p className="text-[var(--muted)]">Write and send signal:noise</p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 p-4 border-l-2 bg-[var(--paper-shadow)] ${
            message.type === 'success'
              ? 'border-[var(--teal)] text-[var(--teal)]'
              : 'border-id8-orange text-id8-orange'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <div className="space-y-6">
        {/* Issue Selection */}
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-2">
            Select Issue to Send
          </label>
          {loading ? (
            <div className="p-4 text-center text-[var(--muted)]">Loading issues...</div>
          ) : issues.length === 0 ? (
            <div className="p-4 text-center text-[var(--muted)] border border-dashed border-[var(--hair)] ">
              No issues available. Add issues in the newsletter template file.
            </div>
          ) : (
            <div className="space-y-3">
              {issues.map((issue) => (
                <label
                  key={issue.issueNumber}
                  className={`flex items-start gap-4 p-4 border  cursor-pointer transition-colors ${
                    selectedIssue === issue.issueNumber
                      ? 'border-id8-orange bg-[var(--paper-shadow)]'
                      : 'border-[var(--hair)] hover:border-id8-orange'
                  }`}
                >
                  <input
                    type="radio"
                    name="issue"
                    value={issue.issueNumber}
                    checked={selectedIssue === issue.issueNumber}
                    onChange={() => setSelectedIssue(issue.issueNumber)}
                    className="mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-id8-orange">
                        Issue #{issue.issueNumber}
                      </span>
                      <span className="text-sm text-[var(--muted)]">{issue.date}</span>
                    </div>
                    <p className="text-[var(--ink)] font-medium">{issue.subject}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Audience Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-2">
            Audience
          </label>
          <div className="flex gap-4">
            {[
              { value: 'all', label: 'All Subscribers' },
              { value: 'academy', label: 'Academy Members Only' },
              { value: 'free', label: 'Free Subscribers Only' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-2 px-4 py-2 border  cursor-pointer transition-colors ${
                  audienceFilter === option.value
                    ? 'border-id8-orange bg-[var(--paper-shadow)]'
                    : 'border-[var(--hair)] hover:border-id8-orange'
                }`}
              >
                <input
                  type="radio"
                  name="audience"
                  value={option.value}
                  checked={audienceFilter === option.value}
                  onChange={() => setAudienceFilter(option.value as 'all' | 'academy' | 'free')}
                />
                <span className="text-sm text-[var(--ink)]">{option.label}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Academy members receive exclusive content sections. Free subscribers see upgrade CTAs.
          </p>
        </div>

        {/* Test Send */}
        <div className="p-4 bg-[var(--paper)] border border-[var(--hair)] ">
          <h3 className="text-sm font-medium text-[var(--ink)] mb-3">Send Test Email</h3>
          <div className="flex gap-3">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 border border-[var(--hair)]  bg-[var(--paper-shadow)] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
            />
            <button
              onClick={handleTestSend}
              disabled={sending}
              className="px-4 py-2 border border-[var(--hair)]  hover:bg-[var(--paper-shadow)] transition-colors disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Test'}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-[var(--hair)]">
          <button
            onClick={handleSendToAll}
            disabled={sending || !selectedIssue}
            className="btn btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : `Send to ${audienceFilter === 'all' ? 'All' : audienceFilter} Subscribers`}
          </button>
          <Link
            href="/admin/newsletter"
            className="px-6 py-3 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>

      {/* Note */}
      <div className="mt-8 p-4 border-l-2 border-id8-orange bg-[var(--paper-shadow)]">
        <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange mb-2">
          Adding New Issues
        </h3>
        <p className="text-sm text-[var(--body)] leading-[1.6]">
          To add new newsletter issues, update the <code className="px-1 py-0.5 bg-[var(--paper-mid)] font-[family-name:var(--font-mono)] text-[var(--ink)]">lib/email/templates/newsletter-template.ts</code> file
          with a new NewsletterIssue object. This ensures consistent formatting with Big Idea, Framework, Case Study,
          and automatic Academy member differentiation.
        </p>
      </div>
    </div>
  )
}
