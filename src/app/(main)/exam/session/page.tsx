import { Suspense } from 'react'
import { ExamSessionClient } from '@/components/exam/ExamSessionClient'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export default function ExamSessionPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[400px]"><LoadingSpinner size="lg" /></div>}>
      <ExamSessionClient />
    </Suspense>
  )
}
