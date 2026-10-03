import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <FileQuestion className="w-20 h-20 text-gray-400 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/home">
            <Button variant="default" size="lg">
              Kembali ke Home
            </Button>
          </Link>
          <Link href="/learn">
            <Button variant="outline" size="lg">
              Mulai Belajar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
