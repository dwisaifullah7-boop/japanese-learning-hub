import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface Recommendation {
  type: 'weak_material' | 'new_material' | 'practice_suggestion'
  title: string
  description: string
  href: string
  priority: number
  icon: string
  category: string
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const recommendations: Recommendation[] = []

    // 1. Check for weak materials (REVIEW status) — highest priority
    const weakMaterials = await prisma.mastery.findMany({
      where: { userId, level: 'REVIEW' },
      orderBy: { lastAttemptAt: 'asc' },
      take: 5,
    })

    if (weakMaterials.length > 0) {
      recommendations.push({
        type: 'weak_material',
        title: `${weakMaterials.length} Materi Perlu Diulang`,
        description: 'Kamu punya materi dengan tingkat kesalahan tinggi. Review sekarang untuk memperkuat hafalan!',
        href: '/practice/review',
        priority: 1,
        icon: '🔴',
        category: 'Review',
      })
    }

    // 2. Check for LEARNING materials — need more practice
    const learningMaterials = await prisma.mastery.findMany({
      where: { userId, level: 'LEARNING' },
      take: 5,
    })

    if (learningMaterials.length > 0) {
      recommendations.push({
        type: 'practice_suggestion',
        title: `${learningMaterials.length} Materi Sedang Dipelajari`,
        description: 'Lanjutkan latihan untuk menaikkan status materi dari Learning ke Mastered.',
        href: '/practice/review',
        priority: 2,
        icon: '🟡',
        category: 'Latihan',
      })
    }

    // 3. Check accuracy per category
    const categories = ['hiragana', 'katakana', 'vocabulary', 'particle', 'grammar', 'kanji']
    const categoryLabels: Record<string, string> = {
      hiragana: 'Hiragana',
      katakana: 'Katakana',
      vocabulary: 'Kosakata',
      particle: 'Partikel',
      grammar: 'Grammar',
      kanji: 'Kanji',
    }
    const categoryLinks: Record<string, string> = {
      hiragana: '/learn/hiragana',
      katakana: '/learn/katakana',
      vocabulary: '/learn/vocabulary',
      particle: '/learn/particle',
      grammar: '/learn/grammar',
      kanji: '/learn/kanji',
    }

    for (const cat of categories) {
      const attempts = await prisma.practiceAttempt.findMany({
        where: { userId, materialType: cat },
        take: 20,
        orderBy: { createdAt: 'desc' },
      })

      if (attempts.length >= 5) {
        const correct = attempts.filter(a => a.isCorrect).length
        const accuracy = Math.round((correct / attempts.length) * 100)

        if (accuracy < 60) {
          recommendations.push({
            type: 'practice_suggestion',
            title: `Akurasi ${categoryLabels[cat]} Rendah (${accuracy}%)`,
            description: `Tingkatkan pemahaman ${categoryLabels[cat]} dengan latihan tambahan.`,
            href: `/practice/multiple-choice?type=${cat}`,
            priority: 3,
            icon: '📊',
            category: categoryLabels[cat],
          })
        }
      }
    }

    // 4. Check for untouched categories
    for (const cat of categories) {
      const count = await prisma.practiceAttempt.count({
        where: { userId, materialType: cat },
      })

      if (count === 0) {
        recommendations.push({
          type: 'new_material',
          title: `Mulai Belajar ${categoryLabels[cat]}`,
          description: `Kamu belum pernah mempelajari ${categoryLabels[cat]}. Ayo mulai!`,
          href: categoryLinks[cat],
          priority: 4,
          icon: '🆕',
          category: categoryLabels[cat],
        })
      }
    }

    // Sort by priority
    recommendations.sort((a, b) => a.priority - b.priority)

    return NextResponse.json({ recommendations: recommendations.slice(0, 6) })
  } catch (error) {
    console.error('Recommendation Error:', error)
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }
}
