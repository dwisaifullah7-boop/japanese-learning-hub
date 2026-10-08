import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { Type } from 'lucide-react'
import Link from 'next/link'
import { KatakanaGridClient } from './KatakanaGridClient'

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
        description="46 aksara untuk kata serapan asing (gairaigo), nama luar negeri, dan onomatope. Klik karakter untuk melihat detail dan latihan menulis."
        icon={<Type className="w-8 h-8 text-purple-600" />}
      />

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-purple-700">{katakana.length}</span>
          <span className="text-sm text-purple-600 font-medium">Karakter Tersedia</span>
        </div>
        <div className="h-8 w-px bg-purple-200 hidden sm:block" />
        <p className="text-xs text-purple-700/80 max-w-md">
          Katakana memiliki bunyi vokal yang persis sama dengan Hiragana, namun bentuk goresannya lebih tegas, lurus, dan bersudut.
        </p>
      </div>

      {/* Interactive Katakana Grid with Stroke Practice Modal */}
      <KatakanaGridClient
        katakana={katakana.map(k => ({
          id: k.id,
          character: k.character,
          romaji: k.romaji,
          example: k.example || '',
        }))}
      />

      {/* Practice CTA */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Hafalan Katakana!</h4>
        <p className="text-xs text-gray-500">Latih pengenalan karakter katakana dalam mode kuis interaktif.</p>
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
