import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PracticeEngine } from '@/components/practice/PracticeEngine'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { PageHeader } from '@/components/shared/PageHeader'
import { Layers, HelpCircle, Keyboard, Volume2 } from 'lucide-react'

interface PracticePageProps {
  params: Promise<{ mode: string }>
  searchParams: Promise<{ type?: string; babStart?: string; babEnd?: string }>
}

export default async function PracticeSessionPage({ params, searchParams }: PracticePageProps) {
  const { mode: rawMode } = await params
  const { type: rawType, babStart, babEnd } = await searchParams
  const mode = rawMode as 'flashcard' | 'multiple-choice' | 'type-answer' | 'audio-quiz'
  const type = rawType || 'vocabulary'

  // Validasi mode
  const validModes = ['flashcard', 'multiple-choice', 'type-answer', 'audio-quiz']
  if (!validModes.includes(mode)) {
    notFound()
  }

  // Build lesson filter berdasarkan babStart & babEnd (tingkatan)
  const lessonWhere: any = {}
  if (babStart && babEnd) {
    lessonWhere.order = {
      gte: parseInt(babStart),
      lte: parseInt(babEnd),
    }
  }

  // Fetch data berdasarkan tipe materi + filter lesson/bab
  let rawData: any[] = []

  if (type === 'vocabulary') {
    const vocab = await prisma.vocabulary.findMany({
      where: { lesson: lessonWhere.order ? { order: lessonWhere.order } : undefined },
    })
    rawData = vocab.map(v => ({
      id: v.id,
      front: v.kanji || v.kana,
      back: v.meaning || '',
      romaji: v.romaji || '',
      audioText: v.kana || v.word,
    }))
  } else if (type === 'hiragana') {
    const hira = await prisma.hiragana.findMany({
      where: { lesson: lessonWhere.order ? { order: lessonWhere.order } : undefined },
    })
    rawData = hira.map(h => ({
      id: h.id,
      front: h.character,
      back: h.romaji,
      romaji: h.romaji,
      audioText: h.character,
    }))
  } else if (type === 'katakana') {
    const kata = await prisma.katakana.findMany({
      where: { lesson: lessonWhere.order ? { order: lessonWhere.order } : undefined },
    })
    rawData = kata.map(k => ({
      id: k.id,
      front: k.character,
      back: k.romaji,
      romaji: k.romaji,
      audioText: k.character,
    }))
  } else if (type === 'particle') {
    const particles = await prisma.particle.findMany({
      where: { lesson: lessonWhere.order ? { order: lessonWhere.order } : undefined },
    })
    rawData = particles.map(p => ({
      id: p.id,
      front: p.particle,
      back: p.meaning || p.reading || '',
      romaji: p.reading || '',
      audioText: p.example || p.particle,
    }))
  } else if (type === 'grammar') {
    const grammar = await prisma.grammar.findMany({
      where: { lesson: lessonWhere.order ? { order: lessonWhere.order } : undefined },
    })
    rawData = grammar.map(g => ({
      id: g.id,
      front: g.pattern,
      back: g.meaning || '',
      audioText: g.example || g.pattern,
    }))
  } else if (type === 'kanji') {
    const kanjiList = await prisma.kanji.findMany({
      where: { lesson: lessonWhere.order ? { order: lessonWhere.order } : undefined },
    })
    rawData = kanjiList.map(k => ({
      id: k.id,
      front: k.character,
      back: k.meaning || k.romaji || '',
      romaji: k.romaji || '',
      audioText: k.hiragana || k.character,
    }))
  }

  // Label tingkatan untuk breadcrumb & deskripsi
  let levelLabel = ''
  if (babStart && babEnd) {
    const start = parseInt(babStart)
    const end = parseInt(babEnd)
    if (start <= 8) levelLabel = 'Pemula'
    else if (start <= 16) levelLabel = 'Menengah'
    else levelLabel = 'Lanjutan'
    levelLabel += ` (Bab ${start}–${end})`
  }

  if (rawData.length < 2) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Latihan', href: '/practice' },
            { label: mode },
          ]}
        />
        <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Materi Belum Cukup</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Materi <strong>{type}</strong>{levelLabel ? ` di tingkat ${levelLabel}` : ''} membutuhkan minimal 2 item data untuk dapat dilatih.
          </p>
        </div>
      </div>
    )
  }

  const modeConfig = {
    flashcard: { title: 'Flashcard', icon: <Layers className="w-8 h-8" /> },
    'multiple-choice': { title: 'Pilihan Ganda', icon: <HelpCircle className="w-8 h-8" /> },
    'type-answer': { title: 'Ketik Jawaban', icon: <Keyboard className="w-8 h-8" /> },
    'audio-quiz': { title: 'Kuis Audio', icon: <Volume2 className="w-8 h-8" /> },
  }

  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
  const description = levelLabel
    ? `Latihan ${typeLabel} · ${levelLabel} · ${rawData.length} soal tersedia`
    : `Latihan ${typeLabel} · ${rawData.length} soal tersedia`

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Latihan', href: '/practice' },
          ...(levelLabel ? [{ label: levelLabel }] : []),
          { label: modeConfig[mode].title },
        ]}
      />

      <PageHeader
        title={modeConfig[mode].title}
        description={description}
        icon={modeConfig[mode].icon}
      />

      <PracticeEngine questions={rawData} mode={mode} materialType={type} />
    </div>
  )
}
