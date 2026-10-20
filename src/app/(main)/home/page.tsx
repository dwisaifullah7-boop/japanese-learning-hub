import Link from 'next/link'
import { auth } from '@/lib/auth'
import { getUserStats } from '@/lib/progress'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { MaterialCard } from '@/components/shared/MaterialCard'
import { StatCard } from '@/components/shared/StatCard'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { Button } from '@/components/ui/button'
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
  ArrowRight,
  Compass,
  Zap,
  CheckCircle2
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

  // Ambil daftar kurikulum bab untuk menentukan rekomendasi langkah berikutnya
  const lessons = await prisma.lesson.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, title: true, order: true, description: true },
  })

  let currentLessonIndex = 0

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

      // Hitung rekomendasi bab berdasarkan jumlah materi yang sudah dikuasai
      currentLessonIndex = Math.min(
        lessons.length - 1,
        Math.floor(stats.masteredCount / 8)
      )
    } catch (e) {
      console.error('Error fetching stats for home:', e)
    }
  }

  const currentLesson = lessons[currentLessonIndex] || lessons[0]
  const dailyProgress = Math.min(100, Math.round((todayAttempts / dailyTarget) * 100))

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={session?.user?.name ? `Konnichiwa, ${session.user.name}! 🎌` : 'Home'}
        description="Selamat datang di Japanese Learning Hub. Belajar lebih terarah, efisien, dan menyenangkan."
        icon={<span>🎌</span>}
      />

      {/* 🧭 JALUR BELAJAR TERPANDU (Next Step Hero Card) */}
      {currentLesson && (
        <div className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 via-white to-zinc-50/50 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-900/50 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <Compass className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Langkah Belajar Kamu Saat Ini
              </span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Rekomendasi Terarah
            </span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {currentLesson.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {currentLesson.description ||
                'Pelajari kosakata, pola tata bahasa, dan partikel penting di bab ini dengan rangkuman cepat atau flashcard.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link href={`/learn/lesson/${currentLesson.id}`}>
              <Button className="rounded-xl px-5 py-5 font-semibold text-sm flex items-center gap-2 shadow-xs cursor-pointer">
                <span>Pelajari Materi Bab {currentLesson.order}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link
              href={`/practice/multiple-choice?type=vocabulary&babStart=${currentLesson.order}&babEnd=${currentLesson.order}`}
            >
              <Button
                variant="outline"
                className="rounded-xl px-4 py-5 text-sm font-semibold border-zinc-300 dark:border-zinc-700 cursor-pointer"
              >
                <PenTool className="w-4 h-4 mr-1.5 text-zinc-500" />
                Latihan Soal Bab Ini
              </Button>
            </Link>

            <Link href="/practice/multiple-choice?type=vocabulary">
              <Button
                variant="ghost"
                className="rounded-xl px-3 py-5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Kuis Kilat 2 Menit
              </Button>
            </Link>
          </div>
        </div>
      )}

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

      {/* PENGINGAT SPACIALLY REPEATED REVIEW JIKA ADA WEAK ITEMS */}
      {stats.reviewCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 rounded-xl text-amber-700 dark:text-amber-300 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Kaji Ulang Pintar: {stats.reviewCount} materi hampir kamu lupakan
              </h3>
              <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                Ulangi sekarang selama 2 menit agar materi tersimpan kuat di memori jangka panjang.
              </p>
            </div>
          </div>
          <Link href="/practice/review" className="shrink-0 w-full sm:w-auto">
            <Button
              size="sm"
              className="w-full sm:w-auto rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-4"
            >
              Kaji Ulang Sekarang
            </Button>
          </Link>
        </div>
      )}

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
              ? 'Target latihan harianmu sudah tercapai hari ini. Hebat!'
              : `Selesaikan ${dailyTarget - todayAttempts} soal lagi untuk mencapai target.`}
          </p>
          <Link
            href="/practice"
            className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            Pusat Latihan <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Learning Hub Portals */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          Modul & Navigasi Utama
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <Link href="/learn">
            <MaterialCard
              title="Learn Hub"
              description="Pelajari 25 Bab Minna no Nihongo, 12 panduan khusus, dan materi dasar."
              icon={<BookOpen className="w-5 h-5" />}
            />
          </Link>
          <Link href="/practice">
            <MaterialCard
              title="Practice Hub (3 Tingkatan)"
              description="Latihan dengan tingkatan Pemula, Menengah, atau Lanjutan sesuai kemampuan."
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
