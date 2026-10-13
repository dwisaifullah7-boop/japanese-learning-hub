import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import {
  BookOpen,
  Languages,
  Type,
  FileText,
  BookMarked,
  Sparkles,
  GraduationCap,
  ArrowRight,
  GitCompare,
  Layers,
  Calendar,
  Compass,
  Calculator,
  Zap,
  Link2,
  MessageSquare,
  GitFork
} from 'lucide-react'

export default async function LearnPage() {
  const [courses, hCount, ktCount, kjCount, vCount, pCount, gCount] = await Promise.all([
    prisma.course.findMany({
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          include: {
            _count: { select: { hiragana: true, katakana: true, kanji: true, vocabulary: true, particles: true, grammar: true } },
          },
        },
      },
    }),
    prisma.hiragana.count(),
    prisma.katakana.count(),
    prisma.kanji.count(),
    prisma.vocabulary.count(),
    prisma.particle.count(),
    prisma.grammar.count(),
  ])

  const categories = [
    { title: 'Hiragana', icon: <Languages className="w-6 h-6" />, description: `${hCount} karakter dasar`, href: '/learn/hiragana', color: 'blue' },
    { title: 'Katakana', icon: <Type className="w-6 h-6" />, description: `${ktCount} karakter kata asing`, href: '/learn/katakana', color: 'purple' },
    { title: 'Kanji', icon: <FileText className="w-6 h-6" />, description: `${kjCount} karakter logografis`, href: '/learn/kanji', color: 'red' },
    { title: 'Kosakata', icon: <BookMarked className="w-6 h-6" />, description: `${vCount} kata`, href: '/learn/vocabulary', color: 'indigo' },
    { title: 'Partikel', icon: <Sparkles className="w-6 h-6" />, description: `${pCount} partikel`, href: '/learn/particle', color: 'amber' },
    { title: 'Grammar', icon: <GraduationCap className="w-6 h-6" />, description: `${gCount} pola kalimat`, href: '/learn/grammar', color: 'emerald' },
  ]

  const interactiveGuides = [
    {
      title: 'Konjugasi Masu',
      badge: 'Bab 4–6',
      description: '4 bentuk Masu formal, waktu & audio pelafalan.',
      href: '/learn/verbs',
      icon: <Layers className="w-5 h-5" />,
      borderClass: 'border-blue-200 hover:border-blue-400',
      bgClass: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/30',
      iconBg: 'bg-blue-600',
    },
    {
      title: 'Bentuk-Te (て形)',
      badge: 'Bab 14',
      description: 'Aturan grup 1/2/3, irama hafalan & permohonan.',
      href: '/learn/te-form',
      icon: <Zap className="w-5 h-5" />,
      borderClass: 'border-violet-200 hover:border-violet-400',
      bgClass: 'bg-gradient-to-br from-violet-50/80 to-purple-50/30',
      iconBg: 'bg-violet-600',
    },
    {
      title: 'Kamus & Nai',
      badge: 'Bab 17–18',
      description: 'Jisho-kei (kamus) & Nai-kei (negatif kasual).',
      href: '/learn/forms',
      icon: <Sparkles className="w-5 h-5" />,
      borderClass: 'border-amber-200 hover:border-amber-400',
      bgClass: 'bg-gradient-to-br from-amber-50/80 to-orange-50/30',
      iconBg: 'bg-amber-600',
    },
    {
      title: 'Bentuk Kasual',
      badge: 'Bab 19–20',
      description: 'Futsūkei percakapan santai & pengalaman hidup.',
      href: '/learn/plain-form',
      icon: <MessageSquare className="w-5 h-5" />,
      borderClass: 'border-rose-200 hover:border-rose-400',
      bgClass: 'bg-gradient-to-br from-rose-50/80 to-pink-50/30',
      iconBg: 'bg-rose-600',
    },
    {
      title: 'Penyambung Kalimat',
      badge: 'Bab 15–16',
      description: 'Aksi berantai, izin, larangan & deskripsi sifat.',
      href: '/learn/connectors',
      icon: <Link2 className="w-5 h-5" />,
      borderClass: 'border-teal-200 hover:border-teal-400',
      bgClass: 'bg-gradient-to-br from-teal-50/80 to-emerald-50/30',
      iconBg: 'bg-teal-600',
    },
    {
      title: 'Modifikasi KB & Opini',
      badge: 'Bab 21–22',
      description: 'Anak kalimat, ~to omoimasu & kata kerja baju.',
      href: '/learn/clauses',
      icon: <FileText className="w-5 h-5" />,
      borderClass: 'border-sky-200 hover:border-sky-400',
      bgClass: 'bg-gradient-to-br from-sky-50/80 to-blue-50/30',
      iconBg: 'bg-sky-600',
    },
    {
      title: 'Pengandaian & Bantuan',
      badge: 'Bab 23–25',
      description: 'Rumus ~To, ~Tara, ~Temo & transaksi kebaikan.',
      href: '/learn/conditionals',
      icon: <GitFork className="w-5 h-5" />,
      borderClass: 'border-emerald-200 hover:border-emerald-400',
      bgClass: 'bg-gradient-to-br from-emerald-50/80 to-teal-50/30',
      iconBg: 'bg-emerald-600',
    },
    {
      title: 'Kata Sifat (い & な)',
      badge: 'Bab 8 & 12',
      description: 'Rumus negatif, lampau, & modifikasi kata benda.',
      href: '/learn/adjectives',
      icon: <Sparkles className="w-5 h-5" />,
      borderClass: 'border-purple-200 hover:border-purple-400',
      bgClass: 'bg-gradient-to-br from-purple-50/80 to-fuchsia-50/30',
      iconBg: 'bg-purple-600',
    },
    {
      title: 'Posisi Ruang',
      badge: 'Bab 10',
      description: 'Preposisi tempat & keberadaan います/あります.',
      href: '/learn/positions',
      icon: <Compass className="w-5 h-5" />,
      borderClass: 'border-cyan-200 hover:border-cyan-400',
      bgClass: 'bg-gradient-to-br from-cyan-50/80 to-blue-50/30',
      iconBg: 'bg-cyan-600',
    },
    {
      title: 'Kata Bilangan',
      badge: 'Bab 11',
      description: 'Hitungan unit 〜つ, 〜人, 〜台, 〜枚, dll.',
      href: '/learn/counters',
      icon: <Calculator className="w-5 h-5" />,
      borderClass: 'border-indigo-200 hover:border-indigo-400',
      bgClass: 'bg-gradient-to-br from-indigo-50/80 to-violet-50/30',
      iconBg: 'bg-indigo-600',
    },
    {
      title: 'Kalender & Tanggal',
      badge: 'Bab 5',
      description: 'Penanggalan 1〜31, bulan, hari & waktu.',
      href: '/learn/dates',
      icon: <Calendar className="w-5 h-5" />,
      borderClass: 'border-lime-200 hover:border-lime-400',
      bgClass: 'bg-gradient-to-br from-lime-50/80 to-emerald-50/30',
      iconBg: 'bg-lime-600',
    },
    {
      title: 'Bandingkan Partikel',
      badge: 'Sintaksis',
      description: 'Komparasi mendalam は vs が, に vs で, dll.',
      href: '/learn/particle/compare',
      icon: <GitCompare className="w-5 h-5" />,
      borderClass: 'border-orange-200 hover:border-orange-400',
      bgClass: 'bg-gradient-to-br from-orange-50/80 to-amber-50/30',
      iconBg: 'bg-orange-600',
    },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <PageHeader
        title="Pusat Belajar (Learn Hub)"
        description="Pilih materi yang ingin dipelajari. Semua konten dari Minna no Nihongo dan panduan interaktif tersedia di sini."
        icon={<BookOpen className="w-8 h-8 text-blue-600" />}
      />

      {/* Special Interactive Learning Portals */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Panduan Interaktif Khusus (12 Modul)
          </h2>
          <span className="text-xs text-gray-500 font-medium">Lengkap N5</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {interactiveGuides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="group block">
              <div
                className={`p-4 rounded-2xl border ${guide.borderClass} ${guide.bgClass} hover:shadow-md transition-all flex flex-col justify-between h-full space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2.5 ${guide.iconBg} text-white rounded-xl group-hover:scale-105 transition-transform shrink-0`}
                  >
                    {guide.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/90 border border-gray-200 text-gray-600 shadow-xs">
                    {guide.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-sm mb-1 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Kategori Materi Dasar</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map(cat => {
            const styleMap: Record<string, { border: string; bg: string; text: string }> = {
              blue: { border: 'hover:border-blue-400', bg: 'bg-blue-50', text: 'text-blue-600' },
              purple: { border: 'hover:border-purple-400', bg: 'bg-purple-50', text: 'text-purple-600' },
              red: { border: 'hover:border-red-400', bg: 'bg-red-50', text: 'text-red-600' },
              indigo: { border: 'hover:border-indigo-400', bg: 'bg-indigo-50', text: 'text-indigo-600' },
              amber: { border: 'hover:border-amber-400', bg: 'bg-amber-50', text: 'text-amber-600' },
              emerald: { border: 'hover:border-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-600' },
            }
            const st = styleMap[cat.color] || styleMap.blue
            return (
              <Link key={cat.title} href={cat.href} className="group block">
                <div className={`bg-white p-5 rounded-2xl border border-gray-200 shadow-sm ${st.border} hover:shadow-md transition-all space-y-3`}>
                  <div className={`p-3 ${st.bg} ${st.text} rounded-xl w-fit group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Courses & Lessons */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Kurikulum Buku & Bab (Minna no Nihongo)</h2>
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-5">
              <h3 className="text-xl font-bold text-white">{course.title}</h3>
              {course.description && <p className="text-sm text-gray-300 mt-1">{course.description}</p>}
            </div>
            <div className="p-4 space-y-2">
              {course.lessons.map(lesson => {
                const c = lesson._count
                const totalItems = c.hiragana + c.katakana + c.kanji + c.vocabulary + c.particles + c.grammar
                return (
                  <Link key={lesson.id} href={`/learn/lesson/${lesson.id}`} className="group block">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all">
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{lesson.title}</h4>
                        {lesson.description && <p className="text-xs text-gray-500 mt-0.5">{lesson.description}</p>}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {c.hiragana > 0 && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{c.hiragana} Hiragana</span>}
                          {c.katakana > 0 && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{c.katakana} Katakana</span>}
                          {c.kanji > 0 && <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{c.kanji} Kanji</span>}
                          {c.vocabulary > 0 && <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{c.vocabulary} Vocab</span>}
                          {c.particles > 0 && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{c.particles} Partikel</span>}
                          {c.grammar > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{c.grammar} Grammar</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-gray-400">{totalItems} materi</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
