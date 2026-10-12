import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FormsGuideClient } from './FormsGuideClient'

export const metadata: Metadata = {
  title: 'Panduan Bentuk Kamus & Negatif (Jisho & Nai Forms) | Japanese Learning Hub',
  description: 'Kuasai konjugasi kata kerja bentuk kamus (辞書形) dan bentuk negatif (ない形), aturan vokal u/a, pengecualian, dan audio pelafalan.',
}

export default function FormsPage() {
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

      <FormsGuideClient />
    </div>
  )
}
