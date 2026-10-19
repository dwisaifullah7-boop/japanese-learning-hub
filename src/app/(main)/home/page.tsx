import Link from 'next/link'
import { auth } from '@/lib/auth'
import { getUserStats } from '@/lib/progress'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { MaterialCard } from '@/components/shared/MaterialCard'
import { StatCard } from '@/components/shared/StatCard'
import { ProgressBar } from '@/components/shared/ProgressBar'
import {
  BookOpen,
  PenTool,
  Target,
  TrendingUp,
  Flame,
  Award,
  Sparkles,
  RotateCcw,
  FileCheck2,
  Search,
  ArrowRight
} from 'lucide-react'

export default async function HomePage() {
  const session = await auth()
  const userId = session?.user?.id

  let stats = {
    xp: 0,
    level: 1,
    levelTitle: 'Pemula',
    streakDays: 0,
    masteredCount: 0,
    learningCount: 0,
    reviewCount: 0,
    accuracyRate: 0,
  }

  let todayAttempts = 0
  const dailyTarget = 10

  if (userId) {
    try {
      stats = await getUserStats(userId)
      const todayStr = new Date().toISOString().split('T')[0]
      const attempts = await prisma.practiceAttempt.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 30,
      })
      todayAttempts = attempts.filter(
        a => new Date(a.createdAt).toISOString().split('T')[0] === todayStr
      ).length
    } catch (e) {
      console.error('Error fetching stats for home:', e)
    }
  }

  const dailyProgress = Math.min(100, Math.round((todayAttempts / dailyTarget) * 100))

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={session?.user?.name ? `Konnichiwa, ${session.user.name}! 🎌` : 'Home'}
        description="Selamat datang di Japanese Learning Hub. Terus tingkatkan kemampuan bahasa Jepangmu dengan tenang dan teratur."
        icon={<span>🎌</span>}
      />

      {/* Stats Summary Minimalis */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <StatCard
          label="Total XP"
          value={stats.xp.toString()}
          icon={<Award className="w-5 h-5" />}
        />
        <StatCard
          label={`Level ${stats.level} (${stats.levelTitle})`}
          value={`Lv. ${stats.level}`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          label="Streak Harian"
          value={`${stats.streakDays} Hari`}
          icon={<Flame className="w-5 h-5" />}
        />
      </div>

      {/* Daily Goal Card Bersih */}
      <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-zinc-400" />
            Target Latihan Hari Ini
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {todayAttempts} / {dailyTarget} Soal
          </span>
        </div>

        <ProgressBar value={dailyProgress} label="Progress Target Harian" color="blue" />

        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {dailyProgress >= 100
              ? 'Target latihan harianmu sudah tercapai hari ini.'
              : `Selesaikan ${dailyTarget - todayAttempts} soal lagi untuk mencapai target.`}
          </p>
          <Link
            href="/practice"
            className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            Latihan Sekarang <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Learning Hub Portals */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          Navigasi Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <Link href="/learn">
            <MaterialCard
              title="Learn Hub"
              description="Pelajari Hiragana, Katakana, Kanji, Kosakata, Partikel, & Grammar Minna no Nihongo."
              icon={<BookOpen className="w-5 h-5" />}
            />
          </Link>
          <Link href="/practice">
            <MaterialCard
              title="Practice Hub"
              description="Flashcard, Pilihan Ganda, Type Answer, dan Audio Quiz interaktif."
              icon={<PenTool className="w-5 h-5" />}
            />
          </Link>
          <Link href="/practice/review">
            <MaterialCard
              title={`Review Lemah (${stats.reviewCount})`}
              description="Ulangi materi yang perlu diperkuat agar naik ke status Mastered."
              icon={<RotateCcw className="w-5 h-5" />}
            />
          </Link>
          <Link href="/exam">
            <MaterialCard
              title="Ujian Evaluasi (Exam)"
              description="Uji kemampuan komprehensif berbatas waktu dengan passing grade 70%."
              icon={<FileCheck2 className="w-5 h-5" />}
            />
          </Link>
          <Link href="/mastery">
            <MaterialCard
              title={`Mastery (${stats.masteredCount} Dikuasai)`}
              description="Pantau tingkat penguasaan setiap materi secara mendalam."
              icon={<Target className="w-5 h-5" />}
            />
          </Link>
          <Link href="/search">
            <MaterialCard
              title="Kamus & Pencarian"
              description="Cari kosakata, kanji, atau grammar secara instan di database & web."
              icon={<Search className="w-5 h-5" />}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
