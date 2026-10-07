'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lightbulb, ArrowRight, Loader2 } from 'lucide-react'

interface Recommendation {
  type: string
  title: string
  description: string
  href: string
  priority: number
  icon: string
  category: string
}

export function RecommendationWidget() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/recommend')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data.recommendations || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-center gap-2 py-8 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Menganalisis progress belajar...</span>
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-sm text-center space-y-2">
        <span className="text-4xl">🎉</span>
        <h3 className="font-bold text-green-900">Semua Materi Terkendali!</h3>
        <p className="text-xs text-green-700">Tidak ada rekomendasi khusus. Teruskan belajar atau coba ujian untuk menguji kemampuanmu.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        Rekomendasi Pintar untuk Hari Ini
      </h3>

      <div className="space-y-2">
        {recommendations.map((rec, idx) => (
          <Link key={idx} href={rec.href} className="block group">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
              <span className="text-2xl">{rec.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">{rec.title}</p>
                <p className="text-xs text-gray-500 truncate">{rec.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
