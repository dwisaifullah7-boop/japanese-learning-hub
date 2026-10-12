'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { Calculator, Sparkles, Layers, BookOpen, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react'

interface CounterCategory {
  id: string
  name: string
  kanji: string
  suffix: string
  description: string
  targetObjects: string
  items: {
    number: number | string
    japanese: string
    kana: string
    romaji: string
    note?: string
  }[]
  exampleSentence: {
    japanese: string
    indonesian: string
  }
}

const COUNTER_CATEGORIES: CounterCategory[] = [
  {
    id: 'general',
    name: 'Hitungan Umum (Native Japanese)',
    kanji: 'つ',
    suffix: '～つ (tsu)',
    description: 'Hitungan dasar asli bahasa Jepang untuk benda bulat atau barang umum tanpa counter spesifik (1 sampai 10).',
    targetObjects: 'Apel, jeruk, kursi, kado, ide, pertanyaan, pesanan makanan',
    items: [
      { number: 1, japanese: '１つ', kana: 'ひとつ', romaji: 'hitotsu' },
      { number: 2, japanese: '２つ', kana: 'ふたつ', romaji: 'futatsu' },
      { number: 3, japanese: '３つ', kana: 'みっつ', romaji: 'mittsu', note: 'Bunyi konsonan ganda (tsu kecil)' },
      { number: 4, japanese: '４つ', kana: 'よっつ', romaji: 'yottsu', note: 'Bunyi konsonan ganda (tsu kecil)' },
      { number: 5, japanese: '５つ', kana: 'いつつ', romaji: 'itsutsu' },
      { number: 6, japanese: '６つ', kana: 'むっつ', romaji: 'muttsu', note: 'Bunyi konsonan ganda (tsu kecil)' },
      { number: 7, japanese: '７つ', kana: 'ななつ', romaji: 'nanatsu' },
      { number: 8, japanese: '８つ', kana: 'やっつ', romaji: 'yattsu', note: 'Bunyi konsonan ganda (tsu kecil)' },
      { number: 9, japanese: '９つ', kana: 'ここのつ', romaji: 'kokonotsu' },
      { number: 10, japanese: '１０', kana: 'とお', romaji: 'too', note: 'Tanpa akhiran つ' },
      { number: '?', japanese: '幾つ', kana: 'いくつ', romaji: 'ikutsu', note: 'Kata tanya (berapa buah?)' },
    ],
    exampleSentence: {
      japanese: 'りんごを ３つ ください。',
      indonesian: 'Tolong beri saya 3 buah apel.',
    },
  },
  {
    id: 'people',
    name: 'Jumlah Orang',
    kanji: '人',
    suffix: '～人 (nin)',
    description: 'Menghitung orang. PENTING: Angka 1 dan 2 memiliki bacaan khusus yang tidak memakai -nin!',
    targetObjects: 'Siswa, teman, anggota keluarga, tamu, orang asing',
    items: [
      { number: 1, japanese: '１人', kana: 'ひとり', romaji: 'hitori', note: '⭐ Bacaan khusus (sendiri)' },
      { number: 2, japanese: '２人', kana: 'ふたり', romaji: 'futari', note: '⭐ Bacaan khusus (berdua)' },
      { number: 3, japanese: '３人', kana: 'さんにん', romaji: 'sannin' },
      { number: 4, japanese: '４人', kana: 'よにん', romaji: 'yonin', note: '⭐ Yonin (bukan yon-nin / shi-nin)' },
      { number: 5, japanese: '５人', kana: 'ごにん', romaji: 'gonin' },
      { number: 6, japanese: '６人', kana: 'ろくにん', romaji: 'rokunin' },
      { number: 7, japanese: '７人', kana: 'しちにん / ななにん', romaji: 'shichinin / nananin' },
      { number: 8, japanese: '８人', kana: 'はちにん', romaji: 'hachinin' },
      { number: 9, japanese: '９人', kana: 'きゅうにん / くにん', romaji: 'kyuunin / kunin' },
      { number: 10, japanese: '１０人', kana: 'じゅうにん', romaji: 'juunin' },
      { number: '?', japanese: '何人', kana: 'なんにん', romaji: 'nannin', note: 'Kata tanya (berapa orang?)' },
    ],
    exampleSentence: {
      japanese: 'きょうしつに がくせいが ４人 います。',
      indonesian: 'Di ruang kelas ada 4 orang siswa.',
    },
  },
  {
    id: 'flat',
    name: 'Benda Tipis & Pipih',
    kanji: '枚',
    suffix: '～枚 (mai)',
    description: 'Menghitung benda pipih, tipis, atau lembaran. Sangat teratur karena tidak ada perubahan bunyi.',
    targetObjects: 'Kertas, foto, prangko, piring, baju kaos, tiket, CD, kartu nama',
    items: [
      { number: 1, japanese: '１枚', kana: 'いちまい', romaji: 'ichimai' },
      { number: 2, japanese: '２枚', kana: 'にまい', romaji: 'nimai' },
      { number: 3, japanese: '３枚', kana: 'さんまい', romaji: 'sanmai' },
      { number: 4, japanese: '４枚', kana: 'よんまい', romaji: 'yonmai' },
      { number: 5, japanese: '５枚', kana: 'ごまい', romaji: 'gomai' },
      { number: 6, japanese: '６枚', kana: 'ろくまい', romaji: 'rokumai' },
      { number: 7, japanese: '７枚', kana: 'ななまい', romaji: 'nanamai' },
      { number: 8, japanese: '８枚', kana: 'はちまい', romaji: 'hachimai' },
      { number: 9, japanese: '９枚', kana: 'きゅうまい', romaji: 'kyuumai' },
      { number: 10, japanese: '１０枚', kana: 'じゅうまい', romaji: 'juumai' },
      { number: '?', japanese: '何枚', kana: 'なんまい', romaji: 'nanmai', note: 'Kata tanya (berapa lembar?)' },
    ],
    exampleSentence: {
      japanese: 'きってを ２枚 買いました。',
      indonesian: 'Saya membeli 2 lembar prangko.',
    },
  },
  {
    id: 'machines',
    name: 'Mesin & Kendaraan',
    kanji: '台',
    suffix: '～台 (dai)',
    description: 'Menghitung mesin mekanik, alat elektronik, dan transportasi darat.',
    targetObjects: 'Mobil, sepeda, motor, komputer, TV, kulkas, kamera',
    items: [
      { number: 1, japanese: '１台', kana: 'いちだい', romaji: 'ichidai' },
      { number: 2, japanese: '２台', kana: 'にだい', romaji: 'nidai' },
      { number: 3, japanese: '３台', kana: 'さんだい', romaji: 'sandai' },
      { number: 4, japanese: '４台', kana: 'よんだい', romaji: 'yondai' },
      { number: 5, japanese: '５台', kana: 'ごだい', romaji: 'godai' },
      { number: 6, japanese: '６台', kana: 'ろくだい', romaji: 'rokudai' },
      { number: 7, japanese: '７台', kana: 'ななだい', romaji: 'nanadai' },
      { number: 8, japanese: '８台', kana: 'はちだい', romaji: 'hachidai' },
      { number: 9, japanese: '９台', kana: 'きゅうだい', romaji: 'kyuudai' },
      { number: 10, japanese: '１０台', kana: 'じゅうだい', romaji: 'juudai' },
      { number: '?', japanese: '何台', kana: 'なんだい', romaji: 'nandai', note: 'Kata tanya (berapa unit?)' },
    ],
    exampleSentence: {
      japanese: 'わたしの うちに くるまが １台 あります。',
      indonesian: 'Di rumah saya ada 1 unit mobil.',
    },
  },
  {
    id: 'cylinders',
    name: 'Benda Panjang Silindris',
    kanji: '本',
    suffix: '～本 (hon / bon / pon)',
    description: 'Menghitung benda panjang dan silindris. Hati-hati dengan asimilasi bunyi: hon, bon, dan pon!',
    targetObjects: 'Pensil, pulpen, payung, botol, pohon, pisang, jalan kereta, film',
    items: [
      { number: 1, japanese: '１本', kana: 'いっぽん', romaji: 'ippon', note: '⭐ Bunyi p' },
      { number: 2, japanese: '２本', kana: 'にほん', romaji: 'nihon', note: 'Bunyi h' },
      { number: 3, japanese: '３本', kana: 'さんぼん', romaji: 'sanbon', note: '⭐ Bunyi b (rendaku)' },
      { number: 4, japanese: '４本', kana: 'よんほん', romaji: 'yonhon', note: 'Bunyi h' },
      { number: 5, japanese: '５本', kana: 'ごほん', romaji: 'gohon', note: 'Bunyi h' },
      { number: 6, japanese: '６本', kana: 'ろっぽん', romaji: 'roppon', note: '⭐ Bunyi p' },
      { number: 7, japanese: '７本', kana: 'ななほん', romaji: 'nanahon', note: 'Bunyi h' },
      { number: 8, japanese: '８本', kana: 'はっぽん', romaji: 'happon', note: '⭐ Bunyi p' },
      { number: 9, japanese: '９本', kana: 'きゅうほん', romaji: 'kyuuhon', note: 'Bunyi h' },
      { number: 10, japanese: '１０本', kana: 'じゅっぽん', romaji: 'juppon', note: '⭐ Bunyi p' },
      { number: '?', japanese: '何本', kana: 'なんぼん', romaji: 'nanbon', note: '⭐ Nanbon (bunyi b)' },
    ],
    exampleSentence: {
      japanese: 'ボールペンを ２本 買いました。',
      indonesian: 'Saya membeli 2 batang pulpen.',
    },
  },
  {
    id: 'frequency',
    name: 'Frekuensi & Kali',
    kanji: '回',
    suffix: '～回 (kai)',
    description: 'Menghitung berapa kali suatu aksi atau peristiwa dilakukan / berulang.',
    targetObjects: 'Nonton film, berlibur, berobat ke dokter, makan per hari, olahraga',
    items: [
      { number: 1, japanese: '１回', kana: 'いっかい', romaji: 'ikkai', note: '⭐ Bunyi konsonan ganda' },
      { number: 2, japanese: '２回', kana: 'にかい', romaji: 'nikai' },
      { number: 3, japanese: '３回', kana: 'さんかい', romaji: 'sankai' },
      { number: 4, japanese: '４回', kana: 'よんかい', romaji: 'yonkai' },
      { number: 5, japanese: '５回', kana: 'ごかい', romaji: 'gokai' },
      { number: 6, japanese: '６回', kana: 'ろっかい', romaji: 'rokkai', note: '⭐ Bunyi konsonan ganda' },
      { number: 7, japanese: '７回', kana: 'ななかい', romaji: 'nanakai' },
      { number: 8, japanese: '８回', kana: 'はっかい', romaji: 'hakkai', note: '⭐ Bunyi konsonan ganda' },
      { number: 9, japanese: '９回', kana: 'きゅうかい', romaji: 'kyuukai' },
      { number: 10, japanese: '１０回', kana: 'じゅっかい', romaji: 'jukkai', note: '⭐ Bunyi konsonan ganda' },
      { number: '?', japanese: '何回', kana: 'なんかい', romaji: 'nankai', note: 'Kata tanya (berapa kali?)' },
    ],
    exampleSentence: {
      japanese: '１か月に ２回 えいがを 見ます。',
      indonesian: 'Saya menonton film 2 kali dalam sebulan.',
    },
  },
]

export function CountersGuideClient() {
  const [activeTab, setActiveTab] = useState<string>('general')
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)

  const activeCategory = COUNTER_CATEGORIES.find((cat) => cat.id === activeTab) || COUNTER_CATEGORIES[0]

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 md:p-8 text-white shadow-xl border border-indigo-500/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
            <Calculator className="h-3.5 w-3.5" />
            Minna no Nihongo Bab 11 Guide
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Panduan Lengkap Kata Bantu Bilangan (助数詞 - Counters)
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Dalam bahasa Jepang, menghitung benda selalu disesuaikan dengan wujud dan karakteristik fisiknya.
            Kuasai hitungan umum <span className="text-amber-400 font-bold">ひとつ〜とお</span>, perubahan bunyi pada{' '}
            <span className="text-sky-400 font-bold">〜人</span>, <span className="text-emerald-400 font-bold">〜本</span>, hingga frekuensi rentang waktu.
          </p>
        </div>
      </div>

      {/* Rules Notice */}
      <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/20 p-5">
        <h3 className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-300 text-sm md:text-base mb-2">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          Kaidah Peletakan Kata Bilangan dalam Kalimat:
        </h3>
        <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          Dalam tata bahasa Jepang, counter umumnya diletakkan <strong>setelah partikel penanda objek atau subjek</strong>, tepat sebelum kata kerja:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">✅ Susunan Tepat:</span>
            <p className="font-japanese font-semibold mt-1">りんごを ３つ 買いました。</p>
            <p className="text-slate-500 text-xs">Objek (りんご) + Partikel (を) + Counter (３つ) + Kata Kerja (買いました)</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-rose-600 dark:text-rose-400 font-bold">❌ Susunan Kurang Alami:</span>
            <p className="font-japanese font-semibold mt-1 text-slate-400">３つの りんごを 買いました。</p>
            <p className="text-slate-500 text-xs">Bisa dipahami namun jarang digunakan dalam percakapan kasual sehari-hari.</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {COUNTER_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeTab
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id)
                setSelectedItemIndex(null)
              }}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span className="font-japanese font-bold text-base">{cat.kanji}</span>
              <span>{cat.name}</span>
            </button>
          )
        })}
      </div>

      {/* Active Category Header Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-japanese text-indigo-600 dark:text-indigo-400">
                {activeCategory.suffix}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {activeCategory.name}
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {activeCategory.description}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Benda Target:</span>
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{activeCategory.targetObjects}</span>
          </div>
        </div>

        {/* Counter Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-6">
          {activeCategory.items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedItemIndex(idx)}
              className={`relative flex flex-col justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                selectedItemIndex === idx
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {item.number}
                </span>
                <AudioButton audioUrl={item.kana} size="sm" />
              </div>

              <div className="my-2 text-center">
                <div className="text-xl font-bold font-japanese text-slate-900 dark:text-white">
                  {item.japanese}
                </div>
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.kana}
                </div>
                <div className="text-[11px] text-slate-400">
                  {item.romaji}
                </div>
              </div>

              {item.note && (
                <div className="mt-1 text-[10px] text-amber-600 dark:text-amber-400 font-medium leading-tight text-center bg-amber-50 dark:bg-amber-950/40 rounded p-1">
                  {item.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Example Sentence Section */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-50/30 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
          <div>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
              Contoh Kalimat Penggunaan:
            </span>
            <div className="font-japanese text-base font-bold text-slate-900 dark:text-white">
              {activeCategory.exampleSentence.japanese}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {activeCategory.exampleSentence.indonesian}
            </div>
          </div>
          <AudioButton audioUrl={activeCategory.exampleSentence.japanese} size="md" />
        </div>
      </div>

      {/* Summary Reference Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-indigo-500" />
          Rangkuman Satuan Waktu & Frekuensi (Bab 11)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Kategori</th>
                <th className="py-2.5 px-3">Kanji / Pola</th>
                <th className="py-2.5 px-3">Cara Baca</th>
                <th className="py-2.5 px-3">Arti & Contoh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Durasi Jam</td>
                <td className="py-2.5 px-3 font-japanese text-indigo-600 font-bold">～時間</td>
                <td className="py-2.5 px-3">～じかん (jikan)</td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">１時間 (1 jam), ２時間 (2 jam)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Durasi Minggu</td>
                <td className="py-2.5 px-3 font-japanese text-indigo-600 font-bold">～週間</td>
                <td className="py-2.5 px-3">～しゅうかん (shuukan)</td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">１週間 (1 minggu), ２週間 (2 minggu)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Durasi Bulan</td>
                <td className="py-2.5 px-3 font-japanese text-indigo-600 font-bold">～か月</td>
                <td className="py-2.5 px-3">～かげつ (kagetsu)</td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">１か月 (1 bulan), ６か月 (6 bulan)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Durasi Tahun</td>
                <td className="py-2.5 px-3 font-japanese text-indigo-600 font-bold">～年</td>
                <td className="py-2.5 px-3">～ねん (nen)</td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">１年 (1 tahun), ３年 (3 tahun)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Pertanyaan Durasi</td>
                <td className="py-2.5 px-3 font-japanese text-indigo-600 font-bold">どのくらい</td>
                <td className="py-2.5 px-3">どのくらい (donokurai)</td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">どのくらい かかりますか (Kira-kira butuh berapa lama?)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
