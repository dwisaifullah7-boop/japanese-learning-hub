import Link from 'next/link'
import { PageHeader } from '@/components/shared/PageHeader'
import { Layers } from 'lucide-react'
import { PracticeHubClient } from '@/components/practice/PracticeHubClient'

export default function PracticePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Pusat Latihan"
        description="Pilih tingkatan, kategori materi, lalu mode latihan yang kamu inginkan."
        icon={<Layers className="w-8 h-8" />}
      />

      <PracticeHubClient />
    </div>
  )
}
