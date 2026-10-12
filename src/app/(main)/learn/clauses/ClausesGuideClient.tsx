'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { FileText, Sparkles, Shirt, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react'

interface NounClauseExample {
  title: string
  pattern: string
  japanese: string
  kana: string
  romaji: string
  translation: string
  explanation: string
}

const NOUN_CLAUSE_EXAMPLES: NounClauseExample[] = [
  {
    title: 'Bentuk Lampau (Ta-kei) + KB',
    pattern: '[KK た] + Kata Benda',
    japanese: '昨日 買った 本は とても 面白かったです。',
    kana: 'きのう かった ほんは とても おもしろかったです。',
    romaji: 'Kinou katta hon wa totemo omoshirokatta desu.',
    translation: 'Buku yang kemarin saya beli sangat menarik.',
    explanation: 'Kata kerja "買った" (sudah beli) langsung memodifikasi "本" (buku) tanpa kata penghubung seperti "yang".',
  },
  {
    title: 'Bentuk Sedang Berlangsung (Te-iru) + KB',
    pattern: '[KK ている] + Kata Benda',
    japanese: 'あそこで 新聞を 読んでいる 人は 誰ですか。',
    kana: 'あそこで しんぶんを よんでいる ひとは だれですか。',
    romaji: 'Asoko de shinbun o yonde iru hito wa dare desu ka.',
    translation: 'Siapakah orang yang sedang membaca koran di sana itu?',
    explanation: '"読んでいる" (sedang membaca) memodifikasi "人" (orang).',
  },
  {
    title: 'Bentuk Negatif (Nai-kei) + KB',
    pattern: '[KK ない] + Kata Benda',
    japanese: '朝ごはんを 食べない 人が 多いです。',
    kana: 'あさごはんを たべない ひとが おおいです。',
    romaji: 'Asagohan o tabenai hito ga ooi desu.',
    translation: 'Banyak orang yang tidak makan sarapan pagi.',
    explanation: '"食べない" (tidak makan) memodifikasi "人" (orang).',
  },
  {
    title: 'Bentuk Kamus (Jisho-kei) + KB Abstrak Waktu/Janji',
    pattern: '[KK Kamus] + 時間 / 約束 / 用事',
    japanese: '今日は 友達と 会う 約束が あります。',
    kana: 'きょうは ともだちと あう やくそくが あります。',
    romaji: 'Kyou wa tomodachi to au yakusoku ga arimasu.',
    translation: 'Hari ini saya ada janji untuk bertemu dengan teman.',
    explanation: 'Kata kerja bentuk kamus "会う" memodifikasi kata benda abstrak "約束" (janji).',
  },
]

const CLOTHING_VERBS = [
  {
    category: 'Tubuh Bagian Atas',
    verb: '着ます (きます - kimasu)',
    items: 'Kemeja (シャツ), Jas (スーツ), Baju hangat (セーター), Mantel (コート)',
    example: '白い シャツを 着ています。',
    translation: 'Sedang mengenakan kemeja putih.',
  },
  {
    category: 'Tubuh Bagian Bawah / Kaki',
    verb: 'はきます (hakimasu)',
    items: 'Celana (ズボン), Rok (スカート), Sepatu (靴), Kaus kaki (靴下)',
    example: '黒い 靴を はいています。',
    translation: 'Sedang memakai sepatu hitam.',
  },
  {
    category: 'Kepala / Penutup Kepala',
    verb: 'かぶります (kaburimasu)',
    items: 'Topi (帽子), Helm',
    example: '赤い 帽子を かぶっています。',
    translation: 'Sedang memakai topi merah.',
  },
  {
    category: 'Aksesoris / Kacamata',
    verb: '掛けます (かけます - kakemasu)',
    items: 'Kacamata (眼鏡)',
    example: '眼鏡を かけている 人です。',
    translation: 'Orang yang memakai kacamata.',
  },
]

export function ClausesGuideClient() {
  const [activeSection, setActiveSection] = useState<'noun-mod' | 'opinion' | 'clothing'>('noun-mod')

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 p-6 md:p-8 text-white shadow-xl border border-blue-500/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-400/30">
            <FileText className="h-3.5 w-3.5" />
            Minna no Nihongo Bab 21 & 22 Guide
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Modifikasi Kata Benda, Opini & Kata Kerja Pakaian
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Pilar sintaksis tertinggi di level N5! Kuasai pembuatan kalimat bertingkat{' '}
            <span className="text-amber-400 font-bold">Anak Kalimat + Kata Benda</span> (yang dilakukan/karakteristik), penyampaian opini pribadi{' '}
            <span className="text-sky-400 font-bold">～と 思います</span>, kutipan, dan kata kerja pakaian.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSection('noun-mod')}
          className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all ${
            activeSection === 'noun-mod'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Anak Kalimat + Kata Benda (Bab 22)
        </button>
        <button
          onClick={() => setActiveSection('opinion')}
          className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all ${
            activeSection === 'opinion'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Opini & Kutipan (Bab 21)
        </button>
        <button
          onClick={() => setActiveSection('clothing')}
          className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all ${
            activeSection === 'clothing'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Kata Kerja Mengenakan Pakaian
        </button>
      </div>

      {/* Section 1: Noun Modification */}
      {activeSection === 'noun-mod' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/20 p-5 space-y-2">
            <h3 className="font-bold text-blue-950 dark:text-blue-300 text-sm md:text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Kaidah Emas Modifikasi Kata Benda (連体修飾):
            </h3>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              1. <strong>Penjelas di DEPAN yang dijelaskan:</strong> Bahasa Jepang tidak memiliki kata penghubung &quot;yang&quot;. Cukup letakkan anak kalimat dalam <strong>Bentuk Biasa (Futsūkei)</strong> tepat sebelum kata benda sasaran.<br />
              2. <strong>Pelaku anak kalimat memakai が:</strong> Subjek dalam anak kalimat penjelas wajib menggunakan partikel <strong>が</strong>, bukan は. (Contoh: わたし<strong>が</strong> 作った 料理).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NOUN_CLAUSE_EXAMPLES.map((ex, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {ex.title}
                  </span>
                  <span className="text-[11px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-md font-mono">
                    {ex.pattern}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-japanese text-base font-bold text-slate-900 dark:text-white">
                      {ex.japanese}
                    </span>
                    <AudioButton audioUrl={ex.japanese} size="sm" />
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                    {ex.kana}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">
                    {ex.translation}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  💡 {ex.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Opinions & Quotes */}
      {activeSection === 'opinion' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
            <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider block">
              1. Menyatakan Opini Pribadi (I Think That...)
            </span>
            <div className="font-japanese font-bold text-sm text-indigo-950 dark:text-indigo-200">
              [Bentuk Biasa / Futsūkei] + と 思います (to omoimasu)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Digunakan saat menyampaikan perkiraan, dugaan, atau pendapat pribadi yang belum tentu fakta mutlak.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
              <div>
                <div className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
                  明日は 雨が 降ると 思います。
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Saya rasa besok akan turun hujan.
                </div>
              </div>
              <AudioButton audioUrl="明日は 雨が 降ると 思います。" size="sm" />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
              2. Mengutip Perkataan Orang Lain (He/She Said That...)
            </span>
            <div className="font-japanese font-bold text-sm text-emerald-950 dark:text-emerald-200">
              [Kutipan Langsung 「...」 / Futsūkei] + と 言いました (to iimashita)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Menyampaikan kembali perkataan yang pernah diucapkan pihak ketiga.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div>
                <div className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
                  田中さんは 「明日 休みます」と 言いました。
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Sdr. Tanaka berkata &quot;Besok saya libur&quot;.
                </div>
              </div>
              <AudioButton audioUrl="田中さんは 明日 休みますと 言いました。" size="sm" />
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Clothing Verbs */}
      {activeSection === 'clothing' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shirt className="h-4 w-4 text-blue-500" />
            Empat Kata Kerja Mengenakan Pakaian dalam Bahasa Jepang:
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
            Bahasa Jepang membedakan kata kerja &quot;memakai / mengenakan&quot; berdasarkan bagian tubuh yang dikenakan:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {CLOTHING_VERBS.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {c.category}
                  </span>
                  <span className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
                    {c.verb}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <strong>Benda target:</strong> {c.items}
                </div>
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-japanese font-semibold text-xs text-slate-800 dark:text-slate-200">
                      {c.example}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {c.translation}
                    </div>
                  </div>
                  <AudioButton audioUrl={c.example} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
