import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PracticeEngine } from '@/components/practice/PracticeEngine'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { PageHeader } from '@/components/shared/PageHeader'
import { Layers, HelpCircle, Keyboard } from 'lucide-react'

interface PracticePageProps {
  params: Promise<{ mode: string }>
  searchParams: Promise<{ type?: string }>
}

export default async function PracticeSessionPage({ params, searchParams }: PracticePageProps) {
  const { mode: rawMode } = await params
  const { type: rawType } = await searchParams

  const mode = rawMode as 'flashcard' | 'multiple-choice' | 'type-answer'
  const type = rawType || 'vocabulary'

  // Validasi mode
  const validModes = ['flashcard', 'multiple-choice', 'type-answer']
  if (!validModes.includes(mode)) {
    notFound()
  }

  // Fetch data berdasarkan tipe materi (Default: Vocabulary)
  let rawData: any[] = []
  if (type === 'vocabulary') {
    const vocab = await prisma.vocabulary.findMany()
    rawData = vocab.map(v => ({
      id: v.id,
      front: v.kanji || v.kana,
      back: v.meaning || '',
      romaji: v.romaji || '',
      audioText: v.kana || v.word,
    }))
  } else if (type === 'hiragana') {
    const hira = await prisma.hiragana.findMany()
    rawData = hira.map(h => ({
      id: h.id,
      front: h.character,
      back: h.romaji,
      audioText: h.character,
    }))
  }

  if (rawData.length < 2) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Data materi tidak cukup untuk melakukan latihan. (Minimal 2 item)</p>
      </div>
    )
  }

  const modeConfig = {
    flashcard: { title: 'Flashcard', icon: <Layers className="w-8 h-8" /> },
    'multiple-choice': { title: 'Multiple Choice', icon: <HelpCircle className="w-8 h-8" /> },
    'type-answer': { title: 'Type Answer', icon: <Keyboard className="w-8 h-8" /> },
  }

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Practice', href: '/practice' },
          { label: modeConfig[mode].title },
        ]}
      />

      <PageHeader
        title={modeConfig[mode].title}
        description={`Latihan materi ${type.charAt(0).toUpperCase() + type.slice(1)} dengan mode ${modeConfig[mode].title}.`}
        icon={modeConfig[mode].icon}
      />

      <PracticeEngine questions={rawData} mode={mode} />
    </div>
  )
}
