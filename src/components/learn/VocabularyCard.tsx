'use client'

import { AudioButton } from '@/components/shared/AudioButton'
import { Badge } from '@/components/ui/badge'
import { useAudio } from '@/components/providers/AudioProvider'

interface VocabularyCardProps {
  kanji?: string | null
  kana: string
  romaji: string
  meaning: string
  wordType?: string | null
  audioUrl?: string | null
}

export function VocabularyCard({ kanji, kana, romaji, meaning, wordType, audioUrl }: VocabularyCardProps) {
  const { playAudio } = useAudio()

  const handleAudioClick = () => {
    // Putar audio dengan text kana
    playAudio(audioUrl || `vocab-${kana}`, kana)
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-gray-900 font-japanese">{kanji || kana}</div>
          {wordType && <Badge variant="outline" className="text-xs">{wordType}</Badge>}
        </div>
        <AudioButton 
          audioUrl={audioUrl || `vocab-${kana}`}
          onClick={handleAudioClick}
          size="sm" 
        />
      </div>
      <div className="space-y-1">
        <div className="text-sm text-gray-500">{kana} • <span className="text-blue-600">{romaji}</span></div>
        <div className="text-base text-gray-800 font-medium">{meaning}</div>
      </div>
    </div>
  )
}
