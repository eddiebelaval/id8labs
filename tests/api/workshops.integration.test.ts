import { describe, it, expect, beforeEach, vi } from 'vitest'
import { POST } from '@/app/api/workshops/route'
import { NextRequest } from 'next/server'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

describe('POST /api/workshops', () => {
  const createRequest = (body: unknown) =>
    new NextRequest('http://localhost:3000/api/workshops', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

  const validPayload = {
    workshopSlug: 'the-tuning-fork',
    name: 'Jane Operator',
    email: 'jane@example.com',
    company: 'Acme Advisory',
    role: 'founder',
    attendance: 'in-person',
    notes: 'Client intake eats a day a week.',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('registers interest, notifies the host, and confirms the registrant', async () => {
    const sentEmails: Array<{ from: string; to: string; subject: string; html: string }> = []
    let contactCreated = false

    server.use(
      http.post('https://api.resend.com/emails', async ({ request }) => {
        const body = (await request.json()) as { from: string; to: string; subject: string; html: string }
        sentEmails.push(body)
        return HttpResponse.json({ id: 'email_test_123' })
      }),
      http.post('https://api.resend.com/audiences/*/contacts', async () => {
        contactCreated = true
        return HttpResponse.json({ id: 'contact_test_123' })
      })
    )

    const response = await POST(createRequest(validPayload))
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toMatchObject({ success: true })

    // Two emails: host notification + registrant confirmation.
    const hostEmail = sentEmails.find((e) => e.to === 'eb@id8labs.tech')
    const confirmEmail = sentEmails.find((e) => e.to === 'jane@example.com')

    expect(hostEmail).toBeDefined()
    expect(hostEmail?.subject).toContain('The Tuning Fork I')
    expect(hostEmail?.html).toContain('Jane Operator')

    expect(confirmEmail).toBeDefined()
    expect(confirmEmail?.subject).toBe("You're on the list for The Tuning Fork I")
    expect(confirmEmail?.from).toBe('ID8Labs Workshops <hello@id8labs.tech>')

    expect(contactCreated).toBe(true)
  })

  it('returns 400 when required fields are missing', async () => {
    const response = await POST(createRequest({ name: 'No Email', workshopSlug: 'the-tuning-fork' }))
    const data = await response.json()
    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing required fields')
  })

  it('returns 400 for an invalid email', async () => {
    const response = await POST(createRequest({ ...validPayload, email: 'not-an-email' }))
    const data = await response.json()
    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid email format')
  })

  it('returns 400 for an unknown workshop', async () => {
    const response = await POST(createRequest({ ...validPayload, workshopSlug: 'does-not-exist' }))
    const data = await response.json()
    expect(response.status).toBe(400)
    expect(data.error).toBe('Unknown workshop')
  })

  it('still succeeds when audience contact creation fails', async () => {
    server.use(
      http.post('https://api.resend.com/audiences/*/contacts', () =>
        HttpResponse.json({ error: { message: 'Contact already exists' } }, { status: 400 })
      )
    )

    const response = await POST(createRequest(validPayload))
    expect(response.status).toBe(200)
  })

  it('returns 500 when the confirmation email fails to send', async () => {
    server.use(
      http.post('https://api.resend.com/emails', () =>
        HttpResponse.json({ error: { message: 'Email sending failed' } }, { status: 500 })
      )
    )

    const response = await POST(createRequest(validPayload))
    const data = await response.json()
    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to send email')
  })

  it('handles malformed JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/workshops', {
      method: 'POST',
      body: 'invalid json {',
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await POST(request)
    const data = await response.json()
    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
  })
})
