import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { KanjiGridClient } from './KanjiGridClient'

export default async function KanjiPage() {
  const kanji = await prisma.kanji.findMany({
    orderBy: { id: 'asc' },
  })

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Kanji' },
        ]}
      />

      <PageHeader
        title="Kanji Dasar (漢字)"
        description="Karakter logografis bahasa Jepang (JLPT N5). Klik kanji untuk melihat cara baca ON/KUN dan berlatih menulis goresan."
        icon={<BookOpen className="w-8 h-8 text-red-600" />}
      />

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-red-700">{kanji.length}</span>
          <span className="text-sm text-red-600 font-medium">Kanji Tersedia</span>
        </div>
        <div className="h-8 w-px bg-red-200 hidden sm:block" />
        <p className="text-xs text-red-700/80 max-w-md">
          Setiap karakter Kanji memiliki makna mandiri serta dua cara baca utama: 音読み (Onyomi - cara baca China) dan 訓読み (Kunyomi - cara baca asli Jepang).
        </p>
      </div>

      {/* Interactive Kanji Grid with Stroke Practice Modal */}
      <KanjiGridClient
        kanji={kanji.map(k => ({
          id: k.id,
          character: k.character,
          hiragana: k.hiragana,
          romaji: k.romaji,
          meaning: k.meaning,
          onyomi: k.onyomi,
          kunyomi: k.kunyomi,
          jlptLevel: k.jlptLevel,
        }))}
      />

      {/* Practice CTA */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Pengetahuan Kanji!</h4>
        <p className="text-xs text-gray-500">Latih pengenalan kanji dalam kuis pilihan ganda.</p>
        <Link
          href="/practice/multiple-choice?type=kanji"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium text-sm transition-colors"
        >
          Mulai Kuis Kanji →
        </Link>
      </div>
    </div>
  )
}
