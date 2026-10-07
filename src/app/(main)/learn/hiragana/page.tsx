import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { Languages } from 'lucide-react'
import Link from 'next/link'
import { HiraganaGridClient } from './HiraganaGridClient'

export default async function HiraganaPage() {
  const hiragana = await prisma.hiragana.findMany({
    orderBy: { id: 'asc' },
  })

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Hiragana' },
        ]}
      />

      <PageHeader
        title="Hiragana (ひらがな)"
        description="46 karakter dasar bahasa Jepang. Klik karakter untuk melihat detail dan berlatih menulis."
        icon={<Languages className="w-8 h-8 text-blue-600" />}
      />

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-blue-700">{hiragana.length}</span>
          <span className="text-sm text-blue-600 font-medium">Karakter Tersedia</span>
        </div>
        <div className="h-8 w-px bg-blue-200 hidden sm:block" />
        <p className="text-xs text-blue-700/80 max-w-md">
          Hiragana adalah aksara dasar yang WAJIB dikuasai. Setiap karakter mewakili satu suku kata.
          Mulai dari baris あ (a-i-u-e-o), lalu lanjut ke か (ka-ki-ku-ke-ko), dan seterusnya.
        </p>
      </div>

      {/* Pass data to client component for interactivity */}
      <HiraganaGridClient hiragana={hiragana.map(h => ({ id: h.id, character: h.character, romaji: h.romaji, example: h.example || '' }))} />

      {/* Practice CTA */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Hafalan Hiragana!</h4>
        <p className="text-xs text-gray-500">Latih pengenalan karakter hiragana dalam mode kuis interaktif.</p>
        <Link
          href="/practice/multiple-choice?type=hiragana"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          Mulai Kuis Hiragana →
        </Link>
      </div>
    </div>
  )
}
