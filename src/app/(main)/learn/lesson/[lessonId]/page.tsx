import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { HiraganaCard } from '@/components/learn/HiraganaCard'
import { VocabularyCard } from '@/components/learn/VocabularyCard'
import { ParticleCard } from '@/components/learn/ParticleCard'
import { GrammarCard } from '@/components/learn/GrammarCard'
import { StrokeOrderAnimation } from '@/components/learn/StrokeOrderAnimation'
import { BookOpen } from 'lucide-react'

interface LessonPageProps {
  params: Promise<{
    lessonId: string
  }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      hiragana: true,
      katakana: true,
      kanji: true,
      vocabulary: true,
      particles: true,
      grammar: true,
      course: true,
    },
  })

  if (!lesson) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: lesson.course.title, href: '/learn' },
          { label: lesson.title },
        ]}
      />

      <PageHeader
        title={lesson.title}
        description={lesson.description || ''}
        icon={<BookOpen className="w-8 h-8" />}
      />

      {/* Hiragana Section */}
      {lesson.hiragana.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-3xl">あ</span> Hiragana
            </h2>
          </div>
          
          {/* Stroke Order Demo (Hanya untuk karakter pertama sebagai contoh) */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 mb-4">✍️ Stroke Order Demo</h3>
            <StrokeOrderAnimation character={lesson.hiragana[0].character} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {lesson.hiragana.map((h) => (
              <HiraganaCard 
                key={h.id} 
                character={h.character} 
                romaji={h.romaji} 
                example={h.example} 
                audioUrl={h.audioUrl}
              />
            ))}
          </div>
        </section>
      )}

      {/* Vocabulary Section */}
      {lesson.vocabulary.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">📖</span> Vocabulary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.vocabulary.map((v) => (
              <VocabularyCard 
                key={v.id} 
                kanji={v.kanji} 
                kana={v.kana || v.word} 
                romaji={v.romaji || ''} 
                meaning={v.meaning || ''} 
                wordType={v.wordType} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Particle Section */}
      {lesson.particles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">✨</span> Particle
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lesson.particles.map((p) => (
              <ParticleCard 
                key={p.id} 
                particle={p.particle} 
                reading={p.reading || ''} 
                meaning={p.meaning || ''} 
                function={p.function || ''} 
                pattern={p.pattern} 
                example={p.example} 
                translation={p.translation} 
                commonMistake={p.commonMistake} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Grammar Section */}
      {lesson.grammar.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">📝</span> Grammar
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lesson.grammar.map((g) => (
              <GrammarCard 
                key={g.id} 
                pattern={g.pattern} 
                meaning={g.meaning || ''} 
                usage={g.usage} 
                example={g.example} 
                translation={g.translation} 
                note={g.note} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
