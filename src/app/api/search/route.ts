import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export interface SearchResultItem {
  id: string
  type: 'vocabulary' | 'kanji' | 'particle' | 'grammar' | 'hiragana' | 'katakana'
  title: string
  japanese: string
  romaji: string
  meaning: string
  details?: string
  example?: string
  audioText: string
  href: string
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q')?.trim() || ''
    const category = searchParams.get('category') || 'all'

    if (!query) {
      return NextResponse.json({ results: [], total: 0 })
    }

    const qLower = query.toLowerCase()

    const searchVocab = category === 'all' || category === 'vocabulary'
    const searchKanji = category === 'all' || category === 'kanji'
    const searchParticle = category === 'all' || category === 'particle'
    const searchGrammar = category === 'all' || category === 'grammar'
    const searchHiragana = category === 'all' || category === 'hiragana' || category === 'kana'
    const searchKatakana = category === 'all' || category === 'katakana' || category === 'kana'

    const [vocabList, kanjiList, particleList, grammarList, hiraList, kataList] = await Promise.all([
      searchVocab
        ? prisma.vocabulary.findMany({
            where: {
              OR: [
                { word: { contains: query } },
                { kanji: { contains: query } },
                { kana: { contains: query } },
                { romaji: { contains: qLower } },
                { meaning: { contains: qLower } },
              ],
            },
            take: 15,
          })
        : [],

      searchKanji
        ? prisma.kanji.findMany({
            where: {
              OR: [
                { character: { contains: query } },
                { hiragana: { contains: query } },
                { romaji: { contains: qLower } },
                { meaning: { contains: qLower } },
                { onyomi: { contains: query } },
                { kunyomi: { contains: query } },
              ],
            },
            take: 15,
          })
        : [],

      searchParticle
        ? prisma.particle.findMany({
            where: {
              OR: [
                { particle: { contains: query } },
                { reading: { contains: qLower } },
                { meaning: { contains: qLower } },
                { function: { contains: qLower } },
                { pattern: { contains: query } },
              ],
            },
            take: 15,
          })
        : [],

      searchGrammar
        ? prisma.grammar.findMany({
            where: {
              OR: [
                { pattern: { contains: query } },
                { meaning: { contains: qLower } },
                { usage: { contains: qLower } },
                { example: { contains: query } },
              ],
            },
            take: 15,
          })
        : [],

      searchHiragana
        ? prisma.hiragana.findMany({
            where: {
              OR: [
                { character: { contains: query } },
                { romaji: { contains: qLower } },
                { example: { contains: query } },
              ],
            },
            take: 15,
          })
        : [],

      searchKatakana
        ? prisma.katakana.findMany({
            where: {
              OR: [
                { character: { contains: query } },
                { romaji: { contains: qLower } },
                { example: { contains: query } },
              ],
            },
            take: 15,
          })
        : [],
    ])

    const results: SearchResultItem[] = []

    vocabList.forEach(v => {
      results.push({
        id: v.id,
        type: 'vocabulary',
        title: v.kanji || v.word || v.kana || '',
        japanese: v.kanji ? `${v.kanji} (${v.kana})` : v.kana || v.word,
        romaji: v.romaji || '',
        meaning: v.meaning || '',
        details: v.wordType ? `Tipe: ${v.wordType}` : undefined,
        audioText: v.kana || v.word,
        href: `/learn/vocabulary`,
      })
    })

    kanjiList.forEach(k => {
      results.push({
        id: k.id,
        type: 'kanji',
        title: k.character,
        japanese: `${k.character}${k.hiragana ? ` (${k.hiragana})` : ''}`,
        romaji: k.romaji || '',
        meaning: k.meaning || '',
        details: [
          k.onyomi ? `Onyomi: ${k.onyomi}` : null,
          k.kunyomi ? `Kunyomi: ${k.kunyomi}` : null,
          k.jlptLevel ? `JLPT: ${k.jlptLevel}` : null,
        ]
          .filter(Boolean)
          .join(' | '),
        audioText: k.hiragana || k.character,
        href: `/learn/kanji`,
      })
    })

    particleList.forEach(p => {
      results.push({
        id: p.id,
        type: 'particle',
        title: p.particle,
        japanese: p.particle,
        romaji: p.reading || '',
        meaning: p.meaning || '',
        details: p.function ? `Fungsi: ${p.function}` : undefined,
        example: p.example ? `${p.example}${p.translation ? ` (${p.translation})` : ''}` : undefined,
        audioText: p.example || p.particle,
        href: `/learn/particle`,
      })
    })

    grammarList.forEach(g => {
      results.push({
        id: g.id,
        type: 'grammar',
        title: g.pattern,
        japanese: g.pattern,
        romaji: '',
        meaning: g.meaning || '',
        details: g.usage ? `Penggunaan: ${g.usage}` : undefined,
        example: g.example ? `${g.example}${g.translation ? ` (${g.translation})` : ''}` : undefined,
        audioText: g.example || g.pattern,
        href: `/learn/grammar`,
      })
    })

    hiraList.forEach(h => {
      results.push({
        id: h.id,
        type: 'hiragana',
        title: h.character,
        japanese: h.character,
        romaji: h.romaji,
        meaning: `Karakter Hiragana "${h.romaji}"`,
        example: h.example || undefined,
        audioText: h.character,
        href: `/learn/hiragana`,
      })
    })

    kataList.forEach(k => {
      results.push({
        id: k.id,
        type: 'katakana',
        title: k.character,
        japanese: k.character,
        romaji: k.romaji,
        meaning: `Karakter Katakana "${k.romaji}"`,
        example: k.example || undefined,
        audioText: k.character,
        href: `/learn/katakana`,
      })
    })

    return NextResponse.json({
      query,
      category,
      results,
      total: results.length,
    })
  } catch (error) {
    console.error('Local Search Error:', error)
    return NextResponse.json({ message: 'Gagal melakukan pencarian.' }, { status: 500 })
  }
}
