import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUserStats } from '@/lib/progress'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
import { BarChart3, Zap, Flame, Award, CheckCircle2, RotateCcw, BookOpen, Target, Lock, Check } from 'lucide-react'
import Link from 'next/link'

export default async function ProgressPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const stats = await getUserStats(session.user.id)

  return (
    <div className="space-y-10">
      <PageHeader
        title="Progress & Statistics"
        description="Pantau perkembangan belajar, XP, Level, Streak, dan Pencapaian (Achievements) Anda."
        icon={<BarChart3 className="w-8 h-8" />}
      />

      {/* Hero Level & XP Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-blue-100">
              Level {stats.level}
            </span>
            <h2 className="text-3xl font-extrabold mt-1">{stats.levelTitle}</h2>
            <p className="text-sm text-blue-100/90 mt-0.5">
              Kumpulkan 100 XP untuk naik ke level berikutnya!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
            <Flame className="w-8 h-8 text-orange-400 animate-bounce" />
            <div>
              <p className="text-xs text-blue-200 uppercase font-semibold">Learning Streak</p>
              <p className="text-2xl font-black">{stats.streakDays} Hari</p>
            </div>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-semibold text-blue-100">
            <span>XP Saat Ini: {stats.xp} XP</span>
            <span>Progress Level: {stats.xpCurrentLevelProgress}%</span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-4 p-0.5 border border-white/20">
            <div
              className="bg-gradient-to-r from-yellow-300 to-amber-400 h-3 rounded-full transition-all duration-500 shadow-inner"
              style={{ width: `${stats.xpCurrentLevelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Statistik Aktivitas Belajar
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Total XP"
            value={`${stats.xp} XP`}
            icon={<Zap className="w-6 h-6" />}
            color="orange"
          />
          <StatCard
            label="Akurasi Jawaban"
            value={`${stats.accuracyRate}%`}
            icon={<Target className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            label="Total Jawaban"
            value={stats.totalAttempts}
            icon={<BookOpen className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            label="Ujian Lulus"
            value={`${stats.passedExamCount}/${stats.totalExamTaken}`}
            icon={<Award className="w-6 h-6" />}
            color="green"
          />
        </div>
      </section>

      {/* Mastery Status Breakdown */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Distribusi Mastery Materi
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-green-900">{stats.masteredCount}</p>
              <p className="text-xs font-semibold text-green-700">Sudah Dikuasai (Mastered)</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-amber-900">{stats.reviewCount}</p>
              <p className="text-xs font-semibold text-amber-700">Perlu Review (Weak)</p>
            </div>
            <RotateCcw className="w-8 h-8 text-amber-500" />
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-blue-900">{stats.learningCount}</p>
              <p className="text-xs font-semibold text-blue-700">Sedang Dipelajari</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {stats.reviewCount > 0 && (
          <div className="pt-2 text-center">
            <Link href="/practice/review" className="text-xs font-semibold text-amber-700 hover:underline">
              💡 Ada {stats.reviewCount} materi perlu review. Klik di sini untuk mengulang!
            </Link>
          </div>
        )}
      </section>

      {/* Achievements Showcase */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          Pencapaian Belajar (Achievements)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 shadow-sm ${
                ach.unlocked
                  ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200'
                  : 'bg-gray-50 border-gray-200 opacity-70'
              }`}
            >
              <div className="text-4xl p-3 bg-white rounded-2xl shadow-sm border shrink-0">
                {ach.icon}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-900 text-base">{ach.title}</h4>
                  {ach.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full shrink-0">
                      <Check className="w-3.5 h-3.5" /> Terbuka
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-200 px-2.5 py-0.5 rounded-full shrink-0">
                      <Lock className="w-3.5 h-3.5" /> Terkunci
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600">{ach.description}</p>

                {/* Achievement progress bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span className="font-semibold text-gray-700">{ach.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${ach.unlocked ? 'bg-purple-600' : 'bg-gray-400'}`}
                      style={{ width: `${ach.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
