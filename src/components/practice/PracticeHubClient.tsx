'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Layers,
  HelpCircle,
  Keyboard,
  Volume2,
  RotateCcw,
  BookMarked,
  Languages,
  FileText,
  Sparkles,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Zap
} from 'lucide-react'

// ─── Tingkatan / Level Tiers ─────────────────────────────────
const LEVELS = [
  {
    id: 'pemula',
    title: 'Pemula',
    subtitle: 'Bab 1 – 8',
    description: 'Dasar-dasar bahasa Jepang: salam, angka, benda sehari-hari, partikel dasar.',
    emoji: '🌱',
    babRange: [1, 8],
    color: 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800',
    badge: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'menengah',
    title: 'Menengah',
    subtitle: 'Bab 9 – 16',
    description: 'Bentuk kata kerja (te-form, nai-form), kalimat kompleks, dan perbandingan.',
    emoji: '📘',
    babRange: [9, 16],
    color: 'bg-blue-50/70 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800',
    badge: 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'lanjutan',
    title: 'Lanjutan',
    subtitle: 'Bab 17 – 25',
    description: 'Bentuk pasif, kausatif, kalimat pengandaian (tara, ba, to), dan tata bahasa formal.',
    emoji: '🎓',
    babRange: [17, 25],
    color: 'bg-violet-50/70 border-violet-200 dark:bg-violet-950/20 dark:border-violet-800',
    badge: 'text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-900/50',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
]

// ─── Kategori Materi ─────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'vocabulary',
    title: 'Kosakata',
    description: 'Kata-kata yang sering dipakai sehari-hari.',
    icon: <BookMarked className="w-5 h-5" />,
  },
  {
    id: 'hiragana',
    title: 'Hiragana',
    description: '46 karakter dasar Hiragana.',
    icon: <Languages className="w-5 h-5" />,
  },
  {
    id: 'katakana',
    title: 'Katakana',
    description: 'Karakter untuk kata serapan asing.',
    icon: <Languages className="w-5 h-5" />,
  },
  {
    id: 'kanji',
    title: 'Kanji',
    description: 'Karakter Kanji, onyomi, kunyomi & arti.',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 'particle',
    title: 'Partikel',
    description: 'Penggunaan は, を, へ, に, で, dll.',
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: 'grammar',
    title: 'Tata Bahasa',
    description: 'Pola kalimat dan struktur grammar.',
    icon: <GraduationCap className="w-5 h-5" />,
  },
]

// ─── Mode Latihan ────────────────────────────────────────────
const MODES = [
  {
    id: 'flashcard',
    title: 'Flashcard',
    description: 'Kartu bolak-balik untuk menghafal (Shortcut: Spasi).',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 'multiple-choice',
    title: 'Pilihan Ganda',
    description: 'Pilih 1 jawaban benar dari 4 opsi (Shortcut: 1-4).',
    icon: <HelpCircle className="w-5 h-5" />,
  },
  {
    id: 'type-answer',
    title: 'Ketik Jawaban',
    description: 'Ketik romaji / arti secara manual untuk tes ejaan.',
    icon: <Keyboard className="w-5 h-5" />,
  },
  {
    id: 'audio-quiz',
    title: 'Kuis Audio',
    description: 'Dengarkan audio, latih pendengaran dan pilih artinya.',
    icon: <Volume2 className="w-5 h-5" />,
  },
]

export function PracticeHubClient() {
  const [step, setStep] = useState(1) // 1=level, 2=category, 3=mode
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const activeLevel = LEVELS.find(l => l.id === selectedLevel)
  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory)

  const handleSelectLevel = (levelId: string) => {
    setSelectedLevel(levelId)
    setStep(2)
  }

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId)
    setStep(3)
  }

  const handleBack = () => {
    if (step === 3) {
      setSelectedCategory(null)
      setStep(2)
    } else if (step === 2) {
      setSelectedLevel(null)
      setStep(1)
    }
  }

  const buildHref = (modeId: string) => {
    const level = activeLevel
    if (!level || !selectedCategory) return '#'
    return `/practice/${modeId}?type=${selectedCategory}&babStart=${level.babRange[0]}&babEnd=${level.babRange[1]}`
  }

  // ─── Step Indicator ────────────────────────────────────────
  const steps = [
    { num: 1, label: 'Tingkatan' },
    { num: 2, label: 'Kategori' },
    { num: 3, label: 'Mode' },
  ]

  return (
    <div className="space-y-8">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                if (s.num < step) {
                  if (s.num === 1) {
                    setSelectedLevel(null)
                    setSelectedCategory(null)
                  }
                  if (s.num === 2) {
                    setSelectedCategory(null)
                  }
                  setStep(s.num)
                }
              }}
              disabled={s.num > step}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                ${
                  s.num === step
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                    : s.num < step
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 cursor-pointer hover:bg-emerald-200'
                    : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed'
                }
              `}
            >
              {s.num < step ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                  {s.num}
                </span>
              )}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < steps.length - 1 && (
              <ChevronRight
                className={`w-4 h-4 ${
                  s.num < step ? 'text-emerald-400' : 'text-zinc-300 dark:text-zinc-600'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Back button */}
      {step > 1 && (
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
      )}

      {/* ═══ STEP 1: Pilih Tingkatan ═══ */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Quick Micro-Session Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/practice/multiple-choice?type=vocabulary"
              className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all flex items-center gap-3.5 group"
            >
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                  ⚡ Kuis Kilat 2 Menit
                </h3>
                <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                  Latihan instan 10 soal acak tanpa perlu setup.
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-600" />
            </Link>

            <Link
              href="/practice/review"
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all flex items-center gap-3.5 group"
            >
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:scale-105 transition-transform">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  🧠 Kaji Ulang Lemah (SRS)
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Otomatis uji materi yang sering salah agar cepat hafal.
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>

          <div className="space-y-1 text-center pt-2">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Pilih Tingkatan Latihan
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Materi latihan akan disaring sesuai rentang bab kemampuanmu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEVELS.map(level => (
              <button
                key={level.id}
                onClick={() => handleSelectLevel(level.id)}
                className={`
                  text-left p-6 rounded-2xl border transition-all duration-200 cursor-pointer
                  hover:shadow-md hover:scale-[1.01] active:scale-[0.99]
                  ${level.color}
                `}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{level.emoji}</span>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        {level.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${level.badge}`}>
                        {level.subtitle}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 mt-1 ${level.iconColor}`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ STEP 2: Pilih Kategori ═══ */}
      {step === 2 && activeLevel && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Pilih Kategori Materi
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tingkatan:{' '}
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {activeLevel.emoji} {activeLevel.title} ({activeLevel.subtitle})
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="text-left p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-xs group cursor-pointer"
              >
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-fit mb-3 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{cat.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ STEP 3: Pilih Mode ═══ */}
      {step === 3 && activeLevel && activeCategory && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Pilih Mode Latihan</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {activeLevel.emoji} {activeLevel.title} · {activeCategory.title}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODES.map(mode => (
              <Link
                key={mode.id}
                href={buildHref(mode.id)}
                className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-xs group"
              >
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {mode.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {mode.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
              </Link>
            ))}
          </div>

          {/* Tips Info Bar */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">
              💡 Tips Efisiensi Belajar:
            </p>
            <p>
              Gunakan mode <strong>Flashcard</strong> untuk pengenalan kosakata baru, lalu uji kecepatan ingatanmu dengan <strong>Pilihan Ganda</strong> atau <strong>Kuis Audio</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
