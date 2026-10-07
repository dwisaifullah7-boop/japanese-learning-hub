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
    <div className="space-y-10">
      <PageHeader
        title="Dashboard Utama"
        description="Pusat kontrol pembelajaran, statistik harian, dan rekomendasi aktivitas Anda."
        icon={<LayoutDashboard className="w-8 h-8" />}
      />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Japanese Learning Hub
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Selamat Datang, {session.user.name || 'Pelajar'}! 🎌
          </h2>
          <p className="text-sm text-gray-300">
            Status Anda saat ini: <strong className="text-blue-300">{stats.levelTitle}</strong> (Level {stats.level}).
            Terus pertahankan konsistensi belajarmu!
          </p>
        </div>

        {/* Daily Streak Card */}
        <div className="z-10 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 flex items-center gap-4 shrink-0">
          <Flame className="w-10 h-10 text-orange-400 animate-bounce" />
          <div>
            <p className="text-xs text-blue-200 font-semibold uppercase">Streak Harian</p>
            <p className="text-3xl font-black">{stats.streakDays} Hari</p>
          </div>
        </div>
      </div>

      {/* Quick Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total XP</p>
            <p className="text-2xl font-bold text-gray-900">{stats.xp}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Level Pembelajar</p>
            <p className="text-2xl font-bold text-gray-900">Level {stats.level}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Materi Dikuasai</p>
            <p className="text-2xl font-bold text-gray-900">{stats.masteredCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Akurasi Latihan</p>
            <p className="text-2xl font-bold text-gray-900">{stats.accuracyRate}%</p>
          </div>
        </div>
      </div>

      {/* Daily Target Widget & Recommended Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Goal Widget */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 lg:col-span-1">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Target Latihan Hari Ini
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-gray-600">
              <span>{todayAttempts} dari {dailyTarget} Soal</span>
              <span>{dailyProgress}%</span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${dailyProgress}%` }}
              />
            </div>

            <p className="text-xs text-gray-500 pt-1">
              {dailyProgress >= 100
                ? '🎉 Luar biasa! Target harian Anda telah tercapai.'
                : `Selesaikan ${dailyTarget - todayAttempts} soal lagi untuk memenuhi target harian.`}
            </p>
          </div>

          <Link href="/practice" className="block pt-2">
            <Button className="w-full gap-2">
              Latihan Sekarang <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Action Cards Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Rekomendasi Langkah Berikutnya
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/learn" className="block group">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all space-y-2">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Modul Belajar (Learn)
                </h4>
                <p className="text-xs text-gray-500">
                  Pelajari Minna no Nihongo Bab 1, Kanji, Hiragana, Katakana, & Partikel.
                </p>
              </div>
            </Link>

            <Link href="/practice/review" className="block group">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all space-y-2">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit group-hover:scale-110 transition-transform">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                  Review Weak Material ({stats.reviewCount})
                </h4>
                <p className="text-xs text-gray-500">
                  Ulangi materi yang sering salah agar statusnya naik menjadi Mastered.
                </p>
              </div>
            </Link>

            <Link href="/exam" className="block group">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-purple-400 hover:shadow-md transition-all space-y-2">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Ujian Evaluasi (Exam)
                </h4>
                <p className="text-xs text-gray-500">
                  Uji kemampuan Anda dalam ujian berbatas waktu denganPassing Score 70%.
                </p>
              </div>
            </Link>

            <Link href="/search" className="block group">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all space-y-2">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Kamus & Pencarian
                </h4>
                <p className="text-xs text-gray-500">
                  Cari kata, kanji, atau grammar secara instan di database lokal & web.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Smart Recommendation Widget */}
      <RecommendationWidget />

      {/* Recent Activity Feed */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
          <Clock className="w-5 h-5 text-blue-600" />
          Aktivitas Latihan & Ujian Terakhir
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
