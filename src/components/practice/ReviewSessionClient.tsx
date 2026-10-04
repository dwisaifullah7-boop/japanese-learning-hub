'use client'

import { useEffect, useState } from 'react'
import { PracticeEngine } from './PracticeEngine'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { PageHeader } from '@/components/shared/PageHeader'
import { RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ReviewSessionClient() {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Coba baca data dari sessionStorage
    const storedData = sessionStorage.getItem('review_questions')
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuestions(parsed)
          setLoading(false)
          return
        }
      } catch (e) {
        console.error("Gagal parse data review dari sessionStorage", e)
      }
    }

    // 2. Fallback: jika sessionStorage kosong/di-refresh, ambil langsung dari API
    fetch('/api/review/fetch')
      .then(res => res.json())
      .then(data => {
        if (data && data.questions) {
          setQuestions(data.questions)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Gagal fetch data review dari API", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Practice', href: '/practice' },
            { label: 'Review Session' },
          ]}
        />
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Tidak Ada Materi untuk Review</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Semua materi sudah Anda kuasai dengan baik atau belum ada data latihan.
          </p>
          <Link href="/practice">
            <Button variant="default">Kembali ke Practice Hub</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Practice', href: '/practice' },
          { label: 'Review Session' },
        ]}
      />

      <PageHeader
        title="Review Session"
        description={`Mengulang ${questions.length} materi yang membutuhkan perhatian lebih.`}
        icon={<RotateCcw className="w-8 h-8" />}
      />

      <PracticeEngine 
        questions={questions} 
        mode="multiple-choice" 
        materialType="mixed"
      />
    </div>
  )
}
