import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { BookOpen } from 'lucide-react'
import { LearnHubClient } from '@/components/learn/LearnHubClient'

export default async function LearnPage() {
  const [courses, hCount, ktCount, kjCount, vCount, pCount, gCount] = await Promise.all([
    prisma.course.findMany({
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          include: {
            _count: {
              select: {
                hiragana: true,
                katakana: true,
                kanji: true,
                vocabulary: true,
                particles: true,
                grammar: true,
              },
            },
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Pusat Belajar (Learn Hub)"
        description="Jelajahi seluruh kurikulum 25 bab Minna no Nihongo, 12 panduan interaktif, dan materi dasar."
        icon={<BookOpen className="w-8 h-8 text-zinc-900 dark:text-zinc-100" />}
      />

      <LearnHubClient
        courses={courses}
        counts={{
          hiragana: hCount,
          katakana: ktCount,
          kanji: kjCount,
          vocabulary: vCount,
          particles: pCount,
          grammar: gCount,
        }}
      />
    </div>
  )
}
