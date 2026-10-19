'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Layers,
  Zap,
  MessageSquare,
  Link2,
  FileText,
  GitFork,
  Compass,
  Calculator,
  Calendar,
  GitCompare,
  Languages,
  Type,
  BookMarked,
  GraduationCap
} from 'lucide-react'

interface CourseWithLessons {
  id: string
  title: string
  description?: string | null
  lessons: Array<{
    id: string
    title: string
    description?: string | null
    order: number
    _count: {
      hiragana: number
      katakana: number
      kanji: number
      vocabulary: number
      particles: number
      grammar: number
    }
  }>
}

interface LearnHubClientProps {
  courses: CourseWithLessons[]
  counts: {
    hiragana: number
    katakana: number
    kanji: number
    vocabulary: number
    particles: number
    grammar: number
  }
}

export function LearnHubClient({ courses, counts }: LearnHubClientProps) {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'guides' | 'categories'>('curriculum')

  const interactiveGuides = [
    {
      title: 'Konjugasi Masu',
      badge: 'Bab 4–6',
      description: '4 bentuk Masu formal, waktu & audio pelafalan.',
      href: '/learn/verbs',
      icon: Layers,
    },
    {
      title: 'Bentuk-Te (て形)',
      badge: 'Bab 14',
      description: 'Aturan grup 1/2/3, irama hafalan & permohonan.',
      href: '/learn/te-form',
      icon: Zap,
    },
    {
      title: 'Kamus & Nai',
      badge: 'Bab 17–18',
      description: 'Jisho-kei (kamus) & Nai-kei (negatif kasual).',
      href: '/learn/forms',
      icon: Sparkles,
    },
    {
      title: 'Bentuk Kasual',
      badge: 'Bab 19–20',
      description: 'Futsūkei percakapan santai & pengalaman hidup.',
      href: '/learn/plain-form',
      icon: MessageSquare,
    },
    {
      title: 'Penyambung Kalimat',
      badge: 'Bab 15–16',
      description: 'Aksi berantai, izin, larangan & deskripsi sifat.',
      href: '/learn/connectors',
      icon: Link2,
    },
    {
      title: 'Modifikasi KB & Opini',
      badge: 'Bab 21–22',
      description: 'Anak kalimat, ~to omoimasu & kata kerja baju.',
      href: '/learn/clauses',
      icon: FileText,
    },
    {
      title: 'Pengandaian & Bantuan',
      badge: 'Bab 23–25',
      description: 'Rumus ~To, ~Tara, ~Temo & transaksi kebaikan.',
      href: '/learn/conditionals',
      icon: GitFork,
    },
    {
      title: 'Kata Sifat (い & な)',
      badge: 'Bab 8 & 12',
      description: 'Rumus negatif, lampau, & modifikasi kata benda.',
      href: '/learn/adjectives',
      icon: Sparkles,
    },
    {
      title: 'Posisi Ruang',
      badge: 'Bab 10',
      description: 'Preposisi tempat & keberadaan います/あります.',
      href: '/learn/positions',
      icon: Compass,
    },
    {
      title: 'Kata Bilangan',
      badge: 'Bab 11',
      description: 'Hitungan unit 〜つ, 〜人, 〜台, 〜枚, dll.',
      href: '/learn/counters',
      icon: Calculator,
    },
    {
      title: 'Kalender & Tanggal',
      badge: 'Bab 5',
      description: 'Penanggalan 1〜31, bulan, hari & waktu.',
      href: '/learn/dates',
      icon: Calendar,
    },
    {
      title: 'Bandingkan Partikel',
      badge: 'Sintaksis',
      description: 'Komparasi mendalam は vs が, に vs で, dll.',
      href: '/learn/particle/compare',
      icon: GitCompare,
    },
  ]

  const categories = [
    { title: 'Hiragana', icon: Languages, description: `${counts.hiragana} karakter dasar`, href: '/learn/hiragana' },
    { title: 'Katakana', icon: Type, description: `${counts.katakana} karakter kata asing`, href: '/learn/katakana' },
    { title: 'Kanji', icon: FileText, description: `${counts.kanji} karakter logografis`, href: '/learn/kanji' },
    { title: 'Kosakata', icon: BookMarked, description: `${counts.vocabulary} kata`, href: '/learn/vocabulary' },
    { title: 'Partikel', icon: Sparkles, description: `${counts.particles} partikel`, href: '/learn/particle' },
    { title: 'Grammar', icon: GraduationCap, description: `${counts.grammar} pola kalimat`, href: '/learn/grammar' },
  ]

  const allLessons = courses.flatMap(c => c.lessons)

  return (
    <div className="space-y-6">
      {/* Segmented Control Tab Minimalis */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 max-w-md w-full">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'curriculum'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-bold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Kurikulum 25 Bab ({allLessons.length})
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'guides'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-bold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Panduan Khusus (12)
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'categories'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-bold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Materi Dasar (6)
          </button>
        </div>
      </div>

      {/* TAB 1: KURIKULUM 25 BAB (MINIMALIS & RAPI) */}
      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
            <span>Daftar Bab Minna no Nihongo I (JLPT N5)</span>
            <span>Total 25 Bab Lengkap</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allLessons.map((lesson) => {
              const c = lesson._count
              const totalItems = c.hiragana + c.katakana + c.kanji + c.vocabulary + c.particles + c.grammar

              return (
                <Link key={lesson.id} href={`/learn/lesson/${lesson.id}`} className="group block">
                  <div className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-800 dark:text-zinc-200 shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {lesson.order}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                          {lesson.description || 'Materi pembelajaran bab ini'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                        {totalItems} materi
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PANDUAN INTERAKTIF KHUSUS (12 MODUL) */}
      {activeTab === 'guides' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
            <span>Eksplorasi modul konjugasi & sintaksis interaktif</span>
            <span>12 Panduan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {interactiveGuides.map((guide) => {
              const IconComp = guide.icon
              return (
                <Link key={guide.href} href={guide.href} className="group block">
                  <div className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex flex-col justify-between h-full space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:scale-105 transition-transform shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {guide.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1 leading-snug">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 3: MATERI DASAR (6 KATEGORI) */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
            <span>Fundamental bahasa Jepang berdasarkan kategori dasar</span>
            <span>6 Pilar</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {categories.map((cat) => {
              const IconComp = cat.icon
              return (
                <Link key={cat.title} href={cat.href} className="group block">
                  <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all space-y-3 shadow-xs">
                    <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 w-fit group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
