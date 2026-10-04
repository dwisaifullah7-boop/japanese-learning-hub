import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PageHeader } from '@/components/shared/PageHeader'
import { getMasterySummary, getWeakMaterials } from '@/lib/mastery'
import { Target, BookOpen, RotateCcw, CheckCircle2, AlertCircle, ArrowRight, Flame } from 'lucide-react'

export default async function MasteryPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const [summary, weakItems] = await Promise.all([
    getMasterySummary(session.user.id),
    getWeakMaterials(session.user.id, 5), // preview 5 teratas
  ])

  const totalPracticed = summary.LEARNING + summary.REVIEW + summary.MASTERED
  const masteryPercent = summary.total > 0
    ? Math.round((summary.MASTERED / summary.total) * 100)
    : 0

  const levelCards = [
    {
      label: 'Belum Dipelajari',
      sublabel: 'NEW',
      value: summary.NEW,
      icon: <BookOpen className="w-6 h-6" />,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Sedang Belajar',
      sublabel: 'LEARNING',
      value: summary.LEARNING,
      icon: <RotateCcw className="w-6 h-6" />,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-700',
    },
    {
      label: 'Perlu Review',
      sublabel: 'REVIEW',
      value: summary.REVIEW,
      icon: <AlertCircle className="w-6 h-6" />,
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      badge: 'bg-orange-100 text-orange-700',
    },
    {
      label: 'Sudah Dikuasai',
      sublabel: 'MASTERED',
      value: summary.MASTERED,
      icon: <CheckCircle2 className="w-6 h-6" />,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-700',
    },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Mastery"
        description="Lihat status penguasaan materi Anda secara detail."
        icon={<Target className="w-8 h-8" />}
      />

      {/* Overall Progress Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Progress Keseluruhan</h3>
            <p className="text-sm text-gray-500">{totalPracticed} dari {summary.total > 0 ? summary.total : '—'} materi pernah dilatih</p>
          </div>
          <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
            <Flame className="w-7 h-7 text-orange-500" />
            {masteryPercent}%
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${masteryPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Persentase materi yang sudah MASTERED</p>
      </div>

      {/* Level Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {levelCards.map(card => (
          <div key={card.sublabel} className={`${card.bg} border ${card.border} rounded-xl p-5 flex flex-col gap-2`}>
            <div className={`${card.text}`}>{card.icon}</div>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            <div>
              <p className="text-sm font-semibold text-gray-700">{card.label}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${card.badge}`}>{card.sublabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weak Materials Preview */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-gray-900">Materi Perlu Diperkuat</h3>
          </div>
          <Link href="/practice/review" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            Lihat Semua (Review Hub) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {weakItems.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-500">
            <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="font-medium">Tidak ada materi lemah!</p>
            <p className="text-sm">Semua materi yang sudah dipelajari cukup baik.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {weakItems.map(item => {
              const accuracyPct = Math.round(item.accuracy * 100)
              return (
                <li key={item.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded mr-2">
                      {item.materialType}
                    </span>
                    <span className="text-sm text-gray-700">ID: {item.materialId.slice(0, 8)}…</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-red-600">{accuracyPct}% benar</p>
                      <p className="text-xs text-gray-400">{item.attemptCount}x latihan</p>
                    </div>
                    <Link
                      href={`/practice/multiple-choice?type=${item.materialType}`}
                      className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Latih
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* CTA jika belum ada data sama sekali */}
      {summary.total === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Belum Ada Data Mastery</h3>
          <p className="text-sm text-gray-500 mb-4">Mulai berlatih untuk melacak penguasaan materimu.</p>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Mulai Latihan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
