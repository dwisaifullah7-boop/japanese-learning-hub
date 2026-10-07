'use client'

import { useState } from 'react'
import { StrokePracticeCanvas } from '@/components/shared/StrokePracticeCanvas'
import { AudioButton } from '@/components/shared/AudioButton'
import { X, PenTool } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HiraganaItem {
  id: string
  character: string
  romaji: string
  example: string
}

export function HiraganaGridClient({ hiragana }: { hiragana: HiraganaItem[] }) {
  const [selected, setSelected] = useState<HiraganaItem | null>(null)

  // Group by row (vowels: a-row, k-row, s-row, etc.)
  const rows = [
    { label: 'A行', chars: ['a', 'i', 'u', 'e', 'o'] },
    { label: 'Ka行', chars: ['ka', 'ki', 'ku', 'ke', 'ko'] },
    { label: 'Sa行', chars: ['sa', 'shi', 'su', 'se', 'so'] },
    { label: 'Ta行', chars: ['ta', 'chi', 'tsu', 'te', 'to'] },
    { label: 'Na行', chars: ['na', 'ni', 'nu', 'ne', 'no'] },
    { label: 'Ha行', chars: ['ha', 'hi', 'fu', 'he', 'ho'] },
    { label: 'Ma行', chars: ['ma', 'mi', 'mu', 'me', 'mo'] },
    { label: 'Ya行', chars: ['ya', 'yu', 'yo'] },
    { label: 'Ra行', chars: ['ra', 'ri', 'ru', 're', 'ro'] },
    { label: 'Wa行', chars: ['wa', 'wo'] },
    { label: 'N', chars: ['n'] },
  ]

  return (
    <>
      {/* Character Grid by Rows */}
      <div className="space-y-3">
        {rows.map(row => {
          const rowChars = row.chars.map(r => hiragana.find(h => h.romaji === r)).filter(Boolean) as HiraganaItem[]
          if (rowChars.length === 0) return null
          return (
            <div key={row.label} className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 w-10 shrink-0 text-right">{row.label}</span>
              <div className="flex flex-wrap gap-2">
                {rowChars.map(h => (
                  <button
                    key={h.id}
                    onClick={() => setSelected(h)}
                    className={`group relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center hover:scale-105 hover:shadow-lg ${
                      selected?.id === h.id
                        ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-300'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900 font-japanese">{h.character}</span>
                    <span className="text-[10px] text-gray-500 font-medium">{h.romaji}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail Modal/Panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 space-y-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Character Display */}
            <div className="text-center space-y-2">
              <span className="text-8xl font-bold text-gray-900 font-japanese block">{selected.character}</span>
              <p className="text-2xl font-bold text-blue-600">{selected.romaji}</p>
              <div className="flex items-center justify-center gap-2">
                <AudioButton audioUrl={selected.character} size="sm" />
                <span className="text-xs text-gray-500">Dengarkan pengucapan</span>
              </div>
            </div>

            {/* Example */}
            {selected.example && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Contoh Penggunaan</p>
                <p className="text-sm text-blue-900 font-medium">{selected.example}</p>
              </div>
            )}

            {/* Stroke Practice */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-purple-600" />
                Latihan Menulis
              </h4>
              <div className="flex justify-center">
                <StrokePracticeCanvas character={selected.character} width={220} height={220} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => {
                const currentIdx = hiragana.findIndex(h => h.id === selected.id)
                const prevIdx = currentIdx > 0 ? currentIdx - 1 : hiragana.length - 1
                setSelected(hiragana[prevIdx])
              }}>← Sebelumnya</Button>
              <Button className="flex-1" onClick={() => {
                const currentIdx = hiragana.findIndex(h => h.id === selected.id)
                const nextIdx = currentIdx < hiragana.length - 1 ? currentIdx + 1 : 0
                setSelected(hiragana[nextIdx])
              }}>Selanjutnya →</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
