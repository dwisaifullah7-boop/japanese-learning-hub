'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { AudioButton } from '@/components/shared/AudioButton'
import { useAudio } from '@/components/providers/AudioProvider'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { ExamResultView } from './ExamResultView'
import { Clock, AlertTriangle, ArrowLeft, ArrowRight, Send, HelpCircle } from 'lucide-react'

export interface ExamQuestion {
  id: string
  front: string
  back: string
  romaji?: string
  audioText?: string
  materialType: string
  options: string[]
}

interface ExamEngineProps {
  title: string
  questions: ExamQuestion[]
  timeLimitMinutes?: number
}

export function ExamEngine({ title, questions, timeLimitMinutes = 10 }: ExamEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [secondsLeft, setSecondsLeft] = useState(timeLimitMinutes * 60)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [examResultData, setExamResultData] = useState<any>(null)

  const { playAudio } = useAudio()
  const initialTimeRef = useRef(timeLimitMinutes * 60)

  // Countdown Timer
  useEffect(() => {
    if (examResultData || isSubmitting) return

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleForceSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [examResultData, isSubmitting])

  const currentQuestion = questions[currentIndex]

  const handleSelectOption = (option: string) => {
    if (isSubmitting || examResultData) return
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option,
    }))
  }

  const handleForceSubmit = () => {
    submitExam()
  }

  const submitExam = async () => {
    setIsSubmitting(true)
    setShowConfirmModal(false)

    const durationSeconds = Math.max(0, initialTimeRef.current - secondsLeft)

    const answersPayload = questions.map(q => {
      const userAnswer = selectedAnswers[q.id] || ''
      const isCorrect = userAnswer === q.back
      return {
        materialType: q.materialType,
        materialId: q.id,
        questionText: q.front,
        userAnswer,
        correctAnswer: q.back,
        isCorrect,
      }
    })

    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          durationSeconds,
          answers: answersPayload,
        }),
      })

      if (!res.ok) throw new Error('Gagal submit ujian')

      const data = await res.json()
      setExamResultData({
        result: data.result,
        answers: data.answers,
      })
    } catch (err) {
      console.error('Submit exam error:', err)
      alert('Terjadi kesalahan saat mengirim hasil ujian. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format time MM:SS
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (isSubmitting) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 font-medium">Sedang menilai jawaban ujian Anda...</p>
      </div>
    )
  }

  // Display result view if exam is completed
  if (examResultData) {
    return (
      <ExamResultView
        result={examResultData.result}
        answers={examResultData.answers}
        onRestart={() => {
          setSelectedAnswers({})
          setCurrentIndex(0)
          setSecondsLeft(timeLimitMinutes * 60)
          setExamResultData(null)
        }}
      />
    )
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Tidak ada soal ujian tersedia.</p>
      </div>
    )
  }

  const answeredCount = Object.keys(selectedAnswers).length
  const isTimeWarning = secondsLeft < 120

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header Bar: Title, Timer, Progress */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500">
            Terjawab {answeredCount} dari {questions.length} soal
          </p>
        </div>

        {/* Timer Badge */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-base font-mono font-bold ${
            isTimeWarning
              ? 'bg-red-50 border-red-300 text-red-600 animate-pulse'
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>{formatTimer(secondsLeft)}</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 min-h-[320px] flex flex-col justify-between space-y-6">
        {/* Question Header */}
        <div className="space-y-3 text-center">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Soal No. {currentIndex + 1}</span>
            <span className="uppercase font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {currentQuestion.materialType}
            </span>
          </div>

          <div className="text-5xl font-bold text-gray-900 font-japanese py-2">
            {currentQuestion.front}
          </div>

          <AudioButton
            audioUrl={`exam-${currentQuestion.id}`}
            onClick={() =>
              playAudio(`exam-${currentQuestion.id}`, currentQuestion.audioText || currentQuestion.front)
            }
            size="sm"
          />
        </div>

        {/* Multiple Choice Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === option
            return (
              <button
                key={`${option}-${idx}`}
                onClick={() => handleSelectOption(option)}
                className={`w-full py-4 px-4 text-base font-medium rounded-xl border-2 transition-all flex items-center justify-between text-left ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold shadow-sm'
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-800'
                }`}
              >
                <span>{option}</span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Nav Buttons (Prev / Next) */}
        <div className="flex justify-between items-center pt-2">
          <Button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Sebelumnya
          </Button>

          <Button
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIndex === questions.length - 1}
            variant="outline"
            size="sm"
          >
            Berikutnya <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Bottom Palette & Submit */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Navigasi Soal Ujian
          </p>
          <Button onClick={() => setShowConfirmModal(true)} variant="default" className="gap-2 bg-green-600 hover:bg-green-700">
            <Send className="w-4 h-4" /> Selesai & Kirim Ujian
          </Button>
        </div>

        {/* Number Buttons Palette */}
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex
            const isAnswered = Boolean(selectedAnswers[q.id])

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-9 h-9 text-xs font-bold rounded-lg border transition-all ${
                  isCurrent
                    ? 'ring-2 ring-blue-600 ring-offset-1 border-blue-600 bg-blue-600 text-white'
                    : isAnswered
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-orange-600">
              <AlertTriangle className="w-8 h-8 shrink-0" />
              <h3 className="text-lg font-bold text-gray-900">Kirim Jawaban Ujian?</h3>
            </div>

            <p className="text-sm text-gray-600">
              Anda telah menjawab <strong>{answeredCount} dari {questions.length}</strong> soal.
              {answeredCount < questions.length && (
                <span className="text-red-600 font-semibold block mt-1">
                  ⚠️ Masih ada {questions.length - answeredCount} soal yang belum dijawab!
                </span>
              )}
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => setShowConfirmModal(false)} variant="outline">
                Batal
              </Button>
              <Button onClick={submitExam} className="bg-green-600 hover:bg-green-700">
                Ya, Kirim Sekarang
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
