import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { AdjectivesGuideClient } from './AdjectivesGuideClient'
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function AdjectivesPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Kata Sifat (い & な)' },
        ]}
      />

      <PageHeader
        title="Panduan Kata Sifat Jepang (形容詞の活用)"
        description="Pelajari perbedaan i-Adjective (い形容詞) & na-Adjective (な形容詞), konjugasi 4 bentuk waktu/negasi, dan cara menerangkan kata benda."
        icon={<Sparkles className="w-8 h-8 text-blue-600" />}
      />

      {/* Adjectives Interactive Tool */}
      <AdjectivesGuideClient />

      {/* CTA to Practice */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Pemahaman Kata Sifat!</h4>
        <p className="text-xs text-gray-500">Uji penguasaan kata sifat dan pola kalimat Bab 8 dalam simulasi kuis atau ujian.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/practice/multiple-choice?type=vocabulary"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors"
          >
            Latihan Soal Pilihan Ganda <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/exam/session?preset=bab8"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 border border-blue-300 rounded-xl hover:bg-blue-50 font-medium text-sm transition-colors"
          >
            Mulai Ujian Evaluasi Bab 8 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
