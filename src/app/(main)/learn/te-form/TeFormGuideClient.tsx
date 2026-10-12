'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { Sparkles, Layers, CheckCircle2, ArrowRight, Zap, RefreshCw, BookOpen } from 'lucide-react'

interface VerbRule {
  id: string
  group: 'Grup 1 (Godan)' | 'Grup 2 (Ichidan)' | 'Grup 3 (Irregular)'
  ending: string
  rule: string
  color: string
  mnemonic: string
  verbs: {
    masu: string
    te: string
    romaji: string
    meaning: string
    isException?: boolean
  }[]
}

const VERB_RULES: VerbRule[] = [
  {
    id: 'g1-tte',
    group: 'Grup 1 (Godan)',
    ending: 'い / ち / り (Masu) → う / つ / る',
    rule: 'Berubah menjadi ～って (tte)',
    color: 'border-blue-200 bg-blue-50/60 text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200',
    mnemonic: 'I - Chi - Ri jadi TTE! Contoh: Kaimasu (Beli) -> Katte, Machimasu (Tunggu) -> Matte.',
    verbs: [
      { masu: 'かいます (買います)', te: 'かって (買って)', romaji: 'katte', meaning: 'Membeli' },
      { masu: 'まちます (待ちます)', te: 'まって (待って)', romaji: 'matte', meaning: 'Menunggu' },
      { masu: 'とります (取ります)', te: 'とって (取って)', romaji: 'totte', meaning: 'Mengambil' },
      { masu: 'かえります (帰ります)', te: 'かえって (帰って)', romaji: 'kaette', meaning: 'Pulang' },
    ],
  },
  {
    id: 'g1-nde',
    group: 'Grup 1 (Godan)',
    ending: 'み / び / に (Masu) → む / ぶ / ぬ',
    rule: 'Berubah menjadi ～んで (nde)',
    color: 'border-emerald-200 bg-emerald-50/60 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200',
    mnemonic: 'Mi - Bi - Ni jadi NDE! Bunyi sengau berakhiran DE.',
    verbs: [
      { masu: 'のみます (飲みます)', te: 'のんで (飲んで)', romaji: 'nonde', meaning: 'Minum' },
      { masu: 'よみます (読みます)', te: 'よんで (読んで)', romaji: 'yonde', meaning: 'Membaca' },
      { masu: 'あそびます (遊びます)', te: 'あそんで (遊んで)', romaji: 'asonde', meaning: 'Bermain' },
      { masu: 'よびます (呼びます)', te: 'よんで (呼んで)', romaji: 'yonde', meaning: 'Memanggil' },
    ],
  },
  {
    id: 'g1-ite',
    group: 'Grup 1 (Godan)',
    ending: 'き (Masu) → く',
    rule: 'Berubah menjadi ～いて (ite)',
    color: 'border-amber-200 bg-amber-50/60 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200',
    mnemonic: 'Ki jadi ITE! ⚠️ Pengecualian khusus: 行きます (ikimasu) bukan iite, melainkan いって (itte)!',
    verbs: [
      { masu: 'かきます (書きます)', te: 'かいて (書いて)', romaji: 'kaite', meaning: 'Menulis' },
      { masu: 'ききます (聞きます)', te: 'きいて (聞いて)', romaji: 'kiite', meaning: 'Mendengar' },
      { masu: 'いきます (行きます)', te: 'いって (行って)', romaji: 'itte', meaning: 'Pergi (Pengecualian!)', isException: true },
    ],
  },
  {
    id: 'g1-ide',
    group: 'Grup 1 (Godan)',
    ending: 'ぎ (Masu) → ぐ',
    rule: 'Berubah menjadi ～いで (ide)',
    color: 'border-teal-200 bg-teal-50/60 text-teal-900 dark:border-teal-900 dark:bg-teal-950/30 dark:text-teal-200',
    mnemonic: 'Gi jadi IDE! Ada tenten seperti huruf Gi-nya.',
    verbs: [
      { masu: 'およぎます (泳ぎます)', te: 'およいで (泳いで)', romaji: 'oyoide', meaning: 'Berenang' },
      { masu: 'いそぎます (急ぎます)', te: 'いそいで (急いで)', romaji: 'isoide', meaning: 'Buru-buru' },
    ],
  },
  {
    id: 'g1-shite',
    group: 'Grup 1 (Godan)',
    ending: 'し (Masu) → す',
    rule: 'Berubah menjadi ～して (shite)',
    color: 'border-indigo-200 bg-indigo-50/60 text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-200',
    mnemonic: 'Shi jadi SHITE! Tinggal tempel te setelah bunyi shi.',
    verbs: [
      { masu: 'はなします (話します)', te: 'はなして (話して)', romaji: 'hanashite', meaning: 'Berbicara' },
      { masu: 'だします (出します)', te: 'だして (出して)', romaji: 'dashite', meaning: 'Mengeluarkan' },
      { masu: 'けします (消します)', te: 'けして (消して)', romaji: 'keshite', meaning: 'Mematikan (listrik)' },
    ],
  },
  {
    id: 'g2-ichidan',
    group: 'Grup 2 (Ichidan)',
    ending: 'Bunyi Vokal e-masu / i-masu',
    rule: 'Lepas ます → Ganti ～て (te)',
    color: 'border-purple-200 bg-purple-50/60 text-purple-900 dark:border-purple-900 dark:bg-purple-950/30 dark:text-purple-200',
    mnemonic: 'Paling mudah! Cukup buang MASU, tempelkan TE langsung.',
    verbs: [
      { masu: 'たべます (食べます)', te: 'たべて (食べて)', romaji: 'tabete', meaning: 'Makan' },
      { masu: 'みます (見ます)', te: 'みて (見て)', romaji: 'mite', meaning: 'Melihat' },
      { masu: 'あけます (開けます)', te: 'あけて (開けて)', romaji: 'akete', meaning: 'Membuka' },
      { masu: 'しめます (閉めます)', te: 'しめて (閉めて)', romaji: 'shimete', meaning: 'Menutup' },
      { masu: 'ねます (寝ます)', te: 'ねて (寝て)', romaji: 'nete', meaning: 'Tidur' },
    ],
  },
  {
    id: 'g3-irregular',
    group: 'Grup 3 (Irregular)',
    ending: 'します & きます (Hanya 2 kata)',
    rule: 'Bentuk Tetap Khusus',
    color: 'border-rose-200 bg-rose-50/60 text-rose-900 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200',
    mnemonic: 'Hafalkan langsung 2 kata kerja tidak beraturan ini!',
    verbs: [
      { masu: 'します', te: 'して', romaji: 'shite', meaning: 'Melakukan' },
      { masu: 'べんきょうします', te: 'べんきょうして', romaji: 'benkyoushite', meaning: 'Belajar' },
      { masu: 'きます (来ます)', te: 'きて (来て)', romaji: 'kite', meaning: 'Datang' },
    ],
  },
]

export function TeFormGuideClient() {
  const [activeGroupFilter, setActiveGroupFilter] = useState<string>('all')
  const [selectedVerb, setSelectedVerb] = useState<{ masu: string; te: string; romaji: string; meaning: string } | null>(null)

  const filteredRules = activeGroupFilter === 'all'
    ? VERB_RULES
    : VERB_RULES.filter((r) => r.group.includes(activeGroupFilter))

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900 via-slate-900 to-indigo-950 p-6 md:p-8 text-white shadow-xl border border-violet-500/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-3 py-1 text-xs font-semibold text-violet-300 border border-violet-400/30">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            Minna no Nihongo Bab 14 Milestone
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Panduan & Konjugasi Kata Kerja Bentuk-Te (て形)
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Bentuk-Te adalah gerbang utama menuju tata bahasa Jepang tingkat lanjut. Digunakan untuk permohonan sopan{' '}
            <span className="text-amber-400 font-bold">～てください</span>, aksi sedang berlangsung{' '}
            <span className="text-sky-400 font-bold">～ています</span>, izin, urutan aksi, dan tawaran bantuan.
          </p>
        </div>
      </div>

      {/* Mnemonic Song Guide */}
      <div className="rounded-xl border border-violet-200 dark:border-violet-900/50 bg-violet-50/70 dark:bg-violet-950/20 p-5">
        <h3 className="flex items-center gap-2 font-bold text-violet-950 dark:text-violet-300 text-sm md:text-base mb-2">
          <Sparkles className="h-4 w-4 text-violet-600" />
          Irama Hafalan Bentuk-Te Grup 1 (Mnemonic Song):
        </h3>
        <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3">
          Gunakan irama lagu legendaris &quot;Oh My Darling Clementine&quot; untuk menghafal perubahan bunyi huruf akhir:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-japanese font-semibold text-center">
          <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold">いちり ➔ って</div>
            <div className="text-[11px] text-slate-500 font-sans mt-0.5">i, chi, ri ➔ tte</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">みびに ➔ んで</div>
            <div className="text-[11px] text-slate-500 font-sans mt-0.5">mi, bi, ni ➔ nde</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-amber-600 dark:text-amber-400 font-bold">き ➔ いて / ぎ ➔ いで</div>
            <div className="text-[11px] text-slate-500 font-sans mt-0.5">ki ➔ ite / gi ➔ ide</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-rose-600 dark:text-rose-400 font-bold">し ➔ して</div>
            <div className="text-[11px] text-slate-500 font-sans mt-0.5">shi ➔ shite</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'all', label: 'Semua Aturan (Grup 1, 2, 3)' },
          { id: 'Grup 1', label: 'Grup 1 (Godan Verbs)' },
          { id: 'Grup 2', label: 'Grup 2 (Ichidan Verbs)' },
          { id: 'Grup 3', label: 'Grup 3 (Irregular Verbs)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveGroupFilter(tab.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs md:text-sm font-semibold transition-all ${
              activeGroupFilter === tab.id
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rules & Verb Transformation Cards */}
      <div className="space-y-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                  {rule.group}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {rule.ending} ➔ <span className="text-violet-600 dark:text-violet-400">{rule.rule}</span>
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                {rule.mnemonic}
              </p>
            </div>

            {/* Verbs list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4">
              {rule.verbs.map((verb, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedVerb(verb)}
                  className={`flex flex-col justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    verb.isException
                      ? 'border-amber-300 bg-amber-50/40 dark:border-amber-800 dark:bg-amber-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 hover:border-violet-300 dark:hover:border-violet-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-japanese">{verb.masu}</span>
                    <AudioButton audioUrl={verb.te} size="sm" />
                  </div>

                  <div className="my-2">
                    <div className="flex items-center gap-1.5 text-base font-bold font-japanese text-slate-900 dark:text-white">
                      <span>{verb.te}</span>
                    </div>
                    <div className="text-xs text-violet-600 dark:text-violet-400 font-medium">
                      {verb.romaji}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {verb.meaning}
                    </div>
                  </div>

                  {verb.isException && (
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded-md inline-block w-fit">
                      ⭐ Pengecualian
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Core Grammar Patterns from Bab 14 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-violet-500" />
          Pola Kalimat Utama Berbasis Bentuk-Te (Bab 14)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block uppercase">
              1. Permohonan Sopan
            </span>
            <div className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
              ～てください (te kudasai)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Meminta tolong atau mempersilakan orang lain berbuat sesuatu.
            </p>
            <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40 text-xs font-japanese text-slate-700 dark:text-slate-300">
              ちょっと まって ください。<br />
              <span className="text-slate-500 text-[11px] font-sans">Tolong tunggu sebentar.</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block uppercase">
              2. Sedang Berlangsung
            </span>
            <div className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
              ～ています (te imasu)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Menyatakan kegiatan atau peristiwa yang sedang terjadi sekarang.
            </p>
            <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/40 text-xs font-japanese text-slate-700 dark:text-slate-300">
              いま あめが ふっています。<br />
              <span className="text-slate-500 text-[11px] font-sans">Sekarang sedang turun hujan.</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/20 space-y-2">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block uppercase">
              3. Menawarkan Bantuan
            </span>
            <div className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
              ～ましょうか (mashou ka)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Inisiatif membantu orang lain yang sedang kesulitan.
            </p>
            <div className="pt-2 border-t border-amber-100 dark:border-amber-900/40 text-xs font-japanese text-slate-700 dark:text-slate-300">
              にもつを もちましょうか。<br />
              <span className="text-slate-500 text-[11px] font-sans">Boleh saya bawakan barangnya?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
