'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Volume2,
  Maximize2,
  Minimize2,
  Sparkles,
  Keyboard
} from 'lucide-react'
import { AudioButton } from '@/components/shared/AudioButton'
import { useAudio } from '@/components/providers/AudioProvider'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

interface Question {
  id: string
  front: string
  back: string
  romaji?: string
  audioText?: string
  materialType?: string
}

interface PracticeEngineProps {
  questions: Question[]
  mode: 'flashcard' | 'multiple-choice' | 'type-answer' | 'audio-quiz'
  materialType?: string
  level?: string
}

export function PracticeEngine({ questions, mode, materialType = 'vocabulary' }: PracticeEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  const [flashcardRevealed, setFlashcardRevealed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [zenMode, setZenMode] = useState(false)

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(questions)
  const { playAudio } = useAudio()

  // 1. Set mounted state dan acak soal di client
  useEffect(() => {
    setIsMounted(true)
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
  }, [questions])

  const currentQuestion = shuffledQuestions[currentIndex] || questions[currentIndex]

  // Otomatis putar audio jika mode === 'audio-quiz'
  useEffect(() => {
    if (mode === 'audio-quiz' && currentQuestion && isMounted) {
      const textToPlay = currentQuestion.audioText || currentQuestion.front
      playAudio(`practice-audio-${currentQuestion.id}`, textToPlay)
    }
  }, [mode, currentIndex, currentQuestion, isMounted, playAudio])

  // Simpan hasil attempt ke database via API
  const saveAttemptToDb = useCallback(async (materialId: string, correct: boolean) => {
    try {
      const targetType = currentQuestion?.materialType || materialType
      await fetch('/api/practice/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialType: targetType,
          materialId,
          isCorrect: correct,
        }),
      })
    } catch (err) {
      console.error('Gagal merekam practice attempt:', err)
    }
  }, [currentQuestion, materialType])

  // Generate Pilihan Ganda (digunakan untuk 'multiple-choice' dan 'audio-quiz')
  const isChoiceMode = mode === 'multiple-choice' || mode === 'audio-quiz'
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    if (!isChoiceMode || !currentQuestion) {
      setOptions([])
      return
    }
    const pool = shuffledQuestions.length > 0 ? shuffledQuestions : questions
    const wrongOptions = pool
      .filter(q => q.id !== currentQuestion.id && q.back && q.back !== currentQuestion.back)
      .map(q => q.back)
    const uniqueWrong = Array.from(new Set(wrongOptions))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    const combined = [...uniqueWrong, currentQuestion.back]
    const shuffled = combined.sort(() => Math.random() - 0.5)
    setOptions(shuffled)
  }, [isChoiceMode, currentQuestion, shuffledQuestions, questions])

  const handleFlashcardReveal = useCallback(() => {
    setFlashcardRevealed(true)
  }, [])

  const handleFlashcardGrade = useCallback((memorized: boolean) => {
    setIsCorrect(memorized)
    if (memorized) setScore(s => s + 1)
    setShowFeedback(true)
    setFlashcardRevealed(false)
    if (currentQuestion) {
      saveAttemptToDb(currentQuestion.id, memorized)
    }
  }, [currentQuestion, saveAttemptToDb])

  const handleMultipleChoice = useCallback((selectedOption: string) => {
    if (showFeedback || !currentQuestion) return
    const correct = selectedOption === currentQuestion.back
    setIsCorrect(correct)
    if (correct) setScore(s => s + 1)
    setUserAnswer(selectedOption)
    setShowFeedback(true)

    saveAttemptToDb(currentQuestion.id, correct)
  }, [showFeedback, currentQuestion, saveAttemptToDb])

  const handleTypeAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (showFeedback || !currentQuestion) return

    const correct =
      userAnswer.trim().toLowerCase() === currentQuestion.romaji?.toLowerCase() ||
      userAnswer.trim().toLowerCase() === currentQuestion.back.toLowerCase()
    setIsCorrect(correct)
    if (correct) setScore(s => s + 1)
    setShowFeedback(true)

    saveAttemptToDb(currentQuestion.id, correct)
  }

  const handleNext = useCallback(() => {
    if (currentIndex + 1 < (shuffledQuestions.length || questions.length)) {
      setCurrentIndex(c => c + 1)
      setShowFeedback(false)
      setFlashcardRevealed(false)
      setUserAnswer('')
      setIsCorrect(false)
    } else {
      setIsFinished(true)
    }
  }, [currentIndex, shuffledQuestions.length, questions.length])

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setShowFeedback(false)
    setFlashcardRevealed(false)
    setUserAnswer('')
    setIsFinished(false)
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
  }

  // KEYBOARD SHORTCUTS INTEGRATION
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in input and not pressing Enter
      const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement

      // Toggle Zen Mode with 'Z' key when outside input
      if (!isInput && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault()
        setZenMode(z => !z)
        return
      }

      // If Escape key pressed, exit Zen mode
      if (e.key === 'Escape' && zenMode) {
        setZenMode(false)
        return
      }

      // Next question action (Space or Enter when feedback is visible)
      if (showFeedback) {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault()
          handleNext()
          return
        }
      }

      // Flashcard controls
      if (mode === 'flashcard') {
        if (!flashcardRevealed && !showFeedback && e.code === 'Space') {
          e.preventDefault()
          handleFlashcardReveal()
          return
        }
        if (flashcardRevealed && !showFeedback) {
          if (e.key === '1') {
            e.preventDefault()
            handleFlashcardGrade(false)
            return
          }
          if (e.key === '2') {
            e.preventDefault()
            handleFlashcardGrade(true)
            return
          }
        }
      }

      // Choice mode controls (1, 2, 3, 4)
      if (isChoiceMode && !showFeedback && !isInput) {
        const keyNum = parseInt(e.key)
        if (keyNum >= 1 && keyNum <= options.length) {
          e.preventDefault()
          handleMultipleChoice(options[keyNum - 1])
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    showFeedback,
    flashcardRevealed,
    mode,
    isChoiceMode,
    options,
    zenMode,
    handleNext,
    handleFlashcardReveal,
    handleFlashcardGrade,
    handleMultipleChoice,
  ])

  // Loading state jika belum mounted di client
  if (!isMounted || !currentQuestion) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Finished State
  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6 py-12 px-4">
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-full w-20 h-20 mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Latihan Selesai! 🎉
        </h2>
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xs border border-zinc-200 dark:border-zinc-800 space-y-2">
          <p className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
            {score} <span className="text-2xl text-zinc-400 font-normal">/ {shuffledQuestions.length}</span>
          </p>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Akurasi: {Math.round((score / shuffledQuestions.length) * 100)}%
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleRestart} size="lg" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Ulangi Latihan
          </Button>
          {zenMode && (
            <Button variant="outline" size="lg" onClick={() => setZenMode(false)}>
              Keluar Mode Zen
            </Button>
          )}
        </div>
      </div>
    )
  }

  const mainContent = (
    <div className={`space-y-6 ${zenMode ? 'max-w-2xl w-full' : 'max-w-2xl mx-auto'}`}>
      {/* Top Bar: Progress, Skor & Zen Mode Toggle */}
      <div className="flex justify-between items-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            Soal {currentIndex + 1}
          </span>
          <span>/ {shuffledQuestions.length}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-medium text-indigo-600 dark:text-indigo-400">
            Skor: {score}
          </span>
          <button
            onClick={() => setZenMode(!zenMode)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Mode Fokus Zen (Shortcut: Z)"
          >
            {zenMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Normal</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Mode Zen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-2xl shadow-xs border border-zinc-200/80 dark:border-zinc-800 min-h-[300px] flex flex-col justify-center items-center text-center space-y-5">
        {/* Tampilan Teks Soal / Audio Quiz */}
        {mode === 'audio-quiz' ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="p-5 bg-indigo-50 dark:bg-indigo-950/40 rounded-full text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              <Volume2 className="w-10 h-10" />
            </div>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Dengarkan audio dan pilih artinya
            </p>
            <AudioButton
              audioUrl={`practice-audio-${currentQuestion.id}`}
              onClick={() =>
                playAudio(`practice-audio-${currentQuestion.id}`, currentQuestion.audioText || currentQuestion.front)
              }
              size="lg"
            />
          </div>
        ) : (
          <>
            <div className="text-5xl sm:text-6xl font-bold text-zinc-900 dark:text-zinc-100 font-japanese tracking-wide">
              {currentQuestion.front}
            </div>

            {mode !== 'flashcard' && (
              <AudioButton
                audioUrl={`practice-${currentQuestion.id}`}
                onClick={() =>
                  playAudio(`practice-${currentQuestion.id}`, currentQuestion.audioText || currentQuestion.front)
                }
                size="md"
              />
            )}
          </>
        )}

        {/* --- FLASHCARD --- */}
        {mode === 'flashcard' && !flashcardRevealed && !showFeedback && (
          <div className="pt-2">
            <Button
              onClick={handleFlashcardReveal}
              variant="outline"
              size="lg"
              className="px-6 py-5 rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              Lihat Jawaban
              <kbd className="ml-2 px-2 py-0.5 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-500">
                Spasi
              </kbd>
            </Button>
          </div>
        )}

        {/* Step 2: Jawaban terbuka + tombol self-grading */}
        {mode === 'flashcard' && flashcardRevealed && !showFeedback && (
          <div className="w-full space-y-4 mt-2">
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-5 rounded-xl w-full border border-zinc-200/80 dark:border-zinc-800">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {currentQuestion.back}
              </p>
              {currentQuestion.romaji && (
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
                  {currentQuestion.romaji}
                </p>
              )}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
              Apakah kamu sudah hafal kata ini?
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <button
                onClick={() => handleFlashcardGrade(false)}
                className="py-3 px-4 text-sm font-medium border rounded-xl bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Belum Hafal</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-200/60 dark:bg-red-900/60">
                  1
                </kbd>
              </button>
              <button
                onClick={() => handleFlashcardGrade(true)}
                className="py-3 px-4 text-sm font-medium border rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sudah Hafal</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-200/60 dark:bg-emerald-900/60">
                  2
                </kbd>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Feedback setelah grading */}
        {mode === 'flashcard' && showFeedback && (
          <div className="bg-zinc-50 dark:bg-zinc-800/60 p-5 rounded-xl w-full border border-zinc-200/80 dark:border-zinc-800">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {currentQuestion.back}
            </p>
            {currentQuestion.romaji && (
              <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
                {currentQuestion.romaji}
              </p>
            )}
          </div>
        )}

        {/* --- MULTIPLE CHOICE & AUDIO QUIZ --- */}
        {isChoiceMode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-2">
            {options.map((option, index) => {
              let btnClass =
                'w-full py-3.5 px-4 text-base font-medium transition-all border rounded-xl flex items-center justify-between text-left '

              if (showFeedback) {
                if (option === currentQuestion.back) {
                  btnClass +=
                    'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 '
                } else if (option === userAnswer) {
                  btnClass += 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-300 '
                } else {
                  btnClass += 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 opacity-40 '
                }
              } else {
                btnClass +=
                  'bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-xs '
              }

              return (
                <button
                  key={`${option}-${index}`}
                  onClick={() => handleMultipleChoice(option)}
                  disabled={showFeedback}
                  className={btnClass}
                >
                  <span className="truncate pr-2">{option}</span>
                  <kbd className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700 shrink-0">
                    {index + 1}
                  </kbd>
                </button>
              )
            })}
          </div>
        )}

        {/* --- TYPE ANSWER --- */}
        {mode === 'type-answer' && (
          <form onSubmit={handleTypeAnswerSubmit} className="w-full mt-2 space-y-3 max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Ketik romaji atau arti..."
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              disabled={showFeedback}
              className="text-center text-lg py-6 rounded-xl"
              autoFocus
            />
            {!showFeedback && (
              <Button type="submit" className="w-full py-5 rounded-xl" size="lg">
                Cek Jawaban
              </Button>
            )}
          </form>
        )}

        {/* Feedback Area */}
        {showFeedback && (
          <div
            className={`mt-4 p-4 rounded-xl w-full ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50'
                : 'bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-1.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`font-bold text-sm ${
                  isCorrect
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                {isCorrect ? 'Benar!' : 'Salah!'}
              </span>
            </div>
            {mode === 'audio-quiz' && (
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-japanese mb-1">
                {currentQuestion.front}
              </p>
            )}
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Jawaban: <strong className="font-semibold">{currentQuestion.back}</strong>
            </p>
            {currentQuestion.romaji && (
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Romaji: {currentQuestion.romaji}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Next Button */}
      {showFeedback && (
        <Button
          onClick={handleNext}
          className="w-full py-6 rounded-xl text-base flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          size="lg"
        >
          <span>
            {currentIndex + 1 === (shuffledQuestions.length || questions.length)
              ? 'Lihat Hasil Akhir'
              : 'Soal Berikutnya'}
          </span>
          <kbd className="text-xs font-mono px-2 py-0.5 rounded bg-white/20 text-white">
            Enter ↵
          </kbd>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      )}

      {/* Keyboard Shortcut Tips Footer */}
      <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400 dark:text-zinc-500 pt-1">
        <span className="flex items-center gap-1">
          <Keyboard className="w-3.5 h-3.5" />
          <span>Shortcut aktif</span>
        </span>
        <span>•</span>
        <span>
          {mode === 'flashcard'
            ? 'Spasi = Buka · 1/2 = Hafal/Belum'
            : isChoiceMode
            ? 'Angka 1-4 = Pilih Jawaban'
            : 'Enter = Kirim'}
        </span>
        <span>•</span>
        <span>Z = Zen Mode</span>
      </div>
    </div>
  )

  if (zenMode) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 flex flex-col justify-center items-center p-4 sm:p-8 overflow-y-auto">
        {mainContent}
      </div>
    )
  }

  return mainContent
}
