import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CountersGuideClient } from './CountersGuideClient'

export const metadata: Metadata = {
  title: 'Panduan Kata Bantu Bilangan (Counters) | Japanese Learning Hub',
  description: 'Pelajari hitungan umum (hitotsu, futatsu...), counter khusus (-nin, -mai, -dai, -hon, -kai), dan durasi waktu bahasa Jepang.',
}

export default function CountersPage() {
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

      <CountersGuideClient />
    </div>
  )
}
