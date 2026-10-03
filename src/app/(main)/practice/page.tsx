import Link from 'next/link'
import { PageHeader } from '@/components/shared/PageHeader'
import { MaterialCard } from '@/components/shared/MaterialCard'
import { Layers, HelpCircle, Keyboard, Volume2, BookMarked, Languages, FileText, Sparkles, GraduationCap } from 'lucide-react'

export default function PracticePage() {
  const modes = [
    {
      title: 'Flashcard',
      description: 'Kartu bolak-balik untuk menghafal. Cocok untuk pengenalan awal.',
      icon: <Layers className="w-6 h-6" />,
      href: '/practice/flashcard?type=vocabulary',
    },
    {
      title: 'Multiple Choice',
      description: 'Pilih jawaban yang benar dari 4 pilihan. Menguji ingatan.',
      icon: <HelpCircle className="w-6 h-6" />,
      href: '/practice/multiple-choice?type=vocabulary',
    },
    {
      title: 'Type Answer',
      description: 'Ketik jawaban secara manual. Menguji ketepatan ejaan/romaji.',
      icon: <Keyboard className="w-6 h-6" />,
      href: '/practice/type-answer?type=vocabulary',
    },
    {
      title: 'Audio Quiz',
      description: 'Dengarkan pelafalan audio lalu pilih artinya. Menguji pendengaran.',
      icon: <Volume2 className="w-6 h-6" />,
      href: '/practice/audio-quiz?type=vocabulary',
    },
  ]

  const specializedQuizzes = [
    {
      title: 'Vocabulary Quiz',
      description: 'Kuis kosakata dasar dari Minna no Nihongo Bab 1.',
      icon: <BookMarked className="w-6 h-6" />,
      href: '/practice/multiple-choice?type=vocabulary',
    },
    {
      title: 'Hiragana Quiz',
      description: 'Kuis pengenalan 46 karakter dasar Hiragana.',
      icon: <Languages className="w-6 h-6" />,
      href: '/practice/multiple-choice?type=hiragana',
    },
    {
      title: 'Katakana Quiz',
      description: 'Kuis karakter Katakana untuk kata serapan asing.',
      icon: <Languages className="w-6 h-6" />,
      href: '/practice/multiple-choice?type=katakana',
    },
    {
      title: 'Kanji Quiz',
      description: 'Kuis karakter Kanji dasar, onyomi, kunyomi, & arti.',
      icon: <FileText className="w-6 h-6" />,
      href: '/practice/multiple-choice?type=kanji',
    },
    {
      title: 'Particle Quiz',
      description: 'Kuis penggunaan partikel tata bahasa (は, を, へ, dll).',
      icon: <Sparkles className="w-6 h-6" />,
      href: '/practice/multiple-choice?type=particle',
    },
    {
      title: 'Grammar Quiz',
      description: 'Kuis pola tata bahasa dan pemahaman struktur kalimat.',
      icon: <GraduationCap className="w-6 h-6" />,
      href: '/practice/multiple-choice?type=grammar',
    },
  ]

  return (
    <div className="space-y-10">
      <PageHeader
        title="Practice Hub"
        description="Pilih mode latihan atau kuis spesifik untuk menguji ingatanmu."
        icon={<Layers className="w-8 h-8" />}
      />

      {/* Practice Modes Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Mode Latihan Utama</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modes.map((mode) => (
            <Link key={mode.title} href={mode.href}>
              <MaterialCard
                title={mode.title}
                description={mode.description}
                icon={mode.icon}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Specialized Quizzes Section (Phase 6) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Kuis Spesifik Kategori (Specialized Practice)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializedQuizzes.map((quiz) => (
            <Link key={quiz.title} href={quiz.href}>
              <MaterialCard
                title={quiz.title}
                description={quiz.description}
                icon={quiz.icon}
              />
            </Link>
          ))}
        </div>
      </section>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
        💡 <strong>Tips:</strong> Setiap jawaban Anda di mode latihan akan otomatis tercatat untuk melacak materi yang sudah dikuasai (*Mastery*) dan yang sering salah (*Weak Material*).
      </div>
    </div>
  )
}
