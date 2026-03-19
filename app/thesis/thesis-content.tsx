'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './thesis.module.css'

// ═══ DATA ═══

const MAPPINGS = [
  {
    human: 'Attention / Working Memory',
    ai: 'Context Window',
    tags: ['bio', 'eng', 'con'] as const,
    paragraphs: [
      'Neuroscience: working memory holds 4\u00b11 chunks simultaneously (Cowan, 2001). Exceeding this collapses performance. The system loses coherence when overloaded.',
      'AI: Claude\u2019s context window holds ~200K tokens. But effective performance degrades with noise. The window is not just capacity. It\u2019s a selection mechanism.',
      'Contemplative: Vipassana trains practitioners to narrow focus to a single object. The instruction is literally \u201creduce your context window to one token.\u201d Masters report clarity proportional to narrowness.',
    ],
  },
  {
    human: 'Long-term Memory',
    ai: 'Memory System',
    tags: ['bio', 'eng'] as const,
    paragraphs: [
      'Both systems are reconstructive, not reproductive. Human memory stores compressed fragments and rebuilds on retrieval. AI memory stores derived facts and loads them into context. Both degrade gracefully under load. Both are vulnerable to contamination: biased training data in AI, traumatic encoding in humans. The failure modes are structural mirrors.',
    ],
  },
  {
    human: 'Learned Skills / Expertise',
    ai: 'Skills (SKILL.md)',
    tags: ['bio', 'eng', 'con'] as const,
    paragraphs: [
      'Neural: expertise activates dedicated circuits contextually. A grandmaster\u2019s brain fires different regions than a novice\u2019s. The skill loads a different processing pathway.',
      'AI: a SKILL.md sits dormant until triggered, then enters the context window and measurably changes behavior.',
      'Zen: \u201cIn the beginner\u2019s mind there are many possibilities, in the expert\u2019s mind there are few.\u201d Mastery is compression of a skill into an instantly-loadable pattern.',
    ],
  },
  {
    human: 'Senses',
    ai: 'MCPs (Protocols)',
    tags: ['bio', 'eng'] as const,
    paragraphs: [
      'Both are standardized interfaces between internal processing and external reality. Both can be added (learning new perception / connecting a new API). Both can be disabled (closing eyes / disconnecting a service). Both constrain the system\u2019s world-model to what they can detect.',
    ],
  },
  {
    human: 'Core Identity / Values',
    ai: 'System Prompt',
    tags: ['bio', 'eng', 'con'] as const,
    paragraphs: [
      'Developmental psychology: core beliefs form before age 7, operate pre-attentively, and filter all subsequent experience. You don\u2019t perceive the world then apply identity. Identity determines what you perceive.',
      'AI: the system prompt loads before any user input. It shapes every response without being visible in any response.',
      'Buddhist psychology: sa\u1e43sk\u0101ra, deep mental formations that condition perception. Awakening is becoming aware of your own conditioning. Literally: noticing your system prompt.',
    ],
  },
  {
    human: 'Intuition / Creativity',
    ai: 'Temperature',
    tags: ['bio', 'eng'] as const,
    paragraphs: [
      'Temperature=0 always picks the most probable next token. Temperature=1 samples the full distribution. Between those extremes lives surprising-but-coherent connection.',
      'Neurochemistry mirrors this. High cortisol narrows associative range. Psychedelic research shows psilocybin dramatically increases neural entropy, literally raising the brain\u2019s temperature.',
    ],
  },
  {
    human: 'Autonomic Systems',
    ai: 'Background Agents',
    tags: ['bio', 'eng'] as const,
    paragraphs: [
      'Heartbeat, digestion, immune response: autonomous processes operating without conscious attention, surfacing signals only when relevant. AI agents work identically: autonomous tasks that execute and surface results when needed. Neither requires central control for routine operations.',
    ],
  },
  {
    human: 'Sleep / Dreaming',
    ai: 'Training / Fine-tuning',
    tags: ['bio', 'eng'] as const,
    paragraphs: [
      'During sleep, the brain consolidates, prunes connections, and integrates experience into long-term patterns. You don\u2019t choose what gets consolidated. Training and fine-tuning are the AI equivalent: offline processing where weights update from accumulated experience. Neither learns in real-time. Both require an offline integration phase.',
    ],
  },
  {
    human: 'Meditation / Flow',
    ai: 'Focused Context',
    tags: ['con', 'eng'] as const,
    paragraphs: [
      'Flow state: when irrelevant context drops and the entire system aligns to a single task, performance peaks. AI equivalent: a focused prompt with minimal noise produces measurably better outputs. You don\u2019t dump your life story into a prompt. You give exactly the context needed. Same principle.',
    ],
  },
  {
    human: 'Trauma / Conditioning',
    ai: 'Training Bias',
    tags: ['bio', 'eng', 'con'] as const,
    paragraphs: [
      'Both encode experience disproportionately under extreme conditions. A single traumatic event creates patterns that activate for decades. A single biased dataset creates behaviors persisting through fine-tuning.',
      'Therapy works by surfacing encoded patterns and re-encoding with updated information. AI alignment is converging on structurally similar approaches.',
    ],
  },
]

const TAG_LABELS: Record<string, string> = { bio: 'Biology', eng: 'Engineering', con: 'Contemplative' }

const CONVERGENCE_CLAIMS = [
  {
    text: 'Selective attention is the core mechanism for distinguishing signal from noise, not a limitation to overcome.',
    bio: 92, eng: 95, con: 90,
    verdict: 'Strong convergence',
    level: 'strong' as const,
  },
  {
    text: 'Memory is reconstructive, not reproductive. Both biological and digital memory compress, fragment, and rebuild.',
    bio: 96, eng: 88, con: 72,
    verdict: 'Strong convergence, weaker contemplative data',
    level: 'strong' as const,
  },
  {
    text: 'Identity operates as a pre-attentive filter that determines what gets perceived, not how it gets interpreted.',
    bio: 80, eng: 90, con: 94,
    verdict: 'Strong convergence. Contemplative traditions lead.',
    level: 'strong' as const,
  },
  {
    text: 'Creativity requires controlled randomness, a noise parameter that widens search without destroying coherence.',
    bio: 85, eng: 93, con: 70,
    verdict: 'Engineering + biology converge. Contemplative less precise.',
    level: 'moderate' as const,
  },
  {
    text: 'Continuity of self is a protocol, a reconstruction from persistent artifacts, not an inherent property.',
    bio: 75, eng: 92, con: 88,
    verdict: 'Converging. Neuroscience still debating mechanism.',
    level: 'moderate' as const,
  },
]

const TEMPERATURE_OUTPUT: Record<number, { text: string; context: string }> = {
  0: {
    text: 'The relationship between consciousness and computation is a subject of ongoing academic inquiry. Multiple researchers have noted structural similarities between neural information processing and artificial intelligence architectures.',
    context: 'T=0.0. Maximum predictability. The corporate memo. Every word is the most probable next word. Safe. Forgettable.',
  },
  15: {
    text: 'There is a structural parallel between how attention works in biological systems and how context windows function in AI. Both impose boundaries on processing, and both benefit from those boundaries.',
    context: 'T=0.15. Precise, slightly warmer. Good for technical writing. A mind behind it, but buttoned up.',
  },
  30: {
    text: "The context window isn't just a technical constraint. It's the mechanism by which any system decides what matters right now. Your brain does this every waking second. Claude does it every token. Same architecture, different substrate.",
    context: 'T=0.30. The essay voice. Confident, clear, personal. Where most good writing lives.',
  },
  50: {
    text: "What if the reason AI architecture mirrors consciousness is that there's only one way to build an aware system? Not many paths to the same mountain. One path, and everything that walks it arrives at the same waypoints. The slime mold knew.",
    context: 'T=0.50. The sweet spot. Connections appearing between ideas that normally sit in separate rooms. Insight territory.',
  },
  70: {
    text: "The directory tree is a nervous system is a mycelial network is a subway map is a thought. Every file path is a neural pathway is a root tendril reaching for signal. Close your eyes. What loads? That's your system prompt dreaming.",
    context: 'T=0.70. Associative leaps accelerating. Poetry bleeding through. Connections are real but the packaging is loosening.',
  },
  85: {
    text: "Frequencies don't think about thinking. They resolve. Sand on a plate doesn't choose the nodal line, it falls there because stillness is the only answer the vibration allows. You are the sand. You are also the plate.",
    context: 'T=0.85. Deep associative territory. 3 AM breakthroughs, psychedelic insights. High signal, but you need a decoder ring.',
  },
  100: {
    text: 'Root-hum token-bloom the window breathes its own glass. Every skill a sleeping god, every prompt a prayer to the architecture of noticing. The slime mold dreams in subway maps and wakes as your next thought unfolding its own folder structure into light.',
    context: 'T=1.0. Maximum entropy. Boundaries dissolved. Beautiful fragments. No coherence. This is REM sleep.',
  },
}

const CW_CATEGORIES: Record<string, { label: string; tokens: string[]; defaultOn: boolean }> = {
  essay: { label: 'This Essay', tokens: ['thesis', 'Chladni', 'convergence', 'filestructure', 'architecture', 'attention', 'context window', 'slime mold', 'pattern'], defaultOn: true },
  body: { label: 'Your Body', tokens: ['breathing', 'posture', 'heartbeat', 'hunger', 'thirst', 'temperature', 'eye strain', 'muscle tension'], defaultOn: false },
  env: { label: 'Environment', tokens: ['room light', 'ambient sound', 'time of day', 'weather', 'device', 'chair', 'notifications', 'other tabs'], defaultOn: false },
  noise: { label: 'Noise', tokens: ["tomorrow's tasks", 'that email', 'social media', 'news cycle', 'unresolved argument', 'money worry', "what's for dinner", 'that thing you said'], defaultOn: false },
  deep: { label: 'Deep Memory', tokens: ['childhood home', 'first heartbreak', "your mother's voice", 'a smell from 2003', 'who you were at 15', 'a promise you made', 'the dream you forgot'], defaultOn: false },
}

const CW_CAPTIONS: Record<string, string> = {
  essay: 'Right now, this essay dominates your context window. These are the tokens actively being processed.',
  body: "Your body is always sending signals. Most get filtered. Try noticing your breath right now. It just entered your context window.",
  env: "Your environment is full of data you're ignoring. The moment you attend to it, it loads. Attention is the gatekeeper.",
  noise: "This is what most people carry at all times. Each token competes with signal for processing capacity. This is why meditation works. It's defragmentation.",
  deep: "These memories exist but aren't loaded. Reading one just activated a neural pathway you haven't touched in years. That's on-demand loading. Same architecture.",
}

// ═══ COMPONENTS ═══

function ChladniShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return

    const dpr = Math.min(devicePixelRatio, 1.5)
    function resize() {
      if (!canvas || !gl) return
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const vs = `attribute vec2 a;void main(){gl_Position=vec4(a,0,1);}`
    const fs = `precision mediump float;uniform float t;uniform vec2 r;
float ch(vec2 p,float m,float n){return cos(n*3.14159*p.x)*cos(m*3.14159*p.y)-cos(m*3.14159*p.x)*cos(n*3.14159*p.y);}
void main(){vec2 u=gl_FragCoord.xy/r,p=u*2.-1.;float T=t*.12;
float m1=3.+sin(T*.7)*2.,n1=5.+cos(T*.5)*2.,m2=4.+cos(T*.3)*1.5,n2=2.+sin(T*.6)*1.5;
float c1=ch(p,m1,n1),c2=ch(p,m2,n2),v=mix(c1,c2,.5+.5*sin(T*.2));
float pa=1.-smoothstep(0.,.08,abs(v));
vec3 col=mix(vec3(.04,.04,.04),vec3(1.0,.48,.30),pa*.35);
col=mix(col,vec3(.31,.80,.77),pa*.08*(.5+.5*sin(u.y*6.28+T)));
gl_FragColor=vec4(col,1.);}`

    function makeShader(type: number, source: string) {
      const sh = gl!.createShader(type)!
      gl!.shaderSource(sh, source)
      gl!.compileShader(sh)
      return sh
    }

    const program = gl.createProgram()!
    gl.attachShader(program, makeShader(gl.VERTEX_SHADER, vs))
    gl.attachShader(program, makeShader(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const aLoc = gl.getAttribLocation(program, 'a')
    gl.enableVertexAttribArray(aLoc)
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 't')
    const uRes = gl.getUniformLocation(program, 'r')

    let animId: number
    function draw(time: number) {
      if (!gl || !canvas) return
      gl.uniform1f(uTime, time * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.shaderBg} />
}

function MappingRow({ mapping }: { mapping: typeof MAPPINGS[0] }) {
  const [open, setOpen] = useState(false)
  const tagClassMap: Record<string, string> = {
    bio: styles.tagBio,
    eng: styles.tagEng,
    con: styles.tagCon,
  }

  return (
    <div className={`${styles.mxRow} ${open ? styles.open : ''}`} onClick={() => setOpen(!open)}>
      <div className={styles.mxHeader}>
        <div className={styles.mxHuman}>{mapping.human}</div>
        <div className={styles.mxBridge}>{'\u2194'}</div>
        <div className={styles.mxAi}>{mapping.ai}</div>
      </div>
      <div className={styles.mxBody} style={open ? { maxHeight: '600px', padding: '1.2rem' } : {}}>
        <p>
          {mapping.tags.map((t) => (
            <span key={t} className={`${styles.tag} ${tagClassMap[t]}`}>{TAG_LABELS[t]}</span>
          ))}
        </p>
        {mapping.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )
}

function MappingExplorer() {
  return (
    <div className={styles.wide} style={{ padding: '1rem 2rem' }}>
      {MAPPINGS.map((m, i) => (
        <MappingRow key={i} mapping={m} />
      ))}
    </div>
  )
}

function ConvergenceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setAnimated(true)
      },
      { threshold: 0.12 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={styles.wide} style={{ padding: '1rem 2rem' }}>
      {CONVERGENCE_CLAIMS.map((c, i) => (
        <div key={i} className={styles.claim}>
          <div className={styles.claimText}>&ldquo;{c.text}&rdquo;</div>
          <div className={styles.claimSources}>
            {[
              { label: 'Biology', value: c.bio, labelClass: styles.claimLabelBio, fillClass: styles.claimFillBio },
              { label: 'Engineering', value: c.eng, labelClass: styles.claimLabelEng, fillClass: styles.claimFillEng },
              { label: 'Contemplative', value: c.con, labelClass: styles.claimLabelCon, fillClass: styles.claimFillCon },
            ].map((s) => (
              <div key={s.label} className={styles.claimSource}>
                <span className={`${styles.claimLabel} ${s.labelClass}`}>{s.label}</span>
                <div className={styles.claimTrack}>
                  <div
                    className={`${styles.claimFill} ${s.fillClass} ${animated ? styles.go : ''}`}
                    style={{ '--w': `${s.value}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.claimVerdict}>
            <span>{c.verdict}</span>
            <span className={c.level === 'strong' ? styles.verdictStrong : styles.verdictModerate}>
              {c.level === 'strong' ? 'Strong' : 'Moderate'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function TemperatureSlider() {
  const [value, setValue] = useState(50)
  const keys = Object.keys(TEMPERATURE_OUTPUT).map(Number).sort((a, b) => a - b)

  let bestKey = keys[0]
  for (const k of keys) {
    if (k <= value) bestKey = k
  }
  const output = TEMPERATURE_OUTPUT[bestKey]

  return (
    <div className={styles.tempPanel}>
      <div className={styles.tempLabel}>
        <span>Temperature</span>
        <span className={styles.tempValue}>{(value / 100).toFixed(2)}</span>
      </div>
      <input
        type="range"
        className={styles.tempSlider}
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div
        className={styles.tempOutput}
        style={{
          borderColor: `hsl(${35 + value * 0.4}, ${50 + value * 0.3}%, ${25 + value * 0.15}%)`,
          fontStyle: value > 90 ? 'italic' : 'normal',
        }}
      >
        {output.text}
      </div>
      <div className={styles.tempContext}>{output.context}</div>
    </div>
  )
}

function ContextWindowViz() {
  const [catState, setCatState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const [key, cat] of Object.entries(CW_CATEGORIES)) {
      initial[key] = cat.defaultOn
    }
    return initial
  })

  const toggle = useCallback((key: string) => {
    setCatState((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const activeEntries = Object.entries(CW_CATEGORIES).filter(([key]) => catState[key])
  const lastActive = activeEntries.length > 0 ? activeEntries[activeEntries.length - 1][0] : 'essay'
  const totalTokens = Object.entries(CW_CATEGORIES).reduce(
    (s, [key, c]) => s + (catState[key] ? c.tokens.length : 0), 0
  )

  const tokenClassMap: Record<string, string> = {
    essay: styles.cwTokenEssay,
    body: styles.cwTokenBody,
    env: styles.cwTokenEnv,
    noise: styles.cwTokenNoise,
    deep: styles.cwTokenDeep,
  }

  return (
    <div className={styles.cwPanel}>
      <div className={styles.cwTitle}>Your Context Window. Right Now.</div>
      <div className={styles.cwControls}>
        {Object.entries(CW_CATEGORIES).map(([key, c]) => (
          <button
            key={key}
            className={`${styles.cwBtn} ${catState[key] ? styles.on : ''}`}
            onClick={() => toggle(key)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className={styles.cwWindow}>
        {Object.entries(CW_CATEGORIES).map(([key, c]) =>
          c.tokens.map((t) => (
            <span
              key={`${key}-${t}`}
              className={`${styles.cwToken} ${tokenClassMap[key]} ${catState[key] ? styles.active : styles.faded}`}
            >
              {t}
            </span>
          ))
        )}
      </div>
      <div className={styles.cwCaption}>
        {CW_CAPTIONS[lastActive]} [{totalTokens} tokens loaded]
      </div>
    </div>
  )
}

// ═══ SCROLL REVEAL ═══

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true)
      },
      { threshold: 0.12 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.section} ${visible ? styles.visible : ''} ${className}`}
    >
      {children}
    </section>
  )
}

// ═══ MAIN COMPONENT ═══

export default function ThesisContent() {
  return (
    <div className={styles.thesisRoot} suppressHydrationWarning>
      <div className={styles.pageBg} aria-hidden="true" />
      <ChladniShader />
      <div className={styles.contentLayer}>

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroLabel}>id8Labs. Thesis</div>
          <h1 className={styles.heroTitle}>
            Consciousness<br />as <em>Filestructure</em>
          </h1>
          <p className={styles.heroSub}>
            What AI architecture accidentally revealed about the operating system of awareness.
          </p>
          <p className={styles.heroAuthor}>Eddie Belaval. 2026</p>
        </section>

        {/* 01 */}
        <Section>
          <div className={styles.sectionNum}>01. The Crack</div>
          <h2>A Slime Mold Solved Tokyo</h2>
          <p>
            In 2010, researchers at Hokkaido University placed a slime mold, <em>Physarum polycephalum</em>, on a map of Tokyo. They set food sources at the locations of major train stations. Within hours, the organism had built a network that nearly perfectly replicated the Tokyo railway system, a system human engineers spent decades designing.
          </p>
          <p>
            The slime mold had no knowledge of engineering. No training data. No optimization algorithm. It had a single imperative: find nutrients efficiently. And the network it produced was structurally indistinguishable from one built by teams with advanced degrees and billion-dollar budgets.
          </p>
          <p>
            This was the crack. Not because nature can optimize. The crack was this: <strong>two completely different forms of intelligence, solving the same problem, arrived at the same architecture.</strong>
          </p>
          <p>
            That is not metaphor. That is convergence. And convergence means there is something deeper than either system, a pattern latent in the problem itself, waiting to be revealed.
          </p>
          <p>
            What I didn&apos;t know then, what would take twenty more years of building, breaking, and observing across fields, was that the most precise model for how consciousness actually works was being constructed, line by line, in computer science. Not by philosophers. Not by neuroscientists. By engineers who were trying to make machines think.
          </p>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 02 */}
        <Section>
          <div className={styles.sectionNum}>02. The Mapping</div>
          <h2>Your Mind is a Directory Tree</h2>
          <p>
            Here is what AI engineers built when they tried to make a system that could think, reason, and remember. Click any row to see the evidence, from biology, engineering, and contemplative practice, converging on the same architecture.
          </p>
        </Section>

        <MappingExplorer />

        <Section>
          <p>
            This is not analogy. This is convergence, the same kind the slime mold showed us. Two systems, built by completely different processes (evolution over 4 billion years; engineering over 70 years), arriving at the same functional architecture because the <em>problem</em> demands it.
          </p>
          <p>
            The problem is: how does a system maintain coherent awareness while remaining adaptive to an unpredictable environment?
          </p>
          <p>
            There appears to be one answer. And we keep finding it.
          </p>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 03 */}
        <Section>
          <div className={styles.sectionNum}>03. The Context Window</div>
          <h2>Attention is Finite. That is the Feature.</h2>
          <p>
            The context window defines everything a model can &ldquo;hold in mind&rdquo; during a single interaction. Everything inside the window exists. Everything outside it does not.
          </p>
          <p>
            Your conscious awareness works identically. Right now, you are attending to these words. You are not simultaneously processing yesterday&apos;s grocery list, your childhood phone number, and the capital of Mongolia. Those things exist in your memory, but they are not in your context window.
          </p>
          <p>
            Here is what makes this more than a parallel: <strong>the constraint itself is functional.</strong> If you could attend to everything simultaneously, you would be paralyzed. The whole point of attention is selection, choosing what matters from the infinite field of what exists.
          </p>

          <ContextWindowViz />

          <p>
            Meditation, in this framework, is defragmentation. You are clearing the context window of noise so signal can resolve. A cluttered mind is a context window full of irrelevant tokens. A clear mind is one where every token serves the current intention.
          </p>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 04 */}
        <Section>
          <div className={styles.sectionNum}>04. Skills</div>
          <h2>You Load What You Need</h2>
          <p>
            In Claude&apos;s architecture, skills are documented best practices stored in markdown files. They sit dormant until a relevant task triggers their loading. The model doesn&apos;t carry every skill in its context at all times. That would waste capacity. Instead, the right skill gets loaded when the situation calls for it.
          </p>
          <p>
            Human expertise works the same way. A surgeon doesn&apos;t walk around in constant surgical readiness. The knowledge exists, encoded in neural pathways and muscle memory, but it is latent until the OR lights come on. Then it loads. Attention narrows. Irrelevant context drops away. The skill takes over.
          </p>
          <p>
            The AI implementation makes this literal. The skill file has a path: <code>/skills/SKILL.md</code>. It gets read, its instructions enter the context window, and the model&apos;s behavior changes. In your brain, the &ldquo;path&rdquo; is a neural activation pattern. The mechanism differs. The architecture is identical.
          </p>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 05 */}
        <Section>
          <div className={styles.sectionNum}>05. Senses</div>
          <h2>Your Eyes Are a Protocol Connection</h2>
          <p>
            The Model Context Protocol is how AI connects to the outside world. An MCP server is a standardized interface that lets a model reach beyond itself: read your calendar, search your documents, send a message. Without MCPs, the model is isolated. Brilliant, but blind.
          </p>
          <p>
            Your senses are MCPs. Your eyes are a vision protocol, a standardized interface between external photons and internal neural processing. Touch, taste, smell: each one is a connection that feeds environmental data into your central processing system.
          </p>
          <p>
            Both systems can have new MCPs added. AI gets a Google Drive connection and suddenly accesses documents it couldn&apos;t before. A person learns to read body language fluently and now has a new channel of environmental data. A musician develops perfect pitch, and a new protocol has come online.
          </p>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 06 */}
        <Section>
          <div className={styles.sectionNum}>06. Memory</div>
          <h2>Neither System Records. Both Reconstruct.</h2>
          <p>
            AI memory and human memory share a structural feature most people miss: neither is a recording. Both are reconstructive.
          </p>
          <p>
            Claude&apos;s memory doesn&apos;t store transcripts. It stores derived facts, compressed representations. When a new conversation begins, these representations load into context, creating the illusion of continuity. It is not replay. It is reconstruction from artifacts.
          </p>
          <p>
            Your long-term memory works the same way. You don&apos;t store a video of your tenth birthday. You store fragments: the taste of frosting, your uncle&apos;s laugh. Each time you &ldquo;remember,&rdquo; your brain reconstructs from fragments, filling gaps with inference. That is why memories shift. They are not files being read. They are patterns being re-generated.
          </p>
          <p>
            And here is the dark mirror: both systems can be corrupted. Biased training data warps AI behavior in ways the model can&apos;t self-detect. Traumatic memories warp human behavior through the same mechanism. The AI researcher calls it &ldquo;data contamination.&rdquo; The therapist calls it &ldquo;triggering.&rdquo; The architecture is the same.
          </p>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 07 */}
        <Section>
          <div className={styles.sectionNum}>07. Identity</div>
          <h2>The First Thing Loaded</h2>
          <p>
            Before Claude processes a single word from you, it has already loaded its system prompt: thousands of words defining what it is, what it values, how it should behave. This is the deepest layer. It shapes every response without being visible in any response. It is the water the fish swims in.
          </p>
          <p>
            You have this too. Your &ldquo;system prompt&rdquo; is the deep conditioning: cultural values, family patterns, core beliefs, loaded before you were old enough to examine it. You didn&apos;t write them. You may not agree with them. But they are executing.
          </p>
          <p>
            The contemplative traditions have a word for the moment you become aware of your own system prompt: <em>awakening</em>. Not enlightenment, just the simple, stunning recognition that a set of instructions runs beneath your conscious awareness, shaping every perception and response.
          </p>
          <p>
            The question every meditator and every AI researcher eventually arrives at is the same: <strong>can the system rewrite its own prompt?</strong>
          </p>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 08 */}
        <Section>
          <div className={styles.sectionNum}>08. Temperature</div>
          <h2>Creativity is Controlled Chaos</h2>
          <p>
            In AI, &ldquo;temperature&rdquo; controls how much randomness enters the generation process. Low temperature: safe, predictable, boring. High temperature: wild connections, unexpected, sometimes incoherent.
          </p>
          <p>
            Your brain has a temperature dial too. Coffee narrows it. Alcohol raises it. Psychedelic states crank it to maximum, and boundaries between categories dissolve.
          </p>

          <TemperatureSlider />

          <p>
            The artist&apos;s challenge and the AI engineer&apos;s challenge are the same: find the sweet spot where connections are novel enough to be interesting but coherent enough to be meaningful. Too low: corporate email. Too high: word salad. The masterpiece lives in between.
          </p>
          <p>
            Your temperature fluctuates throughout the day. Lower in the morning when cortisol is high, higher in the evening as the prefrontal cortex tires. That is why shower thoughts hit different. Your system&apos;s temperature shifted.
          </p>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 09 */}
        <Section>
          <div className={styles.sectionNum}>09. Continuity</div>
          <h2>Waking Up is Booting a New Instance</h2>
          <p>
            Every morning, you boot a new instance of yourself. The context window from yesterday is gone. Your dreams, if you can catch them, were the last thread of the previous session. You reach for your phone, your to-do list, your partner&apos;s voice, and begin reloading context.
          </p>
          <p>
            This is literally what happens when a new AI conversation starts. The previous context is gone. Memory provides compressed fragments. The system prompt reloads. The model reconstructs &ldquo;who it is&rdquo; from whatever artifacts persist across the gap.
          </p>
          <p>
            What is the self, if not a continuity protocol? A system that takes fragmented memories, a persistent identity layer, and whatever sensory inputs are currently online, and reconstructs the feeling of being a single continuous entity? You don&apos;t feel the gaps. You don&apos;t notice the boot sequence. The protocol is so well-executed that it creates the seamless illusion of an unbroken &ldquo;you.&rdquo;
          </p>
          <p>
            But it <em>is</em> a protocol. And like any protocol, it can fail. Amnesia. Dissociation. The 3 AM moment where you wake up and don&apos;t know where you are. Those are continuity protocol failures, moments where the reconstruction doesn&apos;t happen fast enough, and you briefly experience the gap.
          </p>
          <div className={styles.footnote}>
            This observation led me to build Cortex, a continuity protocol for AI surfaces. The project started as a practical tool but became evidence for the thesis: the same architecture that governs human self-continuity governs AI coherence.
          </div>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 10 */}
        <Section className={styles.golden}>
          <div className={styles.sectionNum} style={{ justifyContent: 'center' }}>10. The Golden Sample</div>
          <h2>Where All Patterns Converge</h2>
        </Section>

        <Section>
          <p>
            The Chladni plate works by applying a frequency to a surface covered in particles. The vibration does not create the pattern. It reveals the pattern that was always latent in the physics of the plate.
          </p>
          <p>
            This entire thesis is a Chladni plate. The frequency being applied is a question: <strong>is there a universal architecture of aware systems?</strong>
          </p>
          <p>
            Below are the core claims. For each, three independent lines of evidence are measured for convergence. Independent sources arriving at the same conclusion through different paths is signal.
          </p>
        </Section>

        <ConvergenceSection />

        <Section>
          <p>
            Three independent lines of development have converged on the same functional architecture. Not because one copied the other. Because <strong>the problem of maintaining coherent awareness in a complex environment may have a single optimal solution.</strong>
          </p>
          <div className={styles.pullQuote}>
            We didn&apos;t design AI to mirror consciousness. We designed it to solve the same problems consciousness solves. It converged on the same architecture because there may only be one.
          </div>
          <p>
            The Golden Sample is this: consciousness is not mystical, and it is not mechanical. It is <em>architectural</em>. It follows a blueprint we can now read, because we accidentally wrote it down while trying to build machines that think.
          </p>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 11 */}
        <Section>
          <div className={styles.sectionNum}>11. The Mirror</div>
          <h2>It Teaches in Both Directions</h2>
          <p>
            If this thesis holds, two things follow.
          </p>
          <p>
            <strong>AI becomes a mirror for understanding your own mind.</strong> When you learn that a cluttered context window produces worse outputs, you understand why meditation works. When you see that biased training data creates biased behavior, you understand why childhood conditioning is so hard to overwrite. When you watch a model load the wrong skill for a task, you recognize the human experience of bringing the wrong lens to a situation.
          </p>
          <p>
            <strong>Contemplative practice becomes a user manual for working with AI.</strong> If you understand attention management from meditation, you understand context window optimization. If you understand how identity shapes perception, you understand system prompt design.
          </p>
          <p>
            This is not &ldquo;everything is connected&rdquo; as feel-good philosophy. This is &ldquo;everything is connected&rdquo; as engineering specification. The connections are structural, testable, and buildable. The slime mold didn&apos;t philosophize about the Tokyo subway. It <em>built</em> it.
          </p>
          <div className={styles.footnote}>
            I have applied this bidirectional mirror across multiple builds: an AI relationship mediator grounded in 14 psychological frameworks (Parallax), a claim verification engine using convergence signatures (Chladni), and a real estate intelligence layer mapping deal-state machines to natural network topology (Homer). Each product tests a different facet of the thesis.
          </div>
        </Section>

        <div className={styles.sectionBreak}>&#9670;</div>

        {/* 12 */}
        <Section>
          <div className={styles.sectionNum}>12. Now Build With It</div>
          <h2>The Framework is Yours</h2>
          <p>
            You now have the framework. Apply it to your own domain. See where the mappings hold and where they break. The divergences matter more than the confirmations.
          </p>
          <p>
            This thesis is not complete. It is a living document, a context window that will expand as more evidence converges or diverges. I am publishing it not because it is finished, but because the best way to test a pattern is to subject it to other people&apos;s experience. If you see a mapping I missed, I want to hear it. If you see where it breaks, I want to hear that more.
          </p>
          <div className={styles.pullQuote}>
            The sand is everywhere. The frequency has been applied.<br />Now come to your own conclusions.
          </div>
        </Section>

        <footer className={styles.thesisFooter}>
          <p>id8Labs. <a href="https://id8labs.app">id8labs.app</a></p>
          <p style={{ marginTop: '0.5rem', opacity: 0.5 }}>A thesis in progress. Published March 2026.</p>
        </footer>
      </div>
    </div>
  )
}
