import Link from 'next/link'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { Target, BookOpen, RotateCcw, CheckCircle } from 'lucide-react'

export default function MasteryPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Mastery"
        description="Lihat status penguasaan materi Anda."
        icon={<Target className="w-8 h-8" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="New"
          value="0"
          icon={<BookOpen className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          label="Learning"
          value="0"
          icon={<RotateCcw className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          label="Review"
          value="0"
          icon={<RotateCcw className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          label="Mastered"
          value="0"
          icon={<CheckCircle className="w-6 h-6" />}
          color="green"
        />
      </div>

      <EmptyState
        icon={<Target className="w-12 h-12" />}
        title="Belum Ada Data Mastery"
        description="Mulai belajar dan berlatih untuk melihat status penguasaan materi Anda di sini."
      />
      
      <div className="text-center">
        <Link href="/learn">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Mulai Belajar
          </button>
        </Link>
      </div>
    </div>
  )
}
