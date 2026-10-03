import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PracticeEngine } from '@/components/practice/PracticeEngine'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { PageHeader } from '@/components/shared/PageHeader'
import { Layers, HelpCircle, Keyboard, Volume2 } from 'lucide-react'

interface PracticePageProps {
  params: Promise<{ mode: string }>
  searchParams: Promise<{ type?: string }>
}

export default async function PracticeSessionPage({ params, searchParams }: PracticePageProps) {
  const { mode: rawMode } = await params
  const { type: rawType } = await searchParams

  const mode = rawMode as 'flashcard' | 'multiple-choice' | 'type-answer' | 'audio-quiz'
  const type = rawType || 'vocabulary'

  // Validasi mode (Dukungan Phase 5 Core & Phase 6 Specialized Practice)
  const validModes = ['flashcard', 'multiple-choice', 'type-answer', 'audio-quiz']
  if (!validModes.includes(mode)) {
    notFound()
  }

  // Fetch data berdasarkan tipe materi
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
      romaji: h.romaji,
      audioText: h.character,
    }))
  } else if (type === 'katakana') {
    const kata = await prisma.katakana.findMany()
    rawData = kata.map(k => ({
      id: k.id,
      front: k.character,
      back: k.romaji,
      romaji: k.romaji,
      audioText: k.character,
    }))
  } else if (type === 'particle') {
    const particles = await prisma.particle.findMany()
    rawData = particles.map(p => ({
      id: p.id,
      front: p.particle,
      back: p.meaning || p.reading || '',
      romaji: p.reading || '',
      audioText: p.example || p.particle,
    }))
  } else if (type === 'grammar') {
    const grammar = await prisma.grammar.findMany()
    rawData = grammar.map(g => ({
      id: g.id,
      front: g.pattern,
      back: g.meaning || '',
      audioText: g.example || g.pattern,
    }))
  } else if (type === 'kanji') {
    const kanjiList = await prisma.kanji.findMany()
    rawData = kanjiList.map(k => ({
      id: k.id,
      front: k.character,
      back: k.meaning || k.romaji || '',
      romaji: k.romaji || '',
      audioText: k.hiragana || k.character,
    }))
  }

  if (rawData.length < 2) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Practice', href: '/practice' },
            { label: mode },
          ]}
        />
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Materi Belum Cukup</h2>
          <p className="text-gray-600">
            Materi <strong>{type}</strong> membutuhkan minimal 2 item data untuk dapat dilatih.
          </p>
        </div>
      </div>
    )
  }

  const modeConfig = {
    flashcard: { title: 'Flashcard', icon: <Layers className="w-8 h-8" /> },
    'multiple-choice': { title: 'Multiple Choice', icon: <HelpCircle className="w-8 h-8" /> },
    'type-answer': { title: 'Type Answer', icon: <Keyboard className="w-8 h-8" /> },
    'audio-quiz': { title: 'Audio Quiz', icon: <Volume2 className="w-8 h-8" /> },
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

      <PracticeEngine questions={rawData} mode={mode} materialType={type} />
    </div>
  )
}
