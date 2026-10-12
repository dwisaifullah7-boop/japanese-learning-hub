import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ClausesGuideClient } from './ClausesGuideClient'

export const metadata: Metadata = {
  title: 'Panduan Modifikasi Kata Benda & Opini (Clauses & Opinions) | Japanese Learning Hub',
  description: 'Pelajari modifikasi kata benda dengan anak kalimat (noun modification), opini ~to omoimasu, kutipan ~to iimashita, dan kata kerja pakaian.',
}

export default function ClausesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link
          href="/learn"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Pusat Pembelajaran
        </Link>
      </div>

      <ClausesGuideClient />
    </div>
  )
}
