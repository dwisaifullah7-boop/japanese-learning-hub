'use client'

import { useState } from 'react'
import { StrokePracticeCanvas } from '@/components/shared/StrokePracticeCanvas'
import { AudioButton } from '@/components/shared/AudioButton'
import { X, PenTool, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface KanjiItem {
  id: string
  character: string
  hiragana?: string | null
  romaji?: string | null
  meaning?: string | null
  onyomi?: string | null
  kunyomi?: string | null
  jlptLevel?: string | null
}

export function KanjiGridClient({ kanji }: { kanji: KanjiItem[] }) {
  const [selected, setSelected] = useState<KanjiItem | null>(null)

  return (
    <>
      {/* Kanji Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kanji.map(k => (
          <div
            key={k.id}
            onClick={() => setSelected(k)}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:border-red-300 transition-all cursor-pointer group"
          >
            <div className="flex">
              <div className="bg-gradient-to-b from-slate-800 to-red-950 p-6 flex items-center justify-center min-w-[100px] group-hover:scale-105 transition-transform">
                <span className="text-5xl font-bold text-white font-japanese">{k.character}</span>
              </div>
              <div className="p-5 flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                    {k.meaning}
                  </h3>
                  <div onClick={e => e.stopPropagation()}>
                    <AudioButton audioUrl={k.hiragana || k.character} size="sm" />
                  </div>
                </div>

                {k.hiragana && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-500">Kunyomi:</span>{' '}
                    <span className="font-japanese font-medium text-gray-900">{k.kunyomi || k.hiragana}</span>
                  </p>
                )}

                {k.onyomi && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-500">Onyomi:</span>{' '}
                    <span className="font-japanese font-medium text-blue-800">{k.onyomi}</span>
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full font-bold">
                    {k.jlptLevel || 'JLPT N5'}
                  </span>
                  <span className="text-xs text-blue-600 font-semibold group-hover:underline flex items-center gap-1">
                    <PenTool className="w-3 h-3" /> Latih Menulis
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal / Stroke Practice Canvas */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Kanji Character Header */}
            <div className="text-center space-y-2">
              <span className="text-8xl font-bold text-gray-900 font-japanese block">{selected.character}</span>
              <h3 className="text-2xl font-black text-red-700">{selected.meaning}</h3>
              <div className="flex items-center justify-center gap-2">
                <AudioButton audioUrl={selected.hiragana || selected.character} size="sm" />
                <span className="text-xs text-gray-500">Dengar pengucapan</span>
              </div>
            </div>

            {/* Readings Info Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2 text-sm">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Level</span>
                <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {selected.jlptLevel || 'JLPT N5'}
                </span>
              </div>
              {selected.onyomi && (
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-bold text-blue-600">音読み (Onyomi)</span>
                  <span className="font-japanese font-bold text-gray-900">{selected.onyomi}</span>
                </div>
              )}
              {selected.kunyomi && (
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-600">訓読み (Kunyomi)</span>
                  <span className="font-japanese font-bold text-gray-900">{selected.kunyomi}</span>
                </div>
              )}
            </div>

            {/* Stroke Practice Canvas */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-purple-600" />
                Latihan Menulis Kanji
              </h4>
              <div className="flex justify-center">
                <StrokePracticeCanvas character={selected.character} width={220} height={220} />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const currentIdx = kanji.findIndex(k => k.id === selected.id)
                  const prevIdx = currentIdx > 0 ? currentIdx - 1 : kanji.length - 1
                  setSelected(kanji[prevIdx])
                }}
              >
                ← Sebelumnya
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => {
                  const currentIdx = kanji.findIndex(k => k.id === selected.id)
                  const nextIdx = currentIdx < kanji.length - 1 ? currentIdx + 1 : 0
                  setSelected(kanji[nextIdx])
                }}
              >
                Selanjutnya →
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
