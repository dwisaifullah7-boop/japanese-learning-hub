'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/button'
import { RotateCcw, BookOpen, AlertTriangle, Loader2, ArrowRight } from 'lucide-react'

export default function ReviewHubPage() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/review/fetch')
      .then(res => res.json())
      .then(resData => {
        setData(resData)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const startReview = () => {
    if (!data || !data.questions || data.questions.length === 0) return
    // Simpan data soal di session storage agar bisa diakses ReviewSessionClient
    sessionStorage.setItem('review_questions', JSON.stringify(data.questions))
    router.push('/practice/review-session')
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Review Session"
        description="Ulangi materi yang belum dikuasai (Weak Material) atau sedang dipelajari."
        icon={<RotateCcw className="w-8 h-8" />}
      />

      {data && data.questions && data.questions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              label="Total Materi Review" 
              value={data.summary.total} 
              icon={<BookOpen className="w-6 h-6" />} 
              color="blue" 
            />
            <StatCard 
              label="Weak Material (Review)" 
              value={data.summary.weak} 
              icon={<AlertTriangle className="w-6 h-6" />} 
              color="orange" 
            />
            <StatCard 
              label="Sedang Dipelajari" 
              value={data.summary.learning} 
              icon={<BookOpen className="w-6 h-6" />} 
              color="purple" 
            />
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Siap untuk Sesi Review?</h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Anda akan mengulang <strong>{data.summary.total} materi</strong> yang membutuhkan perhatian lebih.
              Sistem memprioritaskan Weak Material dan materi yang paling lama tidak diulang.
            </p>
            <Button onClick={startReview} size="lg" className="mt-4 gap-2">
              Mulai Sesi Review <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-green-50 p-8 rounded-xl border border-green-200 text-center space-y-4">
          <h3 className="text-2xl font-bold text-green-800">🎉 Hebat! Tidak Ada Materi untuk Review.</h3>
          <p className="text-green-700 max-w-lg mx-auto">
            Anda sudah menguasai semua materi yang pernah dilatih, atau belum ada data latihan.
            Terus berlatih di halaman Practice untuk melatih materi baru.
          </p>
          <Button onClick={() => router.push('/practice')} variant="outline" className="mt-2">
            Kembali ke Practice Hub
          </Button>
        </div>
      )}
    </div>
  )
}
