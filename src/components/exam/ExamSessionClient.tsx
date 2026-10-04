'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ExamEngine, ExamQuestion } from './ExamEngine'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { PageHeader } from '@/components/shared/PageHeader'
import { FileText } from 'lucide-react'

export function ExamSessionClient() {
  const searchParams = useSearchParams()
  const preset = searchParams.get('preset') || 'comprehensive'

  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [title, setTitle] = useState<string>('Ujian Bahasa Jepang')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/exam/questions?preset=${preset}`)
      .then(res => res.json())
      .then(data => {
        if (data.questions) {
          setQuestions(data.questions)
        }
        if (data.title) {
          setTitle(data.title)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Fetch exam questions error:', err)
        setLoading(false)
      })
  }, [preset])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="space-y-6 text-center py-12 bg-white rounded-xl border p-8">
        <h2 className="text-xl font-bold text-gray-800">Materi Ujian Belum Cukup</h2>
        <p className="text-sm text-gray-600">
          Database belum memiliki data yang cukup untuk membuat sesi ujian ini.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Exam', href: '/exam' },
          { label: 'Sesi Ujian' },
        ]}
      />

      <PageHeader
        title={title}
        description={`Sesi Ujian (${questions.length} Soal) • Batas Waktu: 10 Menit`}
        icon={<FileText className="w-8 h-8" />}
      />

      <ExamEngine title={title} questions={questions} timeLimitMinutes={10} />
    </div>
  )
}
