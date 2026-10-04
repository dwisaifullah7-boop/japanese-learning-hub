import { prisma } from '@/lib/prisma'

export type MasteryLevel = 'NEW' | 'LEARNING' | 'REVIEW' | 'MASTERED'

/**
 * Hitung level mastery berdasarkan correctCount dan attemptCount.
 * - MASTERED  : >= 5 attempts & accuracy >= 80%
 * - REVIEW    : >= 3 attempts & accuracy >= 50%
 * - LEARNING  : sudah ada attempt
 * - NEW       : belum pernah dicoba
 */
export function calculateLevel(correctCount: number, attemptCount: number): MasteryLevel {
  if (attemptCount === 0) return 'NEW'
  const accuracy = correctCount / attemptCount
  if (attemptCount >= 5 && accuracy >= 0.8) return 'MASTERED'
  if (attemptCount >= 3 && accuracy >= 0.5) return 'REVIEW'
  return 'LEARNING'
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
  // Cari record yang ada atau buat baru
  const existing = await prisma.mastery.findUnique({
    where: { userId_materialType_materialId: { userId, materialType, materialId } },
  })

  const correctCount = (existing?.correctCount ?? 0) + (isCorrect ? 1 : 0)
  const attemptCount = (existing?.attemptCount ?? 0) + 1
  const level = calculateLevel(correctCount, attemptCount)

  await prisma.mastery.upsert({
    where: { userId_materialType_materialId: { userId, materialType, materialId } },
    update: { correctCount, attemptCount, level, lastAttemptAt: new Date() },
    create: { userId, materialType, materialId, correctCount, attemptCount, level },
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
 * Ambil daftar materi "lemah" (level LEARNING / REVIEW dengan accuracy < 60%).
 * Limit 20 teratas (urut dari accuracy terendah).
 */
export async function getWeakMaterials(userId: string, limit = 20) {
  const records = await prisma.mastery.findMany({
    where: {
      userId,
      level: { in: ['LEARNING', 'REVIEW'] },
    },
    orderBy: { lastAttemptAt: 'desc' },
  })

  // Hitung accuracy & filter yang < 60%
  const weak = records
    .map(r => ({
      ...r,
      accuracy: r.attemptCount > 0 ? r.correctCount / r.attemptCount : 0,
    }))
    .filter(r => r.accuracy < 0.6)
    .sort((a, b) => a.accuracy - b.accuracy) // terlemah dulu
    .slice(0, limit)

  return weak
}
