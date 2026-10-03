import Link from 'next/link'
import { PageHeader } from '@/components/shared/PageHeader'
import { MaterialCard } from '@/components/shared/MaterialCard'
import { Layers, HelpCircle, Keyboard } from 'lucide-react'

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
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Practice"
        description="Pilih mode latihan untuk menguji ingatanmu."
        icon={<Layers className="w-8 h-8" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
        <strong>Catatan Development:</strong> Saat ini latihan default menggunakan materi <strong>Vocabulary</strong>. 
        Pilihan materi (Hiragana, Particle, dll) akan ditambahkan setelah Practice Core stabil.
      </div>
    </div>
  )
}
