import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { AudioButton } from '@/components/shared/AudioButton'
import { Sparkles, ArrowRight, GitCompare } from 'lucide-react'
import Link from 'next/link'

export default async function ParticlePage() {
  const particles = await prisma.particle.findMany({
    orderBy: { id: 'asc' },
  })

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Particle' },
        ]}
      />

      <PageHeader
        title="Partikel Bahasa Jepang (助詞)"
        description="Partikel adalah kata kecil yang menentukan fungsi kata dalam kalimat. Menguasai partikel = menguasai grammar!"
        icon={<Sparkles className="w-8 h-8 text-amber-500" />}
      />

      {/* Compare Link Banner */}
      <Link href="/learn/particle/compare" className="block group">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all hover:border-amber-400">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-xl">
              <GitCompare className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900">Perbandingan Partikel</h3>
              <p className="text-xs text-amber-700">Pahami perbedaan は vs が, に vs で, dan pasangan partikel lainnya</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Stats */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-amber-700">{particles.length}</span>
          <span className="text-sm text-amber-600 font-medium">Partikel Tersedia</span>
        </div>
        <div className="h-8 w-px bg-amber-200 hidden sm:block" />
        <p className="text-xs text-amber-700/80 max-w-md">
          Setiap partikel memiliki fungsi unik. Pelajari pola, contoh kalimat, dan kesalahan umum untuk masing-masing partikel.
        </p>
      </div>

      {/* Particle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {particles.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-slate-800 to-indigo-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-white font-japanese">{p.particle}</span>
                <div>
                  <p className="text-white font-bold">{p.reading ? `(${p.reading})` : ''}</p>
                  <p className="text-blue-200 text-xs">{p.meaning}</p>
                </div>
              </div>
              <AudioButton audioUrl={p.particle} size="sm" />
            </div>

            <div className="p-5 space-y-3">
              {p.function && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fungsi</p>
                  <p className="text-sm text-gray-800">{p.function}</p>
                </div>
              )}

              {p.pattern && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Pola</p>
                  <p className="text-sm text-blue-900 font-japanese font-medium">{p.pattern}</p>
                </div>
              )}

              {p.example && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contoh</p>
                  <p className="text-sm font-japanese font-medium text-gray-900">{p.example}</p>
                  {p.translation && <p className="text-xs text-gray-500">{p.translation}</p>}
                </div>
              )}

              {p.commonMistake && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">⚠️ Kesalahan Umum</p>
                  <p className="text-xs text-red-800">{p.commonMistake}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Practice CTA */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Pemahaman Partikelmu!</h4>
        <p className="text-xs text-gray-500">Latih penggunaan partikel dalam soal pilihan ganda interaktif.</p>
        <Link
          href="/practice/multiple-choice?type=particle"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          Mulai Kuis Partikel →
        </Link>
      </div>
    </div>
  )
}
