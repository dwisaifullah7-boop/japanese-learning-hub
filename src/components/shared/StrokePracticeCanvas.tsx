'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Eraser, Eye, EyeOff, RotateCcw, PenTool } from 'lucide-react'

interface StrokePracticeCanvasProps {
  character: string
  width?: number
  height?: number
}

export function StrokePracticeCanvas({ character, width = 240, height = 240 }: StrokePracticeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showGuide, setShowGuide] = useState(true)
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions with high DPI support
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 6
    ctx.strokeStyle = '#1e293b' // Dark slate stroke color
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Save history state for undo
    setStrokeHistory(prev => [...prev, ctx.getImageData(0, 0, width, height)])

    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)
    setStrokeHistory([])
  }

  const undoStroke = () => {
    if (strokeHistory.length === 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const lastState = strokeHistory[strokeHistory.length - 1]
    ctx.putImageData(lastState, 0, 0)
    setStrokeHistory(prev => prev.slice(0, prev.length - 1))
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative border-2 border-dashed border-blue-300 rounded-2xl bg-white shadow-inner overflow-hidden select-none touch-none">
        {/* Background Grid Guidelines */}
        <div
          className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2 divide-x divide-y divide-gray-100"
          aria-hidden="true"
        />

        {/* Faint Character Guide Overlay */}
        {showGuide && (
          <div
            className="absolute inset-0 flex items-center justify-center font-japanese text-gray-200 pointer-events-none select-none opacity-40 font-bold"
            style={{ fontSize: `${width * 0.65}px` }}
          >
            {character}
          </div>
        )}

        {/* Interactive Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="relative z-10 cursor-crosshair"
        />
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          variant="outline"
          size="sm"
          className="text-xs gap-1.5"
        >
          {showGuide ? <EyeOff className="w-3.5 h-3.5 text-gray-500" /> : <Eye className="w-3.5 h-3.5 text-blue-600" />}
          {showGuide ? 'Sembunyikan Panduan' : 'Tampilkan Panduan'}
        </Button>

        <Button
          type="button"
          onClick={undoStroke}
          disabled={strokeHistory.length === 0}
          variant="outline"
          size="sm"
          className="text-xs gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Undo Goresan
        </Button>

        <Button
          type="button"
          onClick={clearCanvas}
          variant="outline"
          size="sm"
          className="text-xs text-red-600 border-red-200 hover:bg-red-50 gap-1.5"
        >
          <Eraser className="w-3.5 h-3.5" /> Hapus
        </Button>
      </div>

      <p className="text-xs text-gray-400 flex items-center gap-1">
        <PenTool className="w-3 h-3 text-blue-500" />
        Gunakan kursor mouse atau sentuhan jari pada layar untuk berlatih menulis.
      </p>
    </div>
  )
}
