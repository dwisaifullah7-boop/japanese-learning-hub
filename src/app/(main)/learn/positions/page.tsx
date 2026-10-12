import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { PositionsGuideClient } from './PositionsGuideClient'
import { Compass, Sparkles, ArrowRight, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function PositionsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Posisi Ruang & Keberadaan' },
        ]}
      />

      <PageHeader
        title="Posisi Ruang & Keberadaan (位置関係と存在)"
        description="Panduan interaktif letak ruang (atas, bawah, depan, belakang, samping, antara) dan perbedaan penggunaan kata kerja keberadaan います vs あります."
        icon={<Compass className="w-8 h-8 text-blue-600" />}
      />

      {/* Rules Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 text-sm text-blue-950 space-y-3">
        <h3 className="font-bold text-base flex items-center gap-2 text-blue-900">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          Rumus Menunjukkan Letak Benda dalam Bahasa Jepang:
        </h3>
        <p className="text-blue-900/90 text-xs sm:text-sm leading-relaxed">
          Struktur kalimat standar adalah: <strong>[Benda Acuan] の [Posisi] に [Subjek] が います / あります</strong>.
          <br />Contoh: <strong>つくえの うえに ほんが あります</strong> (Di atas meja ada buku).
        </p>
      </div>

      {/* Positions Interactive Tool */}
      <PositionsGuideClient />

      {/* CTA to Practice */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Pemahaman Letak Ruang!</h4>
        <p className="text-xs text-gray-500">Uji penguasaan preposisi dan keberadaan makhluk hidup dalam Ujian Bab 10.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/practice/multiple-choice?type=vocabulary"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors"
          >
            Latihan Soal Pilihan Ganda <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/exam/session?preset=bab10"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 border border-blue-300 rounded-xl hover:bg-blue-50 font-medium text-sm transition-colors"
          >
            Mulai Ujian Evaluasi Bab 10 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
