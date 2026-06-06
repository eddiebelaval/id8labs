'use client'

import { useEffect, useRef } from 'react'
import type { MotionValue } from 'framer-motion'

interface HelixSceneProps {
  scrollProgress: MotionValue<number>
}

export function HelixScene({ scrollProgress }: HelixSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (v: number) => {
      progressRef.current = v
    })
    return unsubscribe
  }, [scrollProgress])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let disposed = false

    async function init() {
      const THREE = await import('three')
      const { EffectComposer } = await import(
        'three/examples/jsm/postprocessing/EffectComposer.js'
      )
      const { RenderPass } = await import(
        'three/examples/jsm/postprocessing/RenderPass.js'
      )
      const { UnrealBloomPass } = await import(
        'three/examples/jsm/postprocessing/UnrealBloomPass.js'
      )
      const { OutputPass } = await import(
        'three/examples/jsm/postprocessing/OutputPass.js'
      )

      if (disposed || !container) return

      const isMobile = window.innerWidth < 768

      // ─── Config ──────────────────────────────────
      const HELIX = {
        radius: 3,
        turns: 4,
        height: 22,
        strandParticles: isMobile ? 600 : 1200,
        rungParticles: isMobile ? 300 : 600,
        ambientParticles: isMobile ? 200 : 500,
        rungInterval: 12, // degrees between rungs
      }

      // ─── Scene ───────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xfafaf7)

      // ─── Camera ──────────────────────────────────
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        200
      )
      camera.position.set(0, 0, 18)
      camera.lookAt(0, 0, 0)

      // ─── Renderer ────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: false,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.0
      container.appendChild(renderer.domElement)

      // ─── Bloom ───────────────────────────────────
      const composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.0,
        0.0,
        1.0
      )
      composer.addPass(bloomPass)
      composer.addPass(new OutputPass())

      // ─── Helix Group ────────────────────────────
      const helixGroup = new THREE.Group()

      // ─── Strand Particles (the two helix curves) ─
      const strandCount = HELIX.strandParticles * 2
      const strandPositions = new Float32Array(strandCount * 3)
      const strandSizes = new Float32Array(strandCount)
      const strandPhases = new Float32Array(strandCount) // for shimmer

      const totalDeg = 360 * HELIX.turns
      for (let strand = 0; strand < 2; strand++) {
        const phaseOffset = strand * 180
        for (let i = 0; i < HELIX.strandParticles; i++) {
          const idx = strand * HELIX.strandParticles + i
          const t = i / HELIX.strandParticles
          const deg = t * totalDeg
          const angle = ((deg + phaseOffset) * Math.PI) / 180
          const y = t * HELIX.height - HELIX.height / 2

          // Slight random scatter for organic feel
          const scatter = 0.08
          strandPositions[idx * 3] =
            HELIX.radius * Math.cos(angle) + (Math.random() - 0.5) * scatter
          strandPositions[idx * 3 + 1] =
            y + (Math.random() - 0.5) * scatter
          strandPositions[idx * 3 + 2] =
            HELIX.radius * Math.sin(angle) + (Math.random() - 0.5) * scatter

          strandSizes[idx] = 1.5 + Math.random() * 1.5
          strandPhases[idx] = Math.random() * Math.PI * 2
        }
      }

      const strandGeo = new THREE.BufferGeometry()
      strandGeo.setAttribute('position', new THREE.BufferAttribute(strandPositions, 3))
      strandGeo.setAttribute('size', new THREE.BufferAttribute(strandSizes, 1))
      strandGeo.setAttribute('phase', new THREE.BufferAttribute(strandPhases, 1))

      const strandMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: renderer.getPixelRatio() },
          uColor1: { value: new THREE.Color(0xff6b35) }, // orange accent
          uColor2: { value: new THREE.Color(0x0b0b0b) }, // ink
        },
        vertexShader: `
          attribute float size;
          attribute float phase;
          uniform float uTime;
          uniform float uPixelRatio;
          varying float vAlpha;
          varying float vColorMix;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float dist = -mvPosition.z;

            // Shimmer based on phase + time
            float shimmer = sin(uTime * 2.0 + phase) * 0.5 + 0.5;
            vAlpha = 0.4 + shimmer * 0.6;
            vColorMix = shimmer;

            // Size variation with shimmer
            float s = size * (0.8 + shimmer * 0.4);
            gl_PointSize = s * uPixelRatio * (45.0 / dist);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying float vAlpha;
          varying float vColorMix;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;

            // Soft circular glow
            float glow = exp(-d * d * 8.0);

            // Mix between bright and deep gold
            vec3 col = mix(uColor2, uColor1, vColorMix * glow);

            gl_FragColor = vec4(col * glow, glow * vAlpha);
          }
        `,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
      })

      helixGroup.add(new THREE.Points(strandGeo, strandMat))

      // ─── Rung Particles (connecting bridges) ─────
      const rungPositions: number[] = []
      const rungSizesArr: number[] = []
      const rungPhasesArr: number[] = []

      for (let deg = 0; deg < totalDeg; deg += HELIX.rungInterval) {
        const a1 = (deg * Math.PI) / 180
        const a2 = ((deg + 180) * Math.PI) / 180
        const t = deg / totalDeg
        const y = t * HELIX.height - HELIX.height / 2

        const p1x = HELIX.radius * Math.cos(a1)
        const p1z = HELIX.radius * Math.sin(a1)
        const p2x = HELIX.radius * Math.cos(a2)
        const p2z = HELIX.radius * Math.sin(a2)

        // Place particles along the rung
        const rungDots = 8
        for (let j = 0; j <= rungDots; j++) {
          const frac = j / rungDots
          rungPositions.push(
            p1x + (p2x - p1x) * frac + (Math.random() - 0.5) * 0.05,
            y + (Math.random() - 0.5) * 0.05,
            p1z + (p2z - p1z) * frac + (Math.random() - 0.5) * 0.05
          )
          rungSizesArr.push(0.6 + Math.random() * 0.8)
          rungPhasesArr.push(Math.random() * Math.PI * 2)
        }
      }

      const rungGeo = new THREE.BufferGeometry()
      rungGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(rungPositions), 3)
      )
      rungGeo.setAttribute(
        'size',
        new THREE.BufferAttribute(new Float32Array(rungSizesArr), 1)
      )
      rungGeo.setAttribute(
        'phase',
        new THREE.BufferAttribute(new Float32Array(rungPhasesArr), 1)
      )

      const rungMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: renderer.getPixelRatio() },
          uColor1: { value: new THREE.Color(0xff6b35) },
          uColor2: { value: new THREE.Color(0x5a5a5a) },
        },
        vertexShader: `
          attribute float size;
          attribute float phase;
          uniform float uTime;
          uniform float uPixelRatio;
          varying float vAlpha;
          varying float vColorMix;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float dist = -mvPosition.z;
            float shimmer = sin(uTime * 3.0 + phase) * 0.5 + 0.5;
            vAlpha = 0.2 + shimmer * 0.4;
            vColorMix = shimmer;
            gl_PointSize = size * uPixelRatio * (30.0 / dist);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying float vAlpha;
          varying float vColorMix;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float glow = exp(-d * d * 10.0);
            vec3 col = mix(uColor2, uColor1, vColorMix);
            gl_FragColor = vec4(col * glow, glow * vAlpha);
          }
        `,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
      })

      helixGroup.add(new THREE.Points(rungGeo, rungMat))

      // ─── Ambient Floating Particles ──────────────
      const ambPositions = new Float32Array(HELIX.ambientParticles * 3)
      const ambSizes = new Float32Array(HELIX.ambientParticles)

      for (let i = 0; i < HELIX.ambientParticles; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = HELIX.radius * 0.3 + Math.random() * HELIX.radius * 2.5
        const y = (Math.random() - 0.5) * HELIX.height * 1.4
        ambPositions[i * 3] = r * Math.cos(angle)
        ambPositions[i * 3 + 1] = y
        ambPositions[i * 3 + 2] = r * Math.sin(angle)
        ambSizes[i] = 0.5 + Math.random() * 1.2
      }

      const ambGeo = new THREE.BufferGeometry()
      ambGeo.setAttribute('position', new THREE.BufferAttribute(ambPositions, 3))
      ambGeo.setAttribute('size', new THREE.BufferAttribute(ambSizes, 1))

      const ambMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: renderer.getPixelRatio() },
          uColor: { value: new THREE.Color(0xb4afa0) },
        },
        vertexShader: `
          attribute float size;
          uniform float uTime;
          uniform float uPixelRatio;
          varying float vAlpha;
          void main() {
            vec3 pos = position;
            pos.x += sin(uTime * 0.3 + position.y * 0.4) * 0.5;
            pos.z += cos(uTime * 0.25 + position.y * 0.3) * 0.5;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            float dist = -mvPosition.z;
            gl_PointSize = size * uPixelRatio * (40.0 / dist);
            gl_Position = projectionMatrix * mvPosition;
            float twinkle = sin(uTime * 1.5 + position.x * 4.0 + position.z * 3.0) * 0.5 + 0.5;
            vAlpha = 0.08 + twinkle * 0.2;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float glow = exp(-d * d * 12.0);
            gl_FragColor = vec4(uColor * glow, glow * vAlpha);
          }
        `,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
      })

      helixGroup.add(new THREE.Points(ambGeo, ambMat))
      scene.add(helixGroup)

      // ─── Animation Loop ──────────────────────────
      const clock = new THREE.Clock()
      let animationId = 0

      function animate() {
        if (disposed) return
        animationId = requestAnimationFrame(animate)

        const elapsed = clock.getElapsedTime()
        const progress = progressRef.current

        // Scroll rotation (2 full turns) + slow idle
        helixGroup.rotation.y = progress * Math.PI * 4 + elapsed * 0.1

        // Subtle vertical drift
        helixGroup.position.y = progress * 2 - 1

        // Gentle sway
        helixGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.03
        helixGroup.rotation.z = Math.cos(elapsed * 0.15) * 0.02

        // Update uniforms
        strandMat.uniforms.uTime.value = elapsed
        rungMat.uniforms.uTime.value = elapsed
        ambMat.uniforms.uTime.value = elapsed

        composer.render()
      }

      animate()

      // ─── Resize ──────────────────────────────────
      const handleResize = () => {
        const { innerWidth, innerHeight } = window
        camera.aspect = innerWidth / innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(innerWidth, innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        composer.setSize(innerWidth, innerHeight)

        const pixelRatio = renderer.getPixelRatio()
        strandMat.uniforms.uPixelRatio.value = pixelRatio
        rungMat.uniforms.uPixelRatio.value = pixelRatio
        ambMat.uniforms.uPixelRatio.value = pixelRatio
      }
      window.addEventListener('resize', handleResize)

      // ─── Cleanup ─────────────────────────────────
      cleanup = () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(animationId)
        strandGeo.dispose()
        rungGeo.dispose()
        ambGeo.dispose()
        strandMat.dispose()
        rungMat.dispose()
        ambMat.dispose()
        composer.dispose()
        renderer.dispose()
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
    }

    let cleanup: (() => void) | undefined
    init()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 [&_canvas]:!rounded-none" style={{ background: 'var(--paper)' }} />
  )
}
