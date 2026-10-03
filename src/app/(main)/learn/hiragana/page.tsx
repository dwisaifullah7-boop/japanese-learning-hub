import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { Languages } from 'lucide-react'

export default function HiraganaPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Hiragana"
        description="46 karakter dasar bahasa Jepang"
        icon={<Languages className="w-8 h-8" />}
      />
      <EmptyState
        icon={<Languages className="w-12 h-12" />}
        title="Hiragana Coming Soon"
        description="Materi Hiragana akan tersedia di Phase 3. Fitur ini sedang dalam pengembangan."
        actionLabel="Kembali ke Learn"
        actionHref="/learn"
      />
    </div>
  )
}
