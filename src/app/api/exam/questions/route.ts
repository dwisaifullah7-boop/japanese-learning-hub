import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const preset = searchParams.get('preset') || 'comprehensive'
    const countParam = searchParams.get('count')
    const totalTarget = countParam ? parseInt(countParam, 10) : preset === 'comprehensive' ? 15 : 10

    // Fetch candidate materials based on preset
    let rawVocab: any[] = []
    let rawHira: any[] = []
    let rawKata: any[] = []
    let rawKanji: any[] = []
    let rawParticle: any[] = []
    let rawGrammar: any[] = []

    if (preset.startsWith('bab')) {
      const babOrder = parseInt(preset.replace('bab', ''), 10) || 1
      const targetLesson = await prisma.lesson.findFirst({
        where: { order: babOrder },
      })

      if (targetLesson) {
        ;[rawVocab, rawKanji, rawParticle, rawGrammar, rawHira] = await Promise.all([
          prisma.vocabulary.findMany({ where: { lessonId: targetLesson.id } }),
          prisma.kanji.findMany({ where: { lessonId: targetLesson.id } }),
          prisma.particle.findMany({ where: { lessonId: targetLesson.id } }),
          prisma.grammar.findMany({ where: { lessonId: targetLesson.id } }),
          prisma.hiragana.findMany({ where: { lessonId: targetLesson.id } }),
        ])
      }
    } else {
      if (preset === 'comprehensive' || preset === 'kanji-vocab') {
        ;[rawVocab, rawKanji] = await Promise.all([
          prisma.vocabulary.findMany(),
          prisma.kanji.findMany(),
        ])
      }

      if (preset === 'comprehensive' || preset === 'grammar-particle') {
        ;[rawParticle, rawGrammar] = await Promise.all([
          prisma.particle.findMany(),
          prisma.grammar.findMany(),
        ])
      }

      if (preset === 'comprehensive') {
        ;[rawHira, rawKata] = await Promise.all([
          prisma.hiragana.findMany(),
          prisma.katakana.findMany(),
        ])
      }
    }

    // Build pool of all potential questions
    const pool: any[] = []

    rawVocab.forEach(v => {
      pool.push({
        id: v.id,
        front: v.kanji || v.kana,
        back: v.meaning || '',
        romaji: v.romaji || '',
        audioText: v.kana || v.word,
        materialType: 'vocabulary',
      })
    })

    rawKanji.forEach(k => {
      pool.push({
        id: k.id,
        front: k.character,
        back: k.meaning || k.romaji || '',
        romaji: k.romaji || '',
        audioText: k.hiragana || k.character,
        materialType: 'kanji',
      })
    })

    rawParticle.forEach(p => {
      pool.push({
        id: p.id,
        front: p.particle,
        back: p.meaning || p.reading || '',
        romaji: p.reading || '',
        audioText: p.example || p.particle,
        materialType: 'particle',
      })
    })

    rawGrammar.forEach(g => {
      pool.push({
        id: g.id,
        front: g.pattern,
        back: g.meaning || '',
        romaji: '',
        audioText: g.example || g.pattern,
        materialType: 'grammar',
      })
    })

    rawHira.forEach(h => {
      pool.push({
        id: h.id,
        front: h.character,
        back: h.romaji,
        romaji: h.romaji,
        audioText: h.character,
        materialType: 'hiragana',
      })
    })

    rawKata.forEach(k => {
      pool.push({
        id: k.id,
        front: k.character,
        back: k.romaji,
        romaji: k.romaji,
        audioText: k.character,
        materialType: 'katakana',
      })
    })

    if (pool.length === 0) {
      return NextResponse.json({ questions: [], title: 'Ujian' })
    }

    // Shuffle pool and slice target count
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5)
    const selectedQuestions = shuffledPool.slice(0, Math.min(totalTarget, shuffledPool.length))

    // For distractor generation, get a diverse set of candidate answers from global pool if local pool is small
    let distractorPool = pool
    if (distractorPool.length < 6) {
      const allVocab = await prisma.vocabulary.findMany({ select: { meaning: true } })
      distractorPool = allVocab.map(v => ({ back: v.meaning }))
    }

    // For each selected question, generate 4 options (1 correct + 3 wrong options)
    const formattedQuestions = selectedQuestions.map(q => {
      const wrongCandidates = distractorPool
        .filter(item => item.back && item.back !== q.back)
        .map(item => item.back)

      const uniqueWrong = Array.from(new Set(wrongCandidates))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)

      const allOptions = Array.from(new Set([...uniqueWrong, q.back])).sort(() => Math.random() - 0.5)

      return {
        ...q,
        options: allOptions,
      }
    })

    const titleMap: Record<string, string> = {
      comprehensive: 'Ujian Evaluasi Komprehensif (N5)',
      'grammar-particle': 'Ujian Spesialisasi Tata Bahasa & Partikel',
      'kanji-vocab': 'Ujian Spesialisasi Kanji & Kosakata',
      bab1: 'Ujian Evaluasi Bab 1 (Perkenalan & Dasar)',
      bab2: 'Ujian Evaluasi Bab 2 (Demonstratif & Benda)',
      bab3: 'Ujian Evaluasi Bab 3 (Tempat & Lokasi)',
      bab4: 'Ujian Evaluasi Bab 4 (Waktu & Kata Kerja)',
      bab5: 'Ujian Evaluasi Bab 5 (Gerak & Transportasi)',
    }

    return NextResponse.json({
      title: titleMap[preset] || `Ujian ${preset.toUpperCase()}`,
      preset,
      questions: formattedQuestions,
    })
  } catch (error) {
    console.error('Error fetching exam questions:', error)
    return NextResponse.json({ message: 'Gagal menyiapkan soal ujian.' }, { status: 500 })
  }
}
