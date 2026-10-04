import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PageHeader } from '@/components/shared/PageHeader'
import { getWeakMaterials } from '@/lib/mastery'
import { AlertCircle, ArrowRight, RotateCcw, CheckCircle2, BookMarked, Languages, FileText, Sparkles, GraduationCap } from 'lucide-react'

const MATERIAL_META: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  vocabulary: { label: 'Kosakata',  icon: <BookMarked className="w-4 h-4" />,    color: 'bg-blue-100 text-blue-700' },
  hiragana:   { label: 'Hiragana',  icon: <Languages className="w-4 h-4" />,     color: 'bg-purple-100 text-purple-700' },
  katakana:   { label: 'Katakana',  icon: <Languages className="w-4 h-4" />,     color: 'bg-pink-100 text-pink-700' },
  kanji:      { label: 'Kanji',     icon: <FileText className="w-4 h-4" />,      color: 'bg-red-100 text-red-700' },
  particle:   { label: 'Partikel',  icon: <Sparkles className="w-4 h-4" />,      color: 'bg-yellow-100 text-yellow-700' },
  grammar:    { label: 'Grammar',   icon: <GraduationCap className="w-4 h-4" />, color: 'bg-green-100 text-green-700' },
}

export default async function ReviewPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const weakItems = await getWeakMaterials(session.user.id, 20)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Review — Materi Lemah"
        description="Materi yang sering salah dan perlu dilatih lagi. Fokus di sini untuk meningkatkan penguasaanmu."
        icon={<AlertCircle className="w-8 h-8" />}
      />

      {/* Summary bar */}
      <div className="flex items-center gap-4 text-sm text-gray-600 bg-orange-50 border border-orange-200 rounded-xl px-5 py-3">
        <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
        <span>
          Ditemukan <strong className="text-orange-700">{weakItems.length} materi</strong> dengan akurasi di bawah 60% yang perlu diperkuat.
        </span>
        <Link href="/mastery" className="ml-auto text-blue-600 hover:underline flex items-center gap-1 shrink-0">
          Lihat Mastery <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {weakItems.length === 0 ? (
        /* Empty state */
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak Ada Materi Lemah!</h3>
          <p className="text-gray-500 mb-6">Luar biasa! Semua materi yang pernah kamu latih sudah cukup baik.</p>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Latihan Lagi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {weakItems.map((item, idx) => {
            const meta = MATERIAL_META[item.materialType] ?? { label: item.materialType, icon: null, color: 'bg-gray-100 text-gray-700' }
            const accuracyPct = Math.round(item.accuracy * 100)
            const barColor = accuracyPct < 30 ? 'bg-red-500' : accuracyPct < 50 ? 'bg-orange-400' : 'bg-yellow-400'

            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                {/* Rank */}
                <span className="text-xl font-bold text-gray-300 w-6 shrink-0">{idx + 1}</span>

                {/* Category badge */}
                <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${meta.color}`}>
                  {meta.icon} {meta.label}
                </span>

                {/* Accuracy bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Akurasi</span>
                    <span className="font-semibold text-gray-700">{accuracyPct}% ({item.correctCount}/{item.attemptCount}x)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`${barColor} h-2 rounded-full`} style={{ width: `${accuracyPct}%` }} />
                  </div>
                </div>

                {/* Level badge */}
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-mono ${
                  item.level === 'LEARNING' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {item.level}
                </span>

                {/* Practice button */}
                <Link
                  href={`/practice/multiple-choice?type=${item.materialType}`}
                  className="flex items-center gap-1.5 text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shrink-0 font-medium"
                >
                  <RotateCcw className="w-4 h-4" /> Latih
                </Link>
              </div>
            )
          })}
        </div>
      )}

      {/* Quick links */}
      <div className="flex flex-wrap gap-3 pt-2">
        {Object.entries(MATERIAL_META).map(([type, meta]) => (
          <Link
            key={type}
            href={`/practice/multiple-choice?type=${type}`}
            className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border font-medium hover:shadow-sm transition-all ${meta.color} border-current/20`}
          >
            {meta.icon} Latih {meta.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
