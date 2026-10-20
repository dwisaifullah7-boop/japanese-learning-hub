'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AudioButton } from '@/components/shared/AudioButton'
import {
  BookOpen,
  Languages,
  FileText,
  BookMarked,
  Sparkles,
  Layers,
  Award,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  GraduationCap,
  FileSpreadsheet,
  ArrowRight,
  PenTool
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
  const [activeTab, setActiveTab] = useState<
    'all' | 'cheatsheet' | 'vocabulary' | 'kanji' | 'grammar' | 'particles' | 'kana'
  >('cheatsheet')
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
      <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {lesson.course.title}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Total {totalContent} item materi
            </span>
          </div>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Pilih cara belajarmu: baca rangkuman, hafalkan dengan flashcard, atau langsung uji pemahaman.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant={flashcardMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFlashcardMode(!flashcardMode)}
            className="flex-1 sm:flex-none rounded-xl"
          >
            <Layers className="w-4 h-4 mr-1.5" />
            {flashcardMode ? 'Daftar Materi' : 'Flashcard Bab Ini'}
          </Button>

          <Link
            href={`/practice/multiple-choice?type=vocabulary&babStart=${lesson.order}&babEnd=${lesson.order}`}
            className="flex-1 sm:flex-none"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-xl border-zinc-300 dark:border-zinc-700"
            >
              <PenTool className="w-4 h-4 mr-1.5" />
              Latihan Soal
            </Button>
          </Link>

          <Link href={`/exam/session?preset=bab${lesson.order}`} className="flex-1 sm:flex-none">
            <Button size="sm" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-xl shadow-xs">
              <Award className="w-4 h-4 mr-1.5" />
              Ujian Bab {lesson.order}
            </Button>
          </Link>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {flashcardMode && flashcardDeck.length > 0 && (
        <div className="bg-zinc-50 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
                {flashcardDeck[cardIndex].type}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
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
              className={`w-full max-w-lg p-8 rounded-2xl border bg-white dark:bg-zinc-900 shadow-sm text-center transition-all duration-300 flex flex-col items-center justify-center space-y-3 ${
                isFlipped
                  ? 'border-indigo-400 dark:border-indigo-500'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
              }`}
            >
              {!isFlipped ? (
                <>
                  <p className="text-4xl sm:text-5xl font-black font-japanese text-zinc-900 dark:text-zinc-100">
                    {flashcardDeck[cardIndex].front}
                  </p>
                  {flashcardDeck[cardIndex].subFront && (
                    <p className="text-base text-indigo-600 dark:text-indigo-400 font-japanese font-medium">
                      {flashcardDeck[cardIndex].subFront}
                    </p>
                  )}
                  {flashcardDeck[cardIndex].romaji && (
                    <p className="text-xs text-zinc-400 font-mono tracking-wider">
                      {flashcardDeck[cardIndex].romaji}
                    </p>
                  )}
                  <p className="text-[11px] text-zinc-400 pt-2 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> Klik untuk melihat arti
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Arti:
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    {flashcardDeck[cardIndex].back}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-japanese">
                    {flashcardDeck[cardIndex].front}
                  </p>
                  <p className="text-[11px] text-zinc-400 pt-2 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> Klik untuk membalik kembali
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
              className="rounded-xl px-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Sebelumnya
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleNextCard}
              className="rounded-xl px-4"
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
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800">
            {[
              { id: 'cheatsheet', label: `⚡ Rangkuman Kilat (Cheat Sheet)`, highlight: true },
              { id: 'all', label: `Semua (${totalContent})` },
              { id: 'grammar', label: `Tata Bahasa (${lesson.grammar.length})` },
              { id: 'particles', label: `Partikel (${lesson.particles.length})` },
              { id: 'vocabulary', label: `Kosakata (${lesson.vocabulary.length})` },
              { id: 'kanji', label: `Kanji (${lesson.kanji.length})` },
              { id: 'kana', label: `Huruf Kana (${lesson.hiragana.length + lesson.katakana.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? tab.highlight
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                    : tab.highlight
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ⚡ CHEAT SHEET / RANGKUMAN KILAT TAB */}
          {activeTab === 'cheatsheet' && (
            <div className="space-y-6">
              {/* Header Box Cheat Sheet */}
              <div className="p-5 rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 text-base">
                    <FileSpreadsheet className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    Cheat Sheet 2 Menit: Bab {lesson.order}
                  </h3>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                    Hafalan Kilat
                  </span>
                </div>
                <p className="text-xs text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                  Rangkuman ringkas ini menyaring poin-poin paling penting di Bab {lesson.order} agar kamu bisa mengulang dalam waktu 2 menit sebelum latihan atau ujian.
                </p>
              </div>

              {/* 1. Rangkuman Pola Tata Bahasa Utama */}
              {lesson.grammar.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    Pola Inti Tata Bahasa (Grammar Formulas)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lesson.grammar.map((g, idx) => (
                      <div
                        key={g.id}
                        className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                            Rumus #{idx + 1}
                          </span>
                          {g.example && <AudioButton text={g.example} size="sm" />}
                        </div>
                        <p className="font-bold text-sm font-japanese text-indigo-600 dark:text-indigo-400">
                          {g.pattern}
                        </p>
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                          {g.meaning}
                        </p>
                        {g.example && (
                          <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 text-xs space-y-0.5">
                            <p className="font-japanese font-medium text-zinc-900 dark:text-zinc-100">
                              {g.example}
                            </p>
                            {g.translation && (
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                {g.translation}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Partikel Kunci */}
              {lesson.particles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Partikel Kunci Bab Ini
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lesson.particles.map(p => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold font-japanese px-2.5 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40">
                            {p.particle}
                          </span>
                          {p.example && <AudioButton text={p.example} size="sm" />}
                        </div>
                        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          {p.meaning}
                        </p>
                        {p.pattern && (
                          <p className="text-[11px] font-mono text-zinc-500">
                            {p.pattern}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Kosakata Paling Sering Muncul */}
              {lesson.vocabulary.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-blue-600" />
                      Kosakata Utama (Daftar Cepat)
                    </h4>
                    <span className="text-xs text-zinc-500">
                      {lesson.vocabulary.slice(0, 12).length} kata kunci
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {lesson.vocabulary.slice(0, 12).map(v => (
                      <div
                        key={v.id}
                        className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold font-japanese text-sm text-zinc-900 dark:text-zinc-100">
                              {v.kanji || v.kana}
                            </span>
                            {v.kanji && (
                              <span className="text-[10px] text-zinc-400 font-japanese">
                                ({v.kana})
                              </span>
                            )}
                          </div>
                          <p className="text-zinc-600 dark:text-zinc-300 font-medium truncate">
                            {v.meaning}
                          </p>
                        </div>
                        <AudioButton text={v.kana || v.word} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Quick Test CTA */}
              <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Sudah hafal poin-poin di atas?
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Uji ingatanmu sekarang dengan 10 soal pilihan ganda dari Bab {lesson.order}.
                  </p>
                </div>
                <Link
                  href={`/practice/multiple-choice?type=vocabulary&babStart=${lesson.order}&babEnd=${lesson.order}`}
                >
                  <Button className="rounded-xl px-5 flex items-center gap-1.5">
                    Mulai Latihan <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* VOCABULARY SECTION */}
          {(activeTab === 'all' || activeTab === 'vocabulary') && lesson.vocabulary.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-indigo-600" />
                  Kosakata ({lesson.vocabulary.length} Kata)
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.vocabulary.map(v => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-center min-w-[55px]">
                        {v.kanji && (
                          <p className="text-lg font-bold font-japanese text-zinc-900 dark:text-zinc-100 leading-tight">
                            {v.kanji}
                          </p>
                        )}
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-japanese font-medium">
                          {v.kana}
                        </p>
                      </div>
                      <div className="border-l border-zinc-200 dark:border-zinc-800 pl-3">
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          {v.meaning}
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          {v.romaji} {v.wordType ? `• ${v.wordType}` : ''}
                        </p>
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
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-violet-600" />
                  Kanji ({lesson.kanji.length} Karakter)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {lesson.kanji.map(k => (
                  <div
                    key={k.id}
                    className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-3xl font-black font-japanese text-zinc-900 dark:text-zinc-100">
                        {k.character}
                      </span>
                      {k.jlptLevel && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border border-violet-200 dark:border-violet-900/40">
                          {k.jlptLevel}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {k.meaning}
                    </p>
                    <div className="text-[11px] text-zinc-500 space-y-0.5 border-t border-zinc-100 dark:border-zinc-800 pt-2">
                      <p>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">Onyomi:</span>{' '}
                        {k.onyomi || '-'}
                      </p>
                      <p>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">Kunyomi:</span>{' '}
                        {k.kunyomi || '-'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* GRAMMAR SECTION */}
          {(activeTab === 'all' || activeTab === 'grammar') && lesson.grammar.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Tata Bahasa ({lesson.grammar.length} Pola Kalimat)
                </h3>
              </div>
              <div className="space-y-3">
                {lesson.grammar.map(g => (
                  <div
                    key={g.id}
                    className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base font-japanese text-emerald-700 dark:text-emerald-400">
                        {g.pattern}
                      </span>
                      {g.example && <AudioButton text={g.example} size="sm" />}
                    </div>
                    {g.meaning && (
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {g.meaning}
                      </p>
                    )}
                    {g.usage && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {g.usage}
                      </p>
                    )}
                    {g.example && (
                      <div className="bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 mt-2">
                        <p className="text-xs font-japanese font-bold text-zinc-800 dark:text-zinc-200">
                          {g.example}
                        </p>
                        {g.translation && (
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {g.translation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PARTICLES SECTION */}
          {(activeTab === 'all' || activeTab === 'particles') && lesson.particles.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Partikel ({lesson.particles.length} Pola Partikel)
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.particles.map(p => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold font-japanese text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
                        {p.particle}
                      </span>
                      {p.example && <AudioButton text={p.example} size="sm" />}
                    </div>
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {p.meaning}
                    </p>
                    {p.pattern && (
                      <p className="text-xs text-zinc-500 font-mono">
                        Pola: {p.pattern}
                      </p>
                    )}
                    {p.example && (
                      <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800">
                        <p className="text-xs font-japanese font-medium text-zinc-800 dark:text-zinc-200">
                          {p.example}
                        </p>
                        {p.translation && (
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            {p.translation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* KANA SECTION */}
          {(activeTab === 'all' || activeTab === 'kana') &&
            (lesson.hiragana.length > 0 || lesson.katakana.length > 0) && (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-purple-600" />
                    Karakter Kana Dasar
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[...lesson.hiragana, ...lesson.katakana].map(k => (
                    <div
                      key={k.id}
                      className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center"
                    >
                      <span className="text-xl font-bold font-japanese text-zinc-900 dark:text-zinc-100">
                        {k.character}
                      </span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        {k.romaji}
                      </span>
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
