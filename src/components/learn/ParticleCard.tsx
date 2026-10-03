'use client'

import { AudioButton } from '@/components/shared/AudioButton'
import { AlertCircle } from 'lucide-react'
import { useAudio } from '@/components/providers/AudioProvider'

interface ParticleCardProps {
  particle: string
  reading: string
  meaning: string
  function: string
  pattern?: string | null
  example?: string | null
  translation?: string | null
  commonMistake?: string | null
  audioUrl?: string | null
}

export function ParticleCard({ 
  particle, reading, meaning, function: func, pattern, example, translation, commonMistake, audioUrl 
}: ParticleCardProps) {
  const { playAudio } = useAudio()

  const handleAudioClick = () => {
    // FIX: Gunakan contoh kalimat agar TTS mengucapkan partikel dengan benar.
    // Web Speech API tidak bisa membaca partikel tunggal dengan benar (は -> ha, bukan wa).
    // Dengan kalimat lengkap, TTS akan otomatis menyesuaikan pelafalan (は -> wa).
    const audioText = example || `${particle}、こんにちは。`;
    
    playAudio(audioUrl || `particle-${particle}`, audioText)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-blue-600 font-japanese">{particle}</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            ({reading}) ← cara baca
          </span>
        </div>
        <AudioButton 
          audioUrl={audioUrl || `particle-${particle}`}
          onClick={handleAudioClick}
          size="sm" 
        />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Meaning</h4>
          <p className="text-gray-800">{meaning}</p>
        </div>
        
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Function</h4>
          <p className="text-gray-800">{func}</p>
        </div>

        {pattern && (
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Pattern</h4>
            <code className="block bg-gray-50 p-2 rounded text-sm text-gray-700 font-mono">{pattern}</code>
          </div>
        )}

        {example && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="text-xs font-semibold text-blue-400 uppercase">Example</h4>
              {/* Tombol audio kecil di dalam box example */}
              <button 
                onClick={handleAudioClick}
                className="text-blue-500 hover:text-blue-700 transition-colors"
                aria-label="Putar audio contoh kalimat"
              >
                🔊
              </button>
            </div>
            <p className="text-lg font-medium text-gray-900 font-japanese mb-1">{example}</p>
            {translation && <p className="text-sm text-gray-600">{translation}</p>}
            <p className="text-xs text-blue-400 mt-2 italic">* Audio menggunakan kalimat ini untuk pelafalan yang akurat.</p>
          </div>
        )}

        {commonMistake && (
          <div className="flex gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-orange-600 uppercase mb-1">Common Mistake</h4>
              <p className="text-sm text-orange-800">{commonMistake}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
