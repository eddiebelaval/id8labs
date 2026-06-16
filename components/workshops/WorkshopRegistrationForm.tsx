'use client'

import { useState, type FormEvent } from 'react'

// ─── Shared form styles (editorial tokens, soft corners) ────
const inputClassName =
  'w-full rounded-[10px] bg-[var(--paper)] border border-[var(--hair)] px-4 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-id8-orange transition-colors'
const labelClassName =
  'block font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-2'
const selectClassName = `${inputClassName} pr-10 appearance-none bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat`
const selectChevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a5a5a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface WorkshopRegistrationFormProps {
  workshopSlug: string
  workshopName: string
  /** When true (hybrid format), ask whether they want an in-person or remote seat. */
  askAttendance?: boolean
}

export function WorkshopRegistrationForm({
  workshopSlug,
  workshopName,
  askAttendance = false,
}: WorkshopRegistrationFormProps) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    attendance: '',
    notes: '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const response = await fetch('/api/workshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workshopSlug, ...formData }),
      })

      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', company: '', role: '', attendance: '', notes: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="rounded-[13px] border border-[var(--hair)] border-t-2 border-t-id8-orange bg-[var(--paper-shadow)] py-16 px-7 text-center">
        <p className="mb-2 font-[family-name:var(--font-display)] text-2xl font-normal text-[var(--ink)]">
          You&apos;re on the list.
        </p>
        <p className="mx-auto max-w-md text-[var(--body)]">
          I read every registration myself. I&apos;ll reach out to confirm your seat for {workshopName} and lock
          the date — check your inbox for a confirmation.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[13px] border border-[var(--hair)] bg-[var(--paper-shadow)] p-7 md:p-10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="ws-name" className={labelClassName}>Name</label>
          <input
            id="ws-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClassName}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="ws-email" className={labelClassName}>Email</label>
          <input
            id="ws-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClassName}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="ws-company" className={labelClassName}>Company / Firm</label>
          <input
            id="ws-company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={inputClassName}
            placeholder="Your company or firm"
          />
        </div>
        <div>
          <label htmlFor="ws-role" className={labelClassName}>What do you do?</label>
          <select
            id="ws-role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className={selectClassName}
            style={{ backgroundImage: selectChevron }}
          >
            <option value="">Select...</option>
            <option value="founder">Founder / small operator</option>
            <option value="professional-services">Professional services (legal, advisory)</option>
            <option value="agency-studio">Agency / studio</option>
            <option value="media-company">Media / production company</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {askAttendance && (
        <div>
          <label htmlFor="ws-attendance" className={labelClassName}>How do you want to join?</label>
          <select
            id="ws-attendance"
            value={formData.attendance}
            onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
            className={selectClassName}
            style={{ backgroundImage: selectChevron }}
          >
            <option value="">No preference yet</option>
            <option value="in-person">In person — Miami</option>
            <option value="virtual">Remote</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="ws-notes" className={labelClassName}>
          What would you want to walk out with? (Optional)
        </label>
        <textarea
          id="ws-notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className={`${inputClassName} resize-none`}
          placeholder="E.g., our client intake eats a day a week and nothing stays consistent across the team..."
        />
      </div>

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full cursor-pointer rounded-[10px] border border-[var(--ink)] bg-[var(--ink)] px-6 py-4 font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--paper)] transition-colors duration-150 hover:border-id8-orange hover:bg-id8-orange disabled:cursor-not-allowed disabled:opacity-50"
      >
        {formState === 'submitting' ? 'Sending...' : 'Register my interest'}
      </button>

      <p className="text-center font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--muted)]">
        No payment now. I&apos;ll confirm your seat and the date with you directly before anything is owed.
      </p>

      {formState === 'error' && (
        <p className="text-center text-sm text-id8-orange">
          Something went wrong. Try again or email me directly at eb@id8labs.tech
        </p>
      )}
    </form>
  )
}
