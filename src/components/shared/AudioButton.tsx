'use client'

import { Button } from '@/components/ui/button'
import { Volume2, Loader2 } from 'lucide-react'
import { useAudio } from '@/components/providers/AudioProvider'
import { cn } from '@/lib/utils'

interface AudioButtonProps {
  audioUrl?: string | null
  onClick?: () => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AudioButton({
  audioUrl,
  onClick,
  disabled = false,
  size = 'md',
  className,
}: AudioButtonProps) {
  const { playAudio, isPlaying, currentAudioUrl } = useAudio()

  const isActive = currentAudioUrl === audioUrl && isPlaying
  const isDisabled = disabled

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isDisabled) return
    
    if (onClick) {
      onClick()
    } else {
      playAudio(audioUrl || '')
    }
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        sizeClasses[size],
        isActive && 'bg-blue-100 border-blue-300 text-blue-600 animate-pulse',
        className
      )}
      aria-label="Putar audio"
    >
      {isActive ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </Button>
  )
}
