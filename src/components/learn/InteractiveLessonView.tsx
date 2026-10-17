'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AudioButton } from '@/components/shared/AudioButton'
import {
  BookOpen,
  Languages,
  Type,
  FileText,
  BookMarked,
  Sparkles,
  PenTool,
  ArrowRight,
  RotateCcw,
  Layers,
  Award,
  ChevronLeft,
  ChevronRight,
  Volume2
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LessonData {
  id: string
  title: string
  description?: string | null
  order: number
  course: {
    title: string
  }
  hiragana: Array<{ id: string; character: string; romaji: string; example?: string | null }>
  katakana: Array<{ id: string; character: string; romaji: string; example?: string | null }>
  kanji: Array<{
    id: string
    character: string
    hiragana?: string | null
    romaji?: string | null
    meaning?: string | null
    onyomi?: string | null
    kunyomi?: string | null
    jlptLevel?: string | null
  }>
  vocabulary: Array<{
    id: string
    word: string
    kanji?: string | null
    kana?: string | null
    romaji?: string | null
    meaning?: string | null
    wordType?: string | null
  }>
  particles: Array<{
    id: string
    particle: string
    reading?: string | null
    meaning?: string | null
    function?: string | null
    pattern?: string | null
    example?: string | null
    translation?: string | null
  }>
  grammar: Array<{
    id: string
    pattern: string
    meaning?: string | null
    usage?: string | null
    example?: string | null
    translation?: string | null
    note?: string | null
  }>
}

export function InteractiveLessonView({ lesson }: { lesson: LessonData }) {
  const [activeTab, setActiveTab] = useState<'all' | 'vocabulary' | 'kanji' | 'grammar' | 'particles' | 'kana'>('all')
  const [flashcardMode, setFlashcardMode] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  // Aggregate flashcard items (vocab + kanji)
  const flashcardDeck = [
    ...lesson.vocabulary.map(v => ({
      type: 'Kosakata',
      front: v.kanji || v.kana || v.word,
      subFront: v.kanji ? v.kana : undefined,
      back: v.meaning || '',
      romaji: v.romaji || '',
      audio: v.kana || v.word,
    })),
    ...lesson.kanji.map(k => ({
      type: 'Kanji',
      front: k.character,
      subFront: k.hiragana || undefined,
      back: `${k.meaning} (On: ${k.onyomi || '-'}, Kun: ${k.kunyomi || '-'})`,
      romaji: k.romaji || '',
      audio: k.hiragana || k.character,
    })),
  ]

  const totalContent =
    lesson.vocabulary.length +
    lesson.kanji.length +
    lesson.particles.length +
    lesson.grammar.length +
    lesson.hiragana.length +
    lesson.katakana.length

  const handleNextCard = () => {
    setIsFlipped(false)
    setCardIndex(prev => (prev + 1) % flashcardDeck.length)
  }

  const handlePrevCard = () => {
    setIsFlipped(false)
    setCardIndex(prev => (prev - 1 + flashcardDeck.length) % flashcardDeck.length)
  }

  return (
    <div className="space-y-6">
      {/* Quick Action & Milestone Bar */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {lesson.course.title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total {totalContent} Materi Pembelajaran
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Kuasai bab ini dengan latihan soal atau flashcard interaktif
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant={flashcardMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFlashcardMode(!flashcardMode)}
            className="flex-1 sm:flex-none rounded-xl dark:border-slate-700"
          >
            <Layers className="w-4 h-4 mr-1.5" />
            {flashcardMode ? 'Mode List' : 'Mode Flashcard'}
          </Button>

          <Link href={`/exam/session?preset=bab${lesson.order}`} className="flex-1 sm:flex-none">
            <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs">
              <Award className="w-4 h-4 mr-1.5" />
              Ujian Bab {lesson.order}
            </Button>
          </Link>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {flashcardMode && flashcardDeck.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-blue-50/60 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 p-6 sm:p-8 rounded-3xl border border-indigo-100 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
                {flashcardDeck[cardIndex].type}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Kartu {cardIndex + 1} dari {flashcardDeck.length}
              </span>
            </div>
            <AudioButton text={flashcardDeck[cardIndex].audio} size="sm" />
          </div>

          {/* 3D Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[220px] sm:min-h-[260px] perspective-1000 flex items-center justify-center"
          >
            <div
              className={`w-full max-w-lg p-8 rounded-3xl border bg-white dark:bg-slate-800 shadow-lg text-center transition-all duration-500 transform-style-preserve-3d flex flex-col items-center justify-center space-y-3 ${
                isFlipped
                  ? 'border-indigo-400 dark:border-indigo-500 shadow-indigo-100 dark:shadow-indigo-950/50'
                  : 'border-gray-200 dark:border-slate-700 hover:scale-[1.02]'
              }`}
            >
              {!isFlipped ? (
                <>
                  <p className="text-4xl sm:text-5xl font-black font-japanese text-gray-900 dark:text-white">
                    {flashcardDeck[cardIndex].front}
                  </p>
                  {flashcardDeck[cardIndex].subFront && (
                    <p className="text-base text-indigo-600 dark:text-indigo-400 font-japanese font-medium">
                      {flashcardDeck[cardIndex].subFront}
                    </p>
                  )}
                  {flashcardDeck[cardIndex].romaji && (
                    <p className="text-xs text-gray-400 tracking-wider">
                      {flashcardDeck[cardIndex].romaji}
                    </p>
                  )}
                  <p className="text-[11px] text-gray-400 pt-2 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> Klik untuk melihat arti
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Arti & Makna:
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    {flashcardDeck[cardIndex].back}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-japanese">
                    {flashcardDeck[cardIndex].front}
                  </p>
                  <p className="text-[11px] text-gray-400 pt-2 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> Klik untuk kembali
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Flashcard Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevCard}
              className="rounded-xl px-4 dark:border-slate-700"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Sebelumnya
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleNextCard}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-4"
            >
              Berikutnya
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* FILTER TABS */}
      {!flashcardMode && (
        <>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-slate-800">
            {[
              { id: 'all', label: `Semua (${totalContent})` },
              { id: 'vocabulary', label: `Kosakata (${lesson.vocabulary.length})` },
              { id: 'kanji', label: `Kanji (${lesson.kanji.length})` },
              { id: 'grammar', label: `Grammar (${lesson.grammar.length})` },
              { id: 'particles', label: `Partikel (${lesson.particles.length})` },
              { id: 'kana', label: `Huruf Kana (${lesson.hiragana.length + lesson.katakana.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200/80 dark:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* VOCABULARY SECTION */}
          {(activeTab === 'all' || activeTab === 'vocabulary') && lesson.vocabulary.length > 0 && (
            <section className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-between text-white">
                <h3 className="font-bold flex items-center gap-2 text-sm sm:text-base">
                  <BookMarked className="w-5 h-5" />
                  Kosakata ({lesson.vocabulary.length} Kata)
                </h3>
                <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full">Audio Tersedia</span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.vocabulary.map(v => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-800/60 hover-float transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-center min-w-[55px]">
                        {v.kanji && <p className="text-lg font-bold font-japanese text-gray-900 dark:text-white leading-tight">{v.kanji}</p>}
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-japanese font-medium">{v.kana}</p>
                      </div>
                      <div className="border-l border-gray-200 dark:border-slate-700 pl-3">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{v.meaning}</p>
                        <p className="text-[11px] text-gray-400">{v.romaji} {v.wordType ? `• ${v.wordType}` : ''}</p>
                      </div>
                    </div>
                    <AudioButton text={v.kana || v.word} size="sm" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* KANJI SECTION */}
          {(activeTab === 'all' || activeTab === 'kanji') && lesson.kanji.length > 0 && (
            <section className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-rose-600 to-pink-600 flex items-center justify-between text-white">
                <h3 className="font-bold flex items-center gap-2 text-sm sm:text-base">
                  <FileText className="w-5 h-5" />
                  Kanji ({lesson.kanji.length} Karakter)
                </h3>
                <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full">N5 Curriculum</span>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {lesson.kanji.map(k => (
                  <div
                    key={k.id}
                    className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-800/60 text-center space-y-1.5 hover-float transition-all"
                  >
                    <p className="text-3xl font-black font-japanese text-gray-900 dark:text-white">{k.character}</p>
                    <p className="text-xs font-bold text-rose-600 dark:text-rose-400">{k.meaning}</p>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 space-y-0.5">
                      {k.onyomi && <p>On: {k.onyomi}</p>}
                      {k.kunyomi && <p>Kun: {k.kunyomi}</p>}
                    </div>
                    <div className="pt-1 flex justify-center">
                      <AudioButton text={k.hiragana || k.character} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* GRAMMAR SECTION */}
          {(activeTab === 'all' || activeTab === 'grammar') && lesson.grammar.length > 0 && (
            <section className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-between text-white">
                <h3 className="font-bold flex items-center gap-2 text-sm sm:text-base">
                  <PenTool className="w-5 h-5" />
                  Tata Bahasa / Pola Kalimat ({lesson.grammar.length} Pola)
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {lesson.grammar.map(g => (
                  <div
                    key={g.id}
                    className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-800/60 space-y-2 hover-float transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base font-japanese text-emerald-700 dark:text-emerald-400">
                        {g.pattern}
                      </span>
                      {g.example && <AudioButton text={g.example} size="sm" />}
                    </div>
                    {g.meaning && <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{g.meaning}</p>}
                    {g.usage && <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{g.usage}</p>}
                    {g.example && (
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-gray-100 dark:border-slate-800 mt-2">
                        <p className="text-xs font-japanese font-bold text-gray-800 dark:text-gray-200">{g.example}</p>
                        {g.translation && <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{g.translation}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PARTICLES SECTION */}
          {(activeTab === 'all' || activeTab === 'particles') && lesson.particles.length > 0 && (
            <section className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-between text-white">
                <h3 className="font-bold flex items-center gap-2 text-sm sm:text-base">
                  <Sparkles className="w-5 h-5" />
                  Partikel ({lesson.particles.length} Pola Partikel)
                </h3>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.particles.map(p => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-800/60 space-y-2 hover-float transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black font-japanese text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/70 px-3 py-1 rounded-lg">
                        {p.particle}
                      </span>
                      {p.example && <AudioButton text={p.example} size="sm" />}
                    </div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-100">{p.meaning}</p>
                    {p.pattern && <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Pola: {p.pattern}</p>}
                    {p.example && (
                      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-gray-100 dark:border-slate-800">
                        <p className="text-xs font-japanese font-medium text-gray-800 dark:text-gray-200">{p.example}</p>
                        {p.translation && <p className="text-[11px] text-gray-500 dark:text-gray-400">{p.translation}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* KANA SECTION */}
          {(activeTab === 'all' || activeTab === 'kana') && (lesson.hiragana.length > 0 || lesson.katakana.length > 0) && (
            <section className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Karakter Kana Dasar
              </div>
              <div className="p-4 flex flex-wrap gap-2.5">
                {[...lesson.hiragana, ...lesson.katakana].map(k => (
                  <div
                    key={k.id}
                    className="w-14 h-14 bg-purple-50/80 dark:bg-slate-800 border border-purple-200/80 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center hover-float transition-all"
                  >
                    <span className="text-xl font-bold font-japanese text-gray-900 dark:text-white">{k.character}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{k.romaji}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
