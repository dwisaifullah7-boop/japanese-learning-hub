import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { Sparkles } from 'lucide-react'

export default function ParticlePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Particle"
        description="Partikel grammar"
        icon={<Sparkles className="w-8 h-8" />}
      />
      <EmptyState
        icon={<Sparkles className="w-12 h-12" />}
        title="Particle Coming Soon"
        description="Materi Particle akan tersedia di Phase 3."
        actionLabel="Kembali ke Learn"
        actionHref="/learn"
      />
    </div>
  )
}
