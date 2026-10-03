import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { BookMarked } from 'lucide-react'

export default function VocabularyPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Vocabulary"
        description="Kosakata bahasa Jepang"
        icon={<BookMarked className="w-8 h-8" />}
      />
      <EmptyState
        icon={<BookMarked className="w-12 h-12" />}
        title="Vocabulary Coming Soon"
        description="Materi Vocabulary akan tersedia di Phase 3."
        actionLabel="Kembali ke Learn"
        actionHref="/learn"
      />
    </div>
  )
}
