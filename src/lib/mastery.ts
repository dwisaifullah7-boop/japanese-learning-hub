import { prisma } from '@/lib/prisma'

export type MasteryLevel = 'NEW' | 'LEARNING' | 'REVIEW' | 'MASTERED'

/**
 * Hitung level mastery:
 * - MASTERED : jika benar >= 3 dan salah == 0
 * - REVIEW   : jika salah > benar (Weak Material)
 * - LEARNING : selain itu (pernah dicoba)
 */
export function calculateLevel(correctCount: number, wrongCount: number): MasteryLevel {
  if (correctCount >= 3 && wrongCount === 0) {
    return 'MASTERED'
  } else if (wrongCount > correctCount) {
    return 'REVIEW'
  } else {
    return 'LEARNING'
  }
}

/**
 * Upsert mastery record setelah attempt.
 * Dipanggil dari API route attempt setelah menyimpan PracticeAttempt.
 */
export async function updateMastery(
  userId: string,
  materialType: string,
  materialId: string,
  isCorrect: boolean
) {
  const existing = await prisma.mastery.findUnique({
    where: { userId_materialType_materialId: { userId, materialType, materialId } },
  })

  const correctCount = (existing?.correctCount ?? 0) + (isCorrect ? 1 : 0)
  const wrongCount = (existing?.wrongCount ?? 0) + (!isCorrect ? 1 : 0)
  const attemptCount = (existing?.attemptCount ?? 0) + 1
  const level = calculateLevel(correctCount, wrongCount)

  await prisma.mastery.upsert({
    where: { userId_materialType_materialId: { userId, materialType, materialId } },
    update: { correctCount, wrongCount, attemptCount, level, lastAttemptAt: new Date() },
    create: { userId, materialType, materialId, correctCount, wrongCount, attemptCount, level },
  })
}

/**
 * Ambil ringkasan mastery untuk satu user (jumlah per level).
 */
export async function getMasterySummary(userId: string) {
  const all = await prisma.mastery.findMany({ where: { userId } })
  return {
    NEW:      all.filter(m => m.level === 'NEW').length,
    LEARNING: all.filter(m => m.level === 'LEARNING').length,
    REVIEW:   all.filter(m => m.level === 'REVIEW').length,
    MASTERED: all.filter(m => m.level === 'MASTERED').length,
    total:    all.length,
  }
}

/**
 * Ambil daftar materi "lemah" (level REVIEW atau wrongCount > correctCount).
 */
export async function getWeakMaterials(userId: string, limit = 20) {
  const records = await prisma.mastery.findMany({
    where: {
      userId,
      level: 'REVIEW',
    },
    orderBy: { lastAttemptAt: 'desc' },
    take: limit,
  })

  return records.map(r => ({
    ...r,
    accuracy: r.attemptCount > 0 ? r.correctCount / r.attemptCount : 0,
  }))
}
