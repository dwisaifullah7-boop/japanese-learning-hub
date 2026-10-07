import { prisma } from '@/lib/prisma'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number // 0 to 100
}

export interface UserStats {
  xp: number
  level: number
  levelTitle: string
  xpNextLevel: number
  xpCurrentLevelProgress: number // 0 to 100
  streakDays: number
  totalAttempts: number
  correctAttempts: number
  accuracyRate: number
  masteredCount: number
  reviewCount: number
  learningCount: number
  totalExamTaken: number
  passedExamCount: number
  achievements: Achievement[]
}

export async function getUserStats(userId: string): Promise<UserStats> {
  const [attempts, masteries, examResults] = await Promise.all([
    prisma.practiceAttempt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.mastery.findMany({
      where: { userId },
    }),
    prisma.examResult.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  // 1. Calculate XP: 10 XP per practice attempt + bonus for correct answers + exam score XP
  const practiceXP = attempts.reduce((acc, curr) => acc + (curr.isCorrect ? 15 : 5), 0)
  const examXP = examResults.reduce((acc, curr) => acc + curr.score * 20, 0)
  const totalXP = practiceXP + examXP

  // 2. Calculate Level (Every 100 XP is 1 level)
  const level = Math.floor(totalXP / 100) + 1
  const xpInCurrentLevel = totalXP % 100
  const xpCurrentLevelProgress = Math.min(100, Math.round(xpInCurrentLevel))

  const levelTitles: Record<number, string> = {
    1: 'Pemula (初学者)',
    2: 'Pembelajar Dasar (基礎)',
    3: 'Peminat Jepang (愛好家)',
    4: 'Penguasai Kata (単語王)',
    5: 'Ahli Partikel (助詞名人)',
    6: 'Pakar Tata Bahasa (文法家)',
    7: 'Master Kanji (漢字マスター)',
    8: 'Pahlawan Ujian (試験の英雄)',
    9: 'Mahir N5 (JLPT N5達人)',
    10: 'Legenda Bahasa (伝説)',
  }
  const levelTitle = levelTitles[Math.min(10, level)] || 'Master Bahasa Jepang (達人)'

  // 3. Calculate Streak Days (consecutive active calendar days)
  let streakDays = 0
  if (attempts.length > 0 || examResults.length > 0) {
    const activeDates = new Set<string>()
    attempts.forEach(a => activeDates.add(new Date(a.createdAt).toISOString().split('T')[0]))
    examResults.forEach(e => activeDates.add(new Date(e.createdAt).toISOString().split('T')[0]))

    const sortedDates = Array.from(activeDates).sort().reverse()
    const todayStr = new Date().toISOString().split('T')[0]
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (sortedDates.includes(todayStr) || sortedDates.includes(yesterdayStr)) {
      streakDays = 1
      let checkDate = new Date(sortedDates[0])

      for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i])
        const diffTime = Math.abs(checkDate.getTime() - prevDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) {
          streakDays++
          checkDate = prevDate
        } else {
          break
        }
      }
    }
  }

  // 4. Counts & Accuracy
  const totalAttempts = attempts.length
  const correctAttempts = attempts.filter(a => a.isCorrect).length
  const accuracyRate = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0

  const masteredCount = masteries.filter(m => m.level === 'MASTERED').length
  const reviewCount = masteries.filter(m => m.level === 'REVIEW').length
  const learningCount = masteries.filter(m => m.level === 'LEARNING').length

  const totalExamTaken = examResults.length
  const passedExamCount = examResults.filter(e => e.passed).length

  // 5. Achievements List
  const achievements: Achievement[] = [
    {
      id: 'first_step',
      title: 'Langkah Pertama (第一歩)',
      description: 'Selesaikan sesi latihan pertama Anda.',
      icon: '🚀',
      unlocked: totalAttempts >= 1,
      progress: Math.min(100, Math.round((totalAttempts / 1) * 100)),
    },
    {
      id: 'streak_3',
      title: 'Semangat Konsisten (継続)',
      description: 'Capai 3 hari streak belajar berturut-turut.',
      icon: '🔥',
      unlocked: streakDays >= 3,
      progress: Math.min(100, Math.round((streakDays / 3) * 100)),
    },
    {
      id: 'exam_hero',
      title: 'Pahlawan Ujian (合格者)',
      description: 'Lulus ujian evaluasi pertama Anda dengan nilai minimal 70%.',
      icon: '🎓',
      unlocked: passedExamCount >= 1,
      progress: Math.min(100, Math.round((passedExamCount / 1) * 100)),
    },
    {
      id: 'mastery_5',
      title: 'Penguasa Materi (マスター)',
      description: 'Kuasai (MASTERED) minimal 5 materi pembelajaran.',
      icon: '🧠',
      unlocked: masteredCount >= 5,
      progress: Math.min(100, Math.round((masteredCount / 5) * 100)),
    },
    {
      id: 'xp_500',
      title: 'Kolektor XP (XPコレクター)',
      description: 'Kumpulkan total 500 XP dari latihan & ujian.',
      icon: '🏆',
      unlocked: totalXP >= 500,
      progress: Math.min(100, Math.round((totalXP / 500) * 100)),
    },
  ]

  return {
    xp: totalXP,
    level,
    levelTitle,
    xpNextLevel: 100,
    xpCurrentLevelProgress,
    streakDays,
    totalAttempts,
    correctAttempts,
    accuracyRate,
    masteredCount,
    reviewCount,
    learningCount,
    totalExamTaken,
    passedExamCount,
    achievements,
  }
}
