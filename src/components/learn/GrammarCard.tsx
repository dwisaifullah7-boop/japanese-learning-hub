'use client'

import { AudioButton } from '@/components/shared/AudioButton'
import { useAudio } from '@/components/providers/AudioProvider'

interface GrammarCardProps {
  pattern: string
  meaning: string
  usage?: string | null
  example?: string | null
  translation?: string | null
  note?: string | null
  audioUrl?: string | null
}

export function GrammarCard({ pattern, meaning, usage, example, translation, note, audioUrl }: GrammarCardProps) {
  const { playAudio } = useAudio()

  const handleAudioClick = () => {
    // Putar audio dengan text pattern
    playAudio(audioUrl || `grammar-${pattern}`, pattern)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="text-2xl font-bold text-purple-600 font-japanese">{pattern}</div>
        <AudioButton 
          audioUrl={audioUrl || `grammar-${pattern}`}
          onClick={handleAudioClick}
          size="sm" 
        />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Meaning</h4>
          <p className="text-gray-800">{meaning}</p>
        </div>

        {usage && (
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Usage</h4>
            <p className="text-gray-800">{usage}</p>
          </div>
        )}

        {example && (
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 className="text-xs font-semibold text-purple-400 uppercase mb-2">Example</h4>
            <p className="text-lg font-medium text-gray-900 font-japanese mb-1">{example}</p>
            {translation && <p className="text-sm text-gray-600">{translation}</p>}
          </div>
        )}

        {note && (
          <div className="text-sm text-gray-500 italic border-t border-gray-100 pt-3">
            <strong>Note:</strong> {note}
          </div>
        )}
      </div>
    </div>
  )
}
