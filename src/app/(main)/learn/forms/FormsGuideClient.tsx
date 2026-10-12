'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight, ShieldAlert, Zap } from 'lucide-react'

interface VerbItem {
  id: string
  group: 'Grup 1 (Godan)' | 'Grup 2 (Ichidan)' | 'Grup 3 (Irregular)'
  masu: string
  jisho: string
  jishoRomaji: string
  nai: string
  naiRomaji: string
  meaning: string
  note?: string
}

const VERB_LIST: VerbItem[] = [
  // Grup 1
  {
    id: 'kaku',
    group: 'Grup 1 (Godan)',
    masu: 'かきます (書きます)',
    jisho: 'かく (書く)',
    jishoRomaji: 'kaku',
    nai: 'かかない (書かない)',
    naiRomaji: 'kakanai',
    meaning: 'Menulis',
    note: 'ki -> ku / ki -> ka+nai',
  },
  {
    id: 'nomu',
    group: 'Grup 1 (Godan)',
    masu: 'のみます (飲みます)',
    jisho: 'のむ (飲む)',
    jishoRomaji: 'nomu',
    nai: 'のまない (飲まない)',
    naiRomaji: 'nomanai',
    meaning: 'Minum',
    note: 'mi -> mu / mi -> ma+nai',
  },
  {
    id: 'kau',
    group: 'Grup 1 (Godan)',
    masu: 'かいます (買います)',
    jisho: 'かう (買う)',
    jishoRomaji: 'kau',
    nai: 'かわない (買わない)',
    naiRomaji: 'kawanai',
    meaning: 'Membeli',
    note: '⚠️ Bunyi i menjadi wa (bukan kaanai)',
  },
  {
    id: 'matsu',
    group: 'Grup 1 (Godan)',
    masu: 'まちます (待ちます)',
    jisho: 'まつ (待つ)',
    jishoRomaji: 'matsu',
    nai: 'またない (待たない)',
    naiRomaji: 'matanai',
    meaning: 'Menunggu',
    note: 'chi -> tsu / chi -> ta+nai',
  },
  {
    id: 'toru',
    group: 'Grup 1 (Godan)',
    masu: 'とります (取ります)',
    jisho: 'とる (取る)',
    jishoRomaji: 'toru',
    nai: 'とらない (取らない)',
    naiRomaji: 'toranai',
    meaning: 'Mengambil',
    note: 'ri -> ru / ri -> ra+nai',
  },
  {
    id: 'hanasu',
    group: 'Grup 1 (Godan)',
    masu: 'はなします (話します)',
    jisho: 'はなす (話す)',
    jishoRomaji: 'hanasu',
    nai: 'はなさない (話さない)',
    naiRomaji: 'hanasanai',
    meaning: 'Berbicara',
    note: 'shi -> su / shi -> sa+nai',
  },
  {
    id: 'oyogu',
    group: 'Grup 1 (Godan)',
    masu: 'およぎます (泳ぎます)',
    jisho: 'およぐ (泳ぐ)',
    jishoRomaji: 'oyogu',
    nai: 'およがない (泳がない)',
    naiRomaji: 'oyoganai',
    meaning: 'Berenang',
    note: 'gi -> gu / gi -> ga+nai',
  },
  {
    id: 'iku',
    group: 'Grup 1 (Godan)',
    masu: 'いきます (行きます)',
    jisho: 'いく (行く)',
    jishoRomaji: 'iku',
    nai: 'いかない (行かない)',
    naiRomaji: 'ikanai',
    meaning: 'Pergi',
  },

  // Grup 2
  {
    id: 'taberu',
    group: 'Grup 2 (Ichidan)',
    masu: 'たべます (食べます)',
    jisho: 'たべる (食べる)',
    jishoRomaji: 'taberu',
    nai: 'たべない (食べない)',
    naiRomaji: 'tabenai',
    meaning: 'Makan',
    note: 'Lepas masu -> tambah ru / nai',
  },
  {
    id: 'miru',
    group: 'Grup 2 (Ichidan)',
    masu: 'みます (見ます)',
    jisho: 'みる (見る)',
    jishoRomaji: 'miru',
    nai: 'みない (見ない)',
    naiRomaji: 'minai',
    meaning: 'Melihat',
    note: 'Lepas masu -> tambah ru / nai',
  },
  {
    id: 'neru',
    group: 'Grup 2 (Ichidan)',
    masu: 'ねます (寝ます)',
    jisho: 'ねる (寝る)',
    jishoRomaji: 'neru',
    nai: 'ねない (寝ない)',
    naiRomaji: 'nenai',
    meaning: 'Tidur',
  },
  {
    id: 'oboeru',
    group: 'Grup 2 (Ichidan)',
    masu: 'おぼえます (覚えます)',
    jisho: 'おぼえる (覚える)',
    jishoRomaji: 'oboeru',
    nai: 'おぼえない (覚えない)',
    naiRomaji: 'oboenai',
    meaning: 'Mengingat / Menghafal',
  },

  // Grup 3
  {
    id: 'suru',
    group: 'Grup 3 (Irregular)',
    masu: 'します',
    jisho: 'する',
    jishoRomaji: 'suru',
    nai: 'しない',
    naiRomaji: 'shinai',
    meaning: 'Melakukan',
    note: '⭐ Irregular khusus',
  },
  {
    id: 'kuru',
    group: 'Grup 3 (Irregular)',
    masu: 'きます (来ます)',
    jisho: 'くる (来る)',
    jishoRomaji: 'kuru',
    nai: 'こない (来ない)',
    naiRomaji: 'konai',
    meaning: 'Datang',
    note: '⭐ Bacaan berubah: kimasu -> kuru -> konai!',
  },
]

export function FormsGuideClient() {
  const [selectedGroup, setSelectedGroup] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'both' | 'jisho' | 'nai'>('both')

  const filteredVerbs = selectedGroup === 'all'
    ? VERB_LIST
    : VERB_LIST.filter((v) => v.group.includes(selectedGroup))

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900 via-slate-900 to-indigo-950 p-6 md:p-8 text-white shadow-xl border border-amber-500/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            Minna no Nihongo Bab 17 & 18 Foundation
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Konjugasi Bentuk Kamus (辞書形) & Bentuk Negatif (ない形)
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Dua bentuk kata kerja paling esensial dalam bahasa Jepang. Bentuk Kamus digunakan untuk menyatakan kemampuan{' '}
            <span className="text-amber-400 font-bold">～ことができます</span>, hobi, dan urutan waktu sebelum. Bentuk-Nai digunakan untuk larangan santun{' '}
            <span className="text-rose-400 font-bold">～ないでください</span>, kewajiban{' '}
            <span className="text-sky-400 font-bold">～なければなりません</span>, dan tidak perlu.
          </p>
        </div>
      </div>

      {/* Rules Comparison Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jisho-kei rule */}
        <div className="rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              1. Bentuk Kamus (Jisho-kei 辞書形)
            </span>
            <span className="text-xs bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-semibold px-2 py-0.5 rounded-full">
              Vokal -U
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Grup 1:</strong> Ubah bunyi baris <strong>i</strong> ke baris <strong>u</strong> (kaki ➔ kaku, nomi ➔ nomu, tori ➔ toru).<br />
            <strong>Grup 2:</strong> Lepas <strong>ます</strong>, tempelkan <strong>る</strong> (taberu, miru).<br />
            <strong>Grup 3:</strong> します ➔ <strong>する</strong>, きます ➔ <strong>くる</strong>.
          </p>
        </div>

        {/* Nai-kei rule */}
        <div className="rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/60 dark:bg-rose-950/20 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
              2. Bentuk Negatif (Nai-kei ない形)
            </span>
            <span className="text-xs bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 font-semibold px-2 py-0.5 rounded-full">
              Vokal -A + ない
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Grup 1:</strong> Ubah bunyi baris <strong>i</strong> ke baris <strong>a</strong> + <strong>ない</strong> (kaki ➔ kakanai). <em>Khusus huruf i ➔ wa (kaimasu ➔ kawanai).</em><br />
            <strong>Grup 2:</strong> Lepas <strong>ます</strong>, tempelkan <strong>ない</strong> (tabenai, minai).<br />
            <strong>Grup 3:</strong> します ➔ <strong>しない</strong>, きます ➔ <strong>こない</strong>.
          </p>
        </div>
      </div>

      {/* Filter Tabs & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: 'all', label: 'Semua Grup' },
            { id: 'Grup 1', label: 'Grup 1 (Godan)' },
            { id: 'Grup 2', label: 'Grup 2 (Ichidan)' },
            { id: 'Grup 3', label: 'Grup 3 (Irregular)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedGroup(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs md:text-sm font-semibold transition-all ${
                selectedGroup === tab.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'both' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Kedua Bentuk
          </button>
          <button
            onClick={() => setViewMode('jisho')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'jisho' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Fokus Kamus
          </button>
          <button
            onClick={() => setViewMode('nai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'nai' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Fokus Nai
          </button>
        </div>
      </div>

      {/* Verbs Table Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-500">
                <th className="py-3 px-4">Grup</th>
                <th className="py-3 px-4">Bentuk Masu (Sopan)</th>
                {(viewMode === 'both' || viewMode === 'jisho') && (
                  <th className="py-3 px-4 text-amber-700 dark:text-amber-400">Bentuk Kamus (辞書形)</th>
                )}
                {(viewMode === 'both' || viewMode === 'nai') && (
                  <th className="py-3 px-4 text-rose-700 dark:text-rose-400">Bentuk Nai (ない形)</th>
                )}
                <th className="py-3 px-4">Arti & Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredVerbs.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-500 text-xs">
                    {v.group.split(' ')[0]}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-japanese font-semibold text-slate-900 dark:text-white">
                      {v.masu}
                    </div>
                  </td>
                  {(viewMode === 'both' || viewMode === 'jisho') && (
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="font-japanese font-bold text-amber-700 dark:text-amber-400 text-base">
                            {v.jisho}
                          </span>
                          <span className="text-[11px] text-slate-400 block font-sans">
                            {v.jishoRomaji}
                          </span>
                        </div>
                        <AudioButton audioUrl={v.jisho} size="sm" />
                      </div>
                    </td>
                  )}
                  {(viewMode === 'both' || viewMode === 'nai') && (
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="font-japanese font-bold text-rose-700 dark:text-rose-400 text-base">
                            {v.nai}
                          </span>
                          <span className="text-[11px] text-slate-400 block font-sans">
                            {v.naiRomaji}
                          </span>
                        </div>
                        <AudioButton audioUrl={v.nai} size="sm" />
                      </div>
                    </td>
                  )}
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {v.meaning}
                    </span>
                    {v.note && (
                      <span className="block text-[11px] text-slate-400 italic mt-0.5">
                        {v.note}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
