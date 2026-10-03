import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { FileText } from 'lucide-react'

export default function KanjiPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Kanji"
        description="Karakter logografis"
        icon={<FileText className="w-8 h-8" />}
      />
      <EmptyState
        icon={<FileText className="w-12 h-12" />}
        title="Kanji Coming Soon"
        description="Materi Kanji akan tersedia di Phase 3."
        actionLabel="Kembali ke Learn"
        actionHref="/learn"
      />
    </div>
  )
}
