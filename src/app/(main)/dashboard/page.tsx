import { auth } from '@/lib/auth'
import { RecommendationWidget } from '@/components/dashboard/RecommendationWidget'
import { redirect } from 'next/navigation'
import { getUserStats } from '@/lib/progress'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Zap,
  Flame,
  Award,
  BookOpen,
  RotateCcw,
  Search,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const [stats, recentAttempts, recentExams] = await Promise.all([
    getUserStats(session.user.id),
    prisma.practiceAttempt.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.examResult.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
  ])

  // Calculate daily goal (e.g. 10 questions today)
  const todayStr = new Date().toISOString().split('T')[0]
  const todayAttempts = recentAttempts.filter(
    a => new Date(a.createdAt).toISOString().split('T')[0] === todayStr
  ).length
  const dailyTarget = 10
  const dailyProgress = Math.min(100, Math.round((todayAttempts / dailyTarget) * 100))

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <PageHeader
        title="Dashboard Pembelajaran"
        description="Ringkasan aktivitas, statistik penguasaan materi, dan target harian Anda."
        icon={<LayoutDashboard className="w-8 h-8 text-zinc-900 dark:text-zinc-100" />}
      />

      {/* Welcome Banner Minimalis */}
      <div className="bg-zinc-900 dark:bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-semibold">
            <span>🎌</span> Minna no Nihongo (JLPT N5)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang, {session.user.name || 'Pelajar'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Status: <strong className="text-white">{stats.levelTitle}</strong> (Level {stats.level}) • Konsistensi adalah kunci utama penguasaan bahasa.
          </p>
        </div>

        {/* Daily Streak Card */}
        <div className="z-10 bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10 flex items-center gap-3.5 shrink-0">
          <Flame className="w-8 h-8 text-amber-400" />
          <div>
            <p className="text-[11px] text-zinc-400 font-semibold uppercase">Streak Harian</p>
            <p className="text-2xl font-bold text-white">{stats.streakDays} Hari</p>
          </div>
        </div>
      </div>

      {/* Quick Metrics Row Minimalis */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Total XP</p>
            <p className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{stats.xp}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Level Pembelajar</p>
            <p className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">Level {stats.level}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Materi Dikuasai</p>
            <p className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{stats.masteredCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Akurasi Latihan</p>
            <p className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{stats.accuracyRate}%</p>
          </div>
        </div>
      </div>

      {/* Daily Target Widget & Recommended Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Goal Widget */}
        <div className="bg-white dark:bg-zinc-900 p-5 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4 lg:col-span-1">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            Target Latihan Hari Ini
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <span>{todayAttempts} dari {dailyTarget} Soal</span>
              <span>{dailyProgress}%</span>
            </div>

            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5">
              <div
                className="bg-zinc-900 dark:bg-zinc-100 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${dailyProgress}%` }}
              />
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              {dailyProgress >= 100
                ? 'Target harian Anda telah tercapai hari ini.'
                : `Selesaikan ${dailyTarget - todayAttempts} soal lagi untuk memenuhi target.`}
            </p>
          </div>

          <Link href="/practice" className="block pt-2">
            <Button className="w-full gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900">
              Latihan Sekarang <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Action Cards Grid Minimalis */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-zinc-400" />
            Rekomendasi Langkah Belajar
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Link href="/learn" className="block group">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all space-y-2">
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Modul Belajar (Learn)
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  25 Bab Minna no Nihongo (JLPT N5), 175 Kanji, dan 12 Panduan Interaktif.
                </p>
              </div>
            </Link>

            <Link href="/practice/review" className="block group">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all space-y-2">
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Review Materi Lemah ({stats.reviewCount})
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Ulangi materi akurasi rendah agar statusnya naik menjadi Mastered.
                </p>
              </div>
            </Link>

            <Link href="/exam" className="block group">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all space-y-2">
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Ujian Evaluasi (Exam)
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Uji kemampuan dalam sesi ujian berbatas waktu dengan Passing Score 70%.
                </p>
              </div>
            </Link>

            <Link href="/search" className="block group">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all space-y-2">
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Kamus & Pencarian
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Cari kata, kanji, atau tata bahasa instan di database lokal & web.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Smart Recommendation Widget */}
      <RecommendationWidget />

      {/* Recent Activity Feed */}
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Clock className="w-4 h-4 text-zinc-400" />
          Aktivitas Terakhir
        </h3>

        {recentAttempts.length === 0 && recentExams.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            Belum ada aktivitas. Mulai belajar atau berlatih untuk melihat riwayat aktivitas di sini.
          </p>
        ) : (
          <div className="space-y-3">
            {recentExams.map(ex => (
              <div
                key={ex.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-purple-100 bg-purple-50/50 text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{ex.title}</p>
                    <p className="text-xs text-gray-500">
                      Nilai: {ex.percentage}% ({ex.score}/{ex.totalQuestions} Benar)
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    ex.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {ex.passed ? 'LULUS 🎉' : 'GAGAL ❌'}
                </span>
              </div>
            ))}

            {recentAttempts.map(att => (
              <div
                key={att.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 text-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      att.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {att.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded mr-2">
                      {att.materialType}
                    </span>
                    <span className="font-medium text-gray-800">
                      Latihan {att.materialType} (ID: {att.materialId.slice(0, 8)}…)
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(att.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
