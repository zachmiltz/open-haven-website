"use client"

import { useEffect, useRef } from "react"

export function MyceliumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener("resize", resize)

    // Node class for mycelium network
    class Node {
      x: number
      y: number
      vx: number
      vy: number
      connections: Node[]

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.connections = []
      }

      update(width: number, height: number) {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
      }
    }

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const nodeCount = Math.floor((width * height) / 25000)
    const nodes: Node[] = []

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(Math.random() * width, Math.random() * height))
    }

    // Create connections
    const connectionDistance = 150
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < connectionDistance && nodes[i].connections.length < 3) {
          nodes[i].connections.push(nodes[j])
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw connections
      ctx.strokeStyle = "rgba(45, 90, 61, 0.08)"
      ctx.lineWidth = 1

      for (const node of nodes) {
        node.update(width, height)

        for (const conn of node.connections) {
          const dx = node.x - conn.x
          const dy = node.y - conn.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance * 1.5) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)

            // Curved lines for organic feel
            const midX = (node.x + conn.x) / 2 + (Math.random() - 0.5) * 20
            const midY = (node.y + conn.y) / 2 + (Math.random() - 0.5) * 20
            ctx.quadraticCurveTo(midX, midY, conn.x, conn.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = "rgba(45, 90, 61, 0.15)"
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.6 }}
    />
  )
}
