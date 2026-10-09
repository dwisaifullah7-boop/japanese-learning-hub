'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { Sparkles, Search, CheckCircle2, AlertTriangle, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdjectiveItem {
  id: string
  type: 'i-adj' | 'na-adj'
  kanji: string
  kana: string
  romaji: string
  meaning: string
  // Conjugated forms
  presentPos: string
  presentNeg: string
  pastPos: string
  pastNeg: string
  nounMod: string
  note?: string
}

const ADJECTIVES_DATA: AdjectiveItem[] = [
  // I-Adjectives
  {
    id: 'ookii',
    type: 'i-adj',
    kanji: '大きい',
    kana: 'おおきい',
    romaji: 'ookii',
    meaning: 'Besar',
    presentPos: 'おおきいです',
    presentNeg: 'おおきくないです',
    pastPos: 'おおきかったです',
    pastNeg: 'おおきくなかったです',
    nounMod: 'おおきい いえ (Rumah yang besar)',
  },
  {
    id: 'chiisai',
    type: 'i-adj',
    kanji: '小さい',
    kana: 'ちいさい',
    romaji: 'chiisai',
    meaning: 'Kecil',
    presentPos: 'ちいさいです',
    presentNeg: 'ちいさくないです',
    pastPos: 'ちいさかったです',
    pastNeg: 'ちいさくなかったです',
    nounMod: 'ちいさい くるま (Mobil yang kecil)',
  },
  {
    id: 'atarashii',
    type: 'i-adj',
    kanji: '新しい',
    kana: 'あたらしい',
    romaji: 'atarashii',
    meaning: 'Baru',
    presentPos: 'あたらしいたです',
    presentNeg: 'あたらしくないです',
    pastPos: 'あたらしかったです',
    pastNeg: 'あたらしくなかったです',
    nounMod: 'あたらしい ほん (Buku yang baru)',
  },
  {
    id: 'furui',
    type: 'i-adj',
    kanji: '古い',
    kana: 'ふるい',
    romaji: 'furui',
    meaning: 'Lama / Kuno',
    presentPos: 'ふるいです',
    presentNeg: 'ふるくないです',
    pastPos: 'ふるかったです',
    pastNeg: 'ふるくなかったです',
    nounMod: 'ふるい まち (Kota yang kuno)',
  },
  {
    id: 'ii',
    type: 'i-adj',
    kanji: '良い',
    kana: 'いい',
    romaji: 'ii / yoi',
    meaning: 'Bagus / Baik',
    presentPos: 'いいです',
    presentNeg: 'よくないです',
    pastPos: 'よかったです',
    pastNeg: 'よくなかったです',
    nounMod: 'いい てんき (Cuaca yang bagus)',
    note: 'Pengecualian khusus: perubahan negatif dan lampau menggunakan akar よい (yoi)',
  },
  {
    id: 'warui',
    type: 'i-adj',
    kanji: '悪い',
    kana: 'わるい',
    romaji: 'warui',
    meaning: 'Buruk / Jelek',
    presentPos: 'わるいです',
    presentNeg: 'わるくないです',
    pastPos: 'わるかったです',
    pastNeg: 'わるくなかったです',
    nounMod: 'わるい ひと (Orang yang jahat)',
  },
  {
    id: 'atsui',
    type: 'i-adj',
    kanji: '暑い',
    kana: 'あつい',
    romaji: 'atsui',
    meaning: 'Panas (udara)',
    presentPos: 'あついです',
    presentNeg: 'あつくないです',
    pastPos: 'あつかったです',
    pastNeg: 'あつくなかったです',
    nounMod: 'あつい ひ (Hari yang panas)',
  },
  {
    id: 'samui',
    type: 'i-adj',
    kanji: '寒い',
    kana: 'さむい',
    romaji: 'samui',
    meaning: 'Dingin (udara)',
    presentPos: 'さむいです',
    presentNeg: 'さむくないです',
    pastPos: 'さむかったです',
    pastNeg: 'さむくなかったです',
    nounMod: 'さむい くに (Negara yang dingin)',
  },

  // Na-Adjectives
  {
    id: 'kirei',
    type: 'na-adj',
    kanji: '奇麗',
    kana: 'きれい',
    romaji: 'kirei',
    meaning: 'Cantik / Bersih / Indah',
    presentPos: 'きれい です',
    presentNeg: 'きれい じゃありません',
    pastPos: 'きれい でした',
    pastNeg: 'きれい じゃありませんでした',
    nounMod: 'きれいな はな (Bunga yang indah)',
    note: 'Berakhiran suara "i" tapi TERMASUK na-adjective!',
  },
  {
    id: 'shizuka',
    type: 'na-adj',
    kanji: '静か',
    kana: 'しずか',
    romaji: 'shizuka',
    meaning: 'Tenang / Sunyi',
    presentPos: 'しずか です',
    presentNeg: 'しずか じゃありません',
    pastPos: 'しずか でした',
    pastNeg: 'しずか じゃありませんでした',
    nounMod: 'しずかな まち (Kota yang tenang)',
  },
  {
    id: 'nigiyaka',
    type: 'na-adj',
    kanji: '賑やか',
    kana: 'にぎやか',
    romaji: 'nigiyaka',
    meaning: 'Ramai / Meriah',
    presentPos: 'にぎやか です',
    presentNeg: 'にぎやか じゃありません',
    pastPos: 'にぎやか でした',
    pastNeg: 'にぎやか じゃありませんでした',
    nounMod: 'にぎやかな とおり (Jalan yang ramai)',
  },
  {
    id: 'yuumei',
    type: 'na-adj',
    kanji: '有名',
    kana: 'ゆうめい',
    romaji: 'yuumei',
    meaning: 'Terkenal',
    presentPos: 'ゆうめい です',
    presentNeg: 'ゆうめい じゃありません',
    pastPos: 'ゆうめい でした',
    pastNeg: 'ゆうめい じゃありませんでした',
    nounMod: 'ゆうめいな レストラン (Restoran terkenal)',
    note: 'Berakhiran suara "i" tapi TERMASUK na-adjective!',
  },
  {
    id: 'benri',
    type: 'na-adj',
    kanji: '便利',
    kana: 'べんり',
    romaji: 'benri',
    meaning: 'Praktis / Mudah',
    presentPos: 'べんり です',
    presentNeg: 'べんり じゃありません',
    pastPos: 'べんり でした',
    pastNeg: 'べんり じゃありませんでした',
    nounMod: 'べんりな ちかてつ (Kereta MRT yang praktis)',
  },
  {
    id: 'genki',
    type: 'na-adj',
    kanji: '元気',
    kana: 'げんき',
    romaji: 'genki',
    meaning: 'Sehat / Semangat',
    presentPos: 'げんき です',
    presentNeg: 'げんき じゃありません',
    pastPos: 'げんき でした',
    pastNeg: 'げんき じゃありませんでした',
    nounMod: 'げんきな こども (Anak yang bersemangat)',
  },
]

export function AdjectivesGuideClient() {
  const [filterType, setFilterType] = useState<'all' | 'i-adj' | 'na-adj'>('all')
  const [search, setSearch] = useState('')

  const filtered = ADJECTIVES_DATA.filter(item => {
    const matchesFilter = filterType === 'all' || item.type === filterType
    const matchesSearch =
      item.kana.toLowerCase().includes(search.toLowerCase()) ||
      item.kanji.toLowerCase().includes(search.toLowerCase()) ||
      item.meaning.toLowerCase().includes(search.toLowerCase()) ||
      item.romaji.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Search & Group Filter */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kata sifat atau arti..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            size="sm"
            variant={filterType === 'all' ? 'default' : 'outline'}
            className="text-xs h-8 rounded-lg"
            onClick={() => setFilterType('all')}
          >
            Semua ({ADJECTIVES_DATA.length})
          </Button>
          <Button
            size="sm"
            variant={filterType === 'i-adj' ? 'default' : 'outline'}
            className={`text-xs h-8 rounded-lg ${filterType === 'i-adj' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            onClick={() => setFilterType('i-adj')}
          >
            い-Adjective (い形容詞)
          </Button>
          <Button
            size="sm"
            variant={filterType === 'na-adj' ? 'default' : 'outline'}
            className={`text-xs h-8 rounded-lg ${filterType === 'na-adj' ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
            onClick={() => setFilterType('na-adj')}
          >
            な-Adjective (な形容詞)
          </Button>
        </div>
      </div>

      {/* Comparison Rules Helper Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* I-Adjective Rule */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <h4 className="font-bold text-blue-900 text-sm">Rumus い-Adjective (い形容詞)</h4>
          </div>
          <ul className="text-xs text-blue-800 space-y-1.5 list-disc list-inside">
            <li><strong>Kini Positif:</strong> [Kata Sifat] + です (たかいです)</li>
            <li><strong>Kini Negatif:</strong> Buang い ganti <strong>〜くないです</strong> (たかくないです)</li>
            <li><strong>Lampau Positif:</strong> Buang い ganti <strong>〜かったです</strong> (たかかったです)</li>
            <li><strong>Menerangkan Benda:</strong> Langsung + KB (<strong>たかい くるま</strong>)</li>
          </ul>
        </div>

        {/* Na-Adjective Rule */}
        <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-600" />
            <h4 className="font-bold text-purple-900 text-sm">Rumus な-Adjective (な形容詞)</h4>
          </div>
          <ul className="text-xs text-purple-800 space-y-1.5 list-disc list-inside">
            <li><strong>Kini Positif:</strong> [Kata Sifat] + です (しずかです — な Dibuang!)</li>
            <li><strong>Kini Negatif:</strong> [Kata Sifat] + <strong>〜じゃありません</strong></li>
            <li><strong>Lampau Positif:</strong> [Kata Sifat] + <strong>〜でした</strong> (しずかでした)</li>
            <li><strong>Menerangkan Benda:</strong> WAJIB pakai <strong>な</strong> (<strong>しずかな まち</strong>)</li>
          </ul>
        </div>
      </div>

      {/* Adjectives Cards Grid */}
      <div className="space-y-4">
        {filtered.map(adj => (
          <div
            key={adj.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div
              className={`p-4 text-white flex flex-col sm:flex-row justify-between sm:items-center gap-2 ${
                adj.type === 'i-adj'
                  ? 'bg-gradient-to-r from-blue-900 to-indigo-950'
                  : 'bg-gradient-to-r from-purple-900 to-slate-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold font-japanese">{adj.kanji}</span>
                <div>
                  <p className="text-base font-bold font-japanese text-blue-200">{adj.kana}</p>
                  <p className="text-xs text-gray-300 font-sans">{adj.romaji}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                  {adj.meaning}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    adj.type === 'i-adj' ? 'bg-blue-400 text-blue-950' : 'bg-purple-300 text-purple-950'
                  }`}
                >
                  {adj.type === 'i-adj' ? 'い形容詞' : 'な形容詞'}
                </span>
                <AudioButton audioUrl={adj.kana} size="sm" />
              </div>
            </div>

            {/* Note alert if any */}
            {adj.note && (
              <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                {adj.note}
              </div>
            )}

            {/* 4 Conjugated Tenses Grid */}
            <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">Kini Positif</span>
                <p className="font-bold text-gray-900 font-japanese text-sm">{adj.presentPos}</p>
                <div className="flex justify-end pt-1">
                  <AudioButton audioUrl={adj.presentPos} size="sm" />
                </div>
              </div>

              <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100 space-y-1">
                <span className="text-[10px] font-bold text-rose-600 uppercase block">Kini Negatif</span>
                <p className="font-bold text-rose-950 font-japanese text-sm">{adj.presentNeg}</p>
                <div className="flex justify-end pt-1">
                  <AudioButton audioUrl={adj.presentNeg} size="sm" />
                </div>
              </div>

              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase block">Lampau Positif</span>
                <p className="font-bold text-blue-950 font-japanese text-sm">{adj.pastPos}</p>
                <div className="flex justify-end pt-1">
                  <AudioButton audioUrl={adj.pastPos} size="sm" />
                </div>
              </div>

              <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-100 space-y-1">
                <span className="text-[10px] font-bold text-purple-600 uppercase block">Lampau Negatif</span>
                <p className="font-bold text-purple-950 font-japanese text-sm">{adj.pastNeg}</p>
                <div className="flex justify-end pt-1">
                  <AudioButton audioUrl={adj.pastNeg} size="sm" />
                </div>
              </div>
            </div>

            {/* Noun Modification Example */}
            <div className="bg-slate-50 px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Menerangkan Benda:</span>
                <span className="font-bold font-japanese text-gray-900">{adj.nounMod}</span>
              </div>
              <AudioButton audioUrl={adj.nounMod.split(' ')[0]} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
