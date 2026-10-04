import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // 1. Ambil data mastery user dengan status REVIEW atau LEARNING
    const records = await prisma.mastery.findMany({
      where: {
        userId: session.user.id,
        level: {
          in: ['REVIEW', 'LEARNING'],
        },
      },
      orderBy: {
        lastAttemptAt: 'asc', // Prioritaskan yang paling lama tidak disentuh
      },
      take: 20, // Batasi 20 materi per sesi review agar efektif
    })

    if (records.length === 0) {
      return NextResponse.json({ questions: [], summary: { total: 0, weak: 0, learning: 0 } })
    }

    // 2. Ringkasan data review
    const summary = {
      total: records.length,
      weak: records.filter(r => r.level === 'REVIEW').length,
      learning: records.filter(r => r.level === 'LEARNING').length,
    }

    // 3. Ambil detail materi untuk semua 6 tipe materi
    const questions = []
    for (const record of records) {
      let q: any = null

      if (record.materialType === 'vocabulary') {
        q = await prisma.vocabulary.findUnique({ where: { id: record.materialId } })
        if (q) {
          questions.push({
            id: q.id,
            front: q.kanji || q.kana,
            back: q.meaning || '',
            romaji: q.romaji || '',
            audioText: q.kana || q.word,
            materialType: 'vocabulary',
          })
        }
      } else if (record.materialType === 'hiragana') {
        q = await prisma.hiragana.findUnique({ where: { id: record.materialId } })
        if (q) {
          questions.push({
            id: q.id,
            front: q.character,
            back: q.romaji,
            romaji: q.romaji,
            audioText: q.character,
            materialType: 'hiragana',
          })
        }
      } else if (record.materialType === 'katakana') {
        q = await prisma.katakana.findUnique({ where: { id: record.materialId } })
        if (q) {
          questions.push({
            id: q.id,
            front: q.character,
            back: q.romaji,
            romaji: q.romaji,
            audioText: q.character,
            materialType: 'katakana',
          })
        }
      } else if (record.materialType === 'kanji') {
        q = await prisma.kanji.findUnique({ where: { id: record.materialId } })
        if (q) {
          questions.push({
            id: q.id,
            front: q.character,
            back: q.meaning || q.romaji || '',
            romaji: q.romaji || '',
            audioText: q.hiragana || q.character,
            materialType: 'kanji',
          })
        }
      } else if (record.materialType === 'particle') {
        q = await prisma.particle.findUnique({ where: { id: record.materialId } })
        if (q) {
          questions.push({
            id: q.id,
            front: q.particle,
            back: q.meaning || q.reading || '',
            romaji: q.reading || '',
            audioText: q.example || q.particle,
            materialType: 'particle',
          })
        }
      } else if (record.materialType === 'grammar') {
        q = await prisma.grammar.findUnique({ where: { id: record.materialId } })
        if (q) {
          questions.push({
            id: q.id,
            front: q.pattern,
            back: q.meaning || '',
            romaji: '',
            audioText: q.example || q.pattern,
            materialType: 'grammar',
          })
        }
      }
    }

    return NextResponse.json({ questions, summary })
  } catch (error) {
    console.error("Review Fetch Error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
