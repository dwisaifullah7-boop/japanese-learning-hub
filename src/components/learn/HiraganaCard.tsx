'use client'

import { AudioButton } from '@/components/shared/AudioButton'
import { useAudio } from '@/components/providers/AudioProvider'

interface HiraganaCardProps {
  character: string
  romaji: string
  example?: string | null
  audioUrl?: string | null
}

export function HiraganaCard({ character, romaji, example, audioUrl }: HiraganaCardProps) {
  const { playAudio } = useAudio()

  const handleAudioClick = () => {
    // Putar audio dengan text character
    playAudio(audioUrl || `hiragana-${character}`, character)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="flex justify-between w-full items-start mb-2">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Hiragana</span>
        <AudioButton 
          audioUrl={audioUrl || `hiragana-${character}`} 
          onClick={handleAudioClick}
          size="sm" 
        />
      </div>
      <div className="text-6xl font-bold text-gray-900 mb-2 font-japanese">{character}</div>
      <div className="text-lg text-blue-600 font-medium mb-3">{romaji}</div>
      {example && (
        <div className="text-sm text-gray-600 border-t border-gray-100 pt-3 w-full">
          {example}
        </div>
      )}
    </div>
  )
}
