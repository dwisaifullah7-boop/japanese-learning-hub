import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { Languages } from 'lucide-react'

export default function KatakanaPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Katakana"
        description="46 karakter untuk kata asing"
        icon={<Languages className="w-8 h-8" />}
      />
      <EmptyState
        icon={<Languages className="w-12 h-12" />}
        title="Katakana Coming Soon"
        description="Materi Katakana akan tersedia di Phase 3."
        actionLabel="Kembali ke Learn"
        actionHref="/learn"
      />
    </div>
  )
}
