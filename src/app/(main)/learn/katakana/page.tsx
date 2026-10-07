import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { AudioButton } from '@/components/shared/AudioButton'
import { Type } from 'lucide-react'
import Link from 'next/link'

export default async function KatakanaPage() {
  const katakana = await prisma.katakana.findMany({
    orderBy: { id: 'asc' },
  })

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Katakana' },
        ]}
      />

      <PageHeader
        title="Katakana (カタカナ)"
        description="Aksara untuk kata serapan asing, nama, dan onomatope. Bentuknya lebih tajam dan bersudut dibanding Hiragana."
        icon={<Type className="w-8 h-8 text-purple-600" />}
      />

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-purple-700">{katakana.length}</span>
          <span className="text-sm text-purple-600 font-medium">Karakter Tersedia</span>
        </div>
        <div className="h-8 w-px bg-purple-200 hidden sm:block" />
        <p className="text-xs text-purple-700/80 max-w-md">
          Katakana digunakan untuk menulis kata-kata asing (gairaigo) seperti コンピューター (komputer), テレビ (televisi), dll.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {katakana.map(k => (
          <div key={k.id} className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center hover:border-purple-400 hover:shadow-md transition-all group cursor-pointer">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 font-japanese group-hover:text-purple-700 transition-colors">{k.character}</span>
            <span className="text-[10px] text-gray-500 font-medium">{k.romaji}</span>
          </div>
        ))}
      </div>

      {katakana.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-gray-900">Detail Karakter</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {katakana.map(k => (
              <div key={k.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                <span className="text-4xl font-bold text-purple-700 font-japanese w-16 text-center">{k.character}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{k.romaji}</p>
                  {k.example && <p className="text-xs text-gray-500">{k.example}</p>}
                </div>
                <AudioButton audioUrl={k.character} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Hafalan Katakana!</h4>
        <p className="text-xs text-gray-500">Latih pengenalan karakter katakana dalam mode kuis.</p>
        <Link
          href="/practice/multiple-choice?type=katakana"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-medium text-sm transition-colors"
        >
          Mulai Kuis Katakana →
        </Link>
      </div>
    </div>
  )
}
