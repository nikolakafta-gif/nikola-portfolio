"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"

interface GlobeBarsProps {
  className?: string
  targetPhi?: number
  targetTheta?: number
}

/* ── 3D → 2D projection ── */
function projectMarker(
  lat: number,
  lon: number,
  phi: number,
  theta: number
): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180
  const lonRad = (lon * Math.PI) / 180

  // Point on unit sphere
  const px = Math.cos(latRad) * Math.sin(lonRad)
  const py = -Math.sin(latRad)
  const pz = Math.cos(latRad) * Math.cos(lonRad)

  // Rotate by phi (around Y axis — globe horizontal spin)
  const cp = Math.cos(phi)
  const sp = Math.sin(phi)
  const rx = px * cp + pz * sp
  const rz = -px * sp + pz * cp

  // Rotate by theta (around X axis — globe tilt)
  const ct = Math.cos(theta)
  const st = Math.sin(theta)
  const ry = py * ct - rz * st
  const rz2 = py * st + rz * ct

  // Orthographic projection — visible when facing camera (z > 0)
  return {
    x: (rx + 1) / 2, // 0–1 normalized
    y: (ry + 1) / 2,
    visible: rz2 > 0,
  }
}

export function GlobeBars({
  className = "",
  targetPhi = 1.35,
  targetTheta = 0.25,
}: GlobeBarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const pinRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)
  const [arrived, setArrived] = useState(false)

  /* Niš coordinates */
  const NIS_LAT = 43.32
  const NIS_LON = 21.90

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const wrapper = canvas.parentElement
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let ioCleanup: (() => void) | null = null

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      let phi = 0
      let currentTheta = 0.2
      const arrivedFlag = { current: false }

      const GLOBE_SCALE = 0.44

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 9,
        baseColor: [1, 1, 1],
        markerColor: [0.286, 0.157, 0.992],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0,
        markers: [],
        opacity: 0.7,
      })

      function animate() {
        if (!isPausedRef.current) {
          if (!arrivedFlag.current) {
            const diff = targetPhi - phi
            if (Math.abs(diff) > 0.005) {
              phi += diff * 0.012
            } else {
              phi = targetPhi
              arrivedFlag.current = true
              setArrived(true)
            }
            const tDiff = targetTheta - currentTheta
            currentTheta += tDiff * 0.012
          } else {
            phi += 0.00008
          }
        }

        const totalPhi = phi + phiOffsetRef.current + dragOffset.current.phi
        const totalTheta = currentTheta + thetaOffsetRef.current + dragOffset.current.theta

        globe!.update({ phi: totalPhi, theta: totalTheta })

        const proj = projectMarker(NIS_LAT, NIS_LON, totalPhi, totalTheta)

        if (pinRef.current) {
          const cx = 50
          const cy = 50
          const pxX = cx + (proj.x - 0.5) * 2 * GLOBE_SCALE * 100
          const pxY = cy + (proj.y - 0.5) * 2 * GLOBE_SCALE * 100

          pinRef.current.style.left = `${pxX}%`
          pinRef.current.style.top = `${pxY}%`
          pinRef.current.style.opacity = proj.visible && arrivedFlag.current ? "1" : "0"
        }

        if (pulseRef.current) {
          const cx = 50
          const cy = 50
          const pxX = cx + (proj.x - 0.5) * 2 * GLOBE_SCALE * 100
          const pxY = cy + (proj.y - 0.5) * 2 * GLOBE_SCALE * 100

          pulseRef.current.style.left = `${pxX}%`
          pulseRef.current.style.top = `${pxY}%`
          pulseRef.current.style.opacity = proj.visible && arrivedFlag.current ? "1" : "0"
        }

        animationId = requestAnimationFrame(animate)
      }

      animate()

      /* Fade + scale entrance */
      canvas.style.transition = "opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)"
      canvas.style.transform = "scale(0.8)"
      requestAnimationFrame(() => {
        canvas.style.opacity = "1"
        canvas.style.transform = "scale(1)"
      })
    }

    /* Wait until globe scrolls into view before initializing */
    const target = wrapper || canvas
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect()
          if (canvas.offsetWidth > 0) {
            init()
          } else {
            const ro = new ResizeObserver((resizeEntries) => {
              if (resizeEntries[0]?.contentRect.width > 0) {
                ro.disconnect()
                init()
              }
            })
            ro.observe(canvas)
          }
        }
      },
      { threshold: 0.15 }
    )
    io.observe(target)
    ioCleanup = () => io.disconnect()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
      if (ioCleanup) ioCleanup()
    }
  }, [targetPhi, targetTheta])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <style>{`
        @keyframes pin-pulse-ring {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
        }
        @keyframes pin-drop-in {
          0% { transform: translate(-50%, -100%) translateY(-16px); opacity: 0; }
          60% { transform: translate(-50%, -100%) translateY(2px); opacity: 1; }
          80% { transform: translate(-50%, -100%) translateY(-1px); }
          100% { transform: translate(-50%, -100%) translateY(0); opacity: 1; }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />

      {/* Pin + label — position updated every frame via ref */}
      <div
        ref={pinRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s ease",
          animation: arrived ? "pin-drop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none",
        }}
      >
        {/* Label */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "4px 12px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#1b1d1e",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
            letterSpacing: "0.3px",
            lineHeight: "1.4",
          }}
        >
          Niš, Serbia
        </div>
        {/* Pin SVG */}
        <svg
          width="18"
          height="24"
          viewBox="0 0 20 28"
          fill="none"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
        >
          <path
            d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 18 10 18s10-10.5 10-18C20 4.5 15.5 0 10 0z"
            fill="#4928fd"
          />
          <circle cx="10" cy="10" r="3.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Pulse ring — tracks same position */}
      <div
        ref={pulseRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "12px",
          height: "12px",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(73, 40, 253, 0.4)",
            transform: "translate(-50%, -50%)",
            animation: arrived ? "pin-pulse-ring 2s ease-out 0.8s infinite" : "none",
          }}
        />
      </div>
    </div>
  )
}
