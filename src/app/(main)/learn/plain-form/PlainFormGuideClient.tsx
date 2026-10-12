'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { MessageSquare, Sparkles, CheckCircle2, UserCheck, Flame, BookOpen } from 'lucide-react'

interface PlainRow {
  category: string
  presentPos: { polite: string; plain: string; romaji: string }
  presentNeg: { polite: string; plain: string; romaji: string }
  pastPos: { polite: string; plain: string; romaji: string }
  pastNeg: { polite: string; plain: string; romaji: string }
}

const MATRIX_DATA: PlainRow[] = [
  {
    category: 'Kata Kerja (Verb) - 書く',
    presentPos: { polite: 'かきます', plain: 'かく', romaji: 'kaku' },
    presentNeg: { polite: 'かきません', plain: 'かかない', romaji: 'kakanai' },
    pastPos: { polite: 'かきました', plain: 'かいた', romaji: 'kaita' },
    pastNeg: { polite: 'かきませんでした', plain: 'かなかた', romaji: 'kakanakatta' },
  },
  {
    category: 'Kata Kerja (Verb) - 食べる',
    presentPos: { polite: 'たべます', plain: 'たべる', romaji: 'taberu' },
    presentNeg: { polite: 'たべません', plain: 'たべない', romaji: 'tabenai' },
    pastPos: { polite: 'たべました', plain: 'たべた', romaji: 'tabeta' },
    pastNeg: { polite: 'たべませんでした', plain: 'たべなかった', romaji: 'tabenakatta' },
  },
  {
    category: 'Kata Sifat-i - 寒い',
    presentPos: { polite: 'さむいです', plain: 'さむい', romaji: 'samui' },
    presentNeg: { polite: 'さむくないです', plain: 'さむくない', romaji: 'samukunai' },
    pastPos: { polite: 'さむかったです', plain: 'さむかった', romaji: 'samukatta' },
    pastNeg: { polite: 'さむくなかったです', plain: 'さむくなかった', romaji: 'samukunakatta' },
  },
  {
    category: 'Kata Sifat-na - きれい',
    presentPos: { polite: 'きれいです', plain: 'きれいだ', romaji: 'kirei da' },
    presentNeg: { polite: 'きれいじゃありません', plain: 'きれいじゃない', romaji: 'kirei janai' },
    pastPos: { polite: 'きれいでした', plain: 'きれいだった', romaji: 'kirei datta' },
    pastNeg: { polite: 'きれいじゃありませんでした', plain: 'きれいじゃなかった', romaji: 'kirei janakatta' },
  },
  {
    category: 'Kata Benda - 雨',
    presentPos: { polite: 'あめです', plain: 'あめだ', romaji: 'ame da' },
    presentNeg: { polite: 'あめじゃありません', plain: 'あめじゃない', romaji: 'ame janai' },
    pastPos: { polite: 'あめでした', plain: 'あめだった', romaji: 'ame datta' },
    pastNeg: { polite: 'あめじゃありませんでした', plain: 'あめじゃなかった', romaji: 'ame janakatta' },
  },
]

export function PlainFormGuideClient() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'experience' | 'dialogue'>('matrix')

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-900 via-slate-900 to-indigo-950 p-6 md:p-8 text-white shadow-xl border border-rose-500/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-300 border border-rose-400/30">
            <MessageSquare className="h-3.5 w-3.5" />
            Minna no Nihongo Bab 19 & 20 Guide
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Panduan Bentuk Biasa (普通形 - Futsūkei) & Pengalaman
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Kuasai gaya bahasa kasual yang dipakai antar teman, keluarga, serta manga/anime.
            Pelajari matriks perubahan 4 bentuk waktu kata kerja, kata sifat, dan kata benda, serta pola pengalaman{' '}
            <span className="text-amber-400 font-bold">～たことがあります</span> dan{' '}
            <span className="text-sky-400 font-bold">～たり～たりします</span>.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'matrix'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Matriks Konjugasi Bentuk Biasa
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'experience'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Pola Bab 19 (Pengalaman & Tari-tari)
        </button>
        <button
          onClick={() => setActiveTab('dialogue')}
          className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'dialogue'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Etika & Percakapan Kasual
        </button>
      </div>

      {/* Tab 1: Matrix */}
      {activeTab === 'matrix' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Tabel Komparasi Bentuk Sopan (丁寧語) vs Bentuk Biasa (普通形)
            </span>
            <span className="text-[11px] text-slate-400">
              *Teks tebal merah adalah Bentuk Biasa
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/60 text-slate-500">
                  <th className="py-3 px-4">Kategori Kelas Kata</th>
                  <th className="py-3 px-4">Positif Sekarang</th>
                  <th className="py-3 px-4">Negatif Sekarang</th>
                  <th className="py-3 px-4">Positif Lampau</th>
                  <th className="py-3 px-4">Negatif Lampau</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MATRIX_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {row.category}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-400 text-xs block">{row.presentPos.polite}</span>
                      <span className="font-japanese font-bold text-rose-600 dark:text-rose-400 text-sm">
                        {row.presentPos.plain}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-400 text-xs block">{row.presentNeg.polite}</span>
                      <span className="font-japanese font-bold text-rose-600 dark:text-rose-400 text-sm">
                        {row.presentNeg.plain}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-400 text-xs block">{row.pastPos.polite}</span>
                      <span className="font-japanese font-bold text-rose-600 dark:text-rose-400 text-sm">
                        {row.pastPos.plain}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-400 text-xs block">{row.pastNeg.polite}</span>
                      <span className="font-japanese font-bold text-rose-600 dark:text-rose-400 text-sm">
                        {row.pastNeg.plain}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Experience & Patterns */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase">
                1. Pengalaman Pernah / Belum Pernah
              </span>
              <span className="text-xs bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold px-2 py-0.5 rounded-full">
                KK た + ことが あります
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Menyatakan pengalaman hidup di masa lampau. Jika belum pernah sama sekali, tambahkan kata keterangan <strong>一度も (ichidomo)</strong>.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center justify-between">
              <div>
                <div className="font-japanese font-bold text-sm md:text-base text-slate-900 dark:text-white">
                  富士山に 登った ことが あります。
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Saya pernah mendaki Gunung Fuji.
                </div>
              </div>
              <AudioButton audioUrl="富士山に 登った ことが あります。" size="sm" />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/40 dark:bg-sky-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase">
                2. Contoh Tindakan Tidak Berurutan
              </span>
              <span className="text-xs bg-sky-200 dark:bg-sky-900 text-sky-900 dark:text-sky-100 font-bold px-2 py-0.5 rounded-full">
                KK1 たり、KK2 たり します
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Menyebutkan 2 atau 3 aktivitas perwakilan sebagai contoh santai, tanpa terikat harus berurutan waktu.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-sky-200 dark:border-sky-800 flex items-center justify-between">
              <div>
                <div className="font-japanese font-bold text-sm md:text-base text-slate-900 dark:text-white">
                  日曜日は テニスを したり、映画を 見たり します。
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Hari Minggu saya bermain tenis, menonton film, dan lain sebagainya.
                </div>
              </div>
              <AudioButton audioUrl="日曜日は テニスを したり、映画を 見たり します。" size="sm" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dialogue & Rules */}
      {activeTab === 'dialogue' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-rose-500" />
              Ciri Khas Percakapan Kasual Bahasa Jepang:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs md:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-rose-600 block">1. Intonasi Naik (Tanpa か)</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Pertanyaan tidak memakai &quot;か&quot;, melainkan cukup naikkan nada di akhir kata: <em>ご飯 食べる？ (Makan nasi?)</em>
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-rose-600 block">2. Kata Respon うん / ううん</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Sebagai pengganti はい (hai) gunakan <strong>うん (un)</strong>, pengganti いいえ (iie) gunakan <strong>ううん (uun)</strong>.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-rose-600 block">3. Partikel Sering Lepas</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Partikel penanda seperti を, が, は sering dihilangkan jika maksudnya sudah jelas dari konteks situasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
