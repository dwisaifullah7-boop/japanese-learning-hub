'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { Compass, Sparkles, Box, CheckCircle2, ArrowRight } from 'lucide-react'

interface PositionItem {
  id: string
  kanji: string
  kana: string
  romaji: string
  meaning: string
  opposite?: string
  example: string
  translation: string
}

const POSITIONS_DATA: PositionItem[] = [
  {
    id: 'ue',
    kanji: '上',
    kana: 'うえ',
    romaji: 'ue',
    meaning: 'Atas / Di atas',
    opposite: '下 (した - Bawah)',
    example: 'つくえの うえに ほんが あります。',
    translation: 'Di atas meja ada buku.',
  },
  {
    id: 'shita',
    kanji: '下',
    kana: 'した',
    romaji: 'shita',
    meaning: 'Bawah / Di bawah',
    opposite: '上 (うえ - Atas)',
    example: 'いすの したに ねこが います。',
    translation: 'Di bawah kursi ada kucing.',
  },
  {
    id: 'mae',
    kanji: '前',
    kana: 'まえ',
    romaji: 'mae',
    meaning: 'Depan / Di depan',
    opposite: '後ろ (うしろ - Belakang)',
    example: 'えきの まえに タクシーが あります。',
    translation: 'Di depan stasiun ada taksi.',
  },
  {
    id: 'ushiro',
    kanji: '後ろ',
    kana: 'うしろ',
    romaji: 'ushiro',
    meaning: 'Belakang / Di belakang',
    opposite: '前 (まえ - Depan)',
    example: 'たなかさんの うしろに だれも いません。',
    translation: 'Di belakang Sdr. Tanaka tidak ada siapa-siapa.',
  },
  {
    id: 'migi',
    kanji: '右',
    kana: 'みぎ',
    romaji: 'migi',
    meaning: 'Kanan / Di sebelah kanan',
    opposite: '左 (ひだり - Kiri)',
    example: 'ぎんこうの みぎに ゆうびんきょくが あります。',
    translation: 'Di sebelah kanan bank ada kantor pos.',
  },
  {
    id: 'hidari',
    kanji: '左',
    kana: 'ひだり',
    romaji: 'hidari',
    meaning: 'Kiri / Di sebelah kiri',
    opposite: '右 (みぎ - Kanan)',
    example: 'ほんやの ひだりに はなやが あります。',
    translation: 'Di sebelah kiri toko buku ada toko bunga.',
  },
  {
    id: 'naka',
    kanji: '中',
    kana: 'なか',
    romaji: 'naka',
    meaning: 'Dalam / Di dalam',
    opposite: '外 (そと - Luar)',
    example: 'はこの なかに しゃしんが あります。',
    translation: 'Di dalam kotak ada foto.',
  },
  {
    id: 'soto',
    kanji: '外',
    kana: 'そと',
    romaji: 'soto',
    meaning: 'Luar / Di luar',
    opposite: '中 (なか - Dalam)',
    example: 'いえの そとに こどもが います。',
    translation: 'Di luar rumah ada anak-anak.',
  },
  {
    id: 'tonari',
    kanji: '隣',
    kana: 'となり',
    romaji: 'tonari',
    meaning: 'Sebelah persis (tipe benda sejenis)',
    opposite: '近く (ちかく - Dekat umum)',
    example: 'デパートの となりに レストランが あります。',
    translation: 'Tepat di samping toserba ada restoran.',
  },
  {
    id: 'aida',
    kanji: '間',
    kana: 'あいだ',
    romaji: 'aida',
    meaning: 'Antara (di tengah A dan B)',
    example: 'ぎんこうと ほんやの あいだに きっさてんが あります。',
    translation: 'Di antara bank dan toko buku ada kafe.',
  },
]

export function PositionsGuideClient() {
  const [selectedPos, setSelectedPos] = useState<PositionItem>(POSITIONS_DATA[0])

  return (
    <div className="space-y-8">
      {/* Visual Spatial Box Preview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" /> Panduan Posisi Ruang (位置関係)
            </div>

            <div className="flex items-center gap-4">
              <span className="text-6xl sm:text-7xl font-black font-japanese text-white">
                {selectedPos.kanji}
              </span>
              <div>
                <p className="text-2xl font-bold font-japanese text-blue-300">{selectedPos.kana}</p>
                <p className="text-sm text-gray-300 font-sans">{selectedPos.romaji} — {selectedPos.meaning}</p>
                {selectedPos.opposite && (
                  <p className="text-xs text-amber-300 mt-1">Lawan: {selectedPos.opposite}</p>
                )}
              </div>
            </div>

            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-200">Contoh Kalimat</span>
              <p className="text-base font-japanese font-semibold">{selectedPos.example}</p>
              <p className="text-xs text-gray-300">{selectedPos.translation}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <AudioButton audioUrl={selectedPos.kana} size="lg" />
            <span className="text-xs text-blue-200">Dengarkan Pengucapan</span>
          </div>
        </div>
      </div>

      {/* Difference Imasu vs Arimasu Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600" />
            <h4 className="font-bold text-emerald-950 text-sm">います (Imasu) — Makhluk Bernyawa</h4>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            Digunakan untuk subjek yang memiliki nyawa dan mampu bergerak sendiri: <strong>Orang (人), Anak (子供), Anjing (犬), Kucing (猫)</strong>.
          </p>
          <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 text-xs text-emerald-950 font-japanese font-semibold">
            へやに いぬが います (Di kamar ada anjing)
          </div>
        </div>

        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <h4 className="font-bold text-blue-950 text-sm">あります (Arimasu) — Benda Mati & Tanaman</h4>
          </div>
          <p className="text-xs text-blue-900 leading-relaxed">
            Digunakan untuk subjek yang tidak bernyawa: <strong>Meja (机), Buku (本), Mobil (車), Gedung, Pohon (木), Bunga (花)</strong>.
          </p>
          <div className="bg-white/80 p-2.5 rounded-xl border border-blue-100 text-xs text-blue-950 font-japanese font-semibold">
            へやに つくえが あります (Di kamar ada meja)
          </div>
        </div>
      </div>

      {/* Position Cards Interactive Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Box className="w-4 h-4 text-blue-600" />
          Pilih Posisi untuk Melihat Rumus & Contoh:
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {POSITIONS_DATA.map(item => {
            const isSelected = selectedPos.id === item.id
            return (
              <button
                key={item.id}
                onClick={() => setSelectedPos(item)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-400 shadow-md scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <span className="text-3xl font-bold font-japanese text-gray-900">{item.kanji}</span>
                <span className="text-sm font-bold text-blue-700 font-japanese">{item.kana}</span>
                <span className="text-xs text-gray-500 font-sans">{item.meaning}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
