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
  MessageSquare
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

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <PageHeader
        title="Pusat Belajar (Learn Hub)"
        description="Pilih materi yang ingin dipelajari. Semua konten dari Minna no Nihongo dan panduan interaktif tersedia di sini."
        icon={<BookOpen className="w-8 h-8 text-blue-600" />}
      />

      {/* Special Interactive Learning Portals */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          Panduan Interaktif Khusus
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-3">
          <Link href="/learn/verbs" className="group block">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-3.5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-xs leading-tight">
                  Konjugasi Masu
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                4 bentuk Masu formal & audio.
              </p>
            </div>
          </Link>

          <Link href="/learn/te-form" className="group block">
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-3.5 hover:border-violet-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-violet-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-violet-700 transition-colors text-xs leading-tight">
                  Bentuk-Te (て形)
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Grup 1/2/3, irama & permohonan.
              </p>
            </div>
          </Link>

          <Link href="/learn/forms" className="group block">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors text-xs leading-tight">
                  Kamus & Nai
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Jisho-kei & Nai-kei konjugasi.
              </p>
            </div>
          </Link>

          <Link href="/learn/plain-form" className="group block">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-3.5 hover:border-rose-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-rose-700 transition-colors text-xs leading-tight">
                  Bentuk Kasual
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Futsūkei biasa & pengalaman.
              </p>
            </div>
          </Link>

          <Link href="/learn/connectors" className="group block">
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-3.5 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-teal-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <Link2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors text-xs leading-tight">
                  Penyambung Kalimat
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Aksi berantai, izin & deskripsi.
              </p>
            </div>
          </Link>

          <Link href="/learn/clauses" className="group block">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-3.5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-xs leading-tight">
                  Modifikasi KB & Opini
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Anak kalimat, ~to omoimasu & baju.
              </p>
            </div>
          </Link>

          <Link href="/learn/adjectives" className="group block">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-3.5 hover:border-purple-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors text-xs leading-tight">
                  Kata Sifat (い & な)
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Rumus negatif, lampau, & KB.
              </p>
            </div>
          </Link>

          <Link href="/learn/positions" className="group block">
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-3.5 hover:border-cyan-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-cyan-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 transition-colors text-xs leading-tight">
                  Posisi Ruang
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Preposisi & います/あります.
              </p>
            </div>
          </Link>

          <Link href="/learn/counters" className="group block">
            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-3.5 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors text-xs leading-tight">
                  Kata Bilangan
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Hitungan 〜つ, 〜人, 〜台, 〜枚.
              </p>
            </div>
          </Link>

          <Link href="/learn/dates" className="group block">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3.5 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors text-xs leading-tight">
                  Kalender & Tanggal
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Tanggal 1〜31 & bulan 1〜12.
              </p>
            </div>
          </Link>

          <Link href="/learn/particle/compare" className="group block">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-600 text-white rounded-xl group-hover:scale-105 transition-transform shrink-0">
                  <GitCompare className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors text-xs leading-tight">
                  Bandingkan Partikel
                </h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Perbedaan は/が, に/で, dll.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Kategori Materi Dasar</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map(cat => (
            <Link key={cat.title} href={cat.href} className="group block">
              <div className={`bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-${cat.color}-400 hover:shadow-md transition-all space-y-3`}>
                <div className={`p-3 bg-${cat.color}-50 text-${cat.color}-600 rounded-xl w-fit group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                  <p className="text-xs text-gray-500">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
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
