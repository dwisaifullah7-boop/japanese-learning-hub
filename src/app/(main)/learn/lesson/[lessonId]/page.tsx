import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BookOpen } from 'lucide-react'
import { InteractiveLessonView } from '@/components/learn/InteractiveLessonView'

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
        description={lesson.description || 'Pelajari materi, hafalkan dengan flashcard 3D, atau uji kemampuan dengan ujian evaluasi.'}
        icon={<BookOpen className="w-8 h-8 text-blue-600" />}
      />

      {/* Interactive Lesson View with Flashcard Mode & Tabs */}
      <InteractiveLessonView lesson={lesson} />
    </div>
  )
}
