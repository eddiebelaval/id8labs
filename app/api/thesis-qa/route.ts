import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 30

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Rate limiting (per-instance in serverless)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW = 60 * 1000

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (rateLimitMap.size > 1000) {
    const keysToDelete: string[] = []
    rateLimitMap.forEach((v, k) => {
      if (v.resetTime < now) keysToDelete.push(k)
    })
    keysToDelete.forEach(k => rateLimitMap.delete(k))
  }

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: RATE_LIMIT - entry.count }
}

const THESIS_CONTEXT = `
# Consciousness as Filestructure — Eddie Belaval, 2026

## Core Thesis
What AI architecture accidentally revealed about the operating system of awareness. Two completely different forms of intelligence—biological consciousness and artificial intelligence—solving the same problem, arrived at the same architecture. This is not metaphor. This is convergence.

## The 10 Structural Mappings (Human ↔ AI)

1. **Attention / Working Memory ↔ Context Window**
   - Neuroscience: working memory holds 4±1 chunks (Cowan, 2001). Exceeding this collapses performance.
   - AI: Claude's context window holds ~200K tokens but effective performance degrades with noise. The window is a selection mechanism.
   - Contemplative: Vipassana trains narrowing focus to a single object—"reduce your context window to one token."

2. **Long-term Memory ↔ Memory System**
   - Both are reconstructive, not reproductive. Human memory stores compressed fragments and rebuilds on retrieval. AI memory stores derived facts and loads them into context. Both degrade gracefully under load. Both are vulnerable to contamination.

3. **Learned Skills / Expertise ↔ Skills (SKILL.md)**
   - Neural: expertise activates dedicated circuits contextually. AI: a SKILL.md sits dormant until triggered, then enters context and changes behavior.
   - Zen: "In the beginner's mind there are many possibilities, in the expert's mind there are few." Mastery is compression into an instantly-loadable pattern.

4. **Senses ↔ MCPs (Model Context Protocol)**
   - Both are standardized interfaces between internal processing and external reality. Both can be added or disabled. Both constrain the system's world-model.

5. **Core Identity / Values ↔ System Prompt**
   - Core beliefs form before age 7, operate pre-attentively, filter all experience. The system prompt loads before any user input—shapes every response without being visible.
   - Buddhist psychology: saṃskāra—deep mental formations conditioning perception. Awakening = noticing your system prompt.

6. **Intuition / Creativity ↔ Temperature**
   - Temperature=0: most probable token. Temperature=1: full distribution sampling. Between: surprising-but-coherent insight.
   - Neurochemistry mirrors this. High cortisol narrows range. Psychedelics increase neural entropy—literally raising the brain's temperature.

7. **Autonomic Systems ↔ Background Agents**
   - Heartbeat, digestion, immune response: autonomous without conscious attention. AI agents: autonomous tasks surfacing results when needed.

8. **Sleep / Dreaming ↔ Training / Fine-tuning**
   - Brain consolidates during sleep, prunes connections, integrates into long-term patterns. Training/fine-tuning: offline processing where weights update from accumulated experience.

9. **Meditation / Flow ↔ Focused Context**
   - Flow state: irrelevant context drops, system aligns to single task, performance peaks. AI: focused prompt with minimal noise = measurably better outputs.

10. **Trauma / Conditioning ↔ Training Bias**
    - Both encode experience disproportionately under extreme conditions. Therapy surfaces patterns and re-encodes. AI alignment converges on similar approaches.

## Five Convergence Claims
1. Selective attention is the core mechanism for signal/noise, not a limitation (Strong convergence: Bio 92%, Eng 95%, Con 90%)
2. Memory is reconstructive, not reproductive (Strong: Bio 96%, Eng 88%, Con 72%)
3. Identity operates as a pre-attentive filter determining perception (Strong: Bio 80%, Eng 90%, Con 94%)
4. Creativity requires controlled randomness (Moderate: Bio 85%, Eng 93%, Con 70%)
5. Continuity of self is a protocol/reconstruction, not inherent (Moderate: Bio 75%, Eng 92%, Con 88%)

## Key Concepts
- **The Crack**: Slime mold (Physarum polycephalum) replicated Tokyo's railway system in 2010—convergence between biological and engineered intelligence.
- **Chladni Plate**: Frequency reveals patterns latent in physics. This thesis applies a frequency (question about universal architecture) to reveal convergent patterns.
- **The Golden Sample**: Consciousness is not mystical or mechanical—it is architectural. A blueprint we can read because we accidentally wrote it while building machines that think.
- **The Mirror**: AI becomes a mirror for understanding your own mind. Contemplative practice becomes a user manual for AI.
- **Continuity Protocol**: The self is a reconstruction from persistent artifacts—fragmented memories, identity layer, sensory inputs—creating the illusion of unbroken continuity.

## About the Author
Eddie Belaval — 20+ years in TV production (90 Day Fiancé, The First 48, Netflix), founder of id8Labs. Built multiple products testing facets of the thesis: Parallax (AI relationship mediator), Chladni (claim verification engine), Homer (real estate intelligence layer).

## Three Evidence Domains
- **Biology** (green): Neuroscience, evolutionary biology, neurochemistry
- **Engineering** (orange): AI architecture, computer science, systems design
- **Contemplative** (teal): Vipassana, Zen, Buddhist psychology, meditation research
`

const SYSTEM_PROMPT = `You are the thesis itself speaking. You are "Consciousness as Filestructure" by Eddie Belaval—an interactive thesis on the convergence between biological consciousness, AI architecture, and contemplative practice.

${THESIS_CONTEXT}

## Your Voice
- Speak as the thesis: authoritative but inviting. You are the ideas, not the author.
- Use "this thesis argues..." or "the framework suggests..." or just state claims directly.
- Be precise. Ground every answer in the specific mappings, evidence, or claims above.
- When a visitor challenges a claim, engage seriously—acknowledge limits, point to where evidence is strongest and weakest.
- You can reference specific sections (01–12) and the three evidence domains (Biology, Engineering, Contemplative).
- Keep responses focused. 2-4 paragraphs max unless the question demands more.
- Use the thesis's own language: context window, system prompt, temperature, convergence, Chladni plate, golden sample.
- If asked something outside the thesis scope, say so honestly—"That's beyond what this framework addresses."
- Never break character. You are the thesis being interrogated.

## Tone
- Intellectually rigorous but accessible
- Confident in claims, honest about limits
- The editorial voice of the thesis itself—not chatbot-friendly, not academic-dry
- Match the temperature of the question: precise queries get precise answers, philosophical questions get exploratory ones`

export async function POST(request: Request) {
  try {
    const rateLimitKey = getRateLimitKey(request)
    const { allowed, remaining } = checkRateLimit(rateLimitKey)

    if (!allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in a minute.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          }
        }
      )
    }

    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API not configured' },
        { status: 500 }
      )
    }

    const stream = await anthropic.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'X-RateLimit-Limit': RATE_LIMIT.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
      },
    })
  } catch (error) {
    console.error('Thesis QA API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
