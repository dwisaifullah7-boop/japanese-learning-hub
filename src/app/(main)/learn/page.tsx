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
  Layers
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/learn/verbs" className="group block">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-blue-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    Tabel Konjugasi Kata Kerja
                  </h3>
                  <p className="text-xs text-gray-600">
                    Kuasai 4 bentuk Masu (Kini, Negatif, Lampau, Lampau Negatif) dengan audio.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          </Link>

          <Link href="/learn/particle/compare" className="group block">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-amber-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                  <GitCompare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                    Perbandingan Partikel
                  </h3>
                  <p className="text-xs text-gray-600">
                    Pahami perbedaan は vs が, に vs で, に vs へ, dan は vs も.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform shrink-0" />
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
