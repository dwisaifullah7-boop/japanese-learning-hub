'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Volume2 } from 'lucide-react'
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
  mode: 'flashcard' | 'multiple-choice' | 'type-answer' | 'audio-quiz'
  materialType?: string
}

export function PracticeEngine({ questions, mode, materialType = 'vocabulary' }: PracticeEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  const [flashcardRevealed, setFlashcardRevealed] = useState(false) // Flashcard: jawaban sudah terbuka, belum dinilai
  const [isMounted, setIsMounted] = useState(false)
  
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(questions)
  const { playAudio, autoPlay } = useAudio()

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
  }, [mode, currentIndex, currentQuestion, isMounted])

  // Simpan hasil attempt ke database via API
  const saveAttemptToDb = async (materialId: string, correct: boolean) => {
    try {
      await fetch('/api/practice/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialType,
          materialId,
          isCorrect: correct,
        }),
      })
    } catch (err) {
      console.error('Gagal merekam practice attempt:', err)
    }
  }

  // Generate Pilihan Ganda (digunakan untuk 'multiple-choice' dan 'audio-quiz')
  const isChoiceMode = mode === 'multiple-choice' || mode === 'audio-quiz'

  const [options, setOptions] = useState<string[]>([]);

  // Generate options for multiple-choice and audio-quiz modes
  useEffect(() => {
    if (!isChoiceMode || !currentQuestion) {
      setOptions([]);
      return;
    }
    const pool = shuffledQuestions.length > 0 ? shuffledQuestions : questions;
    // Get wrong options from other questions
    const wrongOptions = pool
      .filter(q => q.id !== currentQuestion.id && q.back && q.back !== currentQuestion.back)
      .map(q => q.back);
    // Ensure uniqueness and pick up to 3
    const uniqueWrong = Array.from(new Set(wrongOptions))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    // Combine with correct answer and shuffle
    const combined = [...uniqueWrong, currentQuestion.back];
    const shuffled = combined.sort(() => Math.random() - 0.5);
    setOptions(shuffled);
  }, [isChoiceMode, currentQuestion, shuffledQuestions, questions]);

  const handleFlashcardReveal = () => {
    setFlashcardRevealed(true) // Hanya buka jawaban, belum simpan ke DB
  }

  const handleFlashcardGrade = (memorized: boolean) => {
    setIsCorrect(memorized)
    if (memorized) setScore(s => s + 1)
    setShowFeedback(true)
    setFlashcardRevealed(false)
    if (currentQuestion) {
      saveAttemptToDb(currentQuestion.id, memorized)
    }
  }

  const handleMultipleChoice = (selectedOption: string) => {
    if (showFeedback || !currentQuestion) return
    const correct = selectedOption === currentQuestion.back
    setIsCorrect(correct)
    if (correct) setScore(s => s + 1)
    setUserAnswer(selectedOption)
    setShowFeedback(true)

    // Simpan attempt ke database
    saveAttemptToDb(currentQuestion.id, correct)
  }

  const handleTypeAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (showFeedback || !currentQuestion) return
    
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.romaji?.toLowerCase() || 
                    userAnswer.trim().toLowerCase() === currentQuestion.back.toLowerCase()
    setIsCorrect(correct)
    if (correct) setScore(s => s + 1)
    setShowFeedback(true)

    // Simpan attempt ke database
    saveAttemptToDb(currentQuestion.id, correct)
  }

  const handleNext = () => {
    if (currentIndex + 1 < (shuffledQuestions.length || questions.length)) {
      setCurrentIndex(c => c + 1)
      setShowFeedback(false)
      setFlashcardRevealed(false)
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
    setFlashcardRevealed(false)
    setUserAnswer('')
    setIsFinished(false)
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
  }

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
        
        {/* Tampilan Teks Soal / Audio Quiz */}
        {mode === 'audio-quiz' ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="p-6 bg-blue-50 rounded-full text-blue-600 border border-blue-200 animate-bounce">
              <Volume2 className="w-12 h-12" />
            </div>
            <p className="text-sm font-semibold text-blue-700">Dengarkan audio dan pilih artinya!</p>
            <AudioButton 
              audioUrl={`practice-audio-${currentQuestion.id}`}
              onClick={() => playAudio(`practice-audio-${currentQuestion.id}`, currentQuestion.audioText || currentQuestion.front)}
              size="lg"
            />
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* --- FLASHCARD --- */}
        {/* Step 1: Tombol reveal */}
        {mode === 'flashcard' && !flashcardRevealed && !showFeedback && (
          <Button onClick={handleFlashcardReveal} variant="outline" size="lg" className="mt-4">
            Klik untuk melihat jawaban
          </Button>
        )}

        {/* Step 2: Jawaban terbuka + tombol self-grading */}
        {mode === 'flashcard' && flashcardRevealed && !showFeedback && (
          <div className="w-full space-y-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg w-full border border-gray-200">
              <p className="text-2xl font-bold text-gray-900">{currentQuestion.back}</p>
              {currentQuestion.romaji && (
                <p className="text-sm text-blue-600 mt-1">{currentQuestion.romaji}</p>
              )}
            </div>
            <p className="text-sm text-gray-500 text-center">Apakah kamu sudah hafal?</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleFlashcardGrade(false)}
                className="py-3 px-4 text-base font-medium border-2 rounded-lg bg-red-50 border-red-300 text-red-700 hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" /> Belum Hafal
              </button>
              <button
                onClick={() => handleFlashcardGrade(true)}
                className="py-3 px-4 text-base font-medium border-2 rounded-lg bg-green-50 border-green-300 text-green-700 hover:bg-green-100 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" /> Sudah Hafal
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Feedback setelah grading */}
        {mode === 'flashcard' && showFeedback && (
          <div className="bg-gray-50 p-4 rounded-lg w-full border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{currentQuestion.back}</p>
            {currentQuestion.romaji && (
              <p className="text-sm text-blue-600 mt-1">{currentQuestion.romaji}</p>
            )}
          </div>
        )}

        {/* --- MULTIPLE CHOICE & AUDIO QUIZ --- */}
        {isChoiceMode && (
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
            {mode === 'audio-quiz' && (
              <p className="text-xl font-bold text-gray-900 font-japanese mb-1">{currentQuestion.front}</p>
            )}
            <p className="text-gray-700">Jawaban: <strong>{currentQuestion.back}</strong></p>
            {currentQuestion.romaji && <p className="text-sm text-gray-500">Romaji: {currentQuestion.romaji}</p>}
          </div>
        )}
      </div>

      {/* Next Button */}
      {showFeedback && (
        <Button onClick={handleNext} className="w-full" size="lg">
          {currentIndex + 1 === (shuffledQuestions.length || questions.length) ? 'Lihat Hasil' : 'Soal Berikutnya'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  )
}
