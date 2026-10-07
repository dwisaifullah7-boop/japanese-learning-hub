import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { AudioButton } from '@/components/shared/AudioButton'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

export default async function VocabularyPage() {
  const vocabulary = await prisma.vocabulary.findMany({
    orderBy: { id: 'asc' },
  })

  // Group by wordType
  const grouped = vocabulary.reduce<Record<string, typeof vocabulary>>((acc, v) => {
    const type = v.wordType || 'Lainnya'
    if (!acc[type]) acc[type] = []
    acc[type].push(v)
    return acc
  }, {})

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Vocabulary' },
        ]}
      />

      <PageHeader
        title="Kosakata (語彙)"
        description="Kosakata dasar dari Minna no Nihongo Bab 1. Pelajari kata, kanji, cara baca, dan artinya."
        icon={<BookOpen className="w-8 h-8 text-indigo-600" />}
      />

      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-indigo-700">{vocabulary.length}</span>
          <span className="text-sm text-indigo-600 font-medium">Kata Tersedia</span>
        </div>
        <div className="h-8 w-px bg-indigo-200 hidden sm:block" />
        <p className="text-xs text-indigo-700/80 max-w-md">
          Kosakata dikelompokkan berdasarkan jenis kata (Noun, Verb, Adjective, dll). Klik audio untuk mendengar pengucapan.
        </p>
      </div>

      {/* Grouped Vocabulary */}
      {Object.entries(grouped).map(([type, words]) => (
        <div key={type} className="space-y-3">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">{type}</span>
            <span className="text-gray-400 text-xs">({words.length} kata)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {words.map(v => (
              <div key={v.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:shadow-sm hover:border-indigo-300 transition-all">
                <div className="text-center min-w-[60px]">
                  {v.kanji && <p className="text-2xl font-bold text-gray-900 font-japanese">{v.kanji}</p>}
                  <p className="text-sm text-indigo-600 font-japanese">{v.kana}</p>
                </div>
                <div className="flex-1 border-l border-gray-100 pl-4">
                  <p className="font-bold text-gray-900">{v.meaning}</p>
                  {v.romaji && <p className="text-xs text-gray-500">{v.romaji}</p>}
                </div>
                <AudioButton audioUrl={v.kana || v.word} size="sm" />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Hafalan Kosakata!</h4>
        <p className="text-xs text-gray-500">Latih kosakata dalam mode flashcard atau pilihan ganda.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/practice/flashcard?type=vocabulary"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium text-sm transition-colors"
          >
            Mode Flashcard →
          </Link>
          <Link
            href="/practice/multiple-choice?type=vocabulary"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-600 border border-indigo-300 rounded-xl hover:bg-indigo-50 font-medium text-sm transition-colors"
          >
            Mode Pilihan Ganda →
          </Link>
        </div>
      </div>
    </div>
  )
}
