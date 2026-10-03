import Link from 'next/link'
import { PageHeader } from '@/components/shared/PageHeader'
import { MaterialCard } from '@/components/shared/MaterialCard'
import { StatCard } from '@/components/shared/StatCard'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { BookOpen, PenTool, Target, TrendingUp, Flame, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Home"
        description="Selamat datang di Japanese Learning Hub!"
        icon={<span>🎌</span>}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          label="XP"
          value="0"
          icon={<Award className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          label="Level"
          value="1"
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          label="Streak"
          value="0"
          icon={<Flame className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Daily Goal */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Today&apos;s Goal</h2>
        <ProgressBar value={0} label="Progress Hari Ini" color="blue" />
        <p className="text-sm text-gray-600 mt-2">Mulai belajar untuk mencapai target harian!</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Link href="/learn">
          <MaterialCard
            title="Learn"
            description="Mulai belajar Hiragana, Katakana, Kanji, dan lainnya."
            icon={<BookOpen className="w-6 h-6" />}
          />
        </Link>
        <Link href="/practice">
          <MaterialCard
            title="Practice"
            description="Latihan dengan berbagai jenis soal."
            icon={<PenTool className="w-6 h-6" />}
          />
        </Link>
        <Link href="/mastery">
          <MaterialCard
            title="Mastery"
            description="Lihat penguasaan materi Anda."
            icon={<Target className="w-6 h-6" />}
          />
        </Link>
      </div>
    </div>
  )
}
