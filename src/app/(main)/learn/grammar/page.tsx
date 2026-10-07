import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { AudioButton } from '@/components/shared/AudioButton'
import { PenTool } from 'lucide-react'
import Link from 'next/link'

export default async function GrammarPage() {
  const grammar = await prisma.grammar.findMany({
    orderBy: { id: 'asc' },
  })

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Grammar' },
        ]}
      />

      <PageHeader
        title="Grammar / Tata Bahasa (文法)"
        description="Pola kalimat dasar dari Minna no Nihongo Bab 1. Kuasai pola ini untuk bisa membentuk kalimat Jepang yang benar."
        icon={<PenTool className="w-8 h-8 text-emerald-600" />}
      />

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-emerald-700">{grammar.length}</span>
          <span className="text-sm text-emerald-600 font-medium">Pola Grammar</span>
        </div>
        <div className="h-8 w-px bg-emerald-200 hidden sm:block" />
        <p className="text-xs text-emerald-700/80 max-w-md">
          Setiap pola grammar memiliki aturan penggunaan, contoh kalimat, dan catatan penting. Pelajari secara berurutan.
        </p>
      </div>

      {/* Grammar Cards */}
      <div className="space-y-4">
        {grammar.map((g, idx) => (
          <div key={g.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-white/20 text-white text-sm font-bold w-8 h-8 rounded-lg flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="text-xl font-bold text-white font-japanese">{g.pattern}</h3>
              </div>
              {g.example && <AudioButton audioUrl={g.example} size="sm" />}
            </div>

            <div className="p-5 space-y-3">
              {g.meaning && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Arti</p>
                  <p className="text-sm text-gray-800 font-medium">{g.meaning}</p>
                </div>
              )}

              {g.usage && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Cara Penggunaan</p>
                  <p className="text-sm text-emerald-900">{g.usage}</p>
                </div>
              )}

              {g.example && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contoh</p>
                  <p className="text-sm font-japanese font-medium text-gray-900">{g.example}</p>
                  {g.translation && <p className="text-xs text-gray-500">{g.translation}</p>}
                </div>
              )}

              {g.note && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">📝 Catatan</p>
                  <p className="text-xs text-amber-800">{g.note}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Pemahaman Grammar!</h4>
        <p className="text-xs text-gray-500">Latih pola grammar dalam soal pilihan ganda interaktif.</p>
        <Link
          href="/practice/multiple-choice?type=grammar"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium text-sm transition-colors"
        >
          Mulai Kuis Grammar →
        </Link>
      </div>
    </div>
  )
}
