import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { GraduationCap } from 'lucide-react'

export default function GrammarPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Grammar"
        description="Pola kalimat"
        icon={<GraduationCap className="w-8 h-8" />}
      />
      <EmptyState
        icon={<GraduationCap className="w-12 h-12" />}
        title="Grammar Coming Soon"
        description="Materi Grammar akan tersedia di Phase 3."
        actionLabel="Kembali ke Learn"
        actionHref="/learn"
      />
    </div>
  )
}
