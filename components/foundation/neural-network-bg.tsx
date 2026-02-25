'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Strange Attractor Background
 *
 * Lorenz attractor visualization — a deterministic chaotic system
 * that traces the topology of cross-domain thinking.
 * Two lobes (human dynamics / technical architecture) connected
 * by an insight zone where trajectories cross over.
 *
 * Scroll-driven rotation: scrolling the page rotates the attractor.
 * When idle, it auto-rotates slowly.
 */

interface NeuralNetworkBgProps {
  neuronCount?: number
  connectionDensity?: number
  rotationSpeed?: number
  fireRate?: number
  orangeIntensity?: number
  parallaxFactor?: number
  zoomFactor?: number
  className?: string
}

// Lorenz system parameters
const LORENZ = {
  sigma: 10,
  rho: 28,
  beta: 8 / 3,
  dt: 0.003,
}

const SCALE = 1.0
const CENTER_Y_OFFSET = -27
const CROSSOVER_THRESHOLD = 2.5

// id8Labs palette
const COLORS = {
  bg: 0x0a0a0b,
  trail: new THREE.Color(0xff7a4d),
  trailFade: new THREE.Color(0x3a1a08),
  crossover: new THREE.Color(0x4ecdc4),
  particle: new THREE.Color(0xff7a4d),
  particleDim: new THREE.Color(0x5a2a10),
  filament: new THREE.Color(0x222222),
}

function lorenzStep(x: number, y: number, z: number, dt: number): [number, number, number] {
  const dx = LORENZ.sigma * (y - x) * dt
  const dy = (x * (LORENZ.rho - z) - y) * dt
  const dz = (x * y - LORENZ.beta * z) * dt
  return [x + dx, y + dy, z + dz]
}

function toScene(x: number, y: number, z: number): THREE.Vector3 {
  return new THREE.Vector3(
    x * SCALE,
    (z + CENTER_Y_OFFSET) * SCALE,
    y * SCALE
  )
}

export function NeuralNetworkBg({
  className = '',
}: NeuralNetworkBgProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const animationIdRef = useRef<number>(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !containerRef.current) return

    const container = containerRef.current

    // Detect mobile for performance scaling
    const isMobile = window.innerWidth < 768
    const TRAIL_COUNT = isMobile ? 30 : 80
    const PARTICLE_COUNT = isMobile ? 600 : 2000
    const FILAMENT_COUNT = isMobile ? 12 : 30
    const TRAIL_LENGTH = isMobile ? 300 : 600

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(COLORS.bg)
    // No fog — let the attractor shine at full brightness

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    )
    camera.position.set(0, 5, 30)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Clock
    const clock = new THREE.Clock()

    // ─── Trail System ───────────────────────────────
    class Trail {
      x: number
      y: number
      z: number
      prevX: number
      positions: Float32Array
      colors: Float32Array
      head: number
      length: number
      crossoverCount: number
      geometry: THREE.BufferGeometry
      material: THREE.LineBasicMaterial
      line: THREE.Line

      constructor(index: number) {
        const offset = index * 0.01
        this.x = 1 + offset * Math.cos(index)
        this.y = 1 + offset * Math.sin(index)
        this.z = 1 + offset
        this.prevX = this.x
        this.head = 0
        this.length = 0
        this.crossoverCount = 0

        this.positions = new Float32Array(TRAIL_LENGTH * 3)
        this.colors = new Float32Array(TRAIL_LENGTH * 3)

        // Pre-fill history
        for (let i = 0; i < TRAIL_LENGTH; i++) {
          this.step()
        }

        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))

        this.material = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0.6 + Math.random() * 0.3,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })

        this.line = new THREE.Line(this.geometry, this.material)
        scene.add(this.line)
      }

      step() {
        this.prevX = this.x
        ;[this.x, this.y, this.z] = lorenzStep(this.x, this.y, this.z, LORENZ.dt)

        const p = toScene(this.x, this.y, this.z)
        const idx = this.head * 3
        this.positions[idx] = p.x
        this.positions[idx + 1] = p.y
        this.positions[idx + 2] = p.z

        const atCrossover = Math.abs(this.x) < CROSSOVER_THRESHOLD
        if (atCrossover) {
          if (this.prevX * this.x < 0) this.crossoverCount++
          const t = 1 - Math.abs(this.x) / CROSSOVER_THRESHOLD
          const c = COLORS.trail.clone().lerp(COLORS.crossover, t * 0.8)
          this.colors[idx] = c.r
          this.colors[idx + 1] = c.g
          this.colors[idx + 2] = c.b
        } else {
          const dist = Math.sqrt(this.x * this.x + this.y * this.y) / 30
          const c = COLORS.trail.clone().lerp(COLORS.trailFade, dist * 0.5)
          this.colors[idx] = c.r
          this.colors[idx + 1] = c.g
          this.colors[idx + 2] = c.b
        }

        this.head = (this.head + 1) % TRAIL_LENGTH
        this.length = Math.min(this.length + 1, TRAIL_LENGTH)
      }

      update() {
        for (let i = 0; i < 3; i++) this.step()

        for (let i = 0; i < this.length; i++) {
          const age = (this.head - i + TRAIL_LENGTH) % TRAIL_LENGTH
          const fade = Math.pow(1 - age / TRAIL_LENGTH, 2)
          const ci = i * 3
          this.colors[ci] *= fade
          this.colors[ci + 1] *= fade
          this.colors[ci + 2] *= fade
        }

        this.geometry.attributes.position.needsUpdate = true
        this.geometry.attributes.color.needsUpdate = true
        this.geometry.setDrawRange(0, this.length)
      }

      dispose() {
        scene.remove(this.line)
        this.geometry.dispose()
        this.material.dispose()
      }
    }

    // ─── Particle Cloud ─────────────────────────────
    interface ParticleVelocity { x: number; y: number; z: number }

    class ParticleCloud {
      geometry: THREE.BufferGeometry
      material: THREE.ShaderMaterial
      points: THREE.Points
      velocities: ParticleVelocity[]
      positions: Float32Array
      colors: Float32Array
      sizes: Float32Array

      constructor() {
        this.positions = new Float32Array(PARTICLE_COUNT * 3)
        this.colors = new Float32Array(PARTICLE_COUNT * 3)
        this.sizes = new Float32Array(PARTICLE_COUNT)
        this.velocities = []

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          let x = 0.1 + Math.random() * 2
          let y = 0.1 + Math.random() * 2
          let z = 0.1 + Math.random() * 2

          const steps = Math.floor(Math.random() * 5000) + 1000
          for (let s = 0; s < steps; s++) {
            ;[x, y, z] = lorenzStep(x, y, z, LORENZ.dt)
          }

          this.velocities.push({ x, y, z })

          const p = toScene(x, y, z)
          this.positions[i * 3] = p.x
          this.positions[i * 3 + 1] = p.y
          this.positions[i * 3 + 2] = p.z

          const atCrossover = Math.abs(x) < CROSSOVER_THRESHOLD
          const c = atCrossover
            ? COLORS.particle.clone().lerp(COLORS.crossover, 0.5)
            : COLORS.particle.clone().lerp(COLORS.particleDim, Math.random() * 0.7)

          this.colors[i * 3] = c.r
          this.colors[i * 3 + 1] = c.g
          this.colors[i * 3 + 2] = c.b
          this.sizes[i] = atCrossover ? 4 + Math.random() * 3 : 2 + Math.random() * 2
        }

        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
        this.geometry.setAttribute('size', new THREE.BufferAttribute(this.sizes, 1))

        this.material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: renderer.getPixelRatio() },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            varying float vAlpha;
            uniform float uTime;
            uniform float uPixelRatio;

            void main() {
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              float dist = -mvPosition.z;
              gl_PointSize = size * uPixelRatio * (80.0 / dist);
              gl_Position = projectionMatrix * mvPosition;
              float twinkle = sin(uTime * 2.0 + position.x * 10.0 + position.y * 7.0) * 0.5 + 0.5;
              vAlpha = 0.5 + twinkle * 0.5;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            varying float vAlpha;

            void main() {
              float d = length(gl_PointCoord - vec2(0.5));
              if (d > 0.5) discard;
              float glow = 1.0 - smoothstep(0.0, 0.5, d);
              glow = pow(glow, 1.5);
              gl_FragColor = vec4(vColor, glow * vAlpha);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })

        this.points = new THREE.Points(this.geometry, this.material)
        scene.add(this.points)
      }

      update(elapsed: number) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const v = this.velocities[i]
          ;[v.x, v.y, v.z] = lorenzStep(v.x, v.y, v.z, LORENZ.dt)

          const p = toScene(v.x, v.y, v.z)
          this.positions[i * 3] = p.x
          this.positions[i * 3 + 1] = p.y
          this.positions[i * 3 + 2] = p.z

          const atCrossover = Math.abs(v.x) < CROSSOVER_THRESHOLD
          if (atCrossover) {
            const t = 1 - Math.abs(v.x) / CROSSOVER_THRESHOLD
            const c = COLORS.particle.clone().lerp(COLORS.crossover, t * 0.7)
            this.colors[i * 3] = c.r
            this.colors[i * 3 + 1] = c.g
            this.colors[i * 3 + 2] = c.b
            this.sizes[i] = 4 + t * 3
          } else {
            this.colors[i * 3] = COLORS.particle.r * (0.4 + Math.random() * 0.3)
            this.colors[i * 3 + 1] = COLORS.particle.g * (0.4 + Math.random() * 0.3)
            this.colors[i * 3 + 2] = COLORS.particle.b * (0.4 + Math.random() * 0.3)
            this.sizes[i] = 2 + Math.random() * 1.5
          }
        }

        this.geometry.attributes.position.needsUpdate = true
        this.geometry.attributes.color.needsUpdate = true
        this.geometry.attributes.size.needsUpdate = true
        this.material.uniforms.uTime.value = elapsed
      }

      dispose() {
        scene.remove(this.points)
        this.geometry.dispose()
        this.material.dispose()
      }
    }

    // ─── Filaments (long-range connections) ─────────
    function createFilaments(): THREE.Group {
      const group = new THREE.Group()

      for (let i = 0; i < FILAMENT_COUNT; i++) {
        let x1 = 0.1 + Math.random(), y1 = 0.1 + Math.random(), z1 = 0.1 + Math.random()
        let x2 = 0.1 + Math.random() * 3, y2 = 0.1 + Math.random() * 3, z2 = 0.1 + Math.random() * 3

        const steps1 = 3000 + Math.random() * 3000
        for (let s = 0; s < steps1; s++) {
          ;[x1, y1, z1] = lorenzStep(x1, y1, z1, LORENZ.dt)
        }
        const steps2 = 3000 + Math.random() * 3000
        for (let s = 0; s < steps2; s++) {
          ;[x2, y2, z2] = lorenzStep(x2, y2, z2, LORENZ.dt)
        }

        const p1 = toScene(x1, y1, z1)
        const p2 = toScene(x2, y2, z2)
        const dist = p1.distanceTo(p2)

        if (dist > 15) {
          const mid = p1.clone().add(p2).multiplyScalar(0.5)
          mid.y += (Math.random() - 0.5) * 5

          const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
          const pts = curve.getPoints(20)
          const geo = new THREE.BufferGeometry().setFromPoints(pts)
          const mat = new THREE.LineBasicMaterial({
            color: COLORS.filament,
            transparent: true,
            opacity: 0.12 + Math.random() * 0.1,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
          group.add(new THREE.Line(geo, mat))
        }
      }

      scene.add(group)
      return group
    }

    // ─── Crossover Glow Ring ────────────────────────
    function createCrossoverGlow(): THREE.Mesh {
      const geo = new THREE.TorusGeometry(CROSSOVER_THRESHOLD * SCALE * 1.5, 0.3, 8, 32)
      const mat = new THREE.MeshBasicMaterial({
        color: COLORS.crossover,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const torus = new THREE.Mesh(geo, mat)
      torus.rotation.x = Math.PI / 2
      torus.position.y = 1.5
      scene.add(torus)
      return torus
    }

    // ─── Scroll-Driven Rotation ─────────────────────
    interface ScrollState {
      lastScrollY: number
      scrollVelocity: number
      autoRotateAngle: number
      scrollDrivenAngle: number
      lastScrollTime: number
      isScrolling: boolean
    }

    const scrollState: ScrollState = {
      lastScrollY: window.scrollY,
      scrollVelocity: 0,
      autoRotateAngle: 0,
      scrollDrivenAngle: 0,
      lastScrollTime: 0,
      isScrolling: false,
    }

    const AUTO_ROTATE_SPEED = 0.002
    const SCROLL_SENSITIVITY = 0.003
    const VELOCITY_DECAY = 0.92
    const IDLE_DELAY = 800

    let scrollRafId: number | null = null

    const handleScroll = () => {
      if (scrollRafId !== null) return
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null
        const currentY = window.scrollY
        const delta = currentY - scrollState.lastScrollY
        scrollState.lastScrollY = currentY

        if (Math.abs(delta) > 0.5) {
          scrollState.scrollVelocity += delta * SCROLL_SENSITIVITY
          scrollState.lastScrollTime = performance.now()
          scrollState.isScrolling = true
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // ─── Initialize ─────────────────────────────────
    const trails: Trail[] = []
    for (let i = 0; i < TRAIL_COUNT; i++) {
      trails.push(new Trail(i))
    }

    const cloud = new ParticleCloud()
    const filaments = createFilaments()
    const crossoverGlow = createCrossoverGlow()

    // ─── Animation Loop ─────────────────────────────
    let disposed = false

    function animate() {
      if (disposed) return
      const animationId = requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()
      const now = performance.now()

      // Update trails
      for (const trail of trails) {
        trail.update()
      }

      // Update particle cloud
      cloud.update(elapsed)

      // Pulse crossover glow
      const glowMat = crossoverGlow.material as THREE.MeshBasicMaterial
      glowMat.opacity = 0.04 + Math.sin(elapsed * 0.5) * 0.03
      crossoverGlow.scale.setScalar(1 + Math.sin(elapsed * 0.3) * 0.1)

      // ─── Rotation: scroll-driven + auto ─────────
      const timeSinceScroll = now - scrollState.lastScrollTime

      if (scrollState.isScrolling) {
        // Apply scroll velocity to rotation
        scrollState.scrollDrivenAngle += scrollState.scrollVelocity * 0.05
        scrollState.scrollVelocity *= VELOCITY_DECAY

        // Return to auto-rotate when scroll decays
        if (timeSinceScroll > IDLE_DELAY && Math.abs(scrollState.scrollVelocity) < 0.01) {
          scrollState.isScrolling = false
          scrollState.scrollVelocity = 0
        }
      }

      // Auto-rotate always accumulates (provides baseline spin)
      scrollState.autoRotateAngle += AUTO_ROTATE_SPEED

      // Total rotation = auto + scroll-driven
      const totalAngle = scrollState.autoRotateAngle + scrollState.scrollDrivenAngle

      // Orbit camera around the attractor
      const orbitRadius = 30
      camera.position.x = Math.sin(totalAngle) * orbitRadius
      camera.position.z = Math.cos(totalAngle) * orbitRadius
      camera.position.y = 5 + Math.sin(elapsed * 0.1) * 2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)

      animationIdRef.current = animationId
    }

    animate()

    // ─── Resize Handler ─────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      cloud.material.uniforms.uPixelRatio.value = renderer.getPixelRatio()
    }

    window.addEventListener('resize', handleResize)

    // ─── Cleanup ────────────────────────────────────
    return () => {
      disposed = true
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId)

      // Dispose Three.js resources
      for (const trail of trails) trail.dispose()
      cloud.dispose()

      filaments.traverse((child) => {
        if (child instanceof THREE.Line) {
          child.geometry.dispose()
          ;(child.material as THREE.Material).dispose()
        }
      })
      scene.remove(filaments)

      crossoverGlow.geometry.dispose()
      ;(crossoverGlow.material as THREE.Material).dispose()
      scene.remove(crossoverGlow)

      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

    }
  }, [isClient])

  if (!isClient) {
    return <div className={`fixed inset-0 ${className}`} style={{ background: '#0a0a0b' }} />
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 ${className}`}
      style={{ background: '#0a0a0b' }}
    />
  )
}

export default NeuralNetworkBg
