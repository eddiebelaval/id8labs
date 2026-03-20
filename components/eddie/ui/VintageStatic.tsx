'use client'

import { useEffect, useRef } from 'react'

export function VintageStatic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let GLITCH_INTENSITY = 0.5
    let MELT_SPEED = 0.5

    let width: number, height: number, dpr: number

    function resize() {
      if (!canvas || !ctx) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initMelt()
    }

    window.addEventListener('resize', resize)
    resize()

    const barColors = [
      [240, 235, 220],
      [210, 170, 60],
      [60, 185, 160],
      [80, 165, 60],
      [185, 60, 140],
      [200, 60, 55],
      [45, 60, 170],
      [200, 149, 108],
    ]

    let seed = 42
    function fastRand() {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed / 0x7fffffff
    }

    function hash(x: number) {
      const s = Math.sin(x * 127.1 + 311.7) * 43758.5453
      return s - Math.floor(s)
    }

    function smoothNoise(x: number) {
      const ix = Math.floor(x)
      let fx = x - ix
      fx = fx * fx * (3.0 - 2.0 * fx)
      return hash(ix) * (1.0 - fx) + hash(ix + 1) * fx
    }

    let meltColumns: number[] = []

    function initMelt() {
      const count = Math.ceil(width / 2) + 1
      meltColumns = new Array(count)
      for (let i = 0; i < count; i++) meltColumns[i] = 0
    }

    function drawMeltedBars(time: number, cycleT: number) {
      if (!ctx) return
      const numBars = barColors.length
      const barWidth = width / numBars

      let meltProgress = Math.min(cycleT * MELT_SPEED * 2, 1.0)
      const reforming = cycleT > 0.85
      let reformT = reforming ? (cycleT - 0.85) / 0.15 : 0
      reformT = reformT * reformT * (3 - 2 * reformT)
      if (reforming) meltProgress = meltProgress * (1 - reformT)

      for (let i = 0; i < numBars; i++) {
        const c = barColors[i]
        const x = Math.floor(i * barWidth)
        const w = Math.ceil(barWidth) + 1
        const barMeltOffset = smoothNoise(i * 3.7 + time * 0.3) * 0.3
        const barMelt = Math.min(Math.max(meltProgress + barMeltOffset - 0.15, 0), 1)
        const sliceWidth = 3
        const numSlices = Math.ceil(w / sliceWidth)

        for (let s = 0; s < numSlices; s++) {
          const sx = x + s * sliceWidth
          const sliceSeed = i * 100 + s
          const dripAmount = barMelt * height * (0.3 + smoothNoise(sliceSeed * 1.7 + time * MELT_SPEED * 0.5) * 0.7)
          const dripStretch = 1 + barMelt * (0.5 + smoothNoise(sliceSeed * 2.3) * 1.5)
          const heatShift = barMelt * 0.3
          const r = Math.min(255, c[0] + heatShift * 30)
          const g = Math.max(0, c[1] - heatShift * 20)
          const b = Math.max(0, c[2] - heatShift * 15)
          const sliceHeight = height * dripStretch

          ctx.fillStyle = 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')'
          ctx.globalAlpha = 1 - barMelt * 0.3
          ctx.fillRect(sx, dripAmount, sliceWidth, sliceHeight)

          if (barMelt > 0.1) {
            const tipY = dripAmount + sliceHeight
            const tipSize = barMelt * 8 * (0.5 + smoothNoise(sliceSeed * 3.1 + time) * 0.5)
            ctx.beginPath()
            ctx.ellipse(sx + sliceWidth / 2, tipY, sliceWidth * 0.6, tipSize, 0, 0, Math.PI * 2)
            ctx.globalAlpha = 0.7 - barMelt * 0.3
            ctx.fill()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    function drawScanLines(time: number) {
      if (!ctx) return
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      for (let y = 0; y < height; y += 3) ctx.fillRect(0, y, width, 1)

      const rollY = ((time * 0.15 * height) % (height * 1.4)) - height * 0.2
      const rollHeight = 40 + Math.sin(time * 2) * 20
      const rollGrad = ctx.createLinearGradient(0, rollY - rollHeight, 0, rollY + rollHeight)
      rollGrad.addColorStop(0, 'rgba(200, 180, 150, 0)')
      rollGrad.addColorStop(0.3, 'rgba(200, 180, 150, 0.04)')
      rollGrad.addColorStop(0.5, 'rgba(255, 240, 210, 0.07)')
      rollGrad.addColorStop(0.7, 'rgba(200, 180, 150, 0.04)')
      rollGrad.addColorStop(1, 'rgba(200, 180, 150, 0)')
      ctx.fillStyle = rollGrad
      ctx.fillRect(0, rollY - rollHeight, width, rollHeight * 2)
    }

    function drawTrackingGlitch(time: number) {
      if (!ctx || !canvas) return
      const glitchChance = GLITCH_INTENSITY * 0.15
      seed = Math.floor(time * 30) * 7919

      for (let g = 0; g < 5; g++) {
        if (fastRand() > glitchChance) continue
        const gy = Math.floor(fastRand() * height)
        const gh = 2 + Math.floor(fastRand() * 15 * GLITCH_INTENSITY)
        const gx = (fastRand() - 0.5) * 40 * GLITCH_INTENSITY

        ctx.save()
        ctx.beginPath()
        ctx.rect(0, gy, width, gh)
        ctx.clip()
        ctx.drawImage(canvas, gx, 0)
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = 0.15 * GLITCH_INTENSITY
        ctx.fillStyle = 'rgba(200, 80, 60, 0.5)'
        ctx.fillRect(gx + 2, gy, width, gh)
        ctx.fillStyle = 'rgba(60, 150, 200, 0.5)'
        ctx.fillRect(gx - 2, gy, width, gh)
        ctx.restore()
      }

      seed = Math.floor(time * 3) * 1321
      if (fastRand() < GLITCH_INTENSITY * 0.08) {
        const tearY = fastRand() * height
        const tearH = 20 + fastRand() * 60 * GLITCH_INTENSITY
        const tearShift = (fastRand() - 0.5) * width * 0.3 * GLITCH_INTENSITY
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, tearY, width, tearH)
        ctx.clip()
        ctx.drawImage(canvas, tearShift, 0)
        ctx.restore()
      }
    }

    function drawStatic(time: number) {
      if (!ctx || !canvas || canvas.width === 0 || canvas.height === 0) return
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data
        const density = 0.03 * GLITCH_INTENSITY
        seed = Math.floor(time * 60) * 9973
        const totalPixels = canvas.width * canvas.height
        if (totalPixels === 0) return
        const step = Math.max(1, Math.floor(1 / density))

        for (let p = 0; p < totalPixels; p += step) {
          seed = (seed * 1103515245 + 12345) & 0x7fffffff
          const idx = ((seed % totalPixels) | 0) * 4
          if (idx + 2 >= data.length) continue
          seed = (seed * 1103515245 + 12345) & 0x7fffffff
          const brightness = seed & 0xff
          data[idx] = Math.min(255, data[idx] + brightness)
          data[idx + 1] = Math.min(255, data[idx + 1] + Math.floor(brightness * 0.85))
          data[idx + 2] = Math.min(255, data[idx + 2] + Math.floor(brightness * 0.7))
        }
        ctx.putImageData(imgData, 0, 0)
      } catch { /* skip frame if getImageData fails */ }
    }

    let lastAberrationTime = 0
    let aberrationDuration = 0
    let aberrationActive = false

    function drawChromaticAberration(time: number) {
      if (!ctx || !canvas) return
      seed = Math.floor(time * 2) * 4973
      if (!aberrationActive && fastRand() < GLITCH_INTENSITY * 0.03) {
        aberrationActive = true
        lastAberrationTime = time
        aberrationDuration = 0.1 + fastRand() * 0.3
      }
      if (aberrationActive) {
        const elapsed = time - lastAberrationTime
        if (elapsed > aberrationDuration) { aberrationActive = false; return }
        const intensity = Math.sin((elapsed / aberrationDuration) * Math.PI) * GLITCH_INTENSITY
        const offset = intensity * 8
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = intensity * 0.15
        ctx.drawImage(canvas, offset, 0)
        ctx.drawImage(canvas, -offset, 0)
        ctx.restore()
      }
    }

    function drawCRTEffect() {
      if (!ctx) return
      const cx = width / 2, cy = height / 2
      const maxDist = Math.sqrt(cx * cx + cy * cy)
      const vigGrad = ctx.createRadialGradient(cx, cy, maxDist * 0.4, cx, cy, maxDist * 1.1)
      vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vigGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.05)')
      vigGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.2)')
      vigGrad.addColorStop(0.95, 'rgba(0, 0, 0, 0.5)')
      vigGrad.addColorStop(1, 'rgba(0, 0, 0, 0.8)')
      ctx.fillStyle = vigGrad
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'lighter'
      ctx.globalAlpha = 0.02
      ctx.fillStyle = 'rgba(200, 160, 100, 1)'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
    }

    function drawPhosphorDots() {
      if (!ctx) return
      ctx.globalAlpha = 0.04
      ctx.globalCompositeOperation = 'lighter'
      for (let px = 0; px < width; px += 3) {
        const colIdx = px % 9
        if (colIdx < 3) ctx.fillStyle = 'rgba(255, 80, 60, 1)'
        else if (colIdx < 6) ctx.fillStyle = 'rgba(80, 255, 80, 1)'
        else ctx.fillStyle = 'rgba(60, 80, 255, 1)'
        ctx.fillRect(px, 0, 1, height)
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
    }

    let startTime: number | null = null
    let running = true
    let animId: number

    function render(timestamp: number) {
      if (!running) { animId = requestAnimationFrame(render); return }
      if (!startTime) startTime = timestamp
      if (!ctx || !width || !height) { animId = requestAnimationFrame(render); return }

      try {
        const time = prefersReduced ? 0 : (timestamp - startTime) / 1000
        const cycleT = (time * MELT_SPEED * 0.15) % 1.0

        ctx.fillStyle = '#0a0a0a'
        ctx.fillRect(0, 0, width, height)

        drawMeltedBars(time, cycleT)
        drawScanLines(time)
        drawTrackingGlitch(time)
        drawStatic(time)
        drawChromaticAberration(time)
        drawPhosphorDots()
        drawCRTEffect()
      } catch { /* skip frame on error */ }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    function handleClick() {
      aberrationActive = true
      lastAberrationTime = startTime ? (performance.now() - startTime) / 1000 : 0
      aberrationDuration = 0.3 + Math.random() * 0.5
      GLITCH_INTENSITY = Math.min(2.0, GLITCH_INTENSITY + 0.5)
      setTimeout(() => { GLITCH_INTENSITY = Math.max(0.5, GLITCH_INTENSITY - 0.5) }, 500)
    }

    canvas.addEventListener('click', handleClick)

    function handleVisibility() {
      if (document.hidden) { running = false } else { running = true; startTime = null }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('click', handleClick)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
