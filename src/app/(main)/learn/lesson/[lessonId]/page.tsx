import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { AudioButton } from '@/components/shared/AudioButton'
import { BookOpen, Languages, Type, FileText, BookMarked, Sparkles, PenTool, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ lessonId: string }>
}

export default async function LessonDetailPage({ params }: Props) {
  const { lessonId } = await params

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      course: true,
      hiragana: true,
      katakana: true,
      kanji: true,
      vocabulary: true,
      particles: true,
      grammar: true,
    },
  })

  if (!lesson) notFound()

  const sections = [
    { key: 'hiragana', label: 'Hiragana', icon: <Languages className="w-5 h-5" />, color: 'blue', count: lesson.hiragana.length, href: '/learn/hiragana' },
    { key: 'katakana', label: 'Katakana', icon: <Type className="w-5 h-5" />, color: 'purple', count: lesson.katakana.length, href: '/learn/katakana' },
    { key: 'kanji', label: 'Kanji', icon: <FileText className="w-5 h-5" />, color: 'red', count: lesson.kanji.length, href: '/learn/kanji' },
    { key: 'vocabulary', label: 'Kosakata', icon: <BookMarked className="w-5 h-5" />, color: 'indigo', count: lesson.vocabulary.length, href: '/learn/vocabulary' },
    { key: 'particles', label: 'Partikel', icon: <Sparkles className="w-5 h-5" />, color: 'amber', count: lesson.particles.length, href: '/learn/particle' },
    { key: 'grammar', label: 'Grammar', icon: <PenTool className="w-5 h-5" />, color: 'emerald', count: lesson.grammar.length, href: '/learn/grammar' },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: lesson.course.title },
          { label: lesson.title },
        ]}
      />

      <PageHeader
        title={`${lesson.title} — ${lesson.course.title}`}
        description={lesson.description || 'Detail materi pembelajaran untuk bab ini.'}
        icon={<BookOpen className="w-8 h-8 text-blue-600" />}
      />

      {/* Content Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {sections.map(s => (
          <div key={s.key} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-xl p-4 text-center space-y-1`}>
            <div className={`text-${s.color}-600 flex justify-center`}>{s.icon}</div>
            <p className="text-2xl font-black text-gray-900">{s.count}</p>
            <p className="text-xs font-medium text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Hiragana Preview */}
      {lesson.hiragana.length > 0 && (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2"><Languages className="w-5 h-5" /> Hiragana ({lesson.hiragana.length})</h3>
            <Link href="/learn/hiragana" className="text-xs text-blue-200 hover:text-white flex items-center gap-1">Lihat Semua <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            {lesson.hiragana.map(h => (
              <div key={h.id} className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xl font-bold font-japanese">{h.character}</span>
                <span className="text-[9px] text-gray-500">{h.romaji}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Vocabulary Preview */}
      {lesson.vocabulary.length > 0 && (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-indigo-600 p-4 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2"><BookMarked className="w-5 h-5" /> Kosakata ({lesson.vocabulary.length})</h3>
            <Link href="/learn/vocabulary" className="text-xs text-indigo-200 hover:text-white flex items-center gap-1">Lihat Semua <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {lesson.vocabulary.map(v => (
              <div key={v.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-center min-w-[50px]">
                  {v.kanji && <p className="text-lg font-bold font-japanese">{v.kanji}</p>}
                  <p className="text-xs text-indigo-600 font-japanese">{v.kana}</p>
                </div>
                <div className="flex-1 border-l border-gray-200 pl-3">
                  <p className="text-sm font-bold text-gray-900">{v.meaning}</p>
                  <p className="text-xs text-gray-500">{v.romaji}</p>
                </div>
                <AudioButton audioUrl={v.kana || v.word} size="sm" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grammar Preview */}
      {lesson.grammar.length > 0 && (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-emerald-600 p-4 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2"><PenTool className="w-5 h-5" /> Grammar ({lesson.grammar.length})</h3>
            <Link href="/learn/grammar" className="text-xs text-emerald-200 hover:text-white flex items-center gap-1">Lihat Semua <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="p-4 space-y-3">
            {lesson.grammar.map((g, idx) => (
              <div key={g.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold w-6 h-6 rounded flex items-center justify-center">{idx + 1}</span>
                  <h4 className="font-bold text-gray-900 font-japanese">{g.pattern}</h4>
                </div>
                {g.meaning && <p className="text-sm text-gray-700">{g.meaning}</p>}
                {g.example && (
                  <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-japanese font-medium">{g.example}</p>
                      {g.translation && <p className="text-xs text-gray-500">{g.translation}</p>}
                    </div>
                    <AudioButton audioUrl={g.example} size="sm" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Particle Preview */}
      {lesson.particles.length > 0 && (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-amber-600 p-4 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2"><Sparkles className="w-5 h-5" /> Partikel ({lesson.particles.length})</h3>
            <Link href="/learn/particle" className="text-xs text-amber-200 hover:text-white flex items-center gap-1">Lihat Semua <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.particles.map(p => (
              <div key={p.id} className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                <span className="text-3xl font-bold text-amber-700 font-japanese">{p.particle}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{p.reading ? `(${p.reading})` : ''} {p.meaning}</p>
                  {p.example && <p className="text-xs text-gray-500 font-japanese">{p.example}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Kanji Preview */}
      {lesson.kanji.length > 0 && (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-red-600 p-4 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2"><FileText className="w-5 h-5" /> Kanji ({lesson.kanji.length})</h3>
            <Link href="/learn/kanji" className="text-xs text-red-200 hover:text-white flex items-center gap-1">Lihat Semua <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {lesson.kanji.map(k => (
              <div key={k.id} className="bg-gray-50 rounded-lg p-3 text-center space-y-1">
                <p className="text-3xl font-bold font-japanese text-gray-900">{k.character}</p>
                <p className="text-sm font-bold text-red-700">{k.meaning}</p>
                <p className="text-xs text-gray-500">{k.romaji}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Practice CTA */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Mulai Latihan {lesson.title}!</h4>
        <p className="text-xs text-gray-500">Uji pemahaman materi {lesson.title} dalam berbagai mode latihan.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/practice" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors">
            Latihan Sekarang <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/exam" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 border border-blue-300 rounded-xl hover:bg-blue-50 font-medium text-sm transition-colors">
            Ujian Evaluasi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
