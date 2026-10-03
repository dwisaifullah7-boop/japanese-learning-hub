'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RotateCcw, Play } from 'lucide-react'

interface StrokeOrderAnimationProps {
  character: string
  className?: string
}

export function StrokeOrderAnimation({ character, className }: StrokeOrderAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePlay = () => {
    setIsAnimating(true)
    // Simulasi durasi animasi stroke (misal 2 detik)
    setTimeout(() => {
      setIsAnimating(false)
    }, 2000)
  }

  const handleReset = () => {
    setIsAnimating(false)
  }

  return (
    <div className={`flex flex-col items-center gap-4 p-6 bg-white rounded-lg border border-gray-200 ${className || ''}`}>
      <div className="relative w-48 h-48 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        {/* Grid bantu untuk menulis kanji */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="border-r border-b border-dashed border-gray-300"></div>
          <div className="border-b border-dashed border-gray-300"></div>
          <div className="border-r border-dashed border-gray-300"></div>
          <div></div>
        </div>
        
        {/* Karakter dengan animasi CSS sederhana */}
        <span 
          className={`text-9xl font-bold text-gray-900 font-japanese transition-all duration-1000 ${
            isAnimating ? 'opacity-100 scale-100 blur-0' : 'opacity-30 scale-90 blur-[1px]'
          }`}
        >
          {character}
        </span>

        {isAnimating && (
          <div className="absolute inset-0 bg-blue-500/10 animate-pulse pointer-events-none"></div>
        )}
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={handlePlay} 
          disabled={isAnimating}
          size="sm"
          className="flex items-center gap-2 min-h-[44px]"
        >
          <Play className="w-4 h-4" />
          {isAnimating ? 'Menggambar...' : 'Putar Animasi'}
        </Button>
        <Button 
          onClick={handleReset} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 min-h-[44px]"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}
