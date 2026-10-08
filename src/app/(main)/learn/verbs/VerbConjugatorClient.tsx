'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { Search, Sparkles, Filter, CheckCircle2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface VerbItem {
  id: string
  kanji: string
  kana: string
  romaji: string
  meaning: string
  group: 'Group 1 (Godan)' | 'Group 2 (Ichidan)' | 'Group 3 (Irregular)'
  masu: string
  masen: string
  mashita: string
  masendeshita: string
}

export function VerbConjugatorClient({ verbs }: { verbs: VerbItem[] }) {
  const [search, setSearch] = useState('')
  const [selectedTense, setSelectedTense] = useState<'all' | 'masu' | 'masen' | 'mashita' | 'masendeshita'>('all')

  const filteredVerbs = verbs.filter(v =>
    v.kana.toLowerCase().includes(search.toLowerCase()) ||
    v.kanji.toLowerCase().includes(search.toLowerCase()) ||
    v.meaning.toLowerCase().includes(search.toLowerCase()) ||
    v.romaji.toLowerCase().includes(search.toLowerCase())
  )

  const tenseDescriptions = {
    all: 'Menampilkan seluruh 4 bentuk konjugasi formal (〜ます, 〜ません, 〜ました, 〜ませんでした).',
    masu: 'Bentuk Sekarang / Masa Depan Positif (〜ます) — "Melakukan / Akan melakukan".',
    masen: 'Bentuk Sekarang / Masa Depan Negatif (〜ません) — "Tidak melakukan / Tidak akan".',
    mashita: 'Bentuk Lampau Positif (〜ました) — "Sudah melakukan".',
    masendeshita: 'Bentuk Lampau Negatif (〜ませんでした) — "Tidak melakukan di waktu lampau".',
  }

  return (
    <div className="space-y-6">
      {/* Search and Tense Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kerja atau arti..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Tense Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            <Button
              size="sm"
              variant={selectedTense === 'all' ? 'default' : 'outline'}
              className="text-xs h-8 rounded-lg"
              onClick={() => setSelectedTense('all')}
            >
              Semua Bentuk
            </Button>
            <Button
              size="sm"
              variant={selectedTense === 'masu' ? 'default' : 'outline'}
              className={`text-xs h-8 rounded-lg ${selectedTense === 'masu' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
              onClick={() => setSelectedTense('masu')}
            >
              〜ます
            </Button>
            <Button
              size="sm"
              variant={selectedTense === 'masen' ? 'default' : 'outline'}
              className={`text-xs h-8 rounded-lg ${selectedTense === 'masen' ? 'bg-rose-600 hover:bg-rose-700' : ''}`}
              onClick={() => setSelectedTense('masen')}
            >
              〜ません
            </Button>
            <Button
              size="sm"
              variant={selectedTense === 'mashita' ? 'default' : 'outline'}
              className={`text-xs h-8 rounded-lg ${selectedTense === 'mashita' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              onClick={() => setSelectedTense('mashita')}
            >
              〜ました
            </Button>
            <Button
              size="sm"
              variant={selectedTense === 'masendeshita' ? 'default' : 'outline'}
              className={`text-xs h-8 rounded-lg ${selectedTense === 'masendeshita' ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
              onClick={() => setSelectedTense('masendeshita')}
            >
              〜ませんでした
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          {tenseDescriptions[selectedTense]}
        </p>
      </div>

      {/* Verbs Conjugation Grid */}
      <div className="space-y-4">
        {filteredVerbs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500">
            Kata kerja tidak ditemukan dengan kata kunci &quot;{search}&quot;.
          </div>
        ) : (
          filteredVerbs.map(verb => (
            <div
              key={verb.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header Bar */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 text-white flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold font-japanese">{verb.kanji}</span>
                  <span className="text-sm text-blue-200 font-japanese">({verb.kana})</span>
                  <span className="text-xs text-gray-300 font-sans italic">{verb.romaji}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-white/15 px-3 py-1 rounded-full text-blue-100">
                    {verb.meaning}
                  </span>
                  <AudioButton audioUrl={verb.kana} size="sm" />
                </div>
              </div>

              {/* Conjugation Columns */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Present Affirmative */}
                {(selectedTense === 'all' || selectedTense === 'masu') && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block">Kini Positif (〜ます)</span>
                    <p className="text-lg font-bold font-japanese text-gray-900">{verb.masu}</p>
                    <p className="text-xs text-gray-600">Akan / Biasa {verb.meaning}</p>
                    <div className="pt-1 flex justify-end">
                      <AudioButton audioUrl={verb.masu} size="sm" />
                    </div>
                  </div>
                )}

                {/* Present Negative */}
                {(selectedTense === 'all' || selectedTense === 'masen') && (
                  <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-rose-700 block">Kini Negatif (〜ません)</span>
                    <p className="text-lg font-bold font-japanese text-gray-900">{verb.masen}</p>
                    <p className="text-xs text-gray-600">Tidak {verb.meaning}</p>
                    <div className="pt-1 flex justify-end">
                      <AudioButton audioUrl={verb.masen} size="sm" />
                    </div>
                  </div>
                )}

                {/* Past Affirmative */}
                {(selectedTense === 'all' || selectedTense === 'mashita') && (
                  <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-blue-700 block">Lampau Positif (〜ました)</span>
                    <p className="text-lg font-bold font-japanese text-gray-900">{verb.mashita}</p>
                    <p className="text-xs text-gray-600">Sudah / Telah {verb.meaning}</p>
                    <div className="pt-1 flex justify-end">
                      <AudioButton audioUrl={verb.mashita} size="sm" />
                    </div>
                  </div>
                )}

                {/* Past Negative */}
                {(selectedTense === 'all' || selectedTense === 'masendeshita') && (
                  <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-700 block">Lampau Negatif (〜ませんでした)</span>
                    <p className="text-base font-bold font-japanese text-gray-900">{verb.masendeshita}</p>
                    <p className="text-xs text-gray-600">Tidak (di waktu lampau)</p>
                    <div className="pt-1 flex justify-end">
                      <AudioButton audioUrl={verb.masendeshita} size="sm" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
