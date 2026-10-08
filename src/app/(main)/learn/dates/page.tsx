import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { JapaneseDatesClient } from './JapaneseDatesClient'
import { Calendar, Sparkles, ArrowRight, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function JapaneseDatesPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Penanggalan & Kalender' },
        ]}
      />

      <PageHeader
        title="Penanggalan & Kalender Jepang (日付と月)"
        description="Panduan interaktif pelafalan tanggal 1〜31 dan bulan 1〜12 dalam bahasa Jepang dengan audio pelafalan lengkap."
        icon={<Calendar className="w-8 h-8 text-blue-600" />}
      />

      {/* Rules Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-950 space-y-3">
        <h3 className="font-bold text-base flex items-center gap-2 text-amber-900">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          Mengapa Tanggal dalam Bahasa Jepang Terkenal Sulit?
        </h3>
        <p className="text-amber-900/90 text-xs sm:text-sm leading-relaxed">
          Bahasa Jepang memiliki <strong>10 hari pertama</strong> (tanggal 1 s.d. 10), tanggal <strong>14</strong>, <strong>20</strong>, dan <strong>24</strong> yang menggunakan sistem pelafalan tradisional asli Jepang (Wago), bukan sistem angka Sino-Japanese biasa. Gunakan simulator interaktif di bawah ini untuk mendengarkan dan menghafalnya!
        </p>
      </div>

      {/* Interactive Dates Tool */}
      <JapaneseDatesClient />

      {/* Practice CTA */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Pemahaman Penanggalan!</h4>
        <p className="text-xs text-gray-500">Uji kemampuan mengingat tanggal dan kata kerja perpindahan dalam Ujian Bab 5.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/practice/multiple-choice?type=vocabulary"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors"
          >
            Latihan Soal Pilihan Ganda <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/exam/session?preset=bab5"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 border border-blue-300 rounded-xl hover:bg-blue-50 font-medium text-sm transition-colors"
          >
            Mulai Ujian Evaluasi Bab 5 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
