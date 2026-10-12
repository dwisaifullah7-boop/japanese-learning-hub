'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { GitFork, HeartHandshake, Sparkles, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react'

interface ConditionalItem {
  id: string
  title: string
  pattern: string
  meaning: string
  badge: string
  badgeColor: string
  characteristics: string
  examples: {
    japanese: string
    kana: string
    romaji: string
    translation: string
    note: string
  }[]
}

const CONDITIONALS_DATA: ConditionalItem[] = [
  {
    id: 'to',
    title: 'Pengandaian Pasti / Otomatis (～と)',
    pattern: 'KK Bentuk Kamus + と、[Hasil]',
    meaning: 'Kalau / Jika [Aksi], pasti otomatis [Hasil]',
    badge: 'Otomatis / Alami',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    characteristics: 'Digunakan untuk hukum alam, pengoperasian tombol mesin, atau petunjuk arah jalan. Kalimat hasil TIDAK BOLEH berupa perintah, izin, atau ajakan.',
    examples: [
      {
        japanese: 'この ボタンを 押すと、お釣りが 出ます。',
        kana: 'この ボタンを おすと、おつりが でます。',
        romaji: 'Kono botan o osu to, otsuri ga demasu.',
        translation: 'Jika menekan tombol ini, uang kembalian pasti keluar.',
        note: 'Operasi mesin otomatis',
      },
      {
        japanese: 'あの 交差点を 右へ 曲がると、郵便局が あります。',
        kana: 'あの こうさてんを みぎへ まがると、ゆうびんきょくが あります。',
        romaji: 'Ano kousaten o migi e magaru to, yuubinkyoku ga arimasu.',
        translation: 'Jika belok kanan di perempatan itu, ada kantor pos.',
        note: 'Petunjuk rute arah jalan',
      },
    ],
  },
  {
    id: 'tara',
    title: 'Pengandaian Fleksibel (～たら)',
    pattern: '[KK/Sifat/KB Bentuk-Ta] + ら、[Kalimat]',
    meaning: 'Kalau / Jika [Syarat Terpenuhi] / Setelah [Pasti Terjadi]',
    badge: 'Paling Fleksibel',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    characteristics: 'Paling sering digunakan dalam percakapan sehari-hari. Boleh diikuti oleh perintah, ajakan, niat, atau izin. Dapat diperkuat dengan kata "もし (moshi)".',
    examples: [
      {
        japanese: 'お金が あったら、新しい 車を 買いたいです。',
        kana: 'おかねが あったら、あたらしい くるまを かいたいです。',
        romaji: 'Okane ga attara, atarashii kuruma o kaitai desu.',
        translation: 'Kalau punya uang, saya ingin membeli mobil baru.',
        note: 'Pengandaian bersyarat fleksibel',
      },
      {
        japanese: '１０時に なったら、出かけましょう。',
        kana: 'じゅうじに なったら、でかけましょう。',
        romaji: 'Juuji ni nattara, dekakemashou.',
        translation: 'Setelah jam 10 tiba, ayo kita berangkat.',
        note: 'Makna "setelah kepastian waktu tiba"',
      },
    ],
  },
  {
    id: 'temo',
    title: 'Pengandaian Pertentangan (～ても / ～でも)',
    pattern: 'KK ても / I-adj くても / Na-adj & KB でも',
    meaning: 'Walaupun / Meskipun [Kondisi], tetap [Hal Sebaliknya]',
    badge: 'Kontras / Hambatan',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    characteristics: 'Kebalikan dari Tara. Tindakan utama tetap dilaksanakan kendati ada rintangan atau situasi yang tidak mendukung. Dapat diperkuat dengan "いくら (ikura)".',
    examples: [
      {
        japanese: '雨が 降っても、サッカーを します。',
        kana: 'あめが ふっても、サッカーを します。',
        romaji: 'Ame ga futtemo, sakkaa o shimasu.',
        translation: 'Walaupun hujan turun, saya tetap akan bermain sepak bola.',
        note: 'Aksi tetap berjalan menembus kondisi',
      },
      {
        japanese: 'いくら 高くても、この パソコンが 買いたいです。',
        kana: 'いくら たかくても、この パソコンが かいたいです。',
        romaji: 'Ikura takakutemo, kono pasokon ga kaitai desu.',
        translation: 'Betapapun mahalnya, saya tetap ingin membeli laptop ini.',
        note: 'Penguatan dengan ikura (betapapun)',
      },
    ],
  },
  {
    id: 'toki',
    title: 'Kondisi Waktu (～とき)',
    pattern: '[Futsūkei / KB の] とき、[Kalimat]',
    meaning: 'Ketika / Saat [Waktu / Kondisi]',
    badge: 'Waktu / Timing',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    characteristics: 'Membedakan waktu kejadian: KK Kamus とき (sebelum/saat melakukan aksi) vs KK Ta とき (setelah aksi selesai dilakukan).',
    examples: [
      {
        japanese: 'ご飯を 食べる とき、「いただきます」と 言います。',
        kana: 'ごはんを たべる とき、「いただきます」と いいます。',
        romaji: 'Gohan o taberu toki, "itadakimasu" to iimasu.',
        translation: 'Ketika hendak makan nasi, mengucapkan "itadakimasu".',
        note: 'Sebelum makan (Kamus)',
      },
      {
        japanese: '日本へ 行った とき、着物を 買いました。',
        kana: 'にほんへ いった とき、きものを かいました。',
        romaji: 'Nihon e itta toki, kimono o kaimashita.',
        translation: 'Ketika sudah tiba di Jepang, saya membeli kimono.',
        note: 'Setelah sampai di Jepang (Ta-form)',
      },
    ],
  },
]

const FAVORS_DATA = [
  {
    pattern: '～て くれます',
    title: 'Kebaikan untuk DIRI SAYA / Keluarga Saya',
    explanation: 'Orang lain berinisiatif memberikan bantuan atau melakukan tindakan yang menguntungkan pembicara. Subjek selalu ditandai partikel が.',
    example: '山田さんが 傘を 貸して くれました。',
    romaji: 'Yamada-san ga kasa o kashite kuremashita.',
    translation: 'Sdr. Yamada berbaik hati meminjamkan payung kepada saya.',
    badge: 'Kebaikan Masuk (Inbound)',
    badgeColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40',
  },
  {
    pattern: '～て もらいます',
    title: 'SAYA Menerima Kebaikan dari Pihak Lain',
    explanation: 'Pembicara sebagai subjek utama (わたしは) yang meminta atau menerima pertolongan dari pihak lain (ditandai partikel に) dengan rasa berterima kasih.',
    example: 'わたしは 鈴木さんに 日本語を 教えて もらいました。',
    romaji: 'Watashi wa Suzuki-san ni Nihongo o oshiete moraimashita.',
    translation: 'Saya menerima bantuan pengajaran bahasa Jepang dari Sdr. Suzuki.',
    badge: 'Penerimaan Syukur',
    badgeColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40',
  },
  {
    pattern: '～て あげます',
    title: 'SAYA Melakukan Kebaikan untuk Orang Lain',
    explanation: 'Pembicara memberikan bantuan kepada teman sebaya atau orang yang lebih muda. Jangan gunakan di depan atasan karena terkesan merasa berjasa.',
    example: 'わたしは 木村さんの 荷物を 持って あげました。',
    romaji: 'Watashi wa Kimura-san no nimotsu o motte agemashita.',
    translation: 'Saya membawakan barang bawaan milik Sdr. Kimura.',
    badge: 'Kebaikan Keluar (Outbound)',
    badgeColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40',
  },
]

export function ConditionalsGuideClient() {
  const [activeTab, setActiveTab] = useState<'conditionals' | 'favors'>('conditionals')

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-slate-900 to-indigo-950 p-6 md:p-8 text-white shadow-xl border border-emerald-500/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
            <GitFork className="h-3.5 w-3.5" />
            Minna no Nihongo Bab 23, 24 & 25 (Puncak N5)
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Panduan Pengandaian & Transaksi Kebaikan (Giving & Receiving)
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Selamat datang di materi pamungkas kurikulum Minna no Nihongo I!
            Kuasai 4 rumus pengandaian{' '}
            <span className="text-emerald-400 font-bold">～と</span>,{' '}
            <span className="text-sky-400 font-bold">～たら</span>,{' '}
            <span className="text-rose-400 font-bold">～ても</span>, dan{' '}
            <span className="text-amber-400 font-bold">～とき</span>, serta tata krama transaksi kebaikan{' '}
            <span className="text-purple-400 font-bold">～てくれます / もらいます / あげます</span>.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('conditionals')}
          className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'conditionals'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <GitFork className="h-4 w-4" />
          4 Rumus Pengandaian (と, たら, ても, とき)
        </button>
        <button
          onClick={() => setActiveTab('favors')}
          className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'favors'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <HeartHandshake className="h-4 w-4" />
          Transaksi Kebaikan (Bab 24)
        </button>
      </div>

      {/* Tab 1: 4 Conditionals */}
      {activeTab === 'conditionals' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONDITIONALS_DATA.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {c.title}
                    </h3>
                  </div>
                  <span className="font-japanese text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                    {c.pattern}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {c.characteristics}
                </p>

                <div className="space-y-2 pt-1">
                  {c.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-japanese font-bold text-xs md:text-sm text-slate-900 dark:text-white">
                          {ex.japanese}
                        </span>
                        <AudioButton audioUrl={ex.japanese} size="sm" />
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {ex.translation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Favors Giving & Receiving */}
      {activeTab === 'favors' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20 text-xs text-indigo-950 dark:text-indigo-300">
            <Sparkles className="h-4 w-4 inline mr-1 text-indigo-500" />
            <strong>Kaidah Sudut Pandang Jepang:</strong> Dalam budaya Jepang, memberi dan menerima tindakan bantuan memiliki orientasi psikologis yang ketat antara pihak pembicara (kami/saya) dan pihak luar.
          </div>

          <div className="space-y-3.5">
            {FAVORS_DATA.map((f, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-japanese font-bold text-base text-indigo-600 dark:text-indigo-400">
                      {f.pattern}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      — {f.title}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${f.badgeColor}`}>
                    {f.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.explanation}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-japanese font-bold text-xs md:text-sm text-slate-900 dark:text-white block">
                      {f.example}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {f.translation}
                    </span>
                  </div>
                  <AudioButton audioUrl={f.example} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
