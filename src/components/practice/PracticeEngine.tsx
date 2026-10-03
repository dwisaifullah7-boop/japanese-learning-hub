'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react'
import { AudioButton } from '@/components/shared/AudioButton'
import { useAudio } from '@/components/providers/AudioProvider'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

interface Question {
  id: string
  front: string 
  back: string  
  romaji?: string
  audioText?: string
}

interface PracticeEngineProps {
  questions: Question[]
  mode: 'flashcard' | 'multiple-choice' | 'type-answer'
}

export function PracticeEngine({ questions, mode }: PracticeEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [options, setOptions] = useState<string[]>([]) // State khusus untuk pilihan ganda
  const { playAudio } = useAudio()

  // 1. Acak soal HANYA saat komponen dimuat
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
  }, [questions])

  // 2. Generate Pilihan Ganda SETIAP soal berganti
  useEffect(() => {
    if (mode === 'multiple-choice' && shuffledQuestions.length > 0) {
      const currentQ = shuffledQuestions[currentIndex]
      if (!currentQ) return

      // Ambil 3 jawaban salah dari soal lain
      const wrongOptions = shuffledQuestions
        .filter(q => q.id !== currentQ.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(q => q.back)
      
      // Gabungkan dengan 1 jawaban benar, lalu acak lagi
      const allOptions = [...wrongOptions, currentQ.back].sort(() => Math.random() - 0.5)
      setOptions(allOptions)
    }
  }, [mode, currentIndex, shuffledQuestions])

  const currentQuestion = shuffledQuestions[currentIndex]

  const handleFlashcardReveal = () => setShowFeedback(true)

  const handleMultipleChoice = (selectedOption: string) => {
    if (showFeedback || !currentQuestion) return
    const correct = selectedOption === currentQuestion.back
    setIsCorrect(correct)
    if (correct) setScore(s => s + 1)
    setUserAnswer(selectedOption) // Simpan jawaban user untuk highlight merah
    setShowFeedback(true)
  }

  const handleTypeAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (showFeedback || !currentQuestion) return
    
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.romaji?.toLowerCase() || 
                    userAnswer.trim().toLowerCase() === currentQuestion.back.toLowerCase()
    setIsCorrect(correct)
    if (correct) setScore(s => s + 1)
    setShowFeedback(true)
  }

  const handleNext = () => {
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex(c => c + 1)
      setShowFeedback(false)
      setUserAnswer('')
      setIsCorrect(false)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setShowFeedback(false)
    setUserAnswer('')
    setIsFinished(false)
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
  }

  // Loading State
  if (shuffledQuestions.length === 0 || !currentQuestion) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Finished State
  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900">Latihan Selesai! 🎉</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <p className="text-6xl font-bold text-blue-600 mb-2">{score} / {shuffledQuestions.length}</p>
          <p className="text-gray-600">Jawaban Benar</p>
        </div>
        <Button onClick={handleRestart} size="lg" className="flex items-center gap-2 mx-auto">
          <RotateCcw className="w-5 h-5" /> Ulangi Latihan
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Soal {currentIndex + 1} dari {shuffledQuestions.length}</span>
        <span>Skor: {score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 min-h-[300px] flex flex-col justify-center items-center text-center space-y-4">
        <div className="text-6xl font-bold text-gray-900 font-japanese mb-2">
          {currentQuestion.front}
        </div>
        
        {mode !== 'flashcard' && (
          <AudioButton 
            audioUrl={`practice-${currentQuestion.id}`}
            onClick={() => playAudio(`practice-${currentQuestion.id}`, currentQuestion.audioText || currentQuestion.front)}
            size="md"
          />
        )}

        {/* --- FLASHCARD --- */}
        {mode === 'flashcard' && !showFeedback && (
          <Button onClick={handleFlashcardReveal} variant="outline" size="lg" className="mt-4">
            Klik untuk melihat jawaban
          </Button>
        )}

        {/* --- MULTIPLE CHOICE --- */}
        {mode === 'multiple-choice' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
            {options.map((option, index) => {
              let btnClass = "w-full py-4 text-lg font-medium transition-all border-2 rounded-lg "
              
              if (showFeedback) {
                if (option === currentQuestion.back) {
                  btnClass += "bg-green-100 border-green-500 text-green-700 "
                } else if (option === userAnswer) {
                  btnClass += "bg-red-100 border-red-500 text-red-700 "
                } else {
                  btnClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-50 "
                }
              } else {
                btnClass += "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer "
              }
              
              return (
                <button
                  key={`${option}-${index}`} 
                  onClick={() => handleMultipleChoice(option)}
                  disabled={showFeedback}
                  className={btnClass}
                >
                  {option}
                </button>
              )
            })}
          </div>
        )}

        {/* --- TYPE ANSWER --- */}
        {mode === 'type-answer' && (
          <form onSubmit={handleTypeAnswerSubmit} className="w-full mt-4 space-y-3">
            <Input
              type="text"
              placeholder="Ketik romaji atau arti..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showFeedback}
              className="text-center text-lg py-6"
              autoFocus
            />
            {!showFeedback && (
              <Button type="submit" className="w-full" size="lg">Cek Jawaban</Button>
            )}
          </form>
        )}

        {/* Feedback Area */}
        {showFeedback && (
          <div className={`mt-4 p-4 rounded-lg w-full ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {isCorrect ? <CheckCircle2 className="text-green-600" /> : <XCircle className="text-red-600" />}
              <span className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? 'Benar!' : 'Salah!'}
              </span>
            </div>
            <p className="text-gray-700">Jawaban: <strong>{currentQuestion.back}</strong></p>
            {currentQuestion.romaji && <p className="text-sm text-gray-500">Romaji: {currentQuestion.romaji}</p>}
          </div>
        )}
      </div>

      {/* Next Button */}
      {showFeedback && (
        <Button onClick={handleNext} className="w-full" size="lg">
          {currentIndex + 1 === shuffledQuestions.length ? 'Lihat Hasil' : 'Soal Berikutnya'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  )
}
