import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { AudioButton } from '@/components/shared/AudioButton'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

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
        title="Kanji (漢字)"
        description="Karakter China yang digunakan dalam bahasa Jepang. Setiap kanji memiliki arti, cara baca ON dan KUN."
        icon={<BookOpen className="w-8 h-8 text-red-600" />}
      />

      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-red-700">{kanji.length}</span>
          <span className="text-sm text-red-600 font-medium">Kanji Tersedia</span>
        </div>
        <div className="h-8 w-px bg-red-200 hidden sm:block" />
        <p className="text-xs text-red-700/80 max-w-md">
          Kanji JLPT N5 adalah kanji paling dasar yang wajib dikuasai pemula. Pelajari arti, bacaan ON (音読み) dan KUN (訓読み).
        </p>
      </div>

      {/* Kanji Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kanji.map(k => (
          <div key={k.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex">
              <div className="bg-gradient-to-b from-slate-800 to-red-900 p-6 flex items-center justify-center">
                <span className="text-5xl font-bold text-white font-japanese">{k.character}</span>
              </div>
              <div className="p-5 flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{k.meaning}</h3>
                  <AudioButton audioUrl={k.hiragana || k.character} size="sm" />
                </div>
                {k.hiragana && (
                  <p className="text-sm text-gray-600"><span className="font-semibold text-gray-500">Hiragana:</span> {k.hiragana}</p>
                )}
                {k.romaji && (
                  <p className="text-sm text-gray-600"><span className="font-semibold text-gray-500">Romaji:</span> {k.romaji}</p>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  {k.onyomi && (
                    <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                      音読み: {k.onyomi}
                    </span>
                  )}
                  {k.kunyomi && (
                    <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                      訓読み: {k.kunyomi}
                    </span>
                  )}
                  {k.jlptLevel && (
                    <span className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-medium">
                      {k.jlptLevel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Pengetahuan Kanji!</h4>
        <p className="text-xs text-gray-500">Latih pengenalan kanji dalam soal pilihan ganda.</p>
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
