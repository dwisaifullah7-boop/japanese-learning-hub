'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, ArrowRight, BookOpen, AlertCircle } from 'lucide-react'

interface AnswerBreakdown {
  materialType: string
  materialId: string
  questionText: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
}

interface ExamResultViewProps {
  result: {
    id?: string
    title: string
    score: number
    totalQuestions: number
    percentage: number
    passed: boolean
    durationSeconds: number
  }
  answers?: AnswerBreakdown[]
  onRestart?: () => void
}

export function ExamResultView({ result, answers = [], onRestart }: ExamResultViewProps) {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Header Banner */}
      <div
        className={`p-8 rounded-2xl border text-center space-y-4 shadow-sm ${
          result.passed
            ? 'bg-gradient-to-b from-green-50 to-emerald-50 border-green-200 text-green-900'
            : 'bg-gradient-to-b from-red-50 to-rose-50 border-red-200 text-red-900'
        }`}
      >
        <div className="inline-flex p-4 rounded-full bg-white shadow-sm mb-2">
          {result.passed ? (
            <Award className="w-14 h-14 text-green-600 animate-bounce" />
          ) : (
            <AlertCircle className="w-14 h-14 text-red-600" />
          )}
        </div>

        <h2 className="text-3xl font-extrabold">
          {result.passed ? 'Selamat! Anda LULUS Ujian! 🎉' : 'Belum Lulus — Jangan Patah Semangat! 💪'}
        </h2>

        <p className="text-sm font-medium opacity-80 max-w-md mx-auto">
          {result.title} • Syarat Kelulusan: Minimal 70%
        </p>

        {/* Big Percentage */}
        <div className="text-6xl font-black tracking-tight my-2">
          {result.percentage}%
        </div>

        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-white/80 border">
          {result.passed ? 'STATUS: LULUS (PASSED)' : 'STATUS: BELUM LULUS (FAILED)'}
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Jawaban Benar</p>
            <p className="text-xl font-bold text-gray-900">
              {result.score} / {result.totalQuestions}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Waktu Pengerjaan</p>
            <p className="text-xl font-bold text-gray-900">{formatTime(result.durationSeconds)}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Target Akurasi</p>
            <p className="text-xl font-bold text-gray-900">70.0%</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
        {onRestart && (
          <Button onClick={onRestart} size="lg" variant="outline" className="w-full sm:w-auto gap-2">
            <RotateCcw className="w-5 h-5" /> Ulangi Ujian Ini
          </Button>
        )}
        <Link href="/exam" className="w-full sm:w-auto">
          <Button size="lg" className="w-full gap-2">
            Kembali ke Exam Hub <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Question Breakdown */}
      {answers.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Pembahasan Soal & Kunci Jawaban
          </h3>

          <div className="space-y-3">
            {answers.map((ans, idx) => (
              <div
                key={`${ans.materialId}-${idx}`}
                className={`p-4 rounded-xl border text-sm space-y-2 ${
                  ans.isCorrect ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2 font-medium text-gray-900">
                    <span className="font-bold text-gray-500">Soal {idx + 1}:</span>
                    <span className="font-japanese text-base font-semibold">{ans.questionText}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                      {ans.materialType}
                    </span>
                  </div>
                  {ans.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Benar
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full shrink-0">
                      <XCircle className="w-4 h-4" /> Salah
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-gray-500">Jawaban Anda: </span>
                    <span className={`font-semibold ${ans.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {ans.userAnswer || '(Tidak dijawab)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Jawaban Benar: </span>
                    <span className="font-semibold text-green-800">{ans.correctAnswer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
